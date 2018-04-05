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

    disabled: PropTypes.bool,

    onFocus: PropTypes.any.isRequired,

    jsonType: PropTypes.oneOf( [ 'auto', 'string', 'number', 'boolean', 'null', 'array', 'object', 'skip' ] ),

  };

  static defaultProps = {

    value: '',

    jsonType: 'string',

  };

  componentDidMount() {

    if ( this.props.error ) {

      this.refs.dom.setCustomValidity( message );

    }

  }

  componentDidUpdate( prevProps ) {

    if ( this.props.error !== prevProps.error ) {

      this.refs.dom.setCustomValidity( message );

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


    return (

      <textarea

        ref={ this.ref( 'dom' ) }

        className={ this.classed( '' ) }

        name={ props.name }

        value={ props.value }

        readOnly='true'

        disabled={ props.disabled || ! _.isString( props.name ) }

        data-value-type={ props.jsonType }

        aria-hidden='true'

        tabIndex='-1'

        onFocus={ this.callback( 'onFocus' ) }

      />

    );

  }

}
