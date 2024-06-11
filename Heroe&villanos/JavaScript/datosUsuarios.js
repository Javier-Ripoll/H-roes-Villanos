/*
*
*    Gestión de los datos de los Usuarios
*
*/ 
let nick;
let tamano;
let dificultad;
let contImg
function datoUsuario(valuenick,valuetamano,valuedificultad,avatarcontImg){
    //Colocamos elementos clave valor
    sessionStorage.setItem('nick', valuenick.value);
    sessionStorage.setItem('tamano', valuetamano.value);
    sessionStorage.setItem('dificultad', valuedificultad.value)
    sessionStorage.setItem('avatar', avatarcontImg.src)
}
function recogerDatos(){
    nick = sessionStorage.getItem('nick')
    tamano = sessionStorage.getItem('tamano')
    dificultad = sessionStorage.getItem('dificultad')
    contImg = sessionStorage.getItem('avatar')
}

function comprobarDatos(){
    if (nick==null){
        sessionStorage.setItem('error', 'Completa el formulario')
        return false;
    }
    return true;
}
function historicoUsuario(nick){
    let historicoStorage = localStorage.getItem('historico')
    let historico
    if(historicoStorage == null){ //Si no hay ninguno crea la lista por primera vez
        historico= []
    }else{
        historico = JSON.parse(historicoStorage)
    }
    let registroUsuario={
        usuario:nick.value,
        fecha:Date.now()
    }
    historico.push(registroUsuario) //Almacenar todos los usuarios
    localStorage.setItem('historico', JSON.stringify(registroUsuario))
}