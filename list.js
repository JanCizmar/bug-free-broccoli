const LOCAL_STORAGE_NAME = "my-cool-app-items"

function add() {
    const value = getInputValue()
    if (value) {
        appendToList(value)
        clearInput()
    }
}

function getItems() {
    const itemsJson = localStorage.getItem(LOCAL_STORAGE_NAME)
    try {
        return JSON.parse(itemsJson) || []
    } catch (_) {
        return []
    }
}

function storeItems(items) {
    localStorage.setItem(LOCAL_STORAGE_NAME, JSON.stringify(items))
    refresh()
}

function appendToList(value) {
    const items = getItems()
    items.push(value)
    storeItems(items)
}

function removeItem(idx) {
    const items = getItems()
    items.splice(idx, 1)
    storeItems(items)
}

function getListElement() {
    return document.getElementById("list")
}

function getInputValue() {
    return document.getElementsByTagName("input").item(0).value
}

function clearInput() {
    return document.getElementsByTagName("input").item(0).value = ""
}

function refresh() {
    const listElement = getListElement()
    listElement.innerHTML = ""

    const items = getItems()

    items.forEach((item, idx) => {
        listElement.appendChild(createListItem(item, idx))
    });

    setCounter()
}

function setCounter() {
    const count = getItems().length

    tg.translate({
        key: "counter_text",
        defaultValue: `There are {count} items.`,
        params: { count }
    }).then((translated) => {
        document.getElementById("counter").innerText = translated
    })
}

function createListItem(itemValue, idx) {
    const liElement = document.createElement("li")
    liElement.appendChild(createListItemTextDiv(itemValue))
    liElement.appendChild(createListItemDeleteButton(idx))
    return liElement
}

function createListItemTextDiv(itemValue) {
    const textDiv = document.createElement("div")
    textDiv.className = "list__text"
    textDiv.innerText = itemValue
    return textDiv
}

function createListItemDeleteButton(idx) {
    const deleteButton = document.createElement("button")
    tg.translate({ key: "delete_button", defaultValue: "Delete" }).then((translated) => {
        deleteButton.innerText = translated
    })
    deleteButton.onclick = () => removeItem(idx)
    return deleteButton
}

function clearList() {
    storeItems([])
}

window.onload = () => {
    refresh()
}