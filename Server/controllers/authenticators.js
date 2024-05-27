async function register(req, res) {
  console.log("Se hizo la validacion del registro");
}
async function login(req, res) {
  // res.json({message:'Se hizo la validacion del ingreso'})
  // console.log("Se hizo la validacion del ingreso");
  console.log(req.body)
}


module.exports = {register, login}
