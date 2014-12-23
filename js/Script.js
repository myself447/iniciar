$('.rating').on('rating.change', function (event, value, caption) {
    //console.log(value);
    //console.log(caption);
    if (this.getAttribute("data-size") == "sm") {
        var url = this.parentNode.parentNode.parentNode.parentNode.parentNode.children[0].children[0].href;
    }
    else {
        var url = this.parentNode.parentNode.parentNode.children[0].href;
    }
    var index = url.indexOf("=");
    var id = url.substring(parseInt(index) + 1);
    var con = new XMLHttpRequest();
    var get = "../admin_templates/CRUD.cshtml?id=" + id.toString() + "&concepto=calificar&calificacion=" + value.toString();
    con.open("GET", get, true); alert("aqui");
    con.onreadystatechange = function () {

        if (con.readyState == 4 && con.status == 200) {

            alert(con.status);
        }

    }
    con.send();
    //alert(id);
});

   /* function cargarListado(){

       
        var con = new XMLHttpRequest();

        con.onreadystatechange = function () {

            if (con.readyState == 4 && con.status == 200) {

                document.getElementById("sect2").innerHTML = con.responseText;
                //alert("Listado");
            }
        }

        con.open("GET","templates/Listado.cshtml",true);
        con.send();
    }*/

     

    $("#ver_login").click(function () {
        $("#adm_login").slideToggle();
    });

    $(".carrito").click(
    function () {
        //alert($(this).attr("name"));
        $("span[name=" + $(this).attr("name") + $(this).attr("name") + "] *").click();
    }
    );

   /* $("span[name=11]").click(
    function () { alert("clickeado"); }
    );*/

  /*$(function() {
    $( "#datepicker" ).datepicker();
  });*/

 // var picker = new Pikaday({ field: $('#datepicker')[0] });

  // activate datepickers for all elements with a class of 'datepicker'
$('.datepicker').pikaday({ firstDay: 1 });

// chain a few methods for the first datepicker, jQuery style!
//$('.datepicker').eq(0).pikaday('show').pikaday('gotoYear', 2042);


function informes() {
    var selection = document.getElementById('dropdownMenu1').childNodes[0].nodeValue;
    var inputs = document.querySelectorAll("#informar2 input");
    var input = {};
    for(var i=0;i<inputs.length-1;i++){  input[String.fromCharCode(i+97)] = inputs[i].value;  }

    var consulta = $('#rConsulta').prop('checked'); var reporte = $('#rReporte').prop('checked');
    $.ajax({
        type: "GET",
        url: "admin_templates/Informe.cshtml",
        dataType: "html",
        data: { "consulta": consulta, "reporte": reporte, "inputs": JSON.stringify(input), "selected": selection },
        success: function (html) {

            $('#informe').html((html));
        }
    });

    


}

function buscar_portada(){

    $("input[name=buscar]").click();

    
   // alert('hola');

}

function get_portada(element){
    
    $("input[name='portada']").attr("src", element.value);

}
/*$("#producto div:nth-of-type(2) > span").click(function () {
    $("#buscar").click();
});

$("#buscar").change(function(){
    $("input[name='portada']").attr("value",$("#buscar").val());
});*/


function grabs(element){
    $("input[name=busqueda" + element.id + "]").click();
}

function cambio(element){
    //alert("hell!");
    var x = String(element.name); x = x.substring(8);  
    var number = parseInt(x) + 1; //alert(String(number));
    var busqueda = "busqueda" + String(number);
    //alert(element.value);
    $("#" + element.name).attr("value", element.value); 
    var files = document.querySelectorAll("#producto div input[name=ruta]"); 
    var agregar = true;
    for (i = 0; i < files.length;i++){

        if(files[i].value=="" || files[i].value==null){
            agregar = false;
            break;
        }
    } //alert(agregar);
    if (agregar) {
        $("#producto").append(
           "<div class='input-group'> \
                <input type='text' name='ruta' class='form-control' id='" + busqueda + "' placeholder='Busque Grabación'> \
                <input type='file' name='" + busqueda + "' onchange='cambio(this);'> \
                <span class='input-group-addon' id='" + number + "' onclick='grabs(this);'><span class='glyphicon glyphicon-search'></span></span> \
            </div>"
    );
    }
}

document.body.onload = function () {

    //formulario = document.getElementById('data').innerHTML;

    document.getElementById('rConsulta').checked = false;
    document.getElementById('rReporte').checked = false;
    //document.body.click();

}

