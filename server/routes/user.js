const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize');
const { User } = require('../models');

// ----------------------------------------------------------------------------
//                                READ                                       
// ----------------------------------------------------------------------------

router.get('/', async (req,res)=>{
  const users = await User.findAll();  
  res.json(users)
})

router.get('/my-events', (req,res)=>{
  res.json({
    "customer":"event page"
  })
})

router.get('/:id', async (req, res) => {
  try{
      const oneUser = await User.findByPk(req.params.id);
      res.json(oneUser);
  } catch (e) {
      console.log(e);
      res.status(404).redirect('404.html');
  }
});

// ----------------------------------------------------------------------------
//                                CREATE                                       
// ----------------------------------------------------------------------------

// ----------------------------------------------------------------------------
//                                UPDATE                                       
// ----------------------------------------------------------------------------

// ----------------------------------------------------------------------------
//                                DELETE                                       
// ----------------------------------------------------------------------------

router.delete('/users/:id', async (req, res) => {
  const { id } = req.params;
  const deletedUser = await User.destroy({
      where: {
          id
      }
  });
  res.json(deletedUser);
});

module.exports = router;