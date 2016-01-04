BaseContainerArgs =

  containerAttach: ( that, pixi )->

    that.pixi.addChild pixi

  ##

  containerDetach: ( that, pixi )->

    that.pixi.removeChild pixi

  ##

  containerMove: ( that, pixi, toIndex )->

    #that.pixi.addChildAt pixi, toIndex

    that.pixi.setChildIndex pixi, toIndex

  ##

##


module.exports = BaseContainerArgs
