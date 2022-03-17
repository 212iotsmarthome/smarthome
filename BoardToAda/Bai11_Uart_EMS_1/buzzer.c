#include "buzzer.h"
#include <p18f4620.h>

#define BUZZER_LAT      LATAbits.LATA3
#define BUZZER_PORT     PORTAbits.RA3

void init_buzzer() {
    //buzzer is output.
    TRISAbits.RA3 = 0;
    stop_buzzer();
}

char get_buzzer() {
    return BUZZER_PORT;
}

void start_buzzer() {
    BUZZER_LAT = 1;
}

void stop_buzzer() {
    BUZZER_LAT = 0;
}

void setBuzzer(int value) {
    if (value == 1) {
        start_buzzer();
    } else {
        stop_buzzer();
    }
}
