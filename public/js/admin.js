const d = document, $ventanaModal = d.querySelectorAll(".ventanaModalU"),$filas = d.querySelectorAll(".fila"),$form = d.querySelector(".subirDocumentos"),$modeloTramite = d.querySelectorAll(".modeloTramite");

// d.addEventListener("click",(e)=>{
//     if(e.target.matches(".clientesClick")){
//         d.querySelector(".datosClientes").style.display = "inline-block";
//     }
// })

const cambioUrl = ()=>{
    let url = location.href;
    if(url.includes("#")){
        let indice = location.href.indexOf("#") + 1
        if(location.href.includes("estadoTramite")){
            d.querySelector(".datosClientes").style.display = "inline-block";
            d.querySelector(".datosAdmin").style.display = "none";
            $ventanaModal.forEach((el)=>{
                el.style.display = "none"
            })
            return;
        }else if(location.href.includes("consultarDatos")){
            d.querySelector(".datosAdmin").style.display = "inline-block";
            d.querySelector(".datosClientes").style.display = "none";
            return;
        }

        let id = location.href.substr(indice)
        d.getElementById(id).style.display = "inline-block"
    }else{
        $ventanaModal.forEach((el)=>{
            el.style.display = "none"
        })
    }
}
const modoTramiteElegido = ()=>{
    if(d.querySelector(".modoTramite").value === "recojo"){
        $filas.forEach((el)=>{
            if(!(el.querySelector(".modeloTramite").textContent === "Recojo")){
                el.classList.add("quitarCliente")
             }else{
                el.classList.remove("quitarCliente")
             }
        })
    }

    if(d.querySelector(".modoTramite").value === "cita"){
        $filas.forEach((el)=>{
            if(!(el.querySelector(".modeloTramite").textContent === "Cita")){
                el.classList.add("quitarCliente")
             }else{
                el.classList.remove("quitarCliente")
             }
        })
    }
}


cambioUrl()


window.addEventListener("hashchange",cambioUrl)
d.querySelector(".modoTramite").addEventListener("change",modoTramiteElegido)

d.addEventListener("keyup",(e)=>{
    if(e.target.matches(".buscar")){
        $filas.forEach((el)=>{
            if(!(el.querySelector(".filaBuscado").value.includes(e.target.value))){
                el.classList.add("quitarCliente")
             }else{
                el.classList.remove("quitarCliente")
             }
        })
       
    }
})




