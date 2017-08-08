var formatNumber = {
 separador: ",", // separador para los miles
 sepDecimal: '.', // separador para los decimales
 formatear:function (num){
  num +='';
  var splitStr = num.split('.');
  var splitLeft = splitStr[0];
  var splitRight = splitStr.length > 1 ? this.sepDecimal + splitStr[1] : '';
  var regx = /(\d+)(\d{3})/;
  while (regx.test(splitLeft)) {
  splitLeft = splitLeft.replace(regx, '$1' + this.separador + '$2');
  }
  return this.simbol + splitLeft  +splitRight;
 },
 new:function(num, simbol){
  this.simbol = simbol ||'';
  return this.formatear(num);
 }
}

function escapeRegExp(string) {
    return string.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
}


function replaceAll(string, find, replace) 
{
  return string.replace(new RegExp(escapeRegExp(find), 'g'), replace);
}


var impri = "";


function recibo(prestamo, nombre, fecha, concepto, monto, mora)
{
    conc = concepto.split("Saldo Cuota No.");
    conc_formateado = "";
    Saldo = "";
    Abono = "";
    Mora = "";
    if(conc.length > 1)
    {
        conc_formateado = "Pago Cuota No. ";
        for(a=0;a<conc.length;a++)
            {
                if(a > 0)
                {    
                    conc_formateado += conc[a] + ", ";
                }
                else
                    conc_formateado += conc[a];
            }
        Saldo = conc_formateado;
        conc = conc_formateado.split("Abono");
        if(conc.length > 1)
        {
         Saldo = conc[0];
         Abono = "Abono de " + conc[1];
        }
    }
    else
    {
        conc = concepto.split("Abono");
        //alert("Largo " + conc.length);
        if(conc.length > 1)
        {
         Abono = "Abono de " + conc[1];
        }
        
    }
   
    if(mora > 0)
    {
        Mora = "Pago de RD$ " + mora + " de Mora";
    }
    Saldos = Saldo.split("Fecha");
    if (Saldos.length > 1)
    {
     Saldo = "Pago Cuota No. " + Saldos[1].replace("Fecha","");
        
    }
    
    
    if (Saldo.indexOf('13 ')!=-1) 
	{
		Saldo = 'SALDO DE PRESTAMO';
	}
    
    
    

   /* concepto = replaceAll(concepto,"Saldo","\nSaldo");
    concepto = replaceAll(concepto,"Abono","\nAbono");
    concepto = replaceAll(concepto,"\n\n","\n");*/
   //var f = fecha.split("-");
   //var fechaf = "" + f[2] + "/" + f[1] + "/" + f[0];
    
    var f = fecha.split("-");
    var fd = f[2].split(" "); 
    var fechaf = "" + fd[0] + "/" + f[1] + "/" + f[0] + " " + fd[1];
    
 //  var fecha = "" + f.getDate() + "/" + (f.getMonth()+1) + "/" + f.getFullYear() + " " + f.getHours() + ":" + f.getMinutes() + ":" + f.getSeconds();
 /*  var impri = "! 0 200 200 <largo> 1\n" +
                  "CENTER\n" +
                  "BT 0 3 6\n" +
                  "B F39 0 30 47 0 22 " + window.device.uuid + "\n" +
                  "T 5 0 0 119 " + eempresa.value + "\n" +
                  "INVERSE-LINE 0 119 550 119 35\n" +
                  "T 5 0 0 172 *RECIBO DE PAGO*\n" +
                  "LEFT\n" +
                  "T 7 1 10 250 Prestamo No.: " + prestamo + " Fecha: "  + fechaf + "\n" + 
                  "T 7 1 10 300 " + nombre + "\n" +
                  "CENTER\n" +
                  "T 7 1 0 350 Concepto:\n" +
                  "INVERSE-LINE 0 360 550 360 35\n" +
                  "LEFT\n" +
                  "ML 27\n" +
                  "TEXT 0 2 10 400\n";
            conceptos = concepto.split("\n");
            for(var a=0;a<conceptos.length;a++ )
            {
                impri += " " + conceptos[a] + " \n";
            }
            if(a < 4)
                a = 4;
            impri += "ENDML\n" + 
                  "CENTER\n" +
                  "TEXT 5 3 0 " + ((a * 40) + 350) + " Monto: " + formatNumber.new(monto) + "\n" +
                  "INVERSE-LINE 0 " + ((a * 40) + 360) + " 550 " + ((a * 40) + 360) + " 70\n" +
                  "LINE 10 " + ((a * 40) + 550) + " 500 " + ((a * 40) + 550) + " 1\n" +
                  "T 0 3 0 " + ((a * 40) + 570) + " Cobrador \n" +
                  "T 0 2 0 " + ((a * 40) + 610) + "***NO SOMOS RESPONSABLES DE DINERO ENTREGADO SIN RECIBO FIRMADO***\n" +
                  "T 7 1 0 " + ((a * 40) + 680) +  " \n\n" +
                 // "FORM\n" +*/
    
    /*var pon_ncf = "";
    if (NCF > 0)
    {
        var str_ncf = "" + NCF;
        pon_ncf = "   NCF: " + esncf.value + "" + poner_ceros((8 - str_ncf.length), NCF);
    }*/
    
    //*********** printer mz320 ****************************/
    
/*    "T 4 0 68 12 * RECIBO DE PAGO *\n" +
"BT 7 0 0\n" +
"B 93 1 30 53 45 80 " + window.device.uuid + "\n" +
"BOX 5 65 569 1100 2\n" +
"IL 4 2 570 2 67\n" +
"L 10 155 561 155 2\n" +
         
"T270 4 0 550 200 " + eempresa.value + "\n" +
"T270 0 2 500 250 " + edireccion.value + "\n" +
"T270 0 2 470 250 " + etelefonos.value + "\n" +

"T270 7 1 450 760 FECHA:\n" +
"T270 7 1 450 840 " + fechaf + "\n" +
"L 400 840 400 1000 1\n" +
         
"T270 7 1 450 200 PRESTAMO NO.:\n" +
"T270 7 1 450 360 " + prestamo + "\n" +  
"L 400 350 400 565 1\n" +
         
"T270 7 1 400 200 NOMBRE:\n" +
"T270 7 1 400 340 " + nombre + "\n" +
"L 350 340 350 1000 1\n" +

         
"T270 7 1 350 200 Concepto:\n" +
"T270 7 1 350 340 " + Mora + "\n" +
"L 300 340 300 1000 1\n" +

"T270 7 1 300 340 " + Saldo + "\n" +
"L 250 340 250 1000 1\n" +

"T270 7 1 250 340 " + Abono + "\n" +
"L 200 340 200 1000 1\n" +
         
"L 100 450 100 1000 1\n" +
"T270 7 1 90 550 " + ecobrador.value + "\n" +         

"T270 0 2 30 200 ***NO SOMOS RESPONSABLES DE DINERO ENTREGADO SIN RECIBO FIRMADO***\n" +
         
"CENTER\n" +
"T 4 0 10 1100 * RD$ " + formatNumber.new(monto) + " *\n" +
"IL 4 1100 570 1100 67\n" +
"PRINT\n"; */

    
    
    db.transaction(function(tx)
                 {
                    var sql = "select MAX(Cuota) as Maxima, MIN(Cuota) as Minima, SUM(Capital + Interes - Pagado) as Total, MAX(Fecha) as Vence  from dprestamo where Prestamo = " +  prestamo + " and ((Capital + Interes) - Pagado) > 0  Order by Cuota" ;
                    tx.executeSql( sql, [],function(tx, resultado)
                    {
                                    
        
                        var fech = resultado.rows.item(0).Vence;
                        var fec = fech.split('-')
                        var fechafv = "" + fec[2] + "/" + fec[1] + "/" + fec[0];
                        

    
/*comandos.value = impri;     
    
   //impri = impri.replace('<largo>',(a * 40) + 700)); 
   //"00:22:58:35:EE:4F"*/
    
 //*** Recibo MZ220 ********   
    
    
      impri = "! 0 200 200 1000 1\n" +

"BOX 0 0 380 950 2\n" +
         
"T270 5 2 380 10 " + eempresa.value + "\n" +
"T270 7 1 350 10 " + etelefonos.value + "\n" +
"T270 7 1 380 700 " + ecobrador.value + "\n" + 
"T270 7 1 330 560 FECHA:\n" +
"T270 7 1 330 640 " + fechaf + "\n" +
                            
"T270 7 1 280 560 FECHA:\n" +
"T270 7 1 280 640 " + fechafv + "\n" +

         
"T270 7 0 310 10 PRESTAMO NO.:\n" +
"T270 7 0 310 160 " + prestamo + "\n" +  

         
"T270 7 1 280 10 NOMBRE:\n" +
"T270 7 1 280 160 " + nombre + "\n" +


         
"T270 7 1 230 10 Concepto:\n" +
"T270 7 1 230 160 " + Mora + "\n" +

"T270 7 1 200 160 " + Saldo + "\n" +


"T270 7 1 170 160 " + Abono + "\n" +

"L 160 170 160 900 1 \n" +
"L 100 170 100 900 1 \n" +
"L 240 170 240 900 1 \n" +

"T270 7 1 80 400 *RECIBO DE PAGO* \n" +
        

"T270 7 0 30 200 ***NO SOMOS RESPONSABLES DE DINERO ENTREGADO SIN RECIBO***\n" +
         
          
"T270 7 1 170 700 * RD$ " + formatNumber.new(monto) + " *\n" +
"IL 160 700 100 700 200\n" +
"PRINT\n";

//comandos.value = impri;
    
    
    // var impri = '! U1 setvar "device.languages" "line_print"\r\nTEXT ***Print test***\r\nPRINT\r\n' ;
   
   
    
    
    
    
    
    
    cordova.plugins.zbtprinter.print(eprinter.value, impri,
    function(success) { 
       // alert("Impresion Completada"); 
    }, function(fail) { 
        alert(fail); 
    }
);
                                    
                        
                        
                        
                        
                    }, errordb );}, errordb);
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
     
[]}


