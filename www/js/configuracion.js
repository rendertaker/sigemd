 /*var db = window.openDatabase("sige", "0.1", "base de datos local", 50000);

function importar()
{
    var r = confirm("Presione OK si de verdad desde Importar");
    if (r) 
    {
        db.transaction(crea_tablas, errordb); 
        $('#barraaccion').html('Importando...');
    } 

}

function crea_tablas(tx)
{
      var sql ='CREATE TABLE IF NOT EXISTS usuario ' +
' (ID INTEGER NOT NULL, ' +
' Nombre VARCHAR(20) NOT NULL, ' +
' Clave VARCHAR(20) NOT NULL, ' +
' PRIMARY KEY (ID))'; 
    tx.executeSql(sql,[], null,errordb);
    
    
     tx.executeSql('DROP TABLE IF EXISTS confi2',[], function(tx){
                                        
sql ='CREATE TABLE IF NOT EXISTS confi2 ' +
' (ID INTEGER NOT NULL, ' +
' Atraso DOUBLE NOT NULL, ' +
' Cobrado DOUBLE NOT NULL, ' +
' Cuota DOUBLE NOT NULL, ' +
' PRIMARY KEY (ID))';
        tx.executeSql(sql, [], crea_dprestamo, errordb);}, errordb);
    
      tx.executeSql('DROP TABLE IF EXISTS prestamo',[], function(tx){
                                        
sql ='CREATE TABLE IF NOT EXISTS prestamo ' +
' (ID INTEGER NOT NULL, ' +
' Cliente VARCHAR(150) NOT NULL, ' +
' Direccion TEXT NOT NULL, ' +
' Telefono VARCHAR(20) NOT NULL, ' +
' Monto DOUBLE NOT NULL, ' +
' Cuota INTEGER NOT NULL, ' +
' Mora Double NOT NULL, ' +
' PRIMARY KEY (ID))';
        tx.executeSql(sql, [], crea_dprestamo, errordb);}, errordb);
        
                                    
 tx.executeSql('DROP TABLE IF EXISTS nota',[], function(tx){   
 sql ='CREATE TABLE IF NOT EXISTS nota ' +
' (ID INTEGER NOT NULL, ' +
' Fecha DATETIME DEFAULT CURRENT_TIMESTAMP, ' +
' Prestamo INTEGER NOT NULL, ' +
' Nombre  VARCHAR(150) NOT NULL, ' +
' Latitud DOUBLE NOT NULL, ' +
' Longitud DOUBLE NOT NULL, ' +
' Nota TEXT NOT NULL, ' +
' Sincronizado INTEGER NOT NULL, ' +
' PRIMARY KEY (ID))';
        tx.executeSql(sql, [], null, errordb);}, errordb);
    
    
tx.executeSql('DROP TABLE IF EXISTS gastos',[], function(tx){   
 sql ='CREATE TABLE IF NOT EXISTS gastos ' +
' (ID INTEGER NOT NULL, ' +
' Fecha DATETIME DEFAULT CURRENT_TIMESTAMP, ' +
' Concepto TEXT NOT NULL, ' +
' Monto DOUBLE NOT NULL, ' +
' PRIMARY KEY (ID))';
        tx.executeSql(sql, [], null, errordb);}, errordb);
    
    
    
tx.executeSql('DROP TABLE IF EXISTS ingresos',[], function(tx){   
 sql ='CREATE TABLE IF NOT EXISTS ingresos ' +
' (ID INTEGER NOT NULL, ' +
' Fecha DATETIME DEFAULT CURRENT_TIMESTAMP, ' +
' Concepto TEXT NOT NULL, ' +
' Monto DOUBLE NOT NULL, ' +
' PRIMARY KEY (ID))';
        tx.executeSql(sql, [], null, errordb);}, errordb);
        
                                     
    
}


function crea_dprestamo(tx)
{
     tx.executeSql('DROP TABLE IF EXISTS dprestamo',[], function(tx){
                                        
sql ='CREATE TABLE IF NOT EXISTS dprestamo ' +
' (ID INTEGER NOT NULL, ' +
' Prestamo INTEGER NOT NULL, ' +
' Cuota INTEGER NOT NULL, ' +
' Capital DOUBLE NOT NULL, ' +
' Interes DOUBLE NOT NULL, ' +
' Mora DOUBLE NOT NULL, ' +
' Pagado DOUBLE NOT NULL, ' +
' Fecha DATE NOT NULL, ' +
' Sincronizado INTEGER NOT NULL, ' +
' PRIMARY KEY (ID))';
        tx.executeSql(sql, [], llena_datos, errordb);
        
                                       },errordb);
    
}


function llena_datos(tx)
{
    
    
    db.transaction(function(tx)
                   {
                     tx.executeSql('DROP TABLE IF EXISTS pago',[], function(tx){
                                        
sql ='CREATE TABLE IF NOT EXISTS pago ' +
' (ID INTEGER NOT NULL, ' +
' Prestamo INTEGER NOT NULL, ' +
' Concepto TEXT NOT NULL, ' +
' Capital DOUBLE NOT NULL, ' +
' Interes DOUBLE NOT NULL, ' +
' Mora DOUBLE NOT NULL, ' +
' Monto DOUBLE NOT NULL, ' +
' Fecha DATE NOT NULL, ' +
' Nota TEXT NOT NULL, ' +
' Exportado INTEGER NOT NULL, ' +
' Sincronizado INTEGER NOT NULL, ' +
' PRIMARY KEY (ID))';
        tx.executeSql(sql, [], null, errordb);
        
                                       },errordb);
                   },errordb);
    
    $.ajax({
				type: 'post',
				dataType: 'json',
				url: eservidor.value + '/importar.php',
                data: { Zona: ezonas.value},
				success: function(json,json2)
				{
                   
                        //descargaloteria();
                        //$.afui.loadContent("#menu",false,false,"slide");    
                        //$.afui.clearHistory();
                       // inicializa();
                      
                        db.transaction(
                          function(td) 
                          {        
                            
                                td.executeSql("update configuracion set Empresa = '" + json.prestamo[0].Empresa + "', Direccion = '" + json.prestamo[0].DireccionE + "', Telefonos = '" + json.prestamo[0].Telefonos + "', Zona = '" + json.prestamo[0].Zona + "', Cobrador = '" + json.prestamo[0].Cobrador + "'"  , [],function(tx) { configurar(); }, errordb );
                        }, errordb);
                                
                                
   
                           
    
                          
                    
                    
                    
                       db.transaction(
                          function(td) 
                          {        
                            for(var a=0;a<json.prestamo.length;a++)
                            {
                                td.executeSql('INSERT INTO prestamo(ID, Cliente, Monto, Cuota, Mora,Direccion, Telefono) values(?,?,?, ?,?,?,?)' , [json.prestamo[a].ID, json.prestamo[a].Cliente, json.prestamo[a].Monto, json.prestamo[a].Cuota, json.prestamo[a].Mora, json.prestamo[a].Direccion, json.prestamo[a].Telefono],function(tx) 
                                                    {
                                                        tx.executeSql('SELECT count(*) as Cantidad FROM prestamo' , [], function(tx, resultado) 
{
  $('#barra').html('Importados ' + resultado.rows.item(0).Cantidad  + ' de ' + json.prestamo.length +  ' Prestamos');
  
}, errordb );
                                    
                                    
                                    
                                    
}, errordb);
                                
                                
   
                            }
    
                          }, errordb);
                    
                         
                    
                        db.transaction(
                          function(td) 
                          {        
                            for(var a=0;a<json.dprestamo.length;a++)
                            {
                                td.executeSql('INSERT INTO dprestamo(ID, Prestamo, Cuota, Capital, Interes, Mora, Pagado, Fecha, Sincronizado) values(?,?,?,?,?,?,?,?,1)' , [json.dprestamo[a].ID, json.dprestamo[a].Prestamo, json.dprestamo[a].Cuota, json.dprestamo[a].Capital, json.dprestamo[a].Interes, json.dprestamo[a].Mora, json.dprestamo[a].Pagado, json.dprestamo[a].Fecha],function(tx) 
                                                    {
                                                        tx.executeSql('SELECT count(*) as Cantidad FROM dprestamo' , [], function(tx, resultado) 
{
  $('#barra2').html('Importadas ' + resultado.rows.item(0).Cantidad  + ' de ' + json.dprestamo.length +  ' Cuotas');
                                                            
  if(resultado.rows.item(0).Cantidad == json.dprestamo.length)
 {
     $('#barraaccion').html('Importación Completada');
     configurar();
 }
       
                                                            
  /*db.transaction(function(tx){
    
    tx.executeSql("Select SUM((Capital + Interes) / 10) as cuota,  sum(((Capital + Interes) - Pagado))  as Atraso from dprestamo",[],function(tx, resultado)
                {*/
                   /*   eempresaconf.value = resultado.rows.item(0).Empresa;
                      edireccionconf.value = resultado.rows.item(0).Direccion;
                      etelefonosconf.value = resultado.rows.item(0).Telefonos;
                      ezonaconf.value = resultado.rows.item(0).Zona;
                      ecobradorconf.value = resultado.rows.item(0).Cobrador;
                      eservidorconf.value = resultado.rows.item(0).Servidor;
                      eprinterconf.value = resultado.rows.item(0).Printer;
                      $.afui.loadContent("#configuracion",false,false,"slide");              
               /* },errordb);
    }, errordb);*/
                                                            
                                                            
                                                            
                                                            
  
