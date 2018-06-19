$(document).ready(function () {

    var json3 = {
        "name": "alex",
        "surname": "frutos",
        "nick": "Alexfiweb",
        "age": 26,
        "weight": 76,
        "gender": "hombre",
        "email": "alex@myroutine.com",
        "password": "123123",
    }
    var json2 = {
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

    var categories1 = [
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
    displayLogin("","","");
    console.log(json);
    // displayHome(json, categories);

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
        displayLogin("","","");
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

    function displayProfile() {
        resetContainers();
        var gender;
        if (json.gender == "Hombre") {
            gender = '<select><option selected="selected">Hombre</option><option>Mujer</option></select>';
        } else {
            gender = '<select><option>Hombre</option><option selected="selected">Mujer</option></select>';
        }
        $(".containerProfile").append('<div class="profile"><form action="javascript:void(0);"><label>Nombre</label><br><input key="name" value="' + json.name + '" type="text" placeholder="Nombre"><br><label>Apellidos</label><br><input key="surname" value="' + json.surname + '" type="text" placeholder="Apellidos"><br><label>Nombre de usuario</label><br><input key="nick" value="' + json.nick + '" type="text" placeholder="Nombre de usuario"><br><label>Edad</label><br><input type="number" key="age" value="' + json.age + '" placeholder="Edad"><br><label>Peso</label><br><input type="number" key="weight" value="' + json.weight + '" placeholder="Peso"><br><label>Sexo</label><br>' + gender + '<br><label>Email</label><br><input type="text" key="email" value="' + json.email + '" readonly placeholder="Email"><br><label>Contraseña</label><br><input key="" value="' + json.password + '" type="password" placeholder="Contraseña"><br><span id="saveProfile">&#10004;</span></form></div>');
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
});
