# getFormAjax

`( form: HTMLFormElement ) => {}`

Returns jquery ajax options for provided form taking into account format specified in `data-enctype` and [`enctype`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/enctype) attributes.  

| Argument | Type              | Default | Description                                 |
| -------- | ----------------- | ------- | ------------------------------------------- |
| `form`   | `HTMLFormElement` | **`!`** | form to gather options for                  |
| `=>`     | `{}`              |         | object ready to be used in jquery ajax call |
