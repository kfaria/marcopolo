var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/*GET hello world page */
router.get('/helloworld', function(req, res){
  res.render('helloworld', {title: 'Hello World!'});
});

/* GET Userlist page. */
router.get('/userlist', function(req, res) {
    var db = req.db;
    var collection = db.get('userBase');
    collection.find({},{},function(e,docs){
        res.render('userlist', {"userlist" : docs});
    });
});

/* GET New User page. */
router.get('/newuser', function(req, res) {
    res.render('newuser', { title: 'Add New User' });
});

/*POST to Add User Service - Add more validation + error checking here*/
router.post('/adduser', function(req, res){
  //init db internally
  var db = req.db;
  //fetch username and email from newuser page entry, name attributes important
  var username = req.body.username;
  var email = req.body.email;
  var firstName = req.body.firstName;
  var lastName = req.body.lastName;

  //init collection
  var collection = db.get('userBase');

  /*----Validation Infromation----
  First validate the user before entry into the database. Use the find
  method to search for the right field. The find method retursn a cursor
  and if the cursion.length )realy doc.length) returns a number 1, then the
  email address has been used before, and the registration cannot continue
  */
  // collection.find({"email": email}).toArray(function(err,docs){});

  //write INTO collection
  collection.insert({
    "username": username,
    "email": email,
    "firstName": firstName,
    "lastName": lastName
  },function(err, doc){
    if(err){
        res.send("There was a problem writing to the database");
    }
    else{
      res.redirect("userlist");
    }
    });
});

module.exports = router;
