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
let isLessonsDone = [false, false, false, false, false, false]; // Initial value

// Lessons hovers
let isLesson1Hover;
let isLesson2Hover;
let isLesson3Hover;
let isLesson4Hover;
let isLesson5Hover;
let isLesson6Hover;

// Lessons triggers
let triggerA;
let triggerB;
let triggerC;
let triggerD;
let triggerE;
let triggerF;

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
		isLesson1Done.value = isLessonsDone[0];
		isLesson2Done.value = isLessonsDone[1];
		isLesson3Done.value = isLessonsDone[2];
		isLesson4Done.value = isLessonsDone[3];
		isLesson5Done.value = isLessonsDone[4];
		isLesson6Done.value = isLessonsDone[5];

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

// Event intel watcher
const eventLog = document.getElementById("eventsInfo");
const eventConsoleLogger = (riveEvent) => {
	const eventData = riveEvent.data;
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
});
checkLesson2.addEventListener("change", (e) => {
	isLesson2Done.value = e.target.checked;
});
checkLesson3.addEventListener("change", (e) => {
	isLesson3Done.value = e.target.checked;
});
checkLesson4.addEventListener("change", (e) => {
	isLesson4Done.value = e.target.checked;
});
checkLesson5.addEventListener("change", (e) => {
	isLesson5Done.value = e.target.checked;
});
checkLesson6.addEventListener("change", (e) => {
	isLesson6Done.value = e.target.checked;
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
