# ScriptInjectorMixin

Injects scripts into document head, optionally calls callback after added scripts have loaded.  

[Args](#args)  


## Args

[`arg.scripts`](#argscripts)  
[`arg.filterScript`](#argfilterscript)  
[`arg.decorateScript`](#argdecoratescript)  
[`arg.callback`](#argcallback)  


### arg.scripts

`FuncedThat0< Array< string > >`

Array of scripts urls.

**Required**  


### arg.filterScript

`( that, script: string ) => boolean`

Filter scripts which was not already added.  

| Argument | Type      | Description                                          |
| -------- | --------- | ---------------------------------------------------- |
| `that`   | `mixed`   | component instance                                   |
| `script` | `string`  | url for script src attribute                         |
| `=>`     | `boolean` | true - should be injected, false - should be skipped |

**Default:** false - if script with same src already present in document, true - otherwise.  


### arg.decorateScript

`( that, script: HTMLScriptElement ) => void`

Operates on script tag before it injected into document's head.  

| Argument | Type                | Description        |
| -------- | ------------------- | ------------------ |
| `that`   | `mixed`             | component instance |
| `script` | `HTMLScriptElement` |                    |
| `=>`     | `void`              |                    |

**Default:** noop.  


### arg.callback

`( that ) => void`

Called when all injected scripts have loaded.

**Default:** noop.  
