var express = require('express');
var router = express.Router();
var request = require('request');

/* GET users listing. */
var getGopax = function (req, res, next) {
  request(
    { url: 'https://api.gopax.co.kr/trading-pairs/'+coin+'-KRW/ticker' },
    (err, response, body) => {
      if (err || response.statusCode !== 200) {
        return res.status(500).json({ type: 'error', message: err });
      }
      return res.json(JSON.parse(body));
    }
  )
  next()
}

router.get('/', function(req, res, next) {
  let coin = req.query.coin.toUpperCase()
  getGopax
  // res.send('respond with a resource');
});

module.exports = router;
