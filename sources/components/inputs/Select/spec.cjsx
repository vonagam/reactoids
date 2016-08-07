describe 'Select', ->

  Select = requireSubject()


  it 'renders [s]', ->

    props = {

      options: [ 'go', 2, { value: null, label: 22 } ]

      value: 2

      'data-unknown': 3

    }


    instance = shallow <Select {... props } />


    expect( instance ).to.have.html(

      '
      <select data-unknown="3" class="select -value">\
        <option class="option -blank" value="-1"></option>\
        <option class="option" value="0">go</option>\
        <option selected="" class="option -selected" value="1">2</option>\
        <option class="option" value="2">22</option>\
      </select>\
      '

    )

  ##

##
