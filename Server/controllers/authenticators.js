const bcryptjs = require("bcryptjs");
const jsonWT = require("jsonwebtoken");
const dotenv = require("dotenv");

//DATABASE
const sqlite = require("sqlite3");

const db = new sqlite.Database("DB/users.db", sqlite.OPEN_READWRITE, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Connected to the SQLite database");

    // Crear la tabla si no existe
    const sql = `
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user VARCHAR(30) NOT NULL,
        phone VARCHAR(30) NOT NULL,
        password VARCHAR(60) NOT NULL
      )`;

    db.run(sql, (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Se creo la base de datos o ya estaba creada");
      }
    });
  }
});


async function register(req, res) {
  const { user, phone, nPsw, cPsw } = req.body;
  console.log("User: " + user + " Password: " + nPsw);

  if (!user || !phone || !nPsw || !cPsw) {
    return res
      .status(400)
      .send({ status: "error", message: "Datos incompletos" });
  }

  if (nPsw !== cPsw) {
    return res
      .status(400)
      .send({ status: "error", message: "Las contraseñas no coinciden" });
  }

  const checkUser = `SELECT user FROM users WHERE user = ? `;

  db.get(checkUser, [user], (e, rows) => {
    if (e) {
      console.log(e);
    } else {
      if (rows != undefined) {
        return res
          .status(400)
          .send({ status: "Error", message: "El usuario ya existe" });
      }
    }
  });

  // const exist = users.some((e) => e.user === user);

  const salt = await bcryptjs.genSalt(5);
  const hashPassword = await bcryptjs.hash(nPsw, salt);

  const insertUser = `INSERT INTO users (user, phone, password) 
  VALUES(?, ?, ?)`;

  db.run(insertUser, [user, phone, hashPassword], (err) => {
    if (err) {
      return res
        .status(500)
        .send({ status: "error", message: "Error en la bd" });
    } else {
      return res.status(200).send({
        status: "success",
        message: `El usuario ${user} se registro correctamente`,
        redirect: "login.html",
      });
    }
  });
}

async function login(req, res) {
  const { user, psw } = req.body;
  console.log("User: " + user + " Password: " + psw);

  if (!user || !psw) {
    return res
      .status(400)
      .send({ status: "error", message: "Los datos están incompletos" });
  }


  const validLogin = `
  SELECT user, password FROM users 
  WHERE user = ?
  `
  db.get(validLogin, [user], async (err, row) =>{
    if (err) {
      console.log("Ocurrio un error validando en la bd")
    }else{

      if (row == undefined) {
        return res.status(400).send({status:"error", message:"Los datos son incorrectos"})
      }
      
      const loginCorrecto = await bcryptjs.compare(psw, row.password);

      if (!loginCorrecto) {
        return res
          .status(400)
          .send({ status: "error", message: "Los datos son incorrectos" });
      }
    
      // Si pasa las validaciones
      return res.status(200).send({
        status: "success",
        message: "Inicio de sesión exitoso",
        redirect: "./../admin.html",
      });

    }
  })
  
}

async function userValidation(req, res) {
  const { user } = req.body;

  const checkUser = `SELECT user FROM users WHERE user = ? `;

  db.get(checkUser, [user], (err, row) => {
    if (err) {
      console.log(err);
    } else {
      if (row != undefined) {
        return res
          .status(400)
          .send({ status: "error", message: "El usuario ya existe" });
      } else {
        return res
          .status(200)
          .send({ status: "success", message: "Usuario valido" });
      }
    }
  });
}

module.exports = { register, login, userValidation };
