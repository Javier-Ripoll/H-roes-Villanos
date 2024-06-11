var errorPopUp;
var valuenick;
var valuedificultad;
var valuetamano;
var valueformEntrada;
var valueimagenes;
var avatarcontImg;

if(sessionStorage.getItem('error')!=null){
    error.innerText = sessionStorage.getItem('error')
    sessionStorage.removeItem('error')
}
function comprobarForm(event){
    //Comprobar Nick y Selects
    //Si alguno no esta completo salta un error en la parte superior de la zona delimitada transparente
    if(valuenick.value.match(/(?<!\S)[0-9]/)){
        valuenick.focus();
        event.preventDefault();
        errorPopUp.innerText = "El Nick no puede comenzar por un número"
        return false; 
    }else if(valuedificultad.value ===""){
        valuedificultad.focus();
        event.preventDefault()
        errorPopUp.innerText= "Debe Seleccionar una dificultad"
        return false;
    }else if(valuetamano.value ===""){
        valuetamano.focus();
        event.preventDefault()
        errorPopUp.innerText= "Debe Seleccionar un Tamaño"
        return false;
    }
    //Información Correcta
    datoUsuario(valuenick,valuetamano,valuedificultad,contImg)
    historicoUsuario(valuenick)
    return true;

}
//Drag & drop
//esta funición la hacemos para saber que imagen se esta moviendo
function moviendoimg(event){
    itemImg = event.target;
    console.log(itemImg.src);
}
//Y en esta función la imagen que hemos cogido se cambiara por la actual de contenedor  
function cambiarImg (){
    avatarcontImg.src = itemImg.src
}

//Funcion que se ejecutará una vez el DOM se haya cargado al completo
function domcargado(){
    //captura de los ID,CLASES Y EVENTOS 
    valuenick = document.getElementById('nick') 
    valuedificultad = document.getElementById('dificultad')
    valuetamano = document.getElementById('tamano')
    valueformEntrada = document.getElementById('formEntrada')
    errorPopUp = document.getElementById('error')
    //Comprobar error en eñ juego
    if(sessionStorage.getItem('error')!=null){
        error.innerText = sessionStorage.getItem('error')
        sessionStorage.removeItem('error')
    }
    formEntrada.addEventListener('submit', comprobarForm)

    //Drag and Drop
    imagenes = document.getElementsByClassName('avatarItem')
    for (img of imagenes){
        img.addEventListener('dragstart', moviendoimg)
    }
    avatarcontImg = document.getElementById('avatarcontainer')
    avatarcontImg.addEventListener('dragover' ,event => (event.preventDefault()))
    avatarcontImg.addEventListener('drop', cambiarImg)
    
}


//DOM cargado
document.addEventListener('DOMContentLoaded', domcargado)
