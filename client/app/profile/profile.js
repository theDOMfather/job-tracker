angular.module('jobTracker.profile', [])
.controller('profileController', function($scope, AuthFactory, JobFactory, $location, $filter, $uibModal) {
  $scope.navButton = "Sign Out";
  $scope.getUser = function (){
    AuthFactory.getProfile()
    .then((res) => {
      $scope.user = res;
    });
  }

  $scope.jobStatuses = AuthFactory.profileJobStatuses;

  $scope.isActive = function(viewLocation) {
    return viewLocation === $location.path();
  };

  $scope.showJobStatus = function() {
    return AuthFactory.showJobStatus($scope);
  };
  $scope.updateProfile = function() {
    AuthFactory.updateAccount($scope.user);
  };

  $scope.deleteProfile = function() {
    console.log("deleteProfile called in controller")
    $uibModal.open({
      templateUrl: 'app/profile/deleteModal.html',
      controller: 'deleteAccountController',
      controllerAs: '$delete',
      resolve: {
        user: function () {
          return $scope.user;
        }
      }
    });
  };
  $scope.buttonFunc = function() {
    AuthFactory.logout();
  };

  $scope.cancelPasswordChange = function() {
    $scope.changePass = '';
    $scope.showChangePassword = false;
  };
  
  $scope.changePassword = function() {

  };

  // set up video feed for photo capture
  let video = document.querySelector('#video');
  navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia ||
  navigator.mozGetUserMedia || navigator.msGetUserMedia || navigator.oGetUserMedia;
  if (navigator.getUserMedia) {
    navigator.getUserMedia({video: true}, handleVideo, err => console.error(err));
  }
  function handleVideo(stream) {
    video.src = window.URL.createObjectURL(stream);
  }

  // set up photo capture
  $scope.photo = '';
  $scope.capture = function() {
    let scale = .25;
    let video = $('#video').get(0);
    let canvas = document.createElement('canvas');
    canvas.width = video.videoWidth * scale;
    canvas.height = video.videoHeight * scale;
    canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
    $scope.photo = canvas.toDataURL();
  };

  $scope.enrollPhoto = function() {
    $scope.user.photo = $scope.photo;
    AuthFactory.enroll($scope.user)
    .then((res) => {
      console.log(res);
      $scope.addingPhoto = false;
      if (res.images && res.images[0].transaction.status === 'success') {
        $scope.addedPhoto = "Security Photo Added";
      } else {
        $scope.addedPhoto = "Photo Upload Failed";
      }
    });
  }


  $scope.getUser();
});
