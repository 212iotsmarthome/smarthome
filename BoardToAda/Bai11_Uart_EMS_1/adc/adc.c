#include "adc.h"
#include <p18f4620.h>
unsigned int adc_value[ADC_CHANNEL];
//LIST OUT CHANNEL THAT U NEED TO USE BY SETTING IT TO 1.
unsigned char analog_channel_using[ADC_CHANNEL] = {0, 1, 0, 0, 0, 0, 0};
void init_adc(void)
{
	//Analog pin MUST BE INPUT PIN (0 -> output, 1 -> input)
    // pin RA0, RA1, RA2, RA3, RA5, RE0, RE1 la cac chan analog input.
    TRISAbits.RA0 = 1;
    TRISAbits.RA1 = 1;
//    TRISAbits.RA2 = 1;
//    TRISAbits.RA3 = 1;
//    TRISAbits.RA5 = 1;
//    TRISEbits.RE0 = 1;
//    TRISEbits.RE1 = 1;
    /*ADCON1
     * 5: Vref- = Vss
     4: Vref+ = Vdd
     3-0: A/D Port configuration control bits:
     1101: AN0 -> AN1 la analog.*/
    //sua lai cho nay neu thay doi so cong analog
	ADCON1 = 0b00001101;
    
    /*ADCON0
     *  5-2: chon kenh analog - truoc khi doc du lieu analog, ta phai chon 1 kenh de doc no
     * neu muon doc kenh khac, chi can thay doi gia tri kenh o vi tri bit 5-2 nay, hay truy
     * cap vao thuoc tinh ADCON0bits.CHS
     * 0000: AN0
     * 0001: AN1
     * 0010: AN2
     * 1101: AN11
     * 1100: AN12
     * 1: GO_DONE: Bit trang thai chuyen doi khi ADON = 1
     * 1 - Dang chuyen doi A/D
     * 0- Chuyen doi xong
     * 0: ADON: A/D onbit
     * 1 - Cho phep chuyen doi
     * 0 - tat chuyen doi.
     */
	ADCON0 = 0b00000000;
    
    /*ADCON2
     * 7: Dinh dang ket qua trong 2 thanh ghi ADRESH va ADRESL
     * 0 - canh trai        -> Big endian
     * 1 - canh phai        -> Little endian
     * 5-3: A/D Acquistion Time Select Bit: chon thoi gian nap tu
     * Holding capacitor
     * 001 - 2 Tad.
     * 2-0: A/D Conversion Clock Selection bit: chon clock cho bo chuyen doi A/D
     * 101: Fosc / 16.
     */
	ADCON2 = 0b00001101;
	ADCON0bits.ADON = 1;        //cho phep chuyen doi analog to digital.
}

int get_adc_value()
{
    int i = 0;
    int result = 0;
    for(i = 0; i < ADC_CHANNEL; i++) {
        if (analog_channel_using[i] == 1) {
            ADCON0bits.CHS = i;     //thay doi cong analog de doc du lieu
            result = 0;
            ADCON0bits.GO_DONE = 1;
            while(ADCON0bits.GO_DONE ==1){}
            result = ADRESH;
            result = (result<<2) + (ADRESL>>6);
                adc_value[i] = result;
        }
    }
	return 1;
}

int read_adc_value(int index) {
    return adc_value[index];
}

