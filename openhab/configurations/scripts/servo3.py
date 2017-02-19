import RPi.GPIO as GPIO
import time

servoPIN = 20

GPIO.setmode(GPIO.BCM)
GPIO.setup(servoPIN, GPIO.OUT)
GPIO.setup(23, GPIO.OUT)

p = GPIO.PWM(servoPIN, 50) # GPIO 18 als PWM mit 50Hz
p.start(2.5) # Initialisierung
try:
	dutyCycleForward = 2.5
	for x in range(0, 10):
    		p.ChangeDutyCycle(dutyCycleForward )
    		time.sleep(0.3)
		dutyCycleForward = dutyCycleForward + 1

	dutyCycleBackward = 12.5
	for x in range(0, 10):
    		p.ChangeDutyCycle(dutyCycleBackward)
    		time.sleep(0.3)
		dutyCycleBackward = dutyCycleBackward - 1

	GPIO.output(23,False)
except KeyboardInterrupt:
  p.stop()
  GPIO.cleanup()
