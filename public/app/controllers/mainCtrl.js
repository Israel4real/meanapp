angular.module('mainController', [])

.controller('mainCtrl', function(Auth, $timeout, $location, $rootScope, $window) {
  
  var app = this;

  app.loadme = false;

  $rootScope.$on('$routeChangeStart', function() {
    if (Auth.isLoggedIn()) {
      app.isLoggedIn = true;
      Auth.getUser().then(function(data) {
        app.username = data.data.username;
        app.email = data.data.email;
        app.loadme = true;
      });
    } else {
      app.isLoggedIn = false;
      app.username = '';
      app.loadme = true;
    }
    if ($location.hash() == '_=_') { $location.hash(null) };
  });

  this.facebook = function(){
    // console.log($window.location.host);
    // console.log($window.location.protocol);
    $window.location = $window.location.protocol + '//' + $window.location.host + '/auth/facebook';

  };

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
          app.loginData = '';
          app.successMsg = false;
        }, 2000);
        
      } else {
        //create an error message
        app.loading = false;
        app.errorMsg = data.data.message;
      }
    });
  };

  this.logout = function() {
    Auth.logout();
    $location.path('/logout');
    $timeout(function() {
      $location.path('/');
    }, 2000)
  };

});


