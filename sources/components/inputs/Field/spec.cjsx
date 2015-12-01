describe 'Field', ->

  Field = requireSubject()

  Input = requireSource 'Input'


  it 'can be rendered', ->

    TestReact.render <Field type={ Input } />
