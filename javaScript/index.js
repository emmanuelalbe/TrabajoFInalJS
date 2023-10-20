let productosSuper = []

const carrito = []

async function traerProductos () {
    const response = await fetch('../productos/productos.json');

    if (response.ok){
         productosSuper = await response.json();    
         cargarProductos(productosSuper);  
         agregarCarrito();

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
          <button class="boton_quitar" id="quitar_${producto.nombre}"> Quitar</button>
          </div>
        `
        contenedorTarjetas.append(div)
    });
}

 
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


function agregarCarrito () {
    const botonagregar = document.querySelectorAll('.boton_agregar');

    botonagregar.forEach(boton => {
        boton.addEventListener('click', (event) => {
            const productoNombre = event.target.id.replace('agregar_', '');
            const productoEncontrado = productosSuper.find(producto => producto.nombre === productoNombre);

            if (productoEncontrado) {
                const productoEnCarrito = carrito.find(producto => producto.nombre === productoNombre);

                if (productoEnCarrito) {
                    // Si el producto ya está en el carrito, incrementar la cantidad
                    productoEnCarrito.cantidad += 1;
                } else {
                    // Si el producto no está en el carrito, agregarlo
                    carrito.push({
                        ...productoEncontrado,
                        cantidad: 1
                    });
                }

                // Guardar carrito en el Local Storage
                localStorage.setItem('carrito', JSON.stringify(carrito));
            }
        });
    });
}

