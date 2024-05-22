
var display = 0;
var firstNum = 0;
var clearDisplay = false;
var currentOp = null;

//Stores all functions needed for calculations. Maps operator to function.
var calculationMethods = {
    "+": (a, b) => a + b, 
    "-": (a, b) => a - b, 
    "*": (a, b) => a * b, 
    "/": (a, b) => a / b, 
}

const displayDiv = document.querySelector(".display");
numberButtons =  document.querySelectorAll(".num");
operatorButtons =  document.querySelectorAll(".operator");
const equalsButton = document.querySelector(".equals");
const clearButton = document.querySelector(".clear");

equalsButton.addEventListener("click", processEquals);
clearButton.addEventListener("click", processClear);

displayDiv.textContent = display;

for (let numBut of numberButtons) {
    numBut.addEventListener("click", process_num_click);
}

for (let operatorBut of operatorButtons) {
    operatorBut.addEventListener("click", process_operator_click);
}

function process_num_click(event) {
    numberEntered = Number(event.target.textContent);

    if (clearDisplay) {
        display = numberEntered;
        clearDisplay = false;
    } else {
        display = display*10 + numberEntered;
    }

    displayDiv.textContent = display;

}

function process_operator_click(event) {

    opPressed = event.target.textContent;

    if (currentOp == null) {  
        firstNum = display;

    } else { //resolve any unfinished calcs
        if (currentOp == "/" && display == 0) {
            alert("*Universe Explodes*");
            processClear();
        } else {
            calcf = calculationMethods[currentOp];
            display = calcf(firstNum, display);
            firstNum = display;
            displayDiv.textContent = display;
        }
    }   

    currentOp = opPressed;
    clearDisplay = true;
}

function processEquals(event) {
    process_operator_click(event);
    currentOp = null;
}


function processClear() {
    display = 0;
    firstNum = 0;
    currentOp = null;
    displayDiv.textContent = display;
}


