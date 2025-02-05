const inputSlider = document.querySelector("[data-lenghtSlider]");
const lengthDisplay = document.querySelector("[data-length]");
const allCheckBox = document.querySelectorAll("input[type='checkbox']");
const passwordDisplay = document.querySelector(".data-display");
const copyMsg = document.querySelector("[data-copyMsg]");
const indicator = document.querySelector("[data-indicator]");
const generateBtn = document.querySelector("[data-generate]");
const upperCase = document.querySelector("#uppercase");
const lowerCase = document.querySelector("#lowercase");
const number = document.querySelector("#number");
const symbol = document.querySelector("#symbol");
const copyBtn = document.querySelector(".copy-btn");
const symbols = "!@#$%^&*(){}[]=<>/,.|~?";


let password = "";
let passwordLength = 10;
let checkbox = 1;
handleSlider();


function handleSlider() {
	inputSlider.value = passwordLength;
	lengthDisplay.innerText = passwordLength;
}
function setIndicator(color) {
	indicator.style.backgroundColor = color;
	indicator.style.boxShadow = `0px 0px 12px 1px ${color}`;
}
function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min) + min);
}
function generateRandomNumber() {
	return getRandomInt(0, 9);
}
function generateLowercase() {
	return String.fromCharCode(getRandomInt(97, 123));
}
function generateUpperCase() {
	return String.fromCharCode(getRandomInt(65, 91));
}
function symbolGenerator() {
	return symbols[getRandomInt(0, symbols.length)];
}
function calcStrength() {
	let hasUpper = false;
	let hasLower = false;
	let hasNumber = false;
	let hasSymbol = false;
	if (upperCase.checked) hasUpper = true;
	if (lowerCase.checked) hasLower = true;
	if (number.checked) hasNumber = true;
	if (symbol.checked) hasSymbol = true;
	if (hasUpper && hasLower && (hasNumber || hasSymbol) && passwordLength >= 8) {
		setIndicator("green");
	} else if ((hasUpper || hasLower) && (hasNumber || hasSymbol) && passwordLength >= 6) {
		setIndicator("orange");
	} else {
		setIndicator("red");
	}
}
async function copyContent() {
	let text = passwordDisplay.value;
	try {
		await navigator.clipboard.writeText(passwordDisplay.value);
		copyMsg.innerText = "Copied";
	}
	catch (e) {
		copyMsg.innerText = "Failed";
	}
	copyMsg.classList.add("active");
	setTimeout(() => {
		copyMsg.classList.remove("active");
	}, 2000);
}
inputSlider.addEventListener("input", (e) => {
	passwordLength = e.target.value;
	handleSlider();
});
copyBtn.addEventListener("click", () => {
	if (passwordDisplay.placeholder) {
		copyContent();
	}
});
function shufflePassword(array) {
	// Fisher yates algorithm can be applied on the array
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
	let str = "";
	array.forEach((x) => (str += x));
	return str;
}
function handleCheckBoxChange() {
	checkBox = 0;
	allCheckBox.forEach((checkbox) => {
		if (checkbox.checked) {
			checkBox++;
		}
	});
	if (passwordLength < checkBox) {
		passwordLength = checkBox;
	}
	handleSlider();
}
allCheckBox.forEach((checkbox) => {
	checkbox.addEventListener('change', handleCheckBoxChange);
})
generateBtn.addEventListener('click', () => {
	if (checkBox <= 0) return;
	if (passwordLength < checkBox) {
		passwordLength = checkBox;
	}
	password = "";
	let funArr = [];
	if (upperCase.checked) {
		funArr.push(generateUpperCase);
	}
	if (lowerCase.checked) {
		funArr.push(generateLowercase);
	}
	if (number.checked) {
		funArr.push(generateRandomNumber);
	}
	if (symbol.checked) {
		funArr.push(symbolGenerator);
	}
	for (let i = 0; i < funArr.length; i++) {
		password += funArr[i]();
	}
	for (let i = 0; i < passwordLength - funArr.length; i++) {
		let rand = funArr[getRandomInt(0, funArr.length)];
		password += rand();
	}
	// shuffle the password
	password = shufflePassword(Array.from(password));
	passwordDisplay.value = password;
	calcStrength();
});