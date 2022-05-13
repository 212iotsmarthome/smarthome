

#include "pwm.h"
#include "door.h"
#include "delay.h"

#include <p18f4620.h>

#define DOOR_PORT       PORTDbits.RD3
//direction for the motor
#define DOOR_LAT_1      LATDbits.LATD1
#define DOOR_LAT_2      LATDbits.LATD2

//door lock: 1 la unlock, 0 la lock.
#define DOOR_LOCK_LAT       LATAbits.LATA5
#define DOOR_LOCK_PORT      PORTAbits.RA5


#define OPEN    1
#define CLOSE   0

static int close_counter = 0;
static char is_door_open = 0;
static int door_moving = 0;
static char door_closing = 0;
static int waitForLock = 0;

void init_door() {
    TRISDbits.TRISD1 = 0;       //OUTPUT
    TRISDbits.TRISD2 = 0;       //OUTPUT
    TRISDbits.TRISD3 = 1;       //INPUT, read door switch
    //PWM RC2
    stop_door();
    //DOOR LOCK: LED
    TRISAbits.RA5 = 0;      //RA5 la output.
    
}

//0 la dong, 1 la mo. 
void set_lock(int value) {
    if (value == 1) {
        DOOR_LOCK_LAT = 1;
    } else {
        DOOR_LOCK_LAT = 0;
    }
}

void check_door() {
    if (DOOR_PORT == CLOSE) {
//        is_door_open = CLOSE;
        if (close_counter > 3) {
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
    if (door_closing == 1) {
        if (is_door_open == CLOSE) {
            door_moving = 0;
            door_closing = 0;
            stop_door();
            if (waitForLock == 1) {
                set_lock(OPEN);
                waitForLock = 0;
            }
        }
        door_moving++;
        if (door_moving > 40) {
            door_moving = 0;
            door_closing = 0;
            stop_door();
        }
    } else {
        if (door_moving > 0) {
            door_moving++;
            if (door_moving > 15) {
                door_moving = 0;
                stop_door();
            }
        }
    }
}

char get_door_value() {
//    if (door_closing == 1) return CLOSE;
    return is_door_open;
}

void open_door() {
    if (is_door_open == CLOSE) {
//        PWM_turn_on();
        DOOR_LAT_1 = 0;
        DOOR_LAT_2 = 1;
        door_moving = 3;
    }
}

void close_door() {
    if (is_door_open == OPEN) {
//        PWM_turn_on();
        DOOR_LAT_1 = 1;
        DOOR_LAT_2 = 0;
        door_moving = 1;
        door_closing = 1;
    }
}

void stop_door() {
//    PWM_turn_off();
    DOOR_LAT_1 = 0;
    DOOR_LAT_2 = 0;
}

void setDoor(int value) {
    if (value == OPEN) {
        open_door();
    } else {
        close_door();
    }
}

char get_lock_value() {
    return DOOR_LOCK_PORT;
}



void runDoor(int motor, int lock) {
    if (motor == OPEN && is_door_open == CLOSE) { // 0 1 --> 1 0
        //cua dang dong, yeu cau mo
        //mo khoa truoc roi lam gi thi lam
        set_lock(lock);
        setDoor(motor);
    } else if (motor == CLOSE && is_door_open == OPEN) {
        //Cua dang mo, yeu cau dong cua
        // dong cua truoc, roi lam gi voi lock thi lam
        setDoor(motor);
        waitForLock = 1;
    } else {
        set_lock(lock);
        setDoor(motor);
    }
}