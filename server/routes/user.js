const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize');
const { User, Event, Order } = require('../models');
const isAuth = require('../middleware/ensureAuth');
const { profile } = require('console');

// ----------------------------------------------------------------------------
//                                READ                                       
// ----------------------------------------------------------------------------

//  Commented out to ensure users dont access other users data
// router.get('/',isAuth, async (req,res)=>{
//   const users = await User.findAll();  
//   res.json(users)
// })

//  route temporarily closed as it may not need to be used due to profile page
// router.get('/my-events', async (req,res)=>{
//   const proId = await User.findOne({
//     where:{
//       loginStrategyId: req.session.passport.user
//     }
//   })
//   const id = proId.id;
//   const events = await Order.findAll({
//     where:{
//       userId : id
//     },
//     include:[{
//       model: Event
//     }]
//   });  
//   res.json(events)
// })

router.get('/profile', isAuth, async (req, res) => {
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
    const profileData = await User.findOne({
      where: {
        [Sequelize.Op.or]: [
          {id: id},
          {loginStrategyId: req.session.passport.user}
        ]
      },
      include:[{
        model: Event
      }]
    });
    if(!profileData) {
      res.send('user data not found in the database')
    } else {
      res.render('userList', {
        locals: {
          isAuthenticated: req.isAuthenticated(),
          userData: profileData
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

// was superceded by the profile endpoint

// router.get('/:id', isAuth, async (req, res) => {
//   const { id } = req.params;
//   try{
//     if(!id) {
//       res.status(404).send("profile id is missing").redirect('*');
//   } else {
//     const userData = await User.findOne({
//       where: {
//         [Sequelize.Op.or]: [
//           {id: id},
//           {loginStrategyId: id}
//         ]
//       },
//       include:[{
//         model: Order
//       },{
//         model: Event
//       }]
//     });
//     if(!userData) {
//       res.send('user data not found in the database')
//     } else {
//       console.log("here is your data",userData);
//         // res.json(userData.Orders[0].id);
//       res.render('userList', {
//         locals: {
//           isAuthenticated: req.isAuthenticated(),
//           userData
//         },
//         partials: {
//           footer: 'partials/footer',
//           head: 'partials/head',
//           header: 'partials/header'
//         }
//       })
//     }
//   }
//   } catch (e) {
//       console.log(e);
//       res.status(404).redirect('*');
//   }
// });

// ----------------------------------------------------------------------------
//                                CREATE                                       
// ----------------------------------------------------------------------------
router.post('/create-profile', isAuth, async (req,res)=>{
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
router.post('/:id', isAuth, async (req, res) => {
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

router.delete('/:id', isAuth, async (req, res) => {
  const { id } = req.params;
  const deletedUser = await User.destroy({
      where: {
          id
      }
  });
  res.json(deletedUser);
});

module.exports = router;