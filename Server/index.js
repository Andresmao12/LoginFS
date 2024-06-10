const express = require("express");
const routeAccess = require("./routes/routesAccess");
const cors = require("cors");

//Montamos servidor
const app = express();
app.set("port", 4000);
app.listen(app.get("port"));

console.log("Corriendo servidor en el puerto " + app.get("port"));


app.use(cors());
app.use(express.json());

app.use("/", routeAccess);
