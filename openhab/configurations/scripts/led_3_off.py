import RPi.GPIO as GPIO
import time

GPIO.setmode(GPIO.BCM)
GPIO.setup(13, GPIO.OUT)

try:	
	GPIO.output(13, GPIO.LOW)

except KeyboardInterrupt:
  p.stop()
  GPIO.cleanup()
