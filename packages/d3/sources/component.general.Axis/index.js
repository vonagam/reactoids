// https://github.com/d3/d3-axis#api-reference


const d3propTypes = {

  scale: PropTypes.func,

  tickArguments: PropTypes.array,

  tickValues: PropTypes.array,

  tickFormat: PropTypes.func,

  tickSize: PropTypes.number,

  tickSizeInner: PropTypes.number,

  tickSizeOuter: PropTypes.number,

  tickPadding: PropTypes.number,

};

const d3defaultProps = ( () => {

  let axis = d3.axisTop();

  return _.transform( d3propTypes, ( d3defaultProps, type, key ) => {

    d3defaultProps[ key ] = axis[ key ]();

  }, {} );

} )();


const orientMapping = {

  top: 'axisTop',

  bottom: 'axisBottom',

  left: 'axisLeft',

  right: 'axisRight',

};


const updateAxis = function( axis, node, prevProps, nextProps, initial ) {

  let changed = onPropsDiff( prevProps, nextProps, d3defaultProps,

    ( key ) => {

      axis[ key ]( nextProps[ key ] );

    },

    ( key ) => {

      axis[ key ]( defaults[ key ] );

    },

  );

  if ( changed || initial ) {

    d3.select( node ).call( axis );

    nextProps.onChange( node, initial, nextProps );

  }

};

const createAxis = function( node, props ) {

  let axis = d3[ orientMapping[ props.orient ] ]();

  while ( node.firstChild ) node.removeChild( node.firstChild );

  updateAxis( axis, node, {}, props, true );

  return axis;

};


export default class Axis extends React.Component {

  static propTypes = _.assign( {}, d3propTypes, {

    orient: PropTypes.oneOf( _.keys( orientMapping ) ), // constant prop

    onChange: PropTypes.func,

  } );

  static defaultProps = {

    orient: 'top',

    onChange: _.noop,

  };

  componentDidMount() {

    this.axis = createAxis( this.refs.node, this.props );

  }

  componentDidUpdate( prevProps ) {

    if ( this.props.orient !== prevProps.orient ) {

      this.axis = createAxis( this.refs.node, this.props );

    } else {

      updateAxis( this.axis, this.refs.node, prevProps, this.props );

    }

  }

  render() {

    let { props } = this;


    return (

      <g

        ref='node'

        {... _.omit( props, _.keys( Axis.propTypes ) ) }

      />

    );

  }

}



