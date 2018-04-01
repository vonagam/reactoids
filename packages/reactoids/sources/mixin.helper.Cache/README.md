# CacheMixin

Provides cache which may depend on props or state and will be invalidated if some of them change.

[Methods](#methods)  


## Methods

[`method.cache: ( key: string, options: {} ) => mixed`](#methodcache)  
[`method.clearCache: ( key?: string ) => void`](#methodclearcache)  


### method.cache

```
(
  key: string,
  options: {
    getter?: ( key: string, that ) => mixed,
    value?: mixed,
    depends?: Array< string >
  }
) => mixed
```

Stores and returns either value or result of getter and registers dependance of cache to specified paths.

| Argument           | Type                        | Default | Description                                          |
| ------------------ | --------------------------- | ------- | ---------------------------------------------------- |
| `key`              | `string`                    | **`!`** | key associated with cache item                       |
| `options`          | `{}`                        | **`!`** | cache item settings                                  |
| `options.value`\*  | `mixed`                     | **`!`** | value to store                                       |
| `options.getter`\* | `( string, that ) => mixed` | **`!`** | function to compute stored value                     |
| `options.depends`  | `Array< string >`           | `-`     | list of paths changes to which will invalidate cache |
| `=>`               | `mixed`                     |         | value in cache associated with provided key          |

\*: either `options.value` or `options.getter` should be specified.


### method.clearCache

`( key?: string ) => void`

Manually clears cache. If key is provided only specified item is cleared, otherwise all items are cleared.
