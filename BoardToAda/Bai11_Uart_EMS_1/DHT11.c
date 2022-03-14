/* HOW THE FUCK DID I FIX SO THAT I CAN READ DHT11?
 * FIRST: DISABLE TIMER0, AS IT INTERRUPT EVERY FUCKING 1 MILISECOND, AND THAT'S FUCKING DANGEROUS WHEN WE'RE TRYING TO READ THE DAMN VALUE
 * THEN: INCREASE THE LOW TIME WHEN SEDING THE START QUERY
 * MUAHAHAH, RETURN TO MONKE
 * doc dht thuong mat 3~4ms. khi con timer0, viec no interrupt moi 1ms se khien cho
 * chuong trinh di thuc hien lenh interrupt -> dan toi bo lo~ nhung tin hieu tu DHT chuyen qua
 * tu do gay loi doc tin hieu. that la dung dan khi minh tat cmn cai timer0 di <3
 */

#include "DHT11.h"
#include "delay.h"
#include "lcd/lcd.h"
#include "uart/uart.h"
#include <p18f4620.h>

//0 -> output, 1 -> input
#define DHT_TRIS    TRISDbits.RD0
#define DHT_PORT_IN    PORTDbits.RD0
#define DHT_PORT_OUT    LATDbits.LATD0

static char DHTDataArray[40];
static int DHTData[5];

static int temperature, humidity;
static char error = 0;


void initDHT() {
    DHT_TRIS = 0;
    DHT_PORT_OUT = 1;
    temperature = 0;
    humidity = 0;
}

void startQueryDHT() {
    int i, j;
    int checksum = 0;
    int reason1 = 0;
    int reason2 = 0;
    int tempTime = 0;
    for(i = 0; i < 40; i++) {
        DHTDataArray[i] = 0;
        if (i < 5) {
            DHTData[i] = 0;
        }
    }
   
    error = 0;
    //Start query
    DHT_TRIS = 0;
    DHT_PORT_OUT = 0;
    delay_ms(22);
    
    DHT_PORT_OUT = 1;
    delay_6us(7); //6 * 7 ~ 42us
    
    DHT_TRIS = 1; // set D0 as input
    
    
    
    //check for DHT response
    TMR1H = 0;
    TMR1L = 0;
    tempTime = 0;
    while(DHT_PORT_IN) {
        tempTime = TMR1L;
        tempTime = tempTime | ((int)TMR1H << 8);
        if (tempTime > 500) {
            reason1 += 1;
            return; 
        }
    }
    TMR1H = 0;
    TMR1L = 0;
    tempTime = 0;
    while(!DHT_PORT_IN) {
        tempTime = TMR1L;
        tempTime = tempTime | ((int)TMR1H << 8);
        if (tempTime > 500) {
            reason1 += 1;
            return; 
        }
    }
    TMR1H = 0;
    TMR1L = 0;
    tempTime = 0;
    while(DHT_PORT_IN) {
        tempTime = TMR1L;
        tempTime = tempTime | ((int)TMR1H << 8);
        if (tempTime > 500) {
            reason1 += 1;
            return; 
        }
    }
    
    /* read Data send by DHT
    * Data is readed bit by bit, place inside DHTDataArray
    * and then convert to integer, placed in DHTData.
    * DHTData[4] is the checksum, used for verification.
     * if there is error when reading, error is set to 1.
     */
    
    for(i = 0; i < 40; i++) {
        //theo quy uoc, ghi vao timer thi ghi TMRxH truoc
        //sau do, ghi vao TMRxL sau.
        TMR1H = 0;
        TMR1L = 0;
        tempTime = 0;
        
        while(!DHT_PORT_IN) {
            //con khi doc timer, thi doc TMRxL truoc, 
            //roi doc TMRxH sau
            tempTime = TMR1L;
            tempTime = tempTime | ((int)TMR1H << 8);
            if (tempTime > 350) {
                reason1 += 1;
                break; 
            }
        }
        
        //theo quy uoc, ghi vao timer thi ghi TMRxH truoc
        //sau do, ghi vao TMRxL sau.
        TMR1H = 0;
        TMR1L = 0;
        
        while(DHT_PORT_IN) {
            //con khi doc timer, thi doc TMRxL truoc, 
            //roi doc TMRxH sau
            tempTime = TMR1L;
            tempTime = tempTime | ((int)TMR1H << 8);
            if (tempTime > 500) {
                reason2 += 1;
                break;
            }
        }
        if (reason1 != 0 || reason2 != 0) {
//             LcdPrintStringS(0, 0, "i: ");
//            LcdPrintNumS(0, 5, i);
//            LcdPrintStringS(1, 0, "reason:");
//            LcdPrintNumS(1, 10, reason1);
//            LcdPrintNumS(1, 13, reason2);
            error = 1;
            return;
        }
        //delay_6us(1); // 6 * 5 ~ 30us
        if (tempTime > 130) {
            DHTDataArray[i] = 1; 
        }
        
    }
    
    if (reason1 != 0 || reason2 != 0) {
//        LcdPrintStringS(0, 0, "i: ");
//        LcdPrintNumS(0, 5, i);
//        LcdPrintStringS(1, 0, "reason:");
//        LcdPrintNumS(1, 10, reason1);
//        LcdPrintNumS(1, 13, reason2);
        error = 1;
        return;
    }
    
    for(j = 0; j < 5; j++) {
        for(i = 0; i < 8; i++) {
            DHTData[j] = DHTData[j] + DHTDataArray[j * 8 + i] * pow(2, (7-i));
        }
    }
    
//    //verify checksum
//    for (i = 0; i < 16; i++) {
//        LcdPrintNumS(0, i, DHTDataArray[i]);
//    }
//    for (i = 0; i < 16; i++) {
//        LcdPrintNumS(1, i, DHTDataArray[16 + i]);
//    }
    checksum = DHTData[0] + DHTData[1] + DHTData[2] + DHTData[3];
    if (checksum >= 512) checksum = checksum - 512;
    if (checksum >= 256) checksum = checksum - 256;
    if (checksum == DHTData[4]) {       //dua 2 gia tri ve he 1000 de bieu dien tren LCD voi ham LcdPrintNumPercentS.
        humidity = DHTData[0] * 100 + DHTData[1];
        temperature = DHTData[2] * 100 + DHTData[3];
    } else {
        error = 1;
    }
    return;
}

//a^b
int pow(int a, int b) {
    int res = 1;
    int i = 0;
    for(i = 0; i < b; i++) {
        res = res * a;
    }
    return res;
}

char get_DHT11_error() {
    return error;
}

double get_DHT11_temperature() {
    return temperature;
}

double get_DHT11_humidity() {
    return humidity;
}

void test() {
    if (DHT_PORT_OUT) {
        DHT_PORT_OUT = 0;
    } else {
        DHT_PORT_OUT = 1;
    }
}


