

import "./style.css";


import {TaskPage} from "./task.js";

import ProjectPage from "./project.js";


import {Task, Project} from "./Class.js";

export {addtasktoproject, updateform, checkinput};

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

const controller = new AbortController();

let submitproject = document.querySelector(".addproject");

let projecttitle = document.querySelector(".addprojectform input");



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
    let defaultproject = null;
    if (taskspan.classList.contains("active")){
        TaskPage(Maincont);
        let newtask = null;
        let button = document.querySelector(".addtaskbtn");
        button.addEventListener("click", ()=>{
            if (button.innerHTML === "Add Task"){
                 selectedproject.disabled = false;
                 taskform.classList.remove("hidden");
                 if (localStorage.getItem("Projects") != null && JSON.parse(localStorage.getItem("Projects")).length > 1){
                    if (Array.from(selectedproject.children).length === 1){
                        updateform();
                    }
                 }
            }
            else{
                projectform.classList.remove("hidden");
            }
        })
       closebtn[0].addEventListener("click", ()=>{
       taskform.classList.add("hidden");
       if (taskform.classList.contains("calledfromProject")){
           taskform.classList.remove("calledfromProject");
       }
       clearinputs();
       })
       closebtn[1].addEventListener("click", ()=>{
        projectform.classList.add("hidden");
        projecttitle.value = "";
        submitproject.innerHTML = "Add Project";
       })
       submittaskbtn.addEventListener("click", (e)=>{
        e.preventDefault();
        if (submittaskbtn.innerHTML === "Add"){
            let title = inputs[0].value;
            let date = inputs[1].value;
            let priority = taskpriority.value;
            let descript = descriptionarea.value;
            let project = selectedproject.value;
            if (checkinput(title, date, priority, descript)){
                if (project != "Default"){
                    newtask = new Task(title, date, descript, priority, project);
                    addtasktoproject(project, newtask);
                }
                else{
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
                localStorage.setItem("Default", stringified);
                taskform.classList.add("hidden");
                document.querySelector(".taskcont").innerHTML = "";
                if (!taskform.classList.contains("calledfromProject"))
                     TaskPage(Maincont);
                else{
                    ProjectPage(Maincont);
                    taskform.classList.remove("calledfromProject");
                }
                clearinputs();
    }}},{
        signal : controller.signal
    });
    }
    else{
        if (localStorage.getItem("Projects") === null){
            defaultproject = new Project("Default");
            localStorage.setItem("Default", JSON.stringify([]));
            localStorage.setItem("Projects", JSON.stringify([defaultproject]));
        }
        ProjectPage(Maincont);
        submitproject.addEventListener("click", (e)=>{
            e.preventDefault();
            if (submitproject.innerHTML === "Add Project"){
                projectform.classList.add("hidden");
                let title = projecttitle.value;
                let newproject = new Project(title);
                let projects = JSON.parse(localStorage.getItem("Projects"));
                if (!duplicateExists(projects, newproject.title) && title.length > 0){
                    projects.push(newproject);
                    localStorage.setItem("Projects", JSON.stringify(projects));
                    let option = document.createElement("option");
                    option.innerHTML = title;
                    selectedproject.appendChild(option);
                    document.querySelector(".taskcont").innerHTML = "";
                    ProjectPage(Maincont);
                    projecttitle.value = "";
        }}});
    }
}






function clearinputs(){
    if (submittaskbtn.innerHTML != "Add")
        submittaskbtn.innerHTML = "Add";
    inputs[0].value = "";
    inputs[1].value = "";
    descriptionparagraph.value = "";
    taskpriority.value = "1";
    selectedproject.value = "Default";
}


function checkinput(title, date, priority, descript){
    if (title.length === 0 || date.length === 0 || priority.length === 0 || descript.length === 0){
         return false;
    }
    return true;
}


function duplicateExists(array, title){
    for (let i = 0; i < array.length; i++){
        if (array[i].title === title){
            return true;
        }
    }
    return false;
}


function addtasktoproject(project, newtask){
    let list = JSON.parse(localStorage.getItem("Projects"));
    for (let i = 0; i < list.length; i++){
        if (list[i].title === project){
            list[i].tasks.push(newtask);
        }
    }
    localStorage.setItem("Projects", JSON.stringify(list));
}



function updateform(){
    let projectlist = JSON.parse(localStorage.getItem("Projects"));
    for (let i = 1; i < projectlist.length; i++){
        let option = document.createElement("option");
        option.innerHTML = projectlist[i].title;
        selectedproject.appendChild(option);
    }
}