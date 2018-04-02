# BaseListenerMixin

Provides base for subscription helpers. Unsubscribes component on unmount.

[Args](#args)  
[Methods](#methods)  


## Args

[`arg.name`](#argname)  
[`arg.plural`](#argplural)  
[`arg.toggleListener`](#argtogglelistener)  
[`arg.initListener`](#arginitlistener)  


### arg.name

`string`

Name to differentiate instances of mixin.

**Default:** "".


### arg.plural

`boolean`

Whenever it is possible to have mutiply subscribtions for same component.

**Required**


### arg.toggleListener

`( that, data: mixed, bool: boolean, key?: string ) => void`

Toggles listener on or off.

| Argument | Type      | Description                  |
| -------- | --------- | ---------------------------- |
| `that`   | `mixed`   | component instance           |
| `data`   | `mixed`   | normalized data of listener  |
| `bool`   | `boolean` | true - on, false - off       |
| `key`\*  | `?string` | key associated with listener |
| `=>`     | `void`    |                              |

\*: is present only if [`arg.plural`](#argplural) is true.

**Required**


### arg.initListener

`( that, data: mixed, key?: string ) => mixed`

Function which handles normalization of listener data.

| Argument | Type      | Description                                                             |
| -------- | --------- | ----------------------------------------------------------------------- |
| `that`   | `mixed`   | component instance                                                      |
| `data`   | `mixed`   | unnormalized data of listener                                           |
| `key`\*  | `?string` | key associated with listener                                            |
| `=>`     | `mixed`   | normalized data for usage in [`arg.toggleListener`](#argtogglelistener) |

\*: is present only if [`arg.plural`](#argplural) argument is true.

**Default:** does not apply any normalization.


## Methods

Methods signatures shown for plural version. If [`arg.plural`](#argplural) is false, then `key` argument is absent from arguments spec.

[`method.add{Name}Listener`](#methodaddnamelistener)  
[`method.get{Name}ListenerState`](#methodgetnamelistenerstate)  
[`method.toggle{Name}Listener`](#methodtogglenamelistener)  
[`method.remove{Name}Listener`](#methodremovenamelistener)  


### method.add{Name}Listener

`( key: ?string, data: mixed, bool: boolean ) => void`

Adds listener, and toggles listener on unless bool is false.

| Argument | Type      | Default | Description                                                                                  |
| -------- | --------- | ------- | -------------------------------------------------------------------------------------------- |
| `key`    | `string`  | `-`     | key to associate with listener                                                               |
| `data`   | `mixed`   | **`!`** | unnormalized data for [`arg.initListener`](#arginitlistener)                                 |
| `bool`   | `boolean` | `true`  | whenever to pass listener to [`arg.toggleListener`](#argtogglelistener) after initialization |
| `=>`     | `void`    |         |                                                                                              |


### method.get{Name}ListenerState

`( key: string ) => ?bool`

Returns whenever listener is toggled on or off. Returns undefined if there is no listener with such key.

| Argument | Type       | Default | Description                                                     |
| -------- | ---------- | ------- | --------------------------------------------------------------- |
| `key`    | `string`   | **`!`** | key associated with listener                                    |
| `=>`     | `?boolean` |         | undefined - not present, true - toggled on, false - toggled off |


### method.toggle{Name}Listener

`( key: string, bool: boolean ) => void`

Toggles listener on or off.

| Argument | Type      | Default | Description                  |
| -------- | --------- | ------- | ---------------------------- |
| `key`    | `string`  | **`!`** | key associated with listener |
| `bool`   | `boolean` | **`!`** | desired listener state       |
| `=>`     | `void`    |         |                              |


### method.remove{Name}Listener

`( key: string ) => void`

Toggles off and removes listener.

| Argument | Type     | Default | Description                  |
| -------- | -------- | ------- | ---------------------------- |
| `key`    | `string` | **`!`** | key associated with listener |
| `=>`     | `void`   |         |                              |
