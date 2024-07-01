const mainTodoElem = document.querySelector(".todoListElem");
const inputValue = document.getElementById("inputValue");

const getTodolistlocal = () => {
    return JSON.parse(localStorage.getItem("myTodoLists"));
};


const addTodoListLcalStorage = (localTodolists) => {
    return localStorage.setItem("myTodoLists", JSON.stringify(localTodolists));
};
let localTodolists = getTodolistlocal() || [];


const addTodoDaynamicElem = (curElem) => {
    const divElem = document.createElement("div");
    divElem.classList.add("main-todo-div");
    divElem.innerHTML = `<li>${curElem}</li><button class="deleteBtn">Delete</button>`;
    mainTodoElem.append(divElem);
};

const addTodoList = (e) => {
    e.preventDefault();
    const todiListValue = inputValue.value.trim();

    inputValue.value = " ";
    if (todiListValue != "" && !localTodolists.includes(todiListValue)) {

        localTodolists.push(todiListValue);
        localTodolists = [...new Set(localTodolists)];
        console.log(localTodolists);
        localStorage.setItem('myTodoLists', JSON.stringify(localTodolists));
        // console.log("testing");
        addTodoDaynamicElem(todiListValue);
    }
};


showTodoList = () => {
    console.log(localTodolists);

    localTodolists.forEach((curElem) => {
        addTodoDaynamicElem(curElem);
    })
};

showTodoList();

removeTodoElem = (e) => {
    const todoToRemove = e.target;
    let todoListcontent = todoToRemove.previousElementSibling.innerText;
    console.log(todoListcontent);


    let parentElem = todoToRemove.parentElement;

    localTodolists = localTodolists.filter((currTodo) => {
        return currTodo != todoListcontent.toLowerCase();
    });


    addTodoListLcalStorage(localTodolists);

    parentElem.remove();
    console.log(localTodolists);
};

mainTodoElem.addEventListener('click', (e) => {
    e.preventDefault();
    if (e.target.classList.contains("deleteBtn")) {
        removeTodoElem(e);
    }
});


document.querySelector(".btn").addEventListener("click", (e) => {
    addTodoList(e);
});