function imprifull()

{
  cordova.plugins.zbtprinter.print(eprinter.value, comandos.value,
    function(success) { 
        alert("Impresion Completada"); 
    }, function(fail) { 
        alert(fail); 
    }
);
}


function imprime_cuadre()
{
    db.transaction(function(tx)
                 {
                    var sql = "SELECT a.*, b.Cliente from pago a, prestamo b where a.Prestamo = b.ID";
                    tx.executeSql( sql, [], cuadre, errordb );}, errordb);
}


function cuadre(tx, resultado)
{
    var f = new Date();
    var fecha = "" + ("0" + f.getDate()).slice(-2) + "/" + ("0" + (f.getMonth() + 1)).slice(-2) + "/" +  f.getFullYear() + "" ;
    var monto = 0;
    impri = "! 0 200 200 <largo> 1\n" +
                  "CENTER\n" +
                  "BT 0 3 6\n" +
                  "B F39 0 30 47 0 22 " + window.device.uuid + "\n" +
                  "T 5 0 0 119 " + eempresa.value + "\n" +
                  "INVERSE-LINE 0 119 350 119 35\n" +
                  "T 5 0 0 172 *CUADRE*\n" +
                  "T 5 0 0 210 " + fecha + "\n" +
                  "LEFT\n" +
                  "ML 27\n" +
                  "TEXT 0 2 10 250\n";
    for(a=0;a<resultado.rows.length;a++)                     
    {
              impri += " " + resultado.rows.item(a).Prestamo + " - " + resultado.rows.item(a).Cliente + "\n";
        monto += resultado.rows.item(a).Monto;
    }
    
    impri += "ENDML\n" +
             "RIGHT\n" +
             "ML 27\n" +
             "TEXT 0 2 10 250\n";
    for(a=0;a<resultado.rows.length;a++)                     
    {
                 fe = resultado.rows.item(a).Fecha;
        
                 impri += "" + fe.substring(11, 19) +  "    "  + formatNumber.new(resultado.rows.item(a).Monto) + "\n";
       
    }
    
    impri += "ENDML\n" +
                  "T 5 0 0 " + ((a * 40) + 250) + " Capital: " + formatNumber.new(ecapitalc.value) + "\n" +
                  "T 5 0 0 " + ((a * 40) + 300) + " Interes: " + formatNumber.new(einteresc.value) + "\n" +
                  "T 5 0 0 " + ((a * 40) + 340) + " Mora: " + formatNumber.new(emorac.value) + "\n" +
                  "CENTER\n" +
                  "TEXT 5 3 0 " + ((a * 40) + 370) + " Monto: " + formatNumber.new(monto) + "\n" +
                  "INVERSE-LINE 0 " + ((a * 40) + 380) + " 350 " + ((a * 40) + 380) + " 70\n" +
                  "T 7 1 0 " + ((a * 40) + 680) +  " \n\n" +
                 // "FORM\n" +
                  "PRINT\n"; 
    
   impri = impri.replace('<largo>',((a * 40) + 700));
  //  comandos.value = impri;
     cordova.plugins.zbtprinter.print(eprinter.value, impri, 
    function(success) { 
         //imprime_atrasos();
        // alertify.alert("Impresion Completada");
    }, function(fail) { 
        alertify.alert(fail); 
    }
);
    
}


