const express = require('express');
const router = express.Router();

router.get('/', (req,res)=>{
  res.render('home',{
    locals:{
      test:"test message for home route"
    }
  });
  // res.json({
  //   "Home":"event page"
  // })
})

module.exports = router;