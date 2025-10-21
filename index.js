// console.log("Hola desde index.js de la entrega");
import { log } from 'console';
import {argv} from 'process';


async function obtenerProductos() {
    
try { 
    const listado = await fetch("https://fakestoreapi.com/products");
    const datos = await listado.json();
    const productos = datos;
    return productos;
    // console.log(productos);
} catch (error) {
    console.error(error);
}
}

async function mostrarProductos() {
    // aca alto los dos primeros
    const argv =process.argv.slice(2);
    // por si necesito dividir el el id del producto
    const ProductoConId = argv[1];
    // creo el array en la funcion mostrarProductos
    const productos = await obtenerProductos();
    // si me piden GET
    if (argv[0] === "GET") {
        // todos los productos
        if (argv[1] === "products"){
            console.log(productos);
            // producto especifico
        } 
    
        else {
           const divido = ProductoConId.split('/');
           const idProducto = divido[1];
           productos.forEach((producto) => {
            if (producto.id == idProducto){
                console.log(producto);
            }
            });
        }
    }
    else if(argv[0] === "POST" && argv[1] === "products"){

        productos.push({id: (productos.length + 1), title: (argv[2]), price: (argv[3]),category: argv[4]})
        console.log(productos);

    }
    else if(argv[0] === "DELETE"){
        const divido = ProductoConId.split('/');
           const idProducto = divido[1];
           productos.splice((idProducto-1),1);
           console.log(productos);


    }


}

mostrarProductos();

