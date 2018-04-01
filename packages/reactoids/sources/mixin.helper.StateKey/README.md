# StateKeyMixin

Provides helper functions to work with nested state values.

[Mixins](#mixins)  
[Methods](#methods)  


## Mixins

[`BaseKeyMixin`](../mixin.meta.BaseKey/README.md)  


## Methods

[`BaseKeyMixin`](../mixin.meta.BaseKey/README.md#methods) with `State` as `Name`:  
[`method.getStateKey: ( key?: string, defaultValue?: mixed ) => mixed`](../mixin.meta.BaseKey/README.md#methodgetnamekey)  
[`method.getStateKeys: ( keys?: Array< string >, defaultValue?: mixed ) => { [ string ]: mixed }`](../mixin.meta.BaseKey/README.md#methodgetnamekeys)  
[`method.updateStateKey: ( key?: string, updater: ( value: mixed ) => mixed, callback?: () => void ) => void`](../mixin.meta.BaseKey/README.md#methodupdatenamekey)  
[`method.updateStateKeys: ( updaters?: { [ string ]: ( value: mixed) => mixed }, callback?: () => void ) => void`](../mixin.meta.BaseKey/README.md#methodupdatenamekeys)  
[`method.setStateKey: ( key?: string, value?: mixed, callback?: () => void ) => void`](../mixin.meta.BaseKey/README.md#methodsetnamekey)  
[`method.setStateKeys: ( values?: { [ string ]: mixed }, callback?: () => void ) => void`](../mixin.meta.BaseKey/README.md#methodsetnamekeys)  
[`method.toggleStateKey: ( key?: string, callback?: () => void ) => void`](../mixin.meta.BaseKey/README.md#methodtogglenamekey)  
[`method.toggleStateKeys: ( keys?: Array< string >, callback?: () => void ) => void`](../mixin.meta.BaseKey/README.md#methodtogglenamekeys)  
[`method.increaseStateKey: ( key?: string, delta: number, callback?: () => void ) => void`](../mixin.meta.BaseKey/README.md#methodincreasenamekey)  
[`method.increaseStateKeys: ( deltas?: { [ string ]: number }, callback?: () => void ) => void`](../mixin.meta.BaseKey/README.md#methodincreasenamekeys)  
[`method.defaultStateKey: ( key?: string, defaultValue?: mixed, callback?: () => void ) => void`](../mixin.meta.BaseKey/README.md#methoddefaultnamekey)  
[`method.defaultStateKeys: ( defaultValues?: { [ string ]: mixed }, callback?: () => void ) => void`](../mixin.meta.BaseKey/README.md#methoddefaultnamekeys)  
[`method.unsetStateKey: ( key?: string, callback?: () => void ) => void`](../mixin.meta.BaseKey/README.md#methodunsetnamekey)  
[`method.unsetStateKeys: ( keys?: Array< string >, callback?: () => void ) => void`](../mixin.meta.BaseKey/README.md#methodunsetnamekeys)  
