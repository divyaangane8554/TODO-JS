const formElement = document.getElementById("createTodo");
const selectElement = document.getElementById("category");
const description = document.getElementById("description");
const dueDate = document.getElementById("due-date");
const deleteButton = document.getElementById("delete-todos");
async function getAllTodos() {
  const todoList = document.getElementById("list-id")
    try {
      const response = await fetch("/todo");
      const todoData = await response.json();
      if(todoData.data.length>0){
        todoList.innerHTML = ""; 
        todoData.data.forEach((todo)=>{
          const li = document.createElement("li");

          li.innerHTML = `
          <div id="list-items">
            <span><input type="checkbox" id="${todo._id}" value=""><span>
            <span id="description_display">${todo.description}<span><br>
            <span><i class="fa-solid fa-calendar-days"></i><span><span>${todo.dueDate}<span><br>
            <div id="category_display">${todo.category}<div>
          <div>
          `;
        todoList.appendChild(li);
        deleteButton.addEventListener("click",async()=>{
             const checkbox = document.getElementById(todo._id);
             if(checkbox.checked){
               await deleteTodo(todo._id);
             }
        })
        
        });
      }
      else{
        todoList.innerHTML = "No Todos Found"; 
      }
    }
    catch (error) {
      console.log(error)
    }
  }
async function deleteTodo(id){
  try{
     const response = await fetch("/todo",{
      method:"DELETE",
      body: JSON.stringify({
        id:id
      }),
      headers: {
        "Content-type": "application/json;charset=UTF-8"
      }
      
     })
     if(response.ok){
      await getAllTodos();
     }
  }catch(error){
    console.log(error)
  }
}

formElement.addEventListener("submit", async (e) => {
  e.preventDefault();
  const selectedValue = selectElement.value;
  try {
    const response = await fetch("/todo", {
      method: "POST",
      body: JSON.stringify({
        description: description.value,
        category: selectedValue,
        dueDate: dueDate.value
      }),
      headers: {
        "Content-type": "application/json;charset=UTF-8"
      }
    });

    if (response.ok) {
      await getAllTodos();
    }
  }
  catch (error) {
    console.log("error");
  }
})



document.addEventListener("DOMContentLoaded", async () => {
  await getAllTodos();
});