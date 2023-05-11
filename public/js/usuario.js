let d = document;
let w = window;
let $sede = d.querySelector(".sedeCita");
// d.querySelector(".salir").addEventListener("click",(e)=>{
//     localStorage.setItem("url","/")
//     localStorage.setItem("enabled","false")
// })

let url = location.href
let indice = url.lastIndexOf("/") + 1
let id = url.substr(indice) 





// d.addEventListener("click",(e)=>{
//     if(e.target.matches(".datosClick")){
//         d.querySelector(".ConsultarDatosUsuario").style.display = "inline-block";
//         d.querySelector(".modalidadRecojoUsuario").style.display = "none";
//         d.querySelector(".estadoTramite").style.display = "none";
//     }
    
//     if(e.target.matches(".recojoClick")){
//         d.querySelector(".modalidadRecojoUsuario").style.display = "inline-block";
//         d.querySelector(".ConsultarDatosUsuario").style.display = "none";
//         d.querySelector(".estadoTramite").style.display = "none";
//     }
    
//     if(e.target.matches(".estadoClick")){
//         d.querySelector(".estadoTramite").style.display = "inline-block";
//         d.querySelector(".ConsultarDatosUsuario").style.display = "none";
//         d.querySelector(".modalidadRecojoUsuario").style.display = "none";
//     }
// })

// d.addEventListener("submit",(e)=>{
//     if(e.target.matches(".subirDocumentos")){
//         e.preventDefault();
//         let form = new FormData(e.target)
//         fetch(`/usuario/${id}`,{
//             method: "POST",
//             body: form
//         }).then(res => res.ok ? res.json() : Promise.reject("error"))
//         .then(res=> {
//             d.querySelector(".mensajeSubirDocumentos").textContent = res.error || res.exito
//         })
//         .catch(err => console.log(err))
//     }
// })

d.addEventListener("submit",(e)=>{

    if(e.target.matches(".subirDocumentos")){
        e.preventDefault();
        let form = new FormData(e.target)
        fetch(`/usuario/${id}`,{
            method: "POST",
            body: form
        }).then(res => res.ok ? res.json() : Promise.reject("error"))
        .then(res=> {
            if(res.error){
                d.querySelector(".mensajeSubirDocumentos").textContent = res.error;
            }else if(res.exito){
                d.querySelector(".mensajeSubirDocumentos").textContent =  res.exito;
                setInterval(()=>{
                    location.reload()
                },1000)
            }
        })
        .catch(err => console.log(err))
    }
    
    if(e.target.matches(".actualizarDocumentos")){
        e.preventDefault();
        let form = new FormData(e.target)
        fetch(`/usuario/${id}`,{
            method: "POST",
            body: form
        }).then(res => res.ok ? res.json() : Promise.reject("error"))
        .then(res=> {
            console.log(res)
            d.querySelector(".mensajeActualizacionDocumentos").textContent = res.error || res.exito
        })
        .catch(err => console.log(err))
    }


    if(e.target.matches(".enviarCita")){
        e.preventDefault();
        let form = new FormData(e.target);
        fetch(`/usuario/${id}`,{
            method: "POST",
            body: form
        }).then(res => res.ok ? res.json() : Promise.reject("error"))
        .then(res=>{
            d.querySelector(".mensajeCita").textContent = res.error || res.exito
            setTimeout(()=>{
                location.reload(); 
             },1000) 
        })
        .catch(err => console.log(err))
    }

    if(e.target.matches(".validacionComprobanteCita")){
        e.preventDefault();
        let form = new FormData(e.target);
        fetch(`/usuario/${id}`,{
            method: "POST",
            body: form
        }).then(res => res.ok ? res.json() : Promise.reject("error"))
        .then(res=>{
            if(res.exito){
                location.reload();

            }
            if(res.error){
                d.querySelector(".mensajeCitaComprobante").textContent = res.error
                return;
            }

        })
        .catch(err => console.log(err))
    }
})

