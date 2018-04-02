# WatchedMixin

Periodically checks component for change in some value and executes callback on change.  

[Args](#args)  
[Mixins](#mixins)  
[Methods](#methods)  


## Args

[`arg.name`](#argname)  
[`arg.getValue`](#arggetvalue)  
[`arg.onChange`](#argonchange)  

[`UnisonMixin`](../mixin.unison.Unison/README.md#args):  
[`arg.interval`](#arginterval)  
[`arg.shouldSkip`](#argshouldskip)  
[`arg.checks`](#argchecks)  


### arg.name

`string`

Name to differentiate instances of mixin.  

**Default:** ""  


### arg.getValue

`( that ) => mixed`

Getter for value, which will be used on each iteration to compare with previous one.  

**Required**


### arg.onChange

`( that, currValue: mixed, prevValue: mixed ) => void`

Callback to call when current iteration value differs from previous one.  

| Argument    | Type    | Description              |
| ----------- | ------- | ------------------------ |
| `that`      | `mixed` | component instance       |
| `currValue` | `mixed` | current iteration value  |
| `prevValue` | `mixed` | previous iteration value |
| `=>`        | `void`  |                          |

**Required**


### arg.interval

`number`

Number of milliseconds between check iterations.  

**Required**  


### arg.shouldSkip

`() => boolean`

Returns whenever this iteration of value checking should be skipped.  

**Default:** always false.  


### arg.checks

`{ [ hook: string ]: FuncedThat< boolean > }`

Object with keys named for component lifecycle hook and value of funced boolean, indicating whenever component should perfom checks.  

**Default:** `{ componentDidMount: true }` - starts on mount and checks every iteration (unless skiped by [`arg.shouldSkip`](#argshouldskip)).  


## Mixins

[`UnisonMixin`](../mixin.unison.Unison/README.md)  


## Methods

[`UnisonMixin`](../mixin.unison.Unison/README.md#methods) with `{Name}Watching` as `Name`:  
[`method.is{Name}WatchingUnisonToggled`](../mixin.meta.Toggle/README.md#methodisnametoggled)  
