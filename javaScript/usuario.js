
const nombre = document.querySelector('#nombre');
const apellido = document.querySelector('#apellido');
const usuario = document.querySelector('#usuario');
const btonFormulario = document.querySelector('#enviar_datos');
const titutloUsuario = document.querySelector("#titulo_usuario");
const parrafoUsusario = document.querySelector('#parrafo_usuario');

setTimeout(() => {
    titutloUsuario.classList.add('changeh1');
    titutloUsuario.classList.add('espacios');
    parrafoUsusario.classList.add('espacios');
    parrafoUsusario.classList.add('mensaje_bienvenida')
    titutloUsuario.textContent = '"Exclusividad a tu medida, porque eres especial."';
    parrafoUsusario.textContent = ' No te olvides de ingresar para acceder a tus descuentos'

}, 700);


function validacion (d,f) {

    d.addEventListener('input',(e)=>{

        cantidad = e.target.value;
    

        cantidad.length < 3 ? e.target.style.backgroundColor = 'Red' : e.target.style.backgroundColor = 'green';

        cantidad.length < 3 ? e.target.nextElementSibling.textContent = ' Falta Datos' : e.target.nextElementSibling.textContent = 'Datos Correctos'

        cantidad.length < 3 ? sessionStorage.removeItem(f) : sessionStorage.setItem(f,e.target.value);

      
    })

};

validacion(nombre,'Nombre');
validacion(apellido,'Apellido');
validacion(usuario,'Usuario');

btonFormulario.addEventListener('click',(e)=>{
    e.preventDefault();

    const localName = sessionStorage.getItem('Nombre') || []
    const localLastName = sessionStorage.getItem('Apellido') || []
    const localUsser = sessionStorage.getItem('Usuario') || []


    if(localName.length>3  && localLastName.length>3 && localUsser.length>3){

        Swal.fire({
            position: 'center',
            icon: 'success',
            title: `Bienvenido ${localName}  \n - Usuario ${localUsser}`,
            showConfirmButton: false,
            timer: 3000
          })    

        clearInterval(idInterval,3000)
    

    }else {
        Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Debete ingresar los datos faltantes',
            showConfirmButton: false,
            timer: 2000
          })    }

});
