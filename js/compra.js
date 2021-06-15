const compra = new Carrito();
const listaCompra = document.querySelector("#lista-compra tbody");
const carrito = document.getElementById('carrito');
const procesarCompraBtn = document.getElementById('procesar-compra');
const cliente = document.getElementById('cliente');
const correo = document.getElementById('correo');


cargarEventos();

function cargarEventos() {
   
    document.addEventListener('DOMContentLoaded', compra.leerLocalStorageCompra());

    //Eliminar productos del carrito
    carrito.addEventListener('click', (e) => { compra.eliminarProducto(e) });

    compra.calcularTotal();

    //cuando se selecciona procesar Compra
    //procesarCompraBtn.addEventListener('click', procesarCompra);
    procesarCompraBtn.addEventListener('click', (e)=>{compra.procesarCompra(e)});

    carrito.addEventListener('change', (e) => { compra.obtenerEvento(e) });
    carrito.addEventListener('keyup', (e) => { compra.obtenerEvento(e) });
  
}

let x = $(document);
x.ready(inicializarEventos);

function inicializarEventos() {
  let x = $("#boton3");
   x.click(mostrarRecuadro);
}
function mostrarRecuadro() {
  let x = $("#carrito");
  x.toggle("slow");
}