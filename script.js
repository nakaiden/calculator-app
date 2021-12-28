class Calculator {
    constructor(previousDatatypeTextElement, currentDatatypeTextElement) {
        this.previousDatatypeTextElement = previousDatatypeTextElement
        this.currentDatatypeTextElement = currentDatatypeTextElement
        this.clear()
    }
    
    clear() {
        this.currentDatatype = ''
        this.previousDatatype = ''
        this.operation = undefined
    }

    delete() {
        this.currentDatatype = this.currentDatatype.toString().slice(0, -1)
    }

    appendNumber(number) {
        if (number === '.' && this.currentDatatype.includes('.')) return
        this.currentDatatype = this.currentDatatype.toString() + number.toString()
    }

    chooseOperation(operation) {
        if (this.currentDatatype === '') return
        if (this.previousDatatype !== '') {
            this.compute()
        }
        this.operation = operation
        this.previousDatatype = this.currentDatatype
        this.currentDatatype = ''   
    }


    compute() {
        let computation
        const prev = parseFloat(this.previousDatatype)
        const current = parseFloat(this.currentDatatype)
        if (isNaN(prev) || isNaN(current)) return
        switch (this.operation) {
            case '+':
                computation = prev + current
                break
            case '-':
                computation = prev - current
                break
            case '*':
                computation = prev * current
                break
            case '÷':
                computation = prev / current
                break
            default:
                return
        }
        this.currentDatatype = computation
        this.operation = undefined
        this.previousDatatype = ''
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString()
        const intergerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let intergerDisplay
        if(isNaN(intergerDigits)) {
            intergerDisplay = ''
        } else {
            intergerDisplay = intergerDigits.toLocaleString('en', {maximumFractionDigits: 0})
        }
        if(decimalDigits != null) {
            return `${intergerDisplay}.${decimalDigits}`
        } else {
          return intergerDisplay  
        }
    }

    updateDisplay() {
        this.currentDatatypeTextElement.innerText = this.getDisplayNumber (this.currentDatatype)
        if (this.operation != null) {
            this.previousDatatypeTextElement.innerText = `${this.getDisplayNumber(this.previousDatatype)} ${this.operation}`       
        } else {
            this.previousDatatypeTextElement.innerText = ''
        }
    }
}


const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousDatatypeTextElement = document.querySelector('[data-previous-datatype]')
const currentDatatypeTextElement = document.querySelector('[data-current-datatype]')

const calculator = new Calculator(previousDatatypeTextElement, currentDatatypeTextElement)

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()

})

allClearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()

})

deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()

})