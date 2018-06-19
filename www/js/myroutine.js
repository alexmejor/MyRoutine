$(document).ready(function () {

    var lessReps = "<button class='lessReps'>-</button>";
    var moreReps = "<button class='moreReps'>+</button>";
    var nextRoutine = '<button style="display: none;" id="buttonNext">Siguiente rutina</button>';
    var json;
    var user;
    var categories;
    var jsonPost = {
        "name": "",
        "surname": "",
        "nick": "",
        "age": "",
        "weight": "",
        "gender": "",
        "email": "",
        "password": "",
    }

    displayLogin("", "", "");

    $("#headerNav").click(openNav);
    $("#overlay-back").click(closeNav);

    $("#home").click(function () {
        displayHome(json, categories);
        closeNav();
        $(".titleHeader").html("Inicio");
    });

    $("#logout").click(function () {
        closeNav();
        $(".containerLogin").show();
        displayLogin("", "", "");
    });

    $("#myaccount").click(function () {
        displayProfile();
        closeNav();
        $(".titleHeader").html("Mi perfil");
    });

    $("#routines").click(function () {
        closeNav();
        displayRoutineSection(json, categories);
        $(".titleHeader").html("Entrenamientos");
    });

    $("#records").click(function () {
        closeNav();
        displayRecords(json, categories);
    });

    $("#exercices").click(function () {
        closeNav();
        displayMuscleGroups(categories);
        $(".titleHeader").html("Ejercicios");
    });


    /* --- START BUTTON NEXT DAY --- */
    //button to go to next day
    $("#buttonNext").click(function () {
        $.ajax({
            url: "http://snowboardhome.sytes.net/tfgs/tablas.php",
            type: "GET",
            data: {
                pattern2: ""
            },
            dataType: "json",
            success: function (respuesta) {
                $(".container").append(printRoutine(respuesta));
                buttonMoreLess();
            }
        });
    });

    // loading function while ajax is loading
    $(document).on({
        ajaxStart: function () {
            $(".loadAjaxmodal").show();
            $(".modal-contentAjax").show();
        },
        ajaxStop: function () {
            $(".modal-contentAjax").hide();
            $(".loadAjaxmodal").hide();
        }
    });

});

function displayLogin(user, password, msg) {
    resetContainers();
    $(".headerNav").hide();
    $(".sideNav").hide();
    $(".container").hide();
    $(".containerLogin").html(`
        <h2>MyRoutine</h2>
        <div style='height:10px; width:100%; color:red; text-align:center'>${msg}</div>
        <form id="idForm">
            <input value="${user}" placeholder="Nombre de usuario..." type="text" name="email"><br>
            <input value="${password}" placeholder="Contraseña..." type="password" name="pwd"><br><br>
            <input type="submit" value='Entrar'><br>
            <p style="text-align:center;color:white">¿No tienes una cuenta? <b>Registrate</b></p>
        </form>`);

    $("form b").click(function () {
        $(".containerLogin").hide();
        $(".containerRegister").html(`
            <div class="profile">
                <form>
                    <h3 style='text-align:center'>Registro de usuario</h3>
                    <input key="name" type="text" placeholder="Nombre"><br>
                    <input key="surname" type="text" placeholder="Apellidos"><br>
                    <input key="nick" type="text" placeholder="Nombre de usuario"><br>
                    <input type="number" key="age" placeholder="Edad"><br>
                    <input type="number" key="weight" placeholder="Peso"><br>
                    <select>
                        <option disabled selected>- Sexo -</option>
                        <option>Hombre</option>
                        <option>Mujer</option>
                    </select><br>
                    <input type="text" key="email" placeholder="Email"><br>
                    <input key="password" type="password" placeholder="Contraseña"><br>
                    <button class="button">Cancelar</button>
                    <button class="button">Enviar</button>
                </form>
            </div>`);

        $(".button").eq(0).click(function () {
            $(".containerRegister").html("");
            $(".containerLogin").show();
            displayLogin("", "", "");
        });

        $(".button").eq(1).click(function () {
            jsonPost["gender"] = $("select").val();
            $("input").each(function () {
                jsonPost[$(this).attr("key")] = $(this).val();
            });
            $.ajax({
                url: 'http://18.191.145.139/Login/resources/users/',
                type: 'post',
                Accept: "application/json",
                contentType: "application/json",
                data: JSON.stringify(jsonPost),
                async: false,
                success: function (response) {
                    json = response;
                    user = response.email;
                    $(".containerRegister").html("");
                    $(".containerLogin").show();
                    displayLogin(json.email, jsonPost.password, "<label style='color:green'>¡Usuario registrado!</span>");
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    $(".containerRegister").html("");
                    $(".containerLogin").show();
                    displayLogin("", "", "Error al crear el usuario");
                }
            });
        });
    });
    $("#idForm").submit(function (event) {
        event.preventDefault(); //prevent default action
        var form_data = $(this).serialize(); //Encode form elements for submission
        $.ajax({
            url: "http://18.191.145.139/Login/resources/login",
            type: 'post',
            dataType: "text",
            data: form_data,
            async: false,
            success: function (response) {
                $(".headerNav").show();
                $(".sideNav").show();
                $(".container").show();
                $(".containerLogin").hide();
                token = "Bearer " + response;
                user = $("#idForm").find("input").eq(0).val();
                console.log(token);
                console.log(user);
                $.ajax({
                    url: 'http://18.191.145.139/Login/resources/users/' + user,
                    type: 'get',
                    headers: { 'Authorization': token, },
                    async: false,
                    success: function (response) {
                        json = response;
                        user =
                            console.log(response);
                    }
                });
                $.ajax({
                    url: 'http://18.191.145.139/Login/resources/categories',
                    type: 'get',
                    headers: { 'Authorization': token, },
                    async: false,
                    success: function (response) {
                        categories = response;
                    }
                });
                displayHome(json, categories);
            },
            error: function (response) {
                console.log("error");
                $(".containerLogin div").html("Usuario o contraseña incorrectos");
            }
        });
    });
}

