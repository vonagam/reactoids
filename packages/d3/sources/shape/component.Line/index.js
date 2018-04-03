// https://github.com/d3/d3-shape/blob/master/README.md#line


const d3propTypes = {

  x: PropTypes.func,

  y: PropTypes.func,

  defined: PropTypes.func,

  curve: PropTypes.func,

};


export default class Line extends React.Component {

  static propTypes = _.assign( {}, d3propTypes, {

    data: PropTypes.array,

  } );

  render() {

    let { props } = this;

    let path = applyD3Props( d3.line(), _.pick( props, _.keys( d3propTypes ) ) );


    return (

      <path

        {... _.omit( props, _.keys( Line.propTypes ) ) }

        d={ path( props.data ) }

        fill={ props.fill || 'none' }

      />

    );

  }

}