function busca_detalle()
{
    
}


/*function imprime_atrasos()
{
    
     db.transaction(function(tx)
     {
        tx.executeSql("Select a.Prestamo, b.Cliente, SUM(a.Monto) as Monto from detalle_pago a, prestamo b where a.Prestamo = b.ID and a.Tipo = 'A' group by a.Prestamo",[],function(tx, resultado)
                {
                     var impri = "! 0 200 200 <largo> 1\n" +
                    "CENTER\n" +
                    "T 5 0 0 119 ATRASOS\n" +
                    "INVERSE-LINE 0 119 350 119 35\n" +
                    "LEFT\n" +
                    "ML 27\n" +
                    "TEXT 0 2 10 250\n";
                    monto = 0;
                    for(a=0;a<resultado.rows.length;a++)
                    {
                        impri += " " + resultado.rows.item(a).Prestamo + " - " + resultado.rows.item(a).Cliente + "\n";
                        monto += resultado.rows.item(a).Monto; 
                    }
                    impri += "ENDML\n" +
             "RIGHT\n" +
             "ML 27\n" +
             "TEXT 0 2 10 250\n";
            for(a=0;a<resultado.rows.length;a++)
            {
                         impri += "" + formatNumber.new(resultado.rows.item(a).Monto) + "\n";
            }
            
             "CENTER\n" +
                "TEXT 5 3 0 " + ((a * 40) + 370) + " Monto: " + formatNumber.new(monto) + "\n" +
                "INVERSE-LINE 0 " + ((a * 40) + 380) + " 350 " + ((a * 40) + 380) + " 70\n" +
                "LINE 10 " + ((a * 40) + 550) + " 500 " + ((a * 40) + 550) + " 1\n" +
                "T 0 3 0 " + ((a * 40) + 570) + " Recibido Por: \n" +
                "T 7 1 0 " + ((a * 40) + 680) +  " \n\n" + 
                "PRINT\n";
                    //html += "</table>";
                    //$('#ddetalle_pago').append(html);
                     
                },errordb); 
     }, errordb);     
        
        
                
}*/

