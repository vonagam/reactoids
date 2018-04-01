export default ComponentMixin = Mixin.create( {

  name: 'ComponentMixin',

  argTypes: {

    pure: PropTypes.bool,

    classes: PropTypes.oneOfType( [ PropTypes.oneOf( [ false ] ), PropTypes.object ] ),

    strings: PropTypes.oneOfType( [ PropTypes.oneOf( [ false ] ), PropTypes.arrayOf( PropTypes.string ) ] ),

    slots: PropTypes.oneOfType( [ PropTypes.oneOf( [ false ] ), PropTypes.object ] ),

  },

  defaultArgs: {

    pure: true,

    classes: {},

    strings: false,

    slots: false,

  },

  mixins: [

    PureRenderMixin,

    ClassedMixin,

    StringedMixin,

    RenderSlotsMixin,

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
