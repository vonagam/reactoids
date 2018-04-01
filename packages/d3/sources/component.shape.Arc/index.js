// https://github.com/d3/d3-shape/blob/master/README.md#arc


const d3propTypes = {

  innerRadius: PropTypes.oneOfType( [ PropTypes.func, PropTypes.number ] ),

  outerRadius: PropTypes.oneOfType( [ PropTypes.func, PropTypes.number ] ),

  cornerRadius: PropTypes.oneOfType( [ PropTypes.func, PropTypes.number ] ),

  startAngle: PropTypes.oneOfType( [ PropTypes.func, PropTypes.number ] ),

  endAngle: PropTypes.oneOfType( [ PropTypes.func, PropTypes.number ] ),

  padRadius: PropTypes.oneOfType( [ PropTypes.func, PropTypes.number ] ),

  padAngle: PropTypes.oneOfType( [ PropTypes.func, PropTypes.number ] ),

};


export default class Arc extends React.Component {

  static propTypes = _.assign( {}, d3propTypes, {

    datum: PropTypes.any,

    index: PropTypes.number,

  } );

  render() {

    let { props } = this

    let path = applyD3Props( d3.arc(), _.pick( props, _.keys( d3propTypes ) ) );


    return (

      <path

        {... _.omit( props, _.keys( Arc.propTypes ) ) }

        d={ path( props.datum, props.index ) }

      />

    );

  }

}
