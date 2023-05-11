const express = require("express")
const mongoose = require("mongoose");
const servidor = express();
const port = process.env.PORT || 7050
const { create } = require("express-handlebars");
require("dotenv").config()

const hbs = create({
    extname: ".hbs",
    partialsDir: ["views/components"]
});

servidor.use(express.static("public"));
servidor.use("/public",express.static(`${__dirname}/storage/imgs`))
servidor.use(express.urlencoded({extended: true}))
servidor.engine(".hbs", hbs.engine);
servidor.use(express.json());
servidor.use("/",require("./router/router"))
servidor.set("view engine", ".hbs");
servidor.set("views", "./views");



// servidor.use('*', (req, res) => {
//     res.status(404).render('error404');
//   });


mongoose.connect(process.env.URI)
.then(res=> console.log("Conexion a db"))
.catch(err => console.log(err))




servidor.listen(port, ()=> console.log("conexion exitosa"))