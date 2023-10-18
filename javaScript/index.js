
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

