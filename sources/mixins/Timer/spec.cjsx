describe 'Timer', ->

  Timer = requireSubject()


  it 'works', ( done )->

    Timered = TestMixin.createMixinClass Timer


    count = 0

    component = TestReact.render <Timered />


    component.setInterval 'check', ->

      count++

      expect( count ).most 2

      if count == 2

        component.clearInterval 'check'

        component.setTimeout 'check', ( param )->

          count++

          expect( count ).equal 3

          expect( param ).equal 'some'

          TestReact.unmount component

          done()

        , 5, 'some'

    , 1