const cambioUrl = ()=>{
    let urlSeccion = location.href
    let indiceSeccion = urlSeccion.indexOf("#") + 1
    let seccion = urlSeccion.substr(indiceSeccion)
    
    if(urlSeccion.includes("#")){
        if(seccion === "consultarDatos"){
            d.querySelector(".ConsultarDatosUsuario").style.display = "inline-block";
            d.querySelector(".modalidadRecojoUsuario").style.display = "none";
            d.querySelector(".estadoTramite").style.display = "none";
            d.querySelector(".modalidadCita").style.display = "none"
        }

        if(seccion === "modalidadRecojo"){
            d.querySelector(".modalidadRecojoUsuario").style.display = "inline-block";
            d.querySelector(".ConsultarDatosUsuario").style.display = "none";
            d.querySelector(".estadoTramite").style.display = "none";
            d.querySelector(".modalidadCita").style.display = "none"
        }

        if(seccion === "estadoTramite"){
            d.querySelector(".estadoTramite").style.display = "inline-block";
            d.querySelector(".ConsultarDatosUsuario").style.display = "none";
            d.querySelector(".modalidadRecojoUsuario").style.display = "none";
            d.querySelector(".ventanaActualizarDocumentos").style.display = "none";
            d.querySelector(".modalidadCita").style.display = "none"  
        }else if(seccion === "estadoTramite#actualizarDocumentos"){
            d.querySelector(".ventanaActualizarDocumentos").style.display = "inline-block";
        }

        if(seccion === "modalidadCita"){
            d.querySelector(".modalidadCita").style.display = "inline-block"
            d.querySelector(".estadoTramite").style.display = "none";
            d.querySelector(".ConsultarDatosUsuario").style.display = "none";
            d.querySelector(".modalidadRecojoUsuario").style.display = "none";
            d.querySelector(".ventanaActualizarDocumentos").style.display = "none";  
        }
    }
}

cambioUrl();
w.addEventListener("hashchange",cambioUrl)


const filtroSede = ()=>{
    d.querySelector(".diaElegido").innerHTML = `Dia: `;
        d.getElementById("dia").value = "";

        d.getElementById("hora").value = "";
        d.querySelector(".horarioElegido").innerHTML = `Horario: `;
    if($sede.value === "brenia"){
        d.querySelector(".tablaBrenia").style.display = "block"
        d.querySelector(".tablaLima").style.display = "none"
        d.querySelector(".tablaHora2").style.display = "none"
        d.querySelector(".tablaHora1").style.display = "none"
        d.getElementById("sedeElegida").value = "Brenia"
    }

    if($sede.value === "lima"){
        d.querySelector(".tablaLima").style.display = "block"
        d.querySelector(".tablaBrenia").style.display = "none"
        d.querySelector(".tablaHora2").style.display = "none"
        d.querySelector(".tablaHora1").style.display = "none"
        d.getElementById("sedeElegida").value = "Lima"
    }
}

filtroSede();
$sede.addEventListener("change",filtroSede)


