// https://github.com/d3/d3-shape/blob/master/README.md#linkRadial


const d3propTypes = {

  source: PropTypes.func,

  target: PropTypes.func,

  angle: PropTypes.oneOfType( [ PropTypes.func, PropTypes.number ] ),

  radius: PropTypes.oneOfType( [ PropTypes.func, PropTypes.number ] ),

};


export default class RadialLink extends React.Component {

  static propTypes = _.assign( {}, d3propTypes, {

    data: PropTypes.any,

  } );

  render() {

    let { props } = this;

    let path = applyD3Props( d3.linkRadial(), _.pick( props, _.keys( d3propTypes ) ) );


    return (

      <path

        {... _.omit( props, _.keys( RadialLink.propTypes ) ) }

        d={ path( props.data ) }

        fill={ props.fill || 'none' }

      />

    );

  }

}
