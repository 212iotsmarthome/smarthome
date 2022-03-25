import json
import sys
from Adafruit_IO import MQTTClient
import random
import time
import serial.tools.list_ports

# from Adafruit_IO import Client, Feed, Data

AIO_FEED_ID_DEVICES = {
    "LED": "bbc-led",
    "curtain": "bbc-curtain",
    "door": "bbc-door",
    "conditioner": "bbc-conditioner",
    "buzzer": "bbc-buzzer"
}
AIO_FEED_ID_SENSORS = "bbc-sensor"

AIO_USERNAME = "namdiep239"
AIO_KEY = "aio_cSFh41uOGJgJ3IyiK0f0evTUtDOw"

# ----------------------------------------SERIAL COMMUNICATION-----------------------------------
NUM_OF_DEVICE = 1
'''
Cac thuoc tinh cua device:
humid, temperature, LDR, door, gas la thuoc tinh dang input, se doc len server
LED, curtain, conditioner, buzzer la thuoc tinh output, do minh dieu khien
'''
device_info = []
for i in range(0, NUM_OF_DEVICE):
    device_info.append({"deviceID": "board1",
                        "DHT11": {"0": {"humid": 71.0, "temperature": 27.0}},
                        "LDR": {"1": 72, "2": 706},
                        "LED": {"0": 0, "1": 0},
                        "curtain": {"0": 0},
                        "door": {"0": {"motor": 1, "lock": 0}},
                        "conditioner": {"0": {"power": 0, "temp": 22}},
                        "gas": {"0": 1},
                        "buzzer": {"0": 0}})

'''
moi khi gui command, ong hay set bien nay ve 0. cho cho toi khi device gui ve OK, nghia la
device da thuc hien xong cong viec, bien nay se duoc set len 1.
ong chi goi ham gui command khi bien nay = 1. neu bien nay = 0, ong khong nen gui command toi device.
'''
device_ready = 1

# danh sach cac ham gui command ve board.
'''
gui serial command de bat den theo cac che do khac nhau
LedIndex: [0,1]
mode: [0,3] -> 0:tat, 1:sang den trai, 2:sang den phai, 3:sang 2 den
'''


def set_led(ser, ledIndex, mode):
    command = "!setLed:" + str(ledIndex) + ":" + str(mode) + "*"
    print(command)
    ser.write(command.encode())  # chuyen du lieu ve dang binary de chuyen sang uart.


'''
gui serial command de dong mo rem cua
mode: [0,2] -> 0:dong rem, 1:mo rem 1 nua, 2:mo het rem.
'''


def set_curtain(ser, mode):
    command = "!setCurtain:" + str(mode) + "*"
    print(command)
    ser.write(command.encode())


'''
gui serial command de tat mo may lanh va thay doi nhiet do
is_on: [0,1] -> 0: tat may lanh, 1: mo may lanh
temp: [0,99] : gia tri nhiet do may lanh
'''


def set_conditioner(ser, is_on, temp):
    command = f'!setConditioner:{is_on}:{temp}*'  # f' string in python.
    print(command)
    ser.write(command.encode())


'''
gui serial command de set 4 den lan luot la den 0, 1 voi mode0, mode1
'''


def set_mul_led(ser, mode0, mode1):
    command = f'!setMulLed:{mode0}:{mode1}*'
    print(command)
    ser.write(command.encode())


'''
gui serial command de dong mo cua. open: 1 de mo cua, 0 de dong cua; lock: 1 de mo khoa, 0 de khoa.
'''


def set_door(ser, open, lock):
    command = f'!setDoor:{open}:{lock}*'
    print(command)
    ser.write(command.encode())


'''
gui serial command de tat mo buzzer. 1 de mo loa, 0 de tat loa
'''


def set_buzzer(ser, open):
    command = f'!setBuzzer:{open}*'
    print(command)
    ser.write(command.encode())


