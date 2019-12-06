const express = require("express");
const router = express.Router();

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
  for (let i = 0; i < take.length; i++) {
    let query = `select * from mandi where name='${take[i]}'`;
    db.query(query, (err, result) => {
      if (err) throw err;
      else {
        //let query2 = `insert into cart values ()`
      }
    });
  }
});

router.get("/cart", async (req, res, next) => {
  res.render("index.ejs");
});

module.exports = router;
