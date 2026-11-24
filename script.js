// Buscamos los elementos de la simulación en el HTML.
const ambiente = document.getElementById("ambiente");
const lampara = document.getElementById("lampara");
const estado = document.getElementById("estado");
const explicacion = document.getElementById("explicacion");
const simulador = document.querySelector(".simulador");

// Esta función representa la regla del controlador.
function actualizarLampara() {
  const estaOscuro = ambiente.value === "noche";
simulador.classList.toggle("es-de-noche", estaOscuro);
simulador.classList.toggle("es-de-dia", !estaOscuro);

  // Agrega o quita el estilo de lámpara encendida.
  lampara.classList.toggle("encendida", estaOscuro);

  if (estaOscuro) {
    estado.textContent = "Lámpara encendida";

    explicacion.textContent =
      "Hay oscuridad. El sensor simulado informa al controlador " +
      "y este ordena encender la lámpara.";
  } else {
    estado.textContent = "Lámpara apagada";

    explicacion.textContent =
      "Hay suficiente luz. El controlador mantiene " +
      "la lámpara apagada.";
  }
}

// Ejecutamos la función cuando cambia la selección.
ambiente.addEventListener("change", actualizarLampara);

// Mostramos el estado correcto al abrir la página.
actualizarLampara();


// Buscamos el formulario y el espacio para mostrar la nota.
const formulario = document.getElementById("formulario-quiz");
const resultado = document.getElementById("resultado");

// Guardamos las respuestas correctas y sus explicaciones.
const soluciones = [
  {
    pregunta: "p1",
    respuesta: "a",
    explicacion: "IoT significa Internet de las cosas."
  },
  {
    pregunta: "p2",
    respuesta: "b",
    explicacion: "El sensor detecta la iluminación del entorno."
  },
  {
    pregunta: "p3",
    respuesta: "a",
    explicacion:
      "El controlador procesa información y ejecuta instrucciones."
  },
  {
    pregunta: "p4",
    respuesta: "b",
    explicacion:
      "El motor es un actuador porque produce movimiento."
  },
  {
    pregunta: "p5",
    respuesta: "b",
    explicacion:
      "Un sistema automático puede funcionar sin internet."
  }
];

formulario.addEventListener("submit", function (evento) {
  // Evita que el navegador recargue la página.
  evento.preventDefault();

  // Lee las respuestas seleccionadas.
  const respuestas = new FormData(formulario);

  let puntaje = 0;
  const comentarios = [];

  // Revisamos una por una las cinco preguntas.
  soluciones.forEach(function (solucion, indice) {
    const acierto =
      respuestas.get(solucion.pregunta) === solucion.respuesta;

    if (acierto) {
      puntaje = puntaje + 1;
    }

    const mensaje = acierto ? "Correcta" : "Por revisar";

    comentarios.push(
      "<li>Pregunta " + (indice + 1) + ": " + mensaje +
      ". " + solucion.explicacion + "</li>"
    );
  });

  // Mostramos la nota y explicamos cada respuesta.
  resultado.innerHTML =
    "<h3>Obtuviste " + puntaje + " de 5 puntos</h3>" +
    "<ul>" + comentarios.join("") + "</ul>";
});

// Borra el resultado cuando se reinicia el cuestionario.
formulario.addEventListener("reset", function () {
  resultado.textContent = "";
});
// ========================================
// LABORATORIO DE ILUMINACIÓN
// ========================================

const nivelLuz = document.getElementById("nivel-luz");
const valorLuz = document.getElementById("valor-luz");
const habitacionLab = document.getElementById("habitacion");
const bombilloLab = document.getElementById("bombillo-lab");
const mensajeLuz = document.getElementById("mensaje-luz");
const fallaSensor = document.getElementById("falla-sensor");
const fallaActuador = document.getElementById("falla-actuador");

