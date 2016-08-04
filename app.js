var express = require('express');
var app = express();
var http = require('http').Server(app);

var io = require('socket.io')(http);

var SerialPort = require('serialport');

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/index.html');
});

http.listen(3000, '0.0.0.0', function() {
	console.log('listening on *:3000');
});

io.on('connection', function(socket) {
	console.log('User connected');
	
	socket.on('disconnect', function(){
    	console.log('User disconnected');
	});
});

var serialport = new SerialPort('COM5', {
	parser: SerialPort.parsers.readline('\n')
});

serialport.on('open', function() {
	console.log('Serial Port Opened');

	serialport.update({ baudRate: 38400 });

	serialport.on('data', function(data) {
		var parsedData = data.slice(0, data.length-1).split(',');

		io.emit('accel', { 
			gx: convertAccel(parsedData[0]), 
			gy: convertAccel(parsedData[1]),
			gz: convertAccel(parsedData[2])
		});
	});
});

function convertAccel(input) {
	return (input*5/1023 - 1.65) / 0.8;
}