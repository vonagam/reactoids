export default ReactoidMixin = Mixin.create( {

  name: 'ReactoidMixin',

  argTypes: {

    pure: PropTypes.bool,

    classes: PropTypes.oneOfType( [ PropTypes.oneOf( [ false ] ), PropTypes.object ] ),

    strings: PropTypes.oneOfType( [ PropTypes.oneOf( [ false ] ), PropTypes.arrayOf( PropTypes.string ) ] ),

    slots: PropTypes.oneOfType( [ PropTypes.oneOf( [ false ] ), PropTypes.object ] ),

    Components: PropTypes.oneOfType( [ PropTypes.oneOf( [ false ] ), PropTypes.object ] ),

  },

  defaultArgs: {

    pure: true,

    classes: {},

    strings: false,

    slots: false,

    Components: false,

  },

  mixins: [

    PureRenderMixin,

    ClassedMixin,

    StringedMixin,

    RenderSlotsMixin,

    ComponentsMixin,

    StateKeyMixin,

    OmitPropsMixin,

    RefMixin,

    DomMixin,

    CallbackMixin,

    CacheMixin,

  ],

  mixin: ( ARGS ) => {

    return {

      mixins: _.compact( [

        ARGS.pure && PureRenderMixin( PureRenderMixin.pick( ARGS ) ),

        ARGS.classes && ClassedMixin( ClassedMixin.pick( ARGS ) ),

        ARGS.strings && StringedMixin( StringedMixin.pick( ARGS ) ),

        ARGS.slots && RenderSlotsMixin( RenderSlotsMixin.pick( ARGS ) ),

        ARGS.Components && ComponentsMixin( ComponentsMixin.pick( ARGS ) ),

        StateKeyMixin(),

        OmitPropsMixin(),

        RefMixin(),

        DomMixin(),

        CallbackMixin(),

        CacheMixin(),

      ] ),

    };

  },

} );
