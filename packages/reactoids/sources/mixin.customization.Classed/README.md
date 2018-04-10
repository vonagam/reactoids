# ClassedMixin

Provides easy way to deeply customize css classes used by component.

[Args](#args)  
[Props](#props)  
[Methods](#methods)  


## Args

[`arg.classes`](#argclasses)  


### arg.classes

`{}`

Schema for available class keys and their modifiers.

**Default:** empty object.


## Props

[`prop.className`](#propclassName)  


### prop.className

`FuncedThat< OneOrArray< string | {} > >`

Sets classes for component to use.


## Methods

[`method.mergeClassNames`](#methodmergeclassnames)  
[`method.classed`](#methodclassed)  


### method.mergeClassNames

`( ...classNames: Array< OneOrArray< string | {} > > ) => OneOrArray< string | {} >`

Merges classes.

| Argument        | Type                                 | Default | Description      |
| --------------- | ------------------------------------ | ------- | ---------------- |
| `...classNames` | `Array< OneOrArray< string / {} > >` | `-`     | classes to merge |
| `=>`            | `OneOrArray< string / {} >`          |         | classes to use   |


### method.classed

`( path: string, modifiers: { [ string ]: boolean | string | number } ) => OneOrArray< string | {} >`

Given path and its modifiers returns classes to use. Possible paths and modifiers specified in [`arg.classes`](#argclasses).

| Argument    | Type                                        | Default | Description                        |
| ----------- | ------------------------------------------- | ------- | ---------------------------------- |
| `path`      | `string`                                    | **`!`** | path for which classes to retrieve |
| `modifiers` | `{ [ string ]: boolean / string / number }` | `{}`    | relevant modifiers to that path    |
| `=>`        | `OneOrArray< string / {} >`                 |         | classes to use                     |
