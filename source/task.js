


export {TaskPage, filldescription, EditTask, removetask, fillup, findTaskIndex, applychangestoproject, updateform};

import ProjectPage from "./project";

import { addtasktoproject, updateform, checkinput} from "./index";

function TaskPage(Parent){
    if (localStorage.getItem("Default") === null || JSON.parse(localStorage.getItem("Default")).length === 0){
        initialize(Parent);
    }
    else{
        fillPage(Parent);    
        }
}





function initialize(Parent){
    let maindiv = null;
    let ntask = document.createElement("p");
    ntask.innerHTML = "No Tasks to display";
    ntask.classList.add("ntask");
    if (Array.from(Parent.children).length > 2){
        maindiv = document.querySelector(".maindiv");
        document.querySelector(".addtaskbtn").innerHTML = "Add Task";
        if (Array.from(maindiv.children).length === 2)
             maindiv.insertBefore(ntask, document.querySelector(".taskcont"));
        document.querySelector(".ntask").innerHTML = "No Tasks to display";
    }
    else{
    maindiv = document.createElement("div");
    maindiv.classList.add("maindiv");
    Parent.appendChild(maindiv);
    let btn = document.createElement("button");
    btn.innerHTML = "Add Task";
    btn.classList.add("addtaskbtn");
    let taskCont = document.createElement("div");
    taskCont.classList.add("taskcont");
    maindiv.appendChild(btn);
    maindiv.appendChild(ntask);
    maindiv.appendChild(taskCont);
    }
}





function fillPage(Parent){
    if (Parent.children.length === 2){
        initialize(Parent);
    }
    document.querySelector(".addtaskbtn").innerHTML = "Add Task";
    let child = Array.from(Parent.children)[2];
    let grandchild = Array.from(child.children);
    if (grandchild[1].classList.contains("ntask")){
        child.removeChild(grandchild[1]);
    }
    let taskcont = document.querySelector(".taskcont");

    if (localStorage.getItem("Default") != null){
        let taskarr = JSON.parse(localStorage.getItem("Default"));
        let taskdiv = null;
        for (let i = 0; i < taskarr.length; i++){
            let task = taskarr[i];
            if (task instanceof Array){
                taskdiv = document.createElement("div");
                taskdiv.classList.add("samedate");
                let due = document.createElement("p");
                due.innerHTML = task[0].due;
                taskdiv.appendChild(due);
                for (let j = 0; j < task.length; j++){
                    filldescription(taskdiv, task[j], j, i, true, true, 0, 0);
                }
            }   
            else{
                taskdiv = document.createElement("div");
                taskdiv.classList.add("task");
                let due = document.createElement("p");
                due.classList.add("duedate");
                due.innerHTML = task.due;
                taskdiv.appendChild(due);
                filldescription(taskdiv, task, i, 0, false, true, 0, 0);
            }
            taskcont.appendChild(taskdiv);
            } 
        }
}



