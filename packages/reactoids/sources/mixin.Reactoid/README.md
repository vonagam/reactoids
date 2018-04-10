# ReactoidMixin

Adds standart set of mixins.

[Args](#args)  
[Mixins](#mixins)  
[Props](#props)  
[Methods](#methods)  


## Args

[`arg.pure`](#argpure)  
[`arg.classes`](#argclasses)  
[`arg.strings`](#argstrings)  
[`arg.slots`](#argslots)  

[`PureRenderMixin`](../mixin.limit.PureRender/README.md#args) if [`arg.pure`](#argpure):  
[`arg.purifiedPaths`](../mixin.limit.PureRender/README.md#argpurifiedpaths)  
[`arg.dirtiedPaths`](../mixin.limit.PureRender/README.md#argdirtiedpaths)  


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
[`prop.className`](../mixin.customization.Classed/README.md#propclassName)  

[`StringedMixin`](../mixin.customization.Stringed/README.md#props) if [`arg.strings`](#argstrings):  
[`prop.strings`](../mixin.customization.Stringed/README.md#propstrings)  

[`RenderSlotsMixin`](../mixin.customization.RenderSlots/README.md#props) if [`arg.slots`](#argslots):  
[`prop.{slot}`](../mixin.customization.RenderSlots/README.md#propslot)  
[`prop.render{Slot}`](../mixin.customization.RenderSlots/README.md#proprenderslot)  

[`OmitPropsMixin`](../mixin.helper.OmitProps/README.md#props):  
[`prop.omitProps`](../mixin.helper.OmitProps/README.md#propomitprops)  


## Methods

[`ClassedMixin`](../mixin.customization.Classed/README.md#methods) if [`arg.classes`](#argclasses):  
[`method.mergeClassNames`](../mixin.customization.Classed/README.md#methodmergeclassnames)  
[`method.classed`](../mixin.customization.Classed/README.md#methodclassed)  

[`StringedMixin`](../mixin.customization.Stringed/README.md#methods) if [`arg.strings`](#argstrings):  
[`method.stringed`](../mixin.customization.Stringed/README.md#methodstringed)  

[`RenderSlotsMixin`](../mixin.customization.RenderSlots/README.md#methods) if [`arg.slots`](#argslots):  
[`method.render{Slot}`](../mixin.customization.RenderSlots/README.md#methodrenderslot)  

[`StateKeyMixin`](../mixin.helper.StateKey/README.md#methods):  
[`method.getStateKey`](../mixin.meta.BaseKey/README.md#methodgetnamekey)  
[`method.getStateKeys`](../mixin.meta.BaseKey/README.md#methodgetnamekeys)  
[`method.updateStateKey`](../mixin.meta.BaseKey/README.md#methodupdatenamekey)  
[`method.updateStateKeys`](../mixin.meta.BaseKey/README.md#methodupdatenamekeys)  
[`method.setStateKey`](../mixin.meta.BaseKey/README.md#methodsetnamekey)  
[`method.setStateKeys`](../mixin.meta.BaseKey/README.md#methodsetnamekeys)  
[`method.toggleStateKey`](../mixin.meta.BaseKey/README.md#methodtogglenamekey)  
[`method.toggleStateKeys`](../mixin.meta.BaseKey/README.md#methodtogglenamekeys)  
[`method.increaseStateKey`](../mixin.meta.BaseKey/README.md#methodincreasenamekey)  
[`method.increaseStateKeys`](../mixin.meta.BaseKey/README.md#methodincreasenamekeys)  
[`method.defaultStateKey`](../mixin.meta.BaseKey/README.md#methoddefaultnamekey)  
[`method.defaultStateKeys`](../mixin.meta.BaseKey/README.md#methoddefaultnamekeys)  
[`method.unsetStateKey`](../mixin.meta.BaseKey/README.md#methodunsetnamekey)  
[`method.unsetStateKeys`](../mixin.meta.BaseKey/README.md#methodunsetnamekeys)  

[`OmitPropsMixin`](../mixin.helper.OmitProps/README.md#methods):  
[`prop.omitProps`](../mixin.helper.OmitProps/README.md#propomitprops)  

[`RefMixin`](../mixin.helper.Ref/README.md#methods):  
[`method.refSetter`](../mixin.helper.Ref/README.md#methodrefsetter)  

[`DomMixin`](../mixin.helper.Dom/README.md#methods):  
[`method.dom`](../mixin.helper.Dom/README.md#methoddom)  

[`CallbackMixin`](../mixin.helper.Callback/README.md#methods):  
[`method.callback`](../mixin.helper.Callback/README.md#methodcallback)  

[`CacheMixin`](../mixin.helper.Cache/README.md#methods):  
[`method.cache`](../mixin.helper.Cache/README.md#methodcache)  
[`method.clearCache`](../mixin.helper.Cache/README.md#methodclearcache)  
