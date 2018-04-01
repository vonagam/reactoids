# UnisonMixin

Keeps references to mounted components and periodically performs specified operation on them.  

[Args](#args)  
[Mixins](#mixins)  
[Methods](#methods)  


## Args

[`arg.name: string`](#argname)  
[`arg.update: ( that ) => void`](#argupdate)  
[`arg.interval: number`](#arginterval)  
[`arg.shouldSkip: () => boolean`](#argshouldskip)  

[`ToggleMixin`](../mixin.meta.Toggle/README.md#args):  
[`arg.checks: { [ hook: string ]: FuncedThat< boolean > }`](#argchecks)  


### arg.name

`string`

Name to differentiate instances of mixin.  

**Default:** ""  


### arg.update

`( that ) => void`

Function to execute every iteration.  

**Required**  


### arg.interval

`number`

Number of milliseconds between iterations.  

**Required**  


### arg.shouldSkip

`() => boolean`

Returns whenever this iteration of operations should be skipped.

**Default:** always false.  


### arg.checks

`{ [ hook: string ]: FuncedThat< boolean > }`

Object with keys named for component lifecycle hook and value of funced boolean, indicating whenever component should participate in iterations.  

**Default:** `{ componentDidMount: true }` - starts on mount and participates till unmount. 


## Mixins

[`ToggleMixin`](../mixin.meta.Toggle/README.md)  


## Methods

[`ToggleMixin`](../mixin.meta.Toggle/README.md#methods) with `{Name}Unison` as `Name`:  
[`method.is{Name}UnisonToggled: () => boolean`](../mixin.meta.Toggle/README.md#methodisnametoggled)  
