describe 'Fields', ->

  Fields = requireSubject()

  Input = requireSource 'Input'


  it 'can be rendered', ->

    scheme = check: { type: Input }

    TestReact.render <Fields scheme={ scheme } />
