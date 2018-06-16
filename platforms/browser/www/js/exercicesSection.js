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
    for (var j = 0; j < categories[indexGroup].exercicesName.length; j++) {
        var name = categories[indexGroup].exercicesName[j];
        $(".containerExercices").append(`
            <div name="${indexGroup}" class="w3-display-container">
                <div name="${j}" class="w3-display-left">
                    <img src="${categories[indexGroup].exercicesName[j].img1}">
                    <span>${categories[indexGroup].exercicesName[j].name}</span>
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
                    <img width="100%" src="${categories[indexGroup].exercicesName[indexExercice].img1}">
                </div>
                <div class="swiper-slide">
                    <img width="100%" src="${categories[indexGroup].exercicesName[indexExercice].img2}">
                </div>
            </div>
            <div class="swiper-pagination"></div>
        </div>`;

    $(".containerExercices").html(imagesGallery);
    $(".titleHeader").html(categories[indexGroup].exercicesName[indexExercice].name);
    $(".containerExercices").append("<div style='padding: 15px;'>" + categories[indexGroup].exercicesName[indexExercice].description + "</div>");

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
