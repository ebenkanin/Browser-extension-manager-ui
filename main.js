// grabbing DOM items

const cardContainer = document.querySelector('.cards-container');

const template = document.getElementById('card-template');

const navBtns = document.querySelectorAll('.btn')

const filterActive = document.getElementById('filter-Active')

const showAll = document.getElementById('show-all')

const filterInactive = document.getElementById('filter-inactive')

const filter = document.querySelectorAll('[data-filter]')

let currentFilter = 'all'





//


//on page load, it retrieves data from the json file, stores it in the local storage and render

window.addEventListener('DOMContentLoaded', innit)




function sendDataToLocalStorage(item){
    let dataFromLocalStorage;

    if(localStorage.getItem('items')===null){

        dataFromLocalStorage = []

    } else{
        dataFromLocalStorage= JSON.parse(localStorage.getItem('items'))
    }

    if(!item.id){

        item.id = crypto.randomUUID()

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

        return dataFromLocalStorage;

    }}
       



        

// starter function.
function innit(){
    if(localStorage.getItem('items') !== null && JSON.parse(localStorage.getItem('items')).length >0){
        retrieveDataFromLocalStorage()
        render()
    }else{

        //initialize new https request

        const xhr = new XMLHttpRequest();

        xhr.open('GET', './data.json')

        xhr.onreadystatechange = function(){

    if(this.readyState ===4 && this.status >= 200 && this.status < 400){
        const data = JSON.parse(this.responseText)
        data.forEach(item => {
            sendDataToLocalStorage(item)
            
           
        });

         render()
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



    
    



   


function updateExtensionStatus(checkbox){

    checkbox.addEventListener('change', ()=>{

    data = retrieveDataFromLocalStorage();
    data.forEach((item)=>{
        if(item.id === checkbox.id){
            item.isActive = checkbox.checked;

            
        }

        
    })

    localStorage.setItem('items', JSON.stringify(data))

    render()

} )
}

// remove card
function removeExtension(uniqueId, removeBtn){
removeBtn.addEventListener('click', ()=>{

    data = retrieveDataFromLocalStorage();

    const newData = data.filter((item)=>{
        if(item.id !== uniqueId ){

            return true

        }  else{
            return false
        }
    })

    localStorage.setItem('items', JSON.stringify(newData))

    render()


})

    
 
}


function render(){

    const dataFromLocalStorage = retrieveDataFromLocalStorage();

    cardContainer.innerHTML = "";


    

    if(currentFilter === 'active'){ 

        const activeData = dataFromLocalStorage.filter((item)=>{

            return item.isActive
            
        })


        activeData.forEach((item)=>{


            
        const templateClone = template.content.cloneNode(true);

        const card = templateClone.querySelector('.item-card')
        
        card.dataset.id = item.id

        const logo = templateClone.querySelector('.logo') 

        logo.src = item.logo

        templateClone.querySelector('h2').textContent = item.name;

        templateClone.querySelector('p').textContent = item.description;

        const checkbox = templateClone.querySelector('input[type ="checkbox"]');

        checkbox.checked = item.isActive

        const uniqueId = item.id

        const label = templateClone.querySelector('label');

        checkbox.id = uniqueId;

        label.setAttribute('for', uniqueId)

        const removeBtn = templateClone.querySelector('button')


        updateExtensionStatus( checkbox);

        removeExtension(uniqueId, removeBtn)


        cardContainer.appendChild(templateClone);

            

            

        })

    } else if( currentFilter === 'inactive'){

        const inActiveData = dataFromLocalStorage.filter((item)=>{
            return !item.isActive;
        })

        inActiveData.forEach((item)=>{


        const templateClone = template.content.cloneNode(true);   
            
        const card = templateClone.querySelector('.item-card')
        
        card.dataset.id = item.id

        const logo = templateClone.querySelector('.logo') 

        logo.src = item.logo

        templateClone.querySelector('h2').textContent = item.name;

        templateClone.querySelector('p').textContent = item.description;

        const checkbox = templateClone.querySelector('input[type ="checkbox"]');

        checkbox.checked = item.isActive

        const uniqueId = item.id

        const label = templateClone.querySelector('label');

        checkbox.id = uniqueId;

        label.setAttribute('for', uniqueId)

        const removeBtn = templateClone.querySelector('button')


        updateExtensionStatus( checkbox);

        removeExtension(uniqueId, removeBtn)


        cardContainer.appendChild(templateClone);



        })
    } else{

        


        dataFromLocalStorage.forEach((item)=>{

        const templateClone = template.content.cloneNode(true);

        const card = templateClone.querySelector('.item-card')
        
        card.dataset.id = item.id

       const logo = templateClone.querySelector('.logo') 

        logo.src = item.logo

        templateClone.querySelector('h2').textContent = item.name;

        templateClone.querySelector('p').textContent = item.description;

        const checkbox = templateClone.querySelector('input[type ="checkbox"]');

        checkbox.checked = item.isActive

        const uniqueId = item.id

        const label = templateClone.querySelector('label');

        checkbox.id = uniqueId;

        label.setAttribute('for', uniqueId)

        const removeBtn = templateClone.querySelector('button')


        updateExtensionStatus( checkbox);

        removeExtension(uniqueId, removeBtn)


        cardContainer.appendChild(templateClone);




})

    }



    

}

filterInactive.addEventListener('click', ()=>{
     currentFilter = 'inactive';

    render()
} )

filterActive.addEventListener('click', ()=>{
     currentFilter = 'active';

    render()})



showAll.addEventListener('click', ()=>{
    currentFilter = 'all'
    render()
})
