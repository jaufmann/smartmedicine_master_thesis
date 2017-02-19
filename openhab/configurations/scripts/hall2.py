import RPi.GPIO as GPIO
import time
import os

hallSensor = 12
GPIO.setmode(GPIO.BCM)
GPIO.setup(hallSensor, GPIO.IN)

try:
	startedTime = int(time.time())
	endTime = startedTime+5	
	while True:
		currentTime = int(time.time())
		print "current",currentTime 
		print "end",endTime
		print "sig", GPIO.input(hallSensor)
		
		if GPIO.input(hallSensor) == 1:
			print "bitte box einschieben"
			os.system("/usr/bin/curl --header \"Content-Type: text/plain\" --request POST --data \"ON\" http://localhost:8080/rest/items/boxNotFound")
			os.system("/usr/bin/curl --header \"Content-Type: text/plain\" --request POST --data \"OFF\" http://localhost:8080/rest/items/playStatus")


			time.sleep(1)
			
		
		else:
			os.system("/usr/bin/curl --header \"Content-Type: text/plain\" --request POST --data \"ON\" http://localhost:8080/rest/items/dispenseMedicineBox2")
			os.system("/usr/bin/curl --header \"Content-Type: text/plain\" --request POST --data \"OFF\" http://localhost:8080/rest/items/playStatus")


			#os.system("/usr/bin/curl --header \"Content-Type: text/plain\" --request POST --data \"OFF\" http://localhost:8080/rest/items/dispenseMedicine")
			time.sleep(0.1)
			break
		time.sleep(0.1)
	
except KeyboardInterrupt:
  GPIO.cleanup()
