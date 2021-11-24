const express = require("express");

const router = express.Router();
const db_connect = require("../database");
const { isLoggedIn } = require("../lib/auth");

router.get('/add', isLoggedIn, (req, res) => {
    res.render("prestar/add");
});

// router.get('/consulta', function(req, res, next) {
//   res.render('listadoConsulta');
// });

router.post("/add", isLoggedIn, async(req, res)=> {
  const {nombre, correo, nombre_libro, cant, autor, editorial, fecha} = req.body;
  const newPresta = {
    nombre,
    correo,
    nombre_libro,
    cant,
    autor,
    editorial,
    fecha,
    fk_user: req.user.id
  };

  await db_connect.query("INSERT INTO prestar set ?", [newPresta]);
  req.flash("success", "Libro Prestado Guardado Satifactoriamente");
  res.redirect("/prestar");
    
});

router.get("/", isLoggedIn, async (req, res) =>{
  const presta = await db_connect.query("SELECT * FROM prestar WHERE fk_user = ?", [req.user.id]);
  console.log(presta);
  res.render("prestar/list", {presta});

});



router.get("/delete/:id", isLoggedIn, async (req, res) => {
  const {id} = req.params;
  await db_connect.query("DELETE FROM prestar WHERE ID = ?", [id]);
  req.flash("success", "Libro Prestado Removido exitosamente");
  res.redirect("/prestar");
});


router.get("/edit/:id", isLoggedIn, async (req, res) => {
  const { id } = req.params;
  // console.log(id);
  const prestar = await db_connect.query("SELECT * FROM prestar WHERE id = ?",[id]);
  // console.log(links[0]);
  res.render("prestar/edit", { presta: prestar[0] });
});

router.post("/edit/:id", isLoggedIn, async (req, res) => {
  const { id } = req.params;
  const { nombre, correo, nombre_libro, cant, autor, editorial, fecha } = req.body;
  const newPrestar = {
    nombre, 
    correo, 
    nombre_libro, 
    cant, 
    autor, 
    editorial, 
    fecha
  };
  await db_connect.query("UPDATE prestar set ? WHERE id = ?", [newPrestar, id]);
   console.log(newPrestar);
  req.flash("success", "Libro Prestado editado satifactoriamente");
  res.redirect("/prestar");
});

// router.post("/consulta/:id", isLoggedIn, async (req, res) => {
//   const { id } = req.params;
//   // console.log(id);
//   const prestar = await db_connect.query("SELECT * FROM prestar WHERE id = ?",[id]);
//    console.log(prestar[0]);
//   res.render("listadoConsulta", { presta: prestar[0]});
// });


//  router.post("/consulta/:id", isLoggedIn, async (req, res) => {
//    const { id } = req.params;
//    const { nombre, correo, nombre_libro, cant, autor, editorial, fecha } = req.body;
//    const newPresta = {
//      nombre,
//      correo,
//      nombre_libro,
//      cant,
//      autor,
//      editorial,
//      fecha,
//    };
//    await db_connect.query("UPDATE prestar set ? WHERE id = ?", [newPresta, id]);
//    // console.log(newLink);
//    req.flash("success", "Enlace editado satifactoriamente");
//    res.redirect("prestar/");
//  });


module.exports = router;
