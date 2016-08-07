describe.skip 'Mixin', ->

  Mixin = requireSubject()


  describe.skip '.createPlain', ->

    checks = [

      {
        componentWillMount: sinon.spy()
      }
      {
        getInitialMembers: sinon.spy( ->= member: 'check' )
      }
      {
        initConstants: sinon.spy()
      }
      {
        getInitialMembers: sinon.spy( ->= member: 'check' )
        componentWillMount: sinon.spy()
      }
      {
        initConstants: sinon.spy()
        getInitialMembers: sinon.spy( ->= member: 'check' )
        componentWillMount: sinon.spy()
      }

    ]

    _.each checks, ( check )->

      it "willMounts: #{ _.keys( check ).join ', ' }", ->

        component = {}

        mixin = Mixin.createPlain check

        expect( _.keys mixin ).eql [ 'componentWillMount' ]

        _.times 2, ->

          mixin.componentWillMount.apply component

        ##

        _.each check, ( spy, key )->

          expect( spy ).callCount if key == 'initConstants' then 1 else 2

        ##

        expect( component ).eql if check.getInitialMembers then { member: 'check' } else {}

      ##

    ##

  ##


  describe.skip '.createArged', ->

    it 'works', ->

      mixinFunc = Mixin.createArged

        args:

          asd: React.PropTypes.number
          bsa: React.PropTypes.number

        ##

        defaults:

          bsa: 2

        ##

        mixin: ( ARGS )->=

          getInitialMembers: ->= member0: ARGS.asd, member1: ARGS.bsa

          componentWillMount: _.noop

        ##

      ##


      expect( -> mixinFunc() ).throw()
      expect( -> mixinFunc asd: 'a' ).throw()

      mixin = mixinFunc asd: 1

      component = {}

      mixin.componentWillMount.apply component

      expect( component ).eql { member0: 1, member1: 2 }

    ##

  ##


  describe.skip '.resolve', ->

    it 'works', ->

      MixinA = { a: 1 }
      MixinB = { b: 1, mixins: [ MixinA ] }
      MixinC = { c: 1, mixins: [ MixinA ] }

      expect( Mixin.resolve [ MixinB, MixinA, MixinC ] ).eql [

        {
          a: 1
        }
        {
          b: 1
        }
        {
          c: 1
        }

      ]

    ##

  ##

##