function ajaxPut() {
    $.ajax({
        url: 'http://18.191.145.139/Login/resources/users/' + json.email,
        type: 'put',
        headers: { 'Authorization': token, },
        Accept: "application/json",
        contentType: "application/json",
        data: JSON.stringify(json),
        async: false,
        success: function (response) {
            $(".modal").show();
            $(".modal-content").show(500);
            $(".close").click(function () {
                $(".modal-content").hide(500);
                $(".modal").hide(500);
            });
            json = response;
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            $(".modal").show();
            $(".modal-content").find("p").html("Error");
            $(".modal-content").find("button").css("color", "#b51a1a");
            $(".modal-content").show(500);
            $(".close").click(function () {
                $(".modal-content").hide(500);
                $(".modal").hide(500);
            });
        }
    });
}

//This opens the toggle menu
function openNav() {
    $("#mySidenav").addClass("activeMenu");
    //$(".container").removeClass("fromRightToLeft");
    //$("body").css("overflow","hidden");
    $('#mySidenav, #overlay-back').on('touchmove', function (e) {
        e.preventDefault();

    });
    $('#overlay, #overlay-back').fadeIn(500);
    //document.getElementById("mySidenav").style.width = "250px";
}

//This closes the toggle menu
function closeNav() {
    $("#mySidenav").removeClass("activeMenu");
    //$("body").css("overflow","scroll");
    jQuery('body').unbind('touchmove');
    $('#overlay, #overlay-back').fadeOut(500);
    //document.getElementById("mySidenav").style.width = "0";
}

function resetContainers() {
    $("#headerNav").removeClass("arrow cross").addClass("trigram");
    $("#headerNav").unbind();
    $("#headerNav").click(openNav);
    $(".containerError").html("");
    $(".containerHome").html("");
    $(".containerLogin").html("");
    $(".containerProfile").html("");
    $(".containerRoutines").html("");
    $(".containerRecords").html("");
    $(".containerExercices").html("");
}

