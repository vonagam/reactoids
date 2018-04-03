const stories = StoriesOf( 'core:graphics:component.Shape', module );


stories.add( 'Example', function() {

  let shape = new PIXI.Polygon( [

    0, 0,

    50, 0,

    25, 50,

    -25, 50,

    -50, 0,

    -25, -50,

    25, -50,

    0, 0,

  ] );

  return (

    <Application width={ 400 } height={ 400 } options={ { antialias: true } }>

      <Shape

        shape={ shape }

        x={ 200 }

        y={ 200 }

        fillColor={ Math.random() * 0xFFFFFF }

        lineWidth={ 5 }

        lineColor={ Math.random() * 0xFFFFFF }

      />

    </Application>

  );

} );
