Tether = requireSubject()


stories = StoriesOf 'C Tether', module


stories.add 'demo', ->=

  <Demo

    target={ Tether }

    background='none'

    props={

      'enabled': P.bool true

      'tether': P.shape {

        'target': P.string 'body'

        'attachment': P.string 'top left'

        'targetAttachment': P.string 'top left'

        'offset': P.string '0 0'

        'targetOffset': P.string '0 0'

        'targetModifier': P.choices [ 'visible', 'scroll-handle' ]

        'optimizations': P.shape {

          'moveElement': P.bool true

          'gpu': P.bool true

        }

        'addTargetClasses': P.bool true

      }

      'children': P.string 'asd'

    }

  />

##