function displayProfile() {
    resetContainers();
    var gender;
    if (json.gender == "Hombre") {
        gender = '<select><option selected="selected">Hombre</option><option>Mujer</option></select>';
    } else {
        gender = '<select><option>Hombre</option><option selected="selected">Mujer</option></select>';
    }
    $(".containerProfile").append('<div class="profile"><form><label>Nombre</label><br><input key="name" value="' + json.name + '" type="text" placeholder="Nombre"><br><label>Apellidos</label><br><input key="surname" value="' + json.surname + '" type="text" placeholder="Apellidos"><br><label>Nombre de usuario</label><br><input key="nick" value="' + json.nick + '" type="text" placeholder="Nombre de usuario"><br><label>Edad</label><br><input type="number" key="age" value="' + json.age + '" placeholder="Edad"><br><label>Peso</label><br><input type="number" key="weight" value="' + json.weight + '" placeholder="Peso"><br><label>Sexo</label><br>' + gender + '<br><label>Email</label><br><input type="text" key="email" value="' + json.email + '" readonly placeholder="Email"><br><label>Contraseña</label><br><input key="" value="' + json.password + '" type="password" placeholder="Contraseña"><br><span id="saveProfile">&#10004;</span></form></div>');
    $("#saveProfile").click(function () {
        json["gender"] = $("select").val();
        $("input").each(function () {
            json[$(this).attr("key")] = $(this).val();
        });
        // $(".modal").show();
        // $(".modal-content").show(500);
        // $(".close").click(function () {
        //     $(".modal-content").hide(500);
        //     $(".modal").hide(500);
        //     displayProfile();
        // });
        ajaxPut();

    });
}

//This checks if the day is completed and if it is, it adds a button to go to the next day.
function checkDayCompleted() {
    var finished = true;
    var numSets = $(".sets");
    for (var i = 0; i < numSets.length; i++) {
        if (numSets.eq(i).html() != 0) {
            finished = false;
            break;
        }
    }
    $(".finishedTitle").hide();
    if (finished) {
        if ($(".finishedTitle").hide()) {
            $(".finishedTitle").show()
        }
    }
}

//This adds more or takes away repetitions in the active day
function buttonMoreLess() {
    var counter = 0;
    $(".moreReps").click(function () {
        var index = $(this).closest('tr').index();
        var index = index + 1;
        var sets = $("tr").eq(index).find("td").eq(2).html();
        sets = parseInt(sets);
        if (sets >= 0) {
            $("tr").eq(index).find("td").css("background-color", "transparent");
            counter--;
        }
        if ($(".finishedTitle").show()) {
            $(".finishedTitle").hide();
        }
        sets = sets + 1;
        $("tr").eq(index).find("td").eq(2).html(sets);
    });

    $(".lessReps").click(function () {
        var index = $(this).closest('tr').index();
        var index = index + 1;
        var sets = $("tr").eq(index).find("td").eq(2).html();
        sets = parseInt(sets)
        if (sets != 0) {
            sets = sets - 1;
            $("tr").eq(index).find("td").eq(2).html(sets);
        }
        if (sets == 0) {
            $("tr").eq(index).find("td").css("background-color", "rgb(89, 255, 0)");
            counter++;
        }
        checkDayCompleted();
    });
}


function displayMuscleGroups(categories) {
    resetContainers();
    //$(".container").addClass("fromRightToLeft");
    $(".containerExercices").html("");
    for (var i = 0; i < categories.length; i++) {
        $(".containerExercices").append(`
            <div name="${i}" class="w3-display-container">
                <div class="w3-display-left"><img src="${categories[i].img}">
                    <span>${categories[i].name}</span>
                </div>
                <div class="w3-display-right"><i></i></div>
            <div>`);
    }
    //It shows all the exercices when you click on a muscular group
    $(".w3-display-container").on("click", function () {
        var thisEle = $(this);
        var indexGroup = $(thisEle).attr("name");
        $(".titleHeader").html(categories[indexGroup].name);
        displayExercices(thisEle, categories);
    });
}

