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
    res.render('users.ejs', {potentialpal: users});
  });
});

router.post('/pals', function(req, res){
  if (req.body.palbutton==='NO'){
    res.render('users.ejs', {sendORcanc: req.body.palbutton, potentialpal: ''});
  } else {
    db.user.update({
      matchWaiting: true,
      sentBy: req.user.userName},
      {where: {userName: req.body.pal}}
    ).then(function(user){
      res.render('users.ejs', {sendORcanc: req.body.palbutton, potentialpal: ''});
    });
  }
});

router.post('/addpal', function(req, res){
  db.user.update(
    {matchWaiting: false},
    {where: {userName: req.user.userName}}
  ).then(function(value){
    if (req.body.palbutton==='NO'){
      res.render('users.ejs', {pending: req.user.matchWaiting, accORrej: req.body.palbutton});
    } else {
      db.user.find({where: {userName: req.user.sentBy}}).then(function(pal){
        db.usersPals.create({
          userId: req.user.id,
          palId: pal.id
        }).then(function(value){
          db.usersPals.create({
            userId: pal.id,
            palId: req.user.id
          }).then(function(pal){
            console.log(req.user.matchWaiting)
            res.render('users.ejs', {pending: req.user.matchWaiting, accORrej: req.body.palbutton});
          });
        });
      });
    }
  });
});







// Export

module.exports = router;
