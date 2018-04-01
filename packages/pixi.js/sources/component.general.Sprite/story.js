const stories = StoriesOf( 'component.general.Sprite', module );


stories.add( 'Example', function() {

  return (

    <Application width={ 400 } height={ 400 } options={ { antialias: true, forceCanvas: true } }>

      <Sprite

        imageId='https://img.youtube.com/vi/ZXVhOPiM4mk/0.jpg'

        crossorigin={ false }

        anchor={ { x: 0.5, y: 0.5 } }

        width={ 400 }

        x={ 200 }

        y={ 200 }

      />

    </Application>

  );

} );
