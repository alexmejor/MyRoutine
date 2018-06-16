$(document).ready(function () {

    var json = {
        "name": "alex",
        "surname": "frutos",
        "nick": "Alexfiweb",
        "age": 26,
        "weight": 76,
        "gender": "hombre",
        "email": "alex@myroutine.com",
        "password": "123123",
        "records": [
            {
                "exerciseName": {
                    "description": "",
                    "name": "press banca barra",
                    "id": 2,
                },
                "repetitions": 2,
                "weight": 120,
            },
            {
                "exerciseName": {
                    "description": "",
                    "name": "dominadas",
                    "id": 2,
                },
                "repetitions": 4,
                "weight": 30,
            },
            {
                "exerciseName": {
                    "description": "",
                    "name": "press banca barra",
                    "id": 2,
                },
                "repetitions": 2,
                "weight": 120,
            },
            {
                "exerciseName": {
                    "description": "",
                    "name": "dominadas",
                    "id": 2,
                },
                "repetitions": 4,
                "weight": 30,
            },
            {
                "exerciseName": {
                    "description": "",
                    "name": "press banca barra",
                    "id": 2,
                },
                "repetitions": 2,
                "weight": 120,
            },
            {
                "exerciseName": {
                    "description": "",
                    "name": "dominadas",
                    "id": 2,
                },
                "repetitions": 4,
                "weight": 30,
            },
            {
                "exerciseName": {
                    "description": "",
                    "name": "press banca barra",
                    "id": 2,
                },
                "repetitions": 2,
                "weight": 120,
            },
            {
                "exerciseName": {
                    "description": "",
                    "name": "dominadas",
                    "id": 2,
                },
                "repetitions": 4,
                "weight": 30,
            }
        ],
        "routines": [
            {
                "name": "Entrenamiento Espartano",
                "category": "definicion",
                "days": [
                    {
                        "exercises": [
                            {
                                "exerciseName": {
                                    "description": "",
                                    "name": "press banca mc",
                                    "id": 1,
                                },
                                "repetitions": 12,
                                "series": 3,
                            },
                            {
                                "exerciseName": {
                                    "description": "",
                                    "name": "remo",
                                    "id": 4,
                                },
                                "repetitions": 12,
                                "series": 3,
                            }
                        ],
                        "name": "dia 1",
                        "id": 3,
                    },
                    {
                        "exercises": [
                            {
                                "exerciseName": {
                                    "description": "",
                                    "name": "press banca barra",
                                    "id": 2,
                                },
                                "repetitions": 12,
                                "series": 3,
                            },
                            {
                                "exerciseName": {
                                    "description": "",
                                    "name": "dominadas",
                                    "id": 2,
                                },
                                "repetitions": 12,
                                "series": 3,
                            }
                        ],
                        "name": "dia 2",
                        "id": 1,
                    },
                ]
            },
        ],
    };

    var categories = [
        {
            "name": "pecho",
            "img": "images/pecho2.png",
            "exercicesName": [
                {
                    "id": 1,
                    "name": "press banca mc",
                    "description": "Acostados boca arriba sobre un banco plano. El torso debe estar apoyado desde la cabeza a las caderas, con las piernas dobladas y los pies asegurados.<br>Agarrad una mancuerna en cada mano y sujetad los pesos directamente encima del pecho. Las palmas deben mirar hacia los pies. Es el punto de partida.<br>Doblad los brazos para bajar las mancuernas hacia la parte externa del pecho, manteniendo los codos apuntando hacia los lados. Tomad aire y retened la respiración mientras empezáis a bajar el peso.<br>Revertid la dirección cuando las mancuernas lleguen a la posición final, y devolved las al punto de partida siguiendo la dirección de un arco.<br>Expulsad el aire una vez que hayáis superado el punto de estancamiento (el más difícil del intervalo de recorrido).<br>Deteneos un instante con los brazos estirados pero no hiperextendidos. Repetid las veces necesarias.<br>Estad seguros de subir las mancuernas de manera que permanezcan sobre un plano vertical directamente encima de los hombros en la posición final.",
                    "img1": "images/posi1.png",
                    "img2": "images/posi2.png",
                },
                {
                    "id": 2,
                    "name": "press banca barra",
                    "description": "blablablabla",
                    "img1": "images/posi2.png",
                    "img2": "images/asd.jpg",
                }
            ]
        },
        {
            "name": "espalda",
            "img": "images/espalda.png",
            "exercicesName": [
                {
                    "id": 3,
                    "name": "dominadas",
                    "description": "blablablabla",
                    "img1": "",
                    "img2": "",
                },
                {
                    "id": 4,
                    "name": "remo",
                    "description": "blablablabla",
                    "img1": "",
                    "img2": "",
                }
            ]
        }
    ];


    // BUTTONS
    var lessReps = "<button class='lessReps'>-</button>";
    var moreReps = "<button class='moreReps'>+</button>";
    var nextRoutine = '<button style="display: none;" id="buttonNext">Siguiente rutina</button>';



    var json;
    //        $.ajax({
    //            url: 'http://localhost:8080/Login/resources/users/alex@alex.com',
    //            type: 'get',
    //            async: false,
    //            success: function (response) {
    //                json = response;
    //            }
    //        });
    console.log(json);
    displayHome(json, categories);

    $("#headerNav").click(openNav);
    $("#overlay-back").click(closeNav);

    $("#home").click(function () {
        displayHome(json, categories);
        closeNav();
        $(".titleHeader").html("Inicio");
    });

    $("#myaccount").click(function () {
        displayProfile();
        closeNav();
        $(".titleHeader").html("Mi perfil");
    });

    $("#routines").click(function () {
        closeNav();
        displayRoutineSection();
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



    /* --- ALL VIEWS --- */


    function displayProfile() {
        resetContainers();
        var gender;
        if (json.gender == "Hombre") {
            gender = '<select><option selected="selected">Hombre</option><option>Mujer</option></select>';
        } else {
            gender = '<select><option>Hombre</option><option selected="selected">Mujer</option></select>';
        }
        $(".containerProfile").append('<div class="profile"><form><label>Nombre</label><br><input key="name" value="' + json.name + '" type="text" placeholder="Nombre"><br><label>Apellidos</label><br><input key="surname" value="' + json.surname + '" type="text" placeholder="Apellidos"><br><label>Nombre de usuario</label><br><input key="nick" value="' + json.nick + '" type="text" placeholder="Nombre de usuario"><br><label>Edad</label><br><input type="number" key="age" value="' + json.age + '" placeholder="Edad"><br><label>Peso</label><br><input type="number" key="weight" value="' + json.weight + '" placeholder="Peso"><br><label>Sexo</label><br>' + gender + '<br><label>Email</label><br><input type="text" key="email" value="' + json.email + '" readonly placeholder="Email"><br><label>Contraseña</label><br><input key="password" value="' + json.password + '" type="password" placeholder="Contraseña"><br><span id="saveProfile">&#10004;</span></form></div>');
        $("#saveProfile").click(function () {
            json["gender"] = $("select").val();
            $("input").each(function () {
                json[$(this).attr("key")] = $(this).val();
            });
            console.log(json);
            $(".modal").show();
            $(".modal-content").show(500);
            $(".close").click(function () {
                $(".modal-content").hide(500);
                $(".modal").hide(500);
                displayProfile();
            });
            //            $.ajax({
            //                url: 'http://localhost:8080/Login/resources/users/alex@alex.com',
            //                type: 'put',
            //                Accept: "application/json",
            //                contentType: "application/json",
            //                data: JSON.stringify(json),
            //                success: function (response) {
            //                    $(".modal").show();
            //                    $(".modal-content").show(500);
            //                    $(".close").click(function () {
            //                        $(".modal-content").hide(500);
            //                        $(".modal").hide(500);
            //                        displayProfile();
            //                    });
            //                },
            //                error: function (XMLHttpRequest, textStatus, errorThrown) {
            //                    $(".modal").show();
            //                    $(".modal-content").find("p").html("Error");
            //                    $(".modal-content").find("button").css("color", "#b51a1a");
            //                    $(".modal-content").show(500);
            //                    $(".close").click(function () {
            //                        $(".modal-content").hide(500);
            //                        $(".modal").hide(500);
            //                    });
            //                }
            //            });

        });
    }

    function displayRoutineSection() {
        resetContainers();
        $(".containerRoutines").append('<div style="width: 90%; margin: 80px auto;"><div class="routineSectionButtons">Rutina activa</div><div class="routineSectionButtons">ver rutinas</div></div>');
        $(".routineSectionButtons").eq(1).on("click", displayRoutines);
    }

    function displayRoutines() {
        $("#headerNav").removeClass("trigram").addClass("arrow");
        //removes the function of navMenu so I can add the function to go previous page
        $("#headerNav").unbind();
        //To go back to the previous section
        $(".arrow").click(function () {
            displayRoutineSection()
        });
        $(".containerRoutines").html("");
        for (var i = 0; i < json.routines.length; i++) {
            $(".containerRoutines").append(`
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
        $(".editButton").click(function() {createRoutine(json, categories)});
        var indexRoutine = $(".w3-display-container").attr("name");
        $(".w3-display-container").on("click", function () {
            var thisEle = $(this);
            var indexGroup = $(thisEle).attr("name");
            //$(".titleHeader").html(categories[indexGroup].name);
            displayDays(thisEle, indexRoutine);
        });
    }

    function displayDays(thisEle, indexRoutine) {
        var indexRoutine = $(thisEle).attr("name");
        $(".arrow").click(function () {
            displayRoutines()
        });
        $(".containerRoutines").html(`<h4 style='text-align:center'>${json.routines[indexRoutine].name}</h4>`);
        for (var j = 0; j < json.routines[indexRoutine].days.length; j++) {
            //var name = categories[indexGroup].exercicesName[j];
            $(".containerRoutines").append('<div name="' + indexRoutine + '" class="selectDay"><div name="' + j + '">' + json.routines[indexRoutine].days[j].name + '</div><div>');
        }

        $(".containerRoutines").append('<div><div class="addButton"><i class="fas fa-plus"></i></div><div class="editButton"><i class="fas fa-pencil-alt"></i></div>');
        var container = ".containerRoutines";
        $(".addButton").click(function(){createDay(json, categories, container, indexRoutine)});

        //it shows the info of each exercice (description, name, images)
        $(".selectDay").on("click", function () {
            $(".containerRoutines").html("");
            var thisEle = $(this);
            displayDayTable(thisEle);
        });
    }

    function displayDayTable(thisEle) {
        var indexRoutine = $(thisEle).attr("name");
        var indexDay = $(thisEle).find("div").attr("name");
        $(".titleHeader").html(json.routines[indexRoutine].name);
        $(".containerRoutines").html("");
        //$(".titleHeader").html(categories[indexGroup].exercicesName[indexExercice].name);
        $(".containerRoutines").append("<p class='dayTitle'>" + json.routines[indexRoutine].days[indexDay].name + "</p><p class='finishedTitle' style='display:none;text-align:center;'><b>¡Día Completado!</b></p><div class='tableDay'><table><thead><tr><th>Ejercicios</th><th>Reps.</th><th>Series</th><th></th></tr></thead><tbody>");
        for (var i = 0; i < json.routines[indexRoutine].days[indexDay].exercises.length; i++) {
            $(".containerRoutines tbody").append("<tr><td>" + json.routines[indexRoutine].days[indexDay].exercises[i].exerciseName.name + "</td><td>" + json.routines[indexRoutine].days[indexDay].exercises[i].repetitions + "</td><td class='sets'>" + json.routines[indexRoutine].days[indexDay].exercises[i].series + "</td><td width='80px;'>" + moreReps + lessReps + "</td></tr>");
        }
        $(".containerRoutines").append("</tbody></table></div><button name='" + json.routines[indexRoutine].days[indexDay].id + "' class='nextDay'>Siguiente dia</button>");
        $(".nextDay").click(function () {
            console.log($(this).attr("name"));
        });
        buttonMoreLess();
    }
});
