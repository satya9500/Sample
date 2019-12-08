const express = require("express");
const router = express.Router();
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var fetch = require("fetch");
const request = require("request");

router.post("/add", async (req, res, next) => {
  let name = req.body.name;
  let type = req.body.type;
  let quantity = req.body.quantity;
  let price = req.body.price;

  const query = `insert into mandi(name,type,quantity,price) values("${name}", "${type}","${quantity}","${price}");`;

  db.query(query, (err, result) => {
    if (err) throw err;
  });
  res.render("index.ejs");
});

router.get("/add", async (req, res, next) => {
  res.render("seller.ejs", { title: "Welcome to Online Mandi" });
});

router.get("/", async (req, res, next) => {
  let query = "SELECT * FROM mandi ORDER BY id ASC";
  db.query(query, (err, result) => {
    if (err) res.redirect("/");
    res.render("index.ejs", { title: "Home Page", veges: result });
  });
});

router.post("/cart", async (req, res, next) => {
  var take = req.body;
  console.log(take);
  var arr = [];
  for (var i in take) {
    arr.push(take[i]);
  }
  console.log(arr);
  var j = 0;
  for (var myKey in take) {
    let query = `SELECT * from mandi where name='${myKey}';`;

    db.query(query, (err, result) => {
      if (err) throw err;
      else {
        //console.log(take[myKey]);
        console.log(arr[j]);
        let q = `insert into info (name, quantity, price, quantity_b) values('${result[0].name}',${result[0].quantity},${result[0].price}, ${arr[j]});`;
        console.log(q);
        j++;
        db.query(q, (err, result) => {
          if (err) throw err;
        });
        //}
      }
    });
  }

  // for (let i = 0; i < take.length; i++) {
  //   let query = `select * from mandi where name='${take[i]}'`;
  //   db.query(query, (err, result) => {
  //     if (err) throw err;
  //     else {
  //       console.log(result);
  //       //let query2 = `insert into cart values ()`
  //     }
  //   });
  // }
});
predict = [];
obj = {};
router.get("/cart", async (req, res, next) => {
  var q2 = `select name from info;`;

  db.query(q2, async (err, result) => {
    var a = [];
    for (var i = 0, j = 20; i < result.length; i++) {
      var data = JSON.stringify({
        name: `${result[i].name}`,
        age: `${j}`
      });
      j++;

      var xhr = new XMLHttpRequest();

      xhr.open("POST", "https://e7bdf8cf.ngrok.io/predict");
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.setRequestHeader("Accept", "*/*");
      xhr.setRequestHeader("Cache-Control", "no-cache");
      xhr.setRequestHeader(
        "Postman-Token",
        "8414e203-05dc-4627-be24-84715401c4d9,dfc11985-96e2-4b7d-9302-3505bc72a6a7"
      );
      xhr.setRequestHeader("cache-control", "no-cache");
      xhr.send(data);
      xhr.addEventListener("readystatechange", function() {
        if (this.readyState === 4) {
          //console.log(this.responseText);
          a.push(this.responseText);
        }
      });
    }
    predict = ["3.155", "3.098", "3.043", "2.887", "2.937", "2.989", "2.838"];

    console.log(a);
    let query = `SELECT * from info ORDER BY id ASC;`;
    db.query(query, (err, result) => {
      if (err) throw err;
      else {
        res.render("cart.ejs", {
          title: "Mandi Cart",
          cart: result,
          predict: predict
        });
      }
    });
  });
});
var arr = [];
router.get("/web", async (req, res, next) => {
  let query = "select name from info;";
  db.query(query, (err, result) => {
    if (err) throw err;
    else {
      for (var i = 0; i < result.length; i++) {
        arr[i] = result[i].name;
      }

      var json_array = JSON.stringify(arr);
      res.send(json_array);
    }
  });
});

router.get("/deliver", async (req, res, next) => {
  let query = "select * from info";
  db.query(query, async (err, res) => {
    if (err) throw err;
    else {
      var xhr = new XMLHttpRequest();
      url = `https://us-central1-cloud-fbef8.cloudfunctions.net/sendMail?dest=tatsuya9500shiba@gmail.com&&
        item0=${res[0].name}&&
        item1=${res[1].name}&&
        item2=${res[2].name}&&
        item3=${res[3].name}&&
        item4=${res[4].name}&&
        item5=${res[5].name}&&
        item6=${res[6].name}&&
        quantity0=${res[0].quantity_b}&&
        quantity1=${res[1].quantity_b}&&
        quantity2=${res[2].quantity_b}&&
        quantity3=${res[3].quantity_b}&&
        quantity4=${res[4].quantity_b}&&
        quantity5=${res[5].quantity_b}&&
        quantity6=${res[6].quantity_b}
        `;

      xhr.open("GET", url);
      xhr.send();
    }
  });

  res.send("blank.ejs");
});

module.exports = router;