function actualizarLaboratorioLuz() {
  const nivel = Number(nivelLuz.value);
  const oscuro = nivel < 40;

  valorLuz.textContent = nivel + " %";
  habitacionLab.classList.toggle("oscura", oscuro);

  // Regla del ejemplo: con el sensor desconectado,
  // el controlador no ordena encender.
  const ordenEncender = oscuro && !fallaSensor.checked;

  // La lámpara solo funciona si no está dañada.
  const encendida = ordenEncender && !fallaActuador.checked;

  bombilloLab.classList.toggle("activo", encendida);

  if (fallaSensor.checked) {
    mensajeLuz.textContent =
      "Sensor desconectado: no hay medición. " +
      "En este ejemplo, el controlador deja la lámpara apagada.";

    if (fallaActuador.checked) {
      mensajeLuz.textContent += " La lámpara también está dañada.";
    }
  } else if (fallaActuador.checked) {
    mensajeLuz.textContent = oscuro
      ? "El sensor detecta oscuridad y el controlador ordena " +
        "encender, pero la lámpara dañada no responde."
      : "Hay suficiente luz: no se ordena encender. " +
        "La lámpara está dañada; baja la iluminación " +
        "para comprobar su efecto.";
  } else if (encendida) {
    mensajeLuz.textContent =
      "Iluminación menor al 40 %: el controlador " +
      "ordena encender la lámpara.";
  } else {
    mensajeLuz.textContent =
      "Iluminación del 40 % o superior: " +
      "la lámpara permanece apagada.";
  }
}

nivelLuz.addEventListener("input", actualizarLaboratorioLuz);
fallaSensor.addEventListener("change", actualizarLaboratorioLuz);
fallaActuador.addEventListener("change", actualizarLaboratorioLuz);

actualizarLaboratorioLuz();


// ========================================
// LABORATORIO DE TEMPERATURA
// ========================================

const temperaturaLab = document.getElementById("temperatura");
const valorTemperatura = document.getElementById("valor-temperatura");
const aspasLab = document.getElementById("aspas");
const mensajeTemperatura =
  document.getElementById("mensaje-temperatura");

function actualizarVentilador() {
  const temperatura = Number(temperaturaLab.value);
  const encendido = temperatura > 28;

  valorTemperatura.textContent = temperatura + " °C";
  aspasLab.classList.toggle("girando", encendido);

  mensajeTemperatura.textContent = encendido
    ? "Temperatura superior a 28 °C: ventilador encendido."
    : "Temperatura de 28 °C o menor: ventilador apagado.";
}

temperaturaLab.addEventListener("input", actualizarVentilador);

actualizarVentilador();


// ========================================
// JUEGO DE COMPONENTES
// ========================================

const retosComponentes = [
  {
    nombre: "Sensor de luz",
    descripcion: "Detecta la iluminación del entorno.",
    tipo: "sensor",
    explicacion: "Es un sensor porque detecta una condición."
  },
  {
    nombre: "Motor de una puerta",
    descripcion: "Produce el movimiento para abrir la puerta.",
    tipo: "actuador",
    explicacion: "Es un actuador porque realiza una acción física."
  },
  {
    nombre: "Microcontrolador programado",
    descripcion: "Lee una medición y aplica una regla.",
    tipo: "controlador",
    explicacion: "Es un controlador porque procesa la información."
  },
  {
    nombre: "Sensor de temperatura",
    descripcion: "Mide la temperatura del entorno.",
    tipo: "sensor",
    explicacion: "Es un sensor porque mide una variable."
  },
  {
    nombre: "Lámpara",
    descripcion: "Produce luz cuando recibe la orden de encender.",
    tipo: "actuador",
    explicacion: "Es un actuador porque ejecuta la acción de iluminar."
  }
];

const objetoJuego = document.getElementById("objeto-juego");
const descripcionJuego =
  document.getElementById("descripcion-juego");
