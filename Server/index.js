const express = require('express')
const path = require('path')
const routeAccess = require('./routes/routesAccess')
const cors = require('cors')

// import authenticator from "./controllers/authenticators.js";

//Montamos servidor
const app = express();
app.use(cors())
app.set("port", 4000);
app.use(express.json())

app.use('/',routeAccess)


app.listen(app.get("port"));


console.log("Corriendo servidor en el puerto " + app.get("port"));

//app.use( express.static(path.join(__dirname, '..' , 'Front')))

// Rutas

// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, '..' , 'Front', 'accessPage', 'login.html'));
// });


//POST
// app.post("/api/login", authenticator.login());

// app.post("/api/register", authenticator.register());
