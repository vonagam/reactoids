describe 'Moment', ->

  moment = require 'moment'

  Moment = requireSubject()


  variants = {

    time: [ 1318781876406, '1995-12-25' ]

    timeFormat: [ "YYYY-MM-DD" ]

    reference: [ 1318695476406, '1995-11-25' ]

    referenceFormat: [ "YYYY-MM-DD" ]

    format: [ 'calendar', 'fromNow', 'to', 'dddd, MMMM Do YYYY, h:mm:ss a' ]

    suffix: [ false, true ]

    'data-unknown': [ 3 ]

  }

  options = {

    skip: ( variation )->=

      variation.format == undefined

    ##

  }

  itVariations 'renders [s]', variants, options, ( variation )->

    instance = shallow <Moment {... variation } />


    expect( instance ).to.match 'span.moment'

    expect( instance ).onlyIf( variation[ 'data-unknown' ] ).to.have.data 'unknown', variation[ 'data-unknown' ]


    valid = true

    time = moment variation.time, variation.timeFormat

    reference = moment variation.reference, variation.referenceFormat

    format = _.funced variation.format, time

    if variation.time == undefined || ! time.isValid()

      valid = false

    else

      if variation.reference == undefined

        if _.includes [ 'from', 'to' ], format

          valid = false

        ##

      else

        if _.includes [ 'calendar', 'from', 'to' ], format

          if ! reference.isValid()

            valid = false

          ##

        ##

      ##

    ##

    expect( instance ).onlyIf( valid ).to.have.className '-enabled'

    expect( instance ).onlyIf( ! valid ).to.have.className '-disabled'

    expect( instance.children() ).onlyIf( valid ).to.be.present()

  ##

  itVariations 'rightly sets inUnison member [m]', variants, options, ( variation )->

    instance = mount <Moment {... variation } />


    inUnison = false

    if instance.find( '.moment' ).hasClass '-enabled'

      time = moment variation.time, variation.timeFormat

      format = _.funced variation.format, time

      if _.includes( [ 'fromNow', 'toNow' ], format ) || ( format == 'calendar' && variation.reference == undefined )

        inUnison = true

      ##

    ##


    expect( instance.node.inUnison ).equal inUnison

  ##

##
