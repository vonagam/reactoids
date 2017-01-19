NullRenderMixin = Mixin.create {

  name: 'NullRenderMixin'

  mixin: _.once ->=

    render: _.constant null

  ##

}


module.exports = NullRenderMixin
