# simulateLink

`( href?: string, container?: mixed, decorateLink?: ( link: mixed ) => void ) => void`

Function which simulates user click on anchor tag with href.  
If simulated click event is not prevented from default behavior, [`window.location.assign(href)`](https://developer.mozilla.org/en-US/docs/Web/API/Location/assign) is executed.  

| Argument       | Type                   | Default  | Description                                                    |
| -------------- | ---------------------- | -------- | -------------------------------------------------------------- |
| `href`         | `string`               | `""`     | href for anchor tag                                            |
| `container`    | `mixed`                | `"body"` | container for anchor tag (selector, dom node or jquery object) |
| `decorateLink` | `( $link: $ ) => void` | `_.noop` | function which receives jquered anchor tag before click        |
| `=>`           | `void`                 |          |                                                                |
