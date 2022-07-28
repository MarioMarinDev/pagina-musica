// Variables principales
const uri = "https://raw.githubusercontent.com/MarioMarinDev/pagina-musica-api/master/";
const el_play_pause = document.querySelector("#player .play-pause");
const el_volumen = document.querySelector("#player .volumen");
const top_contenedor = document.querySelectorAll("#top-contenedor .top");
const top_contenedores = top_contenedor.length;
const audio = document.getElementById("audio");
const source = document.querySelector("#audio source");
const reproductor = document.getElementById("player");
const canciones_max = 6;
let posicion_actual = 0;

// Obtener una canción por su posición
function obtener_cancion(posicion) {
  return fetch(uri + "canciones.json").then(function(respuesta) {
    return respuesta.json();
  }).then(function(datos) {
    return datos[posicion];
  }).catch(function(error) {
    console.log(error);
  });
}

// Mostrar las 3 canciones actuales
function mostrar_actuales() {
  for(let i = 0; i < top_contenedores; i++) {
    obtener_cancion(posicion_actual + i).then(function(datos) {
      // Obtener imagen de base de datos y asignar
      let el_imagen = top_contenedor[i].querySelector("img");
      el_imagen.src = uri + datos.imagen;
      // Obtener audio y guardarlo en un atributo
      el_imagen.setAttribute("data-audio", datos.audio);
      // Crear evento al dar clic a la imagen
      el_imagen.addEventListener("click", function() {
        // Activar botón de reproducir/pausar
        el_play_pause.classList.remove("desactivado");
        // Actualizar información del reproductor
        actualizar_reproductor(datos.imagen, datos.nombre, datos.artista);
        // Cambiar de audio
        source.src = uri + datos.audio;
        audio.load();
        audio.play();
      });
      // Obtener posición de base de datos y asignar
      let el_numero = top_contenedor[i].querySelector(".numero");
      el_numero.innerHTML = i + 1 + posicion_actual;
      // Obtener nombre de canción de BD y asignar
      let el_nombre = top_contenedor[i].querySelector(".nombre");
      el_nombre.innerHTML = datos.nombre;
      // Obtener artista 1 de BD y asignar
      let el_artista = top_contenedor[i].querySelector(".artista");
      el_artista.innerHTML = datos.artista;
      // Checar si existe artista 2 y en caso de existir asignar
      if(datos.artista2 != undefined) {
        el_artista.innerHTML += " y " + datos.artista2;
      }
    });
  }
}

function actualizar_reproductor(imagen, cancion, autor) {
  // Asignar nueva imagen al reproductor
  let el_imagen = reproductor.querySelector("img");
  el_imagen.src = uri + imagen;
  // Asignar datos de texto
  let el_cancion = reproductor.querySelector(".cancion");
  el_cancion.innerHTML = cancion;
  let el_autor = reproductor.querySelector(".autor");
  el_autor.innerHTML = autor;
}

// Mostrar al inicio información
mostrar_actuales();

// Encontrar elementos de navegación
const el_siguiente = document.querySelector("h1 button:last-child");
const el_anterior = document.querySelector("h1 button:first-child");

// Agregar eventos para cambiar de posición actual
el_siguiente.addEventListener("click", function() {
  // Checar si el botón está desactivado
  if(el_siguiente.classList.contains("desactivado")) {
    // No hacer nada
    return;
  }
  // Cambiar posición actual y mostrar nuevos resultados
  posicion_actual++;
  mostrar_actuales();
  // Checar si ya no hay más canciones
  if(posicion_actual + top_contenedores >= canciones_max) {
    // Agregar clase de desactivado
    el_siguiente.classList.add("desactivado");
  }
  // Activar el botón de anterior
  el_anterior.classList.remove("desactivado");
});

el_anterior.addEventListener("click", function() {
  // Checar si el botón está desactivado
  if(el_anterior.classList.contains("desactivado")) {
    // No hacer nada
    return;
  }
  // Cambiar posición actual y mostrar nuevos resultados
  posicion_actual--;
  mostrar_actuales();
  // Checar si ya se está mostrando el número 1
  if(posicion_actual <= 0) {
    // Agregar clase de desactivado
    el_anterior.classList.add("desactivado");
  }
  // Activar el botón de siguiente
  el_siguiente.classList.remove("desactivado");
});

// Eventos del reproductor
el_play_pause.addEventListener("click", function() {
  if(audio.paused) {
    audio.play();
  } else {
    audio.pause();
  }
});

el_volumen.addEventListener("change", function() {
  audio.volume = el_volumen.value / 100;
});
