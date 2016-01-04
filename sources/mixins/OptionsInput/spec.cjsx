describe 'OptionsInput', ->

  OptionsInput = requireSubject()


  input = undefined

  onChange = sinon.spy()

  afterEach ->

    onChange.reset()

    return unless input

    TestReact.unmount input

    input = undefined

  ##


  _.each [

    { 
      props: { 
        options: [ 1, 2 ]
        value: 2
      }
      options: [ 
        { value: 1, label: 1 }
        { value: 2, label: 2, selected: true } 
      ]
      value: 2
    }
    {
      props: { 
        options: { a: 1, b: 2 }
        allowBlank: false
      }
      options: [
        { value: 'a', label: 1, selected: true }
        { value: 'b', label: 2 }
      ]
      value: 'a'
    }
    {
      props: { 
        options: { a: 1, b: 2 }
        mapOption: ( value, key )->= { value: value, label: key } 
      }
      options: [
        { value: 1, label: 'a' }
        { value: 2, label: 'b' }
      ]
      value: undefined
    }

  ], ( check, index )->

    { props, options, value } = check

    it "check #{ index }", ->

      OptionsInputed = TestMixin.createMixinClass OptionsInput

      input = TestReact.render <OptionsInputed {... props } />

      expect( input.getOptions() ).eql options

      expect( input.getValue() ).equal value

    ##

  ##

##
