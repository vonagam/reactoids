@Mixin.mix

export default class CustomInputSoul extends React.Component {

  static displayName = 'CustomInputSoul';

  static mixins = [

    ReactoidMixin(),

  ];

  static propTypes = {

    name: PropTypes.string,

    value: PropTypes.any,

    validity: PropTypes.string,

    validityOnly: PropTypes.bool,

    disabled: PropTypes.bool,

    jsonType: InputShared.PropTypes.jsonType,

    onFocus: PropTypes.any.isRequired,

  };

  static defaultProps = {

    value: '',

    validityOnly: false,

    jsonType: 'string',

  };

  componentDidMount() {

    if ( this.props.validity ) {

      this.refs.dom.setCustomValidity( this.props.validity );

    }

  }

  componentDidUpdate( prevProps ) {

    if ( this.props.validity !== prevProps.validity && this.refs.dom ) {

      this.refs.dom.setCustomValidity( this.props.validity );

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

    if ( props.validityOnly && ! props.validity ) return null;


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

        onFocus={ this.callbacks( 'onFocus' ) }

      />

    );

  }

}