/*}, errordb );
                                                    }, errordb);
                                
                                
   
                            }
    
                          }, errordb);
                    
                        
                   
                    
                    
				},
				error:function (xhr, ajaxOptions, thrownError){
                    alert(xhr.responseText);
                    alert(thrownError);
                }    
		  });
}

function configurar()
{
      
    db.transaction(function(tx){
    
    tx.executeSql("Select * from Configuracion",[],function(tx, resultado)
                {
                      eempresaconf.value = resultado.rows.item(0).Empresa;
                      edireccionconf.value = resultado.rows.item(0).Direccion;
                      etelefonosconf.value = resultado.rows.item(0).Telefonos;
                      ezonaconf.value = resultado.rows.item(0).Zona;
                      ecobradorconf.value = resultado.rows.item(0).Cobrador;
                      eservidorconf.value = resultado.rows.item(0).Servidor;
                      eprinterconf.value = resultado.rows.item(0).Printer;
                      $.afui.loadContent("#configuracion",false,false,"slide");              
                },errordb);
    }, errordb);    
    
     
}




function guarda_configuracion()
{
   db.transaction(function(tx){
    
    tx.executeSql("update configuracion set Servidor = ?, Printer = ?, Empresa = ?",[eservidorconf.value, eprinterconf.value, eempresaconf.value], function(tx){ inicializa(1); $.afui.loadContent("#menup",false,false,"slide");  },errordb);
    
    }, errordb);   
}


function exportar()
{
    var r = confirm("Presione OK si de verdad desea Exportar");
    if (r) 
    {
    
        $('#barraaacione').html('Exportando...');                    
        db.transaction(function(tx){
    
        tx.executeSql("Select * from dprestamo where Pagado > 0 ",[],function(tx, resultado)
                {
                     var dprestamo = Create2DArray(resultado.rows.length);
                     for(var a = 0;a<resultado.rows.length;a++)
                     {
                     
                       dprestamo[a][0] = resultado.rows.item(a).ID;
                       dprestamo[a][1] =  resultado.rows.item(a).Pagado;
                      
                     }
                     var datos = JSON.stringify(dprestamo);
                     $.ajax({
				            type: 'post',
				            dataType: 'json',
				            url: eservidor.value + '/exportar.php',
                            data: { datos : datos },
				            success: function(json)
				            {
                                $('#barrae').html('Cuotas Exportadas.');
                               
                    
				            },
				            error:function (xhr, ajaxOptions, thrownError){
                                alert(xhr.responseText);
                                alert(thrownError);
                            }    
                        });
        
        
                     
                },errordb); }, errordb);  
    
                 exporta_pagos();
    }
    
}



function exporta_pagos()
{
    db.transaction(function(tx){
    
    tx.executeSql("Select * from pago where Exportado = 0 ",[],function(tx, resultado)
                {
                     
                     for(var a = 0;a<resultado.rows.length;a++)
                     {
                     
                      
                     $.ajax({
				            type: 'post',
				            dataType: 'json',
				            url: eservidor.value + '/exportar_pagos.php',
                            data: { Prestamo : resultado.rows.item(a).Prestamo, Concepto: resultado.rows.item(a).Concepto, Capital : resultado.rows.item(a).Capital, Interes : resultado.rows.item(a).Interes, Mora: resultado.rows.item(a).Mora, Monto : resultado.rows.item(a).Monto, Dispositivo : window.device.uuid, ID: resultado.rows.item(a).ID },
				            success: function(json)
				            {
                               if(json[0].Resultado == 'Listo')
                               {
                                db.transaction(function(td){
                                //alert(json[0].ID)
    td.executeSql("update pago set Exportado = 1  where ID = " + json[0].ID ,[],null,errordb)},errordb); 
                                
                               }
                    
				            },
				            error:function (xhr, ajaxOptions, thrownError){
                                alert(xhr.responseText);
                                alert(thrownError);
                            }    
                        });
                      
                     }
                     $('#barrae2').html('Pago Exportados.');
                     $('#barraaacione').html('Exportación Terminada.');
        
                     
                },errordb); }, errordb);   
}


function datos_cuadre()
{
   
    db.transaction(function(tx){
    
    tx.executeSql("Select SUM(Capital) as TCapital, SUM(Interes) as TInteres, SUM(Mora) as TMora, SUM(Monto) as TMonto from pago ",[],function(tx, resultado)
                {
                    ecapitalc.value = resultado.rows.item(0).TCapital;
                    einteresc.value = resultado.rows.item(0).TInteres;
                    emorac.value = resultado.rows.item(0).TMora;
                    etotalc.value = resultado.rows.item(0).TMonto;
        
                     
                },errordb); }, errordb);  
}

function Create2DArray(rows) {
  var arr = [];

  for (var i=0;i<rows;i++) {
     arr[i] = [];
  }

  return arr;
}*/


