export default IdMixin = Mixin.create( {

  name: 'IdMixin',

  mixin: _.once( () => {

    return {

      getInitialMembers() {

        return { _IdMixin: _.uniqueId( 'reactoid-' ) };

      },

      id( part ) {

        let id = this.props.id || this._IdMixin;

        if ( part ) {

          return `${ id }-${ part }`;

        } else {

          return id;

        }

      },

    };

  } ),

} );
