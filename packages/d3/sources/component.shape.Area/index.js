// https://github.com/d3/d3-shape/blob/master/README.md#area


const d3propTypes = {

  x: PropTypes.oneOfType( [ PropTypes.func, PropTypes.number ] ),

  x0: PropTypes.oneOfType( [ PropTypes.func, PropTypes.number ] ),

  x1: PropTypes.oneOfType( [ PropTypes.func, PropTypes.number ] ),

  y: PropTypes.oneOfType( [ PropTypes.func, PropTypes.number ] ),

  y0: PropTypes.oneOfType( [ PropTypes.func, PropTypes.number ] ),

  y1: PropTypes.oneOfType( [ PropTypes.func, PropTypes.number ] ),

  defined: PropTypes.func,

  curve: PropTypes.func,

};


export default class Area extends React.Component {

  static propTypes = _.assign( {}, d3propTypes, {

    data: PropTypes.array,

  } );

  render() {

    let { props } = this;

    let path = applyD3Props( d3.area(), _.pick( props, _.keys( d3propTypes ) ) );


    return (

      <path

        {... _.omit( props, _.keys( Area.propTypes ) ) }

        d={ path( props.data ) }

      />

    );

  }

}



