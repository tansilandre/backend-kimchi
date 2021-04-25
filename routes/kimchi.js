var express = require('express');
var router = express.Router();

var request = require('request');

/* GET users listing. */
console.log("mskgan")
router.get('/', function(req, res, next) {
  let coin = req.query.coin.toUpperCase()
  console.log(coin)
  request(
    { url: 'https://api.gopax.co.kr/trading-pairs/'+coin+'-KRW/ticker' },
    (err, response, body) => {
      if (err || response.statusCode !== 200) {
        return res.status(500).json({ type: 'error', message: err });
      }
      res.json(JSON.parse(body));
    }
  )
  // res.send('respond with a resource');
});

module.exports = router;
