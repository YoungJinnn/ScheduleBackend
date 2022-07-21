const express = require('express');
const router = express.Router();
const Test = require('../schema/test')

/* GET Tests listing. */
router.get('/', function(req, res, next) {
  Test.find({}, function(err, test){
    if (err) throw err;
    res.header('content-Type', 'application/json');
    res.send(JSON.stringify(test, null, 4));
  });
});

router.post('/', function(req, res, next) {
    const {name, phone} = req.body;
    const insertTest = new Test({Name:name, Phone:phone});
    insertTest.save(function(error){
        if(error) throw error;
        res.send(`이름 : ${name}`);
    })
});

router.get('/:testId', function(req, res, next){
    Test.findById(req.params.testId, function(err, test){
      if (err) throw err;
      res.send({data: test})
    });
});

router.put('/', function(req, res, next){
    const { testId, Name, Phone } = req.body;
    Test.findOneAndUpdate({ _id: testId }, { Name: Name, Phone: Phone}, function(err){
      if (err) throw err;
      res.send({message: 'Update Success!'})
    });
  });

router.delete('/', function(req, res, next){
  const { testId } = req.body;
  Test.deleteOne({ _id: testId }, function(err){
    if (err) throw err;
    res.send({message: `Delete Success!`})
  });
});

module.exports = router;