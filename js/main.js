var currentSection = null;

function init(){
	currentSection = $('#inicio');
	$('.boton-inicio').click(onClickInicio);
    $('.boton-datos').click(onClickDatos);
    $('.boton-juego').click(onClickResultados);
    $('.boton-resultados').click(onClickHistorial);
    $('.menu-historial').click(onClickHistori);
    $('#lista-juegos').on("click", "button", onclickggg);
}
function onclickggg(){
    var idgame=$(this).parent().data("idgame");
    console.log(idgame);
  game(idgame);
}
//-- Funciones para cuando se de click pasa a la siguiente pantalla --
function onClickInicio(){
	gotoSection('datos');
}
function onClickDatos(){
	gotoSection('juego');
}
function onClickResultados(){
	gotoSection('resultados');
}
function onClickHistorial(){
	gotoSection('historial');
}
function onClickHistori(evt){
    evt.preventDefault();
	gotoSection('historial');
    getHistorial();
}
//-- Función que elimina la clase Visible y crea otra para la siguiente pantalla --
function gotoSection(_id){
	currentSection.removeClass('visible');
	var nextSection = $('#'+_id);
    nextSection.addClass('visible');
    currentSection = nextSection;
}
//--------------------------------------------
//variables globales 
var jugador1= $("#jugadorUno").val(); 
var jugador2 = $("#jugadorDos").val(); 
var turno = 1;
var cont1 = 0; 
var cont2 = 0;
var n = 0;
var posicion;
var gana = false;
//----------------------- Que jugador comienza ---- 
$("#juga").html(jugador2);
//----------------------- Obtener los elementos de las celdas de la tabla ------
    var tablero = new Array(9);
    for (var i = 0;i < 9;i++){ 
        $(".gato").click(dibujar);
        n++; 
    }
//----------------------- Función para los mensajes y movimientos ----
function dibujar(evento){
    posicion = evento.target.id.charAt(1)-1; 
    if(turno == 1){ 
        if(tablero[posicion] == "X" || tablero[posicion] == "O") { 
        }else{ 
            this.innerHTML = "X"; 
            this.style.background="#7dcd40"; 
            $("#juga, .one").html("<small>" + jugador2 + "</small>"); 
            tablero[posicion]="X"; 
            turno = 2;
            cont1 ++;
        } 
    }else if(turno == 2){ 
        if (tablero[posicion] == "X" || tablero[posicion] == "O"){
        }else{ 
            this.innerHTML = "O"; 
            this.style.background="#ff4842"; 
            $("#juga, .two").html("<small>" + jugador1 + "</small>");
            tablero[posicion]="O"; 
            turno = 1; 
            cont2 ++; 
        } 
    } 
    //llamar a funcion  ganador 
    if (cont1 >= 3 && cont1 <=9 || cont2 >= 3 && cont2 <=9) { 
        ganador(); 
    } 
    if(cont1 >= 9 && gana == false || cont2 >= 9 && gana == false){ 
        $("#juga").html("<h2>Empate.!!</h2>"); 
        cont1 ++; 
        cont2 ++;
        turno = 3; 
    } 
 
} 
//----------------------- Función para los mensajes y movimientos ----
function ganador(){ 
    if ((tablero[0]=="X" && tablero[1]=="X" && tablero[2]=="X") || 
     (tablero[3]=="X" && tablero[4]=="X" && tablero[5]=="X") || 
     (tablero[6]=="X" && tablero[7]=="X" && tablero[8]=="X") || 
     (tablero[0]=="X" && tablero[3]=="X" && tablero[6]=="X") || 
     (tablero[1]=="X" && tablero[4]=="X" && tablero[7]=="X") || 
     (tablero[2]=="X" && tablero[5]=="X" && tablero[8]=="X") || 
     (tablero[0]=="X" && tablero[4]=="X" && tablero[8]=="X") || 
     (tablero[2]=="X" && tablero[4]=="X" && tablero[6]=="X")) { 
        $("#juga").html("<h2>Ganó " + jugador1 + "</h2>");
        $(".cont1").html("<span>" + cont1 + "</span>");
        cont1 = cont1; 
        turno = 3; 
        gana = true; 
    }else if((tablero[0]=="O" && tablero[1]=="O" && tablero[2]=="O") || 
     (tablero[3]=="O" && tablero[4]=="O" && tablero[5]=="O") || 
     (tablero[6]=="O" && tablero[7]=="O" && tablero[8]=="O") || 
     (tablero[0]=="O" && tablero[3]=="O" && tablero[6]=="O") || 
     (tablero[1]=="O" && tablero[4]=="O" && tablero[7]=="O") || 
     (tablero[2]=="O" && tablero[5]=="O" && tablero[8]=="O") || 
     (tablero[0]=="O" && tablero[4]=="O" && tablero[8]=="O") || 
     (tablero[2]=="O" && tablero[4]=="O" && tablero[6]=="O")) { 
        $("#juga").html("<h2>Ganó " + jugador2 + "</h2>"); 
        $(".cont2").html("<span>" + cont2 + "</span>");
        cont2 = cont2; 
        turno = 3; 
        gana = true; 
    }
}
//-------- Funciones para pedir al servidor el historial de Ganadores ----
function getHistorial() {
	$.ajax({
		url: 'http://test-ta.herokuapp.com/games'
	}).done(function (_data) {
		dibujarHistorial(_data);
	});
}
function game(_idGame){
    $.ajax({
		url: 'http://test-ta.herokuapp.com/games/1' + _idGame
	}).done(function (_data) {
		console.log(_data);
	});
}

function dibujarHistorial(_datos) {
	//console.log(_datos);
	var lista = $('#lista-juegos');

	for (var i in _datos) {
		console.log(_datos[i].winner_player);

		var html = '<li data-idgame=id="' +_datos[i].id+ '" class="list-group-item">Ganador: ' + _datos[i].winner_player + '<button class="boton-comentar">ver<button></li>';
		lista.append(html);
	}
}