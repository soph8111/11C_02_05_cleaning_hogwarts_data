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
    console.log(elm);
    // Create new object with cleaned data - and store that in the allStudents array
    const student = Object.create(Student);
    student.firstName = getFirstName(elm.fullname);
    //student.middelName = getMiddelName(elm.fullname);
    //student.lastName = getLastName(elm.fullname);
    //student.nickName = getNickName(elm.fullname);
    //student.house = getHouse(elm.fullname);
    allStudents.push(student);
  });

  //displayList();
}

console.log(allStudents);

function getFirstName(fullname) {
  console.log("fullname");
  if (fullname.includes(" ")) {
    firstName = fullname.trimStart();
    firstName = firstName.substring(0, firstName.indexOf(" "));
  } else {
    firstName = fullname;
  }
  return firstName;
}
