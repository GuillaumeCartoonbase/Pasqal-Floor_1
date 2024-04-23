// Change marble's color [0, 1 , 2, 3]
let playerID = 0; // Var to change player
const lessons = 6;

const inputLessonDone = []; // Lessons status
const lessonProgress = []; // Lessons progress
const isLessonHover = []; // Lesson pointer hover
const lessonTrigger = []; // Lesson trigger movement

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
		playerSelector.value = playerID;

		for (let i = 1; i <= lessons; i++) {
			// Get lesson done status
			// inputLessonDone[0].value = true; (true, false)
			inputLessonDone.push(
				inputs.find((input) => input.name === `isLesson${i}Done`)
			);

			// Get lesson progress
			// lessonProgress[0].value = 20; (0-100)
			lessonProgress.push(
				inputs.find((input) => input.name === `Lesson progress ${i}`)
			);

			// Hover effect
			// isLessonHover[0].value = true (true, false)
			isLessonHover.push(
				inputs.find((input) => input.name === `Lesson ${i} Hover`)
			);

			// Triggers marble animation
			// lessonTrigger[0].fire()
			lessonTrigger.push(
				inputs.find((input) => input.name === `Trigger Lesson ${i}`)
			);
		}
		// Trigger marble to next level
		triggerNextLevel = inputs.find((i) => i.name === "Trigger Next Level");

		// Lesson counter
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

const eventFire = (riveEvent) => {
	const eventData = riveEvent.data;
	const eventName = eventData.name;
	const eventProperties = eventData.properties;

	// Event logger
	console.log("event name:", eventName);
	console.log("event properties:", eventProperties);

	// Fire marble movements from card's buttons
	if (eventName.split(" ")[0] === "cardbutton") {
		let cardButton = eventProperties.cardButton;
		for (let i = 0; i < lessons; i++) {
			if (cardButton === i + 1) return lessonTrigger[i].fire();
		}
		if (cardButton === 200) return triggerNextLevel.fire();
	}

	// Change pointer when hovering action
	if (eventName === "OnHoverEnter")
		return (document.body.style.cursor = "pointer");
	if (eventName === "OnHoverExit") return (document.body.style.cursor = "auto");
	if (eventName === "OnClick") return console.log("clicked");

	// Levitate marble when on a lesson, not in movement
	if (eventName === "marbleLevitateON") return (inputMarbleHover.value = true);
	if (eventName === "marbleLevitateOFF")
		return (inputMarbleHover.value = false);
};

riveInstance.on(rive.EventType.RiveEvent, eventFire);

// Player selector from HTML
const selectPlayer = (n) => {
	playerSelector.value = n;
};

// Get Checkboxes from HTML
const lessonCheckboxes = [];

for (let i = 1; i <= 6; i++) {
	const checkbox = document.getElementById(`Lesson0${i}`);
	lessonCheckboxes.push(checkbox);
}

// Switcher lesson done status from HTML
lessonCheckboxes.forEach((checkbox, index) => {
	checkbox.addEventListener("change", (e) => {
		inputLessonDone[index].value = e.target.checked;
		inputLessonCounter.value = lessonCounter();
	});
});

// Cards Lessons Hover Status from HTML
const cardHover = (index) => {
	isLessonHover[index - 1].value = true;
};
const cardNoHover = (index) => {
	isLessonHover[index - 1].value = false;
};

// Card Lessons Click from HTML
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
