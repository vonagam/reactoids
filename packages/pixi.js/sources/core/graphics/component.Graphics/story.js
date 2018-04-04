stories.add( 'Example', function() {

  return (

    <Application width={ 400 } height={ 400 } options={ { antialias: true } }>

      <Graphics

        draw={ ( graphics, props ) => {

          graphics.moveTo( 0, 0 );

          graphics.bezierCurveTo(

            50, 0,

            50, 25,

            50, 50,

          );

          graphics.quadraticCurveTo(

            -50, 50,

            -50, -50,

          );

          graphics.lineTo( 50, -50 );

          graphics.closePath();

        } }

        x={ 200 }

        y={ 200 }

        fillColor={ Math.random() * 0xFFFFFF }

        lineWidth={ 5 }

        lineColor={ Math.random() * 0xFFFFFF }

      />

    </Application>

  );

} );
