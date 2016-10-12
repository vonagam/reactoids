YaShare = requireSubject()


stories = StoriesOf 'C YaShare', module


stories.add 'demo', ->=

  <Demo

    target={ YaShare }

    background='none'

    fullWidth={ true }

    props={

      'content': P.shape {

        'description': P.string 'Placeholder Description'

        'image': P.string 'http://placehold.it/299x199'

        'title': P.string 'Placeholder Title'

        'url': P.string 'http://placehold.it'

      }

      'theme': P.shape {

        'copy': P.choices [ 'last', 'first', 'hidden' ]

        'counter': P.bool true

        'lang': P.choices [ 'az', 'be', 'en', 'hy', 'ka', 'kk', 'ro', 'ru', 'tr', 'tt', 'uk' ], 'en'

        'limit': P.number undefined

        'services': P.string 'vkontakte,facebook,twitter,gplus'

        'size': P.choices [ 's', 'm' ], 'm'

      }

      'hooks': P.shape {

        'onready': P.constant Action 'onReady'

        'onshare': P.constant Action 'onShare'

      }

    }

  />

##
