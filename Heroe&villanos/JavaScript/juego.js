
function getrandomItgem(max){ //nuemero RANDOME
    return Math.floor(Math.random() * max)
}
function rellenarForm(){
    document.getElementById('nickJuego').value=nick
    document.getElementById('avatarJuego').src=avatar
    document.getElementById('dificultadJuego').value=dificultad
    tamanoPanel = parseInt(tamano)
    //igualamos la dificultad a un valor antes de empezar, esto hara que tendran un tiempo las cartas visibles al principio
    if(dificultad == "Baja"){
        document.getElementById('tiempo').value= "10"
    }else if(dificultad =="Media"){
        document.getElementById('tiempo').value="6"
    }else{
        document.getElementById('tiempo').value="3"
    }
}
//Pintar panel Automaticamente dependiendo del tamano que elija
function pintarPanel(){
    document.getElementById('juego').style.gridTemplateColumns = "repeat("+tamano+",1fr)" 
    document.getElementById('juego').style.gridTemplateRows = "repeat("+tamano+",1fr)" 
    document.getElementById('cartasbocabajo').style.gridTemplateColumns = "repeat("+tamano+",1fr)" 
    document.getElementById('cartasbocabajo').style.gridTemplateRows = "repeat("+tamano+",1fr)" 
    //Elementos de forma automatica
    let items="";
    let itembocabajo = "";

    //lista de src para ir cambiando cada vez que se recargue la pagina
    let imgsrc = ["./imagenes/spidermancard.jpg","./imagenes/supermanCard.jpg","./imagenes/ironmanCard.jpg","./imagenes/DeadPoolCard.jpg"];
    let randomNumber = 0;
    for (let index = 0; index<parseInt(tamano)* parseInt(tamano); index++){
        randomNumber = getrandomItgem(4);
        itembocabajo += `<div id="${imgsrc[randomNumber]}" class="itembocabajo"><img src="./imagenes/bocaAbajo.jpg" alt=""  width="100px"></div>`
        items +=`<div id="${imgsrc[randomNumber]}" class="item"><img src="${imgsrc[randomNumber]}" alt="" width="100px"></div>`
        
    }
    document.getElementById('cartasbocabajo').innerHTML=`${itembocabajo}`
    document.getElementById('juego').innerHTML=`${items}`    
    IDinterval= setInterval(cuentaAtras, 1000)
}
//Esta funcion esta principalmente para: Dependiendo la dificultad se visualizaran las cartas x segundos 
function cuentaAtras(){
    if (dificultad == "Baja"){
        let tiempo = parseInt(document.getElementById('tiempo').value)-1
        document.getElementById('tiempo').value =tiempo
        document.getElementById('cartasbocabajo').style.zIndex ="1"
        document.getElementById('juego').style.zIndex= "2"
        if (tiempo == 0){
                clearInterval(IDinterval)
                document.getElementById('cartasbocabajo').style.zIndex ="2"
                document.getElementById('juego').style.zIndex= "1"
                document.getElementById('tiempo').value= "0"
        }

    }else if (dificultad == "Media"){
        let tiempo = parseInt(document.getElementById('tiempo').value)-1
        document.getElementById('tiempo').value =tiempo
        document.getElementById('cartasbocabajo').style.zIndex ="1"
        document.getElementById('juego').style.zIndex= "2"
        if (tiempo == 0){
                clearInterval(IDinterval)
                document.getElementById('cartasbocabajo').style.zIndex ="2"
                document.getElementById('juego').style.zIndex= "1"
                document.getElementById('tiempo').value= "0"
        }
    }else{
        let tiempo = parseInt(document.getElementById('tiempo').value)-1
        document.getElementById('tiempo').value =tiempo
        document.getElementById('cartasbocabajo').style.zIndex ="1"
        document.getElementById('juego').style.zIndex= "2"
        if (tiempo == 0){
                clearInterval(IDinterval)
                document.getElementById('cartasbocabajo').style.zIndex ="2"
                document.getElementById('juego').style.zIndex= "1"
                document.getElementById('tiempo').value= "0"
        }
    }
    //Despues de que se haya hecho la cuenta atras dependiendo de la dificultad se programan los eventos 
    programarEventos()
}
//Aqui deberiamos pinchar la carta boca abajo
function programarEventos(){
    let itembocabajo = document.getElementsByClassName('itembocabajo')
    for (let item of itembocabajo){
        item.addEventListener('click',clickImagenes)
    }
}
//Eventos del juego 
function clickImagenes(event){
    let item = event.target;
    let Carta1 = event.target.parentElement
    //cada vez que se hace click se cambia
    item.src = Carta1.src;
    console.log(Carta1.id);

}
//capturamos Datos
recogerDatos()
//Comprobar Datos
if(!comprobarDatos()) location= "index.html"
//rellenar Formulario
rellenarForm()
//Pintar Panel
pintarPanel()
//Comenzar Juego

//Crear eventos del juego 

