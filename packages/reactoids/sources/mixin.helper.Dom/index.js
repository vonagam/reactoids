export default DomMixin = Mixin.create( {

  name: 'DomMixin',

  mixin: _.once( () => {

    return {

      dom( input ) {

        if ( ! input ) return ReactDOM.findDOMNode( this );

        if ( _.isString( input ) ) return ReactDOM.findDOMNode( this.refs[ input ] );

        return ReactDOM.findDOMNode( input );

      },

    };

  } ),

} );
