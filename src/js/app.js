let pagina = 1;

document.addEventListener("DOMContentLoaded", () => {
  inicarApp();
});

function inicarApp() {
  MostrarServicios();

  // Resalta el div actual segun el tab al que se presiona

  // oculta o muestra la seccion segun el tab seleccionado
  cambiarSeccion();
}

function cambiarSeccion() {
  const enlaces = document.querySelectorAll(".tabs button");
  enlaces.forEach((enlace) => {
    enlace.addEventListener("click", (e) => {
      e.preventDefault();
      pagina = parseInt(e.target.dataset.paso);
      const seccion = document.querySelector(`#paso-${pagina}`);
      if (seccion.classList.contains("mostrar-seccion")) {
        seccion.classList.remove("mostrar-seccion");
      } else {
        seccion.classList.add("mostrar-seccion");
      }
    });
  });
}

async function MostrarServicios() {
  // Consulta de fech a archivo servicios.json
  try {
    const resultado = await fetch("./servicios.json");
    const db = await resultado.json();
    const { servicios } = db;

    // Generar el HTML
    servicios.forEach((servicio) => {
      const { id, nombre, precio } = servicio;

      // DOM Scripting
      // Generando nombre del servicio
      const nombreServicio = document.createElement("P");
      nombreServicio.textContent = nombre;
      nombreServicio.classList.add("nombre-servicio");

      // Generar Precio del servicio
      const precioServicio = document.createElement("P");
      precioServicio.textContent = `$ ${precio}`;
      precioServicio.classList.add("precio-servicio");

      // Generar el div
      const servicioDiv = document.createElement("DIV");
      servicioDiv.classList.add("servicio");
      servicioDiv.dataset.idServicio = id;

      // Agregar Precion y Nombre a el DIV_SERVICIO
      servicioDiv.appendChild(nombreServicio);
      servicioDiv.appendChild(precioServicio);

      // Selecion de servicio para la cita
      servicioDiv.onclick = seleccionarServicio;

      // Agregando Al DIV del DOM
      document.querySelector("#servicios").appendChild(servicioDiv);
    });
  } catch (error) {
    console.log(error);
  }
}

function seleccionarServicio(e) {
  // Forzar el elemento al que damos click sea el DIV
  let elemento;
  if (e.target.tagName === "P") {
    elemento = e.target.parentElement;
  } else {
    elemento = e.target;
  }

  if (elemento.classList.contains("seleccionado")) {
    elemento.classList.remove("seleccionado");
  } else {
    elemento.classList.add("seleccionado");
  }
}
