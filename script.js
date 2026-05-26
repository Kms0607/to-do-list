const input = document.querySelector("#todo-input");
const addBtn = document.querySelector("#add-btn");
const todoList = document.querySelector("#todo-list");

let todos = JSON.parse(localStorage.getItem("todos")) || [];

// 화면 출력
function renderTodos() {
    todoList.innerHTML = "";

    todos.forEach((todo, index) => {
        const li = document.createElement("li");

        if (todo.completed) {
            li.classList.add("completed");
        }

        li.innerHTML = `
            <span>${todo.text}</span>
            <div>
                <button onclick="toggleTodo(${index})">완료</button>
                <button onclick="editTodo(${index})">수정</button>
                <button onclick="deleteTodo(${index})">삭제</button>
            </div>
        `;

        todoList.appendChild(li);
    });

    localStorage.setItem("todos", JSON.stringify(todos));
}

// 추가
function addTodo() {
    const text = input.value.trim();

    if (text === "") {
        alert("할 일을 입력하세요.");
        return;
    }

    todos.push({
        text: text,
        completed: false
    });

    input.value = "";
    renderTodos();
}

// 완료
function toggleTodo(index) {
    todos[index].completed = !todos[index].completed;
    renderTodos();
}

// 삭제
function deleteTodo(index) {
    todos.splice(index, 1);
    renderTodos();
}

// 수정
function editTodo(index) {
    const newText = prompt("수정할 내용을 입력하세요.", todos[index].text);

    if (newText !== null) {
        todos[index].text = newText;
        renderTodos();
    }
}

// 버튼 클릭
addBtn.addEventListener("click", addTodo);

// 엔터 입력
input.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        addTodo();
    }
});

renderTodos();