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
        }
        catch (_a) {
            resultDisplay.textContent = "Error";
        }
    }
    function isOperator(char) {
        return ["+", "-", "*", "/", "%"].includes(char);
    }
    buttons.forEach(button => {
        button.addEventListener("click", function () {
            let value = this.getAttribute("data-value");
            if (!value)
                return;
            if (value === "C") {
                expression = "";
                resultDisplay.textContent = "";
            }
            else if (value === "CE") {
                expression = expression.slice(0, -1);
            }
            else if (value === "=") {
                evaluateExpression();
            }
            else {
                if (isResultDisplayed && !isOperator(value)) {
                    expression = "";
                    isResultDisplayed = false;
                }
                let lastChar = expression.slice(-1);
                if (isOperator(lastChar) && isOperator(value)) {
                    return;
                }
                expression += value;
            }
            updateDisplay();
        });
    });
    document.addEventListener("keydown", function (event) {
        var _a, _b, _c;
        let key = event.key;
        if (!isNaN(Number(key)) || ["+", "-", "*", "/", "%", "."].includes(key)) {
            buttons.forEach(button => {
                if (button.getAttribute("data-value") === key) {
                    button.click();
                }
            });
        }
        else if (key === "Enter") {
            (_a = document.querySelector(".equal")) === null || _a === void 0 ? void 0 : _a.click();
        }
        else if (key === "Backspace") {
            (_b = document.querySelector("button[data-value='CE']")) === null || _b === void 0 ? void 0 : _b.click();
        }
        else if (key === "Escape") {
            (_c = document.querySelector("button[data-value='C']")) === null || _c === void 0 ? void 0 : _c.click();
        }
    });
});
