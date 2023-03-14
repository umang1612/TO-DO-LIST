(function(){
    
let tasks=[];
const taskList = document.getElementById('list');
const addTaskInput = document.getElementById('add');
const tasksCounter = document.getElementById('tasks-counter');


// async function toDosSample(){
//     // GET
//     // fetch('https://jsonplaceholder.typicode.com/todos')
//     //     .then(function (response){
//     //         console.log(response);
//     //         return response.json();
//     //     }).then(function(data){
//     //         tasks = data.slice(0,10);
//     //         renderList();
//     //     }).catch(function(error){
//     //         console.log('eroor',error)
//     //     })
//     try{
//     const response = await fetch('https://jsonplaceholder.typicode.com/todos');
//     const data = await response.json();
//     tasks = data.slice(0,10);
//     renderList();
//     }

//     catch(error){
//         console.log(error);
//     }

         


// }

function addTaskToDom(task){
    const li = document.createElement('li');
    li.innerHTML=`
    <input type="checkbox" id="${task.id}" class="custom-checkbox" ${task.completed ? 'checked':''}>
    <label for="${task.id}">${task.title}</label>
    <img src="../images/bin.png" class="delete" data-id="${task.id}" />
    `
    taskList.append(li);
}

function renderList(){
    taskList.innerHTML =" ";
    for(let i=0;i<tasks.length;i++){
        addTaskToDom(tasks[i]);
    }

    tasksCounter.innerHTML= tasks.length;

}

function markTaskCompleted(taskId){
    const task = tasks.filter(function(task){
        return task.id=== Number(taskId)
    });
    if(task.length>0){
        const currentTask = task[0];
        if(currentTask.completed){
        currentTask.completed = false;  
        showNotification('Task is unchecked');
        return;
        }
        currentTask.completed = true;
        console.log(task);
        renderList();
        showNotification('Task is completed');
        return;
    }
   

}

function deleteTask(taskId){
let newtasks = tasks.filter(function(task){
    return task.id !== Number(taskId);
});
tasks = newtasks;
renderList();
showNotification("Task is deleted successfully")

}

function addTask(task){
 if(task){
     // Post
    // fetch('https://jsonplaceholder.typicode.com/todos',
    //     {
    //         method: "POST", // or 'PUT'
    //         headers: {
    //           "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify(task),
    //       })
    //       .then(function (response){
    //         console.log(response);
    //         return response.json();
    //     }).then(function(data){
    //         tasks.push(task);
    //         renderList();
    //         showNotification("Task added successfully");
    //     }).catch(function(error){
    //         console.log('error',error)
    //     })
    //     return;
    // }
    tasks.push(task);
    renderList();
    showNotification("Task added successfully");
    return;
 }

 showNotification('Task can not be added');

}

function showNotification(text){
 setTimeout(()=>{alert(text)},100);
}

function handleEventListener(e){
  if(e.key==='Enter'){
    const text = e.target.value;
    console.log('text:',text);

  if(!text){
    showNotification('Task text can not be empty');
    return;
  }

  const task = {
    title:text,
    id: Date.now(),
    completed:false,
  }

  e.target.value ="";
  addTask(task);
}
}

function handleClickEventListener(e){
    const target = e.target;

    if(target.className ==="delete"){
        const taskId = target.dataset.id;
        deleteTask(taskId);
        return;
    }

    else if(target.className ==="custom-checkbox"){
        const taskId = target.id;
        markTaskCompleted(taskId);
        return;
    }

}

function IntialiseApp(){
    // toDosSample(); Fetch data from an Api
    addTaskInput.addEventListener('keyup',handleEventListener);
    document.addEventListener('click',handleClickEventListener);
}

IntialiseApp();

})();
