var lessReps = "<button class='lessReps'>-</button>";
var moreReps = "<button class='moreReps'>+</button>";



var nextRoutine = '<button style="display: none;" id="buttonNext">Siguiente rutina</button>';
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
        var container = ".containerHome";
        createRoutine(json, categories, container);
    });
}

function validateForm() {
    var validated = false;
    if ($("input").val() == "") {
        $("input").addClass("validateInput");
        $(".containerError").html("<br>No pueden haber campos vacios");
        validated = false
    }
    else if (!$("select").length) {
        $(".containerError").html("");
        validated = true;
    }
    else if ($("select").val() == null) {
        $("input").removeClass("validateInput");
        $(".containerError").html("<br>Seleccione una categoria");
        validated = false
    }
    else {
        $(".containerError").html("");
        validated = true;
    }
    return validated;
}

function displayActiveRoutine(json, categories) {
    var activeRoutine = json.activeRoutine;
    if (!json.routines.length) {
        $(".containerRoutines").html("<h4 style='text-align:center'>Aun no tienes ninguna rutina en la base de datos</h4><button class='button'>Crear Rutina</button>");
        var container = ".containerRoutines";
        $("button").eq(0).click(function() {createRoutine(json, categories, container)});
    }
    else {
        for (var i = 0; i < json.routines.length; i++) {
            if (json.routines[i].id == activeRoutine) {
                displayDays(json, categories, null, i);
            }
            else {
                $(".containerRoutines").html("<h3>No tienes ninguna rutina activa</h3>");
            }
        }
    }
}

function displayRoutineSection(json, categories) {
    resetContainers();
    $(".containerRoutines").append('<div style="width: 90%; margin: 80px auto;"><div class="routineSectionButtons">Rutina activa</div><div class="routineSectionButtons">ver rutinas</div></div>');
    $(".routineSectionButtons").eq(0).click(function () { displayActiveRoutine(json, categories) });
    $(".routineSectionButtons").eq(1).click(function () { displayRoutines(json, categories) });
}

function displayRoutines(json, categories) {
    resetContainers();
    $("#headerNav").removeClass("trigram").addClass("arrow");
    //removes the function of navMenu so I can add the function to go previous page
    $("#headerNav").unbind();
    //To go back to the previous section
    $(".arrow").click(function () {
        displayRoutineSection(json, categories)
    });
    $(".containerRoutines").html("<div style='margin-bottom:70px;'>");
    for (var i = 0; i < json.routines.length; i++) {
        $(".containerRoutines div").eq(0).append(`
            <div name="${i}" class="w3-display-container">
                <div class="w3-display-left">
                    <span>${json.routines[i].name}</span><br>
                    <span style="font-size:12px">${json.routines[i].category}</span>
                </div>
                <div class="w3-display-right"><i></i></div>
            </div>`);
    }
    $(".containerRoutines").append('<div><div class="editButton"><i class="fas fa-plus"></i></div>');

    //it says edit but it actually add a routine, i keept "edit" because the css class (right position)
    var container = ".containerRoutines";
    $(".editButton").click(function () { createRoutine(json, categories, container) });
    // var indexRoutine = $(".w3-display-container").attr("name");
    $(".w3-display-container").on("click", function () {
        var thisEle = $(this);
        var indexGroup = $(thisEle).attr("name");
        //$(".titleHeader").html(categories[indexGroup].name);
        displayDays(json, categories, thisEle, null);
    });
}

function createRoutine(json, categories, container) {
    var newRoutine = {
        "name": "",
        "category": "",
        "days": [],
    };

    $("#headerNav").removeClass("trigram").addClass("cross");
    $("#headerNav").unbind();
    $(".cross").click(function () {
        if (container == ".containerHome") {
            displayHome(json, categories);

        } else {
            displayRoutines(json, categories);
        }
    });

    $(container).html(`
        <form id='#form'><br>
        <input placeholder='Nombre de la rutina...' type='text'><br><br>
        <select key='category'>
                <option selected disabled>- Seleccione una categoria -</option>
                <option>definicion</option>
                <option>volumen</option>
            </select><br><br>
            <button id='addDay'>Añadir dia</button>
        </form>`);
    $("#addDay").click(function () {
        if (!validateForm()) {

        } else {
            newRoutine["name"] = $("input").eq(0).val();
            newRoutine["category"] = $("select").eq(0).val();
            // var container = ".containerHome";
            // json["routines"].push(newRoutine);
            var indexNewRoutine = json.routines.length;
            createDay(json, categories, container, indexNewRoutine, newRoutine, null);
        }

    });
}

