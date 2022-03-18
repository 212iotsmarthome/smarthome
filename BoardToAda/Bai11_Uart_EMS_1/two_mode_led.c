#include "two_mode_led.h"
#include <p18f4620.h>
#include "spi_74hc595.h"
#define MAX_LED 2

#define OFF         0       //0b00
#define LEFT        1       //0b01
#define RIGHT       2       //0b10
#define MAX         3       //0b11

#define MANUAL  0
#define AUTO    4

static char led_status_array[MAX_LED] = {OFF, OFF};
static char led_auto_array[MAX_LED] = {MANUAL, MANUAL};
static char attached_LDR[MAX_LED] = {-1, -1};

void run_Led() {
    int i;
    char spi_data = 0;;
    for(i = 0; i < MAX_LED; i++) {
        spi_data = spi_data | (led_status_array[i] << (i * 2));
    }
    transfer_data_SPI(spi_data);
    data_to_output_SPI();
}

void set_Led(int index, int mode) {
    if (mode < 4) {
        led_status_array[index] = mode;
    }
}


char get_Led(int index) {
    if (led_auto_array[index] == AUTO) return AUTO;
    else {
        return led_status_array[index];
    }
}

void switch_led_state(int index) {
    led_status_array[index] = (led_status_array[index] + 1) % 4;
}



//tinh nang auto co ve khong on. nen hien thuc no tren app.
void set_Led_auto() {
    int i, mode;
    for(i = 0; i < MAX_LED; i++) {
        if (led_auto_array[i] == AUTO) {
            //kiem tra bien tro
            //dung lenh set_Led(i) de set do sang phu hop. chay ham nay o file main, truoc run_Led.
            set_Led(i, mode);
        }
    }
}

//neu feed gui ve 4:
//goi ham nay, is_auto = 1;
//else, goi ham nay, is_auto = 0;
void set_Led_Auto_attr(int index, int is_auto) {
    if (is_auto) {
        led_auto_array[index] = AUTO;
    } else {
        led_auto_array[index] = MANUAL;
    }
}

void attach_Led_with_LDR(int index, int LDR_index) {
    attached_LDR[index] = LDR_index;
}
