const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize');
const { User, Event, Order } = require('../models');
const isAuth = require('../middleware/ensureAuth');

// ----------------------------------------------------------------------------
//                                READ                                       
// ----------------------------------------------------------------------------

router.get('/', async (req,res)=>{

  const events = await Event.findAll({
    limit:5,
    where:{
      eventStart:{
        [Sequelize.Op.gte]: new Date()
      }
      
    }
  })

  res.render('index',{
    locals: {
      isAuthenticated: req.isAuthenticated(),
      events
    },
    partials: {
      footer: 'partials/footer',
      head: 'partials/head',
      header: 'partials/header'
    }
  });
})

// ----------------------------------------------------------------------------
//                                CREATE                                       
// ----------------------------------------------------------------------------
router.post('/create-event', isAuth, async (req,res)=>{
  const { eventName,eventStart,eventEnd,eventInfo,address,address2,
    city,state,zip} = req.body;
    console.log("******************");
    console.log(req.body);
    console.log("******************");
  const profileId = await User.findOne({
    where:{
      loginStrategyId: req.session.passport.user
    }
  })
  const id = profileId.id
  try{
    if(!id) {
      res.status(404).send("profile id is missing").redirect('*');
    } else {
        const newEvent = await Event.findOrCreate({
          where:{
            eventName: eventName ,
            eventStart: eventStart ,
            eventEnd: eventEnd ,
            eventInfo: eventInfo,
            address: address ,
            address2: address2 ,
            city: city ,
            state: state ,
            zip: zip ,
            numAttendee: 0 ,
            hostUserId: id
          }
        });
        res.json({
          newEvent
        }).send("New event ", newEvent.firstName, "created");
      }
  } catch (e) {
    console.log(e);
    res.status(404).redirect('*');
  }
});



// ----------------------------------------------------------------------------
//                                UPDATE                                       
// ----------------------------------------------------------------------------
router.post('/updated-event/:id', isAuth, async (req,res)=>{
  const { id } = req.params;
  const { eventName,eventStart,eventEnd,eventInfo,address,address2,
    city,state,zip,numAttendee,numOrders,food1Name,
    food2Name,food3Name,hostUserId,contactEmail, } = req.body;

  const updatedEvent = await Event.update(req.body,{
    where:{
      id
    }
  });
  res.json(updatedEvent)
});

router.post('/update-attendees/:id', isAuth, async (req,res)=>{
  const { id } = req.params;
  // const { eventName,eventStart,eventEnd,eventInfo,address,address2,
  //   city,state,zip,numAttendee,numOrders,food1Name,
  //   food2Name,food3Name,hostUserId,contactEmail, } = req.body;
  
  const updatedEvent = await Event.update({ numAttendee: Sequelize.literal('"numAttendee" + 1') },{
    where:{
      id: id
    }
  });
  
  res.status(200).send("You are now attending this event!");
});

// ----------------------------------------------------------------------------
//                                DELETE                                       
// ----------------------------------------------------------------------------
router.delete('/:id', isAuth, async (req, res) => {
  const { id } = req.params;
  const deletedEvent = await Event.destroy({
      where: {
        id
      }
  });
  res.redirect("/users/profile");
});

module.exports = router;