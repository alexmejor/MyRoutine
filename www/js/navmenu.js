// var token = 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhbGV4QGFsZXguY29tIn0.3pxYdlpyjTZAX6KFbLm5IZKh2_8nwHBonaofZ6sgxMNK0gS5Yi56fjjboawtO3s35qhn6sbQgaE8iQPXgoEajw';
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

function displayLogin(user, password, msg) {
    resetContainers();
    $(".headerNav").hide();
    $(".sideNav").hide();
    $(".container").hide();
    $(".containerLogin").html(`
        <h2>MyRoutine</h2>
        <div style='height:10px; width:100%; color:red; text-align:center'>${msg}</div>
        <form action="javascript:void(0);" id="idForm">
            <input value="${user}" placeholder="Nombre de usuario..." type="text" name="email"><br>
            <input value="${password}" placeholder="Contraseña..." type="password" name="pwd"><br><br>
            <input type="submit" value='Entrar'><br>
            <p style="text-align:center;color:white">¿No tienes una cuenta? <b>Registrate</b></p>
        </form>`);

    $("form b").click(function () {
        $(".containerLogin").hide();
        $(".containerRegister").html(`
            <div class="profile">
                <form action="javascript:void(0);">
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
