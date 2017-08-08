var db = window.openDatabase("sige", "0.1", "base de datos local", 50000);

function sincronizar()
{
   
    /*db.transaction(function(tx){
    
    tx.executeSql("Select * from pago where Sincronizado = 0 ",[],function(tx, resultado)
                {
                     
                     for(var a = 0;a<resultado.rows.length;a++)
                     {
                     
                      
                     $.ajax({
				            type: 'post',
				            dataType: 'json',
				            url: 'http://www.gestionesinmobiliarias.info/sige/importar.php',
                            data: {  Prestamo : resultado.rows.item(a).Prestamo, Concepto: resultado.rows.item(a).Concepto, Capital : resultado.rows.item(a).Capital, Interes : resultado.rows.item(a).Interes, Mora: resultado.rows.item(a).Mora, Monto : resultado.rows.item(a).Monto, Dispositivo : window.device.uuid, ID: resultado.rows.item(a).ID },
				            success: function(json)
				            {
                               if(json[0].Resultado == 'Listo')
                               {
                                db.transaction(function(td){
                                //alert(json[0].ID)
    td.executeSql("update pago set Sincronizado = 1  where ID = " + json[0].ID ,[],null,errordb)},errordb); 
                                          
                               }
                    
				            },
				            error:function (xhr, ajaxOptions, thrownError){
                                alert(xhr.responseText);
                                alert(thrownError);
                            }    
                        });
                      
                     }
                  //   $('#barras').html('Pago(s) Exportados.');
                //     $('#barraaccions').html('Sincronizacion Terminada.');
        
                     
                },errordb); }, errordb);
    
    
    
    
    
   db.transaction(function(tx){
    tx.executeSql("Select * from dprestamo where Sincronizado = 0 ",[],function(tx, resultado)
                {
                     
                     for(var a = 0;a<resultado.rows.length;a++)
                     {
                     
                      
                     $.ajax({
				            type: 'post',
				            dataType: 'json',
				            url: 'http://www.gestionesinmobiliarias.info/sige/importar_cuotas.php',
                            data: {  Pagado : resultado.rows.item(a).Pagado, ID: resultado.rows.item(a).ID },
				            success: function(json)
				            {
                               if(json[0].Resultado == 'Listo')
                               {
                                db.transaction(function(td){
                                //alert(json[0].ID)
    td.executeSql("update dprestamo set Sincronizado = 1  where ID = " + json[0].ID ,[],null,errordb)},errordb); 
                                          
                               }
                    
				            },
				            error:function (xhr, ajaxOptions, thrownError){
                                alert(xhr.responseText);
                                alert(thrownError);
                            }    
                        });
                      
                     }
                //     $('#barras').html('Pago(s) Sincronizados.');
                //     $('#barra2s').html('Cuota(s) Sincronizadas');
                //     $('#barraaccions').html('Sincronizacion Terminada.');
        
                     
                },errordb); }, errordb);
    
    
    
     db.transaction(function(tx){
    
    tx.executeSql("Select * from nota where Sincronizado = 0 ",[],function(tx, resultado)
                {
                     
                     for(var a = 0;a<resultado.rows.length;a++)
                     {
                     
                     $.ajax({
				            type: 'post',
				            dataType: 'json',
				            url: 'http://www.gestionesinmobiliarias.info/sige/importar_nota.php',
                            data: {  Prestamo : resultado.rows.item(a).Prestamo, Latitud: resultado.rows.item(a).Latitud, Longitud : resultado.rows.item(a).Longitud, Nota : resultado.rows.item(a).Nota, Fecha: resultado.rows.item(a).Fecha, ID: resultado.rows.item(a).ID , Nombre: resultado.rows.item(a).Nombre},
				            success: function(json)
				            {
                                //alert(json[0].Query);
                               if(json[0].Resultado == 'Listo')
                               {
                                   
                                db.transaction(function(td){
                                //alert(json[0].ID)
    td.executeSql("update nota set Sincronizado = 1  where ID = " + json[0].ID ,[],null,errordb)},errordb); 
                                          
                               }
                    
				            },
				            error:function (xhr, ajaxOptions, thrownError){
                                alert(xhr.responseText);
                                alert(thrownError);
                            }    
                        });
                      
                     }
                  //   $('#barras').html('Pago(s) Exportados.');
                //     $('#barraaccions').html('Sincronizacion Terminada.');
        
                     
                },errordb); }, errordb);*/
    
    
    
}