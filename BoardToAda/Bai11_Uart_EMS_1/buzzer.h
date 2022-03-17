/* 
 * File:   buzzer.h
 * Author: ngocc
 *
 * Created on March 17, 2022, 8:54 AM
 */

#ifndef BUZZER_H
#define	BUZZER_H

#ifdef	__cplusplus
extern "C" {
#endif


void init_buzzer();

char get_buzzer();

void start_buzzer();

void stop_buzzer();

void setBuzzer(int value);

#ifdef	__cplusplus
}
#endif

#endif	/* BUZZER_H */