function filldescription(Taskdiv, task, index, indexArray, isArray, calledfromtaskpage, projectindex, taskindex){
    let descriptiondiv = document.createElement("div");
    Taskdiv.appendChild(descriptiondiv);
    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.addEventListener("click", ()=>{
        removetask(task, index, indexArray, isArray, calledfromtaskpage, projectindex, taskindex);
    })
    descriptiondiv.appendChild(checkbox);
    descriptiondiv.classList.add("descdiv");
    let title = document.createElement("p");
    title.innerHTML = task.title;
    descriptiondiv.appendChild(title);
    let Priority = document.createElement("p");
    Priority.innerHTML = task.priority;
    descriptiondiv.appendChild(Priority);
    let detailsbtn = document.createElement("button");
    detailsbtn.innerHTML = "Expand";
    descriptiondiv.appendChild(detailsbtn);
    detailsbtn.classList.add("hiddenbtn");
    let descP = document.createElement("p");
    let tempdiv = document.createElement("div");
    tempdiv.classList.add("tempdiv");
    tempdiv.append(descP);
    descP.innerHTML = "Description : " + task.description;
    if (calledfromtaskpage){
        let projectname = document.createElement("p");
        projectname.innerHTML = "Project : " + task.projectname;
        tempdiv.appendChild(projectname);
    }
    else{
        let duedate = document.createElement("p");
        duedate.innerHTML = "Due : " + task.due;
        tempdiv.appendChild(duedate);
    }
    
    let editbtn = document.createElement("button");
    editbtn.innerHTML = "Edit";
    editbtn.classList.add("editbtn");
    tempdiv.append(editbtn);
    editbtn.addEventListener("click", ()=>{
        if (localStorage.getItem("Projects") != null && JSON.parse(localStorage.getItem("Projects")).length > 1){
            if (Array.from(document.querySelector("#addtoproject").children).length === 1){
                updateform();
            }
         }
        document.querySelector("#addtoproject").disabled = false;
        EditTask(task, index, indexArray, isArray, calledfromtaskpage, projectindex, taskindex);
    })
    detailsbtn.addEventListener("click", ()=>{
    if (detailsbtn.classList.contains("hiddenbtn")){
        descriptiondiv.appendChild(tempdiv);
        detailsbtn.classList.remove("hiddenbtn");
        detailsbtn.innerHTML = "Contract";
    }
    else{
        let toberemoved = Array.from(descriptiondiv.children)[4];
        descriptiondiv.removeChild(toberemoved);
        detailsbtn.classList.add("hiddenbtn");
        detailsbtn.innerHTML = "Expand";
    }
})
}


function removetask(task, index, indexArray, isArray, calledfromtaskpage,  projectindex, taskindex){
    let tasks = JSON.parse(localStorage.getItem("Default"));
    let project = JSON.parse(localStorage.getItem("Projects"));
    if (isArray){
        tasks[indexArray].splice(index, 1);
        if (tasks[indexArray].length === 0){
            tasks.splice(indexArray, 1);
        }
        else if(tasks[indexArray].length === 1){
            let temp = tasks[indexArray][0];
            tasks.splice(indexArray, 1, temp);
        }
    }
    else{
        tasks.splice(index, 1);
    }
    localStorage.setItem("Default", JSON.stringify(tasks));
    document.querySelector(".taskcont").innerHTML = "";
    if (calledfromtaskpage){
        TaskPage(document.querySelector(".main"));
        let info = findTaskIndex(task, task.projectname);
        project[info[0]].tasks.splice(info[1], 1);
    }
    else{
        project[projectindex].tasks.splice(taskindex, 1);
        localStorage.setItem("Projects", JSON.stringify(project));
        ProjectPage(document.querySelector(".main"));
    }
    localStorage.setItem("Projects", JSON.stringify(project));
}


