/* 
 * File:   conditioner.h
 * Author: ngocc
 *
 * Created on March 9, 2022, 10:14 PM
 */

#ifndef CONDITIONER_H
#define	CONDITIONER_H

#ifdef	__cplusplus
extern "C" {
#endif


void init_conditioner();
void run_conditioner();
void set_conditioner_state(char on_off);

void set_conditioner_temp(char value);

char get_conditioner_state();

char get_conditioner_temp();

void switch_conditioner_state();

#ifdef	__cplusplus
}
#endif

#endif	/* CONDITIONER_H */

