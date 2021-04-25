var express = require("express");
var router = express.Router();
var request = require("request");

/* GET users listing. */
var prices={}
var result = {}

router.get("/", async function (req, res, next) {
  if(!req.query.coin) return res.json("insert ?coin=coin")
  if(!req.query.remittance) return res.json("insert ?remittance=remittance")
  if(!req.query.fee) return res.json("insert ?fee=fee")
  
  let coinUpper = req.query.coin.toUpperCase() 
  let coinLower = req.query.coin.toLowerCase() 
  let {fee,remittance} = req.query

 function calculateKimchi(remittance, coinFee, indodaxPrice, gopaxPrice) {
    let modal = 100000000;
    let hasil;
    let kimchi;

    // 0. transfer money to indodax (6500 + 5000)
    hasil = 100000000 - 11500;

    // 1. buy from indodax (300rb)
    hasil = hasil - (0.3 / 100) * hasil;
    hasil = hasil / indodaxPrice;

    // 2. transfer to gopax
    hasil -= coinFee;

    // 3. sell coin  in gopax
    hasil = hasil * gopaxPrice;
    hasil = hasil - (hasil * 0.2) / 100;

    // 4. withdraw  from gopax
    hasil = (hasil - 1000) * remittance;
    console.log(hasil)
    kimchi = ((hasil - modal) / modal) * 100;
    return kimchi
  }

  // setTimeout(function(){ 
  request(
    { url: "https://api.gopax.co.kr/trading-pairs/" + coinUpper + "-KRW/ticker" },
    (err, response, body) => {
      if (err || response.statusCode !== 200) {
        return "ERROR";
      }
      prices["gopax"] = JSON.parse(response.body).ask;
      
        request(
          { url: 'https://indodax.com/api/ticker/'+coinLower+'idr' },
          (err, response, body) => {
            if (err || response.statusCode !== 200) {
              return "ERROR";
            }
            prices.indodax = parseInt(JSON.parse(response.body).ticker.sell)
            let kimchi = calculateKimchi(12.75 , 1, prices.indodax,prices.gopax)
            result = {coinUpper,prices,kimchi}
  
            res.json(result)
          }
        )

      
    }
  );
  
// }, 200);
});

module.exports = router;
