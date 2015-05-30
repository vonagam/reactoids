Field = $require 'elements/forms/field'
PropByPath = $require 'various/prop_by_path'
$require 'mixins/component'

$define ->


  Fields = React.createClass

    mixins: [ 'component' ]

    propTypes:

      scheme: React.PropTypes.oneOfType( [ React.PropTypes.object, React.PropTypes.array ] ).isRequired
      onChange: React.PropTypes.func
      onSubmit: React.PropTypes.func

    classes:
      'fields':
        'field': ''

    getValues: ->

      refs = @refs

      _.transform @props.scheme, ( result, field )->

        PropByPath.set result, field.path, refs[ field.path ].getValue()

        return

      , {}

    allValid: ->

      _.all @props.scheme, ( ( f )-> @refs[ f.path ].isValid() ), this

    addFieldListener: ( field, type )->

      common_callback = @props[ type ]

      return unless common_callback

      field[ type ] = _.queue field[ type ], _.partial common_callback, field.path

      return

    render: ->

      fields = _.map @props.scheme, ( field )->

        field = _.clone field

        field.key = field.path
        field.ref = field.path

        field.className = @mergeClassNames @classed( 'field' ), field.className

        @addFieldListener field, 'onChange'
        @addFieldListener field, 'onSubmit'

        `<Field { ...field } />`

      , this

      `<div
        { ...this.omitProps() }
        className={ this.classed( '' ) }
      >
        { fields }
      </div>`
