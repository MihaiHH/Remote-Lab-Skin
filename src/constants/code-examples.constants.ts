import { CodeExample } from '../models/code.model';

export const ESP32_CODE_EXAMPLE: string = `#include <WiFi.h>
#include <esp_wifi.h>
#include <AsyncTCP.h>
#include <ESPAsyncWebServer.h>
#include <ElegantOTA.h>

bool ledState = 0;
const int ledPin = 2;

// Create AsyncWebServer object on port 80
AsyncWebServer server(80);
AsyncWebSocket ws("/ws");

const char index_html[] PROGMEM = R"rawliteral(
<!DOCTYPE HTML><html>
<head>
  <title>ESP Web Server</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="icon" href="data:,">
  <style>
  html {
    font-family: Arial, Helvetica, sans-serif;
    text-align: center;
  }
  h1 {
    font-size: 1.8rem;
    color: white;
  }
  h2{
    font-size: 1.5rem;
    font-weight: bold;
    color: #143642;
  }
  .topnav {
    overflow: hidden;
    background-color: #143642;
  }
  body {
    margin: 0;
  }
  .content {
    padding: 30px;
    max-width: 600px;
    margin: 0 auto;
  }
  .card {
    background-color: #F8F7F9;;
    box-shadow: 2px 2px 12px 1px rgba(140,140,140,.5);
    padding-top:10px;
    padding-bottom:20px;
  }
  .button {
    padding: 15px 50px;
    font-size: 24px;
    text-align: center;
    outline: none;
    color: #fff;
    background-color: #0f8b8d;
    border: none;
    border-radius: 5px;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
   }
   /*.button:hover {background-color: #0f8b8d}*/
   .button:active {
     background-color: #0f8b8d;
     box-shadow: 2 2px #CDCDCD;
     transform: translateY(2px);
   }
   .state {
     font-size: 1.5rem;
     color:#8c8c8c;
     font-weight: bold;
   }
  </style>
<title>ESP Web Server</title>
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="icon" href="data:,">
</head>
<body>
  <div class="topnav">
    <h1>ESP WebSocket Server</h1>
  </div>
  <div class="content">
    <div class="card">
      <h2>Output - GPIO 2</h2>
      <p class="state">state: <span id="state">%STATE%</span></p>
      <p><button id="button" class="button">Toggle</button></p>
    </div>
  </div>
<script>
  var gateway = \`ws://\${window.location.hostname}/ws\`;
  var websocket;
  window.addEventListener('load', onLoad);
  function initWebSocket() {
    console.log('Trying to open a WebSocket connection...');
    websocket = new WebSocket(gateway);
    websocket.onopen    = onOpen;
    websocket.onclose   = onClose;
    websocket.onmessage = onMessage; // <-- add this line
  }
  function onOpen(event) {
    console.log('Connection opened');
  }
  function onClose(event) {
    console.log('Connection closed');
    setTimeout(initWebSocket, 2000);
  }
  function onMessage(event) {
    var state;
    if (event.data == "1"){
      state = "ON";
    }
    else{
      state = "OFF";
    }
    document.getElementById('state').innerHTML = state;
  }
  function onLoad(event) {
    initWebSocket();
    initButton();
  }
  function initButton() {
    document.getElementById('button').addEventListener('click', toggle);
  }
  function toggle(){
    websocket.send('toggle');
  }
</script>
</body>
</html>)rawliteral";

void notifyClients() {
  ws.textAll(String(ledState));
}

void handleWebSocketMessage(void *arg, uint8_t *data, size_t len) {
  AwsFrameInfo *info = (AwsFrameInfo*)arg;
  if (info->final && info->index == 0 && info->len == len && info->opcode == WS_TEXT) {
    data[len] = 0;
    if (strcmp((char*)data, "toggle") == 0) {
      ledState = !ledState;
      notifyClients();
    }
  }
}

void onEvent(AsyncWebSocket *server, AsyncWebSocketClient *client, AwsEventType type,
             void *arg, uint8_t *data, size_t len) {
  switch (type) {
    case WS_EVT_CONNECT:
      Serial.printf("WebSocket client #%u connected from %s\n", client->id(), client->remoteIP().toString().c_str());
      break;
    case WS_EVT_DISCONNECT:
      Serial.printf("WebSocket client #%u disconnected\n", client->id());
      break;
    case WS_EVT_DATA:
      handleWebSocketMessage(arg, data, len);
      break;
    case WS_EVT_PONG:
    case WS_EVT_ERROR:
      break;
  }
}

void initWebSocket() {
  ws.onEvent(onEvent);
  server.addHandler(&ws);
}

String processor(const String& var){
  Serial.println(var);
  if(var == "STATE"){
    if (ledState){
      return "ON";
    }
    else{
      return "OFF";
    }
  }
  return String();
}

void setup(){
  Serial.begin(115200);

  pinMode(ledPin, OUTPUT);
  digitalWrite(ledPin, LOW);

  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Connecting to WiFi..");
  }

  Serial.println(WiFi.localIP());

  initWebSocket();

  server.on("/", HTTP_GET, [](AsyncWebServerRequest *request){
    request->send_P(200, "text/html", index_html, processor);
  });

  server.begin();
  ElegantOTA.begin(&server);
}

void loop() {
  ws.cleanupClients();
  digitalWrite(ledPin, !ledState);
  ElegantOTA.loop();
}
`;

