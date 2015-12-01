describe 'Timer', ->

  Timer = requireSubject()


  it 'works', ( done )->

    Timered = TestMixin.createMixinClass Timer


    count = 0

    component = TestReact.render <Timered />


    component.setInterval 'check', ->

      count++

      if count == 2

        component.clearInterval 'check'

        component.setTimeout 'check', ( param )->

          expect( param ).equal 'some'

          expect( count ).equal 2

          TestReact.unmount component

          done()

        , 5, 'some'

    , 1