function createDay(json, categories, container, indexNewRoutine, newRoutine, routineName) {
    var newDay = {
        "name": "",
        "exercises": "",
    };

    $("#headerNav").removeClass("trigram").addClass("cross");
    $("#headerNav").unbind();
    $(".cross").click(function () {
        displayRoutines(json, categories);
    });
    if (routineName == null) {
        routineName = newRoutine["name"];
    }

    $(container).html(`
        <form>
            <h4 >Rutina: ${routineName}</h4><br>
            <input placeholder='Nombre del dia...' type='text'><br>
            <input type='submit' id='addExercices' value='Añadir ejercicios'><br><br>
        </form>`);

    $("#addExercices").click(function () {
        if (!validateForm()) {
        }
        else {
            newDay["name"] = $("input").eq(0).val();
            //newRoutine["days"]["name"] = $("input").eq(1).val();
            createExercices(json, categories, container, indexNewRoutine, newDay, newRoutine);
        }
    });
}

function createExercices(json, categories, container, indexNewRoutine, newDay, newRoutine) {
    $(container).html(`
        <form>
            <h4 >Día: ${newDay["name"]}</h4><br>
            <input placeholder='Repeticiones...' class='reps' min=0 type='number'><br>
            <input placeholder='Series...' class='sets' min=0 type='number'><br>
            <select id='exerciceGroup'>
                <option disabled selected>- Seleccione el ejercicio - </option>`);

    for (var i = 0; i < categories.length; i++) {
        $(container + " select").append("<option>" + categories[i].name + "</option>");
    }

    $(container).append("</select></form><hr style='border: 1px solid #bbbbbb'></hr>");
    $(container).append("<div class='tableDay'><table><thead><tr><th>Ejercicios</th><th>Repeticiones</th><th>Series</th></tr></thead><tbody></tbody></table></div>");
    $("#exerciceGroup").change(function () {
        $(container + " .selectExercices").remove();
        for (var i = 0; i < categories.length; i++) {
            if ($(container + " select").val() == categories[i].name) {
                $(container + " form").append("<span class='selectExercices'></span>");
                $(".selectExercices").html("<select class='exercice'>");
                for (var j = 0; j < categories[i].exercisesNames.length; j++) {
                    $(".selectExercices select").append("<option>" + categories[i].exercisesNames[j].name + "</option>");
                }
                $(".selectExercices").append("</select><br>");
            }
        }
        $(".saveExercice").remove();
        var exercices = [];
        $(container + " .selectExercices").append("<input type='submit' class='saveExercice' value='Añadir Ejercicio'>");
        $(".saveExercice").click(function () {
            $(".tableDay tbody").append("<tr><td key='name'>" + $(".exercice").val() + "</td><td key='repetitions'>" + $(".reps").val() + "</td><td key='series'>" + $(".sets").val() + "</td></tr>");
            $(".saveDay").remove();
            $(".tableDay").append($("<button class='saveDay'>Guardar Día</button>").click(function () {
                for (var i = 1; i < $("tr").length; i++) {
                    var exerciceName = $("tr").eq(i).find("td").eq(0).html();
                    for (var x = 0; x < categories.length; x++) {
                        for (var j = 0; j < categories[x].exercisesNames.length; j++) {
                            if (categories[x].exercisesNames[j].name == exerciceName) {
                                exercices.push({
                                    "exerciseName": {
                                        "description": "",
                                        "id": categories[x].exercisesNames[j].id,
                                        "name": $("tr").eq(i).find("td").eq(0).html(),
                                    },
                                    "repetitions": $("tr").eq(i).find("td").eq(1).html(),
                                    "series": $("tr").eq(i).find("td").eq(2).html()
                                });
                            }
                        }
                    }
                }

                newDay["exercises"] = exercices;
                if (newRoutine != null) {
                    newRoutine["days"].push(newDay);
                    json["routines"].push(newRoutine);
                }
                else {
                    json.routines[indexNewRoutine]["days"].push(newDay)
                }
                ajaxPut();
                $(".tableDay").remove();
                $(container).html("");
                displayDays(json, categories, null, indexNewRoutine);
            }));
        });
    });
}

function displayEditDays(json, categories, thisEle, indexNewRoutine) {
    var indexRoutine = "";
    if (thisEle == null) {
        indexRoutine = indexNewRoutine;
    }
    else {
        indexRoutine = $(thisEle).attr("name");
    }
    var routineName = json.routines[indexRoutine].name;
    $("#headerNav").removeClass("arrow").addClass("cross");
    $("#headerNav").unbind();
    $(".cross").click(function () {
        displayDays(json, categories, null, indexRoutine);
    });
    $(".containerRoutines").html(`<br>
        <b>Nombre de la rutina</b><input class='input' type='text' value='${routineName}'><br><br>
        <table style='margin-bottom:70px;'>
            <thead>
                <tr>
                    <th>Nombre del día</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>`);

    for (var j = 0; j < json.routines[indexRoutine].days.length; j++) {
        //var name = categories[indexGroup].exercicesName[j];
        $(".containerRoutines tbody").append(`
        <tr>
            <td><input type='text' name='${j}' value='${json.routines[indexRoutine].days[j].name}'></td>
            <td class='deleteDay'>&#10008</td>
        </tr>`);
    }

    $(".containerRoutines").append(`
            </tbody>
        </table>
        <div class="saveButton">&#10004;</div>`);

    $(".deleteDay").click(function () {
        var indexDay = $("tr").index($(this).parent("tr:first")) - 1;
        json.routines[indexRoutine].days.splice(indexDay, 1);
        // ajaxPut();
        displayEditDays(json, categories, thisEle, indexNewRoutine);
    });
    $(".saveButton").click(function () {
        json.routines[indexRoutine].name = $("input").eq(0).val();

        for (var i = 0; i < $("table input").length; i++) {
            console.log($("table input").eq(i).attr("name"));
            json.routines[indexRoutine].days[$("table input").eq(i).attr("name")].name = $("table input").eq(i).val();
        }
        ajaxPut();
        displayDays(json, categories, null, indexRoutine);

    });
}

