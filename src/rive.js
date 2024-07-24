const stateMachine = "First Floor";

// Create Rive
const riveInstance = new rive.Rive({
	src: "src/floor-1.riv", //get rive file
	canvas: document.getElementById("firstFloor"), //get correct canvas
	autoplay: true,
	stateMachines: stateMachine, // get correct stateMachine
	automaticallyHandleEvents: true, // Automatically handle RiveHTTPEvents
	onLoad: onLoadHandler,
});

const lessons = 6; // Number of lessons
const inputLessonsStarted = []; // Lessons status
const inputLessonsDone = []; // Lessons status
const inputIsLessonsHover = []; // Lesson pointer hover
const inputLessonsTrigger = []; // Lesson trigger movement

// Handle the onLoad event
function onLoadHandler() {
	// Prevent a blurry canvas by using the device pixel ratio
	riveInstance.resizeDrawingSurfaceToCanvas();

	// Get inputs
	const inputs = riveInstance.stateMachineInputs("First Floor");

	// Change marble's color [0, 1 , 2, 3]
	let playerID = 0; // Var to change player
	playerSelector = inputs.find((i) => i.name === "playerProfile");
	playerSelector.value = playerID;

	inputMarbleHover = inputs.find((i) => i.name === "marble hovering");

	for (let i = 1; i <= lessons; i++) {
		// Get lesson started status
		// inputLessonsStarted[0].value = true; (true, false)
		inputLessonsStarted.push(
			inputs.find((input) => input.name === `isLesson${i}Started`)
		);

		// Get lesson done status
		// inputLessonsDone[0].value = true; (true, false)
		inputLessonsDone.push(
			inputs.find((input) => input.name === `isLesson${i}Done`)
		);

		// Get lesson progress
		// inputLessonsProgress[0].value = 20; (0-100)
		inputLessonsProgress.push(
			inputs.find((input) => input.name === `Lesson progress ${i}`)
		);

		// Triggers marble animation
		// inputLessonsTrigger[0].fire()
		inputLessonsTrigger.push(
			inputs.find((input) => input.name === `Trigger Lesson ${i}`)
		);

		// Change lesson hovering status
		inputIsLessonsHover.push(
			inputs.find((input) => input.name === `Lesson ${i} Hover`)
		);
	}
	// Trigger marble to next level
	triggerNextLevel = inputs.find((i) => i.name === "Trigger Next Level");

	// Lesson counter
	inputLessonsCounter = inputs.find((i) => i.name === "lessonCounter");

	responsiveShrink = inputs.find((i) => i.name === "responsiveShrink");
	responsiveShrink.value = 0;

	isResetting = inputs.find((i) => i.name === "isResetting");
	isResetting.value = true;

	isNextLevelActive = inputs.find((i) => i.name === "isNextLevelActive");
	isNextLevelActive.value = true;
}

// Resize the drawing surface if the window resizes
window.addEventListener(
	"resize",
	() => {
		riveInstance.resizeDrawingSurfaceToCanvas();
	},
	false
);

// Get Events
const eventFire = (riveEvent) => {
	const eventData = riveEvent.data;
	const eventName = eventData.name;
	const eventProperties = eventData.properties;

	const eventKey = eventName.split("-")[0];
	const eventIndex = eventName.slice(-1);

	// console.log( "", "event name:", eventName, "\n", "event properties:", eventProperties);

	switch (eventKey) {
		// Fire marble movements from card's buttons
		case "cardbutton":
			if (eventName.split("-")[1] == "next") return triggerNextLevel.fire();
			if (Number.isInteger(Number(eventIndex)))
				return inputLessonsTrigger[eventIndex - 1].fire();
			break;

		// logic when marble arrives
		case "On":
			inputMarbleHover.value = true;

			riveInstance.setBooleanStateAtPath(
				"lessonHover",
				true,
				`Lesson ${eventIndex}`
			);
			break;

		// logic when marble leaves
		case "Off":
			inputMarbleHover.value = false;

			riveInstance.setBooleanStateAtPath(
				"lessonHover",
				false,
				`Lesson ${eventIndex}`
			);
			break;

		// Change pointer when hovering action
		case "OnHoverEnter":
			document.body.style.cursor = "pointer";
			break;
		case "OnHoverExit":
			document.body.style.cursor = "auto";
			break;
		case "OnClick":
			// Custom logic for click event
			break;

		default:
			console.log("Unhandled event:", eventName);
			break;
	}
};

riveInstance.on(rive.EventType.RiveEvent, eventFire);

// Player selector from HTML
const selectPlayer = (n) => {
	playerSelector.value = n;
};

// Get Checkboxes from HTML
const lessonCheckboxes = [];

for (let i = 1; i <= lessons; i++) {
	const checkbox = document.getElementById(`Lesson0${i}`);
	lessonCheckboxes.push(checkbox);
}

// Switcher lesson done status from HTML
lessonCheckboxes.forEach((checkbox, index) => {
	checkbox.addEventListener("change", (e) => {
		inputLessonsDone[index].value = e.target.checked;
		inputLessonsCounter.value = lessonCounter();
	});
});

// Cards Lessons Hover Status from HTML
const cardHover = (index) => {
	riveInstance.setBooleanStateAtPath("lessonHover", true, `Lesson ${index}`);
};
const cardNoHover = (index) => {
	riveInstance.setBooleanStateAtPath("lessonHover", false, `Lesson ${index}`);
};

// Card Lessons Click from HTML
const cardClick = (index) => {
	inputLessonsTrigger[index - 1].fire(); // fire trigger
};

const lessonCounter = () => {
	let total = 0;
	for (let i = 0; i < lessons; i++) {
		total += inputLessonsDone[i].value == true ? 1 : 0;
	}
	inputLessonsCounter.value = total;
	return total;
};