var db = window.openDatabase("sige", "0.1", "base de datos local", 50000);

function importar_prestamos()
{
    alertify.confirm('Presione OK si de verdad desea Importar', function()
                     { 
                        db.transaction(crea_tablas, errordb); 
                        $('#barraaccion').html('Importando...'); 
                     }, function(){ alertify.error('Cancelado')});
}

function crea_tablas(tx)
{
      var sql ='CREATE TABLE IF NOT EXISTS usuario ' +
' (ID INTEGER NOT NULL, ' +
' Nombre VARCHAR(20) NOT NULL, ' +
' Clave VARCHAR(20) NOT NULL, ' +
' PRIMARY KEY (ID))'; 
    tx.executeSql(sql,[], null,errordb);
    
    
      tx.executeSql('DROP TABLE IF EXISTS prestamo',[], function(tx){
                                        
sql ='CREATE TABLE IF NOT EXISTS prestamo ' +
' (ID INTEGER NOT NULL, ' +
' Cliente VARCHAR(150) NOT NULL, ' +
' Direccion TEXT NOT NULL, ' +
' Telefono VARCHAR(20) NOT NULL, ' +
' Monto DOUBLE NOT NULL, ' +
' Cuota INTEGER NOT NULL, ' +
' Mora Double NOT NULL, ' +
' Pago INTEGER DEFAULT 0, ' +
' PRIMARY KEY (ID))';
        tx.executeSql(sql, [], crea_dprestamo, errordb);}, errordb);
        
  
 tx.executeSql('DROP TABLE IF EXISTS detalle_pago',[], function(tx){
                                        
sql ='CREATE TABLE IF NOT EXISTS detalle_pago ' +
' (ID INTEGER NOT NULL, ' +
' Prestamo INTEGER NOT NULL, ' +
' Fecha DATE NOT NULL, ' +
' Monto DOUBLE NOT NULL, ' +
' Tipo VARCHAR(1) NOT NULL, ' +
' PRIMARY KEY (ID))';
        tx.executeSql(sql, [], null, errordb);}, errordb);    
    
    
    
 tx.executeSql('DROP TABLE IF EXISTS nota',[], function(tx){   
 sql ='CREATE TABLE IF NOT EXISTS nota ' +
' (ID INTEGER NOT NULL, ' +
' Fecha DATETIME DEFAULT CURRENT_TIMESTAMP, ' +
' Prestamo INTEGER NOT NULL, ' +
' Nombre  VARCHAR(150) NOT NULL, ' +
' Latitud DOUBLE NOT NULL, ' +
' Longitud DOUBLE NOT NULL, ' +
' Nota TEXT NOT NULL, ' +
' Sincronizado INTEGER NOT NULL, ' +
' PRIMARY KEY (ID))';
        tx.executeSql(sql, [], null, errordb);}, errordb);
    
    
    
    tx.executeSql('DROP TABLE IF EXISTS gastos',[], function(tx){   
 sql ='CREATE TABLE IF NOT EXISTS gastos ' +
' (ID INTEGER NOT NULL, ' +
' Fecha DATETIME DEFAULT CURRENT_TIMESTAMP, ' +
' Concepto TEXT NOT NULL, ' +
' Monto DOUBLE NOT NULL, ' +
' PRIMARY KEY (ID))';
        tx.executeSql(sql, [], null, errordb);}, errordb);
    
    
    
tx.executeSql('DROP TABLE IF EXISTS ingresos',[], function(tx){   
 sql ='CREATE TABLE IF NOT EXISTS ingresos ' +
' (ID INTEGER NOT NULL, ' +
' Fecha DATETIME DEFAULT CURRENT_TIMESTAMP, ' +
' Concepto TEXT NOT NULL, ' +
' Monto DOUBLE NOT NULL, ' +
' PRIMARY KEY (ID))';
        tx.executeSql(sql, [], null, errordb);}, errordb);
    
        
                                     
    
}


