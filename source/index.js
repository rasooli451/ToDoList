

import "./style.css";


import TaskPage from "./task.js";


import {Task, Project} from "./Class.js";


let Maincont = document.querySelector(".main");

let taskform = document.querySelector(".addtaskform");

let taskspan = document.querySelector(".tasks");

let projectspan = document.querySelector(".project");


let closebtn = document.querySelector(".close");

let submittaskbtn = document.querySelector(".submittask");

let taskpriority = document.querySelector("#priority");

let descriptionarea = document.querySelector("#description");

let selectedproject = document.querySelector("#addtoproject");


taskspan.addEventListener("click", ()=>{
    if (!taskspan.classList.contains("active")){
        taskspan.classList.add("active");
        projectspan.classList.remove("active");
    }
})
projectspan.addEventListener("click", ()=>{
    if (!projectspan.classList.contains("active")){
        projectspan.classList.add("active");
        taskspan.classList.remove("active");
    }
})


let inputs = document.querySelectorAll(".addtaskform input");


Main();









function Main(){
    if (taskspan.classList.contains("active")){
        TaskPage(Maincont);
        let button = document.querySelector(".addtaskbtn");
        button.addEventListener("click", ()=>{
        taskform.classList.remove("hidden");
        })
       closebtn.addEventListener("click", ()=>{
       taskform.classList.add("hidden");
       })

       submittaskbtn.addEventListener("click", (e)=>{
        e.preventDefault();
        let title = inputs[0].value;
        let date = inputs[1].value;
        let priority = taskpriority.value;
        let descript = descriptionarea.value;
        let project = selectedproject.value;
        let newproject = new Project(project);
        let newtask = newproject.addTasks(title, date, descript, priority, false);
        let stringified = JSON.stringify(newtask);
        localStorage.setItem(project, stringified);
        taskform.classList.add("hidden");
        TaskPage(Maincont);
        console.log(localStorage);
       })

    }
    else{
    }
}





