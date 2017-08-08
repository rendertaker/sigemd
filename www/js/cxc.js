 var db = window.openDatabase("sige", "0.1", "base de datos local", 50000);
 var detalle = 0;



function marca()
{
 
                     db.transaction(function(tx)
                 {
                    var sql = "select * from pago";
                    tx.executeSql( sql, [],function(tx, resultados)
                                  {
                                     for(a=0;a<resultados.rows.length;a++)                     
                                    {
                                       document.getElementById( "listp" + resultados.rows.item(a).Prestamo).style.color = "blue";
                                        
                                    }
                                  }
                                  , null);}, null);
    
    
    
    
     db.transaction(function(tx)
                 {
                    var sql = "select Prestamo,sum((Capital + Interes) - Pagado) as Total from dprestamo group by Prestamo" ;
                    tx.executeSql( sql, [],function(tx, resultados)
                                  {
                                     for(a=0;a<resultados.rows.length;a++)                     
                                    {
                                     if(resultados.rows.item(a).Total <=0)
                                        document.getElementById("listp" + resultados.rows.item(a).Prestamo).style.color = "green";          
                                    }
                                  }
                                  
                                  
                                  
                                  
                                  , null );}, null);
    
     db.transaction(function(tx)
                 {
                    var f = new Date();
    var fecha = "" + f.getFullYear() + "-" + ("0" + (f.getMonth() + 1)).slice(-2) + "-" + ("0" + f.getDate()).slice(-2) + "" ;
                    var sql = "select Prestamo,Max(Cuota) as Cuo from dprestamo where Fecha <  '" + fecha + "' group by Prestamo" ;
                    tx.executeSql( sql, [],function(tx, resultados)
                                  {
                                     for(a=0;a<resultados.rows.length;a++)                     
                                    {
                                        
                                     if(resultados.rows.item(a).Cuo ==13)
                                        document.getElementById("listp" + resultados.rows.item(a).Prestamo).style.color = "red";          
                                    }
                                  }
                                  
                                  
                                  
                                  
                                  , null );}, null);
    
    
    
}



function busca_prestamo()
{
 
  db.transaction(function(tx)
                 {
                    var sql = "SELECT * from prestamo where Cliente like '%" + enombre.value + "%'";
                    tx.executeSql( sql, [], muestra_prestamos, errordb );}, errordb);    
}




function muestra_prestamos(tx, resultado)
{
    $('.prestamos').remove();
    var html = '<table class="striped highlight"> <tbody>';
    var parametros = [];
    
    for(a=0;a<resultado.rows.length;a++) 
    {
        parametros[0] = resultado.rows.item(a).ID;
        parametros[1] = resultado.rows.item(a).Cliente;
        parametros[2] = resultado.rows.item(a).Monto;
        parametros[3] = resultado.rows.item(a).Mora;
        parametros[4] = resultado.rows.item(a).Direccion;
        parametros[5] = resultado.rows.item(a).Telefono;
        parametros[6] = resultado.rows.item(a).Pago;
        
        clase = "negro";
        if(parametros[6] == '1')
        {
            clase = "azul";
        }
        html += '<tr class="prestamos ' + clase + '">';
        html += '<td width="5%" ' + resultado.rows.item(a).ID + '</td>';
        html += '<td width="20%" align="center">' + resultado.rows.item(a).ID + '</td>';
        html += '<td width="40%">' + resultado.rows.item(a).Cliente + '</td>';
        html += '<td width="20%" align="right">' + resultado.rows.item(a).Monto + '</td>';
        html += '<td width="15%" align="center"><a class="btn-floating btn-large waves-effect waves-light blue" href="javascript:ver_prestamo(' + parametros[0]  + ',' + escape("'") +  parametros[1] + escape("'") +   ',' + escape("'") +  parametros[2] + escape("'") + ', ' + escape("'") +  resultado.rows.item(a).Cuota + escape("'") + ', ' + escape("'") +  parametros[3] + escape("'") + ', ' + escape("'") +  parametros[4] + escape("'") + ', ' + escape("'") +  parametros[5] + escape("'") + ', ' + escape("'") +  parametros[6] + escape("'") + ');"><p style="vertical-align:top;"><img src="icon/ficha.png"/></p></a></td>';
        html += '</tr>';
        
        
    }
        
    
    html +=  '</tbody></table>';
    $('#dcxc').append(html);
    
    marca();
    
}

