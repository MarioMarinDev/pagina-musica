// Variables principales
const uri = "https://raw.githubusercontent.com/LAL0YT/API-Top-10/master/";
const top_contenedor = document.querySelectorAll("#top-contenedor .top");
const top_contenedores = top_contenedor.length;
const canciones_max = 10;
let posicion_actual = 1;

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
      // Obtener posición de base de datos y asignar
      let el_numero = top_contenedor[i].querySelector(".numero");
      el_numero.innerHTML = datos.posicion;
      // Obtener nombre de canción de BD y asignar
      let el_nombre = top_contenedor[i].querySelector(".nombre");
      el_nombre.innerHTML = datos.nombre;
      // Obtener artista 1 de BD y asignar
      let el_artista = top_contenedor[i].querySelector(".artista");
      el_artista.innerHTML = datos.artista1;
      // Checar si existe artista 2 y en caso de existir asignar
      if(datos.artista2 != undefined) {
        el_artista.innerHTML += " y " + datos.artista2;
      }
      // Obtener número de vistas y asignar
      let el_vistas = top_contenedor[i].querySelector(".vistas");
      el_vistas.innerHTML = datos.visitas + "M vistas";
    });
  }
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
  if(posicion_actual + top_contenedores > canciones_max) {
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
  if(posicion_actual <= 1) {
    // Agregar clase de desactivado
    el_anterior.classList.add("desactivado");
  }
  // Activar el botón de siguiente
  el_siguiente.classList.remove("desactivado");
});