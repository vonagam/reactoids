export default UrlWatcherMixin = Mixin.create( {

  name: 'UrlWatcherMixin',

  argTypes: {

    name: PropTypes.string,

    shouldSkip: PropTypes.func, // ( currHref: string, prevHref: string ) => boolean

  },

  defaultArgs: {

    name: '',

    update( that ) { that.forceUpdate() },

    interval: 50,

    shouldSkip: _.constant( false ),

  },

  mixins: [

    UnisonMixin,

  ],

  mixin( ARGS ) {

    let currHref = window.location.href;


    const UnisonArgs = _.assign( UnisonMixin.pick( ARGS ), {

      name: `${ ARGS.name }UrlWatch`,

      shouldSkip() {

        let prevHref = currHref;

        let nextHref = window.location.href;

        if ( nextHref === currHref ) return true;

        currHref = nextHref;

        return ARGS.shouldSkip( nextHref, prevHref );

      },

    } );


    return {

      mixins: [

        UnisonMixin( UnisonArgs ),

      ],

    };

  },

} );
