//* ======================================================
//*                     IOS CALCULATOR
//* ======================================================

//* Number and Operator Buttons
const numberButtons = document.querySelectorAll(".num");
const operationButtons = document.querySelectorAll(".operator");
const equalButton = document.querySelector(".equal");
const acButton = document.querySelector(".ac");
const pmButton = document.querySelector(".pm");
const percentButton = document.querySelector(".percent");
const addButton = document.querySelector(".add");
const subtractButton = document.querySelector(".subtraction");
const multiplyButton = document.querySelector(".multipy");
const divisionButton = document.querySelector(".division");
const decimalButton = document.querySelector(".decimal");

//* Display
const previous = document.querySelector(".previous-display");
const current = document.querySelector(".current-display");

// variables
let valueStrInMemory = null;
let operatorInMemory = null;

// Functions
const getValueAsStr = () => current.textContent.split(",").join("");

const getValueAsNum = () => {
  return parseFloat(getValueAsStr());
};

const setStrAsValue = (valueStr) => {
  if (valueStr[valueStr.length - 1] === ".") {
    current.textContent += ".";
    return;
  }

  const [wholeNumStr, decimalStr] = valueStr.split(".");
  if (decimalStr) {
    current.textContent =
      parseFloat(wholeNumStr).toLocaleString() + "." + decimalStr;
  } else {
    current.textContent = parseFloat(wholeNumStr).toLocaleString();
  }
};

const handleNumberClick = (numStr) => {
  const currentValueStr = getValueAsStr();
  if (currentValueStr === "0") {
    setStrAsValue(numStr);
  } else {
    setStrAsValue(currentValueStr + numStr);
  }
};

const getResultOfOperationAsStr = () => {
  const currentValueNum = getValueAsNum();
  const valueNumInMemory = parseFloat(valueStrInMemory);
  let newValueNum;
  if (operatorInMemory === "add") {
    newValueNum = valueNumInMemory + currentValueNum;
  } else if (operatorInMemory === "subtraction") {
    newValueNum = valueNumInMemory - currentValueNum;
  } else if (operatorInMemory === "multipy") {
    newValueNum = valueNumInMemory * currentValueNum;
  } else if (operatorInMemory === "division") {
    newValueNum = valueNumInMemory / currentValueNum;
  }

  return newValueNum.toString();
};

const handleOperatorClick = (operation) => {
  const currentValueStr = getValueAsStr();

  if (!valueStrInMemory) {
    valueStrInMemory = currentValueStr;
    operatorInMemory = operation;
    setStrAsValue("0");
    return;
  }
  valueStrInMemory = getResultOfOperationAsStr();
  operatorInMemory = operation;
  setStrAsValue("0");
};

// Functions
acButton.addEventListener("click", () => {
  setStrAsValue("0");
  valueStrInMemory = null;
  operatorInMemory = null;
});
pmButton.addEventListener("click", () => {
  const currentValueNum = getValueAsNum();
  const currentValueStr = getValueAsStr();

  if (currentValueStr === "-0") {
    setStrAsValue("0");
    return;
  }
  if (currentValueNum >= 0) {
    setStrAsValue("-" + currentValueStr);
  } else {
    setStrAsValue(currentValueStr.substring(1));
  }
});
percentButton.addEventListener("click", () => {
  const currentValueNum = getValueAsNum();
  const newValueNum = currentValueNum / 100;
  setStrAsValue(newValueNum.toString());
  valueStrInMemory = null;
  operatorInMemory = null;
});

// Operators
addButton.addEventListener("click", () => {
  handleOperatorClick("add");
});
subtractButton.addEventListener("click", () => {
  handleOperatorClick("subtraction");
});
multiplyButton.addEventListener("click", () => {
  handleOperatorClick("multipy");
});
divisionButton.addEventListener("click", () => {
  handleOperatorClick("division");
});
equalButton.addEventListener("click", () => {
  if (valueStrInMemory) {
    setStrAsValue(getResultOfOperationAsStr());
    valueStrInMemory = null;
    operatorInMemory = null;
  }
});

// numbers and decimal
numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    handleNumberClick(button.textContent);
  });
});

decimalButton.addEventListener("click", () => {
  const currentValueStr = getValueAsStr();
  if (!currentValueStr.includes(".")) {
    setStrAsValue(currentValueStr + ".");
  }
});
