// Declaration of variables and arrays to be used.
var city = "";
var dates = [];
var conditions = [];
var temps = [];
var humidities = [];
var windSpeed = "";
var uvIndexes = "";
var days = ["#current", "#dayOne", "#dayTwo", "#dayThree", "#dayFour", "#dayFive"];
var dayInfo = ["#dayCurrentInfo", "#dayOneInfo", "#dayTwoInfo", "#dayThreeInfo", "#dayFourInfo", "#dayFiveInfo"];
var dayConditions = ["#dayCurrentCondition", "#dayOneCondition", "#dayTwoCondition", "#dayThreeCondition", "#dayFourCondition", "#dayFiveCondition"];
var lat;
var lon;

// Hide all images before a search has begun.
$("#dayOneCondition").hide();
$("#dayTwoCondition").hide();
$("#dayThreeCondition").hide();
$("#dayFourCondition").hide();
$("#dayFiveCondition").hide();

// Search for a particular city's forecast.
$("#searchButton").click(function () {
    var currentConditions = $("#searchTag").text("Search History")
    $("#searchTag").append(currentConditions);
    city = $("#searchField").val();
    var searchItem = $("<li>").text($("#searchField").val());
    searchItem.attr("class", "pastCity");
    $("#searchHistory").prepend(searchItem);

    // Clear previous city's forecast if there was one.
    for (i = 0; i < 6; i++) {
        $(dayInfo[i]).empty();
    }

    // Run AJAX call to get weather data.
    $.ajax({
        url: "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=d49028843b605243d56571f4a6b28da2",
        method: "GET"
    })
        .then(function (response) {
            // Use for loop to get 6 sets of values. Values for the current day, and the next five.
            for (i = 0; i < 40;) {
                // Getting dates first. 40 weather values are generated, spaced 3 hours apart.
                // Taking the 0, 8th, 16th, 24th, 32nd, and 39th indices of the array to get the proper date values.
                var date = response.list[i].dt_txt;
                date = new Date(date);
                date = date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear();
                dates.push(date);

                // Getting the temperature values.
                var tempK = response.list[i].main.temp;
                var tempF = Math.round(tempK * (9 / 5) - 459.67);
                temps.push(tempF);

                // Getting humidity values.
                var humidity = response.list[i].main.humidity + "%";
                humidities.push(humidity);

                // Getting weather conditions. Used to generate appropriate image.
                var condition = response.list[i].weather[0].main;
                conditions.push(condition);

                // Get lat and lon coordinates for 2nd API call. I need to obtain the Windspeed and UV index as well.
                // This API doesn't give that data, but it does return the latitude and longitude, which I can use as search
                // parameters for a second API call that gives the windspeed and UV Index.
                lat = response.city.coord.lat;
                localStorage.setItem("latStringified", lat);
                lon = response.city.coord.lon;
                localStorage.setItem("lonStringified", lon);

                // After one iteration and obtaining values, I increase the index by either 8, or 7, in the last case,
                // ensuring the next set of values I get will be for the second day.
                if (i < 32) {
                    i = i + 8;
                }
                else {
                    i = i + 7;
                }
            }
            // Call the latAndLon function which uses contains AJAX call for second API.
            latAndLon();
        });
    // Once the six arrays are filled in, I run another function to first fill the data for the current day,
    // and then loop through the remaining days to fill in appropriate values. Then I specify the updated
    // images (conditions), to now be displayed.
    var check = setInterval(function () {
        if (dates.length == 6 || conditions.length == 6 || temps.length == 6 || humidities.length == 6) {
            var currentConditions = $("<b>").text("Current Conditions")
            $("#dayCurrentInfo").append(currentConditions);
            var currentInfo1 = $("<li>").text(dates[0]);
            $("#dayCurrentInfo").append(currentInfo1);
            var currentInfo2 = $("<li>").text("City: " + city);
            $("#dayCurrentInfo").append(currentInfo2);
            var currentInfo3 = $("<li>").text("Temperature: " + temps[0] + " degrees");
            $("#dayCurrentInfo").append(currentInfo3);
            var currentInfo4 = $("<li>").text("Humidity: " + humidities[0]);
            $("#dayCurrentInfo").append(currentInfo4);

            if (conditions[0] == "Rain") {
                $(dayConditions[0]).attr("src", "images/rain.PNG");
            }
            else if (conditions[0] == "Snow") {
                $(dayConditions[0]).attr("src", "images/snow.PNG");
            }
            else if (conditions[0] == "Clear") {
                $(dayConditions[0]).attr("src", "images/clear.PNG");
            }
            else if (conditions[0] == "Clouds") {
                $(dayConditions[0]).attr("src", "images/clouds.PNG");
            }
            else {
                $(dayConditions[0]).attr("src", "images/extreme.PNG");
            }

            // Fill in the rest of the days. The loop contains the current day as well, but this only comes in to play
            // for the condition of the weather, in order to generate the proper weather symbol. The array of id's ("dayInfo")
            // that is being used to fill in the rest of the weather information does not have a corresponding id for current
            // weather within the HTML.
            for (i = 1; i < 6; i++) {
                if (conditions[i] == "Rain") {
                    $(dayConditions[i]).attr("src", "images/rain.PNG");
                }
                else if (conditions[i] == "Snow") {
                    $(dayConditions[i]).attr("src", "images/snow.PNG");
                }
                else if (conditions[i] == "Clear") {
                    $(dayConditions[i]).attr("src", "images/clear.PNG");
                }
                else if (conditions[i] == "Clouds") {
                    $(dayConditions[i]).attr("src", "images/clouds.PNG");
                }
                else {
                    $(dayConditions[i]).attr("src", "images/extreme.PNG");
                }

                var info1 = $("<li>").text(dates[i]);
                $(dayInfo[i]).append(info1);
                var info2 = $("<li>").text("Temperature: " + temps[i]);
                $(dayInfo[i]).append(info2);
                var info3 = $("<li>").text("Humidity: " + humidities[i]);
                $(dayInfo[i]).append(info3);
            }
            $("#dayCurrentCondition").show();
            $("#dayOneCondition").show();
            $("#dayTwoCondition").show();
            $("#dayThreeCondition").show();
            $("#dayFourCondition").show();
            $("#dayFiveCondition").show();
            clearInterval(check);
        }
    })

    // I reset the arrays back to being empty, so it can build 6 new entries, corresponding to weather
    // from a different city with a new search. This completes the function generated from the click event.
    dates = [];
    conditions = [];
    temps = [];
    humidities = [];
})

