# Floor 1

[Live demo](https://guillaumecartoonbase.github.io/Pasqal-Floor_1/)

## Rive Doc

[runtime](https://help.rive.app/runtimes/overview)

## Doc

### Lesson status

To mark a lesson 'done'.
(boolean)

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

Setup in .js :

```js
playerSelector = inputs.find((i) => i.name === "playerProfile");
playerSelector.value = playerID;
```
