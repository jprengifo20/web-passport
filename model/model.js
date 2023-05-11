const mongoose = require("mongoose")

const usuarios = mongoose.Schema({
    nombre:{
        type: String,
    },
    apellidoP:{
        type: String,
    },
    apellidoM:{
        type: String,
    },
    usuario:{
        type: String,
    },
    dni:{
        type: String,
    },
    correo:{
        type: String,
    },
    celular:{
        type: String,
    },
    contrasenia:{
        type: String,
    },
    imgsUrl:{
        type: Array
    },
    comprobante:{
        type: String
    },
    validaciones:{
        foto: {
            type: String
        },
        firma: {
            type: String
        },
        huella: {
            type: String
        },
        comprobante: {
            type: String,
        }
    },
    tramite: {
        type: Boolean,
        default: false
    },
    comprobanteDefault:{
        type: String,
        default: `CMP${Math.round(Math.random()*1000)}`
    },
    dia:{
        type: "String"
    },
    hora:{
        type: "String"
    },
    comprobanteC:{
        type: Boolean,
        default: false
    },
    sedeElegida:{
        type: String
    }
})
let imagenes = [];

c = 0;
usuarios.methods.setImgUrl = function setImgUrl (filename){
    if(c === 2){
        imagenes[c] = `http://localhost:7050/public/${filename}`
        c = 0;
        return imagenes;
    }else{
        imagenes[c] = `http://localhost:7050/public/${filename}`
        c++;
    }

}

const Usuario = mongoose.model("Usuario",usuarios);

module.exports = Usuario;