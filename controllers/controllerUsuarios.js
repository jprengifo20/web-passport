const Usuarios = require("../model/model");

const usuarios = async (req,res)=>{
    const {id} = req.params
    const usuario = await Usuarios.findById(id).lean();
    res.render("usuario",usuario)
}


module.exports = {
    usuarios
}