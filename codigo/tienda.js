//codigo que se ejecutará al cargar.
window.onload = ()=>{
    recuperar_cesta();
    actualiza_cesta();
    actualiza_total();
}
//en esta variable estará el contenido de la cesta.
var contenido_cesta=[];
//array donde se guarda el nombre y el precio de cada uno de los productos
var productos =[
    ["manzana",1.50],["leche",1.45],["garbanzos",0.78],
    ["arroz",0.60],["spaguettis",0.75],["detergente",3.3],
    ["sandia",2.2],["pollo",3.5],["papel higienico",3],
    ["pizza congelada",1.80],["huevos",2],["harina",0.90]
];
// constructor donde pasamos por parametro el id del producto y nos crea el producto con su nombre y su precio, y una cantidad por defecto de 1
class Producto {
    constructor(id) {
      this.id = id;
      this.nombre = productos[id-1][0];
      this.precio = productos[id-1][1];
      this.unidades = 1;
    }
  }

//funcion que añade un producto a la cesta, actualiza el precio total, imprime la cesta y la guarda en el sessionStorage
var cesta=(num)=> {
    añadir_producto(num);
    actualiza_cesta();
    actualiza_total();
    guardar_cesta();
}
  //funcion que quita un producto de la cesta, actualiza el precio total, imprime la cesta y la guarda en el sessionStorage
var decrementar=(num)=>{
    quitar_producto(num);
    actualiza_cesta();
    actualiza_total();
    guardar_cesta();
}

//logica que permite quitar un producto de la cesta
var quitar_producto=(id)=>{
    //recorre la cesta buscando una coincidencia con el id que le pasamos por parametro
    for (let i = 0; i < contenido_cesta.length; i++) {
        if (contenido_cesta[i].id == id ){
            //si encuentra coincidencia, accede al valor unidades del objeto productos que está dentro de la posición del array
            // y le resta una unidad.
            contenido_cesta[i].unidades-- ;
            if (contenido_cesta[i].unidades < 1){
                //si hay menos de una unidad, se elimina el objeto.
                contenido_cesta.splice(i, 1);
                // si hemos eliminado el objeto, hacemos un return para que no se ejecute el resto de la función.
                return true;
            }
            //  copiamos el objeto, lo eliminamos y lo subimos a la primera posición.
            let objeto = contenido_cesta[i];
            contenido_cesta.splice(i, 1);
            contenido_cesta.unshift(objeto);
        }
    }
}
//logica que permite añadir un producto a la cesta,
var añadir_producto=(id)=>{
    //recorre la cesta buscando una coincidencia con el id que le pasamos por parametro
    for (let i = 0; i < contenido_cesta.length; i++) {
        if (contenido_cesta[i].id == id ){
            //si encuentra coincidencia, accede al valor unidades del objeto productos que está dentro de la posición del array
            // y le suma una unidad.
            contenido_cesta[i].unidades++;
            //  copiamos el objeto, lo eliminamos y lo subimos a la primera posición.
            let objeto = contenido_cesta[i];
            contenido_cesta.splice(i, 1);
            contenido_cesta.unshift(objeto);
            //hacemos un return para acabar la función.
            return true;
        }
    }
    //Si no encuentra coincidencia creamos un producto nuevo y lo añadimos al principio de la array contenido_cesta con .unshift()
    var productoNuevo = new Producto(id);
    contenido_cesta.unshift(productoNuevo);
}

//logica que permite imprimir la cesta en un div
var actualiza_cesta=()=>{
    // Si el div "lista" existe, ejecuta el resto de la función.
    if (document.getElementById("lista")){
        //Vaciamos de contenido el div"lista"
        document.getElementById("lista").innerHTML="";
        //Recorremos la array del contenido cesta.
        for (let i = 0; i < contenido_cesta.length; i++) {
            //recuperamos e imprimimos las unidades del producto + el nombre+ el total del producto y añadimos un boton para eliminar 
            //el producto, que llamará desde el HTML a la función decrementar con el id del mismo producto.
                document.getElementById("lista").innerHTML +=
                 contenido_cesta[i].unidades+" "+contenido_cesta[i].nombre+" "+
                (contenido_cesta[i].unidades*contenido_cesta[i].precio).toFixed(2)+
                "€ <button type='button' class='btn btn-danger' onclick='decrementar("+contenido_cesta[i].id+")'>X</button><br>";
        }
    }
}
//Logica que permite recuperar la suma total de todos los productos.
var actualiza_total=()=>{
    // el la variable total se irá sumando los precios.
    let total=0;
    //Recorremos la array del contenido_cesta
    for (let i = 0; i < contenido_cesta.length; i++) {
    //Sumamos al total, la operación de multiplicar las unidades al precio por unidad de cada elemento de la cesta    
        total +=contenido_cesta[i].unidades*contenido_cesta[i].precio;
    }
    //una vez llegado al final del array lo imprimimos en el div total y dejamos solo dos decimales.
    document.getElementById("total").innerHTML= total.toFixed(2)+" €"
}
//esta función guarda el contenido de la variable contenido_cesta en el sessionStorage con el nombre de cesta_guardada.
var guardar_cesta=()=>{  sessionStorage.setItem('cesta_guardada', JSON.stringify(contenido_cesta)); };


//esta función recupera el item "cesta_guardada" y lo pasa a nuestra array contenido_cesta, si no encuentra nada con ese nombre 
//en sessionStorage,inicializa el contenido de cesta como array vacia.
var recuperar_cesta=()=>{
    //mira si existe el item "cesta_guardada"
    if (sessionStorage.getItem("cesta_guardada")) {
        //recuperamos los datos guardados anteriormente en "cesta_guardada" y lo "parseamos" a la array contenido_cesta.
        let datos_recuperados = sessionStorage.getItem("cesta_guardada");
        contenido_cesta= JSON.parse(datos_recuperados); 
        // si no hay datos de sesiones anteriores, inicializamos la array vacia.
        }else contenido_cesta=[];
  }