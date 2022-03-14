import json
import sys
from Adafruit_IO import MQTTClient
import random
import time
import serial.tools.list_ports
# from Adafruit_IO import Client, Feed, Data


#----------------------------------------SERIAL COMMUNICATION-----------------------------------
'''
Cac thuoc tinh cua device:
humid, temperature, LDR, door, gas la thuoc tinh dang input, se doc len server
LED, curtain, conditioner la thuoc tinh output, do minh dieu khien
'''
device_info = {"humid": 0, "temperature": 0,
               "LDR": {"1": 0, "2": 0, "3": 0, "4": 0},
               "LED": {"0": 0, "1": 0, "2": 0, "3": 0},
               "curtain": 0,
               "door": 0,
               "conditioner": {"power": 0, "temp": 22},
               "gas": 0}

'''
moi khi gui command, ong hay set bien nay ve 0. cho cho toi khi device gui ve OK, nghia la
device da thuc hien xong cong viec, bien nay se duoc set len 1.
ong chi goi ham gui command khi bien nay = 1. neu bien nay = 0, ong khong nen gui command toi device.
'''
device_ready = 1

#danh sach cac ham gui command ve board.
'''
gui serial command de bat den theo cac che do khac nhau
LedIndex: [0,3]
mode: [0,3] -> 0:tat, 1:sang den trai, 2:sang den phai, 3:sang 2 den
'''
def set_led(ledIndex, mode):
    command = "!setLed:" + str(ledIndex) + ":" + str(mode) + "*"
    print(command)
    ser.write(command.encode())

'''
gui serial command de dong mo rem cua
mode: [0,2] -> 0:dong rem, 1:mo rem 1 nua, 2:mo het rem.
'''
def set_curtain(mode):
    command = "!setCurtain:" + str(mode) + "*"
    print(command)
    ser.write(command.encode())

'''
gui serial command de tat mo may lanh va thay doi nhiet do
is_on: [0,1] -> 0: tat may lanh, 1: mo may lanh
temp: [0,99] : gia tri nhiet do may lanh
'''
def set_conditioner(is_on, temp):
    command = f'!setConditioner:{is_on}:{temp}*'        #f' string in python.
    print(command)
    ser.write(command.encode())

'''
gui serial command de set 4 den lan luot la den 0, 1, 2, 3 voi mode0, mode1, mode2, mode3
'''
def set_mul_led(mode0, mode1, mode2, mode3):
    command = f'!setMulLed:{mode0}:{mode1}:{mode2}:{mode3}*'
    print(command)
    ser.write(command.encode())


'''
gui serial command de dong mo cua. 1 de mo cua, 0 de dong cua.
'''
def set_door(open):
    command = f'!setDoor:{open}*'
    print(command)
    ser.write(command.encode())


def getPort():
    ports = serial.tools.list_ports.comports()
    N = len(ports)
    commPort = "None"
    for i in range(0, N):
        port = ports[i]
        strPort = str(port)
        # print(strPort)  -> COM3 - USB-SERIAL CH340 (COM3)
        # dung lenh sau neu ket noi board that
        # if "USB Serial Device" in strPort:
        #     splitPort = strPort.split(" ")
        #     commPort = (splitPort[0])
        # dung lenh sau neu dung port ao
        if "Virtual Serial Port" in strPort:
            splitPort = strPort.split(" ")
            commPort = splitPort[0]
    return commPort

def print_data():
    global device_info
    print("---------------------------------------------------------------------")
    print("temperature = ", device_info["temperature"])
    print("humid = ", device_info["humid"])
    print("LDR1 = ", device_info["LDR"]["1"], "; LDR2 = ", device_info["LDR"]["2"],
          "\r\nLDR3 = ", device_info["LDR"]["3"], "; LDR4 = ", device_info["LDR"]["4"])
    print("LED0 = ", device_info["LED"]["0"], "; LED1 = ", device_info["LED"]["1"],
          "\r\nLED2 = ", device_info["LED"]["2"], "; LED3 = ", device_info["LED"]["3"])
    print("curtain = ", device_info["curtain"])
    print("door = ", device_info["door"])
    print("conditioner: power = ", device_info["conditioner"]["power"], " temp = ", device_info["conditioner"]["temp"])
    print("gas = ", device_info["gas"])

'''
 message kieu: !abc*
 xu ly du lieu. Neu du lieu nhan duoc la chuoi json chua thong tin, loads no vao device_info
 Neu nhan duoc !OK*, set device_ready = 1.
'''
'''
 Co 2 nhom input tu board -> GW:
    + Cac input thay doi lien tuc: sensor
    + Cac input it co su thay doi: LED, may lanh, rem, cua
'''
'''
 DeviceHandle: Kiem tra su thay doi input cua cac thiet bi duoc dieu khien (LED, may lanh,
rem, cua). Neu input thay doi thi moi publish len Ada server -> tranh viec gui qua 
nhieu lan
'''
def DeviceHandle(temp_info):
    if temp_info["LED"] != device_info["LED"]:
        LED_json = {"value": {"0": temp_info["LED"]["0"], "1": temp_info["LED"]["1"],
                              "2": temp_info["LED"]["2"], "3": temp_info["LED"]["3"]}}
        client.publish(AIO_FEED_IDS["LED"], json.dumps(LED_json))
    if temp_info["conditioner"] != device_info["conditioner"]:
        cond_json = {"value":{"power":temp_info["conditioner"]["power"],"temp":temp_info["conditioner"]["temp"]}}
        client.publish(AIO_FEED_IDS["conditioner"], json.dumps(cond_json))
    if temp_info["curtain"] != device_info["curtain"]:
        client.publish(AIO_FEED_IDS["curtain"], temp_info["curtain"])
    if temp_info["door"] != device_info["door"]:
        client.publish(AIO_FEED_IDS["door"], temp_info["door"])

