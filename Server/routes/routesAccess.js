const { login, register } = require("../controllers/authenticators");

const routes = require("express").Router();

// routes.get('/', login)
// routes.get('/register', register)

routes.post("/", login);
routes.post("/register", register);

module.exports = routes;
