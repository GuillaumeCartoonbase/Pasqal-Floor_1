# Floor 1

[Live demo](https://guillaumecartoonbase.github.io/Pasqal-Floor_1/)

## Rive Doc

[runtime](https://help.rive.app/runtimes/overview)

## Doc

### Coming Soon Status

To switch between "next" level coming soon" and "go to next level"

```js
isNextLevelActive = inputs.find((i) => i.name === "isNextLevelActive");
isNextLevelActive.value = false;
```

### Lesson status

To mark a lesson 'done'.
(boolean, in array)

Rive Input names:

- `isLesson1Done`
- `isLesson2Done`
- `isLesson3Done`
- `isLesson4Done`
- `isLesson5Done`
- `isLesson6Done`

#### Setup in JS

The value is in an array named `inputLessonsDone`.

```js
for (let i = 1; i <= lessons; i++) {
	// Get lesson done status
	inputLessonsDone.push(
		inputs.find((input) => input.name === `isLesson${i}Done`)
	);
}

inputLessonsDone[0].value = true; // lesson 1 marked done
inputLessonsDone[5].value = false; // lesson 6 marked not done
```

### Lesson Completion

To show the completition percentage on the hover card.
(integrer, 0-100)

Rive Input names:

- `Lesson progress 1`
- `Lesson progress 2`
- `Lesson progress 3`
- `Lesson progress 4`
- `Lesson progress 5`
- `Lesson progress 6`

#### Setup in JS

```js
for (let i = 1; i <= lessons; i++) {
	// Get lesson progress
	inputLessonsProgress.push(
		inputs.find((input) => input.name === `Lesson progress ${i}`)
	);
}

inputLessonsProgress[0].value = 25; // lesson 1 at 25%
inputLessonsProgress[5].value = 100; // lesson 6 at 100%
```

### Triggers

To launch a lesson or next level.

Rive Input names:

- `Trigger Lesson 1`
- `Trigger Lesson 2`
- `Trigger Lesson 3`
- `Trigger Lesson 4`
- `Trigger Lesson 5`
- `Trigger Lesson 6`
- `Trigger Next Level`

#### Setup in JS

To fire the marble movement :

```js
inputLessonsTrigger[0].fire(); // movement to lesson 1
```

Trigger movement from web

```html
<div onclick="card1click()"></div>
```

```js
const card1click = () => {
	inputLessonsTrigger[0].fire(); // fire trigger lesson 1
};
```

### Hover

To set the status hovering on the lessons
(boolean)

Rive Input names:

- `Lesson 1 Hover`
- `Lesson 2 Hover`
- `Lesson 3 Hover`
- `Lesson 4 Hover`
- `Lesson 5 Hover`
- `Lesson 6 Hover`

```html
<div onmouseenter="cardHover(1)" onmouseleave="cardNoHover(1)"></div>
```

```js
for (let i = 1; i <= lessons; i++) {
	inputIsLessonsHover.push(
		inputs.find((input) => input.name === `Lesson ${i} Hover`)
	);
}

const cardHover = (index) => {
	inputIsLessonsHover[index - 1].value = true;
};
const cardNoHover = (index) => {
	inputIsLessonsHover[index - 1].value = false;
};
```

### Player Status

To change the marble's color depending on the user profile.
(integrer, 0-3)

- `0` : Standard marble
- `1` : Blue marble
- `2` : Red marble
- `3` : Green marble

Variable to edit in js: `playerID`

Rive Input name: `playerProfile`

#### Setup in JS

```js
playerSelector = inputs.find((i) => i.name === "playerProfile"); // get rive input
playerSelector.value = playerID;
```

### Events

Events return an object
(booleans, integrers and strings can be used as value)

`console.log()` are in place to show the result and timing.

#### Lesson events

```js
LessonEvent1 = { lesson: 1 };
LessonEvent2 = { lesson: 2 };
(...)
NextLevelButton = { level: 2 };
```

#### Cursor events

- `OnHoverEnter`
- `OnHoverExit`
- `OnClick`

#### Setup in JS

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
