# OmitPropsMixin

Provides easy way to filter out component's props before passing down.

[Props](#props)  
[Methods](#methods)  


## Props

[`prop.omitProps`](#propomitprops)  


### prop.omitProps

`Array< string >`

Additional props unknown to component, which it should not pass down.

**Default:** none.


## Method

[`method.omitProps`](#methodomitprops)  


### method.omitProps

`() => {}`

Returns props omiting component's ones and specified in [`prop.omitProps`](#propomitprops).