function ver_prestamo(id, cliente, monto, cuota, mxd, direccion, telefono, pago)
{  
    
     eidpre.value = id;
     eclientepre.value = cliente; 
     emontopre.value = monto;
     ecuotapre.value = cuota;
     emxdpre.value = mxd;
     edireccionpre.value = direccion;
     etelefonopre.value = telefono;
     ep.value = pago;
     $('#contenedor').load('pago.html');
    // alertify.alert('Llegue aqui full');
    
    

     
}


function detalla_pago(total)
{
    detalle = total;
    db.transaction(function(tx)
    {   
        var f = new Date();
        var fecha = "" + f.getFullYear() + "-" + ("0" + (f.getMonth() + 1)).slice(-2) + "-" + ("0" + f.getDate()).slice(-2) + "" ;
        var sql = "Select *, (Interes + Capital) as Monto from dprestamo where Fecha = '" + fecha + "' and prestamo = " + eprestamop.value ;                
        tx.executeSql( sql, [],function(tx, resultado)
        {
            if(detalle > (resultado.rows.item(0).Monto - resultado.rows.item(0).Pagado))
            {
               
                detalle = detalle - (resultado.rows.item(0).Monto - resultado.rows.item(0).Pagado);
                db.transaction(function(tx)
                {   
                    var f = new Date();
                    var fecha = "" + f.getFullYear() + "-" + ("0" + (f.getMonth() + 1)).slice(-2) + "-" + ("0" + f.getDate()).slice(-2) + "" ;
                    var sql = "insert into detalle_pago (Prestamo, Monto, Tipo, Fecha) values (" + eprestamop.value  + "," +(resultado.rows.item(0).Monto - resultado.rows.item(0).Pagado)  + ",'N','"  + fecha +  "')" ;
                    tx.executeSql( sql, [],null, errordb);
                },errordb);
                
                	
                tx.executeSql( "Select sum(Interes + Capital) as Monto, sum(Pagado) as Pagado from dprestamo where Fecha < '" + fecha + "' and prestamo = " + eprestamop.value,[],function(tx, resultado)
                {
                    if(detalle > (resultado.rows.item(0).Monto - resultado.rows.item(0).Pagado))
                    {
                       detalle = detalle - (resultado.rows.item(0).Monto - resultado.rows.item(0).Pagado);
                       db.transaction(function(tx)
                       {   
                         var f = new Date();
                         var fecha = "" + f.getFullYear() + "-" + ("0" + (f.getMonth() + 1)).slice(-2) + "-" + ("0" + f.getDate()).slice(-2) + "" ;
                         var sql = "insert into detalle_pago (Prestamo, Monto, Tipo, Fecha) values (" + eprestamop.value  + "," +(resultado.rows.item(0).Monto - resultado.rows.item(0).Pagado)  + ",'A','"  + fecha +  "')" ;
                         tx.executeSql( sql, [],null, errordb);
                        },errordb);
                        
                        //*****************************************************************************************
                        tx.executeSql( "Select *, (Interes + Capital) as Monto, Pagado from dprestamo where Fecha > '" + fecha + "' and prestamo = " + eprestamop.value,[],function(tx, resultado)
                        {
                         for(a=0;a<resultado.rows.length;a++)
                         {
                            if(detalle > (resultado.rows.item(a).Monto - resultado.rows.item(a).Pagado))
                            {
                                detalle = detalle - (resultado.rows.item(a).Monto - resultado.rows.item(a).Pagado);
                               // db.transaction(function(tx)
                                //{   
                                   
                                    var sql = "insert into detalle_pago (Prestamo, Monto, Tipo, Fecha) values (" + eprestamop.value  + "," +(resultado.rows.item(a).Monto - resultado.rows.item(a).Pagado)  + ",'P','"  + resultado.rows.item(a).Fecha +  "')" ;
                                    tx.executeSql( sql, [],null, errordb);
                                //},errordb);
                        
                            }
                            else
                            {
                                detalle = 0;
                                //db.transaction(function(tx)
                                //{   
                                    var sql = "insert into detalle_pago (Prestamo, Monto, Tipo, Fecha) values (" + eprestamop.value  + "," +(resultado.rows.item(a).Monto - resultado.rows.item(a).Pagado)  + ",'P','"  + resultado.rows.item(a).Fecha +  "')" ;
                                    tx.executeSql( sql, [],null, errordb);
                                //},errordb); 
                                break;
                            }
                         }
                       },errordb);
                        
                        
                        
                        //******************************************************************************************
                        
                        
                        
                        
                        
                    }
                    else
                    {
                        
                        detalle = 0;
                        db.transaction(function(tx)
                        {   
                            var f = new Date();
                            var fecha = "" + f.getFullYear() + "-" + ("0" + (f.getMonth() + 1)).slice(-2) + "-" + ("0" + f.getDate()).slice(-2) + "" ;
                            var sql = "insert into detalle_pago (Prestamo, Monto, Tipo, Fecha) values (" + eprestamop.value  + "," +(resultado.rows.item(0).Monto - resultado.rows.item(0).Pagado)  + ",'A','"  + fecha +  "')" ;
                            tx.executeSql( sql, [],null, errordb);
                        },errordb);
                        
                    }
                },errordb);
                       
            }
            else
            {
                detalle = 0;
                db.transaction(function(tx)
                {   
                    var f = new Date();
                    var fecha = "" + f.getFullYear() + "-" + ("0" + (f.getMonth() + 1)).slice(-2) + "-" + ("0" + f.getDate()).slice(-2) + "" ;
                    var sql = "insert into detalle_pago (Prestamo, Monto, Tipo, Fecha) values (" + eprestamop.value  + "," +(resultado.rows.item(0).Monto - resultado.rows.item(0).Pagado)  + ",'N','"  + fecha +  "')" ;
                    tx.executeSql( sql, [],null, errordb);
                },errordb); 
            }
        },
        errordb);
    },
    errordb);
}



