let productosSuper = []

let carrito = []


function aplicarTitulo(){
 
    const title = document.querySelector("#titulo_principal");
    title.textContent = 'La despensa de casa';
    title.classList.add('changeh1')
}

function bienvenida(a,b,c){
    const parrafo = document.querySelector(a);
    parrafo.textContent = b
    parrafo.classList.add(c)
}

setTimeout(aplicarTitulo,1000);

setTimeout(function(){
    bienvenida ('#mensaje_bienvenida','"Donde cada compra es una experiencia única."','mensaje_bienvenida')
},1500);

setTimeout(function(){
 bienvenida('#parrafo_bienvenida','"Tu mercado de confianza, calidad y ahorro en cada click...','mensaje_bienvenida')
},2500);


async function traerProductos () {
    const response = await fetch('../productos/productos.json');

    if (response.ok){

         productosSuper = await response.json();    
         cargarProductos(productosSuper);  
         agregarCarrito();
         gestionarQuitarDelCarrito();
         dibujarTabla()

    }else{
        Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Lo sentimos intentelo dentro de unos segundos',
            showConfirmButton: false,
            timer: 2000
          })    }
}

traerProductos()


const contenedorTarjetas = document.querySelector('#contenedor_productos');

function cargarProductos(item){

    item.forEach((producto) => {
        const div = document.createElement('div');

        div.classList.add('tarjeta_producto');

        div.innerHTML = `

        <h2 class="nombre_producto">${producto.nombre}</h2>

        <picture class='imagen_tarjeta'>

          <img src="${producto.imagen}" alt="${producto.nombre}">

        </picture>

        <h3 class="precio_producto">$${producto.precio}</h3>

        <div class="contenedor_botones">

            <button class="boton_agregar boton" id="agregar_${producto.nombre}">Agregar</button>
            <button class="boton_quitar boton" id="quitar_${producto.nombre}"> Quitar</button>

        </div>
        `
        contenedorTarjetas.append(div)
    });
}

function agregarCarrito () {

    carrito = JSON.parse(localStorage.getItem('carrito')) || []

    const botonagregar = document.querySelectorAll('.boton_agregar');

    botonagregar.forEach(boton => {

        boton.addEventListener('click', (e) => {

            const productoNombre = e.target.id.replace('agregar_', '');

            const productoEncontrado = productosSuper.find(producto => producto.nombre.includes(productoNombre));

            if (productoEncontrado){

                const productoEnCarrito = carrito.find(producto => producto.nombre.includes(productoNombre));

                if (productoEnCarrito) {

                    productoEnCarrito.cantidad += 1;

                    Toastify({
                        text: ` Agregaste  ${productoNombre} , En total tenes ${productoEnCarrito.cantidad}`,
                        duration: 3000,
                        newWindow: true,
                        close: true,
                        gravity: "top", 
                        position: "left",
                        style: {
                          background: "linear-gradient(to right, #00b09b, #96c93d)",
                        },
                      }).showToast();
                } else {
                    carrito.push({...productoEncontrado, cantidad: 1});
                    Toastify({
                        text: "¡Producto agregado al carrito!",
                        duration: 3000,
                        newWindow: true,
                        close: true,
                        gravity: "top", 
                        position: "left",
                        style: {
                          background: "linear-gradient(to right, #00b09b, #96c93d)",
                        },
                      }).showToast();
                }
               
                localStorage.setItem('carrito', JSON.stringify(carrito));
                dibujarTabla()
            }
        });
    });
}





function gestionarQuitarDelCarrito() {

    function quitarDelCarrito(productoNombre) {
        const productoEnCarrito = carrito.find(producto => producto.nombre.includes(productoNombre));
    
        if (productoEnCarrito) {

            if (productoEnCarrito.cantidad > 1) {

                productoEnCarrito.cantidad -= 1;

                mostrarMensaje(`Quitaste 1 ${productoNombre}. En total tienes ${productoEnCarrito.cantidad}`);

            } else {

                carrito.splice(carrito.indexOf(productoEnCarrito), 1);

                mostrarMensaje(`Quitaste el último ${productoNombre}. No tienes más de este producto.`);
            }
    
            localStorage.setItem('carrito', JSON.stringify(carrito));
        }
    }
    
    function mostrarMensaje(mensaje) {
        Toastify({
            text: mensaje,
            duration: 3000,
            newWindow: true,
            close: true,
            gravity: "top", 
            position: "left",
            style: {
                background: "linear-gradient(to right, #530000, #FE2020)",
            },
        }).showToast();
    }
    

    const botonquitar = document.querySelectorAll('.boton_quitar');

    botonquitar.forEach(boton => {

        boton.addEventListener('click', (e) => {

            const productoNombre = e.target.id.replace('quitar_', '');

            quitarDelCarrito(productoNombre);
            
            
            dibujarTabla()
        });
    });
}


function dibujarTabla() {
    const contenedorTabla = document.querySelector('#dibujar_tabla');

    contenedorTabla.innerHTML = '';

    carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    if (carrito.length === 0) {
        contenedorTabla.innerHTML = '<p>El carrito está vacío</p>';
        return;
    }

    if(carrito.length> 0){
    const tabla = document.createElement('table');
    tabla.classList.add('tabla_carrito');

    const cabecera = document.createElement('tr');
    cabecera.innerHTML = `
        <th>Producto</th>
        <th>Precio</th>
        <th>Cantidad</th>
        <th>Total</th>
    `;

    tabla.appendChild(cabecera);

    let totalCarrito = 0;

    carrito.forEach(producto => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${producto.nombre}</td>
            <td>$${producto.precio}</td>
            <td>${producto.cantidad}</td>
            <td>$${producto.cantidad * producto.precio}</td>
        `;
        totalCarrito += producto.cantidad * producto.precio;
        tabla.appendChild(fila);
    });

    const filaTotal = document.createElement('tr');
    filaTotal.innerHTML = `<td colspan="3"><strong>Total:</strong></td><td><strong>$${totalCarrito}</strong></td>`;
    tabla.appendChild(filaTotal);

    contenedorTabla.appendChild(tabla);
}}