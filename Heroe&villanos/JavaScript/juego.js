let puntuacionJuego;
let cards;
let marcado = [];
let tamanoTotal;
let contcat;
let tirada;
let card;
let container = []
function getrandomItgem(max){ //nuemero RANDOME
    return Math.floor(Math.random() * max)
}
function shuffle(array){
    for(let i = array.length -1; i> 0; i--){
        const j= Math.floor(Math.random() * (i+1));
        [array[i],array[j]=array[j],array[i]]
    }
    return array
}

function rellenarForm(){
    document.getElementById('nickJuego').value=nick
    document.getElementById('avatarJuego').src=avatar
    document.getElementById('dificultadJuego').value=dificultad
    tamanoPanel = parseInt(tamano)
    tamanoTotal = tamanoPanel * tamanoPanel

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
    let imgsrc = ["./imagenes/spidermancard.jpg","./imagenes/supermanCard.jpg","./imagenes/ironmanCard.jpg","./imagenes/DeadPoolCard.jpg",
        "./imagenes/FlashCard.jpg","./imagenes/BatmanCard.jpg","./imagenes/WonderWomanCard.jpg","./imagenes/lobeznoCard.jpg"];
    let cards =[]
    for (let i=0; i<(parseInt(tamano)*parseInt(tamano)) / 2;i++){
        //Dependiendo del tamaño del panel habra mas tiradas o menos 

        let randomNumber = getrandomItgem(imgsrc.length);
        cards.push(imgsrc[randomNumber])
        cards.push(imgsrc[randomNumber])

        if(parseInt(tamano)*parseInt(tamano)== 16){
            document.getElementById('tiradas').value= "10"
            document.getElementById('otravez').style.width="550px"
            document.getElementById('otravez').style.height="600px"  
            if (card==15){
                removeEvents()
            }
     
        }else {
            document.getElementById('tiradas').value="27"
            document.getElementById('contenedorjuego').style.width="700px"
            document.getElementById('otravez').style.width="700px"
            document.getElementById('otravez').style.height="870px"    
        
        }
        
    }
    cardss = shuffle(cards)
    for(let card of cardss){
        itembocabajo += `<div id="${card}" class="itembocabajo"><img src="./imagenes/bocaAbajo.jpg" alt=""  width="100px"></div>`
        items +=`<div id="${card}" class="item"><img src="${card}" alt="" width="100px"></div>`
    }
  
    document.getElementById('cartasbocabajo').innerHTML=`${itembocabajo}`
    document.getElementById('juego').innerHTML=`${items}`    
    IDinterval= setInterval(cuentaAtras, 1000)
}
//Esta funcion esta principalmente para: Dependiendo la dificultad se visualizaran las cartas x segundos 
function cuentaAtras(){
    let tiempo = parseInt(document.getElementById('tiempo').value) - 1;
    document.getElementById('tiempo').value = tiempo;
    document.getElementById('cartasbocabajo').style.zIndex = "2";
    document.getElementById('juego').style.zIndex = "3";

    if (tiempo == 0) {
        clearInterval(IDinterval);
        document.getElementById('cartasbocabajo').style.zIndex = "3";
        document.getElementById('juego').style.zIndex = "2";
        document.getElementById('tiempo').value = "0";
        programarEventos();
    }
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
     card = item.parentElement;
    item.src = card.id;
    marcado.push(card);
    
    if(marcado.length === 2)
        {
        tirada = parseInt(document.getElementById('tiradas').value)-12
            document.getElementById('tiradas').value= tirada
            if (tirada <= 0){
                removeEvents()
            }
         
            ComprobacionDeCartas();
        }

}
function ComprobacionDeCartas(){

    let primeraImg = marcado[0].querySelector('img');
    let segundaImg = marcado[1].querySelector('img');
    console.log(primeraImg);
    if (primeraImg && segundaImg) {
        // Comparar las fuentes (src) de las imágenes
        if (primeraImg.src === segundaImg.src) {
            // Las imágenes son iguales, coincidencia encontrada
            console.log('¡Pareja encontrada!');
            //y se suman los puntos
             puntuacionJuego = parseInt(document.getElementById('puntuacion').value)+1
             document.getElementById('puntuacion').value = puntuacionJuego
             console.log(container);

        } else {
            // Las imágenes no son iguales, volver a ocultarlas después de un tiempo
            setTimeout(() => {
                primeraImg.src = "./imagenes/bocaAbajo.jpg";
                segundaImg.src = "./imagenes/bocaAbajo.jpg";
            }, 1000); // Volver a tapar después de 1 segundo (1000 milisegundos)
        }
    } else {
        console.error("No se encontraron elementos img dentro de las cartas marcadas");
    }

    // Limpiar el array de cartas marcadas para la siguiente comparación
    marcado = [];
    
}
function removeEvents(){
    document.getElementById('tiradas').value= "0"
    let itembocabajo = document.getElementsByClassName('itembocabajo')
    for (let item of itembocabajo){
        item.removeEventListener('click',clickImagenes)   
    } 
    document.getElementById('otravez').classList.add('juegoacabado')
    document.getElementById('otravez').style.zIndex="4"
    document.getElementById('nuevaPartida').style.color="black"
    document.getElementById('nuevaPartida').addEventListener('click',(e)=>location.reload())


}
//capturamos Datos
recogerDatos()
//Comprobar Datos
if(!comprobarDatos()) location= "index.html"
//rellenar Formulario
rellenarForm()
//Pintar Panel
pintarPanel()
