//getting elements
const myForm = document.querySelector("#form");
//output elements
const outputBasalRateKcalDisplay = document.querySelector(
	"#outputBasalRateKcal"
);
const outputBasalRateKJDisplay = document.querySelector("#outputBasalRateKJ");
const ooutputTotalRateKcalDisplay = document.querySelector(
	"#outputTotalRateKcal"
);
const outputTotalRateKJDisplay = document.querySelector("#outputTotalRateKJ");

// setting up form
myForm.addEventListener("submit", (event) => {
	event.preventDefault();

	//getting values
	const age = Number(document.querySelector("#age").value);
	const gender = document.querySelector('input[name="gender"]:checked').value;

	const activity = document
		.querySelector("#activity")
		.querySelector(".selected").dataset.value;

	let height = document.querySelector("#height").value;
	const heightMassUnit = document
		.querySelector("#heightUnit")
		.querySelector(".selected").dataset.value;

	let weight = document.querySelector("#weight").value;
	const weightMassUnit = document
		.querySelector("#weightUnit")
		.querySelector(".selected").dataset.value;

	let basalRate, totalRate, totalRateCalc;

	//check height (m or cm)
	if (heightMassUnit === "m") {
		height = Number(height) * 100;
	} else {
		height = Number(height);
	}

	// check weight (kg or g)
	if (weightMassUnit === "g") {
		weight = Number(weight) / 1000;
	} else {
		weight = Number(weight);
	}
	//check gender
	if (gender === "male") {
		console.log({ weight }, { height }, { age });

		basalRate = 66.47 + 13.7 * weight + 5 * height - 6.8 * age;
	} else if (gender === "female") {
		console.log({ weight }, { height }, { age });

		basalRate = 655.1 + 9.6 * weight + 1.8 * height - 4.7 * age;
	} else {
		alert("Bitte Geschlecht auswählen.");
		return;
	}
	//set PAL-Faktor
	switch (activity) {
		case "sleep":
			totalRateCalc = 0.95;
			break;
		case "lay":
			totalRateCalc = 1.2;
			break;
		case "sit":
			totalRateCalc = 1.5;
			break;
		case "sitPlus":
			totalRateCalc = 1.7;
			break;
		case "stayMost":
			totalRateCalc = 1.9;
			break;
		case "stay":
			totalRateCalc = 2.2;
			break;
		default:
			alert("Try again");
			break;
	}
	//calc totalRate
	totalRate = basalRate * totalRateCalc;

	//outputs BasalRate
	outputBasalRateKcalDisplay.innerHTML = basalRate.toFixed(3).replace(".", ",");
	outputBasalRateKJDisplay.innerHTML = (basalRate * 4.182)
		.toFixed(3)
		.replace(".", ",");

	//output totalRate
	ooutputTotalRateKcalDisplay.innerHTML = totalRate
		.toFixed(3)
		.replace(".", ",");
	outputTotalRateKJDisplay.innerHTML = (totalRate * 4.182)
		.toFixed(3)
		.replace(".", ",");
});

//setting up dropboxs
for (const dropbox of document.querySelectorAll(".activity-wrapper")) {
	dropbox.addEventListener("click", function () {
		this.querySelector(".activity").classList.toggle("open");
	});
}

//setting up dropbox selections
for (const option of document.querySelectorAll(".select-option")) {
	option.addEventListener("click", function () {
		if (!this.classList.contains("selected")) {
			this.parentNode
				.querySelector(".select-option.selected")
				.classList.remove("selected");
			this.classList.add("selected");
			this.closest(".activity").querySelector(
				".select_trigger span"
			).textContent = this.textContent;
		}
	});
}

//add global open class remover to close dropbox
window.addEventListener("click", function (e) {
	for (const select of document.querySelectorAll(".activity")) {
		if (!select.contains(e.target)) {
			select.classList.remove("open");
		}
	}
});
