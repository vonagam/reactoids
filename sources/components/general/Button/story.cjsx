Button = requireSubject()


stories = StoriesOf 'C Button', module


stories.add 'demo', ->=

  <Demo

    target={ Button }

    props={

      'className': P.string '_className_'

      'href': P.string '_href_'

      'onClick': P.constant Action 'onClick'

      'children': P.string '_children_'

      'data-unknown': P.string '_unknown_'

    }

  />

##
