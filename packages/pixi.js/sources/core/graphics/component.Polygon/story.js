stories.add( 'Example', function() {

  return (

    <Application width={ 400 } height={ 400 } options={ { antialias: true } }>

      <Polygon

        path={ [

          0, 0,

          50, 0,

          25, 50,

          -25, 50,

          -50, 0,

          -25, -50,

          25, -50,

          0, 0,

        ] }

        x={ 200 }

        y={ 200 }

        fillColor={ Math.random() * 0xFFFFFF }

        lineWidth={ 5 }

        lineColor={ Math.random() * 0xFFFFFF }

      />

    </Application>

  );

} );