export const ESP32_WEB_SERVER: string = `// Cargar la biblioteca Wi-Fi
#include <WiFi.h>

// Reemplazar con las credenciales de tu red
const char* ssid = "REPLACE_WITH_YOUR_SSID";
const char* password = "REPLACE_WITH_YOUR_PASSWORD";

// Configurar el puerto del servidor web a 80
WiFiServer server(80);

// Variable para almacenar la solicitud HTTP
String header;

// Variables auxiliares para almacenar el estado actual de salida
String output26State = "off";
String output27State = "off";

// Asignar las variables de salida a los pines GPIO
const int output26 = 26;
const int output27 = 27;

// Tiempo actual
unsigned long currentTime = millis();
// Tiempo anterior
unsigned long previousTime = 0;
// Definir el tiempo de espera en milisegundos (ejemplo: 2000ms = 2s)
const long timeoutTime = 2000;

void setup() {
  Serial.begin(115200);
  // Inicializar las variables de salida como salidas
  pinMode(output26, OUTPUT);
  pinMode(output27, OUTPUT);
  // Configurar las salidas en LOW
  digitalWrite(output26, LOW);
  digitalWrite(output27, LOW);

  // Conectar a la red Wi-Fi con SSID y contraseña
  Serial.print("Conectando a ");
  Serial.println(ssid);
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  // Imprimir la dirección IP local e iniciar el servidor web
  Serial.println("");
  Serial.println("WiFi conectado.");
  Serial.println("Dirección IP: ");
  Serial.println(WiFi.localIP());
  server.begin();
}

void loop(){
  WiFiClient client = server.available();   // Escuchar clientes entrantes

  if (client) {                             // Si un cliente nuevo se conecta,
    currentTime = millis();
    previousTime = currentTime;
    Serial.println("Nuevo cliente.");       // Imprimir un mensaje en el monitor serial
    String currentLine = "";                // Crear un String para almacenar datos entrantes del cliente
    while (client.connected() && currentTime - previousTime <= timeoutTime) {  // Bucle mientras el cliente esté conectado
      currentTime = millis();
      if (client.available()) {             // Si hay bytes para leer del cliente,
        char c = client.read();             // Leer un byte, luego
        Serial.write(c);                    // Imprimirlo en el monitor serial
        header += c;
        if (c == '\\n') {                   // Si el byte es un carácter de nueva línea
          // Si la línea actual está vacía, recibiste dos caracteres de nueva línea consecutivos.
          // Ese es el final de la solicitud HTTP del cliente, así que envía una respuesta:
          if (currentLine.length() == 0) {
            // Las cabeceras HTTP siempre comienzan con un código de respuesta (por ejemplo, HTTP/1.1 200 OK)
            // y un tipo de contenido para que el cliente sepa qué viene, seguido de una línea en blanco:
            client.println("HTTP/1.1 200 OK");
            client.println("Content-type:text/html");
            client.println("Connection: close");
            client.println();

            // Enciende y apaga los GPIOs
            if (header.indexOf("GET /26/on") >= 0) {
              Serial.println("GPIO 26 encendido");
              output26State = "on";
              digitalWrite(output26, HIGH);
            } else if (header.indexOf("GET /26/off") >= 0) {
              Serial.println("GPIO 26 apagado");
              output26State = "off";
              digitalWrite(output26, LOW);
            } else if (header.indexOf("GET /27/on") >= 0) {
              Serial.println("GPIO 27 encendido");
              output27State = "on";
              digitalWrite(output27, HIGH);
            } else if (header.indexOf("GET /27/off") >= 0) {
              Serial.println("GPIO 27 apagado");
              output27State = "off";
              digitalWrite(output27, LOW);
            }

            // Mostrar la página web HTML
            client.println("<!DOCTYPE html><html>");
            client.println("<head><meta name=\\"viewport\\" content=\\"width=device-width, initial-scale=1\\">");
            client.println("<link rel=\\"icon\\" href=\\"data:,\\">");
            client.println("<style>html { font-family: Helvetica; display: inline-block; margin: 0px auto; text-align: center;}");
            client.println(".button { background-color: #4CAF50; border: none; color: white; padding: 16px 40px;");
            client.println("text-decoration: none; font-size: 30px; margin: 2px; cursor: pointer;}");
            client.println(".button2 {background-color: #555555;}</style></head>");

            // Encabezado de la página web
            client.println("<body><h1>Servidor Web ESP32</h1>");

            // Mostrar el estado actual y los botones ON/OFF para GPIO 26
            client.println("<p>GPIO 26 - Estado " + output26State + "</p>");
            if (output26State=="off") {
              client.println("<p><a href=\\"/26/on\\"><button class=\\"button\\">ENCENDER</button></a></p>");
            } else {
              client.println("<p><a href=\\"/26/off\\"><button class=\\"button button2\\">APAGAR</button></a></p>");
            }

            // Mostrar el estado actual y los botones ON/OFF para GPIO 27
            client.println("<p>GPIO 27 - Estado " + output27State + "</p>");
            if (output27State=="off") {
              client.println("<p><a href=\\"/27/on\\"><button class=\\"button\\">ENCENDER</button></a></p>");
            } else {
              client.println("<p><a href=\\"/27/off\\"><button class=\\"button button2\\">APAGAR</button></a></p>");
            }
            client.println("</body></html>");
            client.println();
            break;
          } else {
            currentLine = "";
          }
        } else if (c != '\\r') {
          currentLine += c;
        }
      }
    }
    header = "";
    client.stop();
    Serial.println("Cliente desconectado.");
    Serial.println("");
  }
}
`;

