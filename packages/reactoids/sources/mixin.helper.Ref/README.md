# RefMixin

Provides helpers for getting and setting [`refs`](https://reactjs.org/docs/refs-and-the-dom.html).

[Methods](#methods)  


## Methods

[`method.refSetter`](#methodrefsetter)  


### method.refSetter

```
(
  key: string,
  options?: string | ( ?HTMLElement ) => void | boolean | {
    prop?: string,
    callback?: ( ?HTMLElement ) => void,
    constant?: boolean
  }
) => ( ?HTMLElement ) => void
```

Returns callback for usage in react's ref attribute. Consequent calls for same key return result for first invocation.

| Argument           | Type                                               | Default | Description                                                                                                                                  |
| ------------------ | -------------------------------------------------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `key`              | `string`                                           | **`!`** | key to associate with ref                                                                                                                    |
| `options`\*        | `string / ( ?HTMLElement ) => void / boolean / {}` | `{}`    | options for setter                                                                                                                           |
| `options.prop`     | `string`                                           | `-`     | prop name which contains callback [passed from above](https://reactjs.org/docs/refs-and-the-dom.html#exposing-dom-refs-to-parent-components) |
| `options.callback` | `( ?HTMLElement ) => void`                         | `-`     | additional function to call                                                                                                                  |
| `options.constant` | `boolean`                                          | `false` | if true, ref changes will cause error throw                                                                                                  |
| `=>`               | `( ?HTMLElement ) => void`                         |         | ref callback function                                                                                                                        |

\*: if `options` is string then it is used as `options.prop`, function - `options.callback`, boolean - `options.constant`.
