/* Sweep
 by BARRAGAN <http://barraganstudio.com>
 This example code is in the public domain.

 modified 8 Nov 2013
 by Scott Fitzgerald
 http://www.arduino.cc/en/Tutorial/Sweep
*/

#include <Servo.h>

Servo myservo;  // create servo object to control a servo
// twelve servo objects can be created on most boards

int pos = 0;    // variable to store the servo position
int usbRead = 0;

//leds
int led_chamber_1 = 2;
int led_chamber_2 = 3;

void setup(){
  Serial.begin(9600);
  pinMode(led_chamber_1, OUTPUT);
  pinMode(led_chamber_2, OUTPUT);
  myservo.attach(9);  // attaches the servo on pin 9 to the servo object  
}

void loop(){  
  if(Serial.available()){
    usbRead = Serial.read() - '0';
    Serial.print(usbRead);
    
    if(usbRead == 1){
        digitalWrite(led_chamber_1, HIGH);   // turn the LED on (HIGH is the voltage level)
        delay(1000);
    } else if(usbRead == 2){
        digitalWrite(led_chamber_1, LOW);   // turn the LED on (HIGH is the voltage level)
        delay(1000);
    } else if(usbRead == 3){
        digitalWrite(led_chamber_2, HIGH);   // turn the LED on (HIGH is the voltage level)
        delay(1000);  
    } else if(usbRead == 4){
        digitalWrite(led_chamber_2, LOW);   // turn the LED on (HIGH is the voltage level)
        delay(1000);
    }
  }
} 
