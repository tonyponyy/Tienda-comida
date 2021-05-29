window.onload = ()=>{
    recuperar_cesta();
    actualiza_cesta();
    actualiza_total();
}

var productos =[
    ["manzana",1.50],["leche",1.45],["garbanzos",0.78],
    ["arroz",0.60],["spaguettis",0.75],["detergente",3.3],
    ["sandia",2.2],["pollo",3.5],["papel higienico",3],
    ["pizza congelada",1.80],["huevos",2],["harina",0.90]
];

class Producto {
    constructor(id) {
      this.id = id;
      this.nombre = productos[id-1][0];
      this.precio = productos[id-1][1];
      this.unidades = 1;
    }
  }



var contenido_cesta=[];

var decrementar=(num)=>{
    quitar_producto(num);
    actualiza_cesta();
    actualiza_total();
    guardar_cesta();
}

var cesta=(num)=> {
    añadir_producto(num);
    actualiza_cesta();
    actualiza_total();
    guardar_cesta();
}

var quitar_producto=(id)=>{
    for (let i = 0; i < contenido_cesta.length; i++) {
        if (contenido_cesta[i].id == id ){
            contenido_cesta[i].unidades-- ;
            if (contenido_cesta[i].unidades < 1){
                contenido_cesta.splice(i, 1);
                return true;
            }
            //  copiamos el objeto, lo eliminamos y lo subimos a la primera posición.
            let objeto = contenido_cesta[i];
            contenido_cesta.splice(i, 1);
            contenido_cesta.unshift(objeto);
        }
    }
}


var añadir_producto=(id)=>{
    for (let i = 0; i < contenido_cesta.length; i++) {
        if (contenido_cesta[i].id == id ){
            contenido_cesta[i].unidades++;
            //  copiamos el objeto, lo eliminamos y lo subimos a la primera posición.
            let objeto = contenido_cesta[i];
            contenido_cesta.splice(i, 1);
            contenido_cesta.unshift(objeto);
            //hacemos un return para acabar la función.
            return true;
        }
    }
    var productoNuevo = new Producto(id);
    console.log("llega aqui")
    contenido_cesta.unshift(productoNuevo);
}

var actualiza_cesta=()=>{
    if (document.getElementById("lista")){

        document.getElementById("lista").innerHTML="";

        for (let i = 0; i < contenido_cesta.length; i++) {
            
                document.getElementById("lista").innerHTML += contenido_cesta[i].unidades+" "+contenido_cesta[i].nombre+" "+ (contenido_cesta[i].unidades*contenido_cesta[i].precio).toFixed(2)+"€ <button type='button' class='btn btn-danger' onclick='decrementar("+contenido_cesta[i].id+")'>X</button><br>";
             
        }
    }
}

var actualiza_total=()=>{
    let total=0;
    for (let i = 0; i < contenido_cesta.length; i++) {
        total +=contenido_cesta[i].unidades*contenido_cesta[i].precio;
    }
    document.getElementById("total").innerHTML= total.toFixed(2)+" €"
}

var guardar_cesta=()=>{
    sessionStorage.setItem('cesta_guardada', JSON.stringify(contenido_cesta));
}

var recuperar_cesta=()=>{

    if (sessionStorage.getItem("cesta_guardada")) {
        let datos_recuperados = sessionStorage.getItem("cesta_guardada");
        contenido_cesta= JSON.parse(datos_recuperados); 
        console.log("hay datos")
        }else contenido_cesta=[];
    
  }