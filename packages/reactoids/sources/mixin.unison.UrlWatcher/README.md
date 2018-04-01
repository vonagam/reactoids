# UrlWatcherMixin

Watches [`window.location`](https://developer.mozilla.org/en-US/docs/Web/API/Window/location) and executes callback on change.

[Args](#args)  
[Mixins](#mixins)  
[Methods](#methods)  


## Args

[`arg.name: string`](#argname)  

[`UnisonMixin`](../mixin.unison.Unison/README.md#args):  
[`arg.update: ( that ) => void`](#argupdate)  
[`arg.interval: number`](#arginterval)  
[`arg.shouldSkip: () => boolean`](#argshouldskip)  
[`arg.checks: { [ hook: string ]: FuncedThat< boolean > }`](#argchecks)  


### arg.name

`string`

Name to differentiate instances of mixin.  

**Default:** ""  


### arg.update

`( that ) => void`

Callback to call when location href changes.  

**Default:** Calls [`forceUpdate`](https://reactjs.org/docs/react-component.html#forceupdate).


### arg.interval

`number`

Number of milliseconds between check iterations.  

**Default:** 50.  


### arg.shouldSkip

`( currHref: string, prevHref: string ) => boolean`

Returns whenever this change of href should skip callback execution.    

| Argument   | Type      | Description                      |
| ---------- | --------- | -------------------------------- |
| `currHref` | `string`  | current href                     |
| `prevHref` | `string`  | previous href                    |
| `=>`       | `boolean` | whenever skip callback execution |

**Default:** always false.  


### arg.checks

`{ [ hook: string ]: FuncedThat< boolean > }`

Object with keys named for component lifecycle hook and value of funced boolean, indicating whenever component should listen to href changes.  

**Default:** `{ componentDidMount: true }` - starts on mount and listens till unmount.


## Mixins

[`UnisonMixin`](../mixin.unison.Unison/README.md)  


## Methods

[`UnisonMixin`](../mixin.unison.Unison/README.md#methods) with `{Name}UrlWatch` as `Name`:  
[`method.is{Name}UrlWatchUnisonToggled: () => boolean`](../mixin.meta.Toggle/README.md#methodisnametoggled)  
