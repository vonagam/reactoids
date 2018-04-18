// https://w3c.github.io/aria/#radio


export default AriaRadio = Wrapper.create( AriaCheck, {

  props: { role: 'radio' },

  identity: true,

} );
