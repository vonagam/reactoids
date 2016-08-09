describe 'Layer', ->

  Layer = requireSubject()

  Mixin = requireSource 'various/Mixin'

  ClassedMixin = requireSource 'mixins/Classed'

  StringedMixin = requireSource 'mixins/Stringed'


  it 'renders [s]', ->

    instance = shallow <Layer />


    expect( instance ).to.be.blank()

  ##

  it 'mounts layer at root [m]', ->

    ContextCheck = React.createClass {

      mixins: Mixin.resolve [

        ClassedMixin()

        StringedMixin strings: [ 'context' ]

      ]

      render: ->= <div className={ @classed '.' }>{ @stringed 'context' }</div>

    }


    div = mount <div />

    props = {

      'layer': {

        'root': div.node

      }

      'data-unknown': 3

      'children': <ContextCheck />

    }


    instance = mount <Layer {... props } />


    expect( div ).to.have.html(

      '
      <div data-reactroot="">\
        <div data-layer-order="0">\
          <div data-reactroot="" data-unknown="3" class="layer">\
            <div class="context_check">#context</div>\
          </div>\
        </div>\
      </div>\
      '

    )


    instance.unmount()


    expect( div ).to.have.html '<div data-reactroot=""></div>'

  ##

  it 'may be tested better'

##
