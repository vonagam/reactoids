# ComponentMixin

Adds standart set of mixins.

[Args](#args)  
[Mixins](#mixins)  
[Props](#props)  
[Context](#context)  
[Methods](#methods)  


## Args

[`arg.pure: bool`](#argpure)  
[`arg.classes: false | {}`](#argclasses)  
[`arg.strings: false | Array< string >`](#argstrings)  
[`arg.slots: false | { [ name: string ]: FuncedThat2< {}, {}, React.Node > }`](#argslots)  

[`PureRenderMixin`](../mixin.limit.PureRender/README.md#args) if [`arg.pure`](#argpure):  
[`arg.purifiedPaths: Array< string >`](../mixin.limit.PureRender/README.md#argpurifiedpaths)  
[`arg.dirtiedPaths: Array< string >`](../mixin.limit.PureRender/README.md#argdirtiedpaths)  


### arg.pure

`bool`

Should [`PureRenderMixin`](../mixin.limit.PureRender/README.md) be included.

**Default:** true.


### arg.classes

`false | {}`

If false - [`ClassedMixin`](../mixin.customization.Classed/README.md) will not be included, otherwise passed to its [`arg.classes`](../mixin.customization.Classed/README.md#argclasses).

**Default:** Empty object.


### arg.strings

`false | Array< string >`

If false - [`StringedMixin`](../mixin.customization.Stringed/README.md) will not be included, otherwise passed to its [`arg.strings`](../mixin.customization.Stringed/README.md#argstrings).

**Default:** false.


### arg.slots

`false | { [ name: string ]: FuncedThat2< {}, {}, React.Node > }`

If false - [`RenderSlotsMixin`](../mixin.customization.RenderSlots/README.md) will not be included, otherwise passed to its [`arg.slots`](../mixin.customization.RenderSlots/README.md#argslots).

**Default:** false.


## Mixins

[`PureRenderMixin`](../mixin.limit.PureRender/README.md) if [`arg.pure`](#argpure)  
[`ClassedMixin`](../mixin.customization.Classed/README.md) if [`arg.classes`](#argclasses)  
[`StringedMixin`](../mixin.customization.Stringed/README.md) if [`arg.strings`](#argstrings)  
[`RenderSlotsMixin`](../mixin.customization.RenderSlots/README.md) if [`arg.slots`](#argslots)  
[`StateKeyMixin`](../mixin.helper.StateKey/README.md)  
[`OmitPropsMixin`](../mixin.helper.OmitProps/README.md)  
[`RefMixin`](../mixin.helper.Ref/README.md)  
[`DomMixin`](../mixin.helper.Dom/README.md)  
[`CallbackMixin`](../mixin.helper.Callback/README.md)  
[`CacheMixin`](../mixin.helper.Cache/README.md)  


## Props

[`ClassedMixin`](../mixin.customization.Classed/README.md#props) if [`arg.classes`](#argclasses):  
[`prop.className: FuncedThat< OneOrArray< string | {} > >`](../mixin.customization.Classed/README.md#propclassName)  
[`prop.classNameContexted: boolean`](../mixin.customization.Classed/README.md#propclassnamecontexted)  

[`StringedMixin`](../mixin.customization.Stringed/README.md#props) if [`arg.strings`](#argstrings):  
[`prop.strings: FuncedThat0< OneOrArray< { [ string ]: Funced2< mixed, that, string > } > >`](../mixin.customization.Stringed/README.md#propstrings)  

[`RenderSlotsMixin`](../mixin.customization.RenderSlots/README.md#props) if [`arg.slots`](#argslots):  
[`prop.{slot}: FuncedThat< {} >`](../mixin.customization.RenderSlots/README.md#propslot)  
[`prop.render{Slot}: FuncedThat2< {}, {}, React.Node >`](../mixin.customization.RenderSlots/README.md#proprenderslot)  

[`OmitPropsMixin`](../mixin.helper.OmitProps/README.md#props):  
[`prop.omitProps: Array< string >`](../mixin.helper.OmitProps/README.md#propomitprops)  


## Context

[`ClassedMixin`](../mixin.customization.Classed/README.md#context) if [`arg.classes`](#argclasses):  
[`context.getClassNames: ( id: string, constructor: mixed, keys: Array< string >, that: mixed ) => OneOrArray< string | {} >`](../mixin.customization.Classed/README.md#contextgetclassnames)  

[`StringedMixin`](../mixin.customization.Stringed/README.md#context) if [`arg.strings`](#argstrings):  
[`context.getStrings: ( id: string, constructor: mixed, keys: Array< string >, that ) => ...`](../mixin.customization.Stringed/README.md#contextgetstrings)  


## Methods

[`ClassedMixin`](../mixin.customization.Classed/README.md#methods) if [`arg.classes`](#argclasses):  
[`method.mergeClassNames: ( ...classNames: Array< OneOrArray< string | {} > > ) => OneOrArray< string | {} >`](../mixin.customization.Classed/README.md#methodmergeclassnames)  
[`method.classed: ( path: string, modifiers: { [ string ]: boolean | string | number } ) => OneOrArray< string | {} >`](../mixin.customization.Classed/README.md#methodclassed)  

[`StringedMixin`](../mixin.customization.Stringed/README.md#methods) if [`arg.strings`](#argstrings):  
[`method.stringed: ( key: string, params?: mixed ) => ?string`](../mixin.customization.Stringed/README.md#methodstringed)  

[`RenderSlotsMixin`](../mixin.customization.RenderSlots/README.md#methods) if [`arg.slots`](#argslots):  
[`method.render{Slot}: ( slotArgs: {} ) => React.Node`](../mixin.customization.RenderSlots/README.md#methodrenderslot)  

[`StateKeyMixin`](../mixin.helper.StateKey/README.md#methods):  
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

[`OmitPropsMixin`](../mixin.helper.OmitProps/README.md#methods):  
[`prop.omitProps: Array< string >`](../mixin.helper.OmitProps/README.md#propomitprops)  

[`RefMixin`](../mixin.helper.Ref/README.md#methods):  
[`method.refSetter: ( key: string, options?: mixed ) => ( ?HTMLElement ) => void`](../mixin.helper.Ref/README.md#methodrefsetter)  

[`DomMixin`](../mixin.helper.Dom/README.md#methods):  
[`method.dom: ( input: void | string | mixed ) => null | Element | Text`](../mixin.helper.Dom/README.md#methoddom)  

[`CallbackMixin`](../mixin.helper.Callback/README.md#methods):  
[`method.callback: ( keys: OneOrArray< string > ) => ( ...args: Array< mixed > ) => void`](../mixin.helper.Callback/README.md#methodcallback)  

[`CacheMixin`](../mixin.helper.Cache/README.md#methods):  
[`method.cache: ( key: string, options: {} ) => mixed`](../mixin.helper.Cache/README.md#methodcache)  
[`method.clearCache: ( key?: string ) => void`](../mixin.helper.Cache/README.md#methodclearcache)  