function imprime_ingresos()
{
  db.transaction(function(tx)
                 {
                    var sql = "SELECT * from ingresos";
                    tx.executeSql( sql, [], cuadre_ingresos, errordb );}, errordb);    
}



function cuadre_ingresos(tx, resultado)
{
    var f = new Date();
    var fecha = "" + ("0" + f.getDate()).slice(-2) + "/" + ("0" + (f.getMonth() + 1)).slice(-2) + "/" +  f.getFullYear() + "" ;
    var monto = 0;
     var impri = "! 0 200 200 <largo> 1\n" +
                  "CENTER\n" +
                  "BT 0 3 6\n" +
                  "B F39 0 30 47 0 22 " + window.device.uuid + "\n" +
                  "T 5 0 0 119 " + eempresa.value + "\n" +
                  "INVERSE-LINE 0 119 550 119 35\n" +
                  "T 5 0 0 172 *CUADRE DE INGRESOS*\n" +
                  "T 5 0 0 210 " + fecha + "\n" +
                  "LEFT\n" +
                  "ML 27\n" +
                  "TEXT 0 2 10 250\n";
    for(a=0;a<resultado.rows.length;a++)                     
    {
              impri += " " + resultado.rows.item(a).ID + " - " + resultado.rows.item(a).Concepto + "\n";
        monto += resultado.rows.item(a).Monto;
    }
    
    impri += "ENDML\n" +
             "RIGHT\n" +
             "ML 27\n" +
             "TEXT 0 2 10 250\n";
    for(a=0;a<resultado.rows.length;a++)                     
    {
                 impri += ""  + formatNumber.new(resultado.rows.item(a).Monto) + "\n";
       
    }
    
    impri += "ENDML\n" +
        
                  "CENTER\n" +
                  "TEXT 5 3 0 " + ((a * 40) + 370) + " Monto: " + formatNumber.new(monto) + "\n" +
                  "INVERSE-LINE 0 " + ((a * 40) + 380) + " 550 " + ((a * 40) + 380) + " 70\n" +
                  "LINE 10 " + ((a * 40) + 550) + " 500 " + ((a * 40) + 550) + " 1\n" +
                  "T 0 3 0 " + ((a * 40) + 570) + " Recibido Por: \n" +
                  "T 7 1 0 " + ((a * 40) + 680) +  " \n\n" +
                 // "FORM\n" +
                  "PRINT\n"; 
    
   impri = impri.replace('<largo>',((a * 40) + 700));
  //  comandos.value = impri;
     cordova.plugins.zbtprinter.print(eprinter.value, impri, 
    function(success) { 
        alertify.alert("Impresion Completada"); 
    }, function(fail) { 
        alertify.alert(fail); 
    }
);
    
}







