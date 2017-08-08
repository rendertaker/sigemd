
 var db = window.openDatabase("sige", "0.1", "base de datos local", 50000);




function inicializa(ref)
{
    
     db.transaction(iniciadb, errordb);
    if (ref==0)
    
    {
        
        //$('#menup').append('<p align="center"> Dispositivo ID:  <br>Listo<p>');
        
        
       /* var impri = "! 0 200 200 1015 1\n" +
"PW 574\n" +
"TONE 0\n" +
"SPEED 3\n" +
"ON-FEED IGNORE\n" +
"NO-PACE\n" +
"BAR-SENSE\n" +
"T 4 0 68 12 * RECIBO DE PAGO *\n" +
"BT 7 0 0\n" +
"B 93 1 30 53 45 80 580c4e6781fbc781\n" +
"BOX 5 65 569 1009 8\n" +
"IL 4 2 570 2 67\n" +
"PRINT\n";*/ 
        
       // comandos.value = impri;
    }
}


function loginconf()
{
 $.afui.loadContent("#loginconf",false,false,"slide");   
}





function iniciadb(tx)
{
  
  /*var sql ='DROP TABLE IF EXISTS configuracion ' ;
    tx.executeSql(sql,[],function(tx){*/
    
 
        var sql ='CREATE TABLE IF NOT EXISTS configuracion ' +
' (ID INTEGER NOT NULL, ' +
' Empresa VARCHAR(100) NOT NULL, ' +
' Direccion VARCHAR(200) NOT NULL, ' +
' Telefonos VARCHAR(200) NOT NULL, ' +
' Zona VARCHAR(200) NOT NULL, ' +
' Cobrador VARCHAR(200) NOT NULL, ' +
' Servidor VARCHAR(200) NOT NULL, ' +
' Printer VARCHAR(20) NOT NULL, ' +
' PRIMARY KEY (ID))'; 
    tx.executeSql(sql,[], function(tx)
                            {
                                
                                tx.executeSql("SELECT * FROM configuracion",[],parametriza,errordb);
    
                            },errordb);    
        
 //},errordb);

  


       
  
    
}


function llena_parametros()
{
    db.transaction(function(tx)
    {
                    var sql = "SELECT * from configuracion";
                    tx.executeSql( sql, [],function(tx, resultado)
                    {
                   
                    
                        eempresa.value = resultado.rows.item(0).Empresa;
                        edireccion.value = resultado.rows.item(0).Direccion;
                    
                        etelefonos.value = resultado.rows.item(0).Telefonos;
                        ezona.value = resultado.rows.item(0).Zona;
                                      
                   
                        ecobrador.value = resultado.rows.item(0).Cobrador;
        
                        eservidor.value = resultado.rows.item(0).Servidor;
                        eprinter.value = resultado.rows.item(0).Printer;
                     
                                   
                    },errordb);
                                  
                                  
                                  
                                  
    }, errordb);  
    
}




function parametriza(tx, resultado)
{
    
    if(resultado.rows.length==0)
    {
        
        tx.executeSql('INSERT INTO configuracion(ID, Servidor, Printer, Empresa, Zona, Cobrador, Direccion, Telefonos) VALUES (1, "http://192.168.1.28/sige","", "", "","","", "")',[], function(tx){
            
    
    tx.executeSql("SELECT * FROM configuracion",[],function(tx, resultado)
                {
                   
                   
                    eempresa.value = resultado.rows.item(0).Empresa;
                    edireccion.value = resultado.rows.item(0).Direccion;
                    
                    etelefonos.value = resultado.rows.item(0).Telefonos;
                    ezona.value = resultado.rows.item(0).Zona;
                                      
                   
                    ecobrador.value = resultado.rows.item(0).Cobrador;
        
                    eservidor.value = resultado.rows.item(0).Servidor;
                    eprinter.value = resultado.rows.item(0).Printer;
                      
                    
                                   
                },errordb);
    }, errordb2);
    }
    else
    {
        
        eempresa.value = resultado.rows.item(0).Empresa;
        edireccion.value = resultado.rows.item(0).Direccion;
        etelefonos.value = resultado.rows.item(0).Telefonos;
        ezona.value = resultado.rows.item(0).Zona;           
        ecobrador.value = resultado.rows.item(0).Cobrador;
        eservidor.value = resultado.rows.item(0).Servidor;
        eprinter.value = resultado.rows.item(0).Printer;
    }

    
    
}





function errordb2(err)
{
    alertify.alert("hay un error 2: " + err.message);
}


function errordb(err)
{
    
    alertify.alert("hay un error 1: " + err.message);
}




function creada(tx)
{
  //  alert('Tabla Creada');
    //tx.executeSql('SELECT * FROM usuario', [], resinicio, errordb);
}

function menu()
{
    $('.fventa').remove();
    //$.afui.loadContent("#signin",false,false,"fade");
}