var express = require('express');
var router = express.Router();
const Schedule = require('../schema/schedule')

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });
router.get('/:User_id', function(req, res, next) {
    const { User_id } = req.params;
    Schedule.find({ User_id : User_id }, function(err, schedules){
      if (err) throw err;
      res.header('content-Type', 'application/json');
      res.send(JSON.stringify(schedules, null, 4));
    });
  });

router.get('/:User_id/:id', async (req, res, next) => {
    const { id, User_id } = req.params;
    const schedule = Schedule.findOne({ _id: id , User_id: User_id}, async (err, schedule) => {
        if (err) throw err
        res.send(schedule)
    })
});

router.post('/', async (req, res, next) => {
    const { User_id, Title, StartDate, EndDate, Details, State } = req.body;
    const schedule = new Schedule({
        User_id: User_id,
        Title: Title,
        StartDate: StartDate,
        EndDate: EndDate,
        Details: Details,
        State: State
    })
    schedule.save()
    res.json({ Post: true })
});

router.patch('/', async (req, res, next) => {
    const { _id, User_id, Title, StartDate, EndDate, Details, State} = req.body
    console.log(req.body)
    const schedule = Schedule.findOneAndUpdate(
        { _id: _id, User_id: User_id}, 
        {$set : {
            Title: Title,
            StartDate: StartDate,
            EndDate: EndDate,
            Details: Details,
            State: State
        }}, 
        {new: true}, 
        async (err, schedule) => {
        if (err) throw err
        res.send(schedule)
    })
});

router.delete('/', async (req, res, next) => {
    const { _id, User_id} = req.body;
    // const { _id, User_id} = req.params;
    console.log(req.body)
    const schedule = Schedule.deleteOne({ _id: _id, User_id: User_id }, 
        async(err, result)=>{
        if(err) throw err
        res.json({Delete : "Success"})
    })
});


module.exports = router;