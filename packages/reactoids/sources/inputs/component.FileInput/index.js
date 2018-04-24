// https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file


const MODES = {

  single: {

    valueType: PropTypes.object,

    emptyValue: null,

    toFiles: ( value ) => value === null ? [] : [ value ],

    toValue: ( files ) => files.length === 0 ? null : files[ 0 ],

  },

  multiple: {

    valueType: PropTypes.arrayOf( PropTypes.object ),

    emptyValue: [],

    toFiles: ( value ) => value,

    toValue: ( files ) => files,

  },

}

const getMode = function( props ) {

  return props.multiple ? MODES.multiple : MODES.single;

};


// https://gist.github.com/guest271314/7eac2c21911f5e40f48933ac78e518bd

const toFileList = function( files ) {

  let dataTransfer = ( new ClipboardEvent( '' ).clipboardData || new DataTransfer() );

  _.each( files, ( file ) => {

    dataTransfer.items.add( file );

  } );

  return dataTransfer.files;

};


@Mixin.mix

class FileInputItem extends React.Component {

  static displayName = 'FileInputItem';

  static mixins = [

    PureRenderMixin(),

    RefMixin(),

  ];

  static propTypes = {

    input: PropTypes.object,

    file: PropTypes.any,

    preview: PropTypes.bool,

    tabIndex: InputShared.PropTypes.tabIndex,

    onRemove: PropTypes.func,

    Button: PropTypes.any,

  };

  componentDidMount() {

    if ( this.props.preview ) {

      this.setPreviewSrc();

    }

  }

  componentDidUpdate( prevProps ) {

    if ( this.props.preview && ! this.refs.preview.src ) {

      this.setPreviewSrc();

    }

  }

  setPreviewSrc() {

    let url = window.URL.createObjectURL( this.props.file );

    let preview = this.refs.preview;

    preview.onload = () => window.URL.revokeObjectURL( url );

    preview.src = url;

  }

  stringifyFileSize( size ) {

    if ( size < 1024 ) {

      return size + ' bytes';

    } else if ( size < 1048576 ) {

      return ( size / 1024 ).toFixed( 1 ) + ' KB';

    } else {

      return ( size / 1048576 ).toFixed( 1 ) + ' MB';

    }

  }

  render() {

    let { Button } = this.props;

    let { props } = this;

    let input = props.input;

    let file = props.file;


    return (

      <div className={ input.classed( 'file' ) }>

        <div className={ input.classed( 'name' ) } children={ file.name } />

        <div className={ input.classed( 'size' ) } children={ this.stringifyFileSize( file.size ) } />

        {

          ( props.preview ) ?

            <img ref={ this.ref( 'preview' ) } className={ input.classed( 'preview' ) } />

          : null

        }

        <Button

          className={ input.classed( 'remove' ) }

          tabIndex={ props.tabIndex }

          onClick={ props.onRemove }

          children={ input.stringed( 'remove' ) }

        />

      </div>

    );

  }

}


@Mixin.mix

export default class FileInput extends React.Component {

  static displayName = 'FileInput';

  static mixins = [

    ReactoidMixin( {

      classes: {

        '-multiple': '',

        '-preview': '',

        '-value': '',

        '-invalid': '',

        '-focused': '',

        '-readonly': '',

        '-disabled': '',

        '-required': '',

        files: {

          file: {

            name: '',

            size: '',

            preview: '',

            remove: '',

          },

        },

        dropzone: {

          '-dropping': '',

          drop: '',

        },

        actions: {

          action: {

            '-select': '',

            '-clear': '',

          },

        },

        input: '',

      },

      strings: [ 'select', 'clear', 'remove', 'drop', 'invalid.required' ],

      Components: { Button },

    } ),

    InputMixin( {

      valueType( props ) {

        return getMode( props ).valueType.apply( this, arguments );

      },

      emptyValue( props ) {

        return getMode( props ).emptyValue;

      },

      validateValue( that, value ) {

        if ( that.props.required && that.isEmptyValue( value ) ) return that.stringed( 'invalid.required' );

      },

      onValidation( that, message ) {

        that.refs.input.setCustomValidity( message );

      },

    } ),

  ];

  static propTypes = {

    multiple: PropTypes.bool,

    accept: PropTypes.string,

    preview: PropTypes.bool,

    name: PropTypes.string,

    tabIndex: InputShared.PropTypes.tabIndex,

  };

  static defaultProps = {

    multiple: false,

    preview: false,

  };

  getInitialState() {

    return { dropping: false };

  }

  componentDidMount() {

    let value = this.getValue();

    if ( ! _.isEmpty( value ) ) {

      this.setInputFiles( value );

    }

  }

