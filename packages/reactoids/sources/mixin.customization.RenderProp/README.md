# RenderPropMixin

Defined render using render prop pattern.

[Args](#args)  
[Props](#props)  


## Args

[`arg.getRenderArg: ( that ) => mixed`](#arggetrenderarg)  


### arg.getRenderArg

`( that ) => mixed`

Gets argument for render prop function.

**Default:** noop.


## Props

[`prop.children: FuncedThat1< mixed, React.Node >`](#propchildren)  


### prop.children

`FuncedThat1< mixed, React.Node >`

Renders component.

| Argument    | Type         | Description                                      |
| ----------- | ------------ | ------------------------------------------------ |
| `that`      | `mixed`      | component instance                               |
| `renderArg` | `mixed`      | result of [`arg.getRenderArg`](#arggetrenderarg) |
| `=>`        | `React.Node` | result for component to render                   |
