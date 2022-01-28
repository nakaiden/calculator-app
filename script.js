const output = document.querySelector('.output');
const numberButton = document.querySelectorAll('.number')
const operationButton = document.querySelectorAll('.operator')
const allClearButton = document.querySelector('.all-clear')
const squareRoot = document.querySelector('.button')
const delButton = document.querySelector('.delete')
const equalButton = document.querySelector('.equals')

//event listner for numbers
for(let i = 0; i < numberButton.length; i++){
    numberButton[i].addEventListener('click', () =>{
        output.innerText += numberButton[i].innerText;
    })
}
//event listner for operators
for(let i = 0; i < operationButton.length; i++){
    operationButton[i].addEventListener('click', () =>{
        output.innerText += operationButton[i].innerText;
    })
}

function deleteOnce(){
    output.innerText = output.innerText.slice(0,-1)
}
delButton.addEventListener('click', deleteOnce);

function deleteAll(){
    output.innerText = ''
}
allClearButton.addEventListener('click', deleteAll);

function operations(equate){
    let result = parseFloat(equate[0]);
    for(let i = 0; i < equate.length; i++){
        if(equate[i] === '÷'){
            result = result / parseFloat(equate[i + 1]);
        }else if(equate[i] === 'x'){
            result = result * parseFloat(equate[i + 1]);
        }else if(equate[i] === '+'){
            result = result + parseFloat(equate[i + 1]);
        }else if(equate[i] === '-'){
            result = result - parseFloat(equate[i + 1]);
        }else if(equate[i] === '√'){
            result = Math.sqrt(equate[0]);
        }
    }output.innerText = result
}

function total(){
    let strScreen = output.innerText;
    let arr = [];
    let build = '';
    for(let i = 0; i < strScreen.length; i++){
        if(strScreen[i] === '+'){
            if(build) arr.push(build)
            build = ''
            arr.push('+')
        }else if(strScreen[i] === '-'){
            if(build) arr.push(build)
            build = ''
            arr.push('-')
        }else if(strScreen[i] === '÷'){
            if(build) arr.push(build)
            build = ''
            arr.push('÷')
        }else if(strScreen[i]=== 'x'){
            if(build) arr.push(build)
            build = ''
            arr.push('*')
        }else if(strScreen[i] === '√'){
            if(build) arr.push(build)
            build = ''
            arr.push('√')
        }else{
            build += strScreen[i]
            if(i === strScreen.length -1) arr.push(build)
        }
    }
    operations(arr)
}
equalButton.addEventListener('click', total);