  componentWillReceiveProps( nextProps ) {

    if ( nextProps.multiple === this.props.multiple ) return;

    if ( nextProps.value !== undefined ) return;

    let prevValue = this.getValue();

    let files = getMode( this.props ).toFiles( prevValue );

    let nextValue = getMode( nextProps ).toValue( files );

    this.setValue( nextValue );

  }

  componentDidUpdate( prevProps, prevState ) {

    let prevValue = this.getValue( prevProps, prevState );

    let nextValue = this.getValue();

    if ( ! _.isEqual( nextValue, prevValue ) ) {

      this.setInputFiles( nextValue );

    }

  }

  setInputFiles( value ) {

    let mode = getMode( this.props );

    let files = mode.toFiles( value );

    let input = this.refs.input;

    if ( _.isEqual( files, _.toArray( input.files ) ) ) return;

    let fileList = toFileList( files );

    input.files = fileList;

  }

  getFileKey( file ) {

    return `${ file.name }.${ file.type }.${ file.size }.${ file.lastModified }`;

  }

  onChange( event ) {

    let newFiles = _.toArray( _.get( event, 'dataTransfer.files' ) || _.get( event, 'target.files' ) );

    if ( newFiles.length === 0 ) return;


    let mode = getMode( this.props );

    let prevValue = this.getValue();

    let files = mode.toFiles( prevValue );

    files = newFiles.concat( files );

    files = _.uniqBy( files, this.getFileKey );

    let nextValue = mode.toValue( files );

    this.setValue( nextValue );

  }

  onRemove( index ) {

    let mode = getMode( this.props );

    let prevValue = this.getValue();

    let files = _.clone( mode.toFiles( prevValue ) );

    files.splice( index, 1 )

    let nextValue = mode.toValue( files );

    this.setValue( nextValue );

  }

  onSelect() {

    this.refs.input.click();

  }

  onClear() {

    let mode = getMode( this.props );

    let nextValue = mode.emptyValue;

    this.setValue( nextValue );

  }

  onDragOver( event ) {

    event.preventDefault();

    this.setState( { dragging: true } );

    event.dataTransfer.dropEffect = 'copy';

  }

  onDragLeave( event ) {

    this.setState( { dragging: false } );

  }

  onDrop( event ) {

    event.preventDefault();

    this.setState( { dragging: false } );

    this.onChange( event );

  }

  render() {

    let { Button } = this.props.Components;

    let { props, state } = this;

    let value = this.getValue();

    let filled = ! this.isEmptyValue( value );

    let invalid = this.getValueValidity();

    let focused = this.isFocused();

    let multiple = props.multiple;

    let readonly = props.readOnly;

    let disabled = props.disabled;

    let required = props.required;

    let preview = props.preview;


    let mode = getMode( this.props );

    let files = mode.toFiles( value );


    return (

      <div

        { ...this.omitProps() }

        className={ this.classed( '', { multiple, preview, value: filled, invalid, focused, readonly, disabled, required } ) }

      >

        <div className={ this.classed( 'files' ) }>

          {

            _.map( files, ( file, index ) =>

              <FileInputItem

                key={ this.getFileKey( file ) }

                input={ this }

                file={ file }

                preview={ preview }

                tabIndex={ props.tabIndex }

                onRemove={ this.callback( 'onRemove', index ) }

                Button={ Button }

              />

            )

          }

        </div>

        <div

          className={ this.classed( 'dropzone' ) }

          onClick={ this.callbacks( 'onSelect' ) }

          onDragLeave={ this.callbacks( 'onDragLeave' ) }

          onDragOver={ this.callbacks( 'onDragOver' ) }

          onDrop={ this.callbacks( 'onDrop' ) }

          children={ <div className={ this.classed( 'drop' ) } children={ this.stringed( 'drop' ) } /> }

        />

        <div className={ this.classed( 'actions' ) }>

          <Button

            className={ this.classed( 'action', { select: true } ) }

            tabIndex={ props.tabIndex }

            onClick={ this.callbacks( 'onSelect' ) }

            children={ this.stringed( 'select', { value, multiple } ) }

          />

          <Button

            className={ this.classed( 'action', { clear: true } ) }

            disabled={ ! filled }

            tabIndex={ props.tabIndex }

            onClick={ this.callbacks( 'onClearClick' ) }

            children={ this.stringed( 'crear' ) }

          />

        </div>

        <input

          ref='input'

          className={ this.classed( 'input' ) }

          type='file'

          multiple={ multiple }

          accept={ props.accept }

          tabIndex='-1'

          onChange={ this.callbacks( 'onChange' ) }

        />

      </div>

    );

  }

}
