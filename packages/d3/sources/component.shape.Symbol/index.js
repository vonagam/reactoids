// https://github.com/d3/d3-shape/blob/master/README.md#symbol


const d3propTypes = {

  type: PropTypes.oneOfType( [ PropTypes.func, PropTypes.oneOf( d3.symbols ) ] ),

  size: PropTypes.oneOfType( [ PropTypes.func, PropTypes.number ] ),

};


export default class Symbol extends React.Component {

  static propTypes = _.assign( {}, d3propTypes, {

    datum: PropTypes.any,

    index: PropTypes.number,

  } );

  render() {

    let { props } = this;

    let path = applyD3Props( d3.symbol(), _.pick( props, _.keys( d3propTypes ) ) );


    return (

      <path

        {... _.omit( props, _.keys( Symbol.propTypes ) ) }

        d={ path( props.datum, props.index ) }

      />

    );

  }

}
