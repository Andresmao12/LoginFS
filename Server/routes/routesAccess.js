const { login, register, userValidation } = require("../controllers/authenticators");

const routes = require("express").Router();

// routes.get('/', login)
// routes.get('/register', register)

routes.post("/", login);
routes.post("/register", register);
routes.post("/register/userValidation", userValidation);

module.exports = routes;
