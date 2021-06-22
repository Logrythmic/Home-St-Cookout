const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize');
const { User, Event, Order } = require('../models');

// ----------------------------------------------------------------------------
//                                READ                                       
// ----------------------------------------------------------------------------

router.get('/', async (req,res)=>{
  const users = await User.findAll();  
  res.json(users)
})

router.get('/my-events', async (req,res)=>{
  const events = await Event.findAll();  
  res.json(events)
})

router.get('/profile', async (req, res) => {
  res.redirect(`users/${req.session.passport.user}`);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try{
    if(!id) {
      res.status(404).send("profile id is missing").redirect('*');
  } else {
    const userData = await User.findOne({
      where: {
        [Sequelize.Op.or]: [
          {id: id},
          {loginStrategyId: id}
        ]
      },
      include:[{
        model: Order
      },{
        model: Event
      }]
    });
    if(!userData) {
      res.send('user data not found in the database')
    } else {
        // res.json(userData);
      res.render('userList', {
        locals: {
          isAuthenticated: req.isAuthenticated(),
          userData
        },
        partials: {
          footer: 'partials/footer',
          head: 'partials/head',
          header: 'partials/header'
        }
      })
    }
  }
  } catch (e) {
      console.log(e);
      res.status(404).redirect('*');
  }
});

// ----------------------------------------------------------------------------
//                                CREATE                                       
// ----------------------------------------------------------------------------
router.post('/create-profile', async (req,res)=>{
  const { firstName,lastName,email,phoneNumber,isVendor,
    address,address2,city,state,zip } = req.body;

  const newUser = await User.findOrCreate({
    where:{
      firstName: firstName,
      lastName: lastName,
      email: email,
      phoneNumber: phoneNumber,
      isVendor: isVendor,
      address: address,
      address2: address2,
      city: city,
      state: state,
      zip: zip
    }
  });

  res.json({
    newUser
  }).send("New user ", newUser.firstName, "created");
})

// ----------------------------------------------------------------------------
//                                UPDATE                                       
// ----------------------------------------------------------------------------
router.post('/:id', async (req, res) => {
  const { id } = req.params;
  const { firstName,lastName,email,phoneNumber,isVendor,
    address,address2,city,state,zip } = req.body;

  const updatedUser = await User.update(req.body, {
    where: {
      id
    }
  });
  
  res.json(updatedUser);
});


// ----------------------------------------------------------------------------
//                                DELETE                                       
// ----------------------------------------------------------------------------

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const deletedUser = await User.destroy({
      where: {
          id
      }
  });
  res.json(deletedUser);
});

module.exports = router;