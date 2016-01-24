var express = require('express');
var db = require('../models');
var router = express.Router();

// Routes
router.get('/new', function(req,res){
  res.render('messages/new.ejs')
})

router.post('/new', function(req,res){
  db.message.create({
    body: req.body.text,
    translate: 'LATER'
  }).then(function(message){
    res.send(message);
  });
});
// Export

module.exports = router;
