export default SingleOptionInputMixin = Mixin.create( {

  name: 'SingleOptionInputMixin',

  mixins: [

    { Mixin: BaseOptionsInputMixin, omit: [ 'isOptionSelected', 'checkOptionsConflict' ] },

  ],

  mixin( ARGS ) {

    const BaseOptionsInputArgs = _.defaults( {

      isOptionSelected( that, option, value ) {

        return option.value === value;

      },

      checkOptionsConflict( that, props, state ) {

        let selectedValue = that.getValue( props, state );

        let options = that.getOptions( props, state );

        let allowedValue = _.some( options, { value: selectedValue } ) ? selectedValue : undefined;

        if ( allowedValue !== undefined ) {

          return;

        }

        if ( props.allowBlank === false && options.length > 0 ) {

          allowedValue = options[ 0 ].value;

        }

        if ( selectedValue !== allowedValue ) {

          that.setTempValue( allowedValue );

        }

      },

    }, BaseOptionsInputMixin.pick( ARGS ) );


    return {

      mixins: [

        BaseOptionsInputMixin( BaseOptionsInputArgs ),

      ],

      toggleOption( option, bool ) {

        if ( bool === undefined ) {

          bool = ! option.selected;

        } else {

          if ( bool === option.selected ) return;

        }

        let nextValue = bool ? option.value : undefined;

        if ( nextValue === undefined && this.props.allowBlank === false ) {

          return;

        }

        this.setValue( nextValue );

      },

    };

  },

} );
