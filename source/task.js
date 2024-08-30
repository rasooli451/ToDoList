


export default TaskPage;






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
    if (Array.from(Parent.children).length > 1){
        maindiv = document.querySelector(".maindiv");
        maindiv.insertBefore(ntask, document.querySelector(".taskcont"));
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
    if (Parent.children.length === 1){
        initialize(Parent);
    }
    let child = Array.from(Parent.children)[1];
    let container = Array.from(child.children);
    for (let i = 0; i < container.length; i++){
        if (container[i].classList.contains("ntask")){
            child.removeChild(container[i]);
            break;
        }
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
                    filldescription(taskdiv, task[j], j, i, true);
                }
            }   
            else{
                taskdiv = document.createElement("div");
                taskdiv.classList.add("task");
                let due = document.createElement("p");
                due.classList.add("duedate");
                due.innerHTML = task.due;
                taskdiv.appendChild(due);
                filldescription(taskdiv, task, i, 0, false);
            }
            taskcont.appendChild(taskdiv);
            } 
        }
}



function filldescription(Taskdiv, task, index, indexArray, isArray){
    let descriptiondiv = document.createElement("div");
    Taskdiv.appendChild(descriptiondiv);
    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.addEventListener("click", ()=>{
        removetask(Taskdiv, task, index, indexArray, isArray);
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
    let projectname = document.createElement("p");
    projectname.innerHTML = "Project : " + task.projectname;
    tempdiv.appendChild(projectname);
    let editbtn = document.createElement("button");
    editbtn.innerHTML = "Edit";
    editbtn.classList.add("editbtn");
    tempdiv.append(editbtn);
    editbtn.addEventListener("click", ()=>{
        EditTask(task, index, indexArray, isArray);
    })
    detailsbtn.addEventListener("click", ()=>{
    if (detailsbtn.classList.contains("hiddenbtn")){
        descriptiondiv.appendChild(tempdiv);
        detailsbtn.classList.remove("hiddenbtn");
    }
    else{
        let toberemoved = Array.from(descriptiondiv.children)[4];
        descriptiondiv.removeChild(toberemoved);
        detailsbtn.classList.add("hiddenbtn");
    }
})
}


function removetask(Taskdiv, task, index, indexArray, isArray){
    let tasks = JSON.parse(localStorage.getItem("Default"));
    let project = JSON.parse(localStorage.getItem("Projects"));
    if (isArray){
        tasks[indexArray].splice(index, 1);
        if (tasks[indexArray].length === 0){
            tasks.splice(indexArray, 1);
        }
    }
    else{
        tasks.splice(index, 1);
    }
    localStorage.setItem("Default", JSON.stringify(tasks));
    document.querySelector(".taskcont").innerHTML = "";
    TaskPage(document.querySelector(".main"));
    for (let i = 0; i < project.length; i++){
        let subproject = project[i];
        for (let j = 0; j < subproject.tasks.length; j++){
            if (JSON.stringify(task) === JSON.stringify(subproject.tasks[j])){
                subproject.tasks.splice(j, 1);
                break;
                }
    }}
    localStorage.setItem("Projects", JSON.stringify(project));
}


function EditTask(task, index, indexArray, isArray){
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
    button.addEventListener("click", ()=>{
        if (button.innerHTML === "Edit"){
            button.innerHTML = "Add";
            form.classList.add("hidden");
            let title = inputs[0].value;
            let date = inputs[1].value;
            let taskpriority = priority.value;
            let descript = descriptionpar.value;
            let selectedproject = project.value;
            if (selectedproject != task.projectname){

            }
            task.title = title;
            task.priority = taskpriority;
            task.description = descript;
            task.projectname = selectedproject;
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
                }
                else{
                    tasks.splice(index, 1);
                }
            }
            localStorage.setItem("Default", JSON.stringify(tasks));
            document.querySelector(".taskcont").innerHTML = "";
            TaskPage(document.querySelector(".main"));
            inputs[0].value = "";
            inputs[1].value = "";
            descriptionpar.value = "";
            controller.abort();
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









