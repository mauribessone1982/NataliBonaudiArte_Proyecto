class Carrito{
    //Añadir producto al carrito
    comprarProducto(e){
        e.preventDefault();
        //Delegado para agregar al carrito
        if(e.target.classList.contains('agregar-carrito')){
            const producto = e.target.parentElement.parentElement;
            //Enviamos el producto seleccionado para tomar sus datos
            this.leerDatosProducto(producto);
           // console.log(producto);
        }
    }


    //Leer datos del producto
    leerDatosProducto(producto){
        const infoProducto = {
            imagen : producto.querySelector('img').src,
            titulo: producto.querySelector('h4').textContent,
            precio: producto.querySelector('.precio span').textContent,
            id: producto.querySelector('a').getAttribute('data-id'),
            cantidad: 1
        }
        let productosLS;
        productosLS = this.obtenerProductosLocalStorage();
        productosLS.forEach(function (productoLS){
            if(productoLS.id === infoProducto.id){
                productosLS = productoLS.id;
            }
        });

        if(productosLS === infoProducto.id){
            //alerta
            Swal.fire({
                type: 'info',
                title: 'Atención!...',
                text: 'El producto ya está agregado',
                showConfirmButton: false,
                timer: 1000
            })
           //console.log("El producto ya esta agregado");
        }
        else {
            this.insertarCarrito(infoProducto);
        }
    }
    //muestra producto seleccionado en carrito
    insertarCarrito(producto){
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src="${producto.imagen}" width=100>
            </td>
            <td>${producto.titulo}</td>
            <td>${producto.precio}</td>
            <td>
                <a href="#" class="borrar-producto fas fa-times-circle" data-id="${producto.id}"></a>
            </td>
        `;
        listaProductos.appendChild(row);
        this.guardarProductosLocalStorage(producto);
    }
     //Eliminar el producto del carrito en el DOM
     eliminarProducto(e){
        e.preventDefault();
        let producto, productoID;
        if(e.target.classList.contains('borrar-producto')){
            e.target.parentElement.parentElement.remove();
            producto = e.target.parentElement.parentElement;
            productoID = producto.querySelector('a').getAttribute('data-id');
        }
        this.eliminarProductoLocalStorage(productoID);
        this.calcularTotal();
    }

     //Elimina todos los productos
     vaciarCarrito(e){
        e.preventDefault();
        while(listaProductos.firstChild){
            listaProductos.removeChild(listaProductos.firstChild);
        }
        this.vaciarLocalStorage();

        return false;
    }

    guardarProductosLocalStorage(producto){
        let productos;
        productos = this.obtenerProductosLocalStorage();
        productos.push(producto);
        localStorage.setItem('productos', JSON.stringify(productos));
    }

    //Comprobar que hay elementos en el LS
    obtenerProductosLocalStorage(){
        let productoLS;

        if(localStorage.getItem('productos') === null){
            productoLS = [];
        }
        else {
            productoLS = JSON.parse(localStorage.getItem('productos'));
        }
        return productoLS;
    }

     //Mostrar los productos guardados en el LS
     leerLocalStorage(){
        let productosLS;
        productosLS = this.obtenerProductosLocalStorage();
        productosLS.forEach(function (producto){
            //Construir plantilla
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>
                    <img src="${producto.imagen}" width=100>
                </td>
                <td>${producto.titulo}</td>
                <td>${producto.precio}</td>
                <td>
                    <a href="#" class="borrar-producto fas fa-times-circle" data-id="${producto.id}"></a>
                </td>
            `;
            listaProductos.appendChild(row);
        });
    }

    //Mostrar los productos guardados en el LS en compra.html
    leerLocalStorageCompra(){
        let productosLS;
        productosLS = this.obtenerProductosLocalStorage();
        productosLS.forEach(function (producto){
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>
                    <img src="${producto.imagen}" width=100>
                </td>
                <td>${producto.titulo}</td>
                <td>${producto.precio}</td>
                <td>
                    <input type="number" class="form-control cantidad" min="1" value=${producto.cantidad}>
                </td>
                <td id='subtotales'>${producto.precio * producto.cantidad}</td>
                <td>
                    <a href="#" class="borrar-producto fas fa-times-circle" style="font-size:30px" data-id="${producto.id}"></a>
                </td>
            `;
            listaCompra.appendChild(row);
        });
    }

    //Eliminar producto por ID del LS
    eliminarProductoLocalStorage(productoID){
        let productosLS;
        productosLS = this.obtenerProductosLocalStorage();
        productosLS.forEach(function(productoLS, index){
            if(productoLS.id === productoID){
                productosLS.splice(index, 1);
            }
        });

        localStorage.setItem('productos', JSON.stringify(productosLS));
    }

     //Eliminar todos los datos del LS
    vaciarLocalStorage(){
            localStorage.clear();
    }    
    //Procesar pedido
    procesarPedido(e){
        e.preventDefault();

        if(this.obtenerProductosLocalStorage().length === 0){
            Swal.fire({
                type: 'error',
                title: 'Atención!...',
                text: 'El carrito está vacío, agrega algún producto',
                showConfirmButton: false,
                timer: 2000
            })
        }
        else {
            location.href = "compra.html";
        }
    }
    //Calcular montos
    calcularTotal(){
        let productosLS;
        let total = 0, igv = 0, subtotal = 0;
        if(this.obtenerProductosLocalStorage().length != 0){
            productosLS = this.obtenerProductosLocalStorage();
            for(let i = 0; i < productosLS.length; i++){
                let element = Number(productosLS[i].precio * productosLS[i].cantidad);
                total = total + element;
                
            }
        }
            igv = parseFloat(total * 0.21).toFixed(2);
            subtotal = parseFloat(total-igv).toFixed(2);
         
            document.getElementById('subtotal').innerHTML = "$. " + subtotal;
           document.getElementById('igv').innerHTML = "$. " + igv;
            document.getElementById('total').innerHTML = "$. " + total.toFixed(2);
       
        
       
    }

    obtenerEvento(e) {
        e.preventDefault();
        let id, cantidad, producto, productosLS;
        if (e.target.classList.contains('cantidad')) {
            producto = e.target.parentElement.parentElement;
            id = producto.querySelector('a').getAttribute('data-id');
            cantidad = producto.querySelector('input').value;
            let actualizarMontos = document.querySelectorAll('#subtotales');
            productosLS = this.obtenerProductosLocalStorage();
            productosLS.forEach(function (productoLS, index) {
                if (productoLS.id === id) {
                    productoLS.cantidad = cantidad;                    
                    actualizarMontos[index].innerHTML = Number(cantidad * productosLS[index].precio);
                }    
            });
            localStorage.setItem('productos', JSON.stringify(productosLS));
            
        }
        else {
            console.log("click afuera");
        }
    }

   
    procesarCompra(e){
                         
            const emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
            //Se muestra un texto a modo de ejemplo, luego va a ser un icono
            




           //e.preventDefault();
        if(this.obtenerProductosLocalStorage().length === 0){
            e.preventDefault();
            Swal.fire({
                type: 'error',
                title: 'Atención!...',
                text: 'El carrito está vacío, agrega algún producto',
                showConfirmButton: false,
                timer: 2000
            })
        }
        else if (destinatario.value === '' || cc_to.value === '') {
            e.preventDefault();
            Swal.fire({
                type: 'error',
                title: 'Oops...',
                text: 'Ingrese todos los campos requeridos',
                showConfirmButton: false,
                timer: 2000
            })
        }else {

            if (emailRegex.test(cc_to.value)) {
                (function(){
                    emailjs.init('user_cWna7J1n4tATVykG7BVQ5')
                   })();
                 
                    const btn = document.getElementById('procesar-compra');
        
                    document.getElementById('procesar-pago')
                    .addEventListener('submit', function(event) {
                        event.preventDefault();
                
                        btn.value = 'Enviando...';
                
                        const serviceID = 'default_service';
                        const templateID = 'template_gxss7oo';
        
                        const cargandoGif = document.querySelector('#cargando');
                        cargandoGif.style.display = 'block';
        
                        const enviado = document.createElement('img');
                        enviado.src = '../img/mail.gif';
                        enviado.style.display = 'block';
                        enviado.width = '150';
                
                        emailjs.sendForm(serviceID, templateID, this)
                            .then(() => {
                                cargandoGif.style.display = 'none';
                                document.querySelector('#loaders').appendChild(enviado);
        
                                setTimeout(() => {
                                    enviado.remove();
                                    compra.vaciarLocalStorage();
                                    window.location = "../index.html";
                                }, 2000);
                            }, (err) => {
                            btn.value = 'Error al enviar el  Email';
                            alert(JSON.stringify(err));
                            });
                    });
              } else {
                e.preventDefault();
                   Swal.fire({
                    type: 'error',
                    title: 'Oops...',
                    text: ' El Mail es Invalido',
                    showConfirmButton: false,
                    timer: 2000
                })
              }

          
            

       }
    }

    

      

}