def getPort():
    ports = serial.tools.list_ports.comports()
    N = len(ports)
    commPort = "None"
    for i in range(0, N):
        port = ports[i]
        strPort = str(port)
        print(strPort)
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
    print("LDR1 = ", device_info["LDR"]["1"], "; LDR2 = ", device_info["LDR"]["2"])
    print("LED0 = ", device_info["LED"]["0"], "; LED1 = ", device_info["LED"]["1"])
    print("curtain = ", device_info["curtain"])
    print("door = ", device_info["door"])
    print("conditioner: power = ", device_info["conditioner"]["power"], " temp = ", device_info["conditioner"]["temp"])
    print("gas = ", device_info["gas"], " buzzer = ", device_info["buzzer"])


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
new_led_data = 0
new_conditioner_data = 0
new_curtain_data = 0
new_door_data = 0
new_buzzer_data = 0

LED_json = {"value": {}}
cond_json = {"value": {}}
curtain_json = {"value": {}}
door_json = {"value": {}}
sensor_json = {"value": {}}
buzzer_json = {"value": {}}
'''
 DeviceHandle: Kiem tra su thay doi input cua cac thiet bi duoc dieu khien (LED, may lanh,
rem, cua). Neu input thay doi thi moi publish len Ada server -> tranh viec gui qua 
nhieu lan
'''


def DeviceHandle(temp_info, index):
    global new_led_data, new_door_data, new_curtain_data, new_conditioner_data, new_buzzer_data
    global LED_json, cond_json, curtain_json, door_json, buzzer_json
    if temp_info["LED"] != device_info[index]["LED"]:
        new_led_data = 1
        # LED_json = {"value": {"0": temp_info["LED"]["0"], "1": temp_info["LED"]["1"]}}
        # client.publish(AIO_FEED_ID_DEVICES["LED"], json.dumps(LED_json))
    if temp_info["conditioner"] != device_info[index]["conditioner"]:
        new_conditioner_data = 1
        # cond_json = {"value":{"power":temp_info["conditioner"]["power"],"temp":temp_info["conditioner"]["temp"]}}
        # client.publish(AIO_FEED_ID_DEVICES["conditioner"], json.dumps(cond_json))
    if temp_info["curtain"] != device_info[index]["curtain"]:
        new_curtain_data = 1
        # client.publish(AIO_FEED_ID_DEVICES["curtain"], temp_info["curtain"])
    if temp_info["door"] != device_info[index]["door"]:
        new_door_data = 1
        # client.publish(AIO_FEED_ID_DEVICES["door"], temp_info["door"])
    if temp_info["buzzer"] != device_info[index]["buzzer"]:
        new_buzzer_data = 1
    LED_json["value"][temp_info["deviceID"]] = temp_info["LED"]
    cond_json["value"][temp_info["deviceID"]] = temp_info["conditioner"]
    curtain_json["value"][temp_info["deviceID"]] = temp_info["curtain"]
    door_json["value"][temp_info["deviceID"]] = temp_info["door"]
    buzzer_json["value"][temp_info["deviceID"]] = temp_info["buzzer"]


'''
SensorHandle: gui tin hieu tu cac sensor len Ada 
'''


def SensorHandle(index):
    # Send temp and humid
    global sensor_json
    sensor_json["value"][device_info[index]["deviceID"]] = {}
    sensor_json["value"][device_info[index]["deviceID"]]["DHT11"] = device_info[index]["DHT11"]
    sensor_json["value"][device_info[index]["deviceID"]]["LDR"] = device_info[index]["LDR"]
    sensor_json["value"][device_info[index]["deviceID"]]["gas"] = device_info[index]["gas"]


def processData(data, index):
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
        try:
            temp_device_info = json.loads(data)
            # kiem tra su thay doi input cua cac device va gui
            DeviceHandle(temp_device_info, index)
            # load vao device_info
            device_info[index] = temp_device_info
            # gui input cua sensor (ko can kiem tra)
            SensorHandle(index)
        except:
            pass



# serial_messages = ""
'''
Kiem tra du lieu serial duoc truyen qua UART, neu co du lieu
tien hanh processData
'''

