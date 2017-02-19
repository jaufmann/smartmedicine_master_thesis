import RPi.GPIO as GPIO
import time

GPIO.setmode(GPIO.BCM)
GPIO.setup(19, GPIO.OUT)

try:	
	GPIO.output(19, GPIO.HIGH)

except KeyboardInterrupt:
  p.stop()
  GPIO.cleanup()
