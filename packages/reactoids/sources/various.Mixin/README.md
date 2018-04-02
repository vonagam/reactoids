# Mixin

Object with four static functions used to work with reactoids mixins.  

[`creat`](#create)  
[`mix`](#mix)  
[`resolve`](#resolve)  
[`createClass`](#createclass)  


## create

```
( { 
  name?: string
  argTypes?: {},
  defaultArgs?: {},
  mixins?: Array< ( args: {} ) => {} >
  mixin: ( args: {} ) => {}
} ) => ( args: {} ) => {}
```

Creates reactoids mixin constructor.  

| Argument           | Type                          | Default              | Description                              |
| ------------------ | ----------------------------- | -------------------- | ---------------------------------------- |
| `spec`             | `{}`                          | **`!`**              | spec for mixin constructor creation      |
| `spec.name`        | `string`                      | `"SomeUnknownMixin"` | name of mixin                            |
| `spec.argTypes`    | `{}`                          | `{}`                 | types for constructor arguments          |
| `spec.defaultArgs` | `{}`                          | `{}`                 | default values for constructor arguments |
| `spec.mixins`\*    | `Array< ( args: {} ) => {} >` | `[]`                 | constructors of possibly included mixins |
| `spec.mixin`       | `( args: {} ) => {}`          | **`!`**              | function that returns mixin instance     |
| `=>`               | `( args: {} ) => {}`          |                      | mixin constructor                        |

\*: `argTypes` and `defaultArgs` of included `mixins` will be merged into resulted constructor specification.  


## mix

`( Component: mixed ) => mixed`

Merges reactoids mixins into react component class.

| Argument           | Type          | Default | Description                    |
| ------------------ | ------------- | ------- | ------------------------------ |
| `Component`        | `mixed`       | **`!`** | component class to decorate    |
| `Component.mixins` | `Array< {} >` | `-`     | mixins to be merged into class |
| `=>`               | `mixed`       |         | decorated class                |


## resolve

`( mixins: Array< {} > ) => Array< {} >`

Gets array of mixins possible with nested ones, returns flat array of mixins without duplicates and in order of dependency.  

| Argument | Type          | Default | Description                                     |
| -------- | ------------- | ------- | ----------------------------------------------- |
| `mixins` | `Array< {} >` | `-`     | input mixins with possible nested ones          |
| =>\*     | `Array< {} >` |         | flat array of output mixins without nested ones |

\*: mixins objects in returned array are not the same objects as in input. They do not have `mixins` key.  


## createClass

`( spec: {} ) => mixed`

`React.createClass` analog. Additionally applies [`mix`](#mix) decorator.  

| Argument | Type    | Default | Description                   |
| -------- | ------- | ------- | ----------------------------- |
| `spec`   | `{}`    | **`!`** | component class specification |
| `=>`     | `mixed` |         | component class               |
