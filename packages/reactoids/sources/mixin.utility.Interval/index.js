export default IntervalMixin = Mixin.create( {

  name: 'IntervalMixin',

  mixin: _.once( () => {

    return {

      getInitialMembers() {

        return { _IntervalMixin: {} };

      },

      componentWillUnmount() {

        _.each( this._IntervalMixin, ( interval, name ) => {

          window.clearInterval( interval );

        } );

      },

      setInterval( name, func, delay ) {

        let interval = this._IntervalMixin[ name ];

        if ( interval !== undefined ) throw new Error( `IntervalMixin: interval with name "${ name }" already exists` );

        interval = window.setInterval( func, delay );

        this._IntervalMixin[ name ] = interval;

      }

      clearInterval( name ) {

        let interval = this._IntervalMixin[ name ];

        if ( interval === undefined ) throw new Error( `IntervalMixin: interval with name "${ name }" does not exist` );

        window.clearInterval( interval );

        delete this._IntervalMixin[ name ];

      }

      isIntervalRunning( name ) {

        let interval = this._IntervalMixin[ name ];

        return interval !== undefined;

      }

    };

  } ),

} );
