import * as converter from "units-converter";

const selectUnitDOM = document.getElementById("unit");
const firstInputDOM = document.getElementById("first-input");
const secondInputDOM = document.getElementById("second-input");
const firstUnitDOM = document.getElementById("first-unit");
const secondUnitDOM = document.getElementById("second-unit");

let currentUnit = "length",
	firstUnit,
	secondUnit;
const unitArray = [
	"length",
	"mass",
	"area",
	"temperature",
	"volume",
	"speed",
	"time",
	"frequency",
	"voltage",
	"force",
	"pressure",
];

for (const item of unitArray)
	selectUnitDOM.innerHTML += `<option value="${item}" 
	${currentUnit == item ? "selected" : ""}>${item}</option>`;

selectUnitDOM.addEventListener("change", (event) => {
	firstUnitDOM.innerHTML = "";
	secondUnitDOM.innerHTML = "";

	renderSelectUnit(event.target.value);
});

firstInputDOM.addEventListener("input", (event) => {
	changeInputValue(true, event.target.value);
});

secondInputDOM.addEventListener("input", (event) => {
	changeInputValue(false, event.target.value);
});

firstUnitDOM.addEventListener("change", (event) => {
	changeUnitType(true, event.target.value);
	changeInputValue(true, firstInputDOM.value);
});

secondUnitDOM.addEventListener("change", (event) => {
	changeUnitType(false, event.target.value);
	changeInputValue(false, secondInputDOM.value);
});

// functions
function renderSelectUnit(unit) {
	currentUnit = unit;

	firstUnit = getCurrentUnitArray()[0];
	secondUnit = getCurrentUnitArray()[1];

	for (const item of converter[unit]().list()) {
		firstUnitDOM.innerHTML += `<option value="${item.plural}" 
		${firstUnit.plural === item.plural ? "selected" : ""}>
		${item.plural} (${item.unit})</option>`;

		secondUnitDOM.innerHTML += `<option value="${item.plural}" 
		${secondUnit.plural === item.plural ? "selected" : ""}>
		${item.plural} (${item.unit})</option>`;
	}

	changeInputValue(true, (firstInputDOM.value = 1));
}

function changeInputValue(isFirstChange, inputVal) {
	if (inputVal === NaN) return;
	inputVal = parseFloat(inputVal);

	if (firstUnit === secondUnit) firstInputDOM.value = secondInputDOM.value = inputVal;
	else if (isFirstChange)
		secondInputDOM.value = converter[currentUnit](inputVal)
			.from(firstUnit.unit)
			.to(secondUnit.unit).value;
	else
		firstInputDOM.value = converter[currentUnit](inputVal)
			.from(secondUnit.unit)
			.to(firstUnit.unit).value;

	console.log(`First:${firstInputDOM.value}, Second:${secondInputDOM.value}`);
	console.log(firstUnit, secondUnit);
}

function changeUnitType(isFirstChange, value) {
	const temp = [...getCurrentUnitArray()];

	if (isFirstChange) firstUnit = temp.find((item) => item.plural === value);
	else secondUnit = temp.find((item) => item.plural === value);

	console.log(value, firstUnit);
}

function getCurrentUnitArray() {
	return converter[currentUnit]().list();
}

renderSelectUnit(currentUnit);
console.log(converter["mass"]().possibilities());