function crea_dprestamo(tx)
{
     tx.executeSql('DROP TABLE IF EXISTS dprestamo',[], function(tx){
                                        
sql ='CREATE TABLE IF NOT EXISTS dprestamo ' +
' (ID INTEGER NOT NULL, ' +
' Prestamo INTEGER NOT NULL, ' +
' Cuota INTEGER NOT NULL, ' +
' Capital DOUBLE NOT NULL, ' +
' Interes DOUBLE NOT NULL, ' +
' Mora DOUBLE NOT NULL, ' +
' Pagado DOUBLE NOT NULL, ' +
' Fecha DATE NOT NULL, ' +
' Sincronizado INTEGER NOT NULL, ' +
' PRIMARY KEY (ID))';
        tx.executeSql(sql, [], llena_datos, errordb);
        
                                       },errordb);
    
}


function llena_datos(tx)
{
    
    
    db.transaction(function(tx)
                   {
                     tx.executeSql('DROP TABLE IF EXISTS pago',[], function(tx){
                                        
sql ='CREATE TABLE IF NOT EXISTS pago ' +
' (ID INTEGER NOT NULL, ' +
' Prestamo INTEGER NOT NULL, ' +
' Concepto TEXT NOT NULL, ' +
' Capital DOUBLE NOT NULL, ' +
' Interes DOUBLE NOT NULL, ' +
' Mora DOUBLE NOT NULL, ' +
' Monto DOUBLE NOT NULL, ' +
' Fecha DATETIME DEFAULT CURRENT_TIMESTAMP, ' + 
' Nota TEXT NOT NULL, ' +
' Exportado INTEGER NOT NULL, ' +
' Sincronizado INTEGER NOT NULL, ' +
' PRIMARY KEY (ID))';
        tx.executeSql(sql, [], null, errordb);
        
                                       },errordb);
                   },errordb);
    
    $.ajax({
				type: 'post',
				dataType: 'json',
				url: eservidor.value + '/importar.php',
                data: { Zona:$("input[name=ezonas]:checked").val()},
				success: function(json,json2)
				{
                   
                        //descargaloteria();
                        //$.afui.loadContent("#menu",false,false,"slide");    
                        //$.afui.clearHistory();
                       // inicializa();
                      
                        db.transaction(
                          function(td) 
                          {        
                            
                                td.executeSql("update configuracion set Empresa = '" + json.prestamo[0].Empresa + "', Direccion = '" + json.prestamo[0].DireccionE + "', Telefonos = '" + json.prestamo[0].TelefonosE + "', Zona = '" + json.prestamo[0].Zona + "', Cobrador = '" + json.prestamo[0].Cobrador + "'"  , [],function(tx) { configurar(); }, errordb );
                        }, errordb);
                                
                                
   
                           
    
                          
                    
                    
                    
                       db.transaction(
                          function(td) 
                          {        
                            for(var a=0;a<json.prestamo.length;a++)
                            {
                                td.executeSql('INSERT INTO prestamo(ID, Cliente, Monto, Cuota, Mora,Direccion, Telefono) values(?,?,?, ?,?,?,?)' , [json.prestamo[a].ID, json.prestamo[a].Cliente, json.prestamo[a].Monto, json.prestamo[a].Cuota, json.prestamo[a].Mora, json.prestamo[a].Direccion, json.prestamo[a].Telefono],function(tx) 
                                                    {
                                                        tx.executeSql('SELECT count(*) as Cantidad FROM prestamo' , [], function(tx, resultado) 
{
  $('#barra').html('Importados ' + resultado.rows.item(0).Cantidad  + ' de ' + json.prestamo.length +  ' Prestamos');
  
}, errordb );
}, errordb);
                                
                                
   
                            }
    
                          }, errordb);
                    
                         
                    
                        db.transaction(
                          function(td) 
                          {        
                            for(var a=0;a<json.dprestamo.length;a++)
                            {
                                td.executeSql('INSERT INTO dprestamo(ID, Prestamo, Cuota, Capital, Interes, Mora, Pagado, Fecha, Sincronizado) values(?,?,?,?,?,?,?,?,1)' , [json.dprestamo[a].ID, json.dprestamo[a].Prestamo, json.dprestamo[a].Cuota, json.dprestamo[a].Capital, json.dprestamo[a].Interes, json.dprestamo[a].Mora, json.dprestamo[a].Pagado, json.dprestamo[a].Fecha],function(tx) 
                                                    {
                                                        tx.executeSql('SELECT count(*) as Cantidad FROM dprestamo' , [], function(tx, resultado) 
{
  $('#barra2').html('Importadas ' + resultado.rows.item(0).Cantidad  + ' de ' + json.dprestamo.length +  ' Cuotas');
                                                            
  if(resultado.rows.item(0).Cantidad == json.dprestamo.length)
       $('#barraaccion').html('Importación Completada');
  
}, errordb );
                                                    }, errordb);
                                
                                
   
                            }
    
                          }, errordb);
                    
                        
                   
                    
                    
				},
				error:function (xhr, ajaxOptions, thrownError){
                    alertify.alert(xhr.responseText);
                    alertify.alert(thrownError);
                }    
		  });
}

