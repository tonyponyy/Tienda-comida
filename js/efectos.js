/* ----------------- Variables ----------------- */
                var items = document.getElementsByClassName("items"),
                producto1 = document.getElementById("_product1"),
           drop_container = document.getElementById("drop-container"),
                    lista = document.getElementById("shopping-list"),
                    tbody = document.getElementById("new_rows"),
                    total = document.getElementById("total"),
                  id_item = 0,
items_at_the_shopping_car = 0,
                sub_total = new Array (0,0,0,0,0,0,0,0,0,0,0,0),
         productos =[
            ["manzana",1.50],["milk",1.45],["garbanzos",0.78],
            ["detergente",3.3],["arroz",0.60],["spaguettis",0.75],
            ["sandia",2.2],["pollo",3.5],["papel higienico",3],
            ["pizza congelada",1.80],["huevos",2],["harina",0.90]
         ];
    // archivo json de prueba
    var items_json = '{ "productos_en_la_cesta" : [' +
    '{ "product_name":"Apples" , "product_at_the_shopping_list": false },' +
    '{ "product_name":"Milk" , "product_at_the_shopping_list": false },' +
    '{ "product_name":"Chickpeas" , "product_at_the_shopping_list": false } ]}';
    
/* ----------------- Funciones ----------------- */
function modifyWidths(){
    if(window.innerWidth <= 480){
        for(var j=0; j< items.length; j++){
            items[j].style.height = items[j].clientWidth/1.2 + 'px';
        }
    }
}

// Obtenemos el id del producto que está siendo arrastrado
const getId = (e) => {
    e
    .dataTransfer
    .setData('text/plain', e.target.id);
};

const setId = (id) => {
    if(id == '_product1')   id_item = 1;       // Producto: Manzanas
    if(id == '_product2')   id_item = 2;       // Producto: Leche
    if(id == '_product3')   id_item = 3;       // Producto: Garbanzos
    if(id == '_product4')   id_item = 4;       // Producto: Detergente
    if(id == '_product5')   id_item = 5;       // Producto: Arroz
    if(id == '_product6')   id_item = 6;       // Producto: Spaghetti
    if(id == '_product7')   id_item = 7;       // Producto: Sandía
    if(id == '_product8')   id_item = 8;       // Producto: Pollo
    if(id == '_product9')   id_item = 9;       // Producto: Papel Higiénico
    if(id == '_product10')  id_item = 10;      // Producto: Pizza
    if(id == '_product11')  id_item = 11;      // Producto: Huevos
    if(id == '_product12')  id_item = 12;      // Producto: Harina
}

function calcular_total(){
    var total_cantidad = 0;
    for(var i=0; i<sub_total.length; i++){
        total_cantidad = total_cantidad + sub_total[i];
        console.log(sub_total[i]);
    }
    total.innerHTML = " El total es: " + (total_cantidad).toFixed(2);
}

