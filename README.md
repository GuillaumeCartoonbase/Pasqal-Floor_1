# Floor 1

[Live demo](https://guillaumecartoonbase.github.io/Pasqal-Floor_1/)

## Rive Doc

[runtime](https://help.rive.app/runtimes/overview)

## Doc

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

The value is in an array named `inputLessonDone`.

```js
for (let i = 1; i <= lessons; i++) {
	// Get lesson done status
	inputLessonDone.push(
		inputs.find((input) => input.name === `isLesson${i}Done`)
	);
}

inputLessonDone[0].value = true; // lesson 1 marked done
inputLessonDone[5].value = false; // lesson 6 marked not done
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
	lessonProgress.push(
		inputs.find((input) => input.name === `Lesson progress ${i}`)
	);
}

lessonProgress[0].value = 25; // lesson 1 at 25%
lessonProgress[5].value = 100; // lesson 6 at 100%
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
lessonTrigger[0].fire(); // movement to lesson 1
```

Trigger movement from web

```html
<div onclick="card1click()"></div>
```

```js
const card1click = () => {
	lessonTrigger[0].fire(); // fire trigger lesson 1
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
	isLessonHover.push(
		inputs.find((input) => input.name === `Lesson ${i} Hover`)
	);
}

const cardHover = (index) => {
	isLessonHover[index - 1].value = true;
};
const cardNoHover = (index) => {
	isLessonHover[index - 1].value = false;
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

```js
console.log(eventData.name);
console.log(eventData.properties);
```

```js
LessonButton = { lesson: 1 };
NextLevelButton = { level: 2 };
```

#### Setup in JS

Current example:

```js
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
```

#### Cursor events

3 events are presents :

- `OnHoverEnter`
- `OnHoverExit`
- `OnClick`

```js
const pointerEvent = (riveEvent) => {
	const eventData = riveEvent.data;
	let eventName = eventData.name;
	if (eventName === "OnHoverEnter")
		return (document.body.style.cursor = "pointer");
	if (eventName === "OnHoverExit") return (document.body.style.cursor = "auto");
	if (eventName === "OnClick") return (document.body.style.cursor = "auto");
};

riveInstance.on(rive.EventType.RiveEvent, pointerEvent);
```
