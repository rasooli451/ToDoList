





class Project{
    tasks = [];
    constructor(title){
        this.title = title;
    }
    addTasks(title, due, description, priority, projectname){
        let temp = new Task(title, due, description, priority, projectname);
        this.tasks.push(temp);
        return temp;
    }
    removetask(task){
        let index = this.tasks.indexOf(task);
        if (index!=-1){
            this.tasks.splice(index, 1);
        }
    }
}







class Task{
    constructor(title, due, description, priority, projectname){
        this.title = title;
        this.due = due;
        this.description = description;
        this.priority = priority;
        this.projectname = projectname;
    }
}





export {
     Task, Project
};

