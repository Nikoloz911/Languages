document.addEventListener("DOMContentLoaded", function () {
    let inputDisplay = document.getElementById("calc-input") as HTMLInputElement;
    let resultDisplay = document.getElementById("calc-result") as HTMLSpanElement;
    let buttons = document.querySelectorAll("button");
    let expression: string = "";
    let isResultDisplayed: boolean = false;
    function updateDisplay(): void {
        inputDisplay.value = expression;
    }
    function evaluateExpression(): void {
        try {
            resultDisplay.textContent = "= " + eval(expression);
            isResultDisplayed = true;
        } catch {
            resultDisplay.textContent = "Error";
        }
    }
    function isOperator(char: string): boolean {
        return ["+", "-", "*", "/", "%"].includes(char);
    }
    buttons.forEach(button => {
        button.addEventListener("click", function () {
            let value = this.getAttribute("data-value");
            if (!value) return;

            if (value === "C") {
                expression = "";
                resultDisplay.textContent = "";
            } else if (value === "CE") {
                expression = expression.slice(0, -1);
            } else if (value === "=") {
                evaluateExpression();
            } else {
                if (isResultDisplayed && !isOperator(value)) {
                    expression = "";
                    isResultDisplayed = false;
                }
                let lastChar = expression.slice(-1);
                if (!isOperator(lastChar) || !isOperator(value)) {
                    expression += value;
                }
            }
            updateDisplay();
        });
    });
    document.addEventListener("keydown", function (event: KeyboardEvent) {
        const key = event.key;
        if (!isNaN(Number(key)) || ["+", "-", "*", "/", "%", "."].includes(key)) {
            buttons.forEach(button => {
                if (button.getAttribute("data-value") === key) {
                    button.click();
                }
            });
        } else if (key === "Enter") {
            document.querySelector<HTMLButtonElement>(".equal")?.click();
        } else if (key === "Backspace") {
            document.querySelector<HTMLButtonElement>("button[data-value='CE']")?.click();
        } else if (key === "Escape") {
            document.querySelector<HTMLButtonElement>("button[data-value='C']")?.click();
        }
    });
});
