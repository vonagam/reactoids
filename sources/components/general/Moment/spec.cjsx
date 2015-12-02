describe 'Moment', ->

  dependencies = requireSource 'dependencies'

  Moment = undefined


  before ->

    dependencies.moment = require 'moment'

    Moment = requireSubject()

  after ->

    dependencies.moment = undefined

    Moment = undefined


  variants =

    time: [ 1318781876406, '1995-12-25' ]

    timeFormat: [ "YYYY-MM-DD" ]

    reference: [ 1318695476406, '1995-11-25' ]

    referenceFormat: [ "YYYY-MM-DD" ]

    format: [ 'calendar', 'fromNow', 'to', 'dddd, MMMM Do YYYY, h:mm:ss a' ]
    
    suffix: [ false, true ]

    'data-unknown': [ 3 ]


  tests =

    shallow:

      skip: ( input )->=

        true if input.format == undefined

      it: ( input, props, tag )->

        # mix

        valid = true

        time = moment input.time, input.timeFormat

        reference = moment input.reference, input.referenceFormat

        format = _.funced input.format, time

        if input.time == undefined || ! time.isValid()

          valid = false

        else

          if input.reference == undefined

            if _.includes [ 'from', 'to' ], format

              valid = false

          else

            if _.includes [ 'calendar', 'from', 'to' ], format

              if ! reference.isValid()

                valid = false

        expect( props.className ).only( valid ).string '-enabled'

        expect( props.className ).only( ! valid ).string '-disabled'

        expect( props.children ).only( ! valid ).equal undefined

        # data-unknown

        expect( props[ 'data-unknown' ] ).equal input[ 'data-unknown' ]

        # always

        expect( tag ).equal 'span'

        expect( props.className ).string 'moment'

    unison:

      skip: ( input )->=

        true if input.format == undefined

      it: ( input, component )->

        valid = ~ component.dom().className.indexOf '-enabled'

        inUnison = false

        if valid

          time = moment input.time, input.timeFormat

          format = _.funced input.format, time

          if _.includes( [ 'fromNow', 'toNow' ], format ) || ( format == 'calendar' && input.reference == undefined )

            inUnison = true

        expect( component.inUnison ).equal inUnison


  TestComponent.testComponent Moment, variants, tests
