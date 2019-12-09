#ifndef __CC3200R1M1RGC__
#include <SPI.h>
#endif
#include <WiFi.h>

//network credentials
char ssid[] = "ExampleNetwork";
char password[] = "ExamplePassword";

//duplicate command flag
int prevCmd = -1;

//main power
int mainPower = P10_4;
bool power = false;

//pulse flag
bool pulseFlag = false;

//server to maintain internet
WiFiServer server(80);

//colors
const int green = P7_4;
const int red = P7_7;
const int blue = P7_6;

//array to hold active colors
int colors[4];

void setup() {
  Serial.begin(115200);      // initialize serial communication
  pinMode(mainPower, OUTPUT);      // set the LED pin mode
  colors[0] = red;
  colors[1] = green;
  colors[2] = blue;
  pinMode(red, OUTPUT);
  pinMode(green, OUTPUT);
  pinMode(blue, OUTPUT);
  digitalWrite(red, HIGH);
  digitalWrite(green, HIGH);
  digitalWrite(blue, HIGH);

  // attempt to connect to Wifi network:
  Serial.print("Attempting to connect to Network named: ");
  // print the network name (SSID);
  Serial.println(ssid);
  // Connect to WPA/WPA2 network. Change this line if using open or WEP network:
  WiFi.begin(ssid, password);
  while ( WiFi.status() != WL_CONNECTED) {
    // print dots while we wait to connect
    Serial.print(".");
    delay(300);
  }

  Serial.println("\nYou're connected to the network");
  Serial.println("Waiting for an ip address");

  while (WiFi.localIP() == INADDR_NONE) {
    // print dots while we wait for an ip addresss
    Serial.print(".");
    delay(300);
  }

  Serial.println("\nIP Address obtained");

  // you're connected now, so print out the status
  printWifiStatus();

  Serial.println("Starting webserver on port 80");
  server.begin();                           // start the web server on port 80
  Serial.println("Webserver started!");
  manageLights();
}

void loop() {
  int i = 0;
  char command[100] = {0};
  WiFiClient client = server.available();   // listen for incoming clients
  if (client) {
    client.println("you have connected");
    // if you get a client,
    char buffer[150] = {0};                 // make a buffer to hold incoming data
    while (client.connected()) {            // loop while the client's connected
      if (client.available()) {             // if there's bytes to read from the client,
        char c = client.read();
        command[i] = c;
        if (c == '\n') {                    // if the byte is a newline character

          // if the current line is blank, you got two newline characters in a row.
          // that's the end of the client HTTP request, so send a response:
          if (!strlen(buffer) == 0) {

            memset(buffer, 0, 150);
            i = 0;
          }
        }
        else if (c != '\r') {    // if you got anything else but a carriage return character,
          buffer[i++] = c;      // add it to the end of the currentLine
        }

      }
    }
    processCommand(command, client);
  }
  if (pulseFlag) {
    pulse();
  }
  else {
    manageLights();
  }
}

  void processCommand(char* input, WiFiClient client) {
    int cmd = -1;

    if ( strcmp("toggle_light_status", input) == 0) {
      cmd = 0;
    }
    else if ( strcmp("toggle_pulse_status", input) == 0) {
      cmd = 1;
    }
    else if ( strcmp("toggle_red", input) == 0) {
      cmd = 2;
    }
    else if ( strcmp("toggle_blue", input) == 0) {
      cmd = 3;
    }
    else if ( strcmp("toggle_green", input) == 0) {
      cmd = 4;
    }

    if (prevCmd != cmd) {
      Serial.print("incoming command: ");
      Serial.println(input);
      client.println("from device:");
      disableAll();
      switch (cmd) {
        case 0:
          prevCmd = 0;
          toggleMainPower();
          client.print("power status: ");
          client.println(power);
          break;
        case 1:
          togglePulseFlag();

          Serial.print("pulse status: ");
          Serial.println(pulseFlag);
          break;
        default:
          break;
        case 2:
          manageColors(red);
          break;
        case 3:
          manageColors(blue);
          break;
        case 4:
          manageColors(green);
          break;
      }
    }
    else {
      prevCmd = -1;
    }
  }

  void pulse() {
    Serial.println("pulseMode");
    // fade in from min to max in increments of 5 points:
    Serial.println(red);
    Serial.println(green);
    Serial.println(blue);
    for (int fadeValue = 0 ; fadeValue <= 255; fadeValue += 5) {
      // sets the value (range from 0 to 255):
      if (colors[0] != -1) {
        analogWrite(red, fadeValue);
      }
      if (colors[1] != -1) {
        analogWrite(green, fadeValue);
      }
      if (colors[2] != -1) {
        analogWrite(blue, fadeValue);
      }
      // wait for 30 milliseconds to see the dimming effect
      delay(30);
    }

    // fade out from max to min in increments of 5 points:
    for (int fadeValue = 255 ; fadeValue >= 0; fadeValue -= 5) {
      // sets the value (range from 0 to 255):
      if (colors[0] != -1) {
        analogWrite(red, fadeValue);
      }
      if (colors[1] != -1) {
        analogWrite(green, fadeValue);
      }
      if (colors[2] != -1) {
        analogWrite(blue, fadeValue);
      }
      // wait for 30 milliseconds to see the dimming effect
      delay(30);
    }
  }

  void manageLights() {
    if (colors[0] != -1) {
      pinMode(red, OUTPUT);
      digitalWrite(red, LOW);
      colors[0] = -1;
    }
    else {
      digitalWrite(red, HIGH);
    }
    if (colors[1] != -1) {
      pinMode(green, OUTPUT);
      digitalWrite(green, LOW);
      colors[1] = -1;
    }
    else {
      digitalWrite(green, HIGH);
    }
    if (colors[2] != -1) {
      pinMode(blue, OUTPUT);
      digitalWrite(blue, LOW);
      colors[2] = -1;
    }
    else {
      digitalWrite(blue, HIGH);
    }
  }

void toggleMainPower() {
  if (power) {
    digitalWrite(mainPower, LOW);
    power = false;
    digitalWrite(red, HIGH);
    digitalWrite(green, HIGH);
    digitalWrite(blue, HIGH);
    }
  else {
    digitalWrite(mainPower, HIGH);
    power = true;
  }
}

void togglePulseFlag() {
  if (pulseFlag) {
    pulseFlag = false;
  }
  else {
    pulseFlag = true;
  }
}

void disableAll() {
  pulseFlag = 0;
}

void printWifiStatus() {
  // print the SSID of the network you're attached to:
  Serial.print("SSID: ");
  Serial.println(WiFi.SSID());

  // print your WiFi IP address:
  IPAddress ip = WiFi.localIP();
  Serial.print("IP Address: ");
  Serial.println(ip);

  // print the received signal strength:
  long rssi = WiFi.RSSI();
  Serial.print("signal strength (RSSI): ");
  Serial.print(rssi);
  Serial.println(" dBm");
}

void manageColors(int color) {
  switch (color) {
    case red:
      if (colors[0] == -1) {
        colors[0] = red;
      }
      else {
        colors[0] = -1;
      }
      break;
    case green:
      if (colors[1] == -1) {
        colors[1] = green;
      }
      else {
        colors[1] = -1;
      }
      break;
    case blue:
      if (colors[2] == -1) {
        colors[2] = blue;
      }
      else {
        colors[2] = -1;
      }
      break;
  }
}