const progresoJuego = document.getElementById("progreso-juego");
const barraJuego = document.getElementById("barra-juego");
const respuestaJuego = document.getElementById("respuesta-juego");
const opcionesJuego = document.getElementById("opciones-juego");
const botonesJuego = document.querySelectorAll("[data-tipo]");
const siguienteJuego = document.getElementById("siguiente-juego");
const reiniciarJuego = document.getElementById("reiniciar-juego");

let indiceReto = 0;
let puntosJuego = 0;
let retoRespondido = false;

function mostrarReto() {
  const reto = retosComponentes[indiceReto];

  objetoJuego.textContent = reto.nombre;
  descripcionJuego.textContent = reto.descripcion;
  progresoJuego.textContent =
    "Reto " + (indiceReto + 1) + " de " + retosComponentes.length;

  respuestaJuego.textContent = "";
  siguienteJuego.hidden = true;
  opcionesJuego.hidden = false;
  retoRespondido = false;

  botonesJuego.forEach(function (boton) {
    boton.disabled = false;
  });
}

botonesJuego.forEach(function (boton) {
  boton.addEventListener("click", function () {
    // Solo permite una respuesta por reto.
    if (retoRespondido) {
      return;
    }

    retoRespondido = true;

    const reto = retosComponentes[indiceReto];
    const acierto = boton.dataset.tipo === reto.tipo;

    if (acierto) {
      puntosJuego = puntosJuego + 1;
    }

    respuestaJuego.textContent =
      (acierto ? "¡Correcto! " : "Revisa esta idea: ") +
      reto.explicacion;

    barraJuego.value = indiceReto + 1;

    botonesJuego.forEach(function (opcion) {
      opcion.disabled = true;
    });

    siguienteJuego.textContent =
      indiceReto === retosComponentes.length - 1
        ? "Ver resultado"
        : "Siguiente reto";

    siguienteJuego.hidden = false;
  });
});

siguienteJuego.addEventListener("click", function () {
  indiceReto = indiceReto + 1;

  if (indiceReto < retosComponentes.length) {
    mostrarReto();
  } else {
    objetoJuego.textContent = "¡Terminaste el juego!";
    descripcionJuego.textContent =
      "Obtuviste " + puntosJuego + " de " +
      retosComponentes.length + " puntos.";

    progresoJuego.textContent = "Cinco retos completados";
    respuestaJuego.textContent =
      "Puedes reiniciar para practicar nuevamente.";

    opcionesJuego.hidden = true;
    siguienteJuego.hidden = true;
  }
});

reiniciarJuego.addEventListener("click", function () {
  indiceReto = 0;
  puntosJuego = 0;
  barraJuego.value = 0;
  mostrarReto();
});

mostrarReto();

// Exporta el formulario para enviarlo al estudiante fuera del sitio.
const formularioOpinion = document.getElementById("formulario-opinion");
const estadoOpinion = document.getElementById("estado-opinion");

formularioOpinion.addEventListener("submit", function (evento) {
  evento.preventDefault();

  const datos = new FormData(formularioOpinion);
  const texto = [
    "Opinión | Del sensor a la acción",
    "Fecha: " + new Date().toLocaleDateString("es-CO"),
    "Claridad del contenido: " + datos.get("contenido"),
    "Legibilidad del diseño: " + datos.get("diseno"),
    "Facilidad de navegación: " + datos.get("navegacion"),
    "Funcionamiento: " + datos.get("interactividad"),
    "Sugerencia: " + (datos.get("sugerencia").trim() || "(sin comentario)")
  ].join("\n");

  const archivo = new Blob([texto], { type: "text/plain;charset=utf-8" });
  const direccion = URL.createObjectURL(archivo);
  const enlace = document.createElement("a");
  enlace.href = direccion;
  enlace.download = "opinion-del-sensor-a-la-accion.txt";
  document.body.appendChild(enlace);
  enlace.click();
  enlace.remove();
  setTimeout(function () {
    URL.revokeObjectURL(direccion);
  }, 1000);
  estadoOpinion.textContent =
    "Comparte el archivo de opinión descargado con el estudiante.";
});
