# StringedMixin

Provides way to localize component.

[Args](#args)  
[Props](#props)  
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

Sets strings for component to use.


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
