#include "mystring.h"
#include "lcd/lcd.h"

//return 0 if two strings are identical, else return 1.
char str_ncmp(char str1[], char str2[], char length) {
    int i = 0;
    for(i = 0; i < length; i++) {
        if (str1[i] != str2[i]) return 1;
//        LcdPrintCharS(0, i, str1[i]);
//        LcdPrintCharS(1, i, str2[i]);
    }
    return 0;
}

//return 0 if two strings are identical from index a to b, else return 1.
char str_nicmp(char str1[], char str2[], char a, char b) {
    int i = 0;
    for(i = a; i <= b; i++) {
        if (str1[i] != str2[i]) return 1;
//        LcdPrintCharS(0, i, str1[i]);
//        LcdPrintCharS(1, i, str2[i]);
    }
    return 0;
}

//assume des and src have the same array size.
char str_cpy(char des[], char src[]) {
    int i = 0;
    while (src[i] != '\0') {
        des[i] = src[i];
        i++;
    }
    des[i] = '\0';
}
