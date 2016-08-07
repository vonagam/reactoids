describe.skip 'Field', ->

  Field = requireSubject()

  Input = requireSource 'components/inputs/Input'


  it 'can be rendered', ->

    TestReact.render <Field type={ Input } />

  ##

##
