# FocusMixin

Provides interface to work with focus.

[State](#state)  
[Methods](#methods)  


## State

[`state.focused`](#statefocused)  


### state.focused

`boolean`

Indicates that component contains current focused element.


## Methods

[`method.onFocusGain`](#methodonfocusgain)  
[`method.onFocusLoss`](#methodonfocusloss)  
[`method.isFocusable`](#methodisfocusable)  
[`method.isFocused`](#methodisfocused)  
[`method.focus`](#methodfocus)  
[`method.blur`](#methodblur)  


### method.onFocusGain

`() => void`

Focus event callback which should be added to component's top element.


### method.onFocusLoss

`() => void`

Blur event callback which should be added to component's top element.


### method.isFocusable

`() => boolean`

Indicates that component contains at least one focusable element.


### method.isFocused

`() => boolean`

Indicates that component contains current focused element.


### method.focus

`() => void`

Focuses first focusable element inside component, unless other focusable element inside already has focus.


### method.blur

`() => void`

Blurs focused element if it is contained inside component.
