/* 
 * File:   DHT11.h
 * Author: ngocc
 *
 * Created on March 7, 2022, 9:49 PM
 */

#ifndef DHT11_H
#define	DHT11_H

#ifdef	__cplusplus
extern "C" {
#endif

    //initDHT with port D0
void initDHT();

void startQueryDHT();

//a^b
int pow(int a, int b);

char get_DHT11_error();

double get_DHT11_temperature();

double get_DHT11_humidity();

void test();


#ifdef	__cplusplus
}
#endif

#endif	/* DHT11_H */

