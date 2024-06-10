const sqlite = require("sqlite3");

const db = new sqlite.Database("DB/users.db");

const sqlDelete = `
DELETE FROM users
`

db.run(sqlDelete, (err) =>{
    if (err) {
        console.log(err)
    }else{
        console.log("La operacion fue exitosa")
    }
})

db.close(err =>{
    if (err) {
        console.log(err)
    }else{
        console.log("Se cerro la conexion a la bd")
    }
})