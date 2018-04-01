# AjaxMixin

Sends jquery [ajaxes](https://api.jquery.com/jQuery.ajax/). All pending ajaxes will be automatically aborted on umnount.  

[State](#state)  
[Methods](#methods)  


## State

[`state.ajaxes: { [ name: string ]: true }`](#stateajaxes)  


### state.ajaxes

`{ [ name: string ]: true }`

Object where keys are names of waiting ajaxes.


## Methods

[`method.sendAjax: ( name: string, options: {} ) => void`](#methodsendajax)  
[`method.isWaitingAjax: ( name?: string ) => boolean`](#methodiswaitingajax)  
[`method.abortAjax: ( name: string ) => void`](#methodabortajax)  


### method.sendAjax

`( name: string, options: {} ) => void`

Sends ajax.  

| Argument  | Type     | Default | Description                                                                          |
| --------- | -------- | ------- | ------------------------------------------------------------------------------------ |
| `name`    | `string` | **`!`** | name to associate with ajax                                                          |
| `options` | `{}`     | **`!`** | jquery ajax call [options](https://api.jquery.com/jQuery.ajax/#jQuery-ajax-settings) |
| `=>`      | `void`   |         |                                                                                      |


### method.isWaitingAjax

`( name?: string ) => boolean`

If name is absent returns whenever any ajax calls is pending, if name is present - whenever ajax call with such key is pending.  

| Argument | Type      | Default | Description               |
| -------- | --------- | ------- | ------------------------- |
| `name`   | `string`  | `-`     | name associated with ajax |
| `=>`     | `boolean` |         |                           |


### method.abortAjax

`( name: string ) => void`

Aborts ajax call.  

| Argument | Type     | Default | Description               |
| -------- | -------- | ------- | ------------------------- |
| `name`   | `string` | **`!`** | name associated with ajax |
| `=>`     | `void`   |         |                           |