function evalua_pago()
{
    if(ep.value==1)
    {
        alertify.confirm('Pago', 'El Cliente ya pago el dia de hoy desea realizarle otro pago? ', function(){ pagar(); }
                , function(){ alertify.error('Cancel')});
    }
    else
    {
        pagar();
    }
}






function pagar()
{
 saldoc = parseFloat(esaldopre.value);
 pagoc = parseFloat(epago.value);
 if(saldoc >= pagoc)
 { 
    esaldopre.value = esaldopre.value - epago.value;
    $('#esaldop').html('<strong>' + formatNumber.new(esaldopre.value) + '</strong>');
    db.transaction(function(tx)
    {   
        var sql = "update prestamo set Pago = 1 Where ID = " + eprestamop.value;
        tx.executeSql( sql, [],null, errordb);
    },errordb);
    ep.value = 1;
    var total = epago.value;
    detalla_pago(epago.value); 
    var concepto = "";
    var morapagada = 0;
    var mora = emora.value;
    morapagada = mora - total;
    if(morapagada <=0 && mora > 0)
    {
        morapagada = mora;
        concepto = 'RD$ ' + mora + ' de Pago Mora Generada a la Fecha ';
        
    }
    else
    {
        if(mora > 0)
        {
            concepto = 'Abono RD ' + total + ' a Mora Generada a la Fecha ';
            morapagada = total;
        }
        else    
            morapagada = 0; 
    }
    
    
    
    
    total -= mora;
   
    var tip = 0;
    var tcp = 0;
    var cp = 0;
    var ip = 0;
    
    if(total > 0)
    {
       db.transaction(function(tx)
        {
            var sql = "select *, ((Capital + Interes) - Pagado) as Monto, (Interes - Pagado) as IP  from dprestamo where Prestamo = " + eprestamop.value + " and (Capital + Interes - Pagado) > 0" ;
            tx.executeSql( sql, [],function(tx, resultado)
             {
                
                for(var a=0;a<resultado.rows.length;a++)
                if(total > 0)
                {
                  var pagado = resultado.rows.item(a).Pagado;
                  if(total >= resultado.rows.item(a).Monto)
                  {
                    if(resultado.rows.item(a).IP <= 0)
                    {
                        ip = 0;
                        cp = resultado.rows.item(a).Capital + resultado.rows.item(a).IP; 
                    }
                    else
                    {
                      ip = resultado.rows.item(a).IP; 
                      cp = resultado.rows.item(a).Capital;
                    }
                    total -= resultado.rows.item(a).Monto;
                    pagado = resultado.rows.item(a).Capital + resultado.rows.item(a).Interes;
                    concepto += "Saldo Cuota No." + resultado.rows.item(a).Cuota + " ";
                  }
                  else
                  {
                      if(resultado.rows.item(a).IP <= 0)
                      {
                          ip = 0;
                          cp = total; 
                      }
                      else
                      {
                         ip = resultado.rows.item(a).IP - total;
                         if(ip < 0)
                         {
                             cp = -1 * ip;
                             ip = resultado.rows.item(a).IP;
                         }
                         else
                         {
                             ip = total;
                             cp = 0;
                         }
                                                 
                      }
                      pagado = resultado.rows.item(a).Pagado + total;
                      concepto += "Abono RD$ " + total + " a Cuota No. " + resultado.rows.item(a).Cuota +  " ";
                      total = 0;
                      
                  }
                   tcp += cp;
                   tip += ip;
                   tx.executeSql('update dprestamo set Pagado = ' +  pagado  + ', Sincronizado = 0 where ID = '  +  resultado.rows.item(a).ID ,[],null, errordb);
                    
                    
                }
                
                db.transaction(function(tx)
                {
                 concepto += " de " + ecuotap.value ;   
                 var f = new Date();
                 var fecha = "" + f.getFullYear() + "-" + ("0" + (f.getMonth() + 1)).slice(-2) + "-" + ("0" + f.getDate()).slice(-2) + "" ;
                 var sql = "insert into pago (Prestamo, Monto, Concepto, Interes, Capital, Mora, Nota, Exportado, Sincronizado) values (" + eprestamop.value  + "," + epago.value  + ",'" + concepto  + "'," + tip  + "," + tcp + ", " + morapagada  + ",'',0,0)" ;
                  //  alert("Estamos Aqui");
                    tx.executeSql( sql, [],imprime, errordb);
                },errordb);
                
             },errordb);
       },errordb);
    }
    else
    {
        db.transaction(function(tx)
                {   
                 var f = new Date();
                 var fecha = "" + f.getFullYear() + "-" + ("0" + (f.getMonth() + 1)).slice(-2) + "-" + ("0" + f.getDate()).slice(-2) + "" ;
            var sql = "insert into pago (Prestamo, Monto, Concepto, Interes, Capital, Mora, Fecha, Nota, Exportado, Sincronizado) values (" + eprestamop.value  + "," + epago.value  + ",'" + concepto  + "',0, 0, " + morapagada  + ", '" + fecha + "','',0,0)" ;
                    
                    tx.executeSql( sql, [],imprime, errordb);
                },errordb); 
    }
    
   
 }
 else
 {
    // alertify.alert('Excedio el limite del saldo');
     alertify.alert('Saldo: ' + esaldopre.value + ' Pago: ' + epago.value ); 
 }
    
    
}



