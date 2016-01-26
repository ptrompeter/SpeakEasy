var express = require('express');
var db = require('../models');
var passport = require('passport');
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
    res.render('users/pals.ejs', {users: users});
  });
});

router.get('/settings', function(req,res){
   res.render('users/settings.ejs', {currentUser: req.user});
});

router.post('/settings', function(req, res){
    console.log(req);
    console.log(req.body.gender);
  var sex;
  if ((req.body.gender === 'm') || (req.body.gender = 'male')){
    sex = 1;
  } else if ((req.body.gender.toLowerCase() === 'f') || (req.gender.toLowerCase() = 'female')){
    sex = 2;
  } else {
    sex = null;
  }
  console.log('sex', sex);
  db.user.update({
    firstName: req.body.firstname,
    lastName: req.body.lastname,
    language: req.body.language,
    gender: sex,
    nationality: req.body.nationality
    },
    {where: {id: req.user.id}}
  ).then(function(user){
    req.flash('success','Your settings have been updated.')
    res.redirect('back')
  });
});

//   })
//   if (req.body.palbutton==='NO'){
//     res.render('users.ejs', {sendORcanc: req.body.palbutton, potentialpal: ''});
//   } else {
//     db.user.update({
//       matchWaiting: true,
//       sentBy: req.user.userName},
//       {where: {userName: req.body.pal}}
//     ).then(function(user){
//       res.render('users.ejs', {sendORcanc: req.body.palbutton, potentialpal: ''});
//     });
//   }
// });
// Export

module.exports = router;
