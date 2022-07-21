var express = require('express');
var router = express.Router();
const User = require('../schema/user')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.post('/login', async(req, res, next)=>{
  const {Id, Password} = req.body;
  // console.log(`id: ${id}, password: ${password}`);
  const user = await User.findOne({Id: Id, Password:Password})
  if(!user){
    res.json({login: false})
  }else{
    res.json({login: true, user : user});
  }
})

// router.post('/signup', function(req, res, next){
//   // const { id, name, phone_number, password, password_check } = req.body;
//   // console.log(`id: ${id}, password: ${password}`);
//   // res.send('message: Signup 성공');
//   console.log(req.body);
//   res.send(req.body);
// });

router.post('/signup', function(req, res, next) {
  const { id, name, phoneNumber, password } = req.body;
  const insertUser = new User({Id:id, Name:name, Phone:phoneNumber, Password:password});
  insertUser.save(function(error){
      if(error) throw error;
      res.send(`insert success`);
  })
});

module.exports = router;