const express = require("express");
const { postUsuarioRegister, postUsuarioLogin} = require("../controllers/controllerReLoUsuarios");
const {usuarios} = require("../controllers/controllerUsuarios")
const router = express.Router()
const Usuarios = require("../model/model");
const upload = require("../lib/storage")
router.get("/",(req,res)=>{
    res.render("session")
})

router.post("/",postUsuarioLogin)

router.get("/register",(req,res)=>{
    res.render("formRegister")
})


router.get("/usuario/:id",usuarios)

router.post("/usuario/:id",upload.array("image",5),async (req,res)=>{
    const {comprobante,recojo} = req.body
    const {id} = req.params;
    if(recojo === "subirDocumentos"){
        if(Object.values(req.files).length !== 3 || comprobante === ""){
             res.json({
                error: "Favor de ingresar todos los campos y/o subir documentos pendientes"
            })
            return;
        }

         let imagenes;
         const usuarioDate = new Usuarios();
         req.files.forEach((elemento)=>{
             imagenes =  usuarioDate.setImgUrl(elemento.filename)
         })
    
         await Usuarios.findOneAndUpdate({_id: id},{
             imgsUrl: imagenes,
             comprobante: comprobante
         })

        res.json({
            exito: "Solicitud de tramite exitoso. Debera esperar a la validacion de los datos en adjunto"
        })
    }

    if(recojo === "actualizarDocumentos"){
        if(Object.values(req.files).length !== 3 || comprobante === ""){
             res.json({
                error: "Favor de ingresar todos los campos y/o subir documentos pendientes"
            })
            return;
        }

         let imagenes;
         const usuarioDate = new Usuarios();
         req.files.forEach((elemento)=>{
             imagenes =  usuarioDate.setImgUrl(elemento.filename)
         })
    
         await Usuarios.findOneAndUpdate({_id: id},{
             imgsUrl: imagenes,
             comprobante: comprobante
         })

        res.json({
            exito: "Actualizacion de datos correcto"
        })        
    }

    if(recojo === "validacionCC"){
        const usuario = await Usuarios.findOne({_id: id})
        if(usuario.comprobanteDefault === comprobante){
            await Usuarios.findOneAndUpdate({_id: id},{
                comprobanteC : true,
            })
            res.json({
                exito: true
            })
        }else{
            res.json({
                error: "Comprobante inexistente, vuelva a intentar"
            })
        }
    }

    if(recojo === "cita"){
        const {dia,hora,sedeElegida} = req.body;
        if(dia === "" || hora === ""){
            res.send({
                error: "Porfavor ingrese un dia y hora validos"
            })
            return;
        }

        await Usuarios.findOneAndUpdate({_id : id},{
            dia,
            hora,
            sedeElegida
        })
        res.json({
            exito: "Su cita se registró correctamente"
        })
    }
})


router.post("/register",postUsuarioRegister)

router.get("/administrador",async (req,res)=>{
    const usuariosT = await Usuarios.find().lean();
    res.render("administrador",{
        usuariosT
    }) 
})

router.post("/administrador",async(req,res)=>{
    const {foto,firma,huella,comprobante,idOculto} = req.body;
    let tramite;
    if(foto === "aprobado" && firma === "aprobado" && huella === "aprobado" && comprobante === "aprobado"){
        tramite = true;
    }else{
        tramite = false;
    }
    await Usuarios.findOneAndUpdate({_id: idOculto},{
        tramite,
        validaciones: {
            foto,
            firma,
            huella,
            comprobante,
        }
    })

    res.redirect("/administrador#estadoTramite")

})

module.exports = router;