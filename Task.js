var ad=document.getElementById("ad")
var overr=document.getElementById("over")
var popp=document.getElementById("pop")
var addd=document.getElementById("add")
var cancel=document.getElementById("cancel")
var fullbox=document.getElementById("allbox")
var tit=document.getElementById("Title")
var tas=document.getElementById("taskk")
var des=document.getElementById("descriptions")
var del=document.getElementById("del")
ad.addEventListener("click",function(){
    overr.style.display="block"
    popp.style.display="block"
})
addd.addEventListener("click",function(event){
    event.preventDefault()
    var div = document.createElement("div")
    div.setAttribute("class","box") 
    div.innerHTML=` <h2>${tit.value}</h2>
    <h5>${tas.value}</h5>
    <p>${des.value}</p>
    <button id='del' onclick='Delete(event)'>Delete</button>`
    if (tit.value != "" && tas.value!="" && des.value!=""){
        fullbox.append(div)
    }
    else{
        alert("please fill all details to add")
    }
    overr.style.display="none"
    popp.style.display="none"
})
cancel.addEventListener("click",function(event){
    event.preventDefault()
    overr.style.display="none"
    popp.style.display="none"
    document.getElementById("Title").value = "";
    document.getElementById("taskk").value = "";
    document.getElementById("descriptions").value = "";
})
function Delete(event){
    event.target.parentElement.remove()
}
addd.addEventListener("click", function(event) {
    event.preventDefault();

    const title = document.getElementById("Title").value;
    const taskk = document.getElementById("taskk").value;
    const descriptions = document.getElementById("descriptions").value;
    if (title === "" || taskk === "" || descriptions === "") {
        alert("Please fill all the details before adding!");
        return;
    }
    fetch('/add-task', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, taskk, descriptions })
    }).then(response => response.json())
      .then(data => {
        if (data.success) {
            alert("Task added successfully!");
            document.getElementById("Title").value = "";
            document.getElementById("taskk").value = "";
            document.getElementById("descriptions").value = "";
            location.reload(); 
        } else {
            alert("Failed to add task");
            document.getElementById("Title").value = "";
            document.getElementById("taskk").value = "";
            document.getElementById("descriptions").value = "";
        }
    }).catch(error => {
        console.error("Error:", error);
    });
});
fetch('/tasks')
  .then(response => response.json())
  .then(data => {
    const fullbox = document.getElementById("allbox");
    data.tasks.forEach(task => {
      const div = document.createElement("div");
      div.setAttribute("class", "box");
      div.innerHTML = `
        <h2>${task.title}</h2>
        <h5>${task.taskk}</h5>
        <p>${task.descriptions}</p>
        <button id='del' onclick='Delete(event)'>Delete</button>
      `;
      fullbox.append(div);
    });
  });
//   fetch('/tasks')
//   .then(response => response.json())
//   .then(data => {
//     const fullbox = document.getElementById("allbox");
//     data.tasks.forEach(task => {
//       const div = document.createElement("div");
//       div.setAttribute("class", "box");
//       div.setAttribute("data-id", task.id); // Add task id to div for reference

//       div.innerHTML = `
//         <h2>${task.title}</h2>
//         <h5>${task.taskk}</h5>
//         <p>${task.descriptions}</p>
//         <button class='del-btn' onclick='Delete(event, ${task.id})'>Delete</button>
//       `;
//       fullbox.append(div);
//     });
//   });
//   function Delete(event, id) {
//     event.preventDefault();

//     // Send DELETE request to the server to remove the task by id
//     fetch(`/delete-task/${id}`, {
//         method: 'DELETE',
//     })
//     .then(response => response.json())
//     .then(data => {
//         if (data.success) {
//             alert("Task deleted successfully!");
//             event.target.parentElement.remove(); // Remove the task from the UI
//         } else {
//             alert("Failed to delete the task.");
//         }
//     })
//     .catch(error => {
//         console.error("Error deleting task:", error);
//     });
// }