function EditTask(task, index, indexArray, isArray, calledfromtaskpage, projectindex, taskindex){
    let inputs = document.querySelectorAll(".addtaskform input");
    let descriptionpar = document.querySelector("#description");
    let button = document.querySelector(".addtaskform div button");
    let project = document.querySelector("#addtoproject");
    button.innerHTML = "Edit";
    let form = document.querySelector(".addtaskform");
    let priority = document.querySelector("#priority");
    let tasks = JSON.parse(localStorage.getItem("Default"));
    form.classList.remove("hidden");
    fillup(task, inputs, descriptionpar, project, priority);
    const controller = new AbortController();
    let taskindexinproject = findTaskIndex(task, task.projectname);
    let projectchanged = false;
    button.addEventListener("click", ()=>{
        if (button.innerHTML === "Edit"){
            let title = inputs[0].value;
            let date = inputs[1].value;
            let taskpriority = priority.value;
            let descript = descriptionpar.value;
            let selectedproject = project.value;
            task.title = title;
            task.priority = taskpriority;
            task.description = descript;
            if (checkinput(title, date, taskpriority, descript)){
                button.innerHTML = "Add";
                if (selectedproject != task.projectname){
                    projectchanged = true;
                    task.projectname = selectedproject;
                    addtasktoproject(selectedproject, task);
                }
                if (date === task.due){
                    if (isArray){
                        tasks[indexArray][index] = task;
                    }
                    else{
                        tasks[index] = task;
                    }
                }
                else{
                    let dateexists = false;
                    let newindex = 0;
                    let newisalreadyArray = false;
                    let newisArray = false;
                    task.due = date;
                    for (let i = 0; i < tasks.length; i++){
                        if (tasks[i] instanceof Array){
                            if (tasks[i][0].due === date){
                                dateexists = true;
                                newisalreadyArray = true;
                                newindex = i;
                                break;
                            }
                        }
                        else{
                            if (tasks[i].due === date){
                                dateexists = true;
                                newisArray = true;
                                newindex = i;
                                break;
                            }
                        }
                    }
                    if (dateexists){
                        if (newisalreadyArray){
                            tasks[newindex].push(task);
                        }
                        else if(newisArray){
                            let  temptask = tasks[newindex];
                            tasks.splice(newindex, 1, [temptask, task]);
                        }
                    }
                    else{
                        tasks.push(task);
                    }
                    if (isArray){
                        tasks[indexArray].splice(index, 1);
                        if (tasks[indexArray].length === 1){
                            let temp = tasks[indexArray][0];
                            tasks.splice(indexArray, 1, temp);
                        }
                        else if(task[indexArray].length === 0){
                            tasks.splice(indexArray, 1);
                        }
                    }
                    else{
                        tasks.splice(index, 1);
                    }
                }
                localStorage.setItem("Default", JSON.stringify(tasks));
                document.querySelector(".taskcont").innerHTML = "";
                if (calledfromtaskpage){
                     TaskPage(document.querySelector(".main"));
                     if (projectchanged)
                         applychangestoproject(taskindexinproject, task, true);
                    else 
                         applychangestoproject(taskindexinproject, task, false);
                    }
                else{
                    let projects = JSON.parse(localStorage.getItem("Projects"));
                    if (projectchanged){
                        projects[projectindex].tasks.splice(taskindex, 1);
                    }
                    else{
                        projects[projectindex].tasks.splice(taskindex, 1, task);
                    }
                    localStorage.setItem("Projects", JSON.stringify(projects));
                    ProjectPage(document.querySelector(".main"));
                }
                form.classList.add("hidden");
                inputs[0].value = "";
                inputs[1].value = "";
                descriptionpar.value = "";
                controller.abort();
            }
            
    }},{
        signal: controller.signal
    });
    
}



function fillup(task, inputs, descriptionpar, project, priority){
    inputs[0].value = task.title;
    inputs[1].value = task.due;
    descriptionpar.value = task.description;
    priority.value = task.priority;
    project.value = task.projectname;
}





function findTaskIndex(task, projectname){
    let projects = JSON.parse(localStorage.getItem("Projects"));
    let info = [];
    for (let i = 0; i < projects.length; i++){
        if (projects[i].title === projectname){
            info.push(i);
            for (let j = 0; j < projects[i].tasks.length; j++){
                if (JSON.stringify(task) === JSON.stringify(projects[i].tasks[j])){
                    info.push(j);
                    break;
                    }
    }}}
    return info;
}



function applychangestoproject(Arrayindex, editedtask, projectchanged){
    let projects = JSON.parse(localStorage.getItem("Projects"));
    if (projectchanged){
        projects[Arrayindex[0]].tasks.splice(Arrayindex[1], 1);
    }
    else
        projects[Arrayindex[0]].tasks.splice(Arrayindex[1], 1, editedtask);
    localStorage.setItem("Projects", JSON.stringify(projects));
}


