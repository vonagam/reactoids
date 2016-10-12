Moment = requireSubject()


stories = StoriesOf 'C Moment', module


stories.add 'demo', ->=

  <Demo

    target={ Moment }

    background='none'

    props={

      'time': P.string '1995-12-25'

      'timeFormat': P.string ''

      'reference': P.string '1995-11-25'

      'referenceFormat': P.string ''

      'format': P.choices [ 'calendar', 'fromNow', 'toNow', 'from', 'to', 'dddd, MMMM Do YYYY, h:mm:ss a' ]

      'suffix': P.bool true

    }

  />

##