// Retrieve the latitude and longitude coordinates from local storage to use in second API.
lat = localStorage.getItem("latStringified");
lon = localStorage.getItem("lonStringified");

function latAndLon() {
    $.ajax({
        url: "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "28&lon=" + lon + "81&appid=d49028843b605243d56571f4a6b28da2",
        method: "GET"
    })
        // Display the windspeed and UV Index for current day.
        // Determine if UV index is low, normal, or high, and apply class.
        .then(function (response) {

            windSpeed = $("<li>").text("Wind: " + response.current.wind_speed + " mph");
            $("#dayCurrentInfo").append(windSpeed);
            uvIndex = response.current.uvi;
            uvIndexItem = $("<li>").text("UV Index (green: low, blue: normal, red: high): " + uvIndex);
            $("#dayCurrentInfo").append(uvIndexItem);
            uvIndexItem.attr("id", "uvIndex");
            // windSpeed = response.current.wind_speed;
            // $("#windSpeed").text("Windspeed: " + windSpeed + " mph");
            // uvIndex = response.current.uvi;
            // $("#uvIndex").text("UV Index (green: low, blue: normal, red: high): " + uvIndex);

            if (uvIndex < 5) {
                $("#uvIndex").removeClass("normal high")
                $("#uvIndex").addClass("low");
            }
            else if (uvIndex < 10) {
                $("#uvIndex").removeClass("low high")
                $("#uvIndex").addClass("normal");
            }
            else {
                $("#uvIndex").removeClass("low normal")
                $("#uvIndex").addClass("high");
            }

        })
};

