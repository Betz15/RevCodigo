// formulario.js
//cambie todas las var por const 
// Seleccionamos el formulario por su id "form"
const formulario = document.querySelector("#form");

formulario.onsubmit = function (event) {
  event.preventDefault(); // corregido: evitar que el formulario se envíe y recargue la página

  // Obtenemos los inputs y select del formulario
  const nombreInput = formulario.elements["name"];
  const edadInput = formulario.elements["age"];
  const nacionalidadSelect = formulario.elements["nationality"];

  const nombre = nombreInput.value; 
  const edad = Number(edadInput.value); // Convertir a número
  const nacionalidadCode = nacionalidadSelect.value;

  // Limpiar clases de error previas
  nombreInput.classList.remove("error");
  edadInput.classList.remove("error");

  let formularioValido = true;

  // Validaciones:
  if (nombre.length === 0) {
    nombreInput.classList.add("error");
    formularioValido = false;
  }

  if (isNaN(edad) || edad < 18 || edad > 120) {
    edadInput.classList.add("error");
    formularioValido = false;
  }

  if (formularioValido) {
    agregarInvitado(nombre, edad, nacionalidadCode);
    // Limpiar formulario después de agregar invitado
    formulario.reset();
  }
};

// Función para agregar invitado a la lista
function agregarInvitado(nombre, edad, nacionalidad) {
  // Traducir código nacionalidad a texto completo
  const nacionalidades = {
    ar: "Argentina",
    mx: "Mexicana",
    vnzl: "Venezolana",
    per: "Peruana",
  };

  const nacionalidadTexto = nacionalidades[nacionalidad] || "Desconocida";

  // Seleccionar el contenedor donde se agregan los invitados
  const lista = document.getElementById("lista-de-invitados");

  // Crear div contenedor para un invitado
  const elementoLista = document.createElement("div");
  elementoLista.classList.add("elemento-lista");

  // Función auxiliar para crear un campo con descripción y valor
  function crearElemento(descripcion, valor) {
    const span = document.createElement("span");
    const input = document.createElement("input");
    const br = document.createElement("br");

    span.textContent = descripcion + ": ";
    input.value = valor;
    input.readOnly = true; // para que no se pueda editar directamente

    elementoLista.appendChild(span);
    elementoLista.appendChild(input);
    elementoLista.appendChild(br);
  }

  // Crear los campos de invitado
  crearElemento("Nombre", nombre);
  crearElemento("Edad", edad);
  crearElemento("Nacionalidad", nacionalidadTexto);

  // Crear botón para eliminar invitado
  const botonBorrar = document.createElement("button");
  botonBorrar.textContent = "Eliminar invitado";
  botonBorrar.type = "button"; // para evitar submit accidental
  botonBorrar.onclick = function () {
    // Eliminar el contenedor del invitado al hacer click
    elementoLista.remove();
  };

  elementoLista.appendChild(botonBorrar);

  // Finalmente agregar el invitado al contenedor de la lista
  lista.appendChild(elementoLista);
}
