//Variables
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito = [];

cargarEventListeners();
function cargarEventListeners(){
    // Cuando agregas un curso presionando "Agregar al Carrito"
    listaCursos.addEventListener('click', agregarCurso);
}

// Funciones
function agregarCurso(e){
    e.preventDefault();

    if(e.target.classList.contains('agregar-carrito')) {
        const curso = e.target.parentElement.parentElement;
        // Enviamos el curso seleccionado para tomar sus datos
        leerDatosCurso(curso);
   }
}

// Lee los datos del curso
function leerDatosCurso(curso) {

     // Crear un objeto con el contenido del curso actual.
     const infoCurso = {
         imagen: curso.querySelector('img').src,
         titulo: curso.querySelector('h4').textContent,
         precio: curso.querySelector('.precio span').textContent,
         id: curso.querySelector('a').getAttribute('data-id'), 
         cantidad: 1
    }

    // Agrega elementos al arrego de carrito.

    if( articulosCarrito.some( curso => curso.id === infoCurso.id ) ) { 
         const cursos = articulosCarrito.map( curso => {
              if( curso.id === infoCurso.id ) {
                   curso.cantidad++;
                    return curso;
               } else {
                    return curso;
            }
         })
         articulosCarrito = [...cursos];
    }  else {
         articulosCarrito = [...articulosCarrito, infoCurso];
    }

    // console.log(articulosCarrito)

    // console.log(articulosCarrito)
    carritoHTML();
}

// Muestra el carrito de compras en el HTML
function carritoHTML(){

     //Limpiar el HTML
     LimpiarHTML();

     // Recorre el carrito y genera HTML.
     articulosCarrito.forEach( curso => {
          const row = document.createElement('tr');
          row.innerHTML = `
               <td>  
                    <img src="${curso.imagen}" width=100>
               </td>
               <td>${curso.titulo}</td>
               <td>${curso.precio}</td>
               <td>${curso.cantidad} </td>
               <td>
                    <a href="#" class="borrar-curso" data-id="${curso.id}">X</a>
               </td>
          `;

          // Agrega el HTML del carrito en el tbody
          contenedorCarrito.appendChild(row);
     })
}

//Elimina los cursos del tbody.
function LimpiarHTML() {
     // Forma lenta
     //contenedorCarrito.innerHTML = '';

     while (contenedorCarrito.firstChild){
          contenedorCarrito.removeChild(contenedorCarrito.firstChild);
     }
}