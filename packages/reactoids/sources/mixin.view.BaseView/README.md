# BaseViewMixin

Provides capturing and handling link clicks and form submits inside component.

[Args](#args)  
[Mixins](#mixins)  
[Methods](#methods)  


## Args

[`arg.filterLink`](#argfilterlink)  
[`arg.handleLink`](#arghandlelink)  
[`arg.filterForm`](#argfilterform)  
[`arg.handleForm`](#arghandleform)  


### arg.filterLink

`( that, link: HTMLAnchorElement ) => boolean`

Decides whenever mixin should handle link click or default behavior should take place.

| Argument | Type                | Description                                                                      |
| -------- | ------------------- | -------------------------------------------------------------------------------- |
| `that`   | `mixed`             | component instance                                                               |
| `link`   | `HTMLAnchorElement` |                                                                                  |
| `=>`     | `boolean`           | true - process with [`arg.handleLink`](#arghandlelink), false - default behavior |

**Default:** returns true for links with same domain, http/https protocol and without or with `"_self"` as `target` attribute.


### arg.handleLink

`( that, link: HTMLAnchorElement ) => boolean`

Handles clicked link passed through [`arg.filterLink`](#argfilterlink). If returns false - default behavior still takes place.

| Argument | Type                | Description                                             |
| -------- | ------------------- | ------------------------------------------------------- |
| `that`   | `mixed`             | component instance                                      |
| `link`   | `HTMLAnchorElement` |                                                         |
| `=>`     | `boolean`           | true - processed successfully, false - default behavior |

**Default:** always returns false, default behavior takes place.


### arg.filterForm

`( that, link: HTMLFormElement ) => boolean`

Decides whenever mixin should handle form submit or default behavior should take place.

| Argument | Type              | Description                                                                      |
| -------- | ----------------- | -------------------------------------------------------------------------------- |
| `that`   | `mixed`           | component instance                                                               |
| `form`   | `HTMLFormElement` |                                                                                  |
| `=>`     | `boolean`         | true - process with [`arg.handleForm`](#arghandleform), false - default behavior |

**Default:** returns true for forms with same domain, http/https protocol and without or with `"_self"` as [`target`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/target) attribute.


### arg.handleForm

`( that, link: HTMLFormElement ) => boolean`

Handles submited form passed through [`arg.filterForm`](#argfilterform). If returns false - default behavior still takes place.

| Argument | Type              | Description                                             |
| -------- | ----------------- | ------------------------------------------------------- |
| `that`   | `mixed`           | component instance                                      |
| `form`   | `HTMLFormElement` |                                                         |
| `=>`     | `boolean`         | true - processed successfully, false - default behavior |

**Default:** always returns false, default behavior takes place.


## Mixins

[`EventListenerMixin`](../mixin.utility.EventListener/README.md)


## Methods

[`EventListenerMixin`](../mixin.utility.EventListener/README.md#methods):  
[`method.addEventListener`](../mixin.utility.EventListener/README.md#methodaddeventlistener)  
[`method.getEventListenerState`](../mixin.meta.BaseListener/README.md#methodgetnamelistenerstate)  
[`method.toggleEventListener`](../mixin.meta.BaseListener/README.md#methodtogglenamelistener)  
[`method.removeEventListener`](../mixin.meta.BaseListener/README.md#methodremovenamelistener)  
