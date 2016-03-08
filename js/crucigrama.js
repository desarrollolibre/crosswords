(function($){
  /**
   * Crucigrama
   * @author DesarrolloLibre.cl
   */
  Crucigrama = {
    cantTematicas: 0,
    cantContenidos: 0,
    cantTematicasOK: 0,
    cantContenidosOK: 0,
    instrucciones: "<p><span>1.-</span> Posiciona el mouse sobre alguna celda de color. All&iacute encontrar&aacute; las pistas para la palabra que puede estar hacia la derecha, izquierda, arriba y/o abajo</p>" + 
    "<p><span>2.-</span> Ingresa la palabra que consideres correcta.</p>"+
    "<p><span>3.-</span> Si has acertado con la palabra se registrar&aacute; un punto en el marcador y tambi&eacute;n las letras cambiar&aacute;n de color.-</p>",
    dimensiones: {
      alto: 13,
      ancho: 13
    }, 
    celdasInformativas: informativas,
    setEventoCeldaRespuestaPierdeFoco: function(){
      $("input").blur(function(){
        try {
          var dataObject = ($(this).parent()).data();
          Crucigrama.chequeaPalabra(dataObject);
        }
        catch(e){
          if (console && console.log) console.log("No puedo obtener posición de la celda..." + e);
        }
      });
    },
    setEventoCeldaRespuestaKeyUp: function(){
      $("input").keyup(function(){
        //try {
          var dataObject = ($(this).parent()).data();
          Crucigrama.chequeaPalabra(dataObject);
        //}
        //catch(e){
        //  if (console && console.log) console.log("No puedo obtener posición de la celda..." + e);
        //}
      });
    },
    setEventoCeldaRespuestaFlechas: function(){
      $("input").keydown(function(e){
        //try {
          var dataObject = ($(this).parent()).data();
          if (dataObject && dataObject.posicion){
            switch (e.keyCode) {
              case 40:
                if (dataObject.posicion.fila < Crucigrama.dimensiones.alto){
                  var posFila = dataObject.posicion.fila;
                  var celdaSiguiente = document.getElementById("f" + (++posFila) + "_c" + dataObject.posicion.columna);
                  var esInformativa = false;

                  if (Crucigrama.celdasInformativas[posFila] && Crucigrama.celdasInformativas[posFila][dataObject.posicion.columna] ) {
                    esInformativa = Crucigrama.celdasInformativas[posFila][dataObject.posicion.columna];
                  }
                  if (!esInformativa){
                    var inputSiguiente = $(celdaSiguiente).children("input")[0];
                    while (inputSiguiente.disabled && posFila < Crucigrama.dimensiones.alto){
                      celdaSiguiente = document.getElementById("f" + (++posFila) + "_c" + dataObject.posicion.columna);
                      if (Crucigrama.celdasInformativas[posFila] &&
                        Crucigrama.celdasInformativas[posFila][dataObject.posicion.columna]) {
                        esInformativa = Crucigrama.celdasInformativas[posFila][dataObject.posicion.columna];
                      }
                      if (!esInformativa){
                        inputSiguiente = $(celdaSiguiente).children("input")[0];
                      }
                      else break;
                    }
                    if (posFila  <= Crucigrama.dimensiones.alto) inputSiguiente.focus();
                  }
                }
                break;
              case 38:
                if (dataObject.posicion.fila > 1){
                  var posFila = dataObject.posicion.fila;
                  var celdaSiguiente = document.getElementById("f" + (--posFila) + "_c" + dataObject.posicion.columna);
                  var esInformativa = false;
                  if (Crucigrama.celdasInformativas[posFila] && Crucigrama.celdasInformativas[posFila][dataObject.posicion.columna]) {
                    esInformativa = Crucigrama.celdasInformativas[posFila][dataObject.posicion.columna];
                  }
                  if (!esInformativa){
                    var inputSiguiente = $(celdaSiguiente).children("input")[0];
                    while (inputSiguiente.disabled && posFila > 1){
                      celdaSiguiente = document.getElementById("f" + (--posFila) + "_c" + dataObject.posicion.columna);
                      if (Crucigrama.celdasInformativas[posFila] &&
                        Crucigrama.celdasInformativas[posFila][dataObject.posicion.columna]) {
                        esInformativa = Crucigrama.celdasInformativas[posFila][dataObject.posicion.columna];
                      }
                      if (!esInformativa){
                        inputSiguiente = $(celdaSiguiente).children("input")[0];
                      }
                      else break;
                    }
                    if (posFila  >= 1) inputSiguiente.focus();
                  }
                }
                break;
              case 37:
                if (dataObject.posicion.columna > 1){
                  var posColumna = dataObject.posicion.columna;
                  var celdaSiguiente = document.getElementById("f" + dataObject.posicion.fila + "_c" + (--posColumna));
                  var esInformativa = false;

                  if (Crucigrama.celdasInformativas[dataObject.posicion.fila] != undefined && Crucigrama.celdasInformativas[dataObject.posicion.fila][posColumna] != undefined) {
                    esInformativa = Crucigrama.celdasInformativas[dataObject.posicion.fila][posColumna];
                  }
                  if (!esInformativa){
                    var inputSiguiente = $(celdaSiguiente).children("input")[0];
                    while (inputSiguiente.disabled && posColumna > 1){
                      celdaSiguiente = document.getElementById("f" + dataObject.posicion.fila + "_c" + (--posColumna));
                      if (Crucigrama.celdasInformativas[dataObject.posicion.fila] &&
                        Crucigrama.celdasInformativas[dataObject.posicion.fila][posColumna]) {
                        esInformativa = Crucigrama.celdasInformativas[dataObject.posicion.fila][posColumna];
                      }
                      if (!esInformativa){
                        inputSiguiente = $(celdaSiguiente).children("input")[0];
                      }
                      else break;
                    }
                    if (posColumna  >= 1) inputSiguiente.focus();
                  }
                }
                break;
              case 39:
                if (dataObject.posicion.columna < Crucigrama.dimensiones.ancho){
                  var posColumna = dataObject.posicion.columna;
                  var celdaSiguiente = document.getElementById("f" + dataObject.posicion.fila + "_c" + (++posColumna));
                  var esInformativa = false;

                  if (Crucigrama.celdasInformativas[dataObject.posicion.fila] != undefined && Crucigrama.celdasInformativas[dataObject.posicion.fila][posColumna] != undefined) {
                    esInformativa = Crucigrama.celdasInformativas[dataObject.posicion.fila][posColumna];
                  }
                  if (!esInformativa){
                    var inputSiguiente = $(celdaSiguiente).children("input")[0];
                    while (inputSiguiente.disabled && posColumna  < Crucigrama.dimensiones.ancho){
                      celdaSiguiente = document.getElementById("f" + dataObject.posicion.fila + "_c" + (++posColumna));
                      if (Crucigrama.celdasInformativas[dataObject.posicion.fila] &&
                        Crucigrama.celdasInformativas[dataObject.posicion.fila][posColumna]) {
                        esInformativa = Crucigrama.celdasInformativas[dataObject.posicion.fila][posColumna];
                      }
                      if (!esInformativa){
                        inputSiguiente = $(celdaSiguiente).children("input")[0];
                      }
                      else break;
                    }
                    if (posColumna <= Crucigrama.dimensiones.ancho) inputSiguiente.focus();
                  }
                }
                break;
              default:
                break;
            } 
          }
        //}
        //catch(e){
        //  if (console && console.log) console.log("No puedo obtener posición de la celda..." + e);
        //}
      });
    },
    chequeaPalabra: function(dataObject){
//      try{
        if (dataObject && dataObject.posicion){
          var celdasInformativas = Crucigrama.getCeldaInformativaPorPosicion(dataObject.posicion);
          console.log(celdasInformativas);
          for (var celdaInformativa in celdasInformativas){
            if (Crucigrama.celdasInformativas[celdasInformativas[celdaInformativa].posicion.fila][celdasInformativas[celdaInformativa].posicion.columna].texto[celdasInformativas[celdaInformativa].orientacion].resuelta != true)
            var palabra = "";
            var arrCeldaPalabra = new Array();
            switch(celdasInformativas[celdaInformativa].orientacion){
              case "arriba": 
                var posFila = celdasInformativas[celdaInformativa].posicion.fila - celdasInformativas[celdaInformativa].texto.respuesta.length;
                for (var i = (celdasInformativas[celdaInformativa].posicion.fila - celdasInformativas[celdaInformativa].texto.respuesta.length); i < celdasInformativas[celdaInformativa].posicion.fila; i++){
                  var celda = document.getElementById("f" + (posFila++) + "_c" + dataObject.posicion.columna);
                  palabra += $(celda).children("input").val();
                  arrCeldaPalabra.push(celda);
                }
                break;
              case "abajo": 
                var posFila = celdasInformativas[celdaInformativa].posicion.fila;
                for (var i = 1; i <= celdasInformativas[celdaInformativa].texto.respuesta.length; i++){
                  var celda = document.getElementById("f" + (++posFila) + "_c" + dataObject.posicion.columna);
                  palabra += $(celda).children("input").val();
                  arrCeldaPalabra.push(celda);
                }
                break;
              case "derecha": 
                var posColumna = celdasInformativas[celdaInformativa].posicion.columna;
                for (var i = 1; i <= celdasInformativas[celdaInformativa].texto.respuesta.length; i++){
                  var celda = document.getElementById("f" + dataObject.posicion.fila + "_c" + (++posColumna));
                  palabra += $(celda).children("input").val();
                  arrCeldaPalabra.push(celda);
                }
                break;
              case "izquierda": 
                var posColumna = celdasInformativas[celdaInformativa].posicion.columna - celdasInformativas[celdaInformativa].texto.respuesta.length;
                for (var i = (celdasInformativas[celdaInformativa].posicion.columna - celdasInformativas[celdaInformativa].texto.respuesta.length); i < celdasInformativas[celdaInformativa].posicion.columna; i++){
                  var celda = document.getElementById("f" + dataObject.posicion.fila + "_c" + (posColumna++));
                  palabra += $(celda).children("input").val();
                  arrCeldaPalabra.push(celda);
                }
                break;
            }

            if (Crucigrama.repareCharset(celdasInformativas[celdaInformativa].texto.respuesta).toUpperCase() == palabra.toUpperCase()){
              for (var celda in arrCeldaPalabra){
                $(arrCeldaPalabra[celda]).children("input").attr("disabled", "true");
              }
              (celdasInformativas[celdaInformativa].texto.tipo == "tematica") ? Crucigrama.cantTematicasOK ++ : Crucigrama.cantContenidosOK++;
              Crucigrama.dibujaPanelPuntaje();
              Crucigrama.celdasInformativas[celdasInformativas[celdaInformativa].posicion.fila][celdasInformativas[celdaInformativa].posicion.columna].texto[celdasInformativas[celdaInformativa].orientacion].resuelta = true;
            }
          }
        }
  //    }
  //    catch(error){
  //      if (console && console.log) console.log(error);
  //    }
    },
    repareCharset: function(string){
      try {
        return string.replace(String.fromCharCode(65533), String.fromCharCode(241));
      }
      catch(error){
      }
    },
    getRespuesta: {
      arriba:null,
      abajo:null,
      derecha:null,
      izquierda:null
    },
    getCeldaInformativaPorPosicion: function(posicion){
      try {
        if (posicion){
          var celdasInformativas = new Array();
          for (var filaArriba = posicion.fila - 1; filaArriba >= 1; filaArriba--){
            if (Crucigrama.celdasInformativas[filaArriba] && Crucigrama.celdasInformativas[filaArriba][posicion.columna]){
              if (Crucigrama.celdasInformativas[filaArriba][posicion.columna].texto.abajo &&
                Crucigrama.celdasInformativas[filaArriba][posicion.columna].texto.abajo.pregunta){
                var celdaInformativaReturn = {
                  orientacion: "abajo",
                  texto: Crucigrama.celdasInformativas[filaArriba][posicion.columna].texto.abajo,
                  posicion: {fila: filaArriba, columna: posicion.columna}
                };
                celdasInformativas.push(celdaInformativaReturn);
              }
              break;
            }
          }
          for (var columnaIzquierda = posicion.columna - 1; columnaIzquierda >= 1; columnaIzquierda--){
            if (Crucigrama.celdasInformativas[posicion.fila] && Crucigrama.celdasInformativas[posicion.fila][columnaIzquierda]){
              if (Crucigrama.celdasInformativas[posicion.fila][columnaIzquierda].texto.derecha &&
                Crucigrama.celdasInformativas[posicion.fila][columnaIzquierda].texto.derecha.pregunta){
                var celdaInformativaReturn = {
                  orientacion: "derecha",
                  texto: Crucigrama.celdasInformativas[posicion.fila][columnaIzquierda].texto.derecha,
                  posicion: {fila: posicion.fila, columna: columnaIzquierda}
                };
                celdasInformativas.push(celdaInformativaReturn);
              }
              break;
            }
          }
          for (var filaAbajo = posicion.fila + 1; filaAbajo <= Crucigrama.dimensiones.alto; filaAbajo++){
            if (Crucigrama.celdasInformativas[filaAbajo] && Crucigrama.celdasInformativas[filaAbajo][posicion.columna]){
              if (Crucigrama.celdasInformativas[filaAbajo][posicion.columna].texto.arriba &&
                Crucigrama.celdasInformativas[filaAbajo][posicion.columna].texto.arriba.pregunta){
                var celdaInformativaReturn = {
                  orientacion: "arriba",
                  texto: Crucigrama.celdasInformativas[filaAbajo][posicion.columna].texto.arriba,
                  posicion: {fila: filaAbajo, columna: posicion.columna}
                };
                celdasInformativas.push(celdaInformativaReturn);
              }
              break;
            }
          }
          for (var columnaDerecha = posicion.columna + 1; columnaDerecha <= Crucigrama.dimensiones.ancho; columnaDerecha++){
            if (Crucigrama.celdasInformativas[posicion.fila] && Crucigrama.celdasInformativas[posicion.fila][columnaDerecha]){
              if (Crucigrama.celdasInformativas[posicion.fila][columnaDerecha].texto.izquierda &&
                Crucigrama.celdasInformativas[posicion.fila][columnaDerecha].texto.izquierda.pregunta){
                var celdaInformativaReturn = {
                  orientacion: "izquierda",
                  texto: Crucigrama.celdasInformativas[posicion.fila][columnaDerecha].texto.izquierda,
                  posicion: {fila: posicion.fila, columna: columnaDerecha}
                };
                celdasInformativas.push(celdaInformativaReturn);
              }
              break;
            }
          }
          
          return celdasInformativas;
        }
      }
      catch(e){
        if (console && console.log) console.log("No puedo obtener celda informativa..." + e);
      }
    },
    dibujaPaneles: function(){
      var contenedor = document.createElement("div");
      var control = document.createElement("div");
      var avisos = document.createElement("div");
      var tabla = document.createElement("div");
      var puntajeInstrucciones = document.createElement("div");
      var puntaje = document.createElement("div");
       var instrucciones = document.createElement("div");
      var instruccionesContent = document.createElement("div");
      
      contenedor.setAttribute("id", "contenedor");
      control.setAttribute("id", "control");
      avisos.setAttribute("class", "avisos");
      tabla.setAttribute("id", "tabla");
      puntaje.setAttribute("id", "puntaje");
      instrucciones.setAttribute("id", "instrucciones");
      instruccionesContent.setAttribute("class", "instrucciones-content");
      puntajeInstrucciones.setAttribute("id", "puntajeInstrucciones");
      instruccionesContent.innerHTML = Crucigrama.instrucciones;
      instrucciones.appendChild(instruccionesContent);

      puntajeInstrucciones.appendChild(puntaje);
      puntajeInstrucciones.appendChild(instrucciones);

      puntajeInstrucciones.appendChild(control);
      contenedor.appendChild(tabla);
      contenedor.appendChild(avisos);
      contenedor.appendChild(puntajeInstrucciones);
      
      $("#crucigrama").append(contenedor);
    },
    dibujaAvisos: function(){
      $(".avisos").html("");
    },
    dibujaPanelControl: function(){
      try {
        $("#control").html("<span class='boton boton-recargar'><i class='icon-reload'></i> Recargar</span>");
        $("#control").click(function(){
          $("#crucigrama").html("");
          Crucigrama.init();
        });
      }
      catch(error){
        if (console && console.log) console.log(error);
      }
    },
    dibujaTabla: function(){
      $("#tabla").html("");
      var tabla = document.createElement("table");
      tabla.setAttribute("border", "0");
      tabla.setAttribute("cellspacing", "0");
      tabla.setAttribute("cellpadding", "0");
      for (var filas = 1; filas <= Crucigrama.dimensiones.alto; filas++){
        var fila = document.createElement("tr");
        for (var celdas = 1; celdas <= Crucigrama.dimensiones.ancho; celdas++){
          var celda = document.createElement("td");
          celda.setAttribute("id", "f" + filas + "_c" + celdas);
          if (Crucigrama.celdasInformativas[filas] && Crucigrama.celdasInformativas[filas][celdas]){
            celda.setAttribute("class", Crucigrama.celdasInformativas[filas][celdas].tipo);
          }
          else {
            var letra = document.createElement("input");
            letra.setAttribute("size", 1);
            letra.setAttribute("maxlength", 1);
            celda.appendChild(letra);
          }
          jQuery.data(celda, "posicion", {"fila":filas, "columna": celdas});

          fila.appendChild(celda);
        }
        tabla.appendChild(fila);
      }
      $("#tabla").append(tabla);
    },
    setPuntaje: function(){
      try {
        Crucigrama.cantTematicas = 0;
        Crucigrama.cantContenidos = 0;
        Crucigrama.cantTematicasOK = 0;
        Crucigrama.cantContenidosOK = 0;
    
        for (var filas = 1; filas <= Crucigrama.dimensiones.alto; filas++){
          for (var columnas = 1; columnas <= Crucigrama.dimensiones.ancho; columnas++){
            if (Crucigrama.celdasInformativas[filas] != undefined && Crucigrama.celdasInformativas[filas][columnas] != undefined) {
              var celda = Crucigrama.celdasInformativas[filas][columnas];
              if (celda.texto && celda.texto.arriba && celda.texto.arriba.pregunta) {
                (celda.texto.arriba.tipo && celda.texto.arriba.tipo == "tematica") ? Crucigrama.cantTematicas++ : Crucigrama.cantContenidos++;
              }
              if (celda.texto && celda.texto.abajo && celda.texto.abajo.pregunta) {
                (celda.texto.abajo.tipo && celda.texto.abajo.tipo == "tematica") ? Crucigrama.cantTematicas++ : Crucigrama.cantContenidos++;
              }
              if (celda.texto && celda.texto.derecha && celda.texto.derecha.pregunta) {
                (celda.texto.derecha.tipo && celda.texto.derecha.tipo == "tematica") ? Crucigrama.cantTematicas++ : Crucigrama.cantContenidos++;
              }
              if (celda.texto && celda.texto.izquierda && celda.texto.izquierda.pregunta) {
                (celda.texto.izquierda.tipo && celda.texto.izquierda.tipo == "tematica") ? Crucigrama.cantTematicas++ : Crucigrama.cantContenidos++;
              }
            }
          }
        }
      }
      catch(error){
        if (console && console.log) console.log(error);
      }
    },
    dibujaPanelPuntaje: function(){
      $("#puntaje").html("");
      var tabla = document.createElement("table");
      tabla.setAttribute("border", "0");
      tabla.setAttribute("cellspacing", "0");
      tabla.setAttribute("cellpadding", "0");
      
      var filaTitulo = document.createElement("tr");
      var celdaTitulo = document.createElement("td");
      celdaTitulo.innerHTML = "Puntaje";
      celdaTitulo.setAttribute("class", "section-title");
      filaTitulo.appendChild(celdaTitulo);
      
      var filaTematicas = document.createElement("tr");
      var celdaTematicas = document.createElement("td");
      celdaTematicas.setAttribute("id", "puntajeTematica");
      filaTematicas.innerHTML = Crucigrama.cantTematicasOK + " de " + Crucigrama.cantTematicas + " tem&aacute;ticas";
      filaTematicas.appendChild(celdaTematicas);
      
      var filaContenido = document.createElement("tr");
      var celdaContenido = document.createElement("td");
      celdaContenido.setAttribute("id", "puntajeContenido");
      filaContenido.innerHTML = Crucigrama.cantContenidosOK + " de " + Crucigrama.cantContenidos + " no tem&aacute;ticas";
      filaContenido.appendChild(celdaContenido);
      
      tabla.appendChild(filaTitulo);
      tabla.appendChild(filaTematicas);
      tabla.appendChild(filaContenido);
      $("#puntaje").append(tabla);

    },
    dibujaPanelInstrucciones: function(){
      $("#instrucciones").prepend("<h3 class='open-instrucciones'><i class='icon-help'></i> Instrucciones</h3>");
      $(".instrucciones-content").html(Crucigrama.instrucciones).hide();  
      $(".open-instrucciones").click(function() {
        $(".instrucciones-content").slideToggle();
      });    
    },
    setCeldasInformativas: function(){
      try {
        $('.contenido, .tematica').hover(function(){
          var dataObject = $(this).data();
          var celdaInformativa;
          
          if (Crucigrama.celdasInformativas[dataObject.posicion.fila] != undefined && Crucigrama.celdasInformativas[dataObject.posicion.fila][dataObject.posicion.columna] != undefined) {
            celdaInformativa = Crucigrama.celdasInformativas[dataObject.posicion.fila][dataObject.posicion.columna];

            var preguntas = {
              'arriba': celdaInformativa.texto.arriba ? celdaInformativa.texto.arriba.pregunta ? celdaInformativa.texto.arriba.pregunta : undefined : undefined,
              'abajo': celdaInformativa.texto.abajo ? celdaInformativa.texto.abajo.pregunta ? celdaInformativa.texto.abajo.pregunta : undefined : undefined,
              'derecha': celdaInformativa.texto.derecha ? celdaInformativa.texto.derecha.pregunta ? celdaInformativa.texto.derecha.pregunta : undefined: undefined,
              'izquierda': celdaInformativa.texto.izquierda ? celdaInformativa.texto.izquierda.pregunta ? celdaInformativa.texto.izquierda.pregunta : undefined : undefined,
            };

            var texto = ""; 

            for (posicion in preguntas) {
              if (preguntas[posicion] != undefined) {
                texto += "<span class='tooltip-direction'><i class='icon-" + posicion + "'></i> " + posicion + ":</span> " + preguntas[posicion] + "<br>";
              }
            }
            $('<p class="tooltip desktop-tooltip"></p>')
              .html(texto)
              .appendTo('body')
              .fadeIn();
          }
        }, function() {
          $('.tooltip').remove();
          $('.avisos').empty();
        }).mousemove(function(e) {
          var mousex = e.pageX + 10;
          var mousey = e.pageY + 20;
          $('.tooltip')
         	.css({ top: mousey, left: mousex });
        });
      }
      catch(error){
        if (console && console.log) console.log(error);
      }
    },
    init: function(){
      this.dibujaPaneles();
      this.dibujaTabla();
      this.dibujaAvisos();
      this.setCeldasInformativas();
      this.setPuntaje();
      this.dibujaPanelPuntaje();
      this.setEventoCeldaRespuestaKeyUp();
      this.setEventoCeldaRespuestaFlechas();
      this.dibujaPanelControl();
    }
  }

  $(document).ready(function(){
    Crucigrama.init();
  });
})(jQuery)