function imprime(tx)
{
db.transaction(function(td)
    {
        td.executeSql("Select * from pago where Prestamo = " + eprestamop.value + " order by ID Desc", [],function(td, resultado)
    {
           
        recibo(resultado.rows.item(0).Prestamo, enombrep.value, resultado.rows.item(0).Fecha, resultado.rows.item(0).Concepto, resultado.rows.item(0).Monto, resultado.rows.item(0).Mora );
            
        
    
      $('#contenido').load('cxc.html');
        //epago.value = "";
   }, errordb);
},errordb);   
}


var posicion = function(position) {
      elatitudn.value = position.coords.latitude;
      elongitudn.value =  position.coords.longitude;
      $.afui.loadContent("#lnota",false,false,"slide"); 
};

// onError Callback receives a PositionError object
//
function geoError(error) {
    alert('Codigo: '    + error.code    + '\n' +
          'mensaja: ' + error.message + '\n');
}





function agregar_nota(prestamo, cliente)
{
 eprestamon.value = prestamo;
 enombren.value = cliente;
 navigator.geolocation.getCurrentPosition(posicion, geoError);
 $.afui.loadContent("#lnota",false,false,"slide"); 
}


function reimprimir()
{
  db.transaction(function(tx)
                 {
                    var sql = "SELECT a.*, b.Cliente from pago a, prestamo b where a.Prestamo = b.ID";
                    tx.executeSql( sql, [], muestra_pagos, errordb );}, errordb);    
}




