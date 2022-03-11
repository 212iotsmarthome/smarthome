#include <p18f4620.h>

#include "door.h"

#define DOOR_PORT    PORTDbits.RD2
#define LED_LAT     LATDbits.LATD3

#define OPEN    0
#define CLOSE   1

static char is_door_closed = 0;

void init_door() {
    TRISDbits.TRISD2 = 1;       //door switch input
    TRISDbits.TRISD3 = 0;       //door led output
}

void check_door() {
    if (DOOR_PORT == OPEN) {
        is_door_closed = OPEN;
        LED_LAT = 0;
    } else {
        is_door_closed = CLOSE;
        LED_LAT = 1;
    }
}

char get_door_value() {
    return is_door_closed;
}
