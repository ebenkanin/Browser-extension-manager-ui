const cardContainer = document.querySelector('.cards-container');

const template = document.getElementById('card-template');

const navBtns = document.querySelectorAll('.btn')

//


//on page load, it retrieve data from the json file, store it in the local storage and render

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

             const uniqueId = `toggle-${index}`;

            checkbox.id = uniqueId;
            label.setAttribute('for', uniqueId);
            checkbox.checked = item.isActive;

            //  append clone to container. 

             cardContainer.appendChild(templateClone)


        })

    }
}

// starter function.
function innit(){
    if(localStorage.getItem('items') !== null){
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