function displayDays(json, categories, thisEle, indexNewRoutine) {
    //resetContainers();
    var indexRoutine = "";
    if (thisEle == null) {
        indexRoutine = indexNewRoutine;
    }
    else {
        indexRoutine = $(thisEle).attr("name");
    }
    var routineName = json.routines[indexRoutine].name;
    $("#headerNav").removeClass("cross trigram").addClass("arrow");
    $("#headerNav").unbind();
    $(".arrow").click(function () {
        // displayDays(json, categories, null, indexRoutine);
        displayRoutines(json, categories)
    });
    $(".containerRoutines").html(`<h4 style='text-align:center'>${routineName}</h4>`);
    for (var j = 0; j < json.routines[indexRoutine].days.length; j++) {
        //var name = categories[indexGroup].exercicesName[j];
        $(".containerRoutines").append('<div name="' + indexRoutine + '" class="selectDay"><div name="' + j + '">' + json.routines[indexRoutine].days[j].name + '</div><div>');
    }

    //if this routine is active it shows "this is active" if it isn't, it shows a button to active it
    var active;
        if (json.routines[indexRoutine].id == json.activeRoutine) {
            active = "<span style='color:green'>Rutina Activa</span>"
        }
        else {
            active = "<button class='button activateRoutine'>Activar rutina</button>";
        }

    $(".containerRoutines").append(`
        ${active}
        <button class='deleteRoutine button'>Eliminar rutina</button><div><div class="addButton"><i class="fas fa-plus"></i></div><div class="editButton"><i class="fas fa-pencil-alt"></i></div>`);

    $(".deleteRoutine").click(function () {
        json.routines.splice(indexRoutine, 1);
        ajaxPut();
        displayRoutines(json, categories);
    });

    $(".activateRoutine").click(function () {
        json["activeRoutine"] = json.routines[indexRoutine].id;
        ajaxPut();
    });

    var container = ".containerRoutines";
    $(".addButton").click(function () { createDay(json, categories, container, indexRoutine, null, routineName) });
    $(".editButton").click(function () { displayEditDays(json, categories, thisEle, indexNewRoutine) });

    //it shows the info of each exercice (description, name, images)
    $(".selectDay").on("click", function () {
        $(".containerRoutines").html("");
        var thisEle = $(this);
        displayDayTable(json, categories, thisEle);
    });
}

function displayDayTable(json, categories, thisEle) {
    var indexRoutine = $(thisEle).attr("name");
    var indexDay = $(thisEle).find("div").attr("name");
    $(".arrow").click(function () {
        displayDays(json, categories, thisEle, null);
    });
    $(".titleHeader").html(json.routines[indexRoutine].name);
    $(".containerRoutines").html("");
    //$(".titleHeader").html(categories[indexGroup].exercicesName[indexExercice].name);
    $(".containerRoutines").append("<p class='dayTitle'>" + json.routines[indexRoutine].days[indexDay].name + "</p><p class='finishedTitle' style='display:none;text-align:center;'><b>¡Día Completado!</b></p><div class='tableDay'><table><thead><tr><th>Ejercicios</th><th>Reps.</th><th>Series</th><th></th></tr></thead><tbody>");
    for (var i = 0; i < json.routines[indexRoutine].days[indexDay].exercises.length; i++) {
        $(".containerRoutines tbody").append("<tr><td>" + json.routines[indexRoutine].days[indexDay].exercises[i].exerciseName.name + "</td><td>" + json.routines[indexRoutine].days[indexDay].exercises[i].repetitions + "</td><td class='sets'>" + json.routines[indexRoutine].days[indexDay].exercises[i].series + "</td><td width='80px;'>" + moreReps + lessReps + "</td></tr>");
    }
    $(".containerRoutines").append("</tbody></table></div>");
    // $(".containerRoutines").append("</tbody></table></div><button name='" + json.routines[indexRoutine].days[indexDay].id + "' class='nextDay'>Siguiente dia</button>");
    $(".nextDay").click(function () {
        console.log($(this).attr("name"));
    });
    buttonMoreLess();
}