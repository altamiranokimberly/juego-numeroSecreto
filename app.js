let numMaximo = 10;
let numSecreto = 0;
let intentos = 0;
let listaNumerosSorteados = [];

function asignarTextoElemento(elemento, texto){
    let elementoHTML = document.querySelector(elemento);
    elementoHTML.innerHTML = texto;
}

//Hoisting, pone las funciones al inicio?
function verificarIntento(){
    let numDeUsuario = parseInt(document.getElementById('valorUsuario').value);
    if (numDeUsuario === numSecreto){
        asignarTextoElemento('p', `Acertaste el número en ${intentos} ${(intentos === 1 ? 'vez': 'veces')}`);
        document.getElementById('reiniciar').removeAttribute('disabled');
        document.querySelector('#intentar').setAttribute('disabled', 'true');
    } else{
        if (intentos >= 3) {
        asignarTextoElemento('p', `Se te acabaron los intentos. El número era ${numSecreto}.`);
        document.getElementById('reiniciar').removeAttribute('disabled');
        document.querySelector('#intentar').setAttribute('disabled', 'true');
        }else{
            //el usuario no acertó
        if(numDeUsuario>numSecreto){
            asignarTextoElemento('p', 'El número secreto es menor');
        } else{
            asignarTextoElemento('p', 'El número secreto es mayor');
        }
        }
        
        intentos++;
        limpiarCaja();
    }

     
}

function condicionesIniciales(){
    asignarTextoElemento('h1', 'Juego del número secreto');
    asignarTextoElemento('p', `Indica un número del 1 al ${numMaximo} `);
    document.getElementById('intentar').removeAttribute('disabled');
    numSecreto = generarNumSecreto();
    intentos = 1;
}

function limpiarCaja(){
    document.querySelector('#valorUsuario').value = '';
}

function generarNumSecreto(){
    let numGenerado = Math.floor(Math.random()*numMaximo)+1;
    // Si ya se sortearon todos los numeros
    if(listaNumerosSorteados.length == numMaximo  ){
        asignarTextoElemento('p', 'Ya se sortearon todos los números posibles');
    }else{
        //Si el numero generado se encuentra dentro de la lista
        if(listaNumerosSorteados.includes(numGenerado)){
            return generarNumSecreto();
        }else{
            listaNumerosSorteados.push(numGenerado);
            return numGenerado;
        }
    }
    
}

function reiniciarJuego(){
    //limpiar caja
    limpiarCaja();
    //indicar mensaje de inicio
    // generar el num secreto
    //inicializar num de Intentos
    condicionesIniciales();
    //deshabilitar boton de Nuevo juego
    document.querySelector('#reiniciar').setAttribute('disabled', 'true');
}

condicionesIniciales();