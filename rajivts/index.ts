let myName: string = 'Varma';
let age: number=46;
let isStudent: boolean=false;

let names: string[]=["Ram","Robert","Rahim"];
let myMarks: number[]=[35,100,90];

let family: Array<string>=["Varma","Neelima","Suma"]

let student: {
    name:string,
    age:number
} = {
    name:"Varma",
    age: 46
}

interface Teacher{
    name:string;
    age?:46
}

var teacher: Teacher={
    name:"Varma",
    age: 46
}

//tuple fixed length arrays
var address:[string,string,number]=["MIG 27/1","Hyderabad",500085]

enum Weekday {
    Monday=1, //instead of start with 0
    Tuesday,
    Wednesday,
    Thursday=100,
    Friday
}

enum Size{
    Larger = 48,
    Medium = 36,
    Small = 32
}

enum Time {
    AM = "am",
    PM = "pm"
}

//any - telling compiler not to check
var data: any="my data";
data= false;
data= 45;

//void
function sayHello():void{
    alert("hello")
}

	
// interface CourseVenue {
// 	// Properties
// 	city: string;
// 	country: string;
// }
 
// interface CourseParticipant {
// 	// Properties
// 	name: string;
// }

// interface CourseEvent {
// 	// Constructor
// 	//new() : CourseEvent;
// 	// Properties
// 	currentLocation: CourseVenue;
// 	// Methods
// 	bookVenue(venue: CourseVenue);
// 	addDelegate(delegate: CourseParticipant);
// 	removeDelegate(delegate: CourseParticipant);
// }

// class Course implements CourseEvent, CourseVenue{
//     city: string;
//     country: string;
//     currentLocation: CourseVenue;

//     bookVenue(venue: CourseVenue){

//     }

//     addDelegate(delegate: CourseParticipant){

//     }

//     removeDelegate(delegate: CourseParticipant){

//     }
// }


console.log("Monday: " +  Weekday.Monday);

//Generics
function reverse<T>(items:T[]):T[]{
    return items.reverse();
}

console.log(reverse(["1","2"]))

function add(a:string, b:string):string;
function add(a:number, b:number): number;
function add(a: any, b:any): any {
    return a + b;
}


function displayAge(age: string | number){
    var ageInEnglish="";

    if(typeof age == "number"){
        return ageInEnglish;
    }

    return age;
}

console.log(displayAge(46))
console.log(displayAge("Forty Six"))


class Circle{}
class Square{}

function drawShape(shape: Circle | Square){
    if(shape instanceof Circle){

    }
    if(shape instanceof Square){

    }
}

let a=10;
a="Ten";
