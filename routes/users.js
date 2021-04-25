var express = require('express');
const { response } = require('../app');
var router = express.Router();

/* GET users listing. */
router.get('/',async function(req, res, next) {
  const api_url = "https://api.gopax.co.kr/trading-pairs/XRP-KRW/ticker"
  const resp = await fetch(api_url)
  const json = await resp.json()
  res.json(json);
});

module.exports = router;