serial_messages = []
for i in range(0, NUM_OF_DEVICE):
    serial_messages.append("")


def readSerial(ser, index):
    bytesToRead = ser.inWaiting()
    global serial_messages
    if bytesToRead > 0:
        serial_messages[index] = serial_messages[index] + ser.read(bytesToRead).decode("UTF-8")
        # print(serial_messages)
        while ("!" in serial_messages[index]) and ("*" in serial_messages[index]):
            start = serial_messages[index].find("!")
            end = serial_messages[index].find("*")
            if end < start:
                serial_messages[index] = serial_messages[index][end + 1:]
                end = serial_messages[index].find("*")
                if end == -1:
                    return
            processData(serial_messages[index][start:end + 1], index)
            if end == len(serial_messages[index]):
                serial_messages[index] = ""
            else:
                serial_messages[index] = serial_messages[index][end + 1:]
    else:
        pass


def send_to_ada():
    global new_led_data, new_door_data, new_curtain_data, new_conditioner_data, new_buzzer_data
    if new_led_data == 1:
        print(f'send to {AIO_FEED_ID_DEVICES["LED"]}', LED_json)
        new_led_data = 0
        client.publish(AIO_FEED_ID_DEVICES["LED"], json.dumps(LED_json))
    if new_conditioner_data == 1:
        print(f'send to {AIO_FEED_ID_DEVICES["conditioner"]}', cond_json)
        new_conditioner_data = 0
        client.publish(AIO_FEED_ID_DEVICES["conditioner"], json.dumps(cond_json))
    if new_curtain_data == 1:
        print(f'send to {AIO_FEED_ID_DEVICES["curtain"]}', curtain_json)
        new_curtain_data = 0
        client.publish(AIO_FEED_ID_DEVICES["curtain"], json.dumps(curtain_json))
    if new_door_data == 1:
        print(f'send to {AIO_FEED_ID_DEVICES["door"]}', door_json)
        new_door_data = 0
        client.publish(AIO_FEED_ID_DEVICES["door"], json.dumps(door_json))
    if new_buzzer_data == 1:
        print(f'send to {AIO_FEED_ID_DEVICES["buzzer"]}', buzzer_json)
        client.publish(AIO_FEED_ID_DEVICES["buzzer"], json.dumps(buzzer_json))
        new_buzzer_data = 0
        # buzzer
    client.publish(AIO_FEED_ID_SENSORS, json.dumps(sensor_json))
    print(f'send to {AIO_FEED_ID_SENSORS}', sensor_json)


def print_send_json():
    print(f'send to {AIO_FEED_ID_DEVICES["LED"]}', LED_json)
    print(f'send to {AIO_FEED_ID_DEVICES["conditioner"]}', cond_json)
    print(f'send to {AIO_FEED_ID_DEVICES["curtain"]}', curtain_json)
    print(f'send to {AIO_FEED_ID_DEVICES["door"]}', door_json)
    print(f'send to {AIO_FEED_ID_DEVICES["buzzer"]}', buzzer_json)
    print(f'send to {AIO_FEED_ID_SENSORS}', sensor_json)




isMicrobitConnected = False
ser = []
for i in range(0, NUM_OF_DEVICE):
    ser.append(serial.Serial(port="COM3", baudrate=9600))  # baudrate=115200


# if getPort() != "None":
#     print(getPort())
#     isMicrobitConnected = True
# ----------------------------------------SERIAL COMMUNICATION-----------------------------------


# ----------------------------------------MQTT---------------------------------------------------

def connected(client):
    print("Ket noi thanh cong...")
    for feed in AIO_FEED_ID_DEVICES:
        client.subscribe(AIO_FEED_ID_DEVICES[feed])
    # client.subscribe(AIO_FEED_IDS_TEST)
    # for feed1 in AIO_FEED_ID_SENSORS:
    #     client.subscribe(AIO_FEED_ID_SENSORS[feed1])


def subscribe(client, userdata, mid, granted_qos):
    print("Subscribe thanh cong...")


def disconnected(client):
    print("Ngat ket noi...")
    sys.exit(1)