function displayExercices(thisEle, categories) {
    $(".containerExercices").html("");
    var indexGroup = $(thisEle).attr("name");
    for (var j = 0; j < categories[indexGroup].exercisesNames.length; j++) {
        var name = categories[indexGroup].exercisesNames[j];
        $(".containerExercices").append(`
            <div name="${indexGroup}" class="w3-display-container">
                <div name="${j}" class="w3-display-left">
                    <img src="${categories[indexGroup].exercisesNames[j].img1}">
                    <label>${categories[indexGroup].exercisesNames[j].name}</label>
                </div>
                <div class="w3-display-right"><i></i></div>
            <div>`);
    }
    //it shows the info of each exercice (description, name, images)
    $(".w3-display-container").on("click", function () {
        $(".containerExercices").html("");
        var thisEle = $(this);
        displayExerciceInfo(thisEle, categories);
    });

    //changes the navMenu icon for an left arrow
    $("#headerNav").removeClass("trigram").addClass("arrow");
    //removes the function of navMenu so I can add the function to go previous page
    $("#headerNav").unbind();
    //To go back to the previous section
    $(".arrow").click(function () {
        $(".titleHeader").html("Ejercicios");
        displayMuscleGroups(categories);
    });
}

function displayExerciceInfo(thisEle, categories) {
    var indexGroup = $(thisEle).attr("name");
    var indexExercice = $(thisEle).find(".w3-display-left").attr("name");
    var imagesGallery = `
        <div class="swiper-container">
            <div class="swiper-wrapper">
                <div class="swiper-slide">
                    <img width="100%" src="${categories[indexGroup].exercisesNames[indexExercice].img1}">
                </div>
                <div class="swiper-slide">
                    <img width="100%" src="${categories[indexGroup].exercisesNames[indexExercice].img2}">
                </div>
            </div>
            <div class="swiper-pagination"></div>
        </div>`;

    $(".containerExercices").html(`<h4 style='text-align:center'>${categories[indexGroup].exercisesNames[indexExercice].name}</h4> ${imagesGallery}`);
    $(".containerExercices").append("<div style='padding: 15px;'>" + categories[indexGroup].exercisesNames[indexExercice].description + "</div>");

    //changes the navMenu icon for an left arrow
    $("#headerNav").removeClass("trigram").addClass("arrow");
    //removes the function of navMenu so I can add the function to go previous page
    $("#headerNav").unbind();
    //To go back to the previous section
    $(".arrow").click(function () {
        var indexGroup = $(thisEle).attr("name");
        $(".titleHeader").html(categories[indexGroup].name);
        displayExercices(thisEle, categories);
    });
    // Init Swiper
    var swiper = new Swiper('.swiper-container', {
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        // Enable debugger
        debugger: true,
    });
}

function displayRecords(json, categories) {
    resetContainers();
    $(".titleHeader").html("Marcas Personales");

    $(".containerRecords").html(`
        <table style='margin-bottom:70px;'>
            <thead>
                <tr>
                    <th>Ejercicio</th>
                    <th>Peso</th>
                    <th>Reps</th>
                </tr>
            </thead>
            <tbody>`);

    for (var i = 0; i < json.records.length; i++) {
        $(".containerRecords tbody").append(`
            <tr>
                <td>${json.records[i].exerciseName.name}</td>
                <td>${json.records[i].kilos}kg</td>
                <td>${json.records[i].repetitions}</td>
                <td></td>
            </tr>`);
    }

    $(".containerRecords").append(`
        </tbody>
        </table>
        <div class="addButton">
            <i class="fas fa-plus"></i>
        </div>
        <div class="editButton">
            <i class="fas fa-pencil-alt"></i>
        </div>`);

    $(".addButton").click(function () {
        $(".titleHeader").html("Nueva Marca");
        createRecord(json, categories);
    });

    $(".editButton").click(function () {
        $(".titleHeader").html("Editar Marcas");
        editRecord(json, categories);
    });
}

