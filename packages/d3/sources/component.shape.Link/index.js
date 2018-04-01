// https://github.com/d3/d3-shape/blob/master/README.md#links


const d3propTypes = {

  source: PropTypes.func,

  target: PropTypes.func,

  x: PropTypes.oneOfType( [ PropTypes.func, PropTypes.number ] ),

  y: PropTypes.oneOfType( [ PropTypes.func, PropTypes.number ] ),

};


export default class Link extends React.Component {

  static propTypes = _.assign( {}, d3propTypes, {

    type: PropTypes.oneOf( [ 'horizontal', 'vertical' ] ),

    data: PropTypes.any,

  } );

  static defaultProps = {

    type: 'horizontal',

  };

  render() {

    let { props } = this;

    let link = props.type === 'vertical' ? d3.linkVertical() : d3.linkHorizontal();

    let path = applyD3Props( link, _.pick( props, _.keys( d3propTypes ) ) );


    return (

      <path

        {... _.omit( props, _.keys( Link.propTypes ) ) }

        d={ path( props.data ) }

        fill={ props.fill || 'none' }

      />

    );

  }

}
