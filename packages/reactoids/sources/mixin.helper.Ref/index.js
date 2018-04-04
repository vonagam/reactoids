import emptyObject from 'fbjs/lib/emptyObject';


export default RefMixin = Mixin.create( {

  name: 'RefMixin',

  mixin: _.once( () => {

    return {

      getInitialMembers() {

        return { _RefMixin: {} };

      },

      ref( key, options ) {

        if ( ! this._RefMixin[ key ] ) {

          if ( ! options ) options = {};

          if ( _.isString( options ) ) options = { prop: options };

          if ( _.isFunction( options ) ) options = { callback: options };

          if ( options === true ) options = { constant: options };


          this._RefMixin[ key ] = ( node ) => {

            assert( () => {

              if ( options.constant && node && _.hasOwn( this.refs, key ) && this.refs[ key ] !== node ) {

                throw new Error( `RefMixin: ref node for key "${ key }" was changed while key is marked as constant` );

              }

            } );

            if ( this.refs === emptyObject ) {

              this.refs = {};

            }

            this.refs[ key ] = node;

            if ( options.callback ) options.callback.call( this, node );

            if ( options.prop ) _.funced( this.props[ options.prop ], node, this );

          };

        }

        return this._RefMixin[ key ];

      },

    };

  } ),

} );