function createRecord(json, categories) {
    $(".containerRecords").html(`
        <form>
            <input placeholder='Repeticiones...' min=0 type='number'><br><br>
            <input placeholder='Peso...' min=0 type='number'><br><br>
            <select id='exerciceGroup'>
                <option disabled selected>- Seleccione ejercicio - </option>`);

    for (var i = 0; i < categories.length; i++) {
        $(".containerRecords select").append("<option>" + categories[i].name + "</option>");
    }

    $(".containerRecords").append("</select><br><br>");
    $("#exerciceGroup").change(function () {
        var containerToRemove = ".containerRecords";
        $(containerToRemove + " .selectExercices").remove();
        for (var i = 0; i < categories.length; i++) {
            if ($(".containerRecords select").val() == categories[i].name) {
                $(".containerRecords form").append("<span class='selectExercices'></span>");
                $(".selectExercices").append("<br><br><select class='exercice'>");
                for (var j = 0; j < categories[i].exercisesNames.length; j++) {
                    $(".selectExercices select").append("<option>" + categories[i].exercisesNames[j].name + "</option>");
                }
                $(".selectExercices").append("</select><br><br>");
            }
        }
    });
    $(".containerRecords").append('</form><div class="saveButton">&#10004;</div>');

    $("#headerNav").removeClass("arrow trigram").addClass("cross");
    $("#headerNav").unbind();
    $(".cross").click(function () { displayRecords(json, categories) });

    $(".saveButton").click(function () {
        saveNewRecord(json, categories);
    });
}

function editRecord(json, categories) {
    $(".containerRecords").html(`
        <table style='margin-bottom:70px;'>
            <thead>
                <tr>
                    <th>Ejercicio</th>
                    <th>Peso</th>
                    <th>Reps</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>`);

    for (var i = 0; i < json.records.length; i++) {
        $(".containerRecords tbody").append(`
            <tr>
                <td>${json.records[i].exerciseName.name}</td>
                <td><input type='number' key='kilos' min=0 style='width:60px' value='${json.records[i].kilos}'></td>
                <td><input style='width:60px' min=0 key='repetitions' type='number' value='${json.records[i].repetitions}'></td>
                <td class='deleteRecord'>&#10008</td>
            </tr>`);
    }

    $(".containerRecords").append('</tbody></table><div class="saveButton">&#10004;</div>');
    $(".deleteRecord").click(function () {
        var indexRecord = $("tr").index($(this).parent("tr:first")) - 1;
        json.records.splice(indexRecord, 1);
        ajaxPut();
        displayRecords(json, categories);
    });
    $("#headerNav").removeClass("arrow trigram").addClass("cross");
    $("#headerNav").unbind();
    $(".cross").click(function () { displayRecords(json, categories) });

    $(".saveButton").click(function () {
        for (var i = 0; i < json.records.length; i++) {
            $("tbody tr").eq(i).find("input").each(function () {
                json.records[i][$(this).attr("key")] = $(this).val();
            });
        }
        ajaxPut();
        displayRecords(json, categories);
    });
}

function saveNewRecord(json, categories) {
    var records = [];
    var exerciceId;
    for (var j = 0; j < categories.length; j++) {
        for (var i = 0; i < categories[j].exercisesNames.length; i++) {
            if (categories[j].exercisesNames[i].name == $("select").eq(1).val()) {
                exerciceId = categories[j].exercisesNames[i].id;
            }
        }
    }

    if ($("input").eq(0).val() == "" || $("input").eq(1).val() == "" || $("select").eq(1).val() == null) {
        $(".containerError").html("<br><p>No pueden haber campos vacios</p>");
    }
    else {
        records = {
            "exerciseName": {
                "description": "",
                "id": exerciceId,
                "name": $("select").eq(1).val(),
            },
            "repetitions": $("input").eq(0).val(),
            "kilos": $("input").eq(1).val(),
        };
        json["records"].push(records);
        ajaxPut();
        displayRecords(json, categories);
    }
}

