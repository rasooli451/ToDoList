


export default TaskPage;






function TaskPage(Parent){
    
    if (localStorage.length === 0){
    let maindiv = document.createElement("div");
    maindiv.classList.add("maindiv");
    Parent.appendChild(maindiv);
    let ntask = document.createElement("p");
    ntask.innerHTML = "No Tasks to display";
    ntask.classList.add("ntask");
    let btn = document.createElement("button");
    btn.innerHTML = "Add Task";
    btn.classList.add("addtaskbtn");
    let taskCont = document.createElement("div");
    taskCont.classList.add("taskcont");
    maindiv.appendChild(btn);
    maindiv.appendChild(ntask);
    maindiv.appendChild(taskCont);
    }
    else{
        console.log(true);
        let child = Array.from(Parent.children)[1];
        let container = Array.from(child.children);
        for (let i = 0; i < container.length; i++){
            if (container[i].classList.contains("ntask")){
                child.removeChild(container[i]);
                break;
            }
        }
        console.log(true);
        let taskcont = document.querySelector(".taskcont");
        Object.keys(localStorage).forEach((key)=>{
            let task = JSON.parse(localStorage.getItem(key));    
            let taskdiv = document.createElement("div");
            taskdiv.classList.add("task");
            let due = document.createElement("p");
            due.classList.add("duedate");
            due.innerHTML = task.due;
            taskdiv.appendChild(due);
            let descriptiondiv = document.createElement("div");
            taskdiv.appendChild(descriptiondiv);
            let checkbox = document.createElement("input");
            checkbox.type = "radio";
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
            descP.innerHTML = task.description;
            detailsbtn.addEventListener("click", ()=>{
                if (detailsbtn.classList.contains("hiddenbtn")){
                    descriptiondiv.appendChild(descP);
                    detailsbtn.classList.remove("hiddenbtn");
                }
                else{
                    let toberemoved = Array.from(descriptiondiv.children)[4];
                    descriptiondiv.removeChild(toberemoved);
                    detailsbtn.classList.add("hiddenbtn");
                }
            })
            taskcont.appendChild(taskdiv);
        })
    }
}