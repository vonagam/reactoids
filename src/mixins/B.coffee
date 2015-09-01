mixin =

  getInitialMembers: ->

    _B: {}

  B: ( name )->

    _B[ name ] ||= _.bind @[ name ], this


module.exports = mixin
