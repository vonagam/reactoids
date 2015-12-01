describe 'Stringed', ->

  Stringed = requireSubject()


  checks = [

    {
      title: 'nothing'
      props: {}
      context: {}
      output: [ undefined, undefined ]
    }
    {
      title: 'props'
      props: strings: { asd: 'foo' }
      context: {}
      output: [ 'foo', undefined ]
    }
    {
      title: 'context'
      props: {}
      context: getStrings: ->= asd: 'asd', bsa: 'bsa'
      output: [ 'asd', 'bsa' ]
    }
    {
      title: 'props and context'
      props: strings: { asd: 'foo' }
      context: getStrings: ->= asd: 'asd', bsa: 'bsa'
      output: [ 'foo', 'bsa' ]
    }

  ]


  _.each checks, ( check )->

    it "works with #{ check.title }", ->

      ARGS = strings: [ 'asd', 'bsa' ]

      MyStringeded = TestMixin.createMixinClass Stringed( ARGS ),

        render: ->=

          <div>
            <span>{ @stringed 'asd' }</span>
            <span>{ @stringed 'bsa' }</span>
          </div>

      expect( TestReact.renderShallow(

        <MyStringeded {... check.props } />,

        check.context

      ) ).eql(

        <div>
          <span>{ check.output[ 0 ] }</span>
          <span>{ check.output[ 1 ] }</span>
        </div>

      )
