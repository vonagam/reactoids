# mixins

BaseOptionsInputMixin = requireSource 'mixins/BaseOptionsInput'


MultipleOptionsInputMixins = Mixin.create {

  name: 'MultipleOptionsInputMixins'

  mixins: [

    BaseOptionsInputMixin

  ]

  mixin: _.once ->=

    BaseOptionsInputArgs = {

      isOptionSelected: ( option, selectedValue )->=

        _.includes selectedValue, option.value

      ##

      checkOptionsConflict: ( that, props, state )->

        selectedValues = that.getValue props, state

        options = that.getOptions props, state

        optionsValues = _.map options, 'value'

        allowedValues = _.difference selectedValues, optionsValues


        if allowedValues.length == 0

          if props.allowBlank == false && options.length > 0

            that.setValue [ options[ 0 ].value ]

            return

          ##

        ##


        if allowedValues.length != selectedValues.length

          that.setValue allowedValues

        ##

      ##

    }


    mixins: [

      BaseOptionsInputMixin BaseOptionsInputArgs

    ]

    getDefaultProps: ->=

      'defaultValue': []

    ##

  ##

}


module.exports = MultipleOptionsInputMixins
