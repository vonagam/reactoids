# InputMixin

Interface for custom inputs.

[Args](#args)  
[Mixins](#mixins)  
[Props](#props)  
[State](#state)  
[Methods](#methods)  


## Args

[`arg.valueType: Function`](#argvaluetype)  
[`arg.defaultValue: mixed`](#argdefaultvalue)  
[`arg.validateValue: ( that, value: mixed ) => ?string`](#argvalidatevalue)  
[`arg.inputDelay: number`](#arginputdelay)  


### arg.valueType

`Function`

[`PropType`](https://reactjs.org/docs/typechecking-with-proptypes.html) for value.

**Default:** `PropType.any`.


### arg.defaultValue

`mixed`

Default value.

**Default:** none.


### arg.validateValue

`( that, value: mixed ) => ?string`

Returns error message if value is invalid.

| Argument | Type      | Description        |
| -------- | --------- | ------------------ |
| `that`   | `mixed`   | component instance |
| `value`  | `mixed`   |                    |
| `=>`     | `?string` | error message      |

**Default:** noop.


### arg.inputDelay

`number`

Delay in milliseconds between temp value change transfers to real value change.
Zero delay means that calling [`method.setTempValue`](#methodsettempvaue) is the same as calling [`method.setValue`](#methodsetvalue).
Negative delay means that temp value will not automatically transfered to real value.

**Default**: 100.


## Mixins

[`BaseKeyMixin`](../mixin.meta.BaseKey/README.md)  
[`FocusMixin`](../mixin.interface.Focus/README.md)  


## Props

[`prop.value: mixed`](#propvalue)
[`prop.defaultValue: mixed`](#propdefaultvalue)
[`prop.onChange: ( value: mixed ) => void`](#proponchange)  
[`prop.onTempChange: ( tempValue: mixed ) => void`](#propontempchange)  
[`prop.inputDelay: number`](#propinputdelay)  
[`prop.readOnly: boolean`](#propreadonly)  
[`prop.disabled: boolean`](#propdisabled)  
[`prop.validate: ( that, value: mixed ) => ?string`](#propvalidate)  


### prop.value

`mixed`

Value for [controlled input](https://reactjs.org/docs/forms.html#controlled-components) of type [`arg.valueType`](#argvaluetype).


### prop.defaultValue

`mixed`

Default value for [unconrolled input](https://reactjs.org/docs/uncontrolled-components.html#default-values) of type [`arg.valueType`](#argvaluetype).

**Default**: value specified in [`arg.defaultValue`](#argdefaultvalue).


### prop.onChange

`( value: mixed ) => void`

Callback for real value change.


### prop.onTempChange

`( tempValue: mixed ) => void`

Callback for temp value change.


### prop.inputDelay

`number`

Overwrites value in [`arg.inputDelay`](#arginputdelay).

**Default**: value specified in [`arg.inputDelay`](#arginputdelay).


### prop.readOnly

`boolean`

Calling [`method.setTempValue`](#methodsettempvaue) or [`method.setValue`](#methodsetvalue) will not have any effect.
Difference with [`prop.disabled`](#propdisabled) is that readonly input values still should be sent with form submission.


### prop.disabled

`boolean`

Calling [`method.setTempValue`](#methodsettempvaue) or [`method.setValue`](#methodsetvalue) will not have any effect.
Difference with [`prop.readOnly`](#propreadonly) is that disabled input values should not be sent with form submission.


### prop.validate

`( that, value: mixed ) => ?string`

Additional custom validation, called after [`arg.validateValue`](#argvalidatevalue) if it has not found any errors.

| Argument | Type      | Description        |
| -------- | --------- | ------------------ |
| `that`   | `mixed`   | component instance |
| `value`  | `mixed`   |                    |
| `=>`     | `?string` | error message      |


## State

[`state.valueTemp: mixed`](#statevaluetemp)  
[`state.valueReal: mixed`](#statevaluereal)  
[`state.valueError: string`](#statevalueerror)  

[`FocusMixin`](../mixin.interface.Focus/README.md#state):  
[`state.focused: boolean`](../mixin.interface.Focus/README.md#statefocused)  


### state.valueTemp

`mixed`

Current temp value of type [`arg.valueType`](#argvaluetype).


### state.valueReal

`mixed`

Current real value of type [`arg.valueType`](#argvaluetype).


### state.valueError

`string`

Error message get from [`arg.validateValue`](#argvalidatevalue) and [`prop.validate`](#propvalidate).


## Methods

[`method.getValue: ( props?: {}, state?: {} ) => mixed`](#methodgetvalue)  
[`method.setValue: ( value: mixed, callback?: () => void ) => void`](#methodsetvalue)  
[`method.setTempValue: ( value: mixed, callback?: () => void ) => void`](#methodsettempvalue)  
[`method.getValueError: () => ?string`](#methodgetvalueerror)  

[`BaseKeyMixin`](../mixin.meta.BaseKey/README.md#methods) with `Value` as `Name`:  
[`method.getValueKey: ( key?: string, defaultValue?: mixed ) => mixed`](../mixin.meta.BaseKey/README.md#methodgetnamekey)  
[`method.getValueKeys: ( keys?: Array< string >, defaultValue?: mixed ) => { [ string ]: mixed }`](../mixin.meta.BaseKey/README.md#methodgetnamekeys)  
[`method.updateValueKey: ( key?: string, updater: ( value: mixed ) => mixed, callback?: () => void ) => void`](../mixin.meta.BaseKey/README.md#methodupdatenamekey)  
[`method.updateValueKeys: ( updaters?: { [ string ]: ( value: mixed) => mixed }, callback?: () => void ) => void`](../mixin.meta.BaseKey/README.md#methodupdatenamekeys)  
[`method.setValueKey: ( key?: string, value?: mixed, callback?: () => void ) => void`](../mixin.meta.BaseKey/README.md#methodsetnamekey)  
[`method.setValueKeys: ( values?: { [ string ]: mixed }, callback?: () => void ) => void`](../mixin.meta.BaseKey/README.md#methodsetnamekeys)  
[`method.toggleValueKey: ( key?: string, callback?: () => void ) => void`](../mixin.meta.BaseKey/README.md#methodtogglenamekey)  
[`method.toggleValueKeys: ( keys?: Array< string >, callback?: () => void ) => void`](../mixin.meta.BaseKey/README.md#methodtogglenamekeys)  
[`method.increaseValueKey: ( key?: string, delta: number, callback?: () => void ) => void`](../mixin.meta.BaseKey/README.md#methodincreasenamekey)  
[`method.increaseValueKeys: ( deltas?: { [ string ]: number }, callback?: () => void ) => void`](../mixin.meta.BaseKey/README.md#methodincreasenamekeys)  
[`method.defaultValueKey: ( key?: string, defaultValue?: mixed, callback?: () => void ) => void`](../mixin.meta.BaseKey/README.md#methoddefaultnamekey)  
[`method.defaultValueKeys: ( defaultValues?: { [ string ]: mixed }, callback?: () => void ) => void`](../mixin.meta.BaseKey/README.md#methoddefaultnamekeys)  
[`method.unsetValueKey: ( key?: string, callback?: () => void ) => void`](../mixin.meta.BaseKey/README.md#methodunsetnamekey)  
[`method.unsetValueKeys: ( keys?: Array< string >, callback?: () => void ) => void`](../mixin.meta.BaseKey/README.md#methodunsetnamekeys)  

[`FocusMixin`](../mixin.interface.Focus/README.md#methods):  
[`method.onFocusGain: () => void`](../mixin.interface.Focus/README.md#methodonfocusgain)  
[`method.onFocusLoss: () => void`](../mixin.interface.Focus/README.md#methodonfocusloss)  
[`method.isFocusable: () => boolean`](../mixin.interface.Focus/README.md#methodisfocusable)  
[`method.isFocused: () => boolean`](../mixin.interface.Focus/README.md#methodisfocused)  
[`method.focus: () => void`](../mixin.interface.Focus/README.md#methodfocus)  
[`method.blur: () => void`](../mixin.interface.Focus/README.md#methodblur)  


### method.getValue

`( props?: {}, state?: {} ) => mixed`

Returns resolved value considering [`state.valueTemp`](#statevaluetemp), [`prop.value`](#propvalue), [`state.valueReal`](#statevaluereal), [`prop.defaultValue`](#propdefaultvalue).

| Argument | Type    | Default        | Description                    |
| -------- | ------- | -------------- | ------------------------------ |
| `props`  | `{}`    | `this.props`   | props used for resolving value |
| `state`  | `{}`    | `this.state`   | state used for resolving value |
| `=>`     | `mixed` | resolved value |


### method.setValue

`( value: mixed, callback?: () => void ) => void`

Sets real value of input, executes optional callback, triggers [`prop.onChange`](#proponchange).


### method.setTempValue

`( value: mixed, callback?: () => void ) => void`

Behavior depends on value of [`prop.inputDelay`](#propinputdelay).
If it is zero - simply passes arguments to [`method.setValue`](#methodsetvalue).
If it is non-zero - sets temp value of input, executes optional callback, triggers [`prop.onTempChange`](#propontempchange).
If it is more than zero - additionally starts timeout to clear temp value and transfer it to real value


### method.getValueError

`() => ?string`

Returns [`state.valueError`](#statevalueerror).
