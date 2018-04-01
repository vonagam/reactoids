export default UnisonMixin = Mixin.create( {

  name: 'UnisonMixin',

  argTypes: {

    name: PropTypes.string,

    update: PropTypes.func, // ( that: mixed ) => void

    shouldSkip: PropTypes.func, // () => boolean

    interval: PropTypes.number,

  },

  defaultArgs: {

    name: '',

    shouldSkip: _.constant( false ),

    checks: {

      componentDidMount: true,

    },

  },

  mixins: [

    { Mixin: ToggleMixin, omit: [ 'toggle' ] },

  ],

  mixin( ARGS ) {

    const Unison = {

      insideUpdate: false,

      changeInside: false,

      instances: [],

      updateInstances() {

        if ( ARGS.shouldSkip() ) return;

        if ( this.insideUpdate ) return console.log( `UnisonMixin: Mixin "${ ARGS.name }" has low interval value. Can't keep up.` );

        this.insideUpdate = true;

        _.each( this.instances, ( instance ) => {

          if ( instance ) {

            ARGS.update( instance );

          }

        } );

        this.insideUpdate = false;

        if ( this.changeInside ) {

          this.instances = _.compact( this.instances );

          this.updateInterval();

          this.changeInside = false;

        }

      },

      updateInterval() {

        if ( this.instances.length > 0 ) {

          this.interval = this.interval || window.setInterval( () => this.updateInstances(), ARGS.interval );

        } else {

          window.clearInterval( this.interval );

          this.interval = undefined;

        }

      },

      toggleInstance( instance, bool ) {

        if ( bool ) {

          this.instances.push( instance );

          this.updateInterval();

        } else {

          let index = _.indexOf( this.instances, instance );

          if ( this.insideUpdate ) {

            this.instances[ index ] = undefined;

            this.changeInside = true;

          } else {

            this.instances.splice( index, 1 );

            this.updateInterval();

          }

        }

      },

    };


    const ToggleMixinArgs = _.assign( ToggleMixin.pick( ARGS ), {

      name: `${ ARGS.name }Unison`,

      toggle( instance, bool ) {

        Unison.toggleInstance( instance, bool );

      },

    } );


    return {

      mixins: [

        ToggleMixin( ToggleMixinArgs ),

      ],

    };

  },

} );