export const ESP32_RELAY_CODE: string = `// Declarar el pin del relé
const int relay = 26;

void setup() {
  Serial.begin(115200);
  pinMode(relay, OUTPUT);
}

void loop() {
  // Configuración Normalmente Abierto (NO), enviar señal LOW para permitir el flujo de corriente
  // (si estás usando configuración Normalmente Cerrado (NC), envía señal HIGH)
  digitalWrite(relay, LOW);
  Serial.println("Flujo de corriente activo");
  delay(5000);

  // Configuración Normalmente Abierto (NO), enviar señal HIGH para detener el flujo de corriente
  // (si estás usando configuración Normalmente Cerrado (NC), envía señal LOW)
  digitalWrite(relay, HIGH);
  Serial.println("Flujo de corriente detenido");
  delay(5000);
}
`;

export const ESP32_DC_MOTOR_CODE: string = `// Motor A
int motor1Pin1 = 27;
int motor1Pin2 = 26;
int enable1Pin = 14;

// Configuración de las propiedades PWM
const int freq = 30000;
const int pwmChannel = 0;
const int resolution = 8;
int dutyCycle = 200;

void setup() {
  // Configurar los pines como salidas:
  pinMode(motor1Pin1, OUTPUT);
  pinMode(motor1Pin2, OUTPUT);
  pinMode(enable1Pin, OUTPUT);

  // Configurar el PWM para LEDC
  ledcAttachChannel(enable1Pin, freq, resolution, pwmChannel);

  Serial.begin(115200);

  // Prueba
  Serial.print("Probando motor de corriente continua...");
}

void loop() {
  // Mover el motor DC hacia adelante a máxima velocidad
  Serial.println("Moviendo hacia adelante");
  digitalWrite(motor1Pin1, LOW);
  digitalWrite(motor1Pin2, HIGH);
  delay(2000);

  // Detener el motor DC
  Serial.println("Motor detenido");
  digitalWrite(motor1Pin1, LOW);
  digitalWrite(motor1Pin2, LOW);
  delay(1000);

  // Mover el motor DC hacia atrás a máxima velocidad
  Serial.println("Moviendo hacia atrás");
  digitalWrite(motor1Pin1, HIGH);
  digitalWrite(motor1Pin2, LOW);
  delay(2000);

  // Detener el motor DC
  Serial.println("Motor detenido");
  digitalWrite(motor1Pin1, LOW);
  digitalWrite(motor1Pin2, LOW);
  delay(1000);

  // Mover el motor DC hacia adelante con velocidad creciente
  digitalWrite(motor1Pin1, HIGH);
  digitalWrite(motor1Pin2, LOW);
  while (dutyCycle <= 255){
    ledcWrite(enable1Pin, dutyCycle);
    Serial.print("Hacia adelante con ciclo útil: ");
    Serial.println(dutyCycle);
    dutyCycle = dutyCycle + 5;
    delay(500);
  }
  dutyCycle = 200;
}
`;

