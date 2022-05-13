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
AIO_KEY = "aio_TGyJ31Y6Dr8Ynnqk3tBYEqL2y64H"


# ----------------------------------------MQTT---------------------------------------------------

def connected(client):
    print("Ket noi thanh cong...")
    for feed in AIO_FEED_ID_DEVICES:
        client.subscribe(AIO_FEED_ID_DEVICES[feed])
    # client.subscribe(AIO_FEED_ID_SENSORS)   #sensor
    # client.subscribe(AIO_FEED_IDS_TEST)
    # for feed1 in AIO_FEED_ID_SENSORS:
    #     client.subscribe(AIO_FEED_ID_SENSORS[feed1])


def subscribe(client, userdata, mid, granted_qos):
    print("Subscribe thanh cong...")


def disconnected(client):
    print("Ngat ket noi...")
    sys.exit(1)


def message(client, feed_id, payload):
    print(feed_id + " nhan du lieu: " + payload)
    print(type(payload))
    global device_ready
    # if device_ready:
    # SendToBoard(feed_id, payload)
        # device_ready = 0


client = MQTTClient(AIO_USERNAME, AIO_KEY)
client.on_connect = connected
client.on_disconnect = disconnected
client.on_message = message
client.on_subscribe = subscribe
client.connect()
client.loop_background()

# ----------------------------------------MQTT---------------------------------------------------
# i = 0
# while True:
#     # if isMicrobitConnected:
#     for j in range(0, NUM_OF_DEVICE):
#         readSerial(ser[j], j)
#
#     i = (i + 1) % 5
#     if i == 0:
#         send_to_ada()
#         # print_send_json()
#         print("--------------------------------")
#     time.sleep(1)

    # value = random.randint(0,100)
    # print("Cap nhat: ", value)
    # client.publish("bbc-temp", value)
    #
    # currentLed = client.receive("bbc-temp")
    # print(currentLed)
    # print("done")
    #
    # time.sleep(10)

# De gui du lieu len Ada:
LED_string = "\"board1\": { \"0\": 3, \"1\": 0 }"

LED_json = {"board1":{"0":3, "1": 0}}
door1 = {"board1":{"0":{"motor":0,"lock":0}}}
door2 = {"board1":{"0":{"motor":1,"lock":0}}}
door3 = {"board1":{"0":{"motor":0,"lock":1}}}

# LED_string la mot chuoi json dung dinh dang
client.publish(AIO_FEED_ID_DEVICES["LED"], LED_string)

client.publish(AIO_FEED_ID_DEVICES["LED"], json.dumps(LED_json))

client.publish(AIO_FEED_ID_DEVICES["door"], json.dumps(door1))  #lock
client.publish(AIO_FEED_ID_DEVICES["door"], json.dumps(door2))
client.publish(AIO_FEED_ID_DEVICES["door"], json.dumps(door3))
