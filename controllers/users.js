var express = require('express');
var db = require('../models');
var router = express.Router();

// Routes

router.get('/addpal', function(req, res){
  db.user.findById(1).then(function(currentuser){
    db.user.findById(2).then(function(friend){
      currentuser.addPal(friend).then(function(palcreated){
        res.send(palcreated)
      })
    })
  })
})

// Export

module.exports = router;
