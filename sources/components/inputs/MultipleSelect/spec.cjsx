describe 'MultipleSelect', ->

  MultipleSelect = requireSubject()


  it 'renders [s]', ->

    props = {

      options: [ 'go', 2, { value: null, label: 22 } ]

      value: [ 2, null ]

      'data-unknown': 3

    }


    instance = shallow <MultipleSelect {... props } />


    expect( instance ).to.have.html(

      '
      <select data-unknown="3" class="multiple_select -value" multiple="">\
        <option class="option" value="0">go</option>\
        <option selected="" class="option -selected" value="1">2</option>\
        <option selected="" class="option -selected" value="2">22</option>\
      </select>\
      '

    )

  ##

##
