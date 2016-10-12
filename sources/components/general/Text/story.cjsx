Text = requireSubject()


stories = StoriesOf 'C Text', module


stories.add 'demo', ->=

  <Demo

    target={ Text }

    background='none'

    props={

      'text': P.text 'hello\n\nworld\nagain'

    }

  />

##
