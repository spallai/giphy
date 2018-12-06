var animals = ["dog", "cat", "guinea pig", "lion", "liger"];
var limit = 5;

renderButtons();

function renderButtons() {
    $("#animals-view").empty();

    for (var i = 0; i < animals.length; i++) {
        var a = $("<button>");
        a.addClass("animal");
        a.attr("data-name", animals[i]);
        a.text(animals[i]);
        $("#animals-view").append(a);
    }
}

function searchAnimals(event) {
    var animal = event.currentTarget.textContent;
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&limit=" + limit + "&api_key=ZikerPm56Hs5BLmF8qWoWUqhbi09FtRd";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        var results = response.data;
        $("#images").empty();
        console.log(response);
        for (i = 0; i < results.length; i++) {
            var stillImageUrl = results[i].images.original_still.url;
            var animateImageUrl = results[i].images.original.url;

            var animalDiv = $("<div>");
            var animalRatingLabel = $("<label>");
            animalRatingLabel.text("Rating: " + results[i].rating);

            var animalImage = $("<img>");
            animalImage.attr("src", stillImageUrl);
            animalImage.attr("alt", animal);
            animalImage.attr("data-state", "still");
            animalImage.attr("data-animate", animateImageUrl);
            animalImage.attr("data-still", stillImageUrl);
            animalImage.addClass("gif");

            animalDiv.append(animalRatingLabel);
            animalDiv.append(animalImage);

            $("#images").append(animalDiv);
        }
    });
}

$("#add-animal").on("click", function (event) {
    event.preventDefault();
    var userAnimal = $("#animal-input").val().trim();

    if (!animals.includes(userAnimal) && userAnimal !== "") {
        animals.push(userAnimal);
    }
    renderButtons();
});

$(document).on("click", ".animal", searchAnimals);

$(document).on("click", ".gif", function () {
    var state = $(this).attr("data-state");

    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else if (state === "animate") {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
});
