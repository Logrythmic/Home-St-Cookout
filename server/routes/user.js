const express = require('express');
const router = express.Router();

router.get('/my-events', (req,res)=>{
  res.json({
    "customer":"event page"
  })
})

module.exports = router;