// Change marble's color [0, 1 , 2, 3]
let playerID = 0; // Var to change player in JS

// Lessons status
let areLessonsDone = [false, false, false, false, false, false]; // Initial value

// Lesson progress, 0-100

let progressLessons = [0, 0, 0, 0, 0, 0];

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
		lesson6Completion.value = progressLessons[0];
		lesson1Completion.value = progressLessons[1];
		lesson2Completion.value = progressLessons[2];
		lesson3Completion.value = progressLessons[3];
		lesson4Completion.value = progressLessons[4];
		lesson5Completion.value = progressLessons[5];

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
		triggerNextLevel = inputs.find((i) => i.name === "Trigger Next Level");

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

// fire movement on click
const eventFire = (riveEvent) => {
	const eventData = riveEvent.data;
	let cardButton = eventData.properties.cardButton;
	if (cardButton === 1) return trigger1.fire();
	if (cardButton === 2) return trigger2.fire();
	if (cardButton === 3) return trigger3.fire();
	if (cardButton === 4) return trigger4.fire();
	if (cardButton === 5) return trigger5.fire();
	if (cardButton === 6) return trigger6.fire();
	if (cardButton === 200) return triggerNextLevel.fire();
};

riveInstance.on(rive.EventType.RiveEvent, eventFire);

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
	console.log("event name:", eventData.name);
	console.log("event properties", eventData.properties);
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
const lessonCheckboxes = [];

for (let i = 1; i <= 6; i++) {
	const checkbox = document.getElementById(`Lesson0${i}`);
	lessonCheckboxes.push(checkbox);
}

// Switchers
lessonCheckboxes[0].addEventListener("change", (e) => {
	isLesson1Done.value = e.target.checked;
	inputLessonCounter.value = lessonCounter();
});
lessonCheckboxes[1].addEventListener("change", (e) => {
	isLesson2Done.value = e.target.checked;
	inputLessonCounter.value = lessonCounter();
});
lessonCheckboxes[2].addEventListener("change", (e) => {
	isLesson3Done.value = e.target.checked;
	inputLessonCounter.value = lessonCounter();
});
lessonCheckboxes[3].addEventListener("change", (e) => {
	isLesson4Done.value = e.target.checked;
	inputLessonCounter.value = lessonCounter();
});
lessonCheckboxes[4].addEventListener("change", (e) => {
	isLesson5Done.value = e.target.checked;
	inputLessonCounter.value = lessonCounter();
});
lessonCheckboxes[5].addEventListener("change", (e) => {
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
