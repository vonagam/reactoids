describe 'Checkboxes', ->

  Checkboxes = requireSubject()


  it 'renders [s]', ->

    props = {

      options: [ 'go', 2, { value: null, label: 22 } ]

      value: [ 2, null ]

      'data-unknown': 3

    }


    instance = shallow <Checkboxes {... props } />


    expect( instance ).to.have.html(

      '
      <div data-unknown="3" class="checkboxes -value">\
        <div class="option">\
          <input type="checkbox" class="input"/>\
          <label class="label">go</label>\
        </div>\
        <div class="option -selected">\
          <input type="checkbox" class="input" checked=""/>\
          <label class="label">2</label>\
        </div>\
        <div class="option -selected">\
          <input type="checkbox" class="input" checked=""/>\
          <label class="label">22</label>\
        </div>\
      </div>\
      '

    )

  ##

##