// Mostramos los detalles del producto en la lista de compra según el valor del id recibido
const show_product_details = (id) => {
    switch(id){
        case 1:
            /* Si no hay ningún producto añadido al carrito para el momento, lo mostramos para mostrar el producto */
            if(items_at_the_shopping_car == 0)  lista.style.display = "block";
            
            /* Añadimos a la tabla de la lista de compras los detalles del producto */
            tbody.innerHTML += "<tr id=\"manzana\"> <th scope=\"row\">" + productos[0][0] + "</th> <td>" + "<input type=\"number\" class=\"cantidad-campo\" id=\"it-1\" value=\"1\" onkeyup=\"if(this.value<0){this.value= this.value * -1}\">" + "</td> <td>" + productos[0][1] +" € </td> <td>" +  "<a href=\"#\" class=\"delete-item\" id=\"borrar1\"><i class=\"fas fa-trash-alt ms-3\"></i></a>" +"</td></tr>";
            items_at_the_shopping_car++;
            obj.productos_en_la_cesta[0].product_at_the_shopping_list = true;

            /* Procedemos a calcular el subtotal del producto: cantidad * precio */
            campo_cantidad1 = document.getElementById("it-1");
            sub_total[0] = campo_cantidad1.value * productos[0][1];
            // console.log(obj.productos_en_la_cesta[0].product_at_the_shopping_list);
            
            /* En dado caso que el usuario cambie el input, realizamos la operación nuevamente y actualizamos 
            el subtotal */
            campo_cantidad1.addEventListener('input', function(){   
                sub_total[0] = this.value * productos[0][1];
                if(sub_total[0] < 0)     sub_total[0] *= -1;
                calcular_total();
                console.log("mi valor está siendo modificado!!");
            });
            
            // ----------------- Código para borrar el item de la lista y actualizar el total -------
            var borrar_btn1 = document.getElementById("borrar1");
            borrar_btn1.addEventListener('click', function(e){
                e.preventDefault();
                document.getElementById("manzana").innerHTML = "";
                sub_total[0] = 0;
                calcular_total();
                items_at_the_shopping_car--;   
                obj.productos_en_la_cesta[0].product_at_the_shopping_list = false;
            });

            break;
        case 2:
            /* Si no hay ningún producto añadido al carrito para el momento, lo mostramos para mostrar el producto */
            if(items_at_the_shopping_car == 0)  lista.style.display = "block";
            
             /* Añadimos a la tabla de la lista de compras los detalles del producto */
            tbody.innerHTML += "<tr id=\"leche\"> <th scope=\"row\">" + productos[1][0] + "</th> <td>" + "<input type=\"number\" class=\"cantidad-campo\" id=\"it-2\" value=\"1\" onkeyup=\"if(this.value<0){this.value= this.value * -1}\">" + "</td> <td>" + productos[1][1] +" € </td> <td>" +  "<a href=\"#\" class=\"delete-item\" id=\"borrar2\"><i class=\"fas fa-trash-alt ms-3\"></i></a>" +"</td></tr>";
            items_at_the_shopping_car++;
            obj.productos_en_la_cesta[1].product_at_the_shopping_list = true;
            
            /* Procedemos a calcular el subtotal del producto: cantidad * precio */
            campo_cantidad2 = document.getElementById("it-2");
            sub_total[1] = campo_cantidad2.value * productos[1][1];
            
            /* En dado caso que el usuario cambie el input, realizamos la operación nuevamente y actualizamos 
            el subtotal */
            campo_cantidad2.addEventListener('input', function(){   // evento que se dispara cuando se cambia el input
                sub_total[1] = this.value * productos[1][1];
                if(sub_total[1] < 0)     sub_total[1] *= -1;
                calcular_total();
                console.log(sub_total[1]);
                console.log("mi valor está siendo modificado 2!!");
            });

            // ----------------- Código para borrar el item de la lista y actualizar el total -------
            borrar_btn2 = document.getElementById("borrar2");
            borrar_btn2.addEventListener('click', function(e){
                e.preventDefault();
                document.getElementById("leche").innerHTML = "";
                sub_total[1] = 0;
                calcular_total();
                items_at_the_shopping_car--;   // como el producto se eliminó de la lista, actualizamos la variable 
            });
            break;
        case 3:
            if(items_at_the_shopping_car == 0)  lista.style.display = "block";
            tbody.innerHTML += "<tr> <th scope=\"row\">" + productos[2][0] + "</th> <td>" + "<input type=\"number\" class=\"cantidad-campo\" id=\"it-3\" value=\"1\" onkeyup=\"if(this.value<0){this.value= this.value * -1}\">" + "</td> <td>" + productos[2][1] +" € </td> <td>" +  "<a href=\"#\" class=\"delete-item\"><i class=\"fas fa-trash-alt ms-3\"></i></a>" +"</td></tr>";
            items_at_the_shopping_car++;
            campo_cantidad3 = document.getElementById("it-3");
            sub_total[2] = campo_cantidad3.value * productos[2][1];
            campo_cantidad3.addEventListener('input', function(){   // evento que se dispara cuando se cambia el input
                sub_total[2] = this.value * productos[2][1];
                if(sub_total[2] < 0)     sub_total[2] *= -1;
                calcular_total();
                console.log(sub_total[2]);
            });
            break;
        case 4:
            if(items_at_the_shopping_car == 0)  lista.style.display = "block";
            tbody.innerHTML += "<tr> <th scope=\"row\">" + productos[3][0] + "</th> <td>" + "<input type=\"number\" class=\"cantidad-campo\" id=\"it-4\" value=\"1\" onkeyup=\"if(this.value<0){this.value= this.value * -1}\">" + "</td> <td>" + productos[3][1] +" € </td> <td>" +  "<a href=\"#\" class=\"delete-item\"><i class=\"fas fa-trash-alt ms-3\"></i></a>" +"</td></tr>";
            items_at_the_shopping_car++;
            campo_cantidad4 = document.getElementById("it-4");
            sub_total[3] = campo_cantidad4.value * productos[3][1];
            campo_cantidad4.addEventListener('input', function(){   // evento que se dispara cuando se cambia el input
                sub_total[3] = this.value * productos[3][1];
                if(sub_total[3] < 0)     sub_total[3] *= -1;
                calcular_total();
                console.log(sub_total[3]);
            });
            break;
        case 5:
            if(items_at_the_shopping_car == 0)  lista.style.display = "block";
            tbody.innerHTML += "<tr> <th scope=\"row\">" + productos[4][0] + "</th> <td>" + "<input type=\"number\" class=\"cantidad-campo\" id=\"it-5\" value=\"1\" onkeyup=\"if(this.value<0){this.value= this.value * -1}\">" + "</td> <td>" + productos[4][1] +" € </td> <td>" +  "<a href=\"#\" class=\"delete-item\"><i class=\"fas fa-trash-alt ms-3\"></i></a>" +"</td></tr>";
            items_at_the_shopping_car++;
            campo_cantidad5 = document.getElementById("it-5");
            sub_total[4] = campo_cantidad5.value * productos[4][1];
            campo_cantidad5.addEventListener('input', function(){   // evento que se dispara cuando se cambia el input
                sub_total[4] = this.value * productos[4][1];
                if(sub_total[4] < 0)     sub_total[4] *= -1;
                calcular_total();
                console.log(sub_total[4]);
            });
            break;
        case 6:
            if(items_at_the_shopping_car == 0)  lista.style.display = "block";
            tbody.innerHTML += "<tr> <th scope=\"row\">" + productos[5][0] + "</th> <td>" + "<input type=\"number\" class=\"cantidad-campo\" id=\"it-6\" value=\"1\" onkeyup=\"if(this.value<0){this.value= this.value * -1}\">" + "</td> <td>" + productos[5][1] +" € </td> <td>" +  "<a href=\"#\" class=\"delete-item\"><i class=\"fas fa-trash-alt ms-3\"></i></a>" +"</td></tr>";
            items_at_the_shopping_car++;
            campo_cantidad6 = document.getElementById("it-6");
            sub_total[5] = campo_cantidad6.value * productos[5][1];
            campo_cantidad6.addEventListener('input', function(){   // evento que se dispara cuando se cambia el input
                sub_total[5] = this.value * productos[5][1];
                if(sub_total[5] < 0)     sub_total[5] *= -1;
                calcular_total();
                console.log(sub_total[5]);
            });
            break;
        case 7:
            if(items_at_the_shopping_car == 0)  lista.style.display = "block";
            tbody.innerHTML += "<tr> <th scope=\"row\">" + productos[6][0] + "</th> <td>" + "<input type=\"number\" class=\"cantidad-campo\" id=\"it-7\" value=\"1\" onkeyup=\"if(this.value<0){this.value= this.value * -1}\">" + "</td> <td>" + productos[6][1] +" € </td> <td>" +  "<a href=\"#\" class=\"delete-item\"><i class=\"fas fa-trash-alt ms-3\"></i></a>" +"</td></tr>";
            items_at_the_shopping_car++;
            campo_cantidad7 = document.getElementById("it-7");
            sub_total[6] = campo_cantidad7.value * productos[6][1];
            campo_cantidad7.addEventListener('input', function(){   // evento que se dispara cuando se cambia el input
                sub_total[6] = this.value * productos[6][1];
                if(sub_total[6] < 0)     sub_total[6] *= -1;
                calcular_total();
                console.log(sub_total[6]);
            });
            break;
        case 8:
            if(items_at_the_shopping_car == 0)  lista.style.display = "block";
            tbody.innerHTML += "<tr> <th scope=\"row\">" + productos[7][0] + "</th> <td>" + "<input type=\"number\" class=\"cantidad-campo\" id=\"it-8\" value=\"1\" onkeyup=\"if(this.value<0){this.value= this.value * -1}\">" + "</td> <td>" + productos[7][1] +" € </td> <td>" +  "<a href=\"#\" class=\"delete-item\"><i class=\"fas fa-trash-alt ms-3\"></i></a>" +"</td></tr>";
            items_at_the_shopping_car++;
            campo_cantidad8 = document.getElementById("it-8");
            sub_total[7] = campo_cantidad8.value * productos[7][1];
            campo_cantidad8.addEventListener('input', function(){   // evento que se dispara cuando se cambia el input
                sub_total[7] = this.value * productos[7][1];
                if(sub_total[7] < 0)     sub_total[7] *= -1;
                calcular_total();
                console.log(sub_total[7]);
            });
            break;
        case 9:
            if(items_at_the_shopping_car == 0)  lista.style.display = "block";
            tbody.innerHTML += "<tr> <th scope=\"row\">" + productos[8][0] + "</th> <td>" + "<input type=\"number\" class=\"cantidad-campo\" id=\"it-9\" value=\"1\" onkeyup=\"if(this.value<0){this.value= this.value * -1}\">" + "</td> <td>" + productos[8][1] +" € </td> <td>" +  "<a href=\"#\" class=\"delete-item\"><i class=\"fas fa-trash-alt ms-3\"></i></a>" +"</td></tr>";
            items_at_the_shopping_car++;
            campo_cantidad9 = document.getElementById("it-9");
            sub_total[8] = campo_cantidad9.value * productos[8][1];
            campo_cantidad9.addEventListener('input', function(){   // evento que se dispara cuando se cambia el input
                sub_total[8] = this.value * productos[8][1];
                if(sub_total[8] < 0)     sub_total[8] *= -1;
                calcular_total();
                console.log(sub_total[8]);
            });
            break;
        case 10:
            if(items_at_the_shopping_car == 0)  lista.style.display = "block";
            tbody.innerHTML += "<tr> <th scope=\"row\">" + productos[9][0] + "</th> <td>" + "<input type=\"number\" class=\"cantidad-campo\" id=\"it-10\" value=\"1\" onkeyup=\"if(this.value<0){this.value= this.value * -1}\">" + "</td> <td>" + productos[9][1] +" € </td> <td>" +  "<a href=\"#\" class=\"delete-item\"><i class=\"fas fa-trash-alt ms-3\"></i></a>" +"</td></tr>";
            items_at_the_shopping_car++;
            campo_cantidad10 = document.getElementById("it-10");
            sub_total[9] = campo_cantidad10.value * productos[9][1];
            campo_cantidad10.addEventListener('input', function(){   // evento que se dispara cuando se cambia el input
                sub_total[9] = this.value * productos[9][1];
                if(sub_total[9] < 0)     sub_total[9] *= -1;
                calcular_total();
                console.log(sub_total[9]);
            });
            break;
        case 11:
            if(items_at_the_shopping_car == 0)  lista.style.display = "block";
            tbody.innerHTML += "<tr> <th scope=\"row\">" + productos[10][0] + "</th> <td>" + "<input type=\"number\" class=\"cantidad-campo\" id=\"it-11\" value=\"1\" onkeyup=\"if(this.value<0){this.value= this.value * -1}\">" + "</td> <td>" + productos[10][1] +" € </td> <td>" +  "<a href=\"#\" class=\"delete-item\"><i class=\"fas fa-trash-alt ms-3\"></i></a>" +"</td></tr>";
            items_at_the_shopping_car++;
            campo_cantidad11 = document.getElementById("it-11");
            sub_total[10] = campo_cantidad11.value * productos[10][1];
            campo_cantidad11.addEventListener('input', function(){   // evento que se dispara cuando se cambia el input
                sub_total[10] = this.value * productos[10][1];
                if(sub_total[10] < 0)     sub_total[10] *= -1;
                calcular_total();
                console.log(sub_total[10]);
            });
            break;
        case 12:
            if(items_at_the_shopping_car == 0)  lista.style.display = "block";
            tbody.innerHTML += "<tr> <th scope=\"row\">" + productos[11][0] + "</th> <td>" + "<input type=\"number\" class=\"cantidad-campo\" id=\"it-12\" value=\"1\" onkeyup=\"if(this.value<0){this.value= this.value * -1}\">" + "</td> <td>" + productos[11][1] +" € </td> <td>" +  "<a href=\"#\" class=\"delete-item\"><i class=\"fas fa-trash-alt ms-3\"></i></a>" +"</td></tr>";
            items_at_the_shopping_car++;
            campo_cantidad12 = document.getElementById("it-12");
            sub_total[11] = campo_cantidad12.value * productos[11][1];
            campo_cantidad12.addEventListener('input', function(){   // evento que se dispara cuando se cambia el input
                sub_total[11] = this.value * productos[11][1];
                if(sub_total[11] < 0)     sub_total[11] *= -1;
                calcular_total();
                console.log(sub_total[11]);
            });
            break;
        default:
            break;
    }
    calcular_total();
}

modifyWidths();
/* ----------------- Eventos ----------------- */
window.addEventListener('resize', modifyWidths);

// Convertimos de JSON a objeto JavaScript
obj = JSON.parse(items_json);

// Asignamos a cada uno de los productos el evento de 'dragstart'
for(var j=0; j< items.length; j++){
    items[j].addEventListener('dragstart', getId);
}

drop_container.addEventListener('dragenter', function(){
    this.classList.toggle("sombreado");
});

drop_container.addEventListener('dragleave', function(){
    this.classList.toggle("sombreado");
});

drop_container.addEventListener('dragover', function(e){
    e.preventDefault();
});

drop_container.addEventListener('drop', function(e){
    e.preventDefault();
    this.classList.remove("sombreado");
    // Recuperamos id del producto que ha sido arrastrado a la zona
    const id = e
        .dataTransfer
        .getData('text');

    console.log(id);
    
    // limpiamos los datos obtenidos
    e
        .dataTransfer
        .clearData();

    // Asignamos los id a las variables correspondientes
    setId(id);
    show_product_details(id_item);
});