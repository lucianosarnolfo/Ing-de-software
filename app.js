//invocar a express
const express = require("express");
const app = new express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const dotenv = require("dotenv");
dotenv.config({ path: "./env/.env" });

//el directorio public
app.use(express.static("public"));
app.use(express.static(__dirname + "/public"));

app.set("view engine", "ejs");

// bcryptjs
const bcryptjs = require("bcryptjs");

const session = require("express-session");
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);

const connection = require("./database/db");

//Vistas
app.get("/", (req, res) => {
  


  if (req.session.loggedin) {
    res.render("index", {
      login: true,
      name: req.session.name,
    });
  } else {
    res.render("index", {
      login: false,
      name: "Debe iniciar sesión",
    });
  }
  res.end();
});
app.get("/iniciarSesion", (req, res) => {
  res.render("iniciarSesion");
});

app.get("/registroCliente", (req, res) => {
  res.render("registroCliente");
});

app.get("/paginaServicio", async (req, res) => {
  await connection.query(
    "SELECT * FROM servicio WHERE idCliente = ?",
    [req.session.user_id],
    async (error, results) => {
      if(error)throw err;
      if (results.length != 0) {
        req.session.nameNegocio = results[0].nombreNegocio;
        req.session.telefonoNegocio = results[0].telefono;
        req.session.localidadNegocio = results[0].localidad;
        req.session.direccionNegocio = results[0].direccion;
        console.log(req.session.nameNegocio);
        console.log(req.session.telefonoNegocio);
        res.render("paginaServicio", {
          login: true,
          name: req.session.name,
          nameNegocio: req.session.nameNegocio,
          telefono: req.session.telefonoNegocio,
          location: req.session.localidadNegocio,
          direction: req.session.direccionNegocio
        });
        res.end();
      }
      
    }
  
  );

  
});

app.get("/paginaCliente", (req, res) => {
  res.render("paginaCliente", {
    login: true,
    name: req.session.name,
    surname: req.session.surname,
    email: req.session.email,
    location: req.session.location,
    direction: req.session.direccion,
    logServicio: req.session.logServicio
  });

  res.end();
});
app.get("/registroServicio", (req, res) => {
  res.render("registroServicio");
});

//registro cliente
app.post("/registroCliente", async (req, res) => {
  const nombre = req.body.nombre;
  const apellido = req.body.apellido;
  const localidad = req.body.localidad;
  const direccion = req.body.direccion;
  const email = req.body.email;
  const password = req.body.password;
  let passwordHaash = await bcryptjs.hash(password, 8);

  connection.query(
    "SELECT * FROM `cliente` WHERE `email` = ?",
    [email],
    (err, result) => {
      if (err) throw err;
      if (result.length > 0) {
        res.render("registroCliente", {
          alert: true,
          alertTitle: "Registro",
          alertMessage: "Este e-mail ya se encuentra registrado",
          alertIcon: "error",
          showConfirmButton: false,
          timer: 2000,
          ruta: "",
        });
      } else {
        connection.query(
          "INSERT INTO cliente SET ?",
          {
            nombre: nombre,
            apellido: apellido,
            localidad: localidad,
            direccion: direccion,
            email: email,
            password: passwordHaash,
          },
          async (error, results) => {
            if (error) {
              console.log(error);
            } else {
              res.render("registroCliente", {
                alert: true,
                alertTitle: "Registro",
                alertMessage: "¡Registro exitoso!",
                alertIcon: "success",
                showConfirmButton: false,
                timer: 1500,
                ruta: "",
              });
            }
          }
        );
      }
    }
  );
});

//registro servicio
app.post("/registroServicio", async (req, res) => {
  const id = req.session.user_id;
  const nombreNegocio = req.body.nombreNegocio;
  const localidad = req.body.localidad;
  const direccion = req.body.direccion;
  const telefono = req.body.telefono;
  const tipo = req.body.tipo;

  connection.query(
    "INSERT INTO servicio SET ?",
    {
      nombreNegocio: nombreNegocio,
      localidad: localidad,
      direccion: direccion,
      telefono: telefono,
      idCliente: id,
      tipoDeServicio: tipo,
    },
    async (error, results) => {
      if (error) {
        console.log(error);
      } else {
        res.render("registroServicio", {
          alert: true,
          alertTitle: "Registro",
          alertMessage: "¡Registro exitoso!",
          alertIcon: "success",
          showConfirmButton: false,
          timer: 1500,
          ruta: "",
        });
      }
    }
  );
});

//iniciar sesion
app.post("/auth", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  let passwordHaash = await bcryptjs.hash(password, 8);
  if (email && password) {
    connection.query(
      "SELECT * FROM cliente WHERE email = ?",
      [email],
      async (error, results) => {
        if (
          results.length == 0 ||
          !(await bcryptjs.compare(password, results[0].password))
        ) {
          res.render("iniciarSesion", {
            alert: true,
            alertTitle: "Error",
            alertMessage: "Usuario y/o password incorrectas",
            alertIcon: "error",
            showConfirmButton: true,
            timer: false,
            ruta: "iniciarSesion",
          });
        } else {
          req.session.loggedin = true;
          req.session.name = results[0].nombre;
          req.session.surname = results[0].apellido;
          req.session.email = results[0].email;
          req.session.location = results[0].localidad;
          req.session.direction = results[0].direccion;
          req.session.user_id = results[0].id;
          req.session.logServicio = false;
          //Preguntar si tiene un servicio 
               await connection.query('SELECT * FROM servicio WHERE idCliente = ?', [req.session.user_id], async (error, results) =>{
                    if(results.length != 0){
                        req.session.logServicio = true;
                        console.log(req.session.logServicio);                      
                    }
                });     
                console.log("pepito");
          res.render("iniciarSesion", {
            alert: true,
            alertTitle: "Conexion exitosa",
            alertMessage: "Login correcto",
            alertIcon: "success",
            showConfirmButton: false,
            timer: 1500,
            ruta: "/",
          });
        }
        res.end();
      }
    );
  } else {
    res.render("iniciarSesion", {
      alert: true,
      alertTitle: "Advertencia",
      alertMessage: "Por favor ingrese un usuario o password",
      alertIcon: "warning",
      showConfirmButton: true,
      timer: false,
      ruta: "iniciarSesion",
    });
  }
});

//iniciar sesion


//Cerrar sesion
app.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
});

app.listen(3000, (req, res) => {
  console.log("SERVER RUNNING IN http://localhost:3000");
});
