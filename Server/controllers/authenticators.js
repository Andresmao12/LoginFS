const bcryptjs = require("bcryptjs");
const jsonWT = require("jsonwebtoken");
const dotenv = require("dotenv");

const users = [
  {
    user: "test",
    phone: "1234",
    password: "$2a$05$a3CH893YfUWTh0ApeE0Mr.D5kmw2nyHbbasJLu/kl5y4Ci/1PxgtO",
  },
];

async function register(req, res) {
  const { user, phone, nPsw, cPsw } = req.body;
  console.log('User: ' + user + ' Password: ' + nPsw)

  if (!user || !phone || !nPsw || !cPsw) {
    return res
      .status(400)
      .send({ status: "Error", message: "Datos incompletos" });
  }
  if (nPsw !== cPsw) {
    return res
      .status(400)
      .send({ status: "Error", message: "Las contraseñas no coinciden" });
  }

  const exist = users.some((e) => e.user === user);

  if (exist) {
    return res
      .status(400)
      .send({ status: "Error", message: "El usuario ya existe" });
  }

  const salt = await bcryptjs.genSalt(5);
  const hashPassword = await bcryptjs.hash(nPsw, salt);

  nUser = { user, phone, password: hashPassword };
  users.push(nUser);

  res.status(201).send({
    status: "success",
    message: `El usuario ${user} se registro correctamente`,
    redirect: "login.html",
  });

  console.log(users);
}

async function login(req, res) {
  const { user, psw } = req.body;
  console.log('User: ' + user + ' Password: ' + psw)


  if (!user || !psw) {
    return res
      .status(400)
      .send({ status: "Error", message: "Los datos están incompletos" });
  }

  const userReview = users.find((e) => e.user == user);

  if (!userReview) {
    return res
      .status(400)
      .send({ status: "Error", message: "Los datos son incorrectos" });
  }

  const loginCorrecto = await bcryptjs.compare(psw, userReview.password);

  if (!loginCorrecto) {
    return res
      .status(400)
      .send({ status: "Error", message: "Los datos son incorrectos" });
  }

  // Si pasa las validaciones
  return res.status(200).send({
    status: "success",
    message: "Inicio de sesión exitoso",
    redirect: "./../admin.html",
  });
}


async function userValidation(req, res){
  const {user} = req.body;


  const exist = users.some((e) => e.user === user);

  if (exist) {
    return res
      .status(400)
      .send({ status: "Error", message: "El usuario ya existe" });
  }

  return res.status(200).send({ status: "success", message: "Usuario valido" })
}

module.exports = { register, login, userValidation };