//var data = document.getElementById('data').innerHTML;
function upload(element) {
     /* Create a FormData instance */
    var formData = new FormData();

    if ($("input[name=buscar]").val() != "") {
        //portada = document.getElementsByName('buscar')[0];
        formData.append("portada", document.getElementsByName('buscar')[0].files[0]);
    }
    else {
        var nombre = document.getElementsByName('portada')[0].src.split("/");
        var name = nombre[nombre.length-1];
        formData.append("portada", name);
       // portada = "";
        /*var reader = new FileReader();
        reader.onload = function (e) {

            var img = e.result;
        }

        reader.readAsText(file);*/

    }
    var archivos = document.querySelectorAll("#producto div:nth-of-type(6) ~ div input[type=file]");
    var form = document.getElementById('data');
    
    form.onsubmit = function (event) {

        event.preventDefault();
        //document.getElementById('up').style.display = "inline";
    }
   
   /* var validacion = false;
    for (var j = 0; j < archivos.length; j++) {
        if (archivos[j].value != "") {
            validacion = true;
            break;
        }
    }*/

     
    //alert(validacion);
     /*&& validacion==true*/

    if(/*portada != null && */ $("input[name=titulo]").val() != "" && $("input[name=precio]").val()!="" && $("#ref").val()!="" && $("#desc").val()!=""){
        
       
        /* Add the file */
         //alert("que!");
        if(element.value == "Actulizar Producto"){

            formData.append("current_id", document.getElementById('current_id').getAttribute("item"));
            formData.append("old_title", document.getElementById('current_id').getAttribute("itemref"));
            var toRemove = document.querySelectorAll("#current_id tr td:nth-child(1)");
            for(var u = 0; u < toRemove.length; u++){ formData.append("toRemove",toRemove[u].innerHTML); }
        }
        formData.append("accion", element.value); 
        //if(portada.files!=undefined){formData.append("uploads[]", portada.files[0], portada.files[0].name);}
        for(var i=0;i<archivos.length-1;i++){
            var archivo = archivos[i];
            formData.append("uploads[]", archivo.files[0], archivo.files[0].name);
        } 

        formData.append("titulo", $("input[name=titulo]").val());
        formData.append("precio", $("input[name=precio]").val());
        formData.append("ref", $("#ref").val());
        formData.append("desc", $("#desc").val());
        //alert($("#ref").val() + " " + $("#desc").val()) ;  
        

        var client = new XMLHttpRequest();

        client.open("POST", "admin_templates/TestUpload.cshtml", true);
        //client.setRequestHeader("Content-Type", "multipart/form-data");


        /* Check the response status */
        client.onreadystatechange = function () {
            if (client.readyState == 4 && client.status == 200) {

                //alert(client.statusText + " Guardado! " + client.responseText);

                var padre = document.getElementById('producto');
                var hijos1 = document.querySelectorAll('#producto div:nth-child(7) ~ div');
                for (var h = 0; h < hijos1.length; h++) { padre.removeChild(hijos1[h]); }
                $("img[name=portada]").attr("src", "../img/portada0.jpg");
                document.getElementsByName('ruta')[0].setAttribute("value", "");
                $("input[name=buscar]").val("");
                document.getElementById('tabla').innerHTML = "";
                document.getElementById('reset1').click();
                if(element.value == "Actulizar Producto"){  document.getElementById('bt').click(); }
                document.getElementById('up').style.display = "inline";
                $('#up').fadeOut(2700, ver_ya());
            }
            else {

                //alert("Un Error Ocurrió");
            }
        }
    //client.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        client.send(formData);  /* Send to server */
      
    } else{

    alert("Llene los campos requeridos");
    }

    
}

function consulta(){
    document.getElementById('por').style.display = "inline-block";
    document.getElementById('informar').innerHTML = "<div class='dropdown' id='menu1'> \
                                                          <button class='btn btn-default dropdown-toggle' type='button' id='dropdownMenu1' data-toggle='dropdown' aria-expanded='true'> \
                                                            Seleccionar \
                                                            <span>&nbsp;</span><span class='caret'></span> \
                                                          </button> \
                                                          <ul class='dropdown-menu' role='menu' aria-labelledby='dropdownMenu1'> \
                                                            <li role='presentation'><a role='menuitem' tabindex='-1' href='#' onclick='selected(this);'>Fecha de entrada</a></li> \
                                                            <li role='presentation'><a role='menuitem' tabindex='-1' href='#' onclick='selected(this);'>Título</a></li> \
                                                            <li role='presentation'><a role='menuitem' tabindex='-1' href='#' onclick='selected(this);'>Precio</a></li> \
                                                            <li role='presentation'><a role='menuitem' tabindex='-1' href='#' onclick='selected(this);'>Calificación</a></li> \
                                                          </ul> \
                                                     </div> ";

}

