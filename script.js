const colorA = document.querySelector('#color-a')
const colorB = document.querySelector('#color-b')
const rangeA = document.querySelector('#range-a')
const rangeB = document.querySelector('#range-b')
const addButton = document.querySelector('#add-color')
const inputArea = document.querySelector('.input-area')
const buttons = document.querySelectorAll('.buttons button')
const submit = document.querySelector('#submit')
const output = document.querySelector('#code')
const copy = document.querySelector('#copy')
let currentDirection = 'to bottom'
let geralData = []

//funções

//aplica o código de gradiente no background e no textarea
function generateGradient() {
    let code = getDatas()
    console.log(code)

    document.getElementsByTagName('BODY')[0].style.backgroundImage = code

    output.value = `background-image: ${code};`
}

class Data {
    constructor(color, range) {
        this.color = color
        this.range = range
    }
}

//gera os dados de cor e porcentagem em uma classe para cada campo, cada campo está na array
function getDatas() {
    let i = 0
    document.querySelectorAll('.input-container').forEach(inputContainer => {
        let color = ''
        let range = ''
        const inputContainerList = inputContainer.querySelectorAll('input')
        inputContainerList.forEach(input => {
            if (input.value.length > 3) {
                color = input.value
            } else {
                range = input.value
            }
        });
        let data = new Data(color, range)
        geralData[i] = data
        i++
    });
    console.log(geralData)

    var code = createCode()

    return(code)
}

//organiza o código, pronto para aplicação
function createCode() {
    let partCode = ''
    geralData.forEach(Data => {
        partCode += `${Data.color} ${Data.range}%, `
    });
    partCode = partCode.slice(0, partCode.lastIndexOf(','))
    let code = `linear-gradient(${currentDirection}, ${partCode})`

    return(code)
}

//define a direção
function setDirection(selected) {
    //remover o active
    buttons.forEach(button => {
        button.classList.remove('active')
    });
    //ativar o active
    selected.classList.add('active')

    currentDirection = selected.value
}

//adiciona mais campos
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

//copia o código
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