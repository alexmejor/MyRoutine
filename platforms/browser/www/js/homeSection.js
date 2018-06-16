function displayHome(json, categories) {
    resetContainers();
    $(".containerHome").append(`<div style="width: 90%; margin: 40px auto;">
                                    <div class="homeSectionButtons">
                                        <i class="fas fa-play-circle"></i>comenzar a entrenar
                                    </div>
                                    <div class="homeSectionButtons">
                                        <i class="fas fa-pen-square"></i>cambiar rutina
                                    </div>
                                    <div class="homeSectionButtons createRoutine">
                                        <i class="fas fa-plus-circle"></i>nuevo entrenamiento
                                    </div>
                                </div>`);
    $(".createRoutine").click(function () {
        createRoutine(json, categories);
    });
}


function createRoutine(json, categories) {
    var newRoutine = {
        "name": "",
        "category": "",
        "days": [],
    };
    $(".containerHome").html("<br><p>Nombre<br><input type='text'></p><p>Categoria<br><select key='category'><option>definicion</option><option>volumen</option></select></p><br><button id='addDay'>Añadir dia</button>");
    $("#addDay").click(function () {
        newRoutine["name"] = $("input").eq(0).val();
        newRoutine["category"] = $("select").eq(0).val();
        var container = ".containerHome";
        json["routines"].push(newRoutine);
        console.log(json.routines.length);
        var indexRoutine = json.routines.length-1;
        createDay(json, categories, container, indexRoutine);
    });
}

function createDay(json, categories, container, indexRoutine) {
    var newDay = {
        "name": "",
        "exercises": "",
    };
    $(container).html("<br><p>Nombre<br><input type='text'></p><br><button id='addExercices'>Añadir ejercicios</button><br><br>");
    $("#addExercices").click(function () {
        newDay["name"] = $("input").eq(0).val();
        //newRoutine["days"]["name"] = $("input").eq(1).val();
        createExercices(json, categories, container, indexRoutine, newDay);
    });
}

function createExercices(json, categories, container, indexRoutine, newDay) {
    $(container).html("Repeticiones<br><input class='reps' min=0 type='number'><br><br>");
    $(container).append("Series<br><input class='sets' min=0 type='number'><br><br>");
    $(container).append("Ejercicio<br><select id='exerciceGroup'><option disabled selected>- seleccionar - </option>");

    for (var i = 0; i < categories.length; i++) {
        $(container+" select").append("<option>" + categories[i].name + "</option>");
    }

    $(container).append("</select><br><br>");
    $(container).append("<div class='tableDay'><table><thead><tr><th>Ejercicios</th><th>Repeticiones</th><th>Series</th></tr></thead><tbody></tbody></table></div>");
    $("#exerciceGroup").change(function () {
        $(container+" .selectExercices").remove();
        for (var i = 0; i < categories.length; i++) {
            if ($(container+" select").val() == categories[i].name) {
                $(container+" .tableDay").prepend("<span class='selectExercices'></span>");
                $(".selectExercices").html("<select class='exercice'>");
                for (var j = 0; j < categories[i].exercicesName.length; j++) {
                    $(".selectExercices select").append("<option>" + categories[i].exercicesName[j].name + "</option>");
                }
                $(".selectExercices").append("</select><br><br>");
            }
        }
        $(".saveExercice").remove();
        var exercices = [];
        $(container+" .selectExercices").append("<button class='saveExercice'>guardar</button>");
        $(".saveExercice").click(function () {
            $(".tableDay tbody").append("<tr><td key='name'>" + $(".exercice").val() + "</td><td key='repetitions'>" + $(".reps").val() + "</td><td key='series'>" + $(".sets").val() + "</td></tr>");
            $(".saveDay").remove();
            $(".tableDay").append($("<button class='saveDay'>guardarDia</button>").click(function () {
                for (var i = 1; i < $("tr").length; i++) {
                    var exerciceName = $("tr").eq(i).find("td").eq(0).html();
                    for (var x = 0; x < categories.length; x++) {
                        for (var j = 0; j < categories[x].exercicesName.length; j++) {
                            if (categories[x].exercicesName[j].name == exerciceName) {
                                exercices.push({
                                    "exerciseName": {
                                        "description": "",
                                        "id": categories[x].exercicesName[j].id,
                                        "name": $("tr").eq(i).find("td").eq(0).html(),
                                    },
                                    "repetitions": $("tr").eq(i).find("td").eq(1).html(),
                                    "series": $("tr").eq(i).find("td").eq(2).html()
                                });
                            }
                        }
                    }
                }
                //                        console.log(exercices);
                newDay["exercises"] = exercices;
                json.routines[indexRoutine]["days"].push(newDay);
                // json["routines"].push(newRoutine);
                $(".tableDay").remove();
                $(container).html("");
                displayHome(json, categories);
            }));
        });
    });
}