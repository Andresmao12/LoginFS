const express = require("express");

const authenticator = require("./controllers/authenticators");

//Montamos servidor
const app = express();
app.set("port", 4000);
app.listen(app.get("port"));
console.log("Corriendo servidor en el puerto " + app.get("port"));

// Rutas
app.get("/", (req, res) => {
  console.log(__dirname);
  res.sendFile(__dirname + "/page/login.html");
});
app.get("/register", (req, res) => {
  res.sendFile(__dirname + "/page/register.html");
});
app.get("/login", (req, res) => {
  res.sendFile(__dirname + "/page/login.html");
});
app.get("/admin", (req, res) => {
  res.sendFile(__dirname + "/page/admin.html");
});

//POST
// app.post("/api/login", authenticator.login());

// app.post("/api/register", authenticator.register());
