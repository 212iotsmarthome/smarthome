/* 
 * File:   spi_74hc595.h
 * Author: ngocc
 *
 * Created on March 9, 2022, 8:13 PM
 */

#ifndef SPI_74HC595_H
#define	SPI_74HC595_H

#ifdef	__cplusplus
extern "C" {
#endif


#include <p18f4620.h>

    //neu muon dieu khien du lieu, nen dung LAT.
#define DATA_PIN    LATDbits.LATD6
#define SHIFT_CLOCK LATDbits.LATD7
#define LATCH       LATEbits.LATE0
#define TRIS_DATA_D   TRISD
#define TRIS_LATCH_A  TRISA

#define UP          1
#define DOWN        0


void init_SPI_manual();

//this function tranfer data to the shift register (not yet print to output)
void transfer_data_SPI(unsigned char byte);

void data_to_output_SPI();


#ifdef	__cplusplus
}
#endif

#endif	/* SPI_74HC595_H */

