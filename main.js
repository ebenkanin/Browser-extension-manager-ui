const cardContainer = document.querySelector('.cards-container');

const template = document.getElementById('card-template');

//




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

        dataFromLocalStorage.forEach(item=>{

             const templateClone = template.content.cloneNode(true);

             

             templateClone.querySelector('.logo').src = item.logo;
             templateClone.querySelector('h2').textContent = item.name;
             templateClone.querySelector('p').textContent = item.description;

             cardContainer.appendChild(templateClone)

             console.log(cardContainer)
             console.log(template)

        })

    }
}
function innit(){
    if(localStorage.getItem('items') !== null){
        retrieveDataFromLocalStorage()
    }else{

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

