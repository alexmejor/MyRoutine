$(document).ready(function() {
   
    var tabla = [
        {"Ejercicio":"Press Banca",
         "Repeticiones":10,
         "Series":3},
        {"Ejercicio":"Dominadas",
         "Repeticiones":10,
         "Series":4},
        {"Ejercicio":"Press Militar",
         "Repeticiones":10,
         "Series":3},
        {"Ejercicio":"Sentadillas",
         "Repeticiones":10,
         "Series":6},
        {"Ejercicio":"Sentadillas",
         "Repeticiones":10,
         "Series":6},
    ];
    
    var botonmenos = "<button class='botonmenos'>-</button>";
    var botonmas = "<button class='botonmas'>+</button>";
    
    var filas = "<table class='tabla'><thead><tr><th>Ejercicio</th><th>Reps</th><th>Series</th></tr></thead><tbody>";
    for(var i = 0;i<tabla.length;i++)
        {
            filas = filas+"<tr><td style='padding-left:10px;'>"+tabla[i].Ejercicio+"</td><td style='text-align:center;'>"+tabla[i].Repeticiones+"</td><td style='text-align:center;'>"+tabla[i].Series+"</td><td>"+botonmas+botonmenos+"</td></tr>";
        }
    filas = filas+"</tbody></table>";
    $(".contenedor").append(filas);
    console.log(filas);
    
    //$(".tabla").css("background-color","black").width(200).height(200);
    console.log(tabla[0].Ejercicio);
    
    $(".botonmas").click(function() {
        var index = $(this).closest('tr').index();
        var sets = $("tr").eq(index).find("td").eq(2).html();
        sets = parseInt(sets);
        if (sets >= 0) {
            $("tr").eq(index).find("td").css("background-color","#f2f2f2");
        }
        
        sets = sets+1;
        $("tr").eq(index).find("td").eq(2).html(sets);
    });
    $(".botonmenos").click(function() {
        var index = $(this).closest('tr').index();
        var sets = $("tr").eq(index).find("td").eq(2).html();
        sets = parseInt(sets)
        if (sets != 0) {
            sets = sets-1;
            $("tr").eq(index).find("td").eq(2).html(sets);
        }
        if (sets == 0) {
            $("tr").eq(index).find("td").css("background-color","#9cff67");
        }
    });
});