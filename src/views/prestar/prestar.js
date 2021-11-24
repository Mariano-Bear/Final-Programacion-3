const express = require("express");

const router = express.Router();
const db_connect = require("../database");
const { isLoggedIn } = require("../lib/auth");

router.get('/add', isLoggedIn, (req, res) => {
    res.render("prestar/add");
});

router.get('/consulta', function(req, res, next) {
  res.render('buscador/consultaArticulos');
});

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
  res.render("prestar/edit", { libro: prestar[0]});
});

router.get("/buscador/:id", isLoggedIn, async (req, res) =>{
  const { id } = req.params;
  // console.log(id);
  const buscar = await db_connect.query("SELECT * FROM prestar WHERE id = ?",[id]);
  // console.log(links[0]);
  res.render("prestar/buscador", { libro: buscar[0]});

});



router.post("/edit/:id", isLoggedIn, async (req, res) => {
  const { id } = req.params;
  const { nombre, correo, nombre_libro, cant, autor, editorial, fecha } = req.body;
  const newPresta = {
    nombre,
    correo,
    nombre_libro,
    cant,
    autor,
    editorial,
    fecha,
  };
  await db_connect.query("UPDATE prestar set ? WHERE id = ?", [newPresta, id]);
  // console.log(newLink);
  req.flash("success", "Enlace editado satifactoriamente");
  res.redirect("/prestar");
});



router.get('/consulta', async(req, res, next) => {
  res.render('buscador/consultaArticulos');
});

router.post('/consulta', async(req, res, next) => {
   const filas = db_connect.query('SELECT * FROM prestar WHERE nombre = ?',[req.body.nombre], function(error){
              if (error) {            
                  console.log('error en la consulta');
                  return;
              }
              if (filas.length>0) {
                  res.render('buscador/listadoConsulta',{presta:filas});
              } else {
                  res.send({mensaje:'No existe el codigo de articulo ingresado'});
              }    
          });
  });

module.exports = router;
