@Mixin.mix

export default class Form extends React.Component {

  static displayName = 'Form';

  static mixins = [

    ReactoidMixin( {

      classes: {

        '-loading': '',

        '-focused': '',

      },

      purifiedPaths: [ 'props.modifyAjax', 'props.getResults', 'props.onResults' ],

      dirtiedPaths: [ 'props.children' ],

    } ),

    AjaxMixin(),

    FocusMixin(),

  ];

  static propTypes = {

    modifyAjax: React.func, // ( that: mixed, ajax: object ) => void

    getResult: PropTypes.func.isRequired, // ( that: mixed, jqXHR: object ) => mixed

    onResult: PropTypes.func, // ( that: mixed, result: mixed, results: Array< mixed > ) => void

    children: PropTypes.funced( PropTypes.node ) // ( that: mixed, arg: { loading: boolean, result: mixed, results: Array< mixed > } ) => React.Node

  };

  static defaultProps = {

    modifyAjax: _.noop,

    getResult: _.noop,

    onResult: _.noop,

  };

  getInitialState() {

    return { results: [] };

  }

  onSubmit( event ) {

    event.preventDefault();

    let ajax = getFormAjax( this.dom() );

    ajax.complete = _.queue( ajax.complete, ( xhr, status ) => {

      if ( status === 'abort' ) return;

      let result = this.props.getResults( this, xhr );

      let results = _.append( _.clone( this.state.results ), result );

      this.setState( { results } );

      this.props.onResult( this, result, results );

    } );

    this.props.modifyAjax( this, ajax );

    this.sendAjax( 'submit', ajax );

  }

  render() {

    let { props, state } = this;

    let loading = this.isWaitingAjax( 'submit' );

    let focused = this.isFocused();

    let results = state.results;

    let result = _.last( results );


    return (

      <form

        { ...this.omitProps() }

        className={ this.classed( '', { loading, focused } ) }

        onFocus={ this.callbacks( 'onFocusGain, props.onFocus' ) }

        onBlur={ this.callbacks( 'onFocusLoss, props.onBlur' ) }

        onSubmit={ this.callbacks( 'onSubmit, props.onSubmit' ) }

        children={ _.funced( props.children, this, { loading, result, results } ) }

      />

    );

  }

}
