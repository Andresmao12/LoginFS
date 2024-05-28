const users = [
  {
    user: "test",
    phone: "1234",
    password: "1234",
  },
];

async function register(req, res) {
  const { user, phone, nPsw, cPsw } = req.body;

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

  nUser = { user, phone, password: nPsw };
  users.push(nUser);

  res
    .status(200)
    .send({ status: "Success", message: "Se registro correctamente" });

  console.log(users);
}

async function login(req, res) {
  const { user, psw } = req.body;
  console.log(`User: ${user} - psw: ${psw}`);

  if (!user || !psw) {
    return res
      .status(400)
      .send({ status: "Error", message: "Los datos están incompletos" });
  }

  if (user !== "test") {
    return res
      .status(400)
      .send({ status: "Error", message: "El usuario está incorrecto" });
  }

  // Si pasa las validaciones
  res
    .status(200)
    .send({ status: "Success", message: "Inicio de sesión exitoso" });
}

module.exports = { register, login };
