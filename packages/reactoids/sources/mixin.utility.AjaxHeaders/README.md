# AjaxHeadersMixin

Adds custom headers to outcoming jquery [ajax](https://api.jquery.com/jQuery.ajax/) calls.

[Args](#args)  
[Mixins](#mixins)  
[Methods](#methods)  


## Args

[`arg.headers`](#argheaders)  
[`arg.filterRequest`](#argfilterrequest)  


### arg.headers

`FuncedThat0< { [ string ]: FuncedThat1< {}, string > } >`

Headers objects with header name as key and header value as value. If value is undefined header will not be set.

Value function:

| Argument  | Type     | Description                                                                          |
| --------- | -------- | ------------------------------------------------------------------------------------ |
| `that`    | `mixed`  | component instance                                                                   |
| `options` | `{}`     | jquery ajax call [options](https://api.jquery.com/jQuery.ajax/#jQuery-ajax-settings) |
| `=>`      | `string` |                                                                                      |

**Required**


### arg.filterRequest

`( that, options: {} ) => boolean`

Receives jquery ajax call options and returns whenever headers should be added for this request.

| Argument  | Type      | Description                                                                          |
| --------- | --------- | ------------------------------------------------------------------------------------ |
| `that`    | `mixed`   | component instance                                                                   |
| `options` | `{}`      | jquery ajax call [options](https://api.jquery.com/jQuery.ajax/#jQuery-ajax-settings) |
| `=>`      | `boolean` | true - allows headers to be set, false - skips headers                               |

**Default:** false for crossdomain ajax calls.


## Mixins

[`EventListenerMixin`](../mixin.utility.EventListener/README.md)  


## Methods

[`EventListenerMixin`](../mixin.utility.EventListener/README.md#methods):  
[`method.addEventListener`](../mixin.utility.EventListener/README.md#methodaddeventlistener)  
[`method.getEventListenerState`](../mixin.meta.BaseListener/README.md#methodgetnamelistenerstate)  
[`method.toggleEventListener`](../mixin.meta.BaseListener/README.md#methodtogglenamelistener)  
[`method.removeEventListener`](../mixin.meta.BaseListener/README.md#methodremovenamelistener)  
