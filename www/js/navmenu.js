var token = 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhbGV4QGFsZXguY29tIn0.3pxYdlpyjTZAX6KFbLm5IZKh2_8nwHBonaofZ6sgxMNK0gS5Yi56fjjboawtO3s35qhn6sbQgaE8iQPXgoEajw';
var json;
var user;
var categories;
$.ajax({
    url: 'http://18.191.145.139/Login/resources/users/alex@alex.com',
    type: 'get',
    headers: { 'Authorization': token, },
    async: false,
    success: function (response) {
        json = response;
        user = json.email;
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

function ajaxPut() {
    $.ajax({
        url: 'http://18.191.145.139/Login/resources/users/' + user,
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
