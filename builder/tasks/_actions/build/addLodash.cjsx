_ = require 'lodash'

glob = require 'glob'


extentions = _.map glob.sync( '../sources/extends/lodash/**/*.cjsx' ), ( file )->= file.replace /^.+\/(.+)\.cjsx$/, '$1'


addLodash = ( content, path )->=

  before = '_ = {'

  methods = _.uniq _.map content.match( /_\.\w+/g ), ( method )->= method.replace '_.', ''

  _.each methods, ( method )->

    before += "#{ method }: require"

    if _.includes extentions, method

      before += "Source( 'extends/lodash/#{ method }' )"

    else

      before += "( 'lodash/#{ method }' )"

    ##

    before += ','

  ##

  before += '}\n\n'


  content = before + content

  content

##


module.exports = addLodash
