describe 'Scheme', ->

  Scheme = requireSubject()

  Input = requireSource 'components/inputs/Input'

  Fields = requireSource 'components/inputs/Fields'


  it 'works', ->

    SomeInput = {}

    scheme = new Scheme

    modelA = scheme.model 'a'

    modelA.fields

      a:
        {}

      b:
        messages: { label: 'labelB', note: 'noteB' }

      c:
        messages: { label: { content: 'labelC', position: 'after' } }

    scheme.model( 'b' ).fields

      d:
        type: SomeInput

      e:
        props: defaultValue: 'e'

    scheme.fields

      f:
        {}

    expect( scheme.toProp() ).eql [

      {
        key: 'a'
        type: Fields
        props: scheme: [
          {
            key: 'a'
            type: Input
            messages: {}
          }
          {
            key: 'b'
            type: Input
            messages: { label: { content: 'labelB', position: 'before' }, note: 'noteB' }
          }
          {
            key: 'c'
            type: Input
            messages: { label: { content: 'labelC', position: 'after' } }
          }
        ]
      }
      {
        key: 'b'
        type: Fields
        props: scheme: [
          {
            key: 'd'
            type: SomeInput
            messages: {}
          }
          {
            key: 'e'
            type: Input
            messages: {}
            props: defaultValue: 'e'
          }
        ]
      }
      {
        key: 'f'
        type: Input
        messages: {}
      }

    ]