def SendToBoard(feed_id, payload):
    for i in range(0, NUM_OF_DEVICE):
        bytes = ser[i].inWaiting()
        if bytes > 0:
            trash_data = ser[i].read(bytes)
    try:
        payload_json = json.loads(payload)
    except:
        return
    global device_info
    if (feed_id == AIO_FEED_ID_DEVICES["LED"]):

        # payload_json se co dang kieu: {"board1":{"0":1, "1":0}, "board2": {"0":1, "1":1}}
        for key in payload_json:
            for index in range(0, NUM_OF_DEVICE):
                if device_info[index]["deviceID"] == key:
                    set_mul_led(ser[index], payload_json[key]["0"], payload_json[key]["1"])
                    # cap nhat device_info de ko bi gui 2 lan
                    device_info[index]["LED"] = payload_json[key]
                    break

    elif (feed_id == AIO_FEED_ID_DEVICES["curtain"]):
        payload_json = json.loads(payload)
        # payload_json se co dang kieu: {"board1": {"0":0}, "board2": {"0":1}}
        for key in payload_json:
            for index in range(0, NUM_OF_DEVICE):
                if device_info[index]["deviceID"] == key:
                    set_curtain(ser[index], payload_json[key]["0"])
                    # cap nhat device_info de ko bi gui 2 lan
                    device_info[index]["curtain"] = payload_json[key]
                    break

    elif (feed_id == AIO_FEED_ID_DEVICES["conditioner"]):
        payload_json = json.loads(payload)
        # payload_json se co dang kieu: {"board1": {"0":{"power": 1, "temp": 22}}, "board2": {"0":{"power": 0, "temp": 22}}}
        for key in payload_json:
            for index in range(0, NUM_OF_DEVICE):
                if device_info[index]["deviceID"] == key:
                    set_conditioner(ser[index], payload_json[key]["0"]["power"], payload_json[key]["0"]["temp"])
                    # cap nhat device_info de ko bi gui 2 lan
                    device_info[index]["conditioner"] = payload_json[key]
                    break

    elif (feed_id == AIO_FEED_ID_DEVICES["door"]):
        payload_json = json.loads(payload)
        # payload_json se co dang kieu: {"board1": {"0":{"motor":0, "lock":1}}, "board2": {"0":{"motor":0, "lock":1}}}
        for key in payload_json:
            for index in range(0, NUM_OF_DEVICE):
                if device_info[index]["deviceID"] == key:
                    set_door(ser[index], payload_json[key]["0"]["motor"], payload_json[key]["0"]["lock"])
                    # cap nhat device_info de ko bi gui 2 lan
                    device_info[index]["door"] = payload_json[key]
                    break

    elif (feed_id == AIO_FEED_ID_DEVICES["buzzer"]):
        payload_json = json.loads(payload)
        # payload_json se co dang kieu: {"board1": {"0":0}, "board2": {"0":1}}
        for key in payload_json:
            for index in range(0, NUM_OF_DEVICE):
                if device_info[index]["deviceID"] == key:
                    set_buzzer(ser[index], payload_json[key]["0"])
                    # cap nhat device_info de ko bi gui 2 lan
                    device_info[index]["buzzer"] = payload_json[key]
                    break


def message(client, feed_id, payload):
    print(feed_id + " nhan du lieu: " + payload)
    print(type(payload))
    global device_ready
    if device_ready:
        SendToBoard(feed_id, payload)
        device_ready = 0


client = MQTTClient(AIO_USERNAME, AIO_KEY)
client.on_connect = connected
client.on_disconnect = disconnected
client.on_message = message
client.on_subscribe = subscribe
client.connect()
client.loop_background()

# ----------------------------------------MQTT---------------------------------------------------
i = 0
while True:
    # if isMicrobitConnected:
    for j in range(0, NUM_OF_DEVICE):
        readSerial(ser[j], j)

    i = (i + 1) % 5
    if i == 0:
        send_to_ada()
        # print_send_json()
        print("--------------------------------")
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
