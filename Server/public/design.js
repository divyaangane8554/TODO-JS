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
          <div id="list-items">
            <span><input type="checkbox" id="List-Checkbox" value=""><span>
            <span id="description_display">${todo.description}<span><br>
            <span><i class="fa-solid fa-calendar-days"></i><span><span>${todo.dueDate}<span><br>
            <div id="category_display">${todo.category}<div>
          <div>
          `;
        todoList.appendChild(li);
        });

        const deleteButtons = document.querySelectorAll(".delete-button");
        deleteButtons.forEach(button => {
        button.addEventListener("click", async event => {
          const todoId = event.target.getAttribute("data-id");
          await deleteTodoById(todoId);
          await getAllTodos(); // Refresh the list after deletion
        });
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




