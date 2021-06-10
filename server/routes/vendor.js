const express = require('express');
const router = express.Router();

router.get('/my-events', (req,res)=>{
  res.json({
    "Vendor":"event page"
  })
})

module.exports = router;