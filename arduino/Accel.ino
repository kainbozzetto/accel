int xAxis = A0;
int yAxis = A1;
int zAxis = A2;
int axisValue = 0;

void setup() {
  Serial.begin(38400);
}

void loop() {
  axisValue = analogRead(xAxis);    
  Serial.print(axisValue);
  
  axisValue = analogRead(yAxis);
  Serial.print(",");
  Serial.print(axisValue);
  
  axisValue = analogRead(zAxis);
  Serial.print(",");
  Serial.println(axisValue);
  
  delay(200);                 
}
