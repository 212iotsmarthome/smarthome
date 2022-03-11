#include "delay.h"

void delay_ms(int value)
{
	int i,j;
	for(i=0;i<value;i++)
		for(j=0;j<250;j++);
}

//tao ra tu viec nhom den doan thoi gian :'(
//1 vong lap for tuong ung voi 6us. 
void delay_6us(int value) {
    int i;
    for(i = 0; i < value; i++);
}
