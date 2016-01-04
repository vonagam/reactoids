FormData = window.FormData


toFormData = ( data )->=

  return unless FormData

  flattened = _.toFlattenedPlainObject data, ( value )->= _.isArray( value ) || _.isPlainObject( value )

  _.transform flattened, ( data, value, key )->

    key = key.replace /\.([^\.]+)/g, '[$1]'

    data.append key, value

  , new FormData

##


module.exports = toFormData
