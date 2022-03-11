#include "uartProcess.h"
#include "uart/uart.h"
#include "mystring.h"
#include "lcd/lcd.h"
#include "DHT11.h"
#include "adc/adc.h"
#include "two_mode_led.h"
#include "curtain.h"
#include "door.h"
#include "conditioner.h"
#include "gas_sensor.h"

static char uart_message[50];

//list all the command here
//setLed:a:b            (a[0:3] ; b[0:3])
static char command_setLed[7] = "setLed";
//setCurtain:a          (a[0:2])
static char command_setCurtain[11] = "setCurtain";
//getAllInfo
static char command_getAllInfo[11] = "getAllInfo";
//setConditioner:a      (a[0:1])
static char command_set_conditioner[15] = "setConditioner";
//setConditionerTemp:aa (a[0:99])
static char command_set_contidionter_temp[19] = "setConditionerTemp";



static char state_off[2] = "0";
static char state_on1[2] = "1";
static char state_on2[2] = "2";

//vi cai <string.h> cua thang compiler nay rat ngu nen minh phai hard code :'(

void Uart_Processing() {
    int index = 0;
    int value = 0;
    if (getStringUART(uart_message)) {
        if (str_ncmp(uart_message, command_setLed, 6) == 0) {
            index = uart_message[7] - '0';
            value = uart_message[9] - '0';
            set_Led(index, value);
            UartSendString("!OK*");
        } else if (str_ncmp(uart_message, command_setCurtain, 10) == 0) {
            value = uart_message[11] - '0';
            set_Curtain(value);
            UartSendString("!OK*");
        } else if (str_ncmp(uart_message, command_getAllInfo, 10) == 0) {
            send_All_Info();
        } else if(str_ncmp(uart_message, command_set_contidionter_temp, 18) == 0) {
            value = (uart_message[19] - '0') * 10 + (uart_message[20] - '0');
            set_conditioner_temp(value);
            UartSendString("!OK*");
        } else if (str_ncmp(uart_message, command_set_conditioner, 14) == 0){
            value = uart_message[15] - '0';
            set_conditioner_state(value);
            UartSendString("!OK*");
        }  else {
            UartSendString("Something went wrong");
        }
    }
}
//{"humid":90.12, "temperature": 90.12, 
//"LDR":{"1":1023, "2":1023, "3":1023,"4":1023}, 
//"LED":{"0":3, "1":3, "2":3, "3":3}, 
//"curtain":2, "door":1, 
//"conditioner":{"power":1, "temp":22}, 
//"gas":1}
void send_All_Info() {
    UartSendString("!{\"humid\":");
    UartSendNumPercent(get_DHT11_humidity());
    UartSendString(", \"temperature\":");
    UartSendNumPercent(get_DHT11_temperature());
    UartSendString(", \"LDR\":{\"1\":");
    UartSendNum(read_adc_value(1));
    UartSendString(", \"2\":");
    UartSendNum(read_adc_value(2));
    UartSendString(", \"3\":");
    UartSendNum(read_adc_value(3));
    UartSendString(",\"4\":");
    UartSendNum(read_adc_value(4));
    UartSendString("}, \"LED\":{\"0\":");
    UartSendNum(get_Led(0));
    UartSendString(", \"1\":");
    UartSendNum(get_Led(1));
    UartSendString(", \"2\":");
    UartSendNum(get_Led(2));
    UartSendString(", \"3\":");
    UartSendNum(get_Led(3));
    UartSendString("}, \"curtain\":");
    UartSendNum(get_Curtain());
    UartSendString(", \"door\":");  
    UartSendNum(get_door_value());
    UartSendString(", \"conditioner\":{\"power\":");
    UartSendNum(get_conditioner_state());
    UartSendString(", \"temp\":");
    UartSendNum(get_conditioner_temp());
    UartSendString("}, \"gas\":");
    UartSendNum(get_gas_sensor_val());
    UartSendString("}*");
}
