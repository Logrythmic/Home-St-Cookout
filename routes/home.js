const express = require('express');
const router = express.Router();

router.get('/', (req,res)=>{
  res.json({
    "Home":"event page"
  })
})

module.exports = router;