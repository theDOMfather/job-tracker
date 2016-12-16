angular.module('jobTracker.signup', [])
.controller('signupController', function($scope, AuthFactory, $location) {
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

  $scope.capture = function() {
    let scale = .25;
    let video = $('#video').get(0);
    let canvas = document.createElement('canvas');
    canvas.width = video.videoWidth * scale;
    canvas.height = video.videoHeight * scale;
    canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
    $scope.image = canvas.toDataURL();
  };

  $scope.retake = function() {
    $scope.image = '';
  }

  $scope.signUp = function() {
    $scope.user.image = $scope.image;
    AuthFactory.signup($scope.user)
    .then(function(data){
      $scope.error = '';
      $location.path('/login');
    }).catch(function(err) {
      $scope.error = err.data.message;
      $location.path('/signup');
    });
  };
});
