const formElement = document.getElementById("createTodo");
const selectElement = document.getElementById("category");
const description = document.getElementById("description");
const dueDate = document.getElementById("due-date");

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
          <strong>Date:</strong> ${todo.dueDate}<br>
          <strong>Description:</strong> ${todo.description}<br>
          <strong>Category:</strong> ${todo.category}
          <button type="button" data-id="${todo._id}">Delete</button>
        `;
        todoList.appendChild(li);
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
      alert("Todo added");
    }
  }
  catch (error) {
    console.log("error");
  }
})



document.addEventListener("DOMContentLoaded", async () => {
  await getAllTodos();
});




