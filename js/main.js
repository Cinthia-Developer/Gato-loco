var currentSection = null;
var gameId;
//-- Funcion Init() -----
function init(){
	currentSection = $('#inicio');
	$('.boton-inicio').click(onClickInicio);
    $('.boton-datos').click(onClickDatos);
    $('.boton-juego').click(onClickHistorial);
    $('.boton-historial').click(onClickHistorial);
    $('.boton-iniciOne').click(onClickIniciOne);
    $('.boton-enviar').click(onClickSubmitComentario);
    $('#lista-juegos').on("click", "button", onClickComentar);
}
//-- Funciones para cuando se de click pase a la siguiente pantalla ----
function onClickIniciOne(){
	nextSection('inicio');
}
function onClickInicio(){
	nextSection('datos');
}
function onClickDatos(){
	nextSection('juego');
}
function onClickHistorial(evt){
    evt.preventDefault();
	nextSection('historial');
    getHistorial();
}
function onClickSubmitComentario(){
	enviarComentario(gameId, $('#nombre').val(), $('#comentario').val());
}
function onClickComentar(){
	var idGame = $(this).parent().data('idgame');
	nextSection('comentarios');
	getComentarios(idGame);
	gameId = idGame;
    getSingleGame(idGame);
}
//-- Función que elimina .visible y crea otra para pasar a la siguiente pantalla ----
function nextSection(_id){
	currentSection.removeClass('visible');
	var idNextSection = $('#'+_id);
    idNextSection.addClass('visible');
    currentSection = idNextSection;
}

//----------------- Sección de funciones que solicitan información al API ------------------
function getHistorial(){
	$.ajax({
		url: 'http://test-ta.herokuapp.com/games'
	}).done(function(_data){
		dibujarHistorial(_data);
	});
}
function getComentarios(_IdNewGame){
	$.ajax({
		url: 'http://test-ta.herokuapp.com/games/'+_IdNewGame+'/comments',
		type:'GET'
	}).done(function(_data){
		dibujarComentarios(_data);
        
	});
}
function getSingleGame(_IdNewGame){
	$.ajax({
		url: 'http://test-ta.herokuapp.com/games/' + _IdNewGame,
		type:'GET'
	}).done(function(_data){
	});
}
//-------------- Funciones para dibujar  historial y comentarios ----
function dibujarComentarios(_datos){
	var list = $('#lista-comentarios');
    list.empty();
	for(var i in _datos){
		var newElement = '<li class="list-group-item">'+_datos[i].name+' dice: <p>'+ _datos[i].content +'</p></li>';
		list.append(newElement);
	}
}
function dibujarHistorial(_datos){
	var list = $('#lista-juegos');
    for(var i in _datos){
        var newElement = '<li data-idgame="'+ _datos[i].id +'" class="list-group-item"><button class="btn">Comentar</button>  ' + _datos[i].winner_player + ' le gano a '+ _datos[i].loser_player +' en ' + _datos[i].number_of_turns_to_win + ' movimientos</li>';
		list.append(newElement);
	}
}
//-------------- Función para enviar el comentario al API ----
function enviarComentario(_idGame, _name, _content){
	$.ajax({
		url:'http://test-ta.herokuapp.com/games/'+_idGame+'/comments',
		type:'POST',
		data:{comment:{ name:_name, content:_content, game_id:_idGame }}
	}).done(function(_data){
		getComentarios(_idGame);
	});
}

//-------------------------- Sección para el juego de gato loco ----------------------------
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
$("#juga").html("Empieza " + jugador2);
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
            $("#juga").html("<small>Turno de " + jugador1 + "</small>"); 
            tablero[posicion]="X"; 
            turno = 2;
            cont1 ++;
        } 
    }else if(turno == 2){ 
        if (tablero[posicion] == "X" || tablero[posicion] == "O"){
        }else{ 
            this.innerHTML = "O"; 
            this.style.background="#ff4842"; 
            $("#juga").html("<small>Turno de: " + jugador2 + "</small>");
            tablero[posicion]="O"; 
            turno = 1; 
            cont2 ++; 
        } 
    } 
    //llamar a funcion  ganador o enviar mensaje de empate ---
    if (cont1 >= 3 && cont1 <=9){ 
        ganador(); 
    } 
    if(cont1 >= 9 && gana == false || cont2 >= 9 && gana == false){ 
        $("#juga").html("Empate.!!");
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
        $("#juga").html("<h3>Ganó " + jugador2 + "</h3>");
        $(".one").html("<small>" + jugador2 + "</small>");
        $(".cont1").html("<span>" + cont1 + "</span>");
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
        $("#juga").html("<h3>Ganó " + jugador1 + "</h3>");
        $(".one").html("<small>" + jugador1 + "</small>");
        $(".cont1").html("<span>" + cont2 + "</span>");
        turno = 3; 
        gana = true; 
    }
}
// falta  empate
//--- falta enviar al servidor
//-- falta diseño