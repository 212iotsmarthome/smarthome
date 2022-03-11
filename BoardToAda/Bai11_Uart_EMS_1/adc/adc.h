#ifndef _ADC_H_
#define _ADC_H_

#include <p18f4620.h>

#define ADC_CHANNEL 	7

void init_adc(void);
int get_adc_value();
int read_adc_value(int index);

extern unsigned int adc_value[ADC_CHANNEL];

#endif