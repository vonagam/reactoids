export default CacheMixinComponent = Mixin.createClass( {

  displayName: 'CacheMixinComponent',

  mixins: [

    CacheMixin(),

    RenderPropMixin(),

  ],

} );
