describe 'Popup', ->

  $ = requireDependency 'jquery'

  Popup = requireSubject()

  Layer = requireSource 'components/general/Layer'


  it 'renders [s]', ->

    props = {

      'layerProps': {

        'layer': {

          'order': 5

        }

        'data-unknown': 4

      }

      'data-unknown': 3

      'children': 'check'

    }

    layerProps = _.assign {}, _.get( props, 'layerProps' ), className: 'layer'

    popupProps = _.assign {}, _.omit( props, 'layerProps' ), className: 'popup'


    instance = shallow <Popup {... props } />


    expect( instance ).to.contain <Layer {... layerProps }><div {... popupProps } /></Layer>

  ##

  it 'mounts layer at root [m]', ->

    div = mount <div />

    props = {

      'className': { 'body': 'custom' }

      'layerProps': {

        'layer': {

          'root': div.node

        }

        'data-unknown': 4

      }

      'data-unknown': 3

      'children': 'check'

    }


    instance = mount <Popup {... props } />


    expect( $( 'body' ).hasClass 'body custom' ).to.be.true


    instance.unmount()


    expect( $( 'body' ).hasClass 'body custom' ).to.be.false

  ##

  it 'may be tested better'

##
