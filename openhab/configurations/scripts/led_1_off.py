import RPi.GPIO as GPIO
import time

GPIO.setmode(GPIO.BCM)
GPIO.setup(26, GPIO.OUT)

try:	
	GPIO.output(26, GPIO.LOW)

except KeyboardInterrupt:
  p.stop()
  GPIO.cleanup()
