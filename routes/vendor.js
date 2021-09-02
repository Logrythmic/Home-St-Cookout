const express = require('express');
const router = express.Router();
const { User, Event, Order } = require('../models');

// ----------------------------------------------------------------------------
//                                READ                                       
// ----------------------------------------------------------------------------
router.get('/', async (req,res)=>{
  const vendors = await User.findAll({
    where:{
      isVendor: true
    },
    include:[{
      model: Event
    }]
  });  
  res.json(vendors)
})

router.get('/orders/:id', async (req,res)=>{
  const { id } = req.params;
  const eventOrders = await Order.findAll({
    where:{
      eventId: id
    },
    include:[{
      model: Event
    }]
  });  
  res.json(eventOrders)
})

router.get('/my-events/:id', (req,res)=>{
  const { id } = req.params;
  res.json({
    "Vendor":"event page"
  })
})

// ----------------------------------------------------------------------------
//                                CREATE                                       
// ----------------------------------------------------------------------------

// ----------------------------------------------------------------------------
//                                UPDATE                                       
// ----------------------------------------------------------------------------

// ----------------------------------------------------------------------------
//                                DELETE                                       
// ----------------------------------------------------------------------------

module.exports = router;