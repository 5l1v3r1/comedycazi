import RPi.GPIO as GPIO
import pygame
from time import sleep

pygame.mixer.init()
main_sound = pygame.mixer.Sound("start.ogg")
GPIO.setmode(GPIO.BOARD)

GPIO.setup(11, GPIO.OUT)
GPIO.setup(12, GPIO.OUT)

GPIO.output(11, GPIO.HIGH)
GPIO.output(12, GPIO.HIGH)

main_sound.play()
sleep(5)
GPIO.output(11, GPIO.LOW)
sleep(6)
GPIO.output(12, GPIO.HIGH)
