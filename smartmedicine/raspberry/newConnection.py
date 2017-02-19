#!/usr/bin/env python

import serial
import time

usbCom = serial.Serial('/dev/ttyACM0', 9600)

usbCom.write('1')

usbCom.write('3')


#while True:

#	response = usbCom.readline()
#	print "python printed:", response
