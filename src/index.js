const express = require("express");
const morgan = require("morgan");
const hbs = require("express-handlebars");
const path = require("path");
const flash = require("connect-flash");
const session = require("express-session");
const MySQLStore = require("express-mysql-session");
const { database } = require("./connection");
const passport = require("passport");

//Inicializaciones
const app = express();
require("./lib/passport");

//Configuraciones
app.set("port", process.env.PORT || 4000);
app.set("views", path.join(__dirname, "views"));
app.engine(".hbs", hbs({
    defaultLayout: "main",
    layoutsDir: path.join(app.get("views"), "layouts"),
    partialsDir: path.join(app.get("views"), "partials"),
    extname: ".hbs",
    helpers: require("./lib/handlebars"),
  })
  
);


app.set("view engine", ".hbs");

//Midleware
app.use(session({
    secret: "Bear Software",
    resave: false,
    saveUninitialized: false,
    store: new MySQLStore(database),
  })
);
app.use(flash());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());

//Variables Globales
app.use((req, res, next) => {
  app.locals.success = req.flash("success");
  app.locals.message = req.flash("message");
  app.locals.user = req.user;
  next();
});

//Rutas
app.use(require("./routes/index"));
app.use(require("./routes/authentication"));
app.use("/biblioteca", require("./routes/biblioteca"));
app.use("/mobiliario", require("./routes/mobiliario"));
app.use("/prestar", require("./routes/prestar"));
// app.use("/", require("./routes/consulta"));


//Archivos Publicos
app.use(express.static(path.join(__dirname, "public")));

//Empezar el servidor
app.listen(app.get("port"), () => {
  console.log("Servido en Puerto", app.get("port"));
});
