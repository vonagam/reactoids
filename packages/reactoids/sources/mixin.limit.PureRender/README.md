# PureRenderMixin

Prevents component from updating if props and state have not changed.

[Args](#args)  
[Methods](#methods)  


## Args

[`arg.purifiedPaths: Array< string >`](#argpurifiedpaths)  
[`arg.dirtiedPaths: Array< string >`](#argdirtiedpaths)  


### arg.purifiedPaths

`Array< string >`

Array of stings in form of "props.key" or "state.key" which indicate what keys to ignore when comparing current and previous values.

**Default:** none.


### arg.dirtiedPaths

`Array< string >`

Array of strings in form of "props.key" or "state.key" which indicate what keys cause update if at this path located function.

**Default:** none.


## Methods


### method.\_bind, method.\_partial, method.\_ary, method.\_queue

Signatures of those methods are equal to corresponding ones in lodash.
Returned values are functionally identical.
But returned functions can be compared by this mixin.
