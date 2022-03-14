#include <p18f4620.h>

#include "pwm.h"
#include "door.h"
#include "delay.h"

#define DOOR_PORT       PORTDbits.RD3
//direction for the motor
#define DOOR_LAT_1      LATDbits.LATD1
#define DOOR_LAT_2      LATDbits.LATD2


#define OPEN    1
#define CLOSE   0

static int close_counter = 0;
static char is_door_open = 0;
static int door_moving = 0;

void init_door() {
    TRISDbits.TRISD1 = 0;       //OUTPUT
    TRISDbits.TRISD2 = 0;       //OUTPUT
    TRISDbits.TRISD3 = 1;       //INPUT, read door switch
    //PWM RC2
    stop_door();
}

void check_door() {
    if (DOOR_PORT == CLOSE) {
        if (close_counter > 5) {
            is_door_open = CLOSE;
        } else {
            close_counter++;
            is_door_open = OPEN;
        }
        //LED_LAT = 1;
    } else {
        is_door_open = OPEN;
        close_counter = 0;
        //LED_LAT = 0;
    }
    if (door_moving > 0) {
        door_moving++;
        if (door_moving > 50) {
            door_moving = 0;
            stop_door();
        }
    }
}

char get_door_value() {
    return is_door_open;
}

void open_door() {
    PWM_turn_on();
    DOOR_LAT_1 = 1;
    DOOR_LAT_2 = 0;
    door_moving = 1;
}

void close_door() {
    PWM_turn_on();
    DOOR_LAT_1 = 0;
    DOOR_LAT_2 = 1;
    door_moving = 1;
}

void stop_door() {
    PWM_turn_off();
}

void setDoor(int value) {
    if (value == 1) {
        open_door();
    } else {
        close_door();
    }
}