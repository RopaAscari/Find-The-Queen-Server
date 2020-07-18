const express = require('express');
const router = express.Router()
let a = 0

router.post('/login',(req,res) => {

  const Player1 = {username:"dannyboi",password:"dre@margh_shelled"};
  const Player2 = {username:"matty7",password:"win&win99"};
  var USER = req.body;

  if(USER.username === Player1.username && USER.password === Player1.password) {
   console.log("Player One Validated");
    a+=1;
  } else {
    console.log("Incorrect Credentials");
  //  res.send(null);
  }

  if(USER.username === Player2.username && USER.password === Player2.password) {
   console.log("Player Two Validated");
    a+=1;
  } else {
    console.log("Incorrect Credentials");
    //res.send(null);
  }

  if(a == 0) {
    res.send("Incorrect Credentials")
  }else if(a == 1) {
    res.send("One User Logged")
  }else if(a == 2) {
    a = 0;
    res.send("Both Users Logged")
  }
})


router.get('/start',(req,res)=>{

})


module.exports = router;
