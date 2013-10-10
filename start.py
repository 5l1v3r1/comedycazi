import RPi.GPIO as GPIO
import pygame

GPIO.setmode(GPIO.BOARD)

GPIO.setup(11, GPIO.OUT)
GPIO.setup(12, GPIO.OUT)
