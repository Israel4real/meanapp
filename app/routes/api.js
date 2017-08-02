var User = require('../models/user');


module.exports = function(router) {
  // http://localhost:8080/users
  router.post('/users', function(req, res){
    var user = new User();
    user.username = req.body.username;
    user.password = req.body.password;
    user.email = req.body.email;
    if (req.body.username == null || req.body.username == '') {
      res.send('Ensure username, email, and password were provided');
    } else {
      user.save(function(err) {
        if (err) {
          res.send('Username or Email already exists');
        } else {
          res.send('user created')
        }
      });
    }
  });
  router.get('/home', function(req, res){
    res.send('Heres home now');
  })

  router.get('/', function(req, res) {
    res.send('OK youre good to go');
  });

  return router;
}
