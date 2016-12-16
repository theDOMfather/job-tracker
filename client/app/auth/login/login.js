angular.module('jobTracker.login', [])
.controller('loginController', function($scope, AuthFactory, $location) {
	$scope.navButton = "Sign Up!";
  $scope.image = '';

  let video = document.querySelector('#video');

  navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia || navigator.msGetUserMedia || navigator.oGetUserMedia;
  if (navigator.getUserMedia) {
    navigator.getUserMedia({video: true}, handleVideo, err => console.error(err));
  }

  function handleVideo(stream) {
    video.src = window.URL.createObjectURL(stream);
  }

  $scope.faceLogin = function() {
    let scale = .25;
    let video = $('#video').get(0);
    let canvas = document.createElement('canvas');
    canvas.width = video.videoWidth * scale;
    canvas.height = video.videoHeight * scale;
    canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
    $scope.image = canvas.toDataURL();
  };

  $scope.buttonFunc = function() {
    $location.path("/signup");
  }

  $scope.isActive = function(viewLocation) {
    return viewLocation === $location.path();
  };

  $scope.login = function () {
		AuthFactory.login($scope.user)
		.then((data) => {
			$location.path("/mainList");
		}).catch(function(err) {
			$scope.error = 'Incorrect username or password';
			console.log(err);
		});
	};
});
