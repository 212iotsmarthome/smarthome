/* 
 * File:   door.h
 * Author: ngocc
 *
 * Created on March 9, 2022, 9:32 PM
 */

#ifndef DOOR_H
#define	DOOR_H

#ifdef	__cplusplus
extern "C" {
#endif

void init_door();
void check_door();
char get_door_value();
void open_door();
void close_door();
void stop_door();
void setDoor(int value);


#ifdef	__cplusplus
}
#endif

#endif	/* DOOR_H */

