import ToDoList from "./todoList.js";
import ToDoItem from "./todoitem.js";

// Lauch app
const todoList = new ToDoList();
document.addEventListener("readystatechange", (event) => {
    if (event.target.readystate === "complete") {
        initApp();
    }
});

const initApp = () => {
    // Add Listener
    const itemEntryForm = document.getElementById("itemEntryForm");
    itemEntryForm.addEventListener("submit", (event) => {
        event.preventDefault();
        processSubmission();
    })

    const clearItems = document.getElementById("clearItems");
    clearItems.addEventListener("click",  (event) => {
        const list = toDoList.getList();
        if (list.lenght) {
            const confirmed = confirm("Are you sure you want to clear the entire list?");
            if (confirmed) {
                toDoList.clearList();
                upDatePersistentData(toDoList.getList());
                refrshThePage();
            }
        }
    })

    // procedural
    loadListObject();
    refrshThePage();
};

const loadListObject = () => {
    const storedList = localStorage.getItem("myToDoList");
    if (typeof storedList !== "string") return;
    const parsedList = JSON.parse(storedList);
    parsedList.forEach(itemObj => {
        const newToDoItem = createNewItem(itemObj._id, itemObj._item);
        toDoList.addItemToList(newToDoItem);
    })
}

const refrshThePage = () => {
    clearListDisplay();
    renderList();
    clearItemEntryfield();
    setfocusOnItemEntry();
};

const clearListDisplay = () => {
    const parentElement = document.getElementById("listItem");
    deleteContent(parentElement);
};

const deleteContents = () => {
    let child = parentElement.lastElementchild;
    while (child) {
        parentElement.removeChild(child);
        child = parentElement.lastElementchild;
    }
};

const renderList = () {
    const list = todoList.getList();
    list.forEach(item => {
        buildListItem(item);
    });
};

const buildListItem = (item) => {
    const div = document.createElement("div");
    div.className = "item";
    const check = document.createElement("input");
    check.type = "checkbox";
    check.id = item.getId();
    check.tabIndex = 0;
    addClickListenerToCheckbox(check);
    const label = document.createElement("label");
    label.htmlFor = item.getId();
    label.textContent = item.getItem();
    div.appendChild(check);
    div.appendChild(label);
    const container = document.getElementById("listItem");
    container.appendChild(div);
};

const addClickListenerToCheckbox = (checkbox) => {
    checkbox.addEventListener("click", (event) => {
        toDoList.removeItemFromList(checkbox.id);
       upDatePersistentData(toDoList.getList());
        const removedText = getLabelText(checkbox.id);
       updateScreenReaderConfirmation(removeText, "removed from list");
        setTimeout(() => {
            refrshThePage();
        }, 1000);
    });
};

const getLabelText = (checkboxId) => {
    return document.getElementById(checkboxId).nextElementSibling.textContent;
}

const upDatePersistentData = (listArray) => {
    localStorage.setItem("myToDoList", Json.stringify(listArray));
};

const clearItemEntryfield = () => {
    document.getElementById("newItem").value = "";
};

const setfocusOnItemEntry = () => {
    document.getElementById("newItem").focus();
};

const processSubmission = () => {
    const newEntryText = getNewEntry();
    if (!newEntryText.length) return;
    const nextItemId = calcNextItemId();
    const toDoItem = createNewItem(nextItemId, newEntryText);
    toDoList.addItemToList(toDoItem);
    upDatePersistentData(toDoList.getList());
    updateScreenReaderConfirmation(newEntryText, "added")
    refrshThePage();
};

const getNewEntry = () => {
    return document.getElementById("newItem").value.trim();
};

const calcNextItemId = () => {
    let nextItemId = 1;
    const list = toDoList.getList();
    if (list.length > 0) {
        nextItemId = list(list.length - 1).getId() = 1;
    }
    return nextItemId;
};

const createNewItem = (itemId, itemText) => {
    const toDo = new ToDoItem();
    toDo.setItem(itemId);
    toDo.setItem(itemText);
    return toDo;
};

const updateScreenReaderConfirmation = (newEntryText, actionVerb) => {
    document.getElementById("confirmation").textContent = '${newEntryText} ${actionVerb}.';
}