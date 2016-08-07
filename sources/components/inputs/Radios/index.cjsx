# mixins

SingleOptionInputMixin = requireSource 'mixins/SingleOptionInput'


Radios = React.createClass {

  mixins: Mixin.resolve [

    ComponentMixin {

      classes: {

        '-value': ''
        '-readonly': ''
        'option':
          '-selected': ''
          'input': ''
          'label': ''

      }

    }

    SingleOptionInputMixin

  ]

  onClick: ( option )->

    if option.selected

      @setValue undefined if @props.allowBlank

    else

      @setValue option.value

    ##

  ##

  render: ->=

    { props, classed } = this

    options = @getOptions()

    selectedIndex = _.findIndex options, selected: true


    <div {... @omitProps() } className={ classed '.', '-value': selectedIndex != -1, '-readonly': props.readOnly }>

      {

        _.map options, _.bind ( option, index )->=

          <div

            key={ index }

            className={ classed 'option', '-selected': option.selected }

            onClick={ _.partial @onClick, option }

          >

            <input className={ classed 'input' } type='radio' checked={ option.selected } onChange={ _.noop } />

            <label className={ classed 'label' }>{ option.label }</label>

          </div>

        , this

      }

    </div>

  ##

}


module.exports = Radios
