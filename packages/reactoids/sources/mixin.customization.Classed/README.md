# ClassedMixin

Provides easy way to deeply customize css classes used by component.

[Args](#args)  
[Props](#props)  
[Context](#context)  
[Methods](#methods)  


## Args

[`arg.classes: {}`](#argclasses)  


### arg.classes

`{}`

Schema for available class keys and their modifiers.

**Default:** empty object.


## Props

[`prop.className: FuncedThat< OneOrArray< string | {} > >`](#propclassName)  
[`prop.classNameContexted: boolean`](#propclassnamecontexted)  


### prop.className

`FuncedThat< OneOrArray< string | {} > >`

Sets classes for component to use. Have more priority than ones from [`context.getClassNames`](#contextgetclassnames).


### prop.classNameContexted

`boolean`

Determines should component use classes passed from [`context.getClassNames`](#contextgetclassnames) or ignore them.

**Default:** true.


## Context

[`context.getClassNames: ( id: string, constructor: mixed, keys: Array< string >, that: mixed ) => OneOrArray< string | {} >`](#contextgetclassnames)  


### context.getClassNames

`( id: string, constructor: mixed, keys: Array< string >, that: mixed ) => OneOrArray< string | {} >`

Returns classes for component to use.

| Argument      | Type                        | Description                                            |
| ------------- | --------------------------- | ------------------------------------------------------ |
| `id`          | `string`                    | unique id for component class, can be used for caching |
| `constructor` | `mixed`                     | component class                                        |
| `keys`        | `Array< string >`           | flat array of all classes paths of component class     |
| `that`        | `mixed`                     | component instance                                     |
| `=>`          | `OneOrArray< string | {} >` | classes to use                                         |


## Methods

[`method.mergeClassNames: ( ...classNames: Array< OneOrArray< string | {} > > ) => OneOrArray< string | {} >`](#methodmergeclassnames)  
[`method.classed: ( path: string, modifiers: { [ string ]: boolean | string | number } ) => OneOrArray< string | {} >`](#methodclassed)  


### method.mergeClassNames

`( ...classNames: Array< OneOrArray< string | {} > > ) => OneOrArray< string | {} >`

Merges classes.

| Argument        | Type                                 | Default | Description      |
| --------------- | ------------------------------------ | ------- | ---------------- |
| `...classNames` | `Array< OneOrArray< string | {} > >` | `-`     | classes to merge |
| `=>`            | `OneOrArray< string | {} >`          |         | classes to use   |


### method.classed

`( path: string, modifiers: { [ string ]: boolean | string | number } ) => OneOrArray< string | {} >`

Given path and its modifiers returns classes to use. Possible paths and modifiers specified in [`arg.classes`](#argclasses).

| Argument    | Type                                        | Default | Description                        |
| ----------- | ------------------------------------------- | ------- | ---------------------------------- |
| `path`      | `string`                                    | **`!`** | path for which classes to retrieve |
| `modifiers` | `{ [ string ]: boolean | string | number }` | `{}`    | relevant modifiers to that path    |
| `=>`        | `OneOrArray< string | {} >`                 |         | classes to use                     |
