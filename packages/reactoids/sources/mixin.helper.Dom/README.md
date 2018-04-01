# DomMixin

Provides helper function to get relevant dom node.

[Methods](#methods)  


## Methods

[`method.dom: ( input: void | string | mixed ) => null | Element | Text`](#methoddom)  


### method.dom

`( input: void | string | mixed ) => null | Element | Text`

If void input - returns findDOMNode result for component.
If input is string returns node stored in refs.
Otherwise returns findDOMNode for provided value.

| Argument | Type                    | Default | Description                                                                       |
| -------- | ----------------------- | ------- | --------------------------------------------------------------------------------- |
| `ref`    | `void | string | mixed` | `-`     |                                                                                   |
| `=>`     | `null | Element | Text` |         | same type as [`findDOMNode`](https://reactjs.org/docs/react-dom.html#finddomnode) |