export const ESP32_PWM_CODE: string = `// Número del pin del LED
const int ledPin = 16;  // 16 corresponde al GPIO 16

void setup() {
  // Configurar el LED como salida
  pinMode(ledPin, OUTPUT);
}

void loop(){
  // Aumentar el brillo del LED
  for(int dutyCycle = 0; dutyCycle <= 255; dutyCycle++){
    // Cambiar el brillo del LED con PWM
    analogWrite(ledPin, dutyCycle);
    delay(15);
  }

  // Disminuir el brillo del LED
  for(int dutyCycle = 255; dutyCycle >= 0; dutyCycle--){
    // Cambiar el brillo del LED con PWM
    analogWrite(ledPin, dutyCycle);
    delay(15);
  }
}
`;

export const ESP32_CODE: CodeExample = {
  title: 'Código de ejemplo',
  code: ESP32_CODE_EXAMPLE,
  type: 'ESP32',
};

export const EXAMPLE_CODES: CodeExample[] = [
  {
    title: 'Servidor Web ESP32',
    code: ESP32_WEB_SERVER,
    type: 'ESP32',
  },
  {
    title: 'Relé con ESP32',
    code: ESP32_RELAY_CODE,
    type: 'ESP32',
  },
  {
    title: 'Motor con ESP32',
    code: ESP32_DC_MOTOR_CODE,
    type: 'ESP32',
  },
  {
    title: 'PWM ESP32',
    code: ESP32_PWM_CODE,
    type: 'ESP32',
  },
];
