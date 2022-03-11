#include "conditioner.h"
#include <p18f4620.h>


#define CONDITIONER_LAT     LATEbits.LATE1

static char is_conditioner_on;
static char conditioner_temp;

void init_conditioner() {
    // cho E1 lam output
    TRISEbits.TRISE1 = 0;
    is_conditioner_on = 0;
    conditioner_temp = 22;
}

void run_conditioner() {
    CONDITIONER_LAT = is_conditioner_on;
}

void set_conditioner_state(char on_off) {
    if (on_off == 1) {
        is_conditioner_on = 1;
    } else {
        is_conditioner_on = 0;
    }
}

void switch_conditioner_state() {
    is_conditioner_on = !is_conditioner_on;
}

void set_conditioner_temp(char value) {
    conditioner_temp = value;
}

char get_conditioner_state() {
    return is_conditioner_on;
}

char get_conditioner_temp() {
    return conditioner_temp;
}