function muestra_pagos(tx, resultado)
{
     $('.pagos').remove();
    var html = '<table class="striped highlight"> <tbody>';
    var parametros = [];
    
    for(a=0;a<resultado.rows.length;a++) 
    {
        parametros[0] = resultado.rows.item(a).ID;
        parametros[1] = resultado.rows.item(a).Cliente;
        parametros[2] = resultado.rows.item(a).Monto;
        parametros[3] = resultado.rows.item(a).Fecha;
        parametros[4] = resultado.rows.item(a).Concepto;
        parametros[5] = resultado.rows.item(a).Mora;
        //parametros[5] = resultado.rows.item(a).Telefono;
       
  
        
    
        //recibo(parametros[0], parametros[1],parametros[3], parametros[4], parametros[2], parametros[5] );
        html += '<tr class="pagos">';
        html += '<td width="5%" ' + resultado.rows.item(a).ID + '</td>';
        html += '<td width="20%" align="center">' + resultado.rows.item(a).ID + '</td>';
        html += '<td width="40%">' + resultado.rows.item(a).Cliente + '</td>';
        html += '<td width="20%" align="right">' + resultado.rows.item(a).Monto + '</td>';
        html += '<td width="15%" align="center"><a class="btn-floating btn-large waves-effect waves-light blue" href="javascript:recibo(' + parametros[0]  + ',' + escape("'") +  parametros[1] + escape("'") + ',' + escape("'") +  parametros[3] + escape("'") + "," + escape("'") + parametros[4] + escape("'") + ', '  +  parametros[2]  + ', ' +  parametros[5] + ');"><p style="vertical-align:top;"><img src="icon/printw.png"/></p></a></td>';
        
         html += '<td width="15%" align="center"><a class="btn-floating btn-large waves-effect waves-light green" href="javascript:historial_pago(' + parametros[0] + ')></a></td>';
        
        html += '</tr>';
        
        
    }
        
    
    html +=  '</tbody></table>';
    $('#dpagos').append(html);
                 
}



         




//Recibe fecha en formato DD/MM/YYYY  
function dia_semana(fecha){   
    fecha=fecha.split('/');  
    if(fecha.length!=3){  
            return null;  
    }  
    //Vector para calcular día de la semana de un año regular.  
    var regular =[0,3,3,6,1,4,6,2,5,0,3,5];   
    //Vector para calcular día de la semana de un año bisiesto.  
    var bisiesto=[0,3,4,0,2,5,0,3,6,1,4,6];   
    //Vector para hacer la traducción de resultado en día de la semana.  
    var semana=['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];  
    //Día especificado en la fecha recibida por parametro.  
    var dia=fecha[0];  
    //Módulo acumulado del mes especificado en la fecha recibida por parametro.  
    var mes=fecha[1]-1;  
    //Año especificado por la fecha recibida por parametros.  
    var anno=fecha[2];  
    //Comparación para saber si el año recibido es bisiesto.  
    if((anno % 4 == 0) && !(anno % 100 == 0 && anno % 400 != 0))  
        mes=bisiesto[mes];  
    else  
        mes=regular[mes];  
    //Se retorna el resultado del calculo del día de la semana.  
    return Math.ceil(Math.ceil(Math.ceil((anno-1)%7)+Math.ceil((Math.floor((anno-1)/4)-Math.floor((3*(Math.floor((anno-1)/100)+1))/4))%7)+mes+dia%7)%7);  
}  



function guarda_nota()
{
     db.transaction(function(tx)
                 {
    tx.executeSql('Insert Into nota(Prestamo, Nombre, Latitud, Longitud, Nota, Sincronizado) values (' + eprestamon.value + ', "' + enombren.value + '" ,' + elatitudn.value + ', ' + elongitudn.value + ', "' + enotan.value + '",0)' ,[],nota_guardada, errordb);}, errordb);
    
}

function nota_guardada(tx)
{
  $.afui.goBack();  
}