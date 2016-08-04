var app = angular.module('app', ['btford.socket-io']);

app.factory('mySocket', function(socketFactory) {
	return socketFactory();
});

app.controller('AppCtrl', function($scope, mySocket) {
	$scope.accel = {
		gx: 0,
		gy: 0,
		gz: 0
	};

	mySocket.on('accel', function(data) {
		$scope.accel = data;
	});
});