#include "gas_sensor.h"
#include <p18f4620.h>


#define GAS     PORTEbits.RE2

void init_gas_sensor() {
    //cho RE2 la input de doc gia tri.
    TRISEbits.RE2 = 1;
}

char get_gas_sensor_val() {
    return GAS;
}


