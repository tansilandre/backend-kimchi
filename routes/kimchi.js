var express = require('express');
var router = express.Router();

var request = require('request');

/* GET users listing. */
router.get('/', function(req, res, next) {
  request(
    { url: 'https://api.gopax.co.kr/trading-pairs/XRP-KRW/ticker' },
    (error, response, body) => {
      if (error || response.statusCode !== 200) {
        return res.status(500).json({ type: 'error', message: err.message });
      }
      console.log(response)
      console.log(body)
      res.json(JSON.parse(body));
    }
  )
  // res.send('respond with a resource');
});

module.exports = router;