'''
SensorHandle: gui tin hieu tu cac sensor len Ada 
'''
def SensorHandle():
    # Send temp and humid
    dht11_json = {"value": {"humid": device_info["humid"], "temperature": device_info["temperature"]}}
    client.publish(AIO_FEED_IDS["dht11"], json.dumps(dht11_json))
    # Send light sensor
    # "LDR": {"1": 0, "2": 0, "3": 0, "4": 0},
    LDR_json = {"value": {"1": device_info["LDR"]["1"], "2": device_info["LDR"]["2"],
                          "3": device_info["LDR"]["3"], "4": device_info["LDR"]["4"]}}
    client.publish(AIO_FEED_IDS["LDR"], json.dumps(LDR_json))
    # Send gas sensor
    client.publish(AIO_FEED_IDS["gas"], device_info["gas"])

def processData(data):
    data = data.replace("!", "")
    data = data.replace("*", "")
    # splitData = data.split(":")
    # print(splitData)
    # if splitData[1] == "TEMP":
    #     client.publish("bbc-temp", splitData[2])
    global device_info
    global device_ready
    if data == "OK":
        device_ready = 1
        print("device ready")
    else:
        temp_device_info = json.loads(data)
        DeviceHandle(temp_device_info)
        device_info = temp_device_info
        SensorHandle()


serial_messages = ""
'''
Kiem tra du lieu serial duoc truyen qua UART, neu co du lieu
tien hanh processData
'''
def readSerial():
    bytesToRead = ser.inWaiting()
    if (bytesToRead > 0):
        global serial_messages
        serial_messages = serial_messages + ser.read(bytesToRead).decode("UTF-8")
        # print(serial_messages)
        while ("!" in serial_messages) and ("*" in serial_messages):
            start = serial_messages.find("!")
            end = serial_messages.find("*")
            processData(serial_messages[start:end + 1])
            if (end == len(serial_messages)):
                serial_messages = ""
            else:
                serial_messages = serial_messages[end+1:]
    else:
        pass


isMicrobitConnected = False
ser = serial.Serial( port="COM2", baudrate=9600) #baudrate=115200
# if getPort() != "None":
#     print(getPort())
#     isMicrobitConnected = True
#----------------------------------------SERIAL COMMUNICATION-----------------------------------


#----------------------------------------MQTT---------------------------------------------------
# AIO_FEED_IDS = ["bbc-led","bbc-dht11","bbc-conditioner","bbc-ldr","bbc-door","bbc-curtain","bbc-gas"]
AIO_FEED_IDS = {
               "dht11": "bbc-dht11",
               "LDR": "bbc-ldr",
               "LED": "bbc-led",
               "curtain": "bbc-curtain",
               "door": "bbc-door",
               "conditioner": "bbc-conditioner",
               "gas": "bbc-gas",
               }
# AIO_FEED_IDS_TEST = "bbc-curtain"
AIO_USERNAME = "namdiep239"
AIO_KEY = "aio_cSFh41uOGJgJ3IyiK0f0evTUtDOw"

def connected(client):
    print("Ket noi thanh cong...")
    for feed in AIO_FEED_IDS:
        client.subscribe(AIO_FEED_IDS[feed])
    # client.subscribe(AIO_FEED_IDS_TEST)

def subscribe(client, userdata, mid, granted_qos):
    print("Subscribe thanh cong...")

def disconnected(client):
    print("Ngat ket noi...")
    sys.exit(1)

def message(client, feed_id, payload):
    print(feed_id + " nhan du lieu: " + payload)
    # print(type(payload))
    global device_ready
    if device_ready:
        if (feed_id == AIO_FEED_IDS["LED"]):
            payload_json = json.loads(payload)
            set_mul_led(payload_json["0"],payload_json["1"],payload_json["2"],payload_json["3"])
            device_ready = 0
        elif (feed_id == AIO_FEED_IDS["curtain"]):
            set_curtain(payload)
            device_ready = 0
        elif (feed_id == AIO_FEED_IDS["conditioner"]):
            payload_json = json.loads(payload)
            set_conditioner(payload_json["power"],payload_json["temp"])
            device_ready = 0

client = MQTTClient(AIO_USERNAME, AIO_KEY)
client.on_connect = connected
client.on_disconnect = disconnected
client.on_message = message
client.on_subscribe = subscribe
client.connect()
client.loop_background()

#----------------------------------------MQTT---------------------------------------------------
i = 0
while True:
    # if isMicrobitConnected:
    readSerial()

    i = (i + 1) % 5
    if i == 0:
        print_data()
    time.sleep(1)

    # value = random.randint(0,100)
    # print("Cap nhat: ", value)
    # client.publish("bbc-temp", value)
    #
    # currentLed = client.receive("bbc-temp")
    # print(currentLed)
    # print("done")
    #
    # time.sleep(10)

