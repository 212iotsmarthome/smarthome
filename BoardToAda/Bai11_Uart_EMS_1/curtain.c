#include "curtain.h"
#include <p18f4620.h>

#define OFF     0       //0b00
#define MID     1       //0b01
#define MAX     3       //0b11

#define CURTAIN0 LATDbits.LATD4
#define CURTAIN1 LATDbits.LATD5

static char curtain_status = OFF;

void init_Curtain() {
    //cho RD4 va RD5 la output.
    TRISDbits.RD4 = 0;
    TRISDbits.RD5 = 0;
    curtain_status = OFF;
}

void run_Curtain() {
    CURTAIN0 = curtain_status & 0b01;
    CURTAIN1 = curtain_status >> 1;
}

void switch_curtain_state() {
    switch(curtain_status) {
        case OFF:
            set_Curtain(1);
            break;
        case MID:
            set_Curtain(2);
            break;
        case MAX:
            set_Curtain(0);
            break;
    }
}

void set_Curtain(int mode) {
    if (mode == 0) {
        curtain_status = OFF;
    } else if (mode == 1) {
        curtain_status = MID;
    } else if (mode == 2) {
        curtain_status = MAX;
    } else {
        curtain_status = OFF;
    }
}

char get_Curtain() {
    if (curtain_status == MAX) return 2;
    else return curtain_status;
}
