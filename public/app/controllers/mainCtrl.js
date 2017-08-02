angular.module('mainController', [])

.controller('mainCtrl', function(Auth, $timeout, $location) {
  
  var app = this;

  this.doLogin = function(loginData) {
    app.loading = true;
    app.errorMsg = false;
    
    Auth.login(app.loginData).then(function(data) {
      if (data.data.success) {
        app.loading = false;
        // create success message
        app.successMsg = data.data.message;
        // redirect to home page
        $timeout(function() {
          $location.path('/about');
        }, 2000);
        
      } else {
        //create an error message
        app.loading = false;
        app.errorMsg = data.data.message;
      }
    });
  };


});


