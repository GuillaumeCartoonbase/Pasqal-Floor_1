// Change marble's color [0, 1 , 2, 3]
let playerSelector;
let playerID = 0; // Var to change player in JS

// Lessons status
let isLesson1Done;
let isLesson2Done;
let isLesson3Done;
let isLesson4Done;
let isLesson5Done;
let isLesson6Done;
let areLessonsDone = [false, false, false, false, false, false]; // Initial value

// Lesson progress
let lesson1Completion;
let lesson2Completion;
let lesson3Completion;
let lesson4Completion;
let lesson5Completion;
let lesson6Completion;

let progressLesson1 = 0;
let progressLesson2 = 0;
let progressLesson3 = 0;
let progressLesson4 = 0;
let progressLesson5 = 0;
let progressLesson6 = 0;

// Lessons hovers
let isLesson1Hover;
let isLesson2Hover;
let isLesson3Hover;
let isLesson4Hover;
let isLesson5Hover;
let isLesson6Hover;

// Lessons triggers
let trigger1;
let trigger2;
let trigger3;
let trigger4;
let trigger5;
let trigger6;

let triggerCardStart;

let inputLessonCounter;

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

		// Change lesson done status
		isLesson1Done = inputs.find((i) => i.name === "isLesson1Done");
		isLesson2Done = inputs.find((i) => i.name === "isLesson2Done");
		isLesson3Done = inputs.find((i) => i.name === "isLesson3Done");
		isLesson4Done = inputs.find((i) => i.name === "isLesson4Done");
		isLesson5Done = inputs.find((i) => i.name === "isLesson5Done");
		isLesson6Done = inputs.find((i) => i.name === "isLesson6Done");
		isLesson1Done.value = areLessonsDone[0];
		isLesson2Done.value = areLessonsDone[1];
		isLesson3Done.value = areLessonsDone[2];
		isLesson4Done.value = areLessonsDone[3];
		isLesson5Done.value = areLessonsDone[4];
		isLesson6Done.value = areLessonsDone[5];

		// Lesson completion
		lesson1Completion = inputs.find((i) => i.name === "Lesson progress 1");
		lesson2Completion = inputs.find((i) => i.name === "Lesson progress 2");
		lesson3Completion = inputs.find((i) => i.name === "Lesson progress 3");
		lesson4Completion = inputs.find((i) => i.name === "Lesson progress 4");
		lesson5Completion = inputs.find((i) => i.name === "Lesson progress 5");
		lesson6Completion = inputs.find((i) => i.name === "Lesson progress 6");
		lesson1Completion.value = progressLesson1;
		lesson2Completion.value = progressLesson2;
		lesson3Completion.value = progressLesson3;
		lesson4Completion.value = progressLesson4;
		lesson5Completion.value = progressLesson5;
		lesson6Completion.value = progressLesson6;

		// HOVER
		isLesson1Hover = inputs.find((i) => i.name === "Lesson 1 Hover");
		isLesson2Hover = inputs.find((i) => i.name === "Lesson 2 Hover");
		isLesson3Hover = inputs.find((i) => i.name === "Lesson 3 Hover");
		isLesson4Hover = inputs.find((i) => i.name === "Lesson 4 Hover");
		isLesson5Hover = inputs.find((i) => i.name === "Lesson 5 Hover");
		isLesson6Hover = inputs.find((i) => i.name === "Lesson 6 Hover");

		// Triggers
		trigger1 = inputs.find((i) => i.name === "Trigger Lesson 1");
		trigger2 = inputs.find((i) => i.name === "Trigger Lesson 2");
		trigger3 = inputs.find((i) => i.name === "Trigger Lesson 3");
		trigger4 = inputs.find((i) => i.name === "Trigger Lesson 4");
		trigger5 = inputs.find((i) => i.name === "Trigger Lesson 5");
		trigger6 = inputs.find((i) => i.name === "Trigger Lesson 6");

		triggerCardStart = inputs.find((i) => i.name === "card button trigger");

		inputLessonCounter = inputs.find((i) => i.name === "lessonCounter");
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

// Get Events
const demoEvent = document.getElementById("demoEvent");
const onRiveEventReceived = (riveEvent) => {
	const eventData = riveEvent.data;
	let text =
		Object.keys(eventData.properties)[0] === "lesson"
			? `launch activity #${eventData.properties.lesson} `
			: `${Object.keys(eventData.properties)[0]} ${
					Object.values(eventData.properties)[0]
			  }`;
	demoEvent.innerHTML = text;
};

