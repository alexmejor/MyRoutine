$(document).ready(function () {

    var lessReps = "<button class='lessReps'>-</button>";
    var moreReps = "<button class='moreReps'>+</button>";
    var nextRoutine = '<button style="display: none;" id="buttonNext">Siguiente rutina</button>';
    var tabla = [
        {
            "Ejercicio": "Press Banca",
            "Repeticiones": 100,
            "Series": 3
        },
        {
            "Ejercicio": "Dominadas",
            "Repeticiones": 10,
            "Series": 4
        },
        {
            "Ejercicio": "Press Militar",
            "Repeticiones": 40,
            "Series": 3
        },
        {
            "Ejercicio": "Sentadillas",
            "Repeticiones": 110,
            "Series": 6
        },
        {
            "Ejercicio": "Peso Muerto",
            "Repeticiones": 100,
            "Series": 6
        },
    ];
    
    var profile = {
            "name":"alex",
            "surname":"frutos",
            "nickname":"Alexfiweb",
            "age":26,
            "weight":76,
            "gender":"hombre",
            "email":"alex@myroutine.com",
            "password":"123123"
    };
    
    var exercicesGroups = [
        {
            "name": "pecho",
            "img": "images/pecho2.png",
            "exercices": [
                {
                    "name": "press banca mc",
                    "description": "Acostados boca arriba sobre un banco plano. El torso debe estar apoyado desde la cabeza a las caderas, con las piernas dobladas y los pies asegurados.<br>Agarrad una mancuerna en cada mano y sujetad los pesos directamente encima del pecho. Las palmas deben mirar hacia los pies. Es el punto de partida.<br>Doblad los brazos para bajar las mancuernas hacia la parte externa del pecho, manteniendo los codos apuntando hacia los lados. Tomad aire y retened la respiración mientras empezáis a bajar el peso.<br>Revertid la dirección cuando las mancuernas lleguen a la posición final, y devolved las al punto de partida siguiendo la dirección de un arco.<br>Expulsad el aire una vez que hayáis superado el punto de estancamiento (el más difícil del intervalo de recorrido).<br>Deteneos un instante con los brazos estirados pero no hiperextendidos. Repetid las veces necesarias.<br>Estad seguros de subir las mancuernas de manera que permanezcan sobre un plano vertical directamente encima de los hombros en la posición final.",
                    "img1": "images/posi1.png",
                    "img2": "images/posi2.png",
                },
                {
                    "name": "press banca barra",
                    "description": "blablablabla",
                    "img1": "images/posi2.png",
                    "img2": "",
                }
            ]
        },
        {
            "name": "espalda",
            "img": "images/espalda.png",
            "exercices": [
                {
                    "name": "dominadas",
                    "description": "blablablabla",
                    "img1": "",
                    "img2": "",
                },
                {
                    "name": "remo",
                    "description": "blablablabla",
                    "img1": "",
                    "img2": "",
                }
            ]
        }
    ];

    //$(".container").html("profile");
    displayProfile();


    function routines() {
        $.ajax({
            url: "http://snowboardhome.sytes.net/tfgs/tablas.php",
            type: "GET",
            data: {
                pattern: ""
            },
            dataType: "json",
            success: function (respuesta) {
                $(".container").html("");
                $(".container").append(printRoutine(respuesta));
                buttonMoreLess();
            }
        });
    }


    $("#headerNav").click(openNav);
    $("#overlay-back").click(closeNav);


    $("#myaccount").click(function () {
        displayProfile();
        closeNav();
        $(".titleHeader").html("Mi perfil");
    });

    $("#routines").click(function () {
        routines();
        closeNav();
        $(".titleHeader").html("Entrenamientos");
    });

    $("#records").click(function () {
        closeNav();
        $(".container").append(displayRecords()).append("<br><button>Nuevo Record</button>");
        $(".titleHeader").html("Marcas personales");
    });

    $("#exercices").click(function () {
        closeNav();
        displayMuscleGroups();
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
        $(".container").html("");
        var gender;
        if(profile.gender=="hombre") {
            gender = '<select><option selected="selected">Hombre</option><option>Mujer</option></select>';
        }
        else {
            gender = '<select><option>Hombre</option><option selected="selected">Mujer</option></select>';
        }
        $(".container").append('<div class="profile"><label>Nombre</label><br><input value="'+profile.name+'" type="text" placeholder="Nombre"><br><label>Apellidos</label><br><input value="'+profile.surname+'" type="text" placeholder="Apellidos"><br><label>Nombre de usuario</label><br><input value="'+profile.nickname+'" type="text" placeholder="Nombre de usuario"><br><label>Edad</label><br><input type="number" value="'+profile.age+'" placeholder="Edad"><br><label>Peso</label><br><input type="number" value="'+profile.weight+'" placeholder="Peso"><br><label>Sexo</label><br>'+gender+'<br><label>Email</label><br><input type="text" value="'+profile.email+'" placeholder="Email"><br><label>Contraseña</label><br><input value="'+profile.password+'" type="password" placeholder="Contraseña"><br><span id="saveProfile">&#10004;</span></div>');
    }

    function displayRoutines() {

    }

    //It prints the routine
    function printRoutine(tabla) {
        $(".container").html("");
        $("#buttonNext").hide();
        var filas = "<table class='tabla'><thead><tr><th>Ejercicio</th><th>Reps</th><th>Series</th></tr></thead><tbody>";
        for (var i = 0; i < tabla.length; i++) {
            filas = filas + "<tr><td style='width:105px;'>" + tabla[i].Ejercicio + "</td><td>" + tabla[i].Repeticiones + "</td><td class='sets'>" + tabla[i].Series + "</td><td width='100px;'>" + moreReps + lessReps + "</td></tr>";
            //$(".tabla").find("tbody").append(filas);
        }
        filas = filas + "</tbody></table>";
        return filas;
    }

    function displayRecords() {
        var editButton = "<button class='editButton'></button>";
        var filas = "<table class='tabla'><tr><th>Ejercicio</th><th>Peso</th><th>Reps</th></tr>";
        $(".container").html("");
        for (var i = 0; i < tabla.length; i++) {
            var filas = filas + "<tr><td>" + tabla[i].Ejercicio + "</td><td>" + tabla[i].Repeticiones + "kg</td><td>" + tabla[i].Series + "</td><td>" + editButton + "</td></tr>";
            //$(".tabla").append(filas);
        }
        filas = filas + "</table>";
        return filas;
    }

    function displayMuscleGroups() {
        $("#headerNav").removeClass("arrow").addClass("trigram");
        $("#headerNav").unbind();
        $("#headerNav").click(openNav);
        //$(".container").addClass("fromRightToLeft");
        $(".container").html("");
        for (var i = 0; i < exercicesGroups.length; i++) {
            $(".container").append('<div name="'+i+'" class="w3-display-container"><div class="w3-display-left"><img src="'+exercicesGroups[i].img+'"><span>'+exercicesGroups[i].name+'</span></div><div class="w3-display-right"><i></i></div><div>');
        }
        //It shows all the exercices when you click on a muscular group
        $(".w3-display-container").on("click", function () {
            var thisEle = $(this);
            var indexGroup = $(thisEle).attr("name");
            $(".titleHeader").html(exercicesGroups[indexGroup].name);
            displayExercices(thisEle);
        });
    }

    function displayExercices(thisEle) {
        $(".container").html("");
        var indexGroup = $(thisEle).attr("name");
        for (var j = 0; j < exercicesGroups[indexGroup].exercices.length; j++) {
            var name = exercicesGroups[indexGroup].exercices[j];
            $(".container").append('<div name="' + indexGroup + '" class="w3-display-container"><div name="' + j + '" class="w3-display-left"><img src="' + exercicesGroups[indexGroup].exercices[j].img1 + '"><span>' + exercicesGroups[indexGroup].exercices[j].name + '</span></div><div class="w3-display-right"><i></i></div><div>');
        }
        //it shows the info of each exercice (description, name, images)
        $(".w3-display-container").on("click", function () {
            $(".container").html("");
            var thisEle = $(this);
            displayExerciceInfo(thisEle);
        });

        //changes the navMenu icon for an left arrow
        $("#headerNav").removeClass("trigram").addClass("arrow");
        //removes the function of navMenu so I can add the function to go previous page
        $("#headerNav").unbind();
        //To go back to the previous section
        $(".arrow").click(function () {
            $(".titleHeader").html("Ejercicios");
            displayMuscleGroups();
        });
    }

    function displayExerciceInfo(thisEle) {
        var indexGroup = $(thisEle).attr("name");
        var indexExercice = $(thisEle).find(".w3-display-left").attr("name");
        var imagesGallery = '<div class="swiper-container"><div class="swiper-wrapper"><div class="swiper-slide"><img width="100%" src="images/posi1.png"></div><div class="swiper-slide"><img width="100%" src="images/posi2.png"></div></div><div class="swiper-pagination"></div>';
        $(".container").html(imagesGallery);
        $(".titleHeader").html(exercicesGroups[indexGroup].exercices[indexExercice].name);
        $(".container").append(exercicesGroups[indexGroup].exercices[indexExercice].description);

        //changes the navMenu icon for an left arrow
        $("#headerNav").removeClass("trigram").addClass("arrow");
        //removes the function of navMenu so I can add the function to go previous page
        $("#headerNav").unbind();
        //To go back to the previous section
        $(".arrow").click(function () {
            var indexGroup = $(thisEle).attr("name");
            $(".titleHeader").html(exercicesGroups[indexGroup].name);
            displayExercices(thisEle);
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
    /* --- END ALL VIEWS --- */


    
    /* --- ALL THE FUNCTIONS --- */

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
        if (finished) {
            if ($("#buttonNext").length == 0) {
                $(".container").append('<button id="buttonNext">Siguiente rutina</button>');
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
                $("tr").eq(index).find("td").css("background-color", "#f2f2f2");
                counter--;
            }
            if ($("#buttonNext").length != 0) {
                $("#buttonNext").remove();
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
                $("tr").eq(index).find("td").css("background-color", "#9cff67");
                counter++;
                console.log(sets);
            }
            checkDayCompleted();
        });
    }

    /* -- END ALL FUNCTIONS -- */

    //To give a background-color to the td next to the other
    /*function backgroundFields() {
        var tds = $("td");
        for (var i = 1; i < tds.length; i = i + 2) {
            $("tr").eq(i).css("background-color", "#e3e3e3");
        }
    }*/

});
