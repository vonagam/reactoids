describe 'Unison', ->

  Unison = requireSubject()


  it 'works', ( done )->

    @slow 100


    count = 0


    ARGS =

      name: 'my'

      shouldUnison: true

      duration: 1

      update: ( element )->

        return finishIt() if ( count++ ) == 8

        element.setState i: element.state.i + 1

        switch element.props.index

          when 0 then element.toggleMyUnison false

          when 1 then element.toggleMyUnison false if element.state.i == 3

        ##

      ##

    ##


    Unisoned = TestMixin.createMixinClass Unison( ARGS ),

      componentWillUnmount: ->

        expect( @inMyUnison ).equal false

      ##

      componentDidMount: ->

        expect( @inMyUnison ).equal true

      ##

      getInitialState: ->=

        i: 0

      ##

      render: ->=

        <div data-i={ @state.i } />

      ##

    ##


    root = TestReact.render(

      <div>
        {

          _.times 3, ( n )->= <Unisoned key={ n } index={ n } />

        }
      </div>

    )


    finishIt = ->

      datais = _.map root.getElementsByTagName( 'div' ), ( node )->= node.getAttribute 'data-i' 

      expect( datais ).eql [ '1', '3', '4' ]

      TestReact.unmount root

      done()

    ##

  ##

##
