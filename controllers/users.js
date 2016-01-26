var express = require('express');
var db = require('../models');
var router = express.Router();

// Routes

// router.get('/addpal', function(req, res){
//   db.user.findById(1).then(function(currentuser){
//     db.user.findById(2).then(function(friend){
//       currentuser.addPal(friend).then(function(palcreated){
//         res.send(palcreated)
//       })
//     })
//   })
// })

router.get('/pals', function(req, res){
  db.user.findAll({ where: {palRecipient: true}})
  .then(function(users){
    res.render('users.ejs', {users: users});
  });
});

router.post('/pals', function(req, res){
  if (req.body.palbutton==='NO'){
    res.render('users.ejs', {result: req.body.palbutton, users: ''});
  } else {
    db.user.find({where: {userName: req.body.pal}}).then(function(pal){
      db.user.update(
        {matchWaiting: true},
        {where: {userName: pal.userName}}
      ).then(function(user){
        res.render('users.ejs', {result: req.body.palbutton, users: ''});
      });
    });
  }
});

// Export

module.exports = router;