function imprime_gastos()
{
  db.transaction(function(tx)
                 {
                    var sql = "SELECT * from gastos";
                    tx.executeSql( sql, [], cuadre_gastos, errordb );}, errordb);    
}


function cuadre_gastos(tx, resultado)
{
    var f = new Date();
    var fecha = "" + ("0" + f.getDate()).slice(-2) + "/" + ("0" + (f.getMonth() + 1)).slice(-2) + "/" +  f.getFullYear() + "" ;
    var monto = 0;
     var impri = "! 0 200 200 <largo> 1\n" +
                  "CENTER\n" +
                  "BT 0 3 6\n" +
                  "B F39 0 30 47 0 22 " + window.device.uuid + "\n" +
                  "T 5 0 0 119 " + eempresa.value + "\n" +
                  "INVERSE-LINE 0 119 550 119 35\n" +
                  "T 5 0 0 172 *CUADRE DE GASTOS*\n" +
                  "T 5 0 0 210 " + fecha + "\n" +
                  "LEFT\n" +
                  "ML 27\n" +
                  "TEXT 0 2 10 250\n";
    for(a=0;a<resultado.rows.length;a++)                     
    {
              impri += " " + resultado.rows.item(a).ID + " - " + resultado.rows.item(a).Concepto + "\n";
        monto += resultado.rows.item(a).Monto;
    }
    
    impri += "ENDML\n" +
             "RIGHT\n" +
             "ML 27\n" +
             "TEXT 0 2 10 250\n";
    for(a=0;a<resultado.rows.length;a++)                     
    {
                 impri += ""  + formatNumber.new(resultado.rows.item(a).Monto) + "\n";
       
    }
    
    impri += "ENDML\n" +
        
                  "CENTER\n" +
                  "TEXT 5 3 0 " + ((a * 40) + 370) + " Monto: " + formatNumber.new(monto) + "\n" +
                  "INVERSE-LINE 0 " + ((a * 40) + 380) + " 550 " + ((a * 40) + 380) + " 70\n" +
                  "LINE 10 " + ((a * 40) + 550) + " 500 " + ((a * 40) + 550) + " 1\n" +
                  "T 0 3 0 " + ((a * 40) + 570) + " Recibido Por: \n" +
                  "T 7 1 0 " + ((a * 40) + 680) +  " \n\n" +
                 // "FORM\n" +
                  "PRINT\n"; 
    
   impri = impri.replace('<largo>',((a * 40) + 700));
  //  comandos.value = impri;
     cordova.plugins.zbtprinter.print(eprinter.value, impri, 
    function(success) { 
       // alertify.alert("Impresion Completada"); 
    }, function(fail) { 
        alertify.alert(fail); 
    }
);
    
}
