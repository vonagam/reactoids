# mixins

BaseOptionsInput = requireSource 'mixins/BaseOptionsInput'


mixin = BaseOptionsInput {

  isOptionSelected: ( option, selectedValue )->=

    option.value == selectedValue

  ##

  checkOptionsConflict: ( that, props, state )->

    selectedValue = that.getValue props, state

    options = that.getOptions props, state

    optionsValues = _.map options, 'value'

    allowedValue = if _.includes optionsValues, selectedValue then selectedValue else undefined


    if allowedValue == undefined

      if props.allowBlank == false && options.length > 0

        that.setValue options[ 0 ].value

        return

      ##

    ##


    if allowedValue != selectedValue

      that.setValue allowedValue

    ##

  ##

}


module.exports = mixin
