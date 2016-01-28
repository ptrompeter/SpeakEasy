var express = require('express');
var db = require('../models');
// var countries = require('../countries.js')
var passport = require('passport');
var router = express.Router();

//Cheat functions

function loginCheck(req, res) {
  if (typeof req.body.id === 'undefined'){
    req.flash('danger','Please login or create a new account.')
    res.redirect('/');
  }
}

// Routes

router.get('/pals', function(req, res){
  loginCheck(req, res)
  var excl = [];
  var incl = [];
  db.usersPals.findAll({ where: {userId: req.user.id}}).then(function(pals){
    db.user.findAll({ where: {palRecipient: true, matchWaiting: false, id: {ne: req.user.id}}}).then(function(users){
      var palsArray = pals.map(function(Pele, Pindex, Parray){
        var userArray = users.map(function(Aele, Aindex, Aarray){
          if (Pele.palId !== Aele.id) {
            if (typeof excl[0] === 'undefined') {
              if (incl.indexOf(Aele) === -1){
                incl.push(Aele);
              }
            }
            var exclmap = excl.map(function(Eele, Eindex, Earray){
              if (Eele !== Aele.id) {
                if (incl.indexOf(Aele) === -1){
                  incl.push(Aele);
                }
              }
            });
          } else {
            excl.push(Aele.id);
          }
        });
      });
      if (incl.length===0){
        res.render('users.ejs', {error: true});
      } else {
        res.render('users.ejs', {potentialpal: incl})
      }
    });
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
          }).then(function(value){
            res.render('users.ejs', {pending: req.user.matchWaiting, accORrej: req.body.palbutton, palName: pal.userName});
          });
        });
      });
    }
  });
});

router.get('/settings', function(req,res){
  loginCheck(req, res)
  // countries.load($('#nationality'));
   res.render('users/settings.ejs', {currentUser: req.user})
});

router.post('/settings', function(req, res){
  var sex;
  if ((req.body.gender === 'm') || (req.body.gender = 'male')){
    sex = 1;
  } else if ((req.body.gender.toLowerCase() === 'f') || (req.gender.toLowerCase() = 'female')){
    sex = 2;
  } else {
    sex = null;
  }

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
