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

### Triggers

To launch a lesson or next level.

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
