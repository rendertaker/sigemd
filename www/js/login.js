
var db = window.openDatabase("sige", "0.1", "base de datos local", 65535);      






function probar()
{
    alert('Voy a imprimir');
    
   
         /*  cpclData &= "TEXT 0 3 10 100 Prestamo No.: " & Prestamo & "        Fecha: " & DateTime.Now().ToString("dd/MM/yyyy") & vbCr & vbLf
            cpclData &= "TEXT 0 3 10 140 Nombre: " & Nombre & vbCr & vbLf
            cpclData &= "TEXT 0 3 10 180 Concepto:" & vbCr & vbLf
            cpclData &= "ML 27" & vbCr & vbLf
            cpclData &= "TEXT 0 3 10 220" & vbCr & vbLf
            Dim concept() = Split(Concepto, Chr(10))
            Dim a = 0
            For a = 0 To concept.Length - 1
                cpclData &= concept(a) & vbCr & vbLf
            Next a
            cpclData &= "ENDML" & vbCr & vbLf



            ''
            cpclData &= "TEXT 5 3 10 " & (a * 40) + 260 & " Monto: " & Monto & vbCr & vbLf


            cpclData &= "LINE 10 " & (a * 40) + 450 & " 500 " & (a * 40) + 450 & " 1" & vbCr & vbLf
            cpclData &= "TEXT 0 3 200 " & (a * 40) + 470 & " Cobrador " & vbCr & vbLf
            cpclData &= "TEXT 0 3 10 " & (a * 40) + 510 & "***NO SOMOS RESPONSABLES DE DINERO ENTREGADO SIN RECIBO FIRMADO***" & vbCr & vbLf
            cpclData &= "FORM" & vbCr & vbLf & "PRINT" & vbCr & vbLf*/
    
    
    
    //alert(impri);
    //"^XA^FO10,10^AFN,26,13^FDHello, World!^FS^XZ"
    
    
    var impri = "! DF RUN.BAT\n" +
                "! UTILITIES\n" +
                "JOURNAL\n" +
                "SETFF 50 5\n" +
                "PRINT\n";
    
    
    
    impri = "! 0 200 200 210 1\n" +
            "TEXT 4 0 30 40 Hello World\n" +
            "PRINT\n";
    
    cordova.plugins.zbtprinter.print(impri,
    function(success) { 
        alertify.alert("Print ok"); 
    }, function(fail) { 
        alert(fail); 
    }
);
    
 
}


function valida_login()
{
    
   $.ajax({
				type: 'post',
				dataType: 'json',
				url: eservidor.value + '/movilajax.php',
                data: { op:'loginconf', Usuario: eusuario.value, Clave: eclave.value},
				success: function(json)
				{
                    if(json[0].Resultado=='Listo')
                    {
                        //descargaloteria();
                        //$.afui.clearHistory();
                        $('#contenedor').load('menuadmin.html');
                        
                    }
                    else
                    {
                      Materialize.toast('Login Invalido', 3000, 'rounded');
                    }
                    
                    
				},
				error:function (xhr, ajaxOptions, thrownError){
                    alertify.alert(xhr.responseText);
                    alertify.alert(thrownError);
                }    
		  });      
}




function lista_zona()
{
     $.ajax({
				type: 'post',
				dataType: 'json',
				url: eservidor.value + '/movilajax.php',
                data: { op:'lista_zona'},
				success: function(json)
				{
                    
                    var html = '';
                    for(var a=0;a<json.length;a++)
                    {
                        
                        //$("#ezonas").append('<option value="'+ json[a].ID+'">'+ json[a].Nombre+'</option>');
                      html += ' <p><input class="with-gap" name="ezonas" type="radio" id="ezonas' + json[a].ID + '" value="' + json[a].ID + '" /><label for="ezonas' + json[a].ID + '">' + json[a].Nombre + '</label></p>';
                    }
                    //alert(html);
                    $('#dzona').html(html);
                    
				},
				error:function (xhr, ajaxOptions, thrownError){
                    alertify.alert(xhr.responseText);
                    alertify.alert(thrownError);
                }    
		  });      
}