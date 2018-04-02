# RenderSlotsMixin

Provides way to customize rendering of parts of component.

[Args](#args)  
[Props](#props)  
[Methods](#methods)  


## Args

[`arg.slots`](#argslots)  


### arg.slots

`{ [ name: string ]: FuncedThat2< {}, {}, React.Node > }`

Keys are slot names. Values are default render function.

**Required**


## Props

[`prop.{slot}`](#propslot)  
[`prop.render{Slot}`](#proprenderslot)  


### prop.{slot}

`FuncedThat< {} >`

Way for user to pass custom props to renderer.

**Default:** Empty object.


### prop.render{Slot}

`FuncedThat2< {}, {}, React.Node >`

Renderer for part of component.

| Argument    | Type         | Description                                                                          |
| ----------- | ------------ | ------------------------------------------------------------------------------------ |
| `that`      | `mixed`      | component instance                                                                   |
| `slotArgs`  | `{}`         | options that are provided by component in [`method.render{Slot}`](#methodrenderslot) |
| `slotProps` | `{}`         | options that are provided from top by [`prop.{slot}`](#propslot) prop                |
| `=>`        | `React.Node` | result to render                                                                     |

**Default:** Renderer specified in [`arg.slots`](#argslots).


## Methods

[`method.render{Slot}`](#methodrenderslot)  


### method.render{Slot}

`( slotArgs: {} ) => React.Node`

Renders part of component.

| Argument   | Type         | Default | Description                                      |
| ---------- | ------------ | ------- | ------------------------------------------------ |
| `slotArgs` | `{}`         | `-`     | options for [prop.render{Slot}](#proprenderslot) |
| `=>`       | `React.Node` |         | result to render                                 |
