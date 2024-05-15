let container = document.querySelector(".container");
let form = document.querySelector("form");
let data =[];
function read(){
    data =(localStorage.getItem("data")) ? JSON.parse(localStorage.getItem("data")) : [];
    container.innerHTML="";
    data.forEach(element =>{
        container.innerHTML +=`<div class="card ${(element.done)? "done" : ""} ">
           <span id="name${element.id}">${element.taskName}</span>
           <input type="text" placeholder="task name" value="" id="updateNameInput${element.id}" class="updateName">
           <button onclick="updateName(${element.id})"  class="updateName btn1" id="updateNameButton${element.id}">save</button>
           <button onclick="updateState(${element.id})"id="updateState${element.id}" class="btn2" >update state</button>
           <button onclick="showUpdateForm(${element.id})"class="btn3">update name</button>
           <button onclick="deleteItem(${element.id})" class="btn4">delete</button>
        </div>`
   })   
}
const create =() =>{
    const input = document.querySelector("#taskName");
    let id = (localStorage.getItem("id")) ?( parseInt(localStorage.getItem("id")) +1 ): 1;
    const task = {id:id , taskName:input.value ,done:false}
    data.push(task);
    localStorage.setItem("data", JSON.stringify(data));
    localStorage.setItem("id",id);
}
 form.addEventListener('submit', (event) =>{
    event.preventDefault();
    create();
    read();
 })
function updateState(id){
   data= data.map(element =>{
    if(element.id == id){
        element.done = !element.done;
    }
        return element
    })
    localStorage.setItem("data", JSON.stringify(data));
  read();
}
function updateName(id){
    const input = document.querySelector(`#updateNameInput${id}`);
    const button = document.querySelector(`#updateNameButton${id}`);
    const name = document.querySelector(`#name${id}`);
    data = data.map(element =>{
        if(element.id == id){
            element.taskName = input.value;
        }
            return element
        })
    localStorage.setItem("data", JSON.stringify(data));
    input.style.display ="none";
    button.style.display ="none";
    name.style.display ="inline";
    read();
}
function showUpdateForm(id){
    const input = document.querySelector(`#updateNameInput${id}`);
    const button = document.querySelector(`#updateNameButton${id}`);
    let name = document.querySelector(`#name${id}`);
    input.style.display ="inline";
    button.style.display ="inline";
    name.style.display ="none";
    const value =data.find(element => {return element.id ==id});
    input.value = value.taskName;
}
function deleteItem(id){
    data = data.filter(element => {return element.id != id});
    localStorage.setItem("data", JSON.stringify(data));
    read();
}
read();
