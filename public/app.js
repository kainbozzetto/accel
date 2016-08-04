var app = angular.module('app', ['btford.socket-io']);

app.factory('mySocket', function(socketFactory) {
	return socketFactory();
});

app.controller('AppCtrl', function($scope, mySocket) {
	$scope.accel = {
		x: 0,
		y: 0,
		z: 0
	};

	mySocket.on('accel', function(data) {
		$scope.accel = data;
	});
});