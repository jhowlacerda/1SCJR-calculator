//const display = document.getElementById('display');
const display = document.querySelector('#display');
const keys = document.querySelectorAll("[id*=tecla]");
const operators = document.querySelectorAll("[id*=operador]");

let newNumber = true;
let operator;
let previousNumber;

function updateDisplay(numero) {
    if(newNumber){
        if(previousNumber === "-"){
            display.textContent = previousNumber + numero
            newNumber = false;

        }else{ 
        display.textContent = numero;
        newNumber = false;
    }
    }else{
        display.textContent += numero;
    }
}

const insertNumber = (number) => updateDisplay(number)

keys.forEach(function (key){
    key.addEventListener("click", function (event){
        insertNumber(event.target.textContent)
    })
});



const selectOperator = (event) => {
    previousNumber = display.textContent;
    operator = event.target.textContent;
    newNumber = true;
    if(operator === "-") {
        adicionarSinalNegativo();
    }
}

operators.forEach((key) => key.addEventListener("click", selectOperator));

const calculate = () => {
    const actualNumber = display.textContent;
    const result = eval(previousNumber.replace(",",".") + operator + actualNumber.replace(",","."));
    newNumber = true;
    updateDisplay(result.toString().replace(".",","));
}

const equal = document.querySelector("#igual");

equal.addEventListener('click', calculate);

const clearDisplay = () => display.textContent = "";

document.querySelector("#limparDisplay").addEventListener("click", clearDisplay);

const clearCalc = () => {
    newNumber = true;
    operator = undefined;
    previousNumber = undefined;
    clearDisplay();
};

document.querySelector("#limparCalculo").addEventListener("click", clearCalc);

const removeLastNumber = () => {
    newNumber = true;
    updateDisplay(display.textContent.slice(0, -1));

};


document.querySelector("#apagar").addEventListener("click", removeLastNumber);


const adicionarVirgula = () =>{
    console.log("Value display: " + display.textContent)
    if (!display.textContent) {
        display.textContent = '0,';
      } else if(!display.textContent.includes(',')){
        display.textContent += ',';
      }
}
document.querySelector("#decimal").addEventListener("click", adicionarVirgula);


const invertSignal = () => {
    if (display.textContent) {
        const primeiroCaractere = display.textContent.charAt(0);
        if (primeiroCaractere === '-') {
            display.textContent = display.textContent.substring(1);
        } else {
            display.textContent = '-' + display.textContent;
        }
      }
}

document.querySelector("#inverter").addEventListener("click", invertSignal);

const adicionarSinalNegativo = () => {
    if (display.textContent || display.textContent.endsWith('-')) {
        return; 
      }
      updateDisplay('-');
    }