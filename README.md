# Floor 1

[Live demo](https://guillaumecartoonbase.github.io/Pasqal-Floor_1/)

## Rive Doc

[runtime](https://help.rive.app/runtimes/overview)

## Doc

### Lesson status

To mark a lesson 'done'.
(boolean)

Rive Input names:

- `isLesson1Done`
- `isLesson2Done`
- `isLesson3Done`
- `isLesson4Done`
- `isLesson5Done`
- `isLesson6Done`

#### Setup in JS

The value is in an array named `isLessonsDone`.

```js
let isLessonsDone = [false, false, false, false, false, false]; // Initial value

isLesson1Done = inputs.find((i) => i.name === "isLesson1Done"); // get rive input
isLesson2Done = inputs.find((i) => i.name === "isLesson2Done"); // get rive input
isLesson3Done = inputs.find((i) => i.name === "isLesson3Done"); // get rive input
isLesson4Done = inputs.find((i) => i.name === "isLesson4Done"); // get rive input
isLesson5Done = inputs.find((i) => i.name === "isLesson5Done"); // get rive input
isLesson6Done = inputs.find((i) => i.name === "isLesson6Done"); // get rive input
isLesson1Done.value = isLessonsDone[0];
isLesson2Done.value = isLessonsDone[1];
isLesson3Done.value = isLessonsDone[2];
isLesson4Done.value = isLessonsDone[3];
isLesson5Done.value = isLessonsDone[4];
isLesson6Done.value = isLessonsDone[5];
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
let progressLesson1 = 0; // 0-100 value
let progressLesson2 = 0; // 0-100 value
let progressLesson3 = 0; // 0-100 value
let progressLesson4 = 0; // 0-100 value
let progressLesson5 = 0; // 0-100 value
let progressLesson6 = 0; // 0-100 value

lesson1Completion = inputs.find((i) => i.name === "Lesson progress 1"); // get rive input
lesson2Completion = inputs.find((i) => i.name === "Lesson progress 2"); // get rive input
lesson3Completion = inputs.find((i) => i.name === "Lesson progress 3"); // get rive input
lesson4Completion = inputs.find((i) => i.name === "Lesson progress 4"); // get rive input
lesson5Completion = inputs.find((i) => i.name === "Lesson progress 5"); // get rive input
lesson6Completion = inputs.find((i) => i.name === "Lesson progress 6"); // get rive input
lesson1Completion.value = progressLesson1;
lesson2Completion.value = progressLesson2;
lesson3Completion.value = progressLesson3;
lesson4Completion.value = progressLesson4;
lesson5Completion.value = progressLesson5;
lesson6Completion.value = progressLesson6;
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

#### Setup in JS
