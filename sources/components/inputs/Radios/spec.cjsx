describe 'Radios', ->

  Radios = requireSubject()


  it 'renders [s]', ->

    props = {

      options: [ 'go', 2, { value: null, label: 22 } ]

      value: 2

      'data-unknown': 3

    }


    instance = shallow <Radios {... props } />


    expect( instance ).to.have.html(

      '
      <div data-unknown="3" class="radios -value">\
        <div class="option">\
          <input type="radio" class="input"/>\
          <label class="label">go</label>\
        </div>\
        <div class="option -selected">\
          <input type="radio" class="input" checked=""/>\
          <label class="label">2</label>\
        </div>\
        <div class="option">\
          <input type="radio" class="input"/>\
          <label class="label">22</label>\
        </div>\
      </div>\
      '

    )

  ##

##
