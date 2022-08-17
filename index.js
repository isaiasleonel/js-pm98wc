// Import stylesheets
import './style.css';
('use strict');

let registros = [];
let registrado = false;
let form = document.querySelector('#form_registro');
let btnSortear = document.querySelector('#btn_sortear');
let avisoGanador = document.querySelector('#aviso_ganador');
let listaSorteo = document.querySelector('#lista_sorteo');
btnSortear.addEventListener('click', sortear);

form.addEventListener('submit', agregar);

function agregar(e) {
  e.preventDefault();
  let formData = new FormData(form);
  let nombre = formData.get('nombre');
  let dni = Number(formData.get('dni'));
  let edad = Number(formData.get('edad'));

  for (const item of registros) {
    if (item.dni === dni) {
      registrado = true;
      console.log(registrado + ' es igual');
    }
  }
  if (!registrado && 18 < dni) {
    let registro = {
      nombre: nombre,
      dni: dni,
      edad: edad,
    };
    registros.push(registro);
    console.log(registros + ' ebtre');
  } else if (nombre === '') {
    alert('inserte datos');
  } else {
    alert('No se puede registrar');
  }

  mostrarListado();
  console.log(registros);
}

function sortear() {
  // variable ramdom
  let indexGanador = Math.floor(registros.length * Math.random());
  console.log(indexGanador);

  // mensaje ganador
  avisoGanador.innerHTML = '<p>PowEnergy  - Beber con moderación</p>';
  avisoGanador.innerHTML += `<p>El ganador es:  ${registros[indexGanador].nombre}  con dni ${registros[indexGanador].dni} y edad de ${registros[indexGanador].edad} </p>`;

  // condicion
  if (registros[indexGanador].edad < 21) {
    avisoGanador.innerHTML +=
      '<p>Para retirar el premio el ganador debe ir acompañado de un mayor de 21 años</p>';
    avisoGanador.classList.remove('mayor');
    avisoGanador.classList.add('menor');
  } else {
    avisoGanador.classList.remove('menor');
    avisoGanador.classList.add('mayor');
  }

  mostrarListado();
}
// mostrarListado();
function mostrarListado() {
  listaSorteo.innerHTML = '';
  for (const item of registros) {
    listaSorteo.innerHTML += `<li> ${item.nombre} dni ${item.dni}</li>`;
  }
}
