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
var contenido_cesta=[];

var decrementar=(num)=>{
    contenido_cesta[num]--;
    actualiza_cesta();
    actualiza_total();
    guardar_cesta();
}

var cesta=(num)=> {
    contenido_cesta[num-1]++;
    actualiza_cesta();
    actualiza_total();
    guardar_cesta();
}

var actualiza_cesta=()=>{
    if (document.getElementById("lista")){

        document.getElementById("lista").innerHTML="";

        for (let i = 0; i < contenido_cesta.length; i++) {
            if (contenido_cesta[i] !=0){
                document.getElementById("lista").innerHTML += contenido_cesta[i]+" "+productos[i][0]+" "+ (contenido_cesta[i]*productos[i][1]).toFixed(2)+"€ <button type='button' class='btn btn-danger' onclick='decrementar("+i+")'>X</button><br>";
            }  
        }
    }
}

var actualiza_total=()=>{
    let total=0;
    for (let i = 0; i < contenido_cesta.length; i++) {
        total +=contenido_cesta[i]*productos[i][1];
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
        }else contenido_cesta=[0,0,0,0,0,0,0,0,0,0,0,0];
    
  }