function reporte(mi){

    document.getElementById('por').style.display = "none";
    document.getElementById('informar').innerHTML = "";
    document.getElementById('informar2').innerHTML = "\
            <div class='row' style=''> \
                <div class='col-xs-5'>\
                    <div class=input-group>\
                        <span class=input-group-addon style='font-size: 1.1em; font-weight: bold;'>Desde:</span><input class='datepicker form-control' id='desde' data-date-format='mm/dd/yyyy hh:mm'>\
                    </div>\
                </div> \
                <div class='col-xs-5'>\
                    <div class=input-group>\
                        <span class=input-group-addon style='font-size: 1.1em; font-weight: bold;'>Hasta:</span><input class='datepicker form-control' id='hasta' data-date-format='mm/dd/yyyy'>\
                    </div>\
                </div> \
                <div class='col-xs-2'> \
                    " + '<input type="button" class="btn btn-default btn-md" id="bt" value="Ver" onclick="informes();" style="display:inline-block;" />' + " \
                </div> \
            </div>";
}

function selected(mi){
    //document.getElementById('bt').style.display = "inline-block";
    //alert( );
    document.getElementById('dropdownMenu1').childNodes[0].nodeValue = mi.innerHTML;
    var por = ""; var ver = '<input type="button" class="btn btn-default btn-md" id="bt" value="Ver" onclick="informes();" style="display:inline-block;" />';
    switch(mi.innerHTML){
        case  "Fecha de entrada":

            por = "\
            <div class='row' style=''> \
                <div class='col-xs-5'>\
                    <div class=input-group>\
                        <span class=input-group-addon style='font-size: 1.1em; font-weight: bold;'>Desde:</span><input class='datepicker form-control' id='desde' data-date-format='mm/dd/yyyy hh:mm'>\
                    </div>\
                </div> \
                <div class='col-xs-5'>\
                    <div class=input-group>\
                        <span class=input-group-addon style='font-size: 1.1em; font-weight: bold;'>Hasta:</span><input class='datepicker form-control' id='hasta' data-date-format='mm/dd/yyyy'>\
                    </div>\
                </div> \
                <div class='col-xs-2'> \
                    " + ver + " \
                </div> \
            </div>";
            //$('.datepicker .form-control').pikaday({ firstDay: 1 });
           
            break;

        case "Título":

            por = '\
            <div class="input-group" style="float:left; max-width:500px; margin-right:20px;"><span class="input-group-addon">Título</span>\
                <input type="text" class="form-control" name="titulo" placeholder="Entre el Título">\
            </div>'+ ver;

            break;

        case "Precio":

            por = "\
            <div class='row' style=''> \
                <div class='col-xs-5'>\
                    <div class=input-group>\
                        <span class=input-group-addon style='font-size: 1.1em; font-weight: bold;'>Desde: $</span><input class='form-control' id='desdep'>\
                    </div>\
                </div> \
                <div class='col-xs-5'>\
                    <div class=input-group>\
                        <span class=input-group-addon style='font-size: 1.1em; font-weight: bold;'>Hasta: $</span><input class='form-control' id='hastap'>\
                    </div>\
                </div> \
                <div class='col-xs-2'> \
                    " + ver + " \
                </div> \
            </div>";

            break;

        case "Calificación":

            por = "\
            <div class='row' style=''> \
                <div class='col-xs-4'>\
                    <div class=input-group>\
                        <span class=input-group-addon style='font-size: 1.1em; font-weight: bold;'>Desde:</span>\
                        <input value='0' type='number' class='rating form-control' style='' min='0' max='5' step=0.5 data-container-class='text-right' data-size='xs' data-stars='5'>\
                        <span class=input-group-addon style='font-size: 1.1em; font-weight: bold;'>★</span> \
                    </div>\
                </div> \
                <div class='col-xs-4'>\
                    <div class=input-group>\
                        <span class=input-group-addon style='font-size: 1.1em; font-weight: bold;'>Hasta: </span>\
                        <input value='0' type='number' class='rating form-control' style='' min='0' max='5' step=0.5 data-container-class='text-right' data-size='xs' data-stars='5'>\
                        <span class=input-group-addon style='font-size: 1.1em; font-weight: bold;'>★</span> \
                    </div>\
                </div> \
                <div class='col-xs-4'> \
                    " + ver + " \
                </div> \
            </div>";
            //ver = "";

            break;

        default:
        //'<input value="0" type="number" class="rating" style="" min="0" max="5" step=0.5 data-container-class="text-right" data-size="xs" data-stars="5" data-glyphicon=0>'
            break;

    }
    //por += ver;
    document.getElementById('informar2').innerHTML = por;
    $('.datepicker').pikaday({ firstDay: 1 });
    
}

