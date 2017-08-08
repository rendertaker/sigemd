var db = window.openDatabase("sige", "0.1", "base de datos local", 50000);


function guarda_ingresos()
{
     db.transaction(function(tx)
                 {
    tx.executeSql('Insert Into ingresos(Concepto,Monto) values ("' + econceptoi.value + '", ' + emontoi.value + ')' ,[],ingresos_guardados, errordb);}, errordb);
    
}

function ingresos_guardados(tx)
{
  econceptoi.value = "";
  emontoi.value = "";
  busca_ingresos();  
}

function busca_ingresos()
{
  db.transaction(function(tx)
                 {
                    var sql = "SELECT * from ingresos";
                    tx.executeSql( sql, [], muestra_ingresos, errordb );}, errordb);    
}

function muestra_ingresos(tx, resultado)
{
    
    var html = '<table border="1" width="100%" cellspacing="0" cellpadding="0">';
    var total = 0;
    for(a=0;a<resultado.rows.length;a++) 
    {
        html += '<tr>';
        html += '<td width="60%" >' + resultado.rows.item(a).Concepto + '<td>';
        html += '<td align="right" width="30%">' + resultado.rows.item(a).Monto + '</td>';
        html += '<td width="10%" > <a class="button icon trash" href="javascript:borra_ingreso(' + resultado.rows.item(a).ID + ')" ></a></td>'; 
        html += '</tr>';
        total += resultado.rows.item(a).Monto;
    }
        
        html += '<tr>';
        html += '<td align="right" width="60%" >Total:<td>';
        html += '<td align="right" width="30%">' + total + '</td>';
        html += '<td width="10%"> </td>'; 
        html += '</tr>';
    
    html +=  '<table>';
    $('#dingresos').html(html);
   
}

function ingreso_borrado(tx)
{
  
  busca_ingresos();  
}


function borra_ingreso(ID)
{
    var r = confirm("Desea borrar este ingreso?");
    if (r) 
    {
    
    db.transaction(function(tx)
    {
       tx.executeSql('Delete from ingresos where ID = ' + ID ,[],ingreso_borrado, errordb);}, errordb); 
    }
}