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
                <td>${json.records[i].weight}kg</td>
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
                for (var j = 0; j < categories[i].exercicesName.length; j++) {
                    $(".selectExercices select").append("<option>" + categories[i].exercicesName[j].name + "</option>");
                }
                $(".selectExercices").append("</select><br><br>");
            }
        }
    });
    $(".containerRecords").append('</form><div class="cancelButton">&#10008;</div><div class="saveButton">&#10004;</div>');

    $(".cancelButton").click(function () { displayRecords(json, categories) });
    
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
                <td><input type='number' key='weight' min=0 style='width:60px' value='${json.records[i].weight}'></td>
                <td><input style='width:60px' min=0 key='repetitions' type='number' value='${json.records[i].repetitions}'></td>
                <td class='deleteRecord'>&#10008</td>
            </tr>`);
    }

    $(".containerRecords").append('</tbody></table><div class="cancelButton">&#10008;</div><div class="saveButton">&#10004;</div>');
    $(".deleteRecord").click(function () {
        var indexRecord = $("tr").index($(this).parent("tr:first")) - 1;
        json.records.splice(indexRecord, 1);
        displayRecords(json, categories);
    });

    $(".cancelButton").click(function () { displayRecords(json, categories) });
    $(".saveButton").click(function () {
        for (var i = 0; i < json.records.length; i++) {
            $("tbody tr").eq(i).find("input").each(function () {
                json.records[i][$(this).attr("key")] = $(this).val();
            });
        }
        displayRecords(json, categories);
    });
}

function saveNewRecord(json, categories) {
    var records = [];
    if ($("input").eq(0).val() == "" || $("input").eq(1).val() == "" || $("select").eq(1).val() == null) {
        $(".containerError").html("<br><p>No pueden haber campos vacios</p>");
    }
    else {
        records = {
            "exerciseName": {
                "description": "",
                "id": "",
                "name": $("select").eq(1).val(),
            },
            "repetitions": $("input").eq(0).val(),
            "weight": $("input").eq(1).val(),
        };
        json["records"].push(records);
        displayRecords(json, categories);
    }
}
