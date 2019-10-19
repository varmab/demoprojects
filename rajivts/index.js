var myName = 'Varma';
var age = 46;
var isStudent = false;
var names = ["Ram", "Robert", "Rahim"];
var myMarks = [35, 100, 90];
var family = ["Varma", "Neelima", "Suma"];
var student = {
    name: "Varma",
    age: 46
};
var teacher = {
    name: "Varma",
    age: 46
};
//tuple fixed length arrays
var address = ["MIG 27/1", "Hyderabad", 500085];
var Weekday;
(function (Weekday) {
    Weekday[Weekday["Monday"] = 0] = "Monday";
    Weekday[Weekday["Tuesday"] = 1] = "Tuesday";
    Weekday[Weekday["Wednesday"] = 2] = "Wednesday";
    Weekday[Weekday["Thursday"] = 3] = "Thursday";
    Weekday[Weekday["Friday"] = 4] = "Friday";
})(Weekday || (Weekday = {}));
console.log("Monday: " + Weekday.Monday);
