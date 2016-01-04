describe 'Classed', ->

  Classed = requireSubject()


  getClassNames = _.memoize ( id, constructor, keys, that )->=

    result = {}

    name = _.camelCase constructor.displayName

    _.each keys, ( key )->

      if key == '.'

        result[ key ] = name

      else

        result[ key ] = ( name + '.' + key ).replace( /\.-/g, '-' ).replace( /\./g, '_' )

      ##

    ##

    result

  ##


  it 'works with context', ->

    Classeded = TestMixin.createMixinClass Classed( classes: { 'nested': { '-modifier': '' } } ),

      displayName: 'Classeded'

      render: ->=

        c = @classed

        <div className={ c '.' }>
          <div className={ c 'nested -modifier' } />
          <div className={ c 'nested', '-modifier' } />
          <div className={ c [ 'nested', '-modifier' ] } />
          <div className={ c 'nested nested.-modifier' } />
          <div className={ c 'unknown' } />
        </div>

      ##

    ##


    expect( TestReact.renderShallow(

      <Classeded className='asd' />,

      getClassNames: getClassNames

    ) ).eql(

      <div className='classeded asd'>
        <div className='classeded_nested classeded_nested-modifier' />
        <div className='classeded_nested classeded_nested-modifier' />
        <div className='classeded_nested classeded_nested-modifier' />
        <div className='classeded_nested classeded_nested-modifier' />
        <div className={ undefined } />
      </div>

    )

  ##


  it 'works with context and prop', ->

    Classeded = TestMixin.createMixinClass Classed( classes: { '-mod': '' } ),

      displayName: 'Check'

      render: ->=

        <div className={ @classed '.', '-mod', 'unknown', undefined } />

      ##

    ##


    checks = [

      {
        input: 'asd'
        output: 'check asd check-mod'
      }
      {
        input: [ 'a', 'sd', undefined ]
        output: 'check a sd check-mod'
      }
      {
        input: { '.': 'asd', '-mod': 'bsa' }
        output: 'check asd check-mod bsa'
      }
      {
        input: { 'unknown': 'asd' }
        output: 'check check-mod asd'
      }

    ]


    _.each checks, ( check )->

      expect( TestReact.renderShallow(

        <Classeded className={ check.input } />,

        getClassNames: getClassNames

      ) ).eql(

        <div className={ check.output } />

      )

    ##

  ##

##
