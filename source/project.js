

export default ProjectPage;

import {filldescription} from "./task.js";

import { updateform } from "./index.js";



function ProjectPage(Parent){
    document.querySelector(".addtaskbtn").innerHTML = "Add Project";
    fillpage(Parent);
}




function fillpage(Parent){
    let projectlist = JSON.parse(localStorage.getItem("Projects"));
    let main = Array.from(Parent.children)[2];
    if  (Array.from(main.children)[1].classList.contains("ntask")){
        main.removeChild(Array.from(main.children)[1]);
    }
    for (let i = 0; i < projectlist.length; i++){
        let projectdiv = document.createElement("div");
        projectdiv.classList.add("samedate");
        document.querySelector(".taskcont").appendChild(projectdiv);
        let tasklist = projectlist[i].tasks;
        let infodiv = document.createElement("div");
        infodiv.classList.add("infodiv");
        let title = document.createElement("p");
        title.innerHTML = projectlist[i].title;
        infodiv.appendChild(title);
        let buttondiv = document.createElement("div");
        buttondiv.classList.add("buttondiv");
        let taskbtn = document.createElement("button");
        let editbtn = document.createElement("button");
        let deleteprojectbtn = document.createElement("button");
        taskbtn.innerHTML = "Add Task";
        buttondiv.appendChild(taskbtn);
        taskbtn.addEventListener("click", ()=>{
            let project = document.querySelector("#addtoproject");
            if (JSON.parse(localStorage.getItem("Projects")).length > 1){
                if (Array.from(project.children).length === 1){
                    updateform();
                }
             }
            project.value = projectlist[i].title;
            document.querySelector(".addtaskform").classList.remove("hidden");
            document.querySelector(".addtaskform").classList.add("calledfromProject");
            project.disabled = true;
        })
        if (i > 0){
            deleteprojectbtn.innerHTML = "Delete Project";
            editbtn.innerHTML = "Edit Project";
            buttondiv.appendChild(editbtn);
            buttondiv.appendChild(deleteprojectbtn);
        }
        editbtn.addEventListener("click", ()=>{
            editproject(i);
        })
        deleteprojectbtn.addEventListener("click", ()=>{
            deleteProject(i);
        })
        infodiv.appendChild(buttondiv);
        projectdiv.appendChild(infodiv);
        if (tasklist.length > 0){
            for (let j = 0; j < tasklist.length; j++){
                let task = tasklist[j];
                let info = Findinfo(task);
                if (info[0]){
                    filldescription(projectdiv, task, info[2], info[1], true, false, i, j);
                }
                else{
                    filldescription(projectdiv, task, info[2], 0, false, false, i, j);
                }
            }
        }
        else{
            let descriptionparagraph = document.createElement("p");
            descriptionparagraph.innerHTML = "No Tasks have been added Yet";
            projectdiv.appendChild(descriptionparagraph);
            descriptionparagraph.classList.add("notaskdesc")
            projectdiv.classList.add("taskless");
        }
    }
}




function Findinfo(task){
    let info = [];
    let stringified = JSON.stringify(task);
    let tasks = JSON.parse(localStorage.getItem("Default"));
    let done = false;
    for (let i = 0; i < tasks.length; i++){
        if (tasks[i] instanceof Array){
            if (tasks[i][0].due === task.due){
                for (let j = 0; j < tasks[i].length; j++){
                    if (JSON.stringify(tasks[i][j]) === stringified){
                        info.push(true);
                        info.push(i);
                        info.push(j);
                        done = true;
                        break;
                    }
                }
            }
            if (done)
                break;
        }
        else{
            if (JSON.stringify(tasks[i]) === stringified){
                info.push(false);
                info.push(0);
                info.push(i);
                break;
            }
        }
    }
    return info;
}


function editproject(index){
    let projectform = document.querySelector(".addprojectform");
    let titleinput = document.querySelector(".addprojectform input");
    let projects = JSON.parse(localStorage.getItem("Projects"));
    let button = document.querySelector(".addprojectform button");
    titleinput.value = projects[index].title;
    button.innerHTML = "Edit Project";
    projectform.classList.remove("hidden");
    const controller = new AbortController();
    button.addEventListener("click", (e)=>{
        e.preventDefault();
        if (button.innerHTML === "Edit Project"){
            button.innerHTML = "Add Project";
            projects[index].title = titleinput.value;
            titleinput.value = "";
            let def = JSON.parse(localStorage.getItem("Default"));
            let tasks = projects[index].tasks;
            for (let i = 0; i < tasks.length; i++){
                let info = Findinfo(tasks[i]);
                tasks[i].projectname = projects[index].title;
                if (info[0]){
                    def[info[1]][info[2]].projectname = projects[index].title;
                }
                else{
                    def[info[2]].projectname = projects[index].title;
                }
            }
            projectform.classList.add("hidden");
            localStorage.setItem("Projects", JSON.stringify(projects));
            localStorage.setItem("Default", JSON.stringify(def));
            document.querySelector(".taskcont").innerHTML = "";
            let projectselect = document.querySelector("#addtoproject");
            let childlist = Array.from(projectselect.children);
            childlist[index].innerHTML = projects[index].title;
            ProjectPage(document.querySelector(".main"));
            controller.abort();
        }
    }, {
        signal : controller.signal
    });
}


function deleteProject(index){
    let projects = JSON.parse(localStorage.getItem("Projects"));
    let def = JSON.parse(localStorage.getItem("Default"));
    let tasks = projects[index].tasks;

    for (let i = 0; i < tasks.length; i++){
        let info = Findinfo(tasks[i]);
        if (info[0]){
            def[info[1]].splice(info[2], 1);
            if (def[info[1]].length === 0){
                def.splice(info[1], 1);
            }
            else if(def[info[1]].length === 1){
                let temp = def[info[1]][0];
                def.splice(info[1], 1, temp);
            }
        }
        else{
            def.splice(info[2], 1);
        }
    }

    projects.splice(index, 1);
    let projectselect = document.querySelector("#addtoproject");
    let childlist = Array.from(projectselect.children);
    document.querySelector(".taskcont").innerHTML = "";
    if (JSON.parse(localStorage.getItem("Projects")).length > 1){
        if (childlist.length === 1){
            updateform();
        }
        else{
            projectselect.removeChild(childlist[index]);
        }
    }
    localStorage.setItem("Default", JSON.stringify(def));
    localStorage.setItem("Projects", JSON.stringify(projects));
    ProjectPage(document.querySelector(".main"));
}