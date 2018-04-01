# EventListenerMixin

Subscribes to html events. All subscribtions will be automatically revoked on umnount.

[Mixins](#mixins)  
[Methods](#methods)  


## Mixins

[`BaseListenerMixin`](../mixin.meta.BaseListener/README.md)  


## Methods

[`BaseListenerMixin`](../mixin.meta.BaseListener/README.md#methods) with `Event` as `Name`:  
[`method.addEventListener: ( key: string, data: {}, bool: boolean ) => void`](#methodaddeventlistener)  
[`method.getEventListenerState: ( key: string ) => ?bool`](../mixin.meta.BaseListener/README.md#methodgetnamelistenerstate)  
[`method.toggleEventListener: ( key: string, bool: boolean ) => void`](../mixin.meta.BaseListener/README.md#methodtogglenamelistener)  
[`method.removeEventListener: ( key: string ) => void`](../mixin.meta.BaseListener/README.md#methodremovenamelistener)  


### method.addEventListener

```
( 
  key: string, 
  data: { event: string, callback: Function, target?: mixed, jquery?: boolean, selector?: mixed },
  bool: boolean
) => void
```

Adds listener and toggles it on unless `bool` is false.  

| Argument              | Type       | Default    | Description                                                                        |
| --------------------- | ---------- | ---------- | ---------------------------------------------------------------------------------- |
| `key`                 | `string`   | **`!`**    | key to associate with listener                                                     |
| `data`                | `{}`       | **`!`**    | options for creating listener                                                      |
| `data.event`          | `string`   | **`!`**    | name of listened event                                                             |
| `data.callback`\*     | `Function` | **`!`**    | callback for event                                                                 |
| `data.target`\*\*     | `mixed`    | `document` | which html node will have listener attached to                                     |
| `data.jquery`         | `boolean`  | `true`     | if true - uses jquery on/off methods, false - addEventListener/removeEventListener |
| `data.selector`\*\*\* | `string`   | `-`        | selector to use with jquery for filtering                                          |
| `bool`                | `boolean`  | `true`     | whenever toggle listener on after adding or not                                    |
| `=>`                  | `void`     |            |                                                                                    |

\*: signature of function and effects of return value depends on `jquery` option value.  
\*\*: target can be selector string or jquery object if jquery is true.  
\*\*\*: only used if jquery is true.  
