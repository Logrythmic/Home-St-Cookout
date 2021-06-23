const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize');
const { User, Event, Order } = require('../models');

// ----------------------------------------------------------------------------
//                                READ                                       
// ----------------------------------------------------------------------------

router.get('/', async (req,res)=>{

  const events = await Event.findAll()
  res.json(events);
  res.render('home',{
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
router.post('/create-event', async (req,res)=>{
  const { eventName,eventStart,eventEnd,eventInfo,address,address2,
    city,state,zip,hostUserId } = req.body;

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
      hostUserId: hostUserId
    }
  });
  res.json({
    newEvent
  }).send("New event ", newEvent.firstName, "created");
});

// ----------------------------------------------------------------------------
//                                UPDATE                                       
// ----------------------------------------------------------------------------
router.post('/updated-event/:id', async (req,res)=>{
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

router.post('/update-attendees/:id', async (req,res)=>{
  const { id } = req.params;
  // const { eventName,eventStart,eventEnd,eventInfo,address,address2,
  //   city,state,zip,numAttendee,numOrders,food1Name,
  //   food2Name,food3Name,hostUserId,contactEmail, } = req.body;
  
  const updatedEvent = await Event.update({ numAttendee: Sequelize.literal('"numAttendee" + 1') },{
    where:{
      id: id
    }
  });
  res.json(updatedEvent)
});

// ----------------------------------------------------------------------------
//                                DELETE                                       
// ----------------------------------------------------------------------------
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const deletedEvent = await Event.destroy({
      where: {
        id
      }
  });
  res.json(deletedEvent);
});

module.exports = router;