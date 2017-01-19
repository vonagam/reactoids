Dummy = requireSubject()


stories = StoriesOf 'C Dummy', module


stories.add 'demo', ->=

  <Demo

    target={ Dummy }

    props={

      'className': P.string '_className_'

      'data-unknown': P.string '_unknown_'

      'onClick': P.callback.log()

    }

  />

##
