const cardContainer = document.querySelector('.cards-container');

const template = document.getElementById('card-template');

const navBtns = document.querySelectorAll('.btn')

const filterActive = document.getElementById('filter-Active')

const showAll = document.getElementById('show-all')

const filterInactive = document.getElementById('filter-inactive')

let currentFilter = 'All'

filterActive.getAttribute('data-filter')



//


//on page load, it retrieves data from the json file, store it in the local storage and render

window.addEventListener('DOMContentLoaded', innit)




function sendDataToLocalStorage(item){
    let dataFromLocalStorage;

    if(localStorage.getItem('items')===null){

        dataFromLocalStorage = []

    } else{
        dataFromLocalStorage= JSON.parse(localStorage.getItem('items'))
    }

    dataFromLocalStorage.push(item)

    
    
    localStorage.setItem('items',JSON.stringify(dataFromLocalStorage));
}


//Retrieve data from local storage

function retrieveDataFromLocalStorage(){
    let dataFromLocalStorage;
    if(localStorage.getItem('items') === null){
        dataFromLocalStorage =[]
    }else{ 

        dataFromLocalStorage = JSON.parse(localStorage.getItem('items'))

        dataFromLocalStorage.forEach((item, index)=>{

            // clone template.

             const templateClone = template.content.cloneNode(true);

             

             templateClone.querySelector('.logo').src = item.logo;
             templateClone.querySelector('h2').textContent = item.name;
             templateClone.querySelector('p').textContent = item.description;
             const checkbox = templateClone.querySelector('input[type="checkbox"]');
             const label = templateClone.querySelector('label');
             const removeBtn = templateClone.querySelector('button')

             const uniqueId = `toggle-${index}`;

            checkbox.id = uniqueId;
            label.setAttribute('for', uniqueId);
            checkbox.checked = item.isActive;

            // event handler for updating active status of extension
            checkbox.addEventListener('change', ()=>{
                dataFromLocalStorage = JSON.parse(localStorage.getItem("items"))

                dataFromLocalStorage[index].isActive = checkbox.checked

                localStorage.setItem("items", JSON.stringify(dataFromLocalStorage))
            } )

            // function to remove cards
            removeBtn.addEventListener('click', function removeCard(){

                console.removeBtn

                cardContainer.innerHTML="";
                

                dataFromLocalStorage = JSON.parse(localStorage.getItem("items"))
                dataFromLocalStorage.splice(index,1)
                localStorage.setItem("items",JSON.stringify(dataFromLocalStorage))

                retrieveDataFromLocalStorage()

            

            })

            //  append clone to container. 

             cardContainer.appendChild(templateClone)


        })

    }
}

// starter function.
function innit(){
    if(localStorage.getItem('items') !== null && JSON.parse(localStorage.getItem('items')).length >0){
        retrieveDataFromLocalStorage()
    }else{

        //initialize new https request

        const xhr = new XMLHttpRequest();

        xhr.open('GET', './data.json')

        xhr.onreadystatechange = function(){

    if(this.readyState ===4 && this.status >= 200 && this.status < 400){
        const data = JSON.parse(this.responseText)
        data.forEach(item => {
            sendDataToLocalStorage(item)
            retrieveDataFromLocalStorage()
        });
    }

    

}

xhr.send()



    }
}


navBtns.forEach((btn)=>{
    btn.addEventListener('click',()=>{
        displayFocusBtn();

        btn.classList.remove('bg-btn')

        btn.classList.add('bg-bg-toggle');
        
    })

    
})


function displayFocusBtn(){
    navBtns.forEach(btn => { 


       

            btn.classList.remove('bg-bg-toggle')

            btn.classList.add('bg-btn') 
            

        

        
           
            
        }
    )
        
        
    }

//displaying active extensions in the dom

function displayActiveExtensionsOnly(){

    cardContainer.innerHTML =""

    retrieveActiveExtensionsDataFromLocalStorage()
   
}

// Retrieving active extensions data from local storage

 function retrieveActiveExtensionsDataFromLocalStorage(){
    let dataFromLocalStorage;
    if(localStorage.getItem('items') === null){
        dataFromLocalStorage =[]
    }else{ 

        dataFromLocalStorage = JSON.parse(localStorage.getItem('items'))

        dataFromLocalStorage.forEach((item, index)=>{

            if(item.isActive === true){

                 // clone template.

             const templateClone = template.content.cloneNode(true);

             

             templateClone.querySelector('.logo').src = item.logo;
             templateClone.querySelector('h2').textContent = item.name;
             templateClone.querySelector('p').textContent = item.description;
             const checkbox = templateClone.querySelector('input[type="checkbox"]');
             const label = templateClone.querySelector('label');
            

             const uniqueId = `toggle-${index}`;

            checkbox.id = uniqueId;
            label.setAttribute('for', uniqueId);
            checkbox.checked = item.isActive;

             // event handler for updating active status of extension
            checkbox.addEventListener('change', ()=>{
                dataFromLocalStorage = JSON.parse(localStorage.getItem("items"))

                dataFromLocalStorage[index].isActive = checkbox.checked

                localStorage.setItem("items", JSON.stringify(dataFromLocalStorage))
            } )


            //remove card function

            

           

            //  append clone to container. 

             cardContainer.appendChild(templateClone)



            }

           
        })

    }
}


//displaying inactive extensions in the dom

function displayInactiveExtensionsOnly(){

    cardContainer.innerHTML =""

    retrieveInactiveExtensionsDataFromLocalStorage()
   
}



 function retrieveInactiveExtensionsDataFromLocalStorage(){
    let dataFromLocalStorage;
    if(localStorage.getItem('items') === null){
        dataFromLocalStorage =[]
    }else{ 

        dataFromLocalStorage = JSON.parse(localStorage.getItem('items'))

        dataFromLocalStorage.forEach((item, index)=>{

            if(item.isActive === false){

                 // clone template.

             const templateClone = template.content.cloneNode(true);

             

             templateClone.querySelector('.logo').src = item.logo;
             templateClone.querySelector('h2').textContent = item.name;
             templateClone.querySelector('p').textContent = item.description;
             const checkbox = templateClone.querySelector('input[type="checkbox"]');
             const label = templateClone.querySelector('label');

             const uniqueId = `toggle-${index}`;

            checkbox.id = uniqueId;
            label.setAttribute('for', uniqueId);
            checkbox.checked = item.isActive;

            checkbox.addEventListener('change', ()=>{
                dataFromLocalStorage = JSON.parse(localStorage.getItem("items"))

                dataFromLocalStorage[index].isActive = checkbox.checked

                localStorage.setItem("items", JSON.stringify(dataFromLocalStorage))
            } )

            //  append clone to container. 

             cardContainer.appendChild(templateClone)



            }

           
        })

    }
}


function displayAllExtensions(){
    cardContainer.innerHTML=""

    retrieveDataFromLocalStorage()
}




// checkbox.addEventListener("change", () => {
//     const data = JSON.parse(localStorage.getItem("items"))

//     data[index].isActive = checkbox.checked   // true or false

//     localStorage.setItem("items", JSON.stringify(data))
// })



filterActive.addEventListener('click', displayActiveExtensionsOnly)

filterInactive.addEventListener('click', displayInactiveExtensionsOnly)

showAll.addEventListener('click', displayAllExtensions )



