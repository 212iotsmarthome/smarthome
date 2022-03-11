#include <p18f4620.h>

#include "main.h"
#include "mystring.h"
#include "uartProcess.h"
#include "DHT11.h"
#include "delay.h"
//#include "pwm.h"
#include "two_mode_led.h"
#include "pwm.h"
#include "spi_74hc595.h"
#include "door.h"
#include "conditioner.h"
#include "curtain.h"
#include "gas_sensor.h"
// Noi khai bao hang so
#define     LED     PORTB
#define     ON      1
#define     OFF     0

// Noi khai bao bien toan cuc
unsigned char arrayMapOfOutput [8] = {0x01,0x02,0x04,0x08,0x10,0x20,0x40,0x80};
unsigned char statusOutput[8] = {0,0,0,0,0,0,0,0};
// Khai bao cac ham co ban IO
void init_system(void);

void toggle();
void display_Scene();
void button_check();

#define     SCENE_TEMP_HUMID        0
#define     SCENE_ADC               1
#define     SCENE_LED_STATE         2
#define     SCENE_CURTAIN_A_DOOR    3
#define     SCENE_CONDITIONER       4
#define     GAS_SENSOR              5

static char scene = GAS_SENSOR;




void main(void)
{
    int temp = 0;
    int humid = 0;
    int light = 0;
	unsigned int k = 0;
	init_system();
    lcd_clear();
    LcdClearS();
    delay_ms(1000);
    
	while (1)
	{
        while (!flag_timer3);
        flag_timer3 = 0;
        scan_key_matrix_with_uart();
        button_check();
//        
        
//        
//        if (k % 20 == 0) {      //run every 1 second
//           
//        }
        startQueryDHT();        //read DHT11
        run_Led();              //run 4 leds
        run_Curtain();          //run curtain
        run_conditioner();      //run conditioner
        display_Scene();        //display on LCD
        check_door();           //check if the door is open and run it.
        
        get_adc_value();        //read adc value and store it inside array.
        toggle();               // I'm alive
        Uart_Processing();      //handle uart receive message
        
        if (k == 0) {       //run every 5 seconds.
            scene = (scene + 1) % 6;
            send_All_Info();
        }
        
        k = (k + 1) % 100;
        DisplayLcdScreen();
      
	}
}

void toggle() {
    if (PORTDbits.RD1 == 0) {
        PORTDbits.RD1 = 1;
    } else {
        PORTDbits.RD1 = 0;
    }
}

void button_check() {
    if (key_code[0] == 1) {
        switch_led_state(0);
    }
    if (key_code[1] == 1) {
        switch_led_state(1);
    }
    if (key_code[4] == 1) {
        switch_led_state(2);
    }
    if (key_code[5] == 1) {
        switch_led_state(3);
    }
    if (key_code[2] == 1) {
        switch_curtain_state();
    }
    if (key_code[6] == 1) {
        switch_conditioner_state();
    }
}




void init_system(void)
{
    PORTDbits.RD1 = 0;
    TRISDbits.RD1 = 0;
    TRISB = 0x00;		//setup PORTB is output
    TRISA = 0x00;
    init_lcd();
//    LED = 0x00;
    init_interrupt();
    delay_ms(1000);
//    init_timer0(4695);//dinh thoi 1ms sai so 1%
    init_timer1(9390);//dinh thoi 2ms
    init_timer3(46950);//dinh thoi 10ms
//    init_timer2(255);
//    SetTimer0_ms(2);
    SetTimer1_ms(10);
    SetTimer3_ms(50); //Chu ky thuc hien viec xu ly input,proccess,output
    init_key_matrix_with_uart();
    init_uart();
    init_adc();
    init_i2c();
    initDHT();
//    init_pwm();
    init_SPI_manual();
    init_door();
    init_Curtain();
    init_conditioner();
    init_gas_sensor();
//    SetupTimeForRealTime();
}

void display_Scene() {
    LcdClearS();
    switch(scene) {
        case  SCENE_TEMP_HUMID:
            LcdPrintStringS(0, 0, "Temp:");
            LcdPrintStringS(1, 0, "Humid:");
            LcdPrintNumPercentS(0, 8, get_DHT11_temperature());
            LcdPrintNumPercentS(1, 8, get_DHT11_humidity());
            break;
        case SCENE_ADC:
            LcdPrintNumS(0, 0, read_adc_value(1));
            LcdPrintNumS(0, 8, read_adc_value(2));
            LcdPrintNumS(1, 0, read_adc_value(3));
            LcdPrintNumS(1, 8, read_adc_value(4));
            break;
        case  SCENE_LED_STATE:
            LcdPrintNumS(0, 0, get_Led(0));
            LcdPrintNumS(0, 8, get_Led(1));
            LcdPrintNumS(1, 0, get_Led(2));
            LcdPrintNumS(1, 8, get_Led(3));
            break;
        case SCENE_CURTAIN_A_DOOR:
            LcdPrintStringS(0, 0, "Cur:");
            LcdPrintStringS(1, 0, "Door:");
            LcdPrintNumS(0, 8, get_Curtain());
            LcdPrintNumS(1, 8, get_door_value());
            break;
        case SCENE_CONDITIONER:
            LcdPrintStringS(0, 0, "Power:");
            LcdPrintStringS(1, 0, "Temp:");
            LcdPrintNumS(0, 8, get_conditioner_state());
            LcdPrintNumS(1, 8, get_conditioner_temp());
            break;
        case GAS_SENSOR:
            LcdPrintStringS(0, 0, "Gas:");
            LcdPrintNumS(0, 8, get_gas_sensor_val());
            break;
    }
}

