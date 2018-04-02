# StringedMixin

Provides way to localize component.

[Args](#args)  
[Props](#props)  
[Context](#context)  
[Methods](#methods)  


## Args

[`arg.strings`](#argstrings)  


### arg.strings

`Array< string >`

Array of keys used for strings retrieval.

**Required**


## Props

[`prop.strings`](#propstrings)  


### prop.strings

`FuncedThat0< OneOrArray< { [ string ]: Funced2< mixed, that, string > } > >`

Sets strings for component to use. Have more priority than ones from [context.getStrings](#contextgetstrings).


## Context

[`context.getStrings`](#contextgetstrings)  


### context.getStrings

```
(
  id: string,
  constructor: mixed,
  keys: Array< string >,
  that
) => FuncedThat0< OneOrArray< { [ string ]: Funced2< mixed, that, string > } > >
```

Returns strings for component to use.

| Argument      | Type                              | Description                                            |
| ------------- | --------------------------------- | ------------------------------------------------------ |
| `id`          | `string`                          | unique id for component class, can be used for caching |
| `constructor` | `mixed`                           | component class                                        |
| `keys`        | `Array< string >`                 | flat array of all strings keys of component class      |
| `that`        | `mixed`                           | component instance                                     |
| `=>`          | `FuncedThat0< OneOrArray< {} > >` | strings to use                                         |


## Methods

[`method.stringed`](#methodstringed)  


### method.stringed

`( key: string, params?: mixed ) => ?string`

Given key and its custom params returns string to use.

| Argument | Type      | Default | Description                       |
| -------- | --------- | ------- | --------------------------------- |
| `key`    | `string`  | **`!`** | key for which string to retrieve  |
| `params` | `mixed`   | `-`     | custom params for string function |
| `=>`     | `?string` |         | string to use                     |