function ver_ya(){
    
    var menu = document.getElementById('dropdownMenu1');
    if (menu != null) {

        switch (menu.childNodes[0].nodeValue) {
            case "Fecha de entrada":

                var d = new Date(); var ini = new Date(document.getElementById('desde').value); var fin = new Date(document.getElementById('hasta').value);
                var fecha0 = parseInt( d.getFullYear().toString() + d.getMonth().toString() + d.getDate().toString() );
                var fecha1 = parseInt( ini.getFullYear().toString() + ini.getMonth().toString() + ini.getDate().toString() );
                var fecha2 = parseInt( fin.getFullYear().toString() + fin.getMonth().toString() + fin.getDate().toString() );
                if(fecha0 >= fecha1 && fecha0 <= fecha2){ informes(); }

                break;

            case "Título":

            break;

            case "Precio":

            break;

            case "Calificación":


            break;

            default:
 
            break;

        }
    }
}

function deleting(este){

    var con = new XMLHttpRequest();
    var id = este.parentNode.parentNode.children[4].innerHTML;
    //alert(id);
    con.open("GET", "../admin_templates/CRUD.cshtml?id=" + id.toString() + "&concepto=borrar", true);

    con.onreadystatechange = function () {

        if (con.readyState == 4 && con.status == 200) {
            //document.getElementById().
            alert("Borrado!" + con.responseText);
            informes();
        }
    }

    con.send();

    

}

function edit(este){

    document.getElementById("current_id").setAttribute("item", este.parentNode.parentNode.children[4].innerHTML);
    document.getElementById("current_id").setAttribute("itemref", este.parentNode.parentNode.children[1].innerHTML);

    con = new XMLHttpRequest();
    var id = este.parentNode.parentNode.children[4].innerHTML;
    var precio = este.parentNode.parentNode.children[3].innerHTML;
    var portada = este.parentNode.parentNode.children[0].children[0].src;
    var titulo = este.parentNode.parentNode.children[1].innerHTML;
    var ref = este.parentNode.parentNode.children[5].innerHTML;;
    var desc = este.parentNode.parentNode.children[6].innerHTML;;

    //document.getElementsByName('buscar')[0].value = portada;
    document.getElementsByName('portada')[0].src = portada;
    document.getElementsByName('titulo')[0].value = titulo;
    document.getElementsByName('precio')[0].value = precio;
    document.getElementById('ref').value = ref;
    document.getElementById('desc').value = desc;
    con.open("GET", "../admin_templates/CRUD.cshtml?concepto=actualizar&id=" + id.toString(), true);



    con.onreadystatechange = function () {

        if (con.readyState == 4 && con.status == 200) {
            var grabs = document.implementation.createHTMLDocument();
            grabs.body.innerHTML = con.responseText; //alert(data);
            var divs = grabs.getElementsByTagName("div");
            $("#tabla").html("");
            for (var i = 0; i < divs.length; i++) {
                $("#tabla").append("<tr id='tr" + i + "'><td>" + divs[i].innerHTML.toString() + "</td><td><span  onclick='del(this);' class='glyphicon glyphicon-remove'></span> </td></tr>");
            }
        }
    }

    con.send(null);

    document.getElementById('add_update').value = "Actulizar Producto";

}

function del(este) {
    //alert(este);
    var hijo = este.parentNode.parentNode;
    var padre = este.parentNode.parentNode.parentNode.parentNode;
    document.getElementById("current_id").appendChild(hijo); 
    padre.children[0].removeChild(hijo);

}

var openFile = function (event) {

    var input = event.target;
    var lector = new FileReader();
    lector.onload = function () {

        var dataURL = lector.result;
        var salida = document.getElementsByName('portada')[0];
        var file = document.getElementsByName('buscar')[0];

        salida.src = dataURL;
        //file.value = dataURL;

    };
    lector.readAsDataURL(input.files[0]);
};