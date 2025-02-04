"use strict";
document.addEventListener("DOMContentLoaded", function () {
    let inputDisplay = document.getElementById("calc-input");
    let resultDisplay = document.getElementById("calc-result");
    let buttons = document.querySelectorAll("button");
    let expression = "";
    let isResultDisplayed = false;
    function updateDisplay() {
        inputDisplay.value = expression;
    }
    function evaluateExpression() {
        try {
            resultDisplay.textContent = "= " + eval(expression);
            isResultDisplayed = true;
        } catch {
            resultDisplay.textContent = "Error";
        }
    }
    function isOperator(char) {
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
    document.addEventListener("keydown", function (event) {
        const key = event.key;
        if (!isNaN(Number(key)) || ["+", "-", "*", "/", "%", "."].includes(key)) {
            buttons.forEach(button => {
                if (button.getAttribute("data-value") === key) {
                    button.click();
                }
            });
        } else if (key === "Enter") {
            document.querySelector(".equal")?.click();
        } else if (key === "Backspace") {
            document.querySelector("button[data-value='CE']")?.click();
        } else if (key === "Escape") {
            document.querySelector("button[data-value='C']")?.click();
        }
    });
});
