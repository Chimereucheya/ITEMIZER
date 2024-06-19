
 import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js'

import { getDatabase ,ref,onValue,push, remove} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js"

const appSettings ={
  databaseURL: 'https://playground-a61b0-default-rtdb.firebaseio.com/'
}

const inputField= document.getElementById('input-field')
const addButton = document.getElementById('add-button')
const shoppingList= document.getElementById('shopping-list')

addButton.addEventListener("click", function(){
  let input= inputField.value
    if (input) {
     inputField1()
   push(cart, input)
    }
}) 

const app= initializeApp(appSettings)

const database = getDatabase(app)

const cart = ref(database,'Groceries1')
onValue(cart, function(snapshot){
      // Challenge: Use Object.values() to convert snapshot.val() from an Object to an Array. Create a variable for this.
  if (snapshot.exists()) {
    let itemsArray = Object.entries(snapshot.val())

   clearField()
   console.log(snapshot.val())
    for(let i=0; i<itemsArray.length; i++) {

      let items1 =itemsArray[i];
      render(items1)
    } 
  } else {
    shoppingList.innerHTML ='No items Currenly. Add an item'
  }
      
})


function inputField1() {
  inputField.value=''
}
function clearField() {
  shoppingList.innerHTML =""
}
function render(item){
    /* shoppingList.innerHTML +=`<li> ${inputValue} </li>`*/  
  let itemID = item[0]
  let itemValue = item[1]

    let newList= document.createElement('li')
    newList.textContent= itemValue
    shoppingList.append(newList)

    newList.addEventListener("click", function () {
      console.log(itemID)

     let  exactLocationCart = ref(database,`Groceries1/${itemID}` )
     remove(exactLocationCart)
    })
}