function configurar()
{
     
  entra_configuracion();
  llena_parametros();
  Materialize.toast('Datos Importados', 3000, 'rounded')
     
}




function guarda_configuracion()
{
   db.transaction(function(tx){
    
    tx.executeSql("update configuracion set Servidor = ?, Printer = ?, Empresa = ?",[eservidorconf.value, eprinterconf.value, eempresaconf.value], function(tx){ inicializa(1); Materialize.toast('Datos Guardados', 3000, 'rounded') },errordb);
    
    }, errordb);   
}


function exportar_Cuadre()
{
    alertify.confirm('Presione OK si de verdad desea Exportar', function()
                     {  
                        $('#barraaacione').html('Exportando...');                    
        
                        db.transaction(function(tx){
    
                        tx.executeSql("Select * from dprestamo where Pagado > 0 ",[],function(tx, resultado)
                        {
                            var dprestamo = Create2DArray(resultado.rows.length);
                            for(var a = 0;a<resultado.rows.length;a++)
                            { 
                                dprestamo[a][0] = resultado.rows.item(a).ID;
                                dprestamo[a][1] =  resultado.rows.item(a).Pagado;
                      
                            }
                            var datos = JSON.stringify(dprestamo);
                            $.ajax({
				                type: 'post',
				                dataType: 'json',
				                url: eservidor.value + '/exportar.php',
                                data: { datos : datos },
				                success: function(json)
				                {
                                    $('#barrae').html('Cuotas Exportadas.');
                               
                    
				                },
				                error:function (xhr, ajaxOptions, thrownError){
                                    alertify.alert(xhr.responseText);
                                    alertify.alert(thrownError);
                                }    
                            });
        
                        },errordb); }, errordb);  
    
                //***************************************************************************
        
                /*db.transaction(function(tx){
    
                tx.executeSql("Select * from detalle_pago",[],function(tx, resultado)
                {
                     var dprestamo = Create2DArray(resultado.rows.length);
                     for(var a = 0;a<resultado.rows.length;a++)
                     {
                     
                       dprestamo[a][0] = resultado.rows.item(a).Prestamo;
                       dprestamo[a][1] =  resultado.rows.item(a).Monto;
                       dprestamo[a][2] = resultado.rows.item(a).Fecha;
                       dprestamo[a][3] =  resultado.rows.item(a).Tipo;
                      
                     }
                     var datos = JSON.stringify(dprestamo);
                     $.ajax({
				            type: 'post',
				            dataType: 'json',
				            url: eservidor.value + '/exportar_detalle.php',
                            data: { datos : datos },
				            success: function(json)
				            {
                                $('#barrae').html('Detalles Exportados.');
                               
                    
				            },
				            error:function (xhr, ajaxOptions, thrownError){
                                alertify.alert(xhr.responseText);
                                alertify.alert(thrownError);
                            }    
                        });
        
        
                     
                },errordb); }, errordb);  */
        
                
        
        
        
                //***************************************************************************
                
        
        
                 exporta_pagos(); 
        
        
        
        
        
        
        
                     }, function(){ alertify.error('Cancelado')});
    
    
}



