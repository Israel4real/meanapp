angular.module('userControllers', ['userServices'])

.controller('regCtrl', function($http, $location, $timeout, User) {

  var app = this;

  this.regUser = function(regData) {
    app.loading = true;
    app.errorMsg = false;
    
    User.create(app.regData).then(function(data) {
      if (data.data.success) {
        app.loading = false;
        // create success message
        app.successMsg = data.data.message;
        // redirect to home page
        $timeout(function() {
          $location.path('/');
        }, 2000);
        
      } else {
        //create an error message
        app.loading = false;
        app.errorMsg = data.data.message;
      }
    });
  };
})

.controller('facebookCtrl', function($routeParams, $location, Auth, $window){
  
  var app = this;

  if ($window.location.pathname == '/facebookerror') {
    // error variable
    app.errorMsg = 'Facebook email not found in database';
  } else {
    Auth.facebook($routeParams.token);
    $location.path('/');
  }
  

});
