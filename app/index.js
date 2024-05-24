const express = require("express");

//Montamos servidor
const app = express();
app.set("port", 4000)
app.listen(app.get("port"))


//Rutas
// app.get("/", (req, res) =>{
//      res.sendFile(__dirname + "/page/login.html")
// })