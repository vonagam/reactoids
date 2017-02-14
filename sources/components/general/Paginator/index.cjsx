# mixins

StringedMixin = requireSource 'mixins/Stringed'


PAGES = {

  first: ( current, total )->= 0

  prev: ( current, total )->= if current == 0 then undefined else current - 1

  next: ( current, total )->= if current == total - 1 then undefined else current + 1

  last: ( current, total )->= total - 1

}


Paginator = React.createClass {

  mixins: Mixin.resolve [

    ComponentMixin {

      classes: {

        'separator': ''
        'button': {
          '-number': ''
          '-named': ''
          '-enabled': ''
          '-disabled': ''
          '-current': ''
        }

      }

    }

    StringedMixin strings: [ 'first', 'prev', 'next', 'last' ]

  ]

  propTypes: {

    'current': React.PropTypes.number.isRequired

    'total': React.PropTypes.number.isRequired

    'size': React.PropTypes.number.isRequired

    'url': React.PropTypes.func.isRequired # ( page )->=

  }

  getDefaultProps: ->=

    'size': 2

  ##

  render: ->=

    { props, classed, stringed } = this

    { current, total, size } = props


    items = []

    if total <= size * 2 + 3

      _.append items, _.range total

    else

      side = Math.ceil size / 2

      near = Math.floor size / 2

      if current <= size + 1

        _.append items, _.range 0, size + near + 2

        items.push undefined

        _.append items, _.range total - side, total

      else if current >= total - size - 2

        _.append items, _.range 0, side

        items.push undefined

        _.append items, _.range total - ( size + near + 2 ), total

      else

        _.append items, _.range 0, side

        items.push undefined

        _.append items, _.range current - near, current + near + 1

        items.push undefined

        _.append items, _.range total - side, total

      ##

    ##

    _.prepend items, [ 'first', 'prev' ]

    _.append items, [ 'next', 'last' ]


    <div {... @omitProps() } className={ classed '.' }>

      {

        _.map items, _.bind ( item, index )->=

          if _.isNumber( item ) || _.isString( item )

            if _.isNumber item

              page = item

              type = '-number'

              content = item

            else

              page = PAGES[ item ] current, total

              type = '-named'

              content = stringed item

            ##

            isCurrent = page == current

            isEnabled = page != undefined && page != current


            <a

              key={ item }

              className={ classed 'button', type, "-#{ if isEnabled then 'enabled' else 'disabled' }", '-current': isCurrent }

              href={ if isEnabled then props.url page else undefined }

              children={ content }

            />

          else

            <span

              key={ 's' + index }

              className={ classed 'separator' }

            />

          ##

        , this

      }

    </div>

  ##

}


module.exports = Paginator