function exporta_pagos()
{
   
    db.transaction(function(tx){
    
    tx.executeSql("Select * from pago where Exportado = 0 ",[],function(tx, resultado)
                {
                      //alert(resultado.rows.length);
                     for(var a = 0;a<resultado.rows.length;a++)
                     {
                     
                      
                        $.ajax({
				            type: 'post',
				            dataType: 'json',
				            url: eservidor.value + '/exportar_pagos.php',
                            data: { Prestamo : resultado.rows.item(a).Prestamo, Concepto: resultado.rows.item(a).Concepto, Capital : resultado.rows.item(a).Capital, Interes : resultado.rows.item(a).Interes, Mora: resultado.rows.item(a).Mora, Monto : resultado.rows.item(a).Monto, Dispositivo : window.device.uuid, ID: resultado.rows.item(a).ID },
				            success: function(json)
				            {
                               if(json[0].Resultado == 'Listo')
                               {
                                db.transaction(function(td){
                                //alert(json[0].ID)
                                td.executeSql("update pago set Exportado = 1  where ID = " + json[0].ID ,[],null,errordb)},errordb); 
                                
                               }
                    
				            },
				            error:function (xhr, ajaxOptions, thrownError){
                                alertify.alert(xhr.responseText);
                                alertify.alert(thrownError);
                            }    
                            });
                      
                     }
                     $('#barrae2').html('Pago Exportados.');
                     $('#barraaacione').html('Exportación Terminada.');
        
                     
                },errordb); }, errordb);   
}


