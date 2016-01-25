var express = require('express');
var db = require('../models');
var router = express.Router();

// Routes

//Directs to message form
router.get('/new', function(req,res){
  res.render('messages/new.ejs')
})
//Sending form data to DB
router.post('/new', function(req,res){
  db.message.create({
    body: req.body.text,
    translate: 'LATER'
  }).then(function(message){
    db.user.findById(1).then(function(sender){
      // above: change to logged in user's ID when auth is working.
      sender.addMessage(message).then(function(sendmessage){
        db.user.findById(2).then(function(pal){
          //above: change to recipient ID.
          pal.addMessage(message).then(function(getmessage){
            res.send(sendmessage, getmessage);
            //above: change to a res.redirect when the view is up.
          });
        });
      });
    });
  });
});
// Export

module.exports = router;
