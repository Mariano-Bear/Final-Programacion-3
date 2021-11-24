const express = require('express');

const router = express.Router();

const db_connect = require('../database');

const { isLoggedIn } = require("../lib/auth");

router.get("/add", isLoggedIn, (req, res) => {
  res.render("mobiliario/add");
});

router.post("/add", isLoggedIn, async (req, res) => {
  // console.log(req.body);
  const { descripcion, sala, cant } = req.body;
    
  const newLink = {
    descripcion,
    sala,
    cant,
    fk_user: req.user.id,
  };
  // console.log(newLink);
  await db_connect.query("INSERT INTO mobiliario set ?", [newLink]);
  req.flash("success", "Item Guardado Satifactoriamente");
  res.redirect("/mobiliario");
});

router.get("/", isLoggedIn, async (req, res) => {
  const mobiliario = await db_connect.query(
    "SELECT * FROM mobiliario WHERE fk_user = ?",
    [req.user.id]
  );
  console.log(mobiliario);
  res.render("mobiliario/list", { mobiliario });
});

router.get("/delete/:id", isLoggedIn, async (req, res) => {
  // console.log(req.params.id);
  const { id } = req.params;
  await db_connect.query("DELETE FROM mobiliario WHERE ID = ?", [id]);
  req.flash("success", "Item eliminado satifactoriamente");
  res.redirect("/mobiliario");
});

router.get("/edit/:id", isLoggedIn, async (req, res) => {
  const { id } = req.params;
  // console.log(id);
  const mobiliarios = await db_connect.query("SELECT * FROM mobiliario WHERE id = ?",[id]);
  // console.log(links[0]);
  res.render("mobiliario/edit", { mobiliario: mobiliarios[0] });
});

router.post("/edit/:id", isLoggedIn, async (req, res) => {
  const { id } = req.params;
  const { descripcion, sala, cant } = req.body;
  const newMobiliario = {
    descripcion,
    sala,
    cant
  };
  await db_connect.query("UPDATE mobiliario set ? WHERE id = ?", [newMobiliario, id]);
  // console.log(newLink);
  req.flash("success", "Item editado satifactoriamente");
  res.redirect("/mobiliario");
});

module.exports = router;


