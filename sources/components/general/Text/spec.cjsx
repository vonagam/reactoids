describe 'Text', ->

  Text = requireSubject()


  it 'renders html from string [r]', ->

    props = {

      'text': "asd\n\nbsa\nqwe"

      'preProcess': ( text )->= '1' + text

      'postProcess': ( text )->= text + '2'

      'className': 'check'

      'data-unknown': 3

    }


    instance = render <Text {... props } />


    expect( instance ).to.have.html(

      '
      <div data-unknown="3" class="processed text check">\
        <p class="paragraph">1asd</p>\
        <p class="paragraph">bsa<br>qwe</p>\
        2\
      </div>\
      '

    )

  ##

  it 'should be tested better'

##
