"use strict";

window.addEventListener("DOMContentLoaded", start);

const allStudents = [];

const Student = {
  firstName: "",
  middelName: "",
  lastName: "",
  nickName: "",
  house: "",
  //image: "",
};

let firstName;
let middelName;
let lastName;
let nickName;
let house;

function start() {
  console.log("start");

  loadJSON();
}

function loadJSON() {
  console.log("loadJSON");

  fetch("https://petlatkea.dk/2021/hogwarts/students.json")
    .then((response) => response.json())
    .then((jsonData) => {
      // when loaded, prepare objects
      prepareObjects(jsonData);
    });
}

function prepareObjects(jsonData) {
  jsonData.forEach((elm) => {
    // console.log(elm);
    // Create new object with cleaned data - and store that in the allStudents array
    const student = Object.create(Student);
    student.firstName = getFirstName(elm.fullname);
    student.middelName = getMiddelName(elm.fullname);
    student.lastName = getLastName(elm.fullname);
    //student.nickName = getNickName(elm.fullname);
    student.house = elm.house;
    allStudents.push(student);
  });

  changeLetters();
  //displayList();
}

console.log(allStudents);

function getFirstName(fullname) {
  //console.log("getFirstName");
  if (fullname.includes(" ")) {
    firstName = fullname.trimStart();
    firstName = firstName.substring(0, firstName.indexOf(" "));
  } else {
    firstName = fullname;
  }
  return firstName;
  // console.log(firstName);
}

function getMiddelName(fullname) {
  // MANGLER AT SORTERER NICKNAMES FRA

  // console.log("getMiddelName");
  middelName = fullname.trimStart();
  middelName = middelName.split(" ");

  if (middelName.length > 2) {
    // console.log("Har et mellemnavn");
    middelName = middelName[1];
  } else {
    //  console.log("Har ikke et mellemnavn");
    middelName = "undefined";
  }

  return middelName;
  //  console.log(middelName);
}

function getLastName(fullname) {
  //console.log("getLastName");
  // console.log(fullname);
  lastName = fullname.substring(fullname.lastIndexOf(" ") + 1);
  //  console.log(lastName);
  return lastName;
}

// function getNickName(fullname) {
//   nickName = fullname.split(" ");
//   if (nickName.indexOf(`"`) === "0") {
//     nickName = nickName[1];
//   } else {
//     nickName = "undefined";
//   }

//   return nickName;
// }

function changeLetters() {
  allStudents.forEach((student) => {
    student.firstName = student.firstName.substring(0, 1).toUpperCase() + student.firstName.substring(1).toLowerCase();
    student.middelName = student.middelName.substring(0, 1).toUpperCase() + student.middelName.substring(1).toLowerCase();
    student.lastName = student.lastName.substring(0, 1).toUpperCase() + student.lastName.substring(1).toLowerCase();
    // student.lastName.substring(student.lastName.indexOf("-") + 1).toUpperCase();
    student.house = student.house.trim();
    student.house = student.house.substring(0, 1).toUpperCase() + student.house.substring(1).toLowerCase();
  });
}
