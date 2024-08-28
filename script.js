const todoAddForm = document.querySelector("#todoAddForm")
const todoInput = document.querySelector("#todoName")
const listgrop = document.querySelector(".list-group")
const totalItems = document.getElementById("totalScore")
const searchItem = document.getElementById("todoSearch") 


todoAddForm.addEventListener("submit", addtodo)
searchItem.addEventListener("input", filteritem)



function addtodo(e) {
    e.preventDefault()
    let data = JSON.parse(localStorage.getItem("todo")) || []

    if (!todoInput.value.trim()) {
        console.log("Zehmet olmasa deyer daxil edin");
    } else {
        data.push(todoInput.value)
        
    }

 
    localStorage.setItem("todo", JSON.stringify(data))
    todoInput.value = ""

    toVisiable()
}

// connect todo list items with data(local) 

function toVisiable() {
    listgrop.innerHTML = ""
    let todo = JSON.parse(localStorage.getItem("todo")) || []

    totalItems.textContent = `${todo.length}`;

    if (todo != []) {
        todo.forEach((item, index) => {
            listgrop.innerHTML += `
            <li class="list-group-item d-flex justify-content-between" data-index="${index}">${item}
            <div class="d-flex  align-items-center">
                <a href="#" onclick = "(getModal('${item}',${index}))" class="edit-item mx-2">
                        <i class="fa fa-pencil"></i>
                </a>
               <a href="#" onclick="removeItem(${index})" class="delete-item mx-3">
                 <i class="fa fa-remove"></i>
               </a>
               <a href="#" onclick="changeBck(${index})" class="complete-item mx-2">
                        <i class="fa-solid fa-circle-check"></i>
                    </a>
                </div>
             </li>
           `
        });

    }
}

// Save todo list after refresh the page 

function saveAllData() {
    const localstorage = JSON.parse(localStorage.getItem("todo"))
    if (!localstorage) return
    data = localstorage
    toVisiable()
}
saveAllData()


const clearData = document.getElementById("todoClearButton")

//Clear All data

clearData.addEventListener("click", () => {
    data = []
    localStorage.setItem("todo", JSON.stringify(data))
    toVisiable()
})

/////////////////////////////////////////////////////////////////////Clear All data Yoll 2 //////////////////////////
// document.getElementById("todoClearButton").addEventListener("click", allremoveData)
// function allremoveData() {
//     localStorage.removeItem("todo")
//     toVisiable()
// }
//////////////////////////////////////////////////////////////////////////////////////////////////////////

//delete selected li 

function removeItem(index) {
    let todo = JSON.parse(localStorage.getItem("todo")) || [];
    todo.splice(index, 1)
    localStorage.setItem("todo", JSON.stringify(todo))
    toVisiable()
}
////////////////////////////////////////////////

//Edit modal

let modal = document.getElementById("modal-special")

function getModal(item, index) {
    // console.log(item);

    modal.innerHTML = ""
    modal.innerHTML = `
    <i id="editClose" onclick = "closeFunc()" class="fa-solid fa-x"></i>
    <input  id="NewValue" value="${item}" type="text">
    <button onclick="updatefunction('${index}')"> Save</button>
    `
    modal.style.display = "flex"
}
function closeFunc() {
    modal.style.display = "none"
}

function updatefunction(index) {

    let inputNewValue = document.getElementById("NewValue").value
    let todo = JSON.parse(localStorage.getItem("todo")) || []

    if (!inputNewValue.trim()) {
        alert("Data daxil edin")
    } else {
        todo[index] = inputNewValue
    }

    localStorage.setItem("todo", JSON.stringify(todo))

    toVisiable()
    closeFunc()

}
///////////////////////////////////////////////////////////////////////


//background Change selected li



let count = 0


let selectedScore = document.getElementById("selecScore")

function changeBck(index) {
    let listItems = document.querySelectorAll(".list-group-item")
      
    listItems.forEach((item, index1) => {

        if (index === index1) {
           
            item.style.textDecoration = "line-through"
            item.style.backgroundColor = "lightgreen"
            count++       
           
        }

    })

    selectedScore.innerHTML =  `<b>/${count}</b>`
}

/////////////////////////////////////////

function filteritem(){
    let inputValue = searchItem.value.toLowerCase()
    
    let todo = JSON.parse(localStorage.getItem("todo"))

    // listgrop
   let result =  todo.filter((item1)=>item1.toLowerCase().includes(inputValue))
   
    listgrop.innerHTML = ""

    result.map((item, index)=>{
        listgrop.innerHTML += `
         <li class="list-group-item d-flex justify-content-between" data-index="${index}">${item}
            <div class="d-flex  align-items-center">
                <a href="#" onclick = "(getModal('${item}',${index}))" class="edit-item mx-2">
                        <i class="fa fa-pencil"></i>
                </a>
               <a href="#" onclick="removeItem(${index})" class="delete-item mx-3">
                 <i class="fa fa-remove"></i>
               </a>
               <a href="#" onclick="changeBck(${index})" class="complete-item mx-2">
                        <i class="fa-solid fa-circle-check"></i>
                    </a>
                </div>
             </li>
           
        `
    })
   
   
}














