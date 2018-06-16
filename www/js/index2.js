
    function displayProfile(json) {
        $(".editButton").hide();
        $(".addButton").hide();
        $(".container").html("");
        var gender;
        if (json.gender == "Hombre") {
            gender = '<select><option selected="selected">Hombre</option><option>Mujer</option></select>';
        } else {
            gender = '<select><option>Hombre</option><option selected="selected">Mujer</option></select>';
        }
        $(".container").append('<div class="profile"><label>Nombre</label><br><input key="name" value="' + json.name + '" type="text" placeholder="Nombre"><br><label>Apellidos</label><br><input key="surname" value="' + json.surname + '" type="text" placeholder="Apellidos"><br><label>Nombre de usuario</label><br><input key="nick" value="' + json.nick + '" type="text" placeholder="Nombre de usuario"><br><label>Edad</label><br><input type="number" key="age" value="' + json.age + '" placeholder="Edad"><br><label>Peso</label><br><input type="number" key="weight" value="' + json.weight + '" placeholder="Peso"><br><label>Sexo</label><br>' + gender + '<br><label>Email</label><br><input type="text" key="email" value="' + json.email + '" readonly placeholder="Email"><br><label>Contraseña</label><br><input key="password" value="' + json.password + '" type="password" placeholder="Contraseña"><br><span id="saveProfile">&#10004;</span></div>');
        $("#saveProfile").click(function () {
            json["gender"] = $("select").val();
            $("input").each(function () {
                json[$(this).attr("key")] = $(this).val();
            });
            console.log(json);
            $(".modal").show();
            $(".modal-content").show(500);
//            $(".close").click(function () {
//                $(".modal-content").hide(500);
//                $(".modal").hide(500);
//                displayProfile();
//            });
                        $.ajax({
                            url: 'http://localhost:8080/Login/resources/users/alex@alex.com',
                            type: 'put',
                            Accept: "application/json",
                            contentType: "application/json",
                            data: JSON.stringify(json),
                            success: function (response) {
                                $(".modal").show();
                                $(".modal-content").show(500);
                                $(".close").click(function () {
                                    $(".modal-content").hide(500);
                                    $(".modal").hide(500);
                                    displayProfile();
                                });
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

        });
    }
