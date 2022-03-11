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
void set_DC_speed(unsigned char value);


#ifdef	__cplusplus
}
#endif

#endif	/* PWM_H */

