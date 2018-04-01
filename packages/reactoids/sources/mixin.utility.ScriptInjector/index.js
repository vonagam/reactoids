export default ScriptInjectorMixin = Mixin.create( {

  name: 'ScriptInjectorMixin',

  argTypes: {

    scripts: PropTypes.funced( PropTypes.arrayOf( PropTypes.string ) ), // ( that: mixed ) => Array< string >

    filterScript: PropTypes.func, // ( that: mixed, script: string ) => boolean

    decorateScript: PropTypes.func, // ( that: mixed, script: mixed ) => void

    callback: PropTypes.func, // ( that: mixed ) => void

  },

  defaultArgs: {

    filterScript: ( that, script ) => ! document.querySelector( `script[ src=\"${ script }\" ]` ),

    decorateScript: _.noop,

    callback: _.noop,

  },

  mixin( ARGS ) {

    return {

      componentDidMount() {

        let scripts = _.filter( _.funced( ARGS.scripts, this ), ( script ) => ARGS.filterScript( this, script ) );

        if ( scripts.length === 0 ) return ARGS.callback( this );

        let count = scripts.length;

        let onLoad = () => {

          count--;

          if ( count === 0 ) ARGS.callback( this );

        };

        _.each( scripts, ( scriptSrc ) => {

          let script = document.createElement( 'script' );

          script.src = scriptSrc;

          script.onload = onLoad;

          ARGS.decorateScript( this, script );

          document.head.appendChild( script );

        } );

      },

    };

  },

} );
