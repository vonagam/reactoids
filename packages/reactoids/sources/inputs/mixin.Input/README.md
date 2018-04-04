# InputMixin

Interface for custom inputs.

[Args](#args)  
[Mixins](#mixins)  
[Props](#props)  
[State](#state)  
[Methods](#methods)  


## Args

[`arg.valueType`](#argvaluetype)  
[`arg.defaultValue`](#argdefaultvalue)  
[`arg.validateValue`](#argvalidatevalue)  
[`arg.inputDelay`](#arginputdelay)  


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

[`BaseKeyMixin`](../../mixin.meta.BaseKey/README.md)  
[`FocusMixin`](../../mixin.interface.Focus/README.md)  


## Props

[`prop.value`](#propvalue)
[`prop.defaultValue`](#propdefaultvalue)
[`prop.onChange`](#proponchange)  
[`prop.onTempChange`](#propontempchange)  
[`prop.inputDelay`](#propinputdelay)  
[`prop.readOnly`](#propreadonly)  
[`prop.disabled`](#propdisabled)  
[`prop.validate`](#propvalidate)  


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

[`state.valueTemp`](#statevaluetemp)  
[`state.valueReal`](#statevaluereal)  
[`state.valueError`](#statevalueerror)  

[`FocusMixin`](../../mixin.interface.Focus/README.md#state):  
[`state.focused`](../../mixin.interface.Focus/README.md#statefocused)  


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

[`method.getValue`](#methodgetvalue)  
[`method.setValue`](#methodsetvalue)  
[`method.setTempValue`](#methodsettempvalue)  
[`method.getValueError`](#methodgetvalueerror)  

[`BaseKeyMixin`](../../mixin.meta.BaseKey/README.md#methods) with `Value` as `Name`:  
[`method.getValueKey`](../../mixin.meta.BaseKey/README.md#methodgetnamekey)  
[`method.getValueKeys`](../../mixin.meta.BaseKey/README.md#methodgetnamekeys)  
[`method.updateValueKey`](../../mixin.meta.BaseKey/README.md#methodupdatenamekey)  
[`method.updateValueKeys`](../../mixin.meta.BaseKey/README.md#methodupdatenamekeys)  
[`method.setValueKey`](../../mixin.meta.BaseKey/README.md#methodsetnamekey)  
[`method.setValueKeys`](../../mixin.meta.BaseKey/README.md#methodsetnamekeys)  
[`method.toggleValueKey`](../../mixin.meta.BaseKey/README.md#methodtogglenamekey)  
[`method.toggleValueKeys`](../../mixin.meta.BaseKey/README.md#methodtogglenamekeys)  
[`method.increaseValueKey`](../../mixin.meta.BaseKey/README.md#methodincreasenamekey)  
[`method.increaseValueKeys`](../../mixin.meta.BaseKey/README.md#methodincreasenamekeys)  
[`method.defaultValueKey`](../../mixin.meta.BaseKey/README.md#methoddefaultnamekey)  
[`method.defaultValueKeys`](../../mixin.meta.BaseKey/README.md#methoddefaultnamekeys)  
[`method.unsetValueKey`](../../mixin.meta.BaseKey/README.md#methodunsetnamekey)  
[`method.unsetValueKeys`](../../mixin.meta.BaseKey/README.md#methodunsetnamekeys)  

[`FocusMixin`](../../mixin.interface.Focus/README.md#methods):  
[`method.onFocusGain`](../../mixin.interface.Focus/README.md#methodonfocusgain)  
[`method.onFocusLoss`](../../mixin.interface.Focus/README.md#methodonfocusloss)  
[`method.isFocusable`](../../mixin.interface.Focus/README.md#methodisfocusable)  
[`method.isFocused`](../../mixin.interface.Focus/README.md#methodisfocused)  
[`method.focus`](../../mixin.interface.Focus/README.md#methodfocus)  
[`method.blur`](../../mixin.interface.Focus/README.md#methodblur)  


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