function datos_cuadre()
{
   
    db.transaction(function(tx)
    {
    
        tx.executeSql("Select SUM(Capital) as TCapital, SUM(Interes) as TInteres, SUM(Mora) as TMora, SUM(Monto) as TMonto from pago ",[],function(tx, resultado)
                {
                    ecapitalc.value = resultado.rows.item(0).TCapital;
                    einteresc.value = resultado.rows.item(0).TInteres;
                    emorac.value = resultado.rows.item(0).TMora;
                    etotalc.value = resultado.rows.item(0).TMonto;
                    Materialize.updateTextFields();
                     
                },errordb); 
    }, errordb);
    
    

     $('#ddetalle_pago').html('');
     
    
    
    db.transaction(function(tx)
     {
        tx.executeSql("Select a.Prestamo, b.Cliente, SUM(a.Monto) as Monto from detalle_pago a, prestamo b where a.Prestamo = b.ID and a.Tipo = 'A' group by a.Prestamo ",[],function(tx, resultado)
                {
                    html = '<table width="100%">';
                    html += '<tr style="background-color:#000; color:#FFF;">';
                    html += '<td colspan="3" align="center">ATRASOS</td>';
                    html += '</tr>';
                    for(a=0;a<resultado.rows.length;a++)
                    {
                     html += '<tr>';
                     html += '<td width="10%">' + resultado.rows.item(a).Prestamo + '</td>';    
                     html += '<td width="60%">' + resultado.rows.item(a).Cliente + '</td>';
                     html += '<td width="30%" align="right">' + resultado.rows.item(a).Monto + '</td>';    
                     html += '</tr>';
                    }
                    html += "</table>";
                    $('#ddetalle_pago').append(html);
                     
                },errordb); 
     }, errordb);
    
    
    db.transaction(function(tx)
     {
        tx.executeSql("Select a.Prestamo, b.Cliente, SUM(a.Monto) as Monto from detalle_pago a, prestamo b where a.Prestamo = b.ID and a.Tipo = 'N' group by a.Prestamo ",[],function(tx, resultado)
                {
                    html = '<table width="100%">';
                    html += '<tr style="background-color:#000; color:#FFF;">';
                    html += '<td colspan="3" align="center">COBROS DEL DIA</td>';
                    html += '</tr>';
                    for(a=0;a<resultado.rows.length;a++)
                    {
                     html += '<tr>';
                     html += '<td width="10%">' + resultado.rows.item(a).Prestamo + '</td>';    
                     html += '<td width="60%">' + resultado.rows.item(a).Cliente + '</td>';
                     html += '<td width="30%" align="right">' + resultado.rows.item(a).Monto + '</td>';    
                     html += '</tr>';
                    }
                    html += "</table>";
                    $('#ddetalle_pago').append(html);
                     
                },errordb); 
     }, errordb);
     
    db.transaction(function(tx)
     {
        
        
        
        tx.executeSql("Select a.Prestamo, b.Cliente, SUM(a.Monto) as Monto from detalle_pago a, prestamo b where a.Prestamo = b.ID and a.Tipo = 'P' group by a.Prestamo ",[],function(tx, resultado)
                {
                    html = '<table width="100%">';
                    html += '<tr style="background-color:#000; color:#FFF;">';
                    html += '<td colspan="3" align="center">ADELANTOS</td>';
                    html += '</tr>';
                    for(a=0;a<resultado.rows.length;a++)
                    {
                     html += '<tr>';
                     html += '<td width="10%">' + resultado.rows.item(a).Prestamo + '</td>';    
                     html += '<td width="60%">' + resultado.rows.item(a).Cliente + '</td>';
                     html += '<td width="30%" align="right">' + resultado.rows.item(a).Monto + '</td>';    
                     html += '</tr>';
                    }
                    html += "</table>";
                    $('#ddetalle_pago').append(html);
                     
                },errordb); 
        
        
        
        /*tx.executeSql("Select Fecha, sum(Monto) as Monto from detalle_pago  where Tipo = 'P' group by Fecha",[],function(tx, resultado)
                {
                    html = '<table width="100%"> ';
                    html += '<tr style="background-color:#000; color:#FFF;">';
                    html += '<td colspan="2" align="center">ADELANTOS</td>';
                    html += '</tr>';
                    for(a=0;a<resultado.rows.length;a++)
                    {
                    // var f = resultado.rows.item(a).Fecha;
                     //var fecha = "" + ("0" + f.getDate()).slice(-2) + "/" + ("0" + (f.getMonth() + 1)).slice(-2) + "/" +  f.getFullYear() + "" ;
                     html += '<tr>';
                    // html += '<td width="10%">' + resultado.rows.item(a).Prestamo + '</td>';    
                     html += '<td width="50%">' + resultado.rows.item(a).Fecha + '</td>';
                    // html += '<td width="60%">' + resultado.rows.item(a).Cliente + '</td>';
                     html += '<td width="50%" align="right">' + resultado.rows.item(a).Monto + '</td>';    
                     html += '</tr>';
                    }
                    html += "</table>";
        
                    $('#ddetalle_pago').append(html);
                },errordb); */
     }, errordb);
    
 
}

function Create2DArray(rows) {
  var arr = [];

  for (var i=0;i<rows;i++) {
     arr[i] = [];
  }

  return arr;
}
