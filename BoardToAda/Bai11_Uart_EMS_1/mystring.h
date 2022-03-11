/* 
 * File:   mystring.h
 * Author: ngocc
 *
 * Created on March 6, 2022, 8:10 PM
 */

#ifndef MYSTRING_H
#define	MYSTRING_H

#ifdef	__cplusplus
extern "C" {
#endif

    
//return 0 if two strings are identical, else return 1.
char str_ncmp(char str1[], char str2[], char length);
//return 0 if two strings are identical from index a to b, else return 1.
char str_nicmp(char str1[], char str2[], char a, char b);
//assume des and src have the same array size.
char str_cpy(char des[], char src[]);


#ifdef	__cplusplus
}
#endif

#endif	/* MYSTRING_H */

