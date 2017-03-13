var currentSection = null;

function init(){
	currentSection = $('#inicio');
	$('.boton-inicio').click(onClickInicio);
    $('.boton-datos').click(onClickDatos);
    $('.boton-juego').click(onClickResultados);
    $('.boton-resultados').click(onClickHistorial);
    $('.boton-historial').click(onClickComentarios);
}

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
function onClickComentarios(){
	gotoSection('comentarios');
}


function gotoSection(_id){
	currentSection.removeClass('visible');
	var nextSection = $('#'+_id);
    nextSection.addClass('visible');
    currentSection = nextSection;
}