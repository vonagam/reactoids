@Mixin.mix

export default class CustomInputSoul extends React.Component {

  static displayName = 'CustomInputSoul';

  static mixins = [

    ReactoidMixin(),

  ];

  static propTypes = {

    name: PropTypes.string,

    value: PropTypes.any,

    error: PropTypes.string,

    errorOnly: PropTypes.bool,

    disabled: PropTypes.bool,

    jsonType: PropTypes.oneOf( [ 'auto', 'string', 'number', 'boolean', 'null', 'array', 'object', 'skip' ] ),

    onFocus: PropTypes.any.isRequired,

  };

  static defaultProps = {

    value: '',

    errorOnly: false,

    jsonType: 'string',

  };

  componentDidMount() {

    if ( this.props.error ) {

      this.refs.dom.setCustomValidity( this.props.error );

    }

  }

  componentDidUpdate( prevProps ) {

    if ( this.props.error !== prevProps.error && this.refs.dom ) {

      this.refs.dom.setCustomValidity( this.props.error );

    }

  }

  onFocus( event ) {

    let onFocus = this.props.onFocus;

    if ( _.isFunction( onFocus ) ) {

      onFocus( event );

    } else {

      onFocus.focus();

    }

  }

  render() {

    let { props } = this;


    if ( props.name === undefined ) return null;

    if ( props.disabled ) return null;

    if ( props.errorOnly && ! props.error ) return null;


    return (

      <textarea

        ref={ this.ref( 'dom' ) }

        { ...this.omitProps() }

        className={ this.classed( '' ) }

        name={ props.name }

        value={ props.value }

        readOnly='true'

        tabIndex='-1'

        aria-hidden='true'

        data-value-type={ props.jsonType }

        onFocus={ this.callback( 'onFocus' ) }

      />

    );

  }

}
