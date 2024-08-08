





class Project{
    tasks = [];
    constructor(title){
        this.title = title;
    }
    addTasks(title, due, description, priority, done){
        let temp = new Task(title, due, description, priority, false);
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
    constructor(title, due, description, priority, done){
        this.title = title;
        this.due = due;
        this.description = description;
        this.priority = priority;
        this.done = false;
    }
}





export {
     Task, Project
};