// Creating click events for the cities previously search for (based on class "pastCity")
// This function is almost an exact copy of the initial click function, except it doesn't
// add a new city to the history, and it obtains the "city" value variable differently.
$(document).on("click", ".pastCity", function () {
    city = $(this).text();

    for (i = 0; i < 6; i++) {
        $(dayInfo[i]).empty();
    }

    $.ajax({
        url: "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=d49028843b605243d56571f4a6b28da2",
        method: "GET"
    })
        .then(function (response) {
            console.log(response);
            for (i = 0; i < 40;) {
                var date = response.list[i].dt_txt;
                date = new Date(date);
                date = date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear();
                dates.push(date);

                var tempK = response.list[i].main.temp;
                var tempF = Math.round(tempK * (9 / 5) - 459.67);
                temps.push(tempF);

                var humidity = response.list[i].main.humidity + "%";
                humidities.push(humidity);

                var condition = response.list[i].weather[0].main;
                conditions.push(condition);

                lat = response.city.coord.lat;
                localStorage.setItem("latStringified", lat);
                localStorage.setItem("lonStringified", lon);

                if (i < 32) {
                    i = i + 8;
                }
                else {
                    i = i + 7;
                }
            }
            latAndLon();
        });

    var check = setInterval(function () {
        if (dates.length == 6 || conditions.length == 6 || temps.length == 6 || humidities.length == 6) {

            var currentConditions = $("<b>").text("Current Conditions")
            $("#dayCurrentInfo").append(currentConditions);
            var currentInfo1 = $("<li>").text(dates[0]);
            $("#dayCurrentInfo").append(currentInfo1);
            var currentInfo2 = $("<li>").text("City: " + city);
            $("#dayCurrentInfo").append(currentInfo2);
            var currentInfo3 = $("<li>").text("Temperature: " + temps[0] + " degrees");
            $("#dayCurrentInfo").append(currentInfo3);
            var currentInfo4 = $("<li>").text("Humidty: " + humidities[0]);
            $("#dayCurrentInfo").append(currentInfo4);

            if (conditions[0] == "Rain") {
                console.log(conditions[i]);

                $(dayConditions[0]).attr("src", "images/rain.PNG");
            }
            else if (conditions[0] == "Snow") {
                $(dayConditions[0]).attr("src", "images/snow.PNG");
            }
            else if (conditions[0] == "Clear") {
                $(dayConditions[0]).attr("src", "images/clear.PNG");
            }
            else if (conditions[0] == "Clouds") {
                $(dayConditions[0]).attr("src", "images/clouds.PNG");
            }
            else {
                $(dayConditions[0]).attr("src", "images/extreme.PNG");
            }

            for (i = 1; i < 6; i++) {
                if (conditions[i] == "Rain") {
                    console.log(conditions[i]);

                    $(dayConditions[i]).attr("src", "images/rain.PNG");
                }
                else if (conditions[i] == "Snow") {
                    $(dayConditions[i]).attr("src", "images/snow.PNG");
                }
                else if (conditions[i] == "Clear") {
                    $(dayConditions[i]).attr("src", "images/clear.PNG");
                }
                else if (conditions[i] == "Clouds") {
                    $(dayConditions[i]).attr("src", "images/clouds.PNG");
                }
                else {
                    $(dayConditions[i]).attr("src", "images/extreme.PNG");
                }

                var info1 = $("<li>").text(dates[i]);
                $(dayInfo[i]).append(info1);
                var info2 = $("<li>").text("Temperature: " + temps[i]);
                $(dayInfo[i]).append(info2);
                var info3 = $("<li>").text("Humidity: " + humidities[i]);
                $(dayInfo[i]).append(info3);
            }
            clearInterval(check);
        }
    })
    dates = [];
    conditions = [];
    temps = [];
    humidities = [];
});