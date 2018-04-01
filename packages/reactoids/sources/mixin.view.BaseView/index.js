export default BaseViewMixin = Mixin.create( {

  name: 'BaseViewMixin',

  argTypes: {

    filterLink: PropTypes.func, // ( that: mixed, link: mixed ) => boolean

    handleLink: PropTypes.func, // ( that: mixed, link: mixed ) => boolean

    filterForm: PropTypes.func, // ( that: mixed, form: mixed ) => boolean

    handleForm: PropTypes.func, // ( that: mixed, form: mixed ) => boolean

  },

  defaultArgs: {

    filterLink( that, link ) {

      if ( ! /^https?:$/.test( link.protocol ) ) return false;

      if ( link.target && link.target !== '_self' ) return false;

      if ( link.host !== window.location.host ) return false;

      return true;

    },

    handleLink: _.constant( false ),

    filterForm( that, form ) {

      let location = getLocation( form.action );

      if ( ! /^https?:$/.test( location.protocol ) ) return false;

      if ( form.target && form.target !== '_self' ) return false;

      if ( location.host !== window.location.host ) return false;

      return true;

    },

    handleForm: _.constant( false ),

  },

  mixins: [

    EventListenerMixin,

  ],

  mixin( ARGS ) {

    const updateListener = function( that ) {

      let dom = ReactDOM.findDOMNode( that );

      if ( that._BaseViewMixin === dom ) return;

      that._BaseViewMixin = dom;


      if ( that.getEventListenerState( 'BaseViewMixin.link' ) ) that.removeEventListener( 'BaseViewMixin.link' );

      that.addEventListener( 'BaseViewMixin.link', {

        target: dom,

        event: 'click',

        selector: 'a[ href ]',

        callback: ( event ) => {

          let link = event.currentTarget;

          if ( ARGS.filterLink( that, link ) && ARGS.handleLink( that, link ) ) {

            event.preventDefault();

          }

        },

      } );


      if ( that.getEventListenerState( 'BaseViewMixin.form' ) ) that.removeEventListener( 'BaseViewMixin.form' );

      that.addEventListener( 'BaseViewMixin.form', {

        target: dom,

        event: 'submit',

        callback: ( event ) => {

          let form = event.target;

          if ( ARGS.filterForm( that, form ) && ARGS.handleForm( that, form ) ) {

            event.preventDefault();

          }

        },

      } );

    };


    return {

      mixins: [

        EventListenerMixin(),

      ],

      getInitialMembers() {

        return { _BaseViewMixin: undefined };

      },

      componentDidMount() {

        updateListener( this );

      },

      componentDidUpdate() {

        updateListener( this );

      },

    };

  },

} );
