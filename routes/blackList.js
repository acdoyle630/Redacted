/*jshint esversion: 6*/

const express = require('express');
const router = express. Router();
const blacklistWords = {
  selfie: 'self-portriat',
  yummers: 'delicious',
  outchea: 'are out here'
};

module.exports = router;

const redacted = (req, res, next) =>{
  let test = req.body.message;
  //console.log(req);
  req.newMessage = id(test);
  //console.log(req.newMessage);
  //console.log(req);

  next();
};

const id = (req, res ,next) =>{
  let bannedWordsArray = Object.keys(blacklistWords);
  //console.log(bannedWordsArray);
  let reqArray = req.split(' ');
  //console.log(reqArray);
  for(var i =0; i < reqArray.length; i++){
    let replace = bannedWordsArray.indexOf(reqArray[i]);
    console.log(replace);
    if(replace > -1){
      let swap = reqArray.splice(i,1).toString();
      let newSwap = (blacklistWords[swap]);
      reqArray.splice(i,0,newSwap);
      return reqArray.join(' ');
    }
  }
};

router.route('/')
  .get((req, res) =>{
    res.send({'success': true});
  })
  .post(redacted,(req, res, next) =>{
    res.send(req.newMessage);
  });