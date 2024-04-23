// Change marble's color [0, 1 , 2, 3]
let playerID = 0; // Var to change player in JS
const lessons = 6;

const inputLessonDone = []; // Lessons status
const lessonProgress = [];
const isLessonHover = [];
const lessonTrigger = [];

// Create Rive
const riveInstance = new rive.Rive({
	src: "src/floor-1.riv", //get rive file
	canvas: document.getElementById("firstFloor"), //get correct canvas
	autoplay: true,
	stateMachines: "First Floor", // get correct stateMachine
	automaticallyHandleEvents: true, // Automatically handle RiveHTTPEvents
	onLoad: () => {
		// Prevent a blurry canvas by using the device pixel ratio
		riveInstance.resizeDrawingSurfaceToCanvas();

		// Get inputs
		const inputs = riveInstance.stateMachineInputs("First Floor");

		// Change marble's color
		playerSelector = inputs.find((i) => i.name === "playerProfile");
		playerSelector.value = playerID; //initial value

		for (let i = 1; i <= lessons; i++) {
			// Get lesson done status
			// inputLessonDone[0].value = true; [true, false]
			inputLessonDone.push(
				inputs.find((input) => input.name === `isLesson${i}Done`)
			);

			// Get lesson progress
			// lessonProgress[0].value = 20; [0-100]
			lessonProgress.push(
				inputs.find((input) => input.name === `Lesson progress ${i}`)
			);

			// Hover
			isLessonHover.push(
				inputs.find((input) => input.name === `Lesson ${i} Hover`)
			);

			// Triggers
			lessonTrigger.push(
				inputs.find((input) => input.name === `Trigger Lesson ${i}`)
			);
		}

		triggerNextLevel = inputs.find((i) => i.name === "Trigger Next Level");

		inputLessonCounter = inputs.find((i) => i.name === "lessonCounter");
		inputMarbleHover = inputs.find((i) => i.name === "marble hovering");
	},
});

// Resize the drawing surface if the window resizes
window.addEventListener(
	"resize",
	() => {
		riveInstance.resizeDrawingSurfaceToCanvas();
	},
	false
);

// fire movement on click
const eventFire = (riveEvent) => {
	const eventData = riveEvent.data;
	title = "cardbutton";
	if (eventData.name.split(" ")[0] === title) {
		let cardButton = eventData.properties.cardButton;
		if (cardButton === 1) return lessonTrigger[0].fire();
		if (cardButton === 2) return lessonTrigger[1].fire();
		if (cardButton === 3) return lessonTrigger[2].fire();
		if (cardButton === 4) return lessonTrigger[3].fire();
		if (cardButton === 5) return lessonTrigger[4].fire();
		if (cardButton === 6) return lessonTrigger[5].fire();
		if (cardButton === 200) return triggerNextLevel.fire();
	} else {
	}
};

riveInstance.on(rive.EventType.RiveEvent, eventFire);

// Event intel watcher
const eventLog = document.getElementById("eventsInfo");
const eventConsoleLogger = (riveEvent) => {
	const eventData = riveEvent.data;
	console.log("event name:", eventData.name);
	console.log("event properties:", eventData.properties);
};

riveInstance.on(rive.EventType.RiveEvent, eventConsoleLogger);

// Player selector from HTML
const selectPlayer = (n) => {
	playerSelector.value = n;
};

// Get Checkboxes
const lessonCheckboxes = [];

for (let i = 1; i <= 6; i++) {
	const checkbox = document.getElementById(`Lesson0${i}`);
	lessonCheckboxes.push(checkbox);
}

// Switchers
lessonCheckboxes.forEach((checkbox, index) => {
	checkbox.addEventListener("change", (e) => {
		inputLessonDone[index].value = e.target.checked;
		inputLessonCounter.value = lessonCounter();
	});
});

// Cards Lessons Hover Status

const cardHover = (index) => {
	isLessonHover[index - 1].value = true;
};
const cardNoHover = (index) => {
	isLessonHover[index - 1].value = false;
};

// Card Lessons Click

const cardClick = (index) => {
	lessonTrigger[index - 1].fire(); // fire trigger
};

const lessonCounter = () => {
	let total = 0;

	for (let i = 0; i < lessons; i++) {
		total += inputLessonDone[i].value == true ? 1 : 0;
	}

	return total;
};

const pointerEvent = (riveEvent) => {
	const eventData = riveEvent.data;
	let eventName = eventData.name;
	if (eventName === "OnHoverEnter")
		return (document.body.style.cursor = "pointer");
	if (eventName === "OnHoverExit") return (document.body.style.cursor = "auto");
	if (eventName === "OnClick") return console.log("clicked");
};

riveInstance.on(rive.EventType.RiveEvent, pointerEvent);

const marbleLevitate = (riveEvent) => {
	const eventData = riveEvent.data.name;
	if (eventData === "marbleLevitateON") return (inputMarbleHover.value = true);
	if (eventData === "marbleLevitateOFF")
		return (inputMarbleHover.value = false);
};

riveInstance.on(rive.EventType.RiveEvent, marbleLevitate);
