export default EventListenerMixin = Mixin.create( {

  name: 'EventListenerMixin',

  mixins: [

    { Mixin: BaseListenerMixin, pick: [] },

  ],

  mixin: _.once( () => {

    const BaseListenerArgs = {

      name: 'event',

      plural: true,

      initListener( that, data ) {

        assert( Boolean( data.event ), 'EventListenerMixin.initListener: event name is required' );

        assert( _.isFunction( data.callback ), 'EventListenerMixin.initListener: callback function is required' );

        let result = _.defaults( {}, data, {

          target: document,

          jquery: true,

          selector: null,

        } );

        if ( result.jquery ) {

          result.target = $( result.target );

        }

        return result;

      },

      toggleListener( that, data, bool ) {

        if ( data.jquery ) {

          data.target[ bool ? 'on' : 'off' ]( data.event, data.selector, data.callback );

        } else {

          data.target[ bool ? 'addEventListener' : 'removeEventListener' ]( data.event, data.callback );

        }

      },

    };


    return {

      mixins: [

        BaseListenerMixin( BaseListenerArgs ),

      ],

    };

  } ),

} );
