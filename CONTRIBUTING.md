# Contributing

The basic structure looks like this:

``` json
"fortnite": {
    "displayName": "Fortnite",
    "platforms": ["PC", "Mac", "PlayStation", "Xbox", "Nintendo Switch", "Android"],
    "list": [
        [true, true, true, true, true, true],
        [true, true, true, true, true, true],
        [true, true, true, true, true, true],
        [true, true, true, true, true, true],
        [true, true, true, true, true, true],
        [true, true, true, true, true, true]
    ],
    "lastUpdated": "2022-05-18",
    "sources": ["https://www.epicgames.com/fortnite/en-US/faq"]
},
```

The key of the object must be a shorthand name for the game (no greater than 15 characters).
The display name must be the same as listed 