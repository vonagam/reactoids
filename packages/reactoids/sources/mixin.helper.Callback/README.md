# CallbackMixin

Provides simple way to create callback functions to pass down with caching. Helps with pure rendering.

[Methods](#methods)  


## Methods

[`method.callback: ( keys: OneOrArray< string > ) => ( ...args: Array< mixed > ) => void`](#methodcallback)  


### method.callback

`( keys: OneOrArray< string > ) => ( ...args: Array< mixed > ) => void`

Returns callback function which at invocation calls functions at specified paths in order of mention.
Input can be a single string with comma-delimited paths or an array of strings.
Callback function cached using paths as key.

| Argument | Type                                  | Default | Description                                |
| -------- | ------------------------------------- | ------- | ------------------------------------------ |
| `keys`   | `OneOrArray< string >`                | **`!`** | paths, as array or as comma-delimited list |
| `=>`     | `( ...args: Array< mixed > ) => void` |         |                                            |
