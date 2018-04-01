// https://github.com/d3/d3-shape/blob/master/README.md#areaRadial


const d3propTypes = {

  angle: PropTypes.oneOfType( [ PropTypes.func, PropTypes.number ] ),

  startAngle: PropTypes.oneOfType( [ PropTypes.func, PropTypes.number ] ),

  endAngle: PropTypes.oneOfType( [ PropTypes.func, PropTypes.number ] ),

  radius: PropTypes.oneOfType( [ PropTypes.func, PropTypes.number ] ),

  innerRadius: PropTypes.oneOfType( [ PropTypes.func, PropTypes.number ] ),

  outerRadius: PropTypes.oneOfType( [ PropTypes.func, PropTypes.number ] ),

  defined: PropTypes.func,

  curve: PropTypes.func,

};


export default class RadialArea extends React.Component {

  static propTypes = _.assign( {}, d3propTypes, {

    data: PropTypes.array,

  } );

  render() {

    let { props } = this;

    let path = applyD3Props( d3.areaRadial(), _.pick( props, _.keys( d3propTypes ) ) );


    return (

      <path

        {... _.omit( props, _.keys( RadialArea.propTypes ) ) }

        d={ path( props.data ) }

      />

    );

  }

}



