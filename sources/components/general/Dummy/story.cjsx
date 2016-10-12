Dummy = requireSubject()


stories = StoriesOf 'C Dummy', module


stories.add 'demo', ->=

  <Demo

    target={ Dummy }

    props={

      'className': P.string( 'meaningless' )

      'data-unknown': P.string( 'meaningless' )

      'onClick': P.callback.log()

    }

  />

##
