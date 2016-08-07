describe 'Checkbox', ->

  Checkbox = requireSubject()


  it 'renders [s]', ->

    props = {

      value: true

      'data-unknown': 3

    }


    instance = shallow <Checkbox {... props } />


    expect( instance ).to.have.html(

      '
      <div data-unknown="3" class="checkbox -selected">\
        <input type="checkbox" class="input" checked=""/>\
      </div>\
      '

    )

  ##

##
