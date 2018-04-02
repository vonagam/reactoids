# getLocation

`( url?: string | {} ) => {}`

Returns [`Location`](https://developer.mozilla.org/en-US/docs/Web/API/Location) like object with working getters and setters for specific parts of url.

| Argument | Type          | Default | Description             |
| -------- | ------------- | ------- | ----------------------- |
| `url`\*  | `string / {}` | `-`     | url for location object |
| `=>`     | `{}`          |         | location like object    |

\*: url resolved with `a.href = url` for string input and `a[ key ] = value` for object input.
