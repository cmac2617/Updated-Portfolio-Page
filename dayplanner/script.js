// Variable declaration.
// First variable is an array, holding the IDs, preceded by hashtags, of the twelve input fields for each timeslot.
// This array will will be used so that every time any of the save buttons are clicked, it will cycle through and make sure
// that any input fields which were changed will be updated and set to local storage.
var timeArrayId = ["#nineEntry", "#tenEntry", "#elevenEntry", "#twelveEntry", "#oneEntry", "#twoEntry", "#threeEntry", "#fourEntry"];

// When the page initially loads, it will first prepopulate the input fields for each hour,
// based off any saved information in local storage. There are 8 variables specified for the
// 8 working hours on the calendar ranging from nineEntry (9AM), to fourEntry (4PM).
var nineEntry = localStorage.getItem(timeArrayId[0] + "Stringified");
nineEntry = JSON.parse(nineEntry);
$("#nineEntry").val(nineEntry);

var tenEntry = localStorage.getItem(timeArrayId[1] + "Stringified");
tenEntry = JSON.parse(tenEntry);
$("#tenEntry").val(tenEntry);

var elevenEntry = localStorage.getItem(timeArrayId[2] + "Stringified");
elevenEntry = JSON.parse(elevenEntry);
$("#elevenEntry").val(elevenEntry);

var twelveEntry = localStorage.getItem(timeArrayId[3] + "Stringified");
twelveEntry = JSON.parse(twelveEntry);
$("#twelveEntry").val(twelveEntry);

var oneEntry = localStorage.getItem(timeArrayId[4] + "Stringified");
oneEntry = JSON.parse(oneEntry);
$("#oneEntry").val(oneEntry);

var twoEntry = localStorage.getItem(timeArrayId[5] + "Stringified");
twoEntry = JSON.parse(twoEntry);
$("#twoEntry").val(twoEntry);

var threeEntry = localStorage.getItem(timeArrayId[6] + "Stringified");
threeEntry = JSON.parse(threeEntry);
$("#threeEntry").val(threeEntry);

var fourEntry = localStorage.getItem(timeArrayId[7] + "Stringified");
fourEntry = JSON.parse(fourEntry);
$("#fourEntry").val(fourEntry);

// An array is declared to hold all 8 inputs, corresponding to the 8 working hours.
var timeArrayInputs = [nineEntry, tenEntry, elevenEntry, twelveEntry, oneEntry, twoEntry, threeEntry, fourEntry];

// Function: For any save button that is clicked (class = "bttn"), it runs through a loop of the inputs for each hour, specifying that,
// for each hour, the value of the input field should be set to the corresponding value for that hour in the timeArrayInputs array.
// That value is then saved to local storage.
$(".bttn").click(function () {
    var i = 0;
    for (i = 0; i < timeArrayId.length; i++) {
        console.log(i);
        timeArrayInputs[i] = $(timeArrayId[i]).val();
        console.log(timeArrayInputs[i]);
        localStorage.setItem(timeArrayId[i] + "Stringified", JSON.stringify(timeArrayInputs[i]));
    }
})

// Using setInterval to run a function every second, moment().hour() will give the current hour. Based on the current hour of the day,
// the inputs for each hour on the page will have a green background (future hours of the day), blue background (current hour),
// or red background (past hours of the day).
setInterval(function () {
    var hour = moment().hour();
    console.log(hour);
    var i = 0;
    if (hour >= 17) {
        for (i == 0; i < timeArrayId.length; i++) {
            $(timeArrayId[i]).removeClass("future current");
            $(timeArrayId[i]).addClass("past");
        }
    }
    else if (hour == 16) {
        for (i == 0; i < 7; i++) {
            $(timeArrayId[i]).removeClass("future current");
            $(timeArrayId[i]).addClass("past");
        }
        $(timeArrayId[7]).removeClass("future past");
        $(timeArrayId[7]).addClass("current");
    }
    else if (hour == 15) {
        for (i == 0; i < 6; i++) {
            $(timeArrayId[i]).removeClass("future current");
            $(timeArrayId[i]).addClass("past");
        }
        $(timeArrayId[6]).removeClass("future past");
        $(timeArrayId[6]).addClass("current");
    }
    else if (hour == 14) {
        for (i == 0; i < 5; i++) {
            $(timeArrayId[i]).removeClass("future current");
            $(timeArrayId[i]).addClass("past");
        }
        $(timeArrayId[5]).removeClass("future past");
        $(timeArrayId[5]).addClass("current");
    }
    else if (hour == 13) {
        for (i == 0; i < 4; i++) {
            $(timeArrayId[i]).removeClass("future current");
            $(timeArrayId[i]).addClass("past");
        }
        $(timeArrayId[4]).removeClass("future past");
        $(timeArrayId[4]).addClass("current");
    }
    else if (hour == 12) {
        for (i == 0; i < 3; i++) {
            $(timeArrayId[i]).removeClass("future current");
            $(timeArrayId[i]).addClass("past");
        }
        $(timeArrayId[3]).removeClass("future past");
        $(timeArrayId[3]).addClass("current");
    }
    else if (hour == 11) {
        for (i == 0; i < 2; i++) {
            $(timeArrayId[i]).removeClass("future current");
            $(timeArrayId[i]).addClass("past");
        }
        $(timeArrayId[2]).removeClass("future past");
        $(timeArrayId[2]).addClass("current");
    }
    else if (hour == 10) {
        $(timeArrayId[0]).removeClass("future current");
        $(timeArrayId[0]).addClass("past");

        $(timeArrayId[1]).removeClass("future past");
        $(timeArrayId[1]).addClass("current");
    }
    else if (hour == 9) {
        $(timeArrayId[0]).removeClass("future current");
        $(timeArrayId[0]).addClass("current");
    }
}, 1000);