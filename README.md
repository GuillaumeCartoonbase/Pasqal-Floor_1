# **[Live demo](https://guillaumecartoonbase.github.io/Pasqal-Floor_1/)**

# Rive Doc

Refer to the [Rive runtime documentation](https://help.rive.app/runtimes/overview) for more information.

# Responsiveness

Rive Input names:

- `isResetting` : Centers back itself when the cursor is out of the canvas.
- `responsiveShrink` : Ranges from 0-100, for overall centering then shrinking of the floor.

```js
isResetting.value = true;
responsiveShrink.value = 100;
```

# Coming Soon Status

To switch between "next" level coming soon" and "go to next level".

```js
isNextLevelActive.value = false;
```

# Lessons statuses

To mark a lesson 'started' or 'done' (boolean, in array).

## Rive inputs

- `isLesson1Started`
- `isLesson1Done`
- `isLesson2Started`
- `isLesson2Done`
- ...

## Setup in JS

The values are in arrays named:

- `inputLessonsStarted`
- `inputLessonsDone`

```js
const lessons = 6;
const inputLessonsStarted = [];
const inputLessonsDone = [];

for (let i = 1; i <= lessons; i++) {
	inputLessonsDone.push(
		inputs.find((input) => input.name === `isLesson${i}Done`)
	);
}

inputLessonsStarted[0].value = true; // lesson 1 marked started
inputLessonsStarted[2].value = true; // lesson 2 marked done
inputLessonsDone[5].value = false; // lesson 6 marked not done
```

# Lessons Hover status

To set the status of hovering on the lessons (boolean).

## Rive Input names

To change status:

```js
riveInstance.setBooleanStateAtPath(
	"lessonHover", // input name
	true, // status
	`Lesson 1` // lesson picker
);
```

Recorded status:

- `Lesson 1 Hover`
- `Lesson 2 Hover`
- ...

## Setup

### To change status from web

```html
<div onmouseenter="cardHover(1)" onmouseleave="cardNoHover(1)"></div>
```

```js
const cardHover = (index) => {
	riveInstance.setBooleanStateAtPath("lessonHover", true, `Lesson ${index}`);
};
const cardNoHover = (index) => {
	riveInstance.setBooleanStateAtPath("lessonHover", false, `Lesson ${index}`);
};
```

### To check the status

```js
const inputIsLessonsHover = [];

for (let i = 1; i <= lessons; i++) {
	inputIsLessonsHover.push(
		inputs.find((input) => input.name === `Lesson ${i} Hover`)
	);
}

inputIsLessonsHover.value;
```

# Triggers

To trigger the marble movement to a lesson or next level.

## Rive Input names:

- `Trigger Lesson 1`
- `Trigger Lesson 2`
- ...
- `Trigger Next Level`

## Setup in JS

```js
const inputLessonsTrigger = [];

for (let i = 1; i <= lessons; i++) {
	inputLessonsTrigger.push(
		inputs.find((input) => input.name === `Trigger Lesson ${i}`)
	);
}
```

To fire the marble movement :

```js
inputLessonsTrigger[0].fire(); // movement to lesson 1
```

To trigger movement from web

```html
<div onclick="card1click()"></div>
```

```js
const card1click = () => {
	inputLessonsTrigger[0].fire(); // fire trigger lesson 1
};
```

# Player Status

To change the marble's color depending on the user profile.
(integrer, 0-3)

- `0` : Standard marble
- `1` : Blue marble
- `2` : Red marble
- `3` : Green marble

Variable to edit in js: `playerID`

Rive Input name: `playerProfile`

## Setup in JS

```js
playerSelector = inputs.find((i) => i.name === "playerProfile"); // get rive input
playerSelector.value = playerID;
```

# Events

Events return an object
(booleans, integrers and strings can be used as value)

`console.log()` are in place to show the result and timing.

## Lesson events

```js
LessonEvent1 = { lesson: 1 };
LessonEvent2 = { lesson: 2 };
(...)
NextLevelButton = { level: 2 };
```

## Cursor events

- `OnHoverEnter`
- `OnHoverExit`
- `OnClick`

## Setup in JS

Current example:

```js
// Get Events
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
			if (cardButton === i + 1) return inputLessonsTrigger[i].fire();
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
```