riveInstance.on(rive.EventType.RiveEvent, onRiveEventReceived);

// fire movement on click
const eventFire = (riveEvent) => {
	const eventData = riveEvent.data;
	if (eventData.properties.lesson === 1) return trigger1.fire();
	if (eventData.properties.lesson === 2) return trigger2.fire();
	if (eventData.properties.lesson === 3) return trigger3.fire();
	if (eventData.properties.lesson === 4) return trigger4.fire();
	if (eventData.properties.lesson === 5) return trigger5.fire();
	if (eventData.properties.lesson === 6) return trigger6.fire();
};

riveInstance.on(rive.EventType.RiveEvent, eventFire);

// Event intel watcher
const eventLog = document.getElementById("eventsInfo");
const eventConsoleLogger = (riveEvent) => {
	const eventData = riveEvent.data;
	console.log(eventData.name);
	console.log(eventData.properties);
	eventLog.innerHTML = `event name: ${eventData.name}
    <br>
    event object keys: ${Object.keys(eventData.properties)}
    <br>
    event object values: ${Object.values(eventData.properties)}
    `;
};

riveInstance.on(rive.EventType.RiveEvent, eventConsoleLogger);

// Player selector from HTML
const selectPlayer = (n) => {
	playerSelector.value = n;
};

// Get Checkboxes
const checkLesson1 = document.getElementById("Lesson01");
const checkLesson2 = document.getElementById("Lesson02");
const checkLesson3 = document.getElementById("Lesson03");
const checkLesson4 = document.getElementById("Lesson04");
const checkLesson5 = document.getElementById("Lesson05");
const checkLesson6 = document.getElementById("Lesson06");

// Switchers
checkLesson1.addEventListener("change", (e) => {
	isLesson1Done.value = e.target.checked;
	inputLessonCounter.value = lessonCounter();
});
checkLesson2.addEventListener("change", (e) => {
	isLesson2Done.value = e.target.checked;
	inputLessonCounter.value = lessonCounter();
});
checkLesson3.addEventListener("change", (e) => {
	isLesson3Done.value = e.target.checked;
	inputLessonCounter.value = lessonCounter();
});
checkLesson4.addEventListener("change", (e) => {
	isLesson4Done.value = e.target.checked;
	inputLessonCounter.value = lessonCounter();
});
checkLesson5.addEventListener("change", (e) => {
	isLesson5Done.value = e.target.checked;
	inputLessonCounter.value = lessonCounter();
});
checkLesson6.addEventListener("change", (e) => {
	isLesson6Done.value = e.target.checked;
	inputLessonCounter.value = lessonCounter();
});

// Cards Lessons Hover Status
const card1hover = () => {
	isLesson1Hover.value = true;
};
const card1nohover = () => {
	isLesson1Hover.value = false;
};
const card2hover = () => {
	isLesson2Hover.value = true;
};
const card2nohover = () => {
	isLesson2Hover.value = false;
};
const card3hover = () => {
	isLesson3Hover.value = true;
};
const card3nohover = () => {
	isLesson3Hover.value = false;
};
const card4hover = () => {
	isLesson4Hover.value = true;
};
const card4nohover = () => {
	isLesson4Hover.value = false;
};
const card5hover = () => {
	isLesson5Hover.value = true;
};
const card5nohover = () => {
	isLesson5Hover.value = false;
};
const card6hover = () => {
	isLesson6Hover.value = true;
};
const card6nohover = () => {
	isLesson6Hover.value = false;
};

// Card Lessons Click
const card1click = () => {
	trigger1.fire(); // fire trigger
};
const card2click = () => {
	trigger2.fire(); // fire trigger
};
const card3click = () => {
	trigger3.fire(); // fire trigger
};
const card4click = () => {
	trigger4.fire(); // fire trigger
};
const card5click = () => {
	trigger5.fire(); // fire trigger
};
const card6click = () => {
	trigger6.fire(); // fire trigger
};

const lessonCounter = () => {
	let total = 0;

	// for (let i = 0; i < areLessonsDone.length; i++) {
	// 	total += areLessonsDone[i] == true ? 1 : 0;
	// }

	total += isLesson1Done.value ? 1 : 0;
	total += isLesson2Done.value ? 1 : 0;
	total += isLesson3Done.value ? 1 : 0;
	total += isLesson4Done.value ? 1 : 0;
	total += isLesson5Done.value ? 1 : 0;
	total += isLesson6Done.value ? 1 : 0;

	return total;
};
