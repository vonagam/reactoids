// https://github.com/d3/d3-shape/blob/master/README.md#lineRadial


const d3propTypes = {

  angle: PropTypes.func,

  radius: PropTypes.func,

  defined: PropTypes.func,

  curve: PropTypes.func,

};


export default class RadialLine extends React.Component {

  static propTypes = _.assign( {}, d3propTypes, {

    data: PropTypes.array,

  } );

  render() {

    let { props } = this;

    let path = applyD3Props( d3.lineRadial(), _.pick( props, _.keys( d3propTypes ) ) );


    return (

      <path

        {... _.omit( props, _.keys( RadialLine.propTypes ) ) }

        d={ path( props.data ) }

        fill={ props.fill || 'none' }

      />

    );

  }

}
