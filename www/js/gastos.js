var db = window.openDatabase("sige", "0.1", "base de datos local", 50000);


function guarda_gastos()
{
     db.transaction(function(tx)
                 {
    tx.executeSql('Insert Into gastos(Concepto,Monto) values ("' + econceptog.value + '", ' + emontog.value + ')' ,[],gastos_guardados, errordb);}, errordb);
    
}

function gastos_guardados(tx)
{
  econceptog.value = "";
  emontog.value = "";
  busca_gastos();  
}

function busca_gastos()
{
  db.transaction(function(tx)
                 {
                    var sql = "SELECT * from gastos";
                    tx.executeSql( sql, [], muestra_gastos, errordb );}, errordb);    
}

function muestra_gastos(tx, resultado)
{
    
    var html = '<table border="1" width="100%" cellspacing="0" cellpadding="0">';
    var total = 0;
    for(a=0;a<resultado.rows.length;a++) 
    {
        html += '<tr>';
        html += '<td width="60%" >' + resultado.rows.item(a).Concepto + '<td>';
        html += '<td align="right" width="30%">' + resultado.rows.item(a).Monto + '</td>';
        html += '<td width="10%" > <a class="button icon trash" href="javascript:borra_gasto(' + resultado.rows.item(a).ID + ')" ></a></td>'; 
        html += '</tr>';
        total += resultado.rows.item(a).Monto;
    }
        
        html += '<tr>';
        html += '<td align="right" width="60%" >Total:<td>';
        html += '<td align="right" width="30%">' + total + '</td>';
        html += '<td width="10%"> </td>'; 
        html += '</tr>';
    
    html +=  '<table>';
    $('#dgastos').html(html);
   
}

function gasto_borrado(tx)
{
  
  busca_gastos();  
}


function borra_gasto(ID)
{
    var r = confirm("Desea borrar este gastos?");
    if (r) 
    {
    
    db.transaction(function(tx)
    {
       tx.executeSql('Delete from gastos where ID = ' + ID ,[],gasto_borrado, errordb);}, errordb); 
    }
}