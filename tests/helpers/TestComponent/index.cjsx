TestComponent =

  getClassNames: require './contexts/getClassNames'

  getStrings: require './contexts/getStrings'

  runRenderTest: require './runs/runRenderTest'

  runShallowTest: require './runs/runShallowTest'

  getVariations: require './variations/getVariations'

  getVariantString: require './variations/getVariantString'

  getVariationString: require './variations/getVariationString'

  testComponent: require './testComponent'

##


module.exports = TestComponent
