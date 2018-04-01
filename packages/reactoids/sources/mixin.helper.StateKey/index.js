export default StateKeyMixin = Mixin.create( {

  name: 'StateKeyMixin',

  mixins: [

    { Mixin: BaseKeyMixin, pick: [] },

  ],

  mixin: _.once( () => {

    const BaseKeyArgs = {

      name: 'state',

      get( that, props, state ) {

        return state;

      },

      set( that, value, callback ) {

        that.setState( value, callback );

      },

    };


    return {

      mixins: [

        BaseKeyMixin( BaseKeyArgs ),

      ],

    };

  } ),

} );
