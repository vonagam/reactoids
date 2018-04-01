export default AjaxHeadersMixin = Mixin.create( {

  name: 'AjaxHeadersMixin',

  argTypes: {

    headers: PropTypes.funced( PropTypes.objectOf( PropTypes.funced( PropTypes.string ) ) ), // ( that: mixed, options: object ) => string

    filterRequest: PropTypes.func, // ( that: mixed, options: object ) => boolean

  },

  defaultArgs: {

    filterRequest( that, options ) {

      return ! options.crossDomain;

    },

  },

  mixins: [

    EventListenerMixin,

  ],

  mixin( ARGS ) {

    return {

      mixins: [

        EventListenerMixin(),

      ],

      componentDidMount() {

        this.addEventListener( 'AjaxHeadersMixin', {

          event: 'ajaxSend',

          callback: ( event, xhr, options ) => {

            if ( ! ARGS.filterRequest( this, options ) ) return;

            let headers = _.funced( ARGS.headers, this, options );

            _.each( headers, ( value, key ) => {

              value = _.funced( value, this, options );

              if ( value === undefined ) return;

              xhr.setRequestHeader( key, value );

            } );

          },

        } );

      },

    };

  },

} );
