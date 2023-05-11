const Usuarios = require("../model/model");


const postUsuarioLogin = async (req,res)=>{
    let accesoDenegado;
    let c = 1;
    const usuarioLogin = req.body;
    const usuarioDb = await Usuarios.findOne({usuario: usuarioLogin.usuario}).lean();
    
        if((usuarioLogin.usuario === "admin123") && (usuarioLogin.contrasenia === "admin123")){
            res.redirect("/administrador");
            // return;
        }else if(!(usuarioDb)){
            accesoDenegado = "No existe el usuario"
            res.render("session",{
                accesoDenegado
            })
            // return;
         }else if(usuarioLogin.usuario === usuarioDb.usuario && !(usuarioLogin.contrasenia === usuarioDb.contrasenia)){
            accesoDenegado = "Usuario y/o contraseña incorrectos"
            res.render("session",{
                accesoDenegado
            })
            // return;
        }else if(usuarioLogin.usuario === usuarioDb.usuario && usuarioLogin.contrasenia === usuarioDb.contrasenia){
            res.redirect(`/usuario/${usuarioDb._id}`)
        }
}

 const postUsuarioRegister = async (req,res) =>{
    let accesoDenegado;
    let c = 1;
    const usuarioRegister = req.body;
    const usuarioDb = await Usuarios.findOne({usuario: usuarioRegister.usuario}).lean();
    const usuarioDbDNI = await Usuarios.findOne({dni: usuarioRegister.dni}).lean();
    console.log(req.body)
    if(usuarioDbDNI){
        accesoDenegado = "Usuario ya existente con ese DNI, ingrese uno diferente"
        res.render("formRegister",{
        accesoDenegado
        })
        return;
    }


    if(!(usuarioDb)){
        const usuarioDate = new Usuarios(usuarioRegister);
        await usuarioDate.save()
        res.redirect("/")
    }else{
        accesoDenegado = "Usuario ya existente, vuelve a ingresar los datos porfavor"
        res.render("formRegister",{
        accesoDenegado
        })
    }
    
 }

 module.exports = {
    postUsuarioRegister,
    postUsuarioLogin
 }

