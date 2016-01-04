describe 'RenderSlots', ->

  RenderSlots = requireSubject()


  it 'works', ->

    ARGS = names: [ 'first', 'second' ]


    RenderSloted = TestMixin.createMixinClass RenderSlots( ARGS ),

      getInitialState: ->=

        key: 'value'

      ##

      getDefaultProps: ->=

        renderFirst: ( component, slotProps, userProps )->=

          <div {... slotProps } {... userProps } />

        ##

        renderSecond: ( component, slotProps, userProps )->=

          <div {... slotProps } {... userProps } />

        ##

      ##

      render: ->=

        <div>
          { @renderFirst 'data-slot': 'slot' }
          { @renderSecond 'data-slot': 'slot' }
        </div>

      ##

    ##


    renderSecond = ( component, slotProps, userProps )->=

      [
        <span key='state' data-state={ component.state.key } />
        <span key='slot' {... slotProps } />
        <span key='user' {... userProps } />
      ]

    ##


    expect( TestReact.renderShallow(

      <RenderSloted
        first={ 'data-user': 'user' }
        second={ 'data-user': 'user' }
        renderSecond={ renderSecond }
      />

    ) ).eql(

      <div>
        <div data-slot='slot' data-user='user' />
        { [
          <span key='state' data-state='value' />
          <span key='slot' data-slot='slot' />
          <span key='user' data-user='user' />
        ] }
      </div>

    )

  ##

##