function displayHome(json, categories) {
    resetContainers();
    $(".titleHeader").html("Inicio");
    $(".containerHome").html(`<div style="width: 90%; margin: 40px auto;">
                                    <div id="startTraining" class="homeSectionButtons">
                                        <i class="fas fa-play-circle"></i>comenzar a entrenar
                                    </div>
                                    <div id="changeActiveRoutine" class="homeSectionButtons">
                                        <i class="fas fa-pen-square"></i>cambiar rutina
                                    </div>
                                    <div class="homeSectionButtons" id="createRoutine">
                                        <i class="fas fa-plus-circle"></i>nuevo entrenamiento
                                    </div>
                                </div>`);

    $("#createRoutine").click(function () {
        var container = ".containerHome";
        createRoutine(json, categories, container);
    });

    $("#startTraining").click(function () {
        startTraining(json, categories);
    });

    $("#changeActiveRoutine").click(function () {
        changeActiveRoutine(json, categories);
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
    $(".titleHeader").html("Rutina Activa");
    if (!json.routines.length) {
        $(".containerRoutines").html("<h4 style='text-align:center'>Aun no tienes ninguna rutina en la base de datos</h4><button class='button createRoutine'>Crear Rutina</button>");
        var container = ".containerRoutines";
        $(".createRoutine").eq(0).click(function () { createRoutine(json, categories, container) });
    }
    else {
        for (var i = 0; i < json.routines.length; i++) {
            if (json.routines[i].id == json.activeRoutine) {
                console.log(json.routines[i].id + " rutina activa : " + activeRoutine);
                displayDays(json, categories, null, i);
            }
            else {
                //$(".containerRoutines").html("<h3>No tienes ninguna rutina activa</h3>");
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
    $(".titleHeader").html("Nueva Rutina");
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
        $(".saveExercice").eq(0).click(function () {
            $(".tableDay tbody").append("<tr><td key='name'>" + $(".exercice").val() + "</td><td key='repetitions'>" + $(".reps").val() + "</td><td key='series'>" + $(".sets").val() + "</td></tr>");
            $(".saveDay").remove();
            $(".tableDay").append("<button class='saveDay'>Guardar Día</button>");
            $(".saveDay").eq(0).click(function () {
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
            });
        });
    });
}

function startTraining(json, categories) {
    var indexRoutine;
    var indexDay = 0;
    $(".titleHeader").html("Comenzar Entrenamiento");
    $("#headerNav").removeClass("cross trigram").addClass("arrow");
    $("#headerNav").unbind();
    $(".arrow").eq(0).click(function () {
        displayHome(json, categories);
    });
    for (var i = 0; i < json.routines.length; i++) {
        if (json.routines[i].id == json.activeRoutine) {
            indexRoutine = i;
        }
    }
    $(".containerHome").html("");

    $(".containerHome").append("<h4 style='text-align:center'>" + json.routines[indexRoutine].days[indexDay].name + "</h4><p class='finishedTitle' style='display:none;text-align:center;'><b>¡Día Completado!</b></p><div class='tableDay'><table><thead><tr><th>Ejercicios</th><th>Reps.</th><th>Series</th><th></th></tr></thead><tbody>");
    for (var i = 0; i < json.routines[indexRoutine].days[indexDay].exercises.length; i++) {
        $(".containerHome tbody").append("<tr><td>" + json.routines[indexRoutine].days[indexDay].exercises[i].exerciseName.name + "</td><td>" + json.routines[indexRoutine].days[indexDay].exercises[i].repetitions + "</td><td class='sets'>" + json.routines[indexRoutine].days[indexDay].exercises[i].series + "</td><td width='80px;'>" + moreReps + lessReps + "</td></tr>");
    }
    $(".containerHome").append("</tbody></table></div>");
    $(".nextDay").click(function () {
        console.log($(this).attr("name"));
    });
    buttonMoreLess();
}

function changeActiveRoutine(json, categories) {
    $(".containerHome").html("<table><tbody><tr><th style='text-align:left;padding-left:35px;'>Rutinas</th><th>Estado</th></tr>");
    var activeButton;
    $(".titleHeader").html("Cambiar Rutina");
    $("#headerNav").removeClass("cross trigram").addClass("arrow");
    $("#headerNav").unbind();
    $(".arrow").eq(0).click(function () {
        displayHome(json, categories);
    });
    for (var i = 0; i < json.routines.length; i++) {
        if (json.routines[i].id == json.activeRoutine) {
            activeButton = "<span style='color:green'>Activa</span>";
        }
        else {
            activeButton = `<button name='${i}' class='changeRoutine'>Activar</button></td>`;
        }
        $(".containerHome tbody").append(`
            <tr>
                <td style='padding-left:35px;'>${json.routines[i].name}</td>
                <td>${activeButton}</td>`);
    }
    $(".containerHome").append("</tbody></table>");

    $(".changeRoutine").eq(0).click(function () {
        json["activeRoutine"] = json.routines[$(this).attr("name")].id;
        ajaxPut();
        changeActiveRoutine(json, categories);
        // $(".containerHome").html("");
        // displayActiveRoutine(json, categories);
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
    $(".cross").eq(0).click(function () {
        displayDays(json, categories, null, indexRoutine);
    });
    $(".containerRoutines").html(`<br>
        <b>Nombre de la rutina</b><br><input class='input' type='text' value='${routineName}'><br><br>
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

    $(".deleteDay").eq(0).click(function () {
        var indexDay = $("tr").index($(this).parent("tr:first")) - 1;
        json.routines[indexRoutine].days.splice(indexDay, 1);
        // ajaxPut();
        displayEditDays(json, categories, thisEle, indexNewRoutine);
    });
    $(".saveButton").eq(0).click(function () {
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
    $(".titleHeader").html("Entrenamientos");
    $(".arrow").eq(0).click(function () {
        // displayDays(json, categories, null, indexRoutine);
        displayRoutines(json, categories)
    });
    $(".containerRoutines").html(`<h4 style='text-align:center'>Rutina ${routineName}</h4>`);
    for (var j = 0; j < json.routines[indexRoutine].days.length; j++) {
        //var name = categories[indexGroup].exercicesName[j];
        $(".containerRoutines").append('<div name="' + indexRoutine + '" class="selectDay"><div name="' + j + '">' + json.routines[indexRoutine].days[j].name + '</div><div>');
    }

    //if this routine is active it shows "this is active" if it isn't, it shows a button to active it
    var active;
    if (json.routines[indexRoutine].id == json.activeRoutine) {
        active = "<span style='color:green'>Rutina Activa</span><br>"
    }
    else {
        active = "<button class='button activateRoutine'>Activar rutina</button><br>";
    }

    $(".containerRoutines").append(`
        ${active}
        <button class='deleteRoutine button'>Eliminar rutina</button><div><div class="addButton"><i class="fas fa-plus"></i></div><div class="editButton"><i class="fas fa-pencil-alt"></i></div>`);

    $(".deleteRoutine").eq(0).click(function () {
        json.routines.splice(indexRoutine, 1);
        ajaxPut();
        displayRoutines(json, categories);
    });

    $(".activateRoutine").eq(0).click(function () {
        json["activeRoutine"] = json.routines[indexRoutine].id;
        ajaxPut();
        displayActiveRoutine(json, categories);
    });

    var container = ".containerRoutines";
    $(".addButton").eq(0).click(function () { createDay(json, categories, container, indexRoutine, null, routineName) });
    $(".editButton").eq(0).click(function () { displayEditDays(json, categories, thisEle, indexNewRoutine) });

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
    $(".arrow").eq(0).click(function () {
        displayDays(json, categories, thisEle, null);
    });
    // $(".titleHeader").html(json.routines[indexRoutine].name);
    $(".containerRoutines").html("");
    //$(".titleHeader").html(categories[indexGroup].exercicesName[indexExercice].name);
    $(".containerRoutines").append("<h4 style='text-align:center'>" + json.routines[indexRoutine].days[indexDay].name + "</h4><p class='finishedTitle' style='display:none;text-align:center;'><b>¡Día Completado!</b></p><div class='tableDay'><table><thead><tr><th>Ejercicios</th><th>Reps.</th><th>Series</th><th></th></tr></thead><tbody>");
    for (var i = 0; i < json.routines[indexRoutine].days[indexDay].exercises.length; i++) {
        $(".containerRoutines tbody").append("<tr><td>" + json.routines[indexRoutine].days[indexDay].exercises[i].exerciseName.name + "</td><td>" + json.routines[indexRoutine].days[indexDay].exercises[i].repetitions + "</td><td class='sets'>" + json.routines[indexRoutine].days[indexDay].exercises[i].series + "</td><td width='80px;'>" + moreReps + lessReps + "</td></tr>");
    }
    $(".containerRoutines").append("</tbody></table></div>");
    // $(".containerRoutines").append("</tbody></table></div><button name='" + json.routines[indexRoutine].days[indexDay].id + "' class='nextDay'>Siguiente dia</button>");
    $(".nextDay").eq(0).click(function () {
        console.log($(this).attr("name"));
    });
    buttonMoreLess();
}