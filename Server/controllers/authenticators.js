const bcryptjs = require('bcryptjs')

const users = [
  {
    user: "test",
    phone: "1234",
    password: "$2a$05$b.g0h.KTKR/XXvoRFTOjSe2FOmW/aB1avCITYcvBlR9emmE.27tOa",
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


  const salt = await bcryptjs.genSalt(5);
  const hashPassword = await bcryptjs.hash(nPsw, salt);

  nUser = { user, phone, password: hashPassword };
  users.push(nUser);

console.log(`Hash password: ${hashPassword}`)

  res
    .status(201)
    .send({ status: "success", message: `El usuario ${user} se registro correctamente`, redirect: 'login.html' });

  console.log(users);
}

async function login(req, res) {
  const { user, psw } = req.body;

  if (!user || !psw) {
    return res
      .status(400)
      .send({ status: "Error", message: "Los datos están incompletos" });
  }

  if (!users.some(e => e.user == user)) {
    return res
      .status(400)
      .send({ status: "Error", message: "El usuario es incorrecto" });
  }

  // Si pasa las validaciones
  res
    .status(200)
    .send({ status: "success", message: "Inicio de sesión exitoso", redirect: './../admin.html' });
}

module.exports = { register, login };
