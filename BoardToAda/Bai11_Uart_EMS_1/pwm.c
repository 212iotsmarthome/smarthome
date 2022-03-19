#include "pwm.h"
#include <p18f4620.h>

unsigned char duty_cycle = 0;
unsigned char speed;

//neu minh muon dieu khien tin hieu, thi phai dung LAT
#define PWM_CCP1_RC2_OUT    LATCbits.LATC2
//neu minh muon doc tin hieu, thi dung PORT
#define PWM_CCP1_RC2_IN    PORTCbits.RC2


void init_pwm()     //tao xung pwm tren chan RC2 (sua lai file button de no khong quet qua chan nay)
{
		T2CONbits.TMR2ON = 0;  //turn off timer2
        
		T2CONbits.T2CKPS0 = 0; 
		T2CONbits.T2CKPS1 = 1;  //prescaler 1:16  -> prescaller value = 16
        
        
        //PWM period 
		PR2 = 255;      
        //PWM period = (PR2 + 1) * 4 * Tosc * prescaller.
        /* Tosc: chu ki cua oscili - hay con goi la chu ki cua tan so cua board. tan so board la 20MHz, nen chu ki = 1/20*10^6
         * prescaller = 16
         * PWM period = (255 + 1) * 4 * 1/20*10^6 * 16 = 8.192*10^(-4) = 0.819*10^(-3)s = 0.819ms = 819ns 
         * -> day la chu ki lon nhat ma pickit voi osc 20MHz co the tao ra
         */
        
        //PWM duty cycle
        /*Duty cycle time = (CCRP1L:DC1B) * Tosc * prescaller, chi thoi gian muc 1 trong 1 chu ki
         Duty cycle = Duty cycle time / PWM period = (CCRP1L:DC1B) / (4 * (PR2 + 1))
         => CCRP1L:DC1B = Duty cycle * (4 * (PR2 + 1))
         * vi phep tinh co * 4, tuong duong voi << 2, nen 2 bit LSb luc nao cung la 00
         * nen ta chi can thay doi CCRP1L la duoc.  >>
         * cong thuc tinh CCPR1L nam o ham set_DC_speed ben duoi.
         */
		CCP1CONbits.DC1B0 = 0;  
		CCP1CONbits.DC1B1 = 0;  //2 bits LSB 
		CCPR1L = 0x13;     //8bits MSB

        //part 16.0 in datasheets
		CCP1CONbits.P1M0 = 0;  //PWM single mode
		CCP1CONbits.P1M1 = 0; 
		CCP1CONbits.CCP1M0 = 0;  //select PWM function
		CCP1CONbits.CCP1M1 = 0; 
		CCP1CONbits.CCP1M2 = 1; 
		CCP1CONbits.CCP1M3 = 1;

		TRISCbits.RC2 = 0;  //config RC2 output
		T2CONbits.TMR2ON = 1;  //start timer2
} 


void set_DC_speed(double value)
{
	CCPR1L = (int)((double)value * 4 * ((int)(PR2)) + 1) >> 2;
}

void PWM_turn_off(){
    while (PWM_CCP1_RC2_IN == 1);
    //cho khi xung PWM xuong 0. do khi setting PWM, con chip se dieu khien chan chu minh khong dieu khien duoc.
    //KHONG THE GHI PWM_CCP1_RC2_OUT = 0.
    T2CONbits.TMR2ON = 0;   //stop timer 2
    
}

void PWM_turn_on() {
    T2CONbits.TMR2ON = 1;   //start timer 2
}