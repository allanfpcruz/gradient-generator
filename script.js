const colorA = document.querySelector('#color-a')
const colorB = document.querySelector('#color-b')
const rangeA = document.querySelector('#range-a')
const rangeB = document.querySelector('#range-b')
const addButton = document.querySelector('#add-color')
const inputArea = document.querySelector('.input-area')
const inputContaineres = document.querySelectorAll('.input-container')
const buttons = document.querySelectorAll('.buttons button')
const submit = document.querySelector('#submit')
const output = document.querySelector('#code')
const copy = document.querySelector('#copy')
let currentDirection = 'to bottom'

//funções
function generateGradient() {
    let backgroundCode = `linear-gradient(${currentDirection}, ${colorA.value} ${rangeA.value}%, ${colorB.value} ${rangeB.value}%)`
    document.getElementsByTagName('BODY')[0].style.backgroundImage = backgroundCode

    output.value = `background-image: ${backgroundCode};`
}

function setDirection(selected) {
    //remover o active
    buttons.forEach(button => {
        button.classList.remove('active')
    });
    //ativar o active
    selected.classList.add('active')

    currentDirection = selected.value
}

function addColor() {
    const inputContainer = document.createElement('div') 
    inputContainer.setAttribute('class', 'input-container')
    const color = document.createElement('input')
    color.setAttribute('type', 'color')
    const range = document.createElement('input')
    range.setAttribute('type', 'range')
    inputArea.appendChild(inputContainer)
    inputContainer.appendChild(color)
    inputContainer.appendChild(range)
}

function copyCode() {
    output.select()
    document.execCommand('copy')
    alert('Copied')
}

//eventos
submit.addEventListener('click', (e) => {
    generateGradient()
})

buttons.forEach(button => {
    button.addEventListener('click', (e) => {
        setDirection(button)
    })
});

addButton.addEventListener('click', (e) => {
    addColor()
})

copy.addEventListener('click', (e) => {
    copyCode()
})
