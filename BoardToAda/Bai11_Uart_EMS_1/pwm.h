/* 
 * File:   pwm.h
 * Author: ngocc
 *
 * Created on March 9, 2022, 5:12 PM
 */

#ifndef PWM_H
#define	PWM_H

#ifdef	__cplusplus
extern "C" {
#endif

void init_pwm();
void set_DC_speed(double value);
void PWM_turn_off();
void PWM_turn_on();


#ifdef	__cplusplus
}
#endif

#endif	/* PWM_H */

