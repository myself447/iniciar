    $('.rating').on('rating.change', function(event, value, caption) {
    console.log(value);
    console.log(caption);
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

    var inputs = document.querySelectorAll("#informar2 input");
    var input = {};
    for(var i=0;i<inputs.length-1;i++){  input[String.fromCharCode(i+97)] = inputs[i].value;  }

    var consulta = $('#rConsulta').prop('checked'); var reporte = $('#rReporte').prop('checked');
    $.ajax({
        type: "GET",
        url: "admin_templates/Informe.cshtml",
        dataType: "html",
        data: { "consulta": consulta, "reporte": reporte, "inputs": JSON.stringify(input) },
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
    
    $("input[name='portada']").attr("value", element.value);

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
    }
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

    formulario = document.getElementById('data').innerHTML;

    document.getElementById('rConsulta').checked = false;
    document.getElementById('rReporte').checked = false;
    //document.body.click();

}

//var data = document.getElementById('data').innerHTML;
function upload(element) {
    if ($("input[name=buscar]").val() != "") {
        portada = document.getElementsByName('buscar')[0];
    }
    else {
        //alert("yo");
        portada = null; 
    }
    var archivos = document.querySelectorAll("#producto div:nth-of-type(6) ~ div input[type=file]");
    var form = document.getElementById('data');
    
    form.onsubmit = function (event) {

        event.preventDefault();
        //document.getElementById('up').style.display = "inline";
    }
   
    var validacion = false;
    for (var j = 0; j < archivos.length; j++) {
        if (archivos[j].value != "") {
            validacion = true;
        }
    }

     
    //alert(validacion);
    

    if(portada != null && $("input[name=titulo]").val() != "" && $("input[name=precio]").val()!="" && $("#ref").val()!="" && $("#desc").val()!="" && validacion==true){
        
        /* Create a FormData instance */
        var formData = new FormData();
        /* Add the file */
         //alert("que!");

        formData.append("accion", element.value); 
        formData.append("uploads[]", portada.files[0], portada.files[0].name);
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

                alert(client.statusText + " Guardado! " + client.responseText);
                //document.getElementById('up').style.display = "none";
               document.getElementById('data').innerHTML = formulario;
            }
            else {

                //alert("Un Error Ocurrió");
            }
        }
    //client.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        client.send(formData);  /* Send to server */
      
    } else{

    alert("Llene todos los campos y selecione al menos una grabación");
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