d.addEventListener("click",(e)=>{
    if(e.target.matches(".tablaBrenia td")){
        d.querySelector(".diaElegido").innerHTML = `Dia: `;
        d.getElementById("dia").value = "";

        d.getElementById("hora").value = "";
        d.querySelector(".horarioElegido").innerHTML = `Horario: `;
        if(e.target.textContent === "1" || e.target.textContent === "3" || e.target.textContent === "9" || e.target.textContent === "11" || e.target.textContent === "13" || e.target.textContent === "17" || e.target.textContent === "19" || e.target.textContent === "25" || e.target.textContent === "27" || e.target.textContent === "29"){
            d.querySelector(".tablaHora1").style.display = "block"
            d.querySelector(".tablaHora2").style.display = "none"
            d.querySelector(".diaElegido").innerHTML = `Dia: ${e.target.textContent}`;
             d.getElementById("dia").value = e.target.textContent;
        }else if(e.target.textContent === "4" || e.target.textContent === "6" || e.target.textContent === "8" || e.target.textContent === "10" || e.target.textContent === "12" || e.target.textContent === "22" || e.target.textContent === "24" || e.target.textContent === "26" || e.target.textContent === "30"){
            d.querySelector(".tablaHora2").style.display = "block"
            d.querySelector(".tablaHora1").style.display = "none"
            d.querySelector(".diaElegido").innerHTML = `Dia: ${e.target.textContent}`;
             d.getElementById("dia").value = e.target.textContent;
        }else{
            d.querySelector(".tablaHora2").style.display = "none"
            d.querySelector(".tablaHora1").style.display = "none"
        }
    }
        if(e.target.matches(".tablaLima td")){
            d.querySelector(".diaElegido").innerHTML = `Dia: `;
            d.getElementById("dia").value = "";

             d.getElementById("hora").value = "";
             d.querySelector(".horarioElegido").innerHTML = `Horario: `;
            if(e.target.textContent === "1" || e.target.textContent === "11" || e.target.textContent === "13" || e.target.textContent === "15"  || e.target.textContent === "19" || e.target.textContent === "23" || e.target.textContent === "27" || e.target.textContent === "29"){
                d.querySelector(".tablaHora1").style.display = "block"
                d.querySelector(".tablaHora2").style.display = "none"
                d.querySelector(".diaElegido").innerHTML = `Dia: ${e.target.textContent}`;
                d.getElementById("dia").value = e.target.textContent;
            }else if(e.target.textContent === "2" || e.target.textContent === "4" || e.target.textContent === "6" || e.target.textContent === "8" || e.target.textContent === "12" || e.target.textContent === "18" || e.target.textContent === "20" || e.target.textContent === "22" || e.target.textContent === "24" || e.target.textContent === "26" || e.target.textContent === "30"){
                d.querySelector(".tablaHora2").style.display = "block"
                d.querySelector(".tablaHora1").style.display = "none"
                d.querySelector(".diaElegido").innerHTML = `Dia: ${e.target.textContent}`;
                d.getElementById("dia").value = e.target.textContent;
            }else{
                d.querySelector(".tablaHora2").style.display = "none"
                d.querySelector(".tablaHora1").style.display = "none"
            }
    }

    if(e.target.matches(".tablaHora1 td")){
        if(e.target.textContent === "09:00" || e.target.textContent === "10:00" || e.target.textContent === "10:30" || e.target.textContent === "11:30" || e.target.textContent === "12:00" || e.target.textContent === "12:30" || e.target.textContent === "13:00" || e.target.textContent === "14:00" || e.target.textContent === "14:30" || e.target.textContent === "16:00" || e.target.textContent === "16:30" || e.target.textContent === "17:00" || e.target.textContent === "17:30" || e.target.textContent === "18:00"){
            d.getElementById("hora").value = `${e.target.textContent}`;
            d.querySelector(".horarioElegido").innerHTML = `Horario: ${e.target.textContent}`;
        }else{
            d.getElementById("hora").value = "";
            d.querySelector(".horarioElegido").innerHTML = `Horario: `;
        }
    }

    if(e.target.matches(".tablaHora2 td")){
        if(e.target.textContent === "09:30" || e.target.textContent === "10:00" || e.target.textContent === "11:00" || e.target.textContent === "11:30" || e.target.textContent === "12:00" || e.target.textContent === "12:30" || e.target.textContent === "13:30" || e.target.textContent === "14:00" || e.target.textContent === "15:00" || e.target.textContent === "16:00" || e.target.textContent === "16:30" || e.target.textContent === "17:00" || e.target.textContent === "17:30" || e.target.textContent === "18:30"){
            d.getElementById("hora").value = `${e.target.textContent}`;
            d.querySelector(".horarioElegido").innerHTML = `Horario: ${e.target.textContent}`;
        }else{
            d.getElementById("hora").value = "";
            d.querySelector(".horarioElegido").innerHTML = `Horario: `;
        }
    }
})


