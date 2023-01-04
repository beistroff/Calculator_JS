const numberButtons = document.querySelectorAll(".number-btn")
const operationButtons = document.querySelectorAll(".operation-btn")
const equalButton = document.querySelector(".equal-btn")
const deleteButton = document.querySelector(".delete-btn")
const clearButton = document.querySelector(".clear-all-btn")
const previousNumberContent = document.querySelector(".previous-element")
const currentNumberContent = document.querySelector(".current-element")

class Calculator {
    constructor(currentNumberContent, previousNumberContent) {
        this.currentNumberContent = currentNumberContent
        this.previousNumberContent = previousNumberContent
        this.clear()
    }

    clear() {
        this.currentNumber = ''
        this.previousNumber = ''
        this.operation = undefined
    }

    delete (){
        this.currentNumber = this.currentNumber.toString().slice(0, -1)
    }

    appendNumber(number){
        if (number === '.' && this.currentNumber.includes('.')) return
        this.currentNumber = this.currentNumber.toString() + number.toString()
    }

    updateContent(){
        this.currentNumberContent.innerText = this.currentNumber
        if (this.operation != null){
            this.previousNumberContent.innerText =
                `${this.previousNumber} ${this.operation}`
        } else {
            this.previousNumberContent.innerText = ''
        }
    }

    chooseOperation(operation){
        if (this.currentNumber === '') return
        if (this.currentNumber !== ''){
            this.compute()
        }
        this.operation = operation
        this.previousNumber = this.currentNumber
        this.currentNumber = ''
    }

    compute() {
        let computation
        const previous = parseFloat(this.previousNumber)
        const current = parseFloat(this.currentNumber)
        if (isNaN(previous) || isNaN(current)) return
        switch(this.operation){
            case '+':
                computation = previous + current
                break
            case '-':
                computation = previous - current
                break
            case '*':
                computation = previous * current
                break
            case '/':
                computation = previous / current
                break
            case '%':
                computation = previous % current
                break
            default:
                return
        }
        this.currentNumber = computation
        this.operation = undefined
        this.previousNumber = ''
    }
}

const calc = new Calculator(currentNumberContent, previousNumberContent)

numberButtons.forEach(button =>{
    button.addEventListener('click', () =>{
        calc.appendNumber(button.innerText)
        calc.updateContent()
    })
})

operationButtons.forEach(button =>{
    button.addEventListener('click', ()=>{
        calc.chooseOperation(button.innerText)
        calc.updateContent()
    })
})

deleteButton.addEventListener('click', () =>{
    calc.delete()
    calc.updateContent()
})

equalButton.addEventListener('click', () => {
    calc.compute()
    calc.updateContent()
})

clearButton.addEventListener('click', () => {
    calc.clear()
    calc.updateContent()
})
