const express = require("express");

const router = express.Router();
const db_connect = require("../database");
const { isLoggedIn } = require("../lib/auth");

router.get("/add", isLoggedIn, (req, res) => {
  res.render("biblioteca/add");
});

// router.get("/prestar", (req, res)=>{
//   res.render("prestar/list")
// })

router.post("/add", isLoggedIn, async (req, res) => {
  // console.log(req.body);
  const { autor_titulo_anio, cant, cantpag,editorial, precio_compra, precio_venta} = req.body;
  const newLibro = {
    autor_titulo_anio, 
    cant, 
    cantpag,
    editorial, 
    precio_compra, 
    precio_venta,
    fk_user: req.user.id
  };
  // console.log(newLink);
  await db_connect.query("INSERT INTO biblioteca set ?", [newLibro]);
  req.flash("success", "Libro Guardado Satifactoriamente");
  res.redirect("/biblioteca");
});

router.get("/", isLoggedIn, async (req, res) => {
  const libros = await db_connect.query("SELECT * FROM biblioteca WHERE fk_user = ?",[req.user.id]);
  console.log(libros);
  res.render("biblioteca/list", { libros });
});

router.get("/delete/:id", isLoggedIn, async (req, res) => {
  // console.log(req.params.id);
  const { id } = req.params;
  await db_connect.query("DELETE FROM biblioteca WHERE ID = ?", [id]);
  req.flash("success", "Libro eliminado satifactoriamente");
  res.redirect("/biblioteca");
});

router.get("/edit/:id", isLoggedIn, async (req, res) => {
  const { id } = req.params;
  // console.log(id);
  const libros = await db_connect.query("SELECT * FROM biblioteca WHERE id = ?",[id]);
  // console.log(links[0]);
  res.render("biblioteca/edit", { libro: libros[0]});
});

router.post("/edit/:id", isLoggedIn, async (req, res) => {
  const { id } = req.params;
  const { autor_titulo_anio, cant, cantpag,editorial, precio_compra, precio_venta } = req.body;
  const newLibro = {
    autor_titulo_anio, 
    cant, 
    cantpag,
    editorial, 
    precio_compra, 
    precio_venta
  };
  await db_connect.query("UPDATE biblioteca set ? WHERE id = ?", [newLibro, id]);
  // console.log(newLink);
  req.flash("success", "Libro editado satifactoriamente");
  res.redirect("/biblioteca");
});

module.exports = router;
