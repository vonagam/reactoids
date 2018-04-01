# ToggleMixin

Toggles on and off component reacting to some change in props or state.

[Args](#args)  
[Methods](#methods)  


## Args

[`arg.name: string`](#argname)  
[`arg.toggle: ( that, bool: boolean ) => void`](#argtoggle)  
[`arg.checks: { [ hook: string ]: FuncedThat0< boolean > }`](#argchecks)  


### arg.name

`string`

Name to differentiate instances of mixin.

**Default:** ""


### arg.toggle

`( that, bool: boolean ) => void`

Function which handles toggling component on or off.

| Argument | Type      | Description            |
| -------- | --------- | ---------------------- |
| `that`   | `mixed`   | component instance     |
| `bool`   | `boolean` | true - on, false - off |
| `=>`     | `void`    |                        |

**Required**


### arg.checks

`{ [ hook: string ]: FuncedThat0< boolean > }`

Object with keys named for component lifecycle hook and value of funced boolean, indicating whenever component should be toggled on or off.

**Default:** `{ componentDidMount: true }` - toggled on after mount.


## Methods

[`method.is{Name}Toggled: () => boolean`](#methodisnametoggled)  


### method.is{Name}Toggled

`() => boolean`

Returns whenever this component toggled on or off.
