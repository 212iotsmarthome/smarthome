/* 
 * File:   two_mode_led.h
 * Author: ngocc
 *
 * Created on March 9, 2022, 8:26 PM
 */

#ifndef TWO_MODE_LED_H
#define	TWO_MODE_LED_H

#ifdef	__cplusplus
extern "C" {
#endif

void run_Led();
void set_Led(int index, int mode);
char get_Led(int index);
void switch_led_state(int index);

//tinh nang auto tu bo mach co ve khong on. nen hien thuc no tren app thi hon.
//neu feed gui ve 4:
//goi ham nay, is_auto = 4;
//else, goi ham nay, is_auto = 0;
void set_Led_Auto_attr(int index, int is_auto);
void set_Led_auto();
void attach_Led_with_LDR(int index, int LDR_index);


#ifdef	__cplusplus
}
#endif

#endif	/* TWO_MODE_LED_H */

