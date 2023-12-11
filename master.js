const init = () =>{
    const today = new Date()
    if(afterChristmas(today)){
        activateAll()
    }else{
        activateUpToToday(today)
    }
    
    const popupButton = document.querySelector('#popupButton')
    popupButton.addEventListener('click', closePopup)
}

const activateUpToToday = (today) =>{
    let days = document.querySelectorAll('.day')
    for(let i = 0; i < today.getDate(); i++){
        let buttons = days[i].querySelectorAll('.btn');
        for(let button of buttons){
            let funcName = button.getAttribute('data-func')
            button.addEventListener('click', function (){
                eval(funcName)()
            })
            button.classList.remove('inactive')
        }
    }
}

const activateAll = () =>{
    let buttons = document.querySelectorAll('.btn');

    for(let button of buttons){
        let funcName = button.getAttribute('data-func')
        button.addEventListener('click', function (){
            eval(funcName)()
        })
        button.classList.remove('inactive')
    }
}

const afterChristmas = (today) =>{
    let christmas = new Date(2023, 11, 25)
    if(christmas.getFullYear() < today.getFullYear()) return true
    if(christmas.getMonth() < today.getMonth()) return true
    if(christmas.getDate() < today.getDate()) return true
    return false
}

const displayAnswer = (text) =>{
    let answer = document.querySelector('#answer')
    answer.innerText = text
    openPopup()
}

const openPopup = () =>{
    let backgroundPopup = document.querySelector('#backgroundPopup')
    backgroundPopup.style.height = '100vh'
}

const closePopup = () =>{
    let backgroundPopup = document.querySelector('#backgroundPopup')
    backgroundPopup.style.height = '0vh'
}

window.addEventListener("DOMContentLoaded", init, true)