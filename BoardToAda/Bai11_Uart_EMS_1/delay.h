/* 
 * File:   delay.h
 * Author: ngocc
 *
 * Created on March 7, 2022, 11:00 PM
 */

#ifndef DELAY_H
#define	DELAY_H

#ifdef	__cplusplus
extern "C" {
#endif


void delay_ms(int value);

//tao ra tu viec nhom den doan thoi gian :'(
//1 vong lap for tuong ung voi 6us. 
void delay_6us(int value);

#ifdef	__cplusplus
}
#endif

#endif	/* DELAY_H */

