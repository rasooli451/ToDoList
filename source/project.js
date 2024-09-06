

export default ProjectPage;



function ProjectPage(Parent){
    document.querySelector(".addtaskbtn").innerHTML = "Add Project";
    if (localStorage.length === 0 || JSON.parse(localStorage.getItem("Default")).length === 0){
        document.querySelector(".ntask").innerHTML = "No Projects To Display";
    }
    else{
        
    }
}