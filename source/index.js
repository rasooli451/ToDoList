

import "./style.css";


import TaskPage from "./task.js";

import ProjectPage from "./project.js";


import {Task, Project} from "./Class.js";


let Maincont = document.querySelector(".main");

let taskform = document.querySelector(".addtaskform");

let taskspan = document.querySelector(".tasks");

let projectspan = document.querySelector(".project");


let closebtn = document.querySelectorAll(".close");

let submittaskbtn = document.querySelector(".submittask");

let taskpriority = document.querySelector("#priority");

let descriptionarea = document.querySelector("#description");

let selectedproject = document.querySelector("#addtoproject");


let projectform = document.querySelector(".addprojectform");






taskspan.addEventListener("click", ()=>{
    if (!taskspan.classList.contains("active")){
        taskspan.classList.add("active");
        projectspan.classList.remove("active");
    }
    document.querySelector(".taskcont").innerHTML = "";
    Main();
})
projectspan.addEventListener("click", ()=>{
    if (!projectspan.classList.contains("active")){
        projectspan.classList.add("active");
        taskspan.classList.remove("active");
    }
    document.querySelector(".taskcont").innerHTML = "";
    Main();
})


let inputs = document.querySelectorAll(".addtaskform input");

let descriptionparagraph = document.querySelector("#description");




Main();











function Main(){
    if (taskspan.classList.contains("active")){
        TaskPage(Maincont);
        let defaultproject = null;
        let newtask = null;
        let button = document.querySelector(".addtaskbtn");
        button.addEventListener("click", ()=>{
            if (button.innerHTML === "Add Task")
                 taskform.classList.remove("hidden");
            else{
                projectform.classList.remove("hidden");
            }
        })
       closebtn[0].addEventListener("click", ()=>{
       taskform.classList.add("hidden");
       clearinputs();
       })
       closebtn[1].addEventListener("click", ()=>{
        projectform.classList.add("hidden");
       })
    submittaskbtn.addEventListener("click", (e)=>{
        e.preventDefault();
        if (submittaskbtn.innerHTML === "Add"){
            let title = inputs[0].value;
            let date = inputs[1].value;
            let priority = taskpriority.value;
            let descript = descriptionarea.value;
            let project = selectedproject.value;
            if (project != "Default"){

            }
            if (localStorage.getItem("Projects") === null){
                defaultproject = new Project("Default");
                newtask = defaultproject.addTasks(title, date, descript, priority, project);
                localStorage.setItem("Projects", JSON.stringify([defaultproject]));
            }
            else{
                let list = JSON.parse(localStorage.getItem("Projects"));
                defaultproject = list[0];            
                newtask = new Task(title, date, descript, priority, project);
                defaultproject.tasks.push(newtask);
                list[0] = defaultproject;
                localStorage.setItem("Projects", JSON.stringify(list));
            }
            let stringified = null;
            if (localStorage.getItem("Default") === null){
                let defaultarray = [newtask];
                stringified = JSON.stringify(defaultarray);
            }
            else{
                let parsed = JSON.parse(localStorage.getItem("Default"));
                let length = parsed.length;
                if (length > 0){
                    for (let i = 0; i < length; i++){
                        if (parsed[i] instanceof Array){
                            if (parsed[i][0].due === date){
                                parsed[i].push(newtask);
                                break;
                            }
                        }
                        else if(parsed[i].due === date){
                            let temp = parsed[i];
                            parsed.splice(i, 1, [temp, newtask]);
                            break;
                        }
                        if (i === length - 1){
                            parsed.push(newtask);
                        }
                        
                    }}
                else{
                    parsed.push(newtask);
                }
                stringified = JSON.stringify(parsed);
            }
            localStorage.setItem(project, stringified);
            taskform.classList.add("hidden");
            document.querySelector(".taskcont").innerHTML = "";
            TaskPage(Maincont);
            clearinputs();
    }})

    }
    else{
        ProjectPage(Maincont);
    }
}






function clearinputs(){
    if (submittaskbtn.innerHTML != "Add")
        submittaskbtn.innerHTML = "Add";
    inputs[0].value = "";
    inputs[1].value = "";
    descriptionparagraph.value = "";
}