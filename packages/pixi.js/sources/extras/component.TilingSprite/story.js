stories.add( 'Example', function() {

  return (

    <Application width={ 400 } height={ 400 } options={ { antialias: true, forceCanvas: true } }>

      <TilingSprite

        imageId='https://img.youtube.com/vi/ZXVhOPiM4mk/0.jpg'

        crossorigin={ false }

        anchor={ { x: 0.5, y: 0.5 } }

        tilePosition={ { x: 0, y: -50 } }

        x={ 200 }

        y={ 200 }

      />

      <TilingSprite

        imageId='https://img.youtube.com/vi/ZXVhOPiM4mk/0.jpg'

        crossorigin={ false }

        anchor={ { x: 0.5, y: 0.5 } }

        tilePosition={ { x: 0, y: -50 } }

        x={ 300 }

        y={ 200 }

      />

      <TilingSprite

        imageId='https://img.youtube.com/vi/ZXVhOPiM4mk/0.jpg'

        crossorigin={ false }

        anchor={ { x: 0.5, y: 0.5 } }

        tilePosition={ { x: 0, y: -50 } }

        x={ 400 }

        y={ 200 }

      />

    </Application>

  );

} );
