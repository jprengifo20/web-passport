const d = document,
regExpCorreo = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i,
regExpDNI = /^[\d]{1,3}\.?[\d]{3,3}\.?[\d]{3,3}$/,
regExpCelular = /[\(]?[\+]?(\d{2}|\d{3})[\)]?[\s]?((\d{6}|\d{8})|(\d{3}[\*\.\-]){2}\d{3}|(\d{2}[\*\.\-\s]){3}\d{2}|(\d{4}[\*\.\-\s]){1}\d{4})|\d{8}|\d{10}|\d{12}/

const validacionCorreo = (e)=>{
        if(e.target.validity.valueMissing || !(regExpCorreo.test(d.querySelector("#correo").value))){
            e.target.setCustomValidity("Ingrese un email valido porfavor")
        }else{
            e.target.setCustomValidity("")
        }
    
}

const validacionDNI = (e)=>{
    if(e.target.validity.valueMissing || !(regExpDNI.test(d.querySelector("#dni").value))){
        e.target.setCustomValidity("Ingrese un dni valido porfavor")
    }else{
        e.target.setCustomValidity("")
    }

}

const validacionCelular = (e)=>{
    if(e.target.validity.valueMissing || !(regExpCelular.test(d.querySelector("#celular").value))){
        e.target.setCustomValidity("Ingrese un celular valido porfavor")
    }else{
        e.target.setCustomValidity("")
    }

}

const validacionContrasenia = (e)=>{
    if(e.target.value !== d.querySelector("#contrasenia").value){
        e.target.setCustomValidity("Contraseña no valida")
    }else{
        e.target.setCustomValidity("")
    }
}




d.querySelector("#correo").addEventListener("invalid",(e)=>{
        validacionCorreo(e)
    })
d.querySelector("#correo").addEventListener("input",(e)=>{
            validacionCorreo(e);
    })

d.querySelector("#dni").addEventListener("invalid",(e)=>{
        validacionDNI(e)
    })
d.querySelector("#dni").addEventListener("input",(e)=>{
            validacionDNI(e);
    })

d.querySelector("#celular").addEventListener("invalid",(e)=>{
        validacionCelular(e)
    })
d.querySelector("#celular").addEventListener("input",(e)=>{
            validacionCelular(e);
    })

d.querySelector("#contraseniaR").addEventListener("change",(e)=>{
     validacionContrasenia(e);
})

// d.addEventListener("submit",(e)=>{
//     if(e.target.matches(".registro")){
//         e.preventDefault();
//         const form = new FormData(e.target);
//         fetch("/register")
//         .then(res=> res.ok ? res.json() : Promise.reject("Error en el registro de datos"))
//         .then(res=> {
//             if(res.errorDNV){
//                 d.querySelector(".errorRegister").textContent = res.errorDNV;
//             }else if(res.errorDE){
//                 d.querySelector(".dniFormRegister").textContent = res.errorDE;
//             }else if(res.errorUE){
//                 d.querySelector(".usuarioFormRegister").textContent = res.errorUE;
//             }else if(res.errorCE){
//                 d.querySelector(".celularFormRegister").textContent = res.errorCE;
//             }
//         })
//         .catch(err => console.log(err))
//     }
// })



 



