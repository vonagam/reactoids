# BaseKeyMixin

Provides helper functions to work with deep objects.

[Args](#args)  
[Methods](#methods)  


## Args

[`arg.name: string`](#argname)  
[`arg.get: ( that, props: {}, state: {} ) => mixed`](#argget)  
[`arg.set: ( that, value: mixed, callback: () => void ) => void`](#argset)  


### arg.name

`string`

Name to differentiate instances of mixin.  

**Default:** "".


### arg.get

`( that, props: {}, state: {} ) => mixed`

Gets value for component.

| Argument | Type    | Description                      |
| -------- | ------- | -------------------------------- |
| `that`   | `mixed` | component instance               |
| `props`  | `{}`    | props to use for computing value |
| `state`  | `{}`    | state to use for computing value |
| `=>`     | `mixed` | value                            |

**Required**


### arg.set

`( that, value: mixed, callback: () => void ) => void`

Sets value for component.

| Argument   | Type         | Description                       |
| ---------- | ------------ | --------------------------------- |
| `that`     | `mixed`      | component instance                |
| `value`    | `mixed`      |                                   |
| `callback` | `() => void` | to call after value have been set |
| `=>`       | `void`       |                                   |

**Required**


## Methods

[`method.get{Name}Key: ( key?: string, defaultValue?: mixed ) => mixed`](#methodgetnamekey)  
[`method.get{Name}Keys: ( keys?: Array< string >, defaultValue?: mixed ) => { [ string ]: mixed }`](#methodgetnamekeys)  
[`method.update{Name}Key: ( key?: string, updater: ( value: mixed ) => mixed, callback?: () => void ) => void`](#methodupdatenamekey)  
[`method.update{Name}Keys: ( updaters?: { [ string ]: ( value: mixed) => mixed }, callback?: () => void ) => void`](#methodupdatenamekeys)  
[`method.set{Name}Key: ( key?: string, value?: mixed, callback?: () => void ) => void`](#methodsetnamekey)  
[`method.set{Name}Keys: ( values?: { [ string ]: mixed }, callback?: () => void ) => void`](#methodsetnamekeys)  
[`method.toggle{Name}Key: ( key?: string, callback?: () => void ) => void`](#methodtogglenamekey)  
[`method.toggle{Name}Keys: ( keys?: Array< string >, callback?: () => void ) => void`](#methodtogglenamekeys)  
[`method.increase{Name}Key: ( key?: string, delta: number, callback?: () => void ) => void`](#methodincreasenamekey)  
[`method.increase{Name}Keys: ( deltas?: { [ string ]: number }, callback?: () => void ) => void`](#methodincreasenamekeys)  
[`method.default{Name}Key: ( key?: string, defaultValue?: mixed, callback?: () => void ) => void`](#methoddefaultnamekey)  
[`method.default{Name}Keys: ( defaultValues?: { [ string ]: mixed }, callback?: () => void ) => void`](#methoddefaultnamekeys)  
[`method.unset{Name}Key: ( key?: string, callback?: () => void ) => void`](#methodunsetnamekey)  
[`method.unset{Name}Keys: ( keys?: Array< string >, callback?: () => void ) => void`](#methodunsetnamekeys)  


### method.get{Name}Key

`( key?: string, defaultValue?: mixed ) => mixed`

| Argument       | Type     | Default | Description   |
| -------------- | -------- | ------- | ------------- |
| `key`          | `string` | `""`    | path to get   |
| `defaultValue` | `mixed`  | `-`     | default value |
| `=>`           | `mixed`  |         | value at path |


### method.get{Name}Keys

`( keys?: Array< string >, defaultValue?: mixed ) => { [ string ]: mixed }`

| Argument       | Type                    | Default | Description                              |
| -------------- | ----------------------- | ------- | ---------------------------------------- |
| `keys`         | `Array< string >`       | `[]`    | paths to get                             |
| `defaultValue` | `mixed`                 | `-`     | default value                            |
| `=>`           | `{ [ string ]: mixed }` |         | values object, key - path, value - value |


### method.update{Name}Key

`( key?: string, updater: ( value: mixed ) => mixed, callback?: () => void ) => void`

| Argument   | Type                 | Default | Description                                       |
| ---------- | -------------------- | ------- | ------------------------------------------------- |
| `key`      | `string`             | `""`    | path to update                                    |
| `updater`  | `( mixed ) => mixed` | **`!`** | receives current value at path, returns new value |
| `callback` | `() => void`         | `-`     | callback to execute after change applied          |
| `=>`       | `void`               |         |                                                   |


### method.update{Name}Keys

`( updaters?: { [ string ]: ( value: mixed) => mixed }, callback?: () => void ) => void`

| Argument   | Type                                 | Default | Description                              |
| ---------- | ------------------------------------ | ------- | ---------------------------------------- |
| `updaters` | `{ [ string ]: ( mixed ) => mixed }` | `{}`    | key - path, value - updater              |
| `callback` | `() => void`                         | `-`     | callback to execute after change applied |
| `=>`       | `void`                               |         |                                          |


### method.set{Name}Key

`( key?: string, value?: mixed, callback?: () => void ) => void`

| Argument   | Type         | Default | Description                              |
| ---------- | ------------ | ------- | ---------------------------------------- |
| `key`      | `string`     | `""`    | path to set at                           |
| `value`    | `mixed`      | `-`     | new value                                |
| `callback` | `() => void` | `-`     | callback to execute after change applied |
| `=>`       | `void`       |         |                                          |


### method.set{Name}Keys

`( values?: { [ string ]: mixed }, callback?: () => void ) => void`

| Argument   | Type                    | Default | Description                              |
| ---------- | ----------------------- | ------- | ---------------------------------------- |
| `values`   | `{ [ string ]: mixed }` | `{}`    | key - path, value - new value            |
| `callback` | `() => void`            | `-`     | callback to execute after change applied |
| `=>`       | `void`                  |         |                                          |


### method.toggle{Name}Key

`( key?: string, callback?: () => void ) => void`

| Argument   | Type         | Default | Description                              |
| ---------- | ------------ | ------- | ---------------------------------------- |
| `key`      | `string`     | `""`    | path to nagate at                        |
| `callback` | `() => void` | `-`     | callback to execute after change applied |
| `=>`       | `void`       |         |                                          |


### method.toggle{Name}Keys

`( keys?: Array< string >, callback?: () => void ) => void`

| Argument   | Type              | Default | Description                              |
| ---------- | ----------------- | ------- | ---------------------------------------- |
| `values`   | `Array< string >` | `[]`    | paths to negate values at                |
| `callback` | `() => void`      | `-`     | callback to execute after change applied |
| `=>`       | `void`            |         |                                          |


### method.increase{Name}Key

`( key?: string, delta: number, callback?: () => void ) => void`

| Argument   | Type         | Default | Description                              |
| ---------- | ------------ | ------- | ---------------------------------------- |
| `key`      | `string`     | `""`    | path to add to                           |
| `delta`    | `number`     | **`!`** |                                          |
| `callback` | `() => void` | `-`     | callback to execute after change applied |
| `=>`       | `void`       |         |                                          |


### method.increase{Name}Keys

`( deltas?: { [ string ]: number }, callback?: () => void ) => void`

| Argument   | Type                     | Default | Description                              |
| ---------- | ------------------------ | ------- | ---------------------------------------- |
| `deltas`   | `{ [ string ]: number }` | `{}`    | key - path, value - delta to add         |
| `callback` | `() => void`             | `-`     | callback to execute after change applied |
| `=>`       | `void`                   |         |                                          |


### method.default{Name}Key

`( key?: string, defaultValue?: mixed, callback?: () => void ) => void`

| Argument       | Type         | Default | Description                              |
| -------------- | ------------ | ------- | ---------------------------------------- |
| `key`          | `string`     | `""`    | path to add to                           |
| `defaultValue` | `mixed`      | `-`     | default value to set if currently absent |
| `callback`     | `() => void` | `-`     | callback to execute after change applied |
| `=>`           | `void`       |         |                                          |


### method.default{Name}Keys

`( defaultValues?: { [ string ]: mixed }, callback?: () => void ) => void`

| Argument        | Type                    | Default | Description                                                  |
| --------------- | ----------------------- | ------- | ------------------------------------------------------------ |
| `defaultValues` | `{ [ string ]: mixed }` | `{}`    | key - path, value - default value to set if currently absent |
| `callback`      | `() => void`            | `-`     | callback to execute after change applied                     |
| `=>`            | `void`                  |         |                                                              |


### method.unset{Name}Key

`( key?: string, callback?: () => void ) => void`

| Argument   | Type         | Default | Description                              |
| ---------- | ------------ | ------- | ---------------------------------------- |
| `key`      | `string`     | `-`     | path to unset                            |
| `callback` | `() => void` | `-`     | callback to execute after change applied |
| `=>`       | `void`       |         |                                          |


### method.unset{Name}Keys

`( keys?: Array< string >, callback?: () => void ) => void`

| Argument   | Type              | Default | Description                              |
| ---------- | ----------------- | ------- | ---------------------------------------- |
| `values`   | `Array< string >` | `[]`    | paths to unset                           |
| `callback` | `() => void`      | `-`     | callback to execute after change applied |
| `=>`       | `void`            |         |                                          |
