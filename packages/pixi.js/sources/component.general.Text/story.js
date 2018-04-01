const stories = StoriesOf( 'component.general.Text', module );


stories.add( 'Example', function() {

  return (

    <Application width={ 400 } height={ 400 } options={ { antialias: true } }>

      <Text

        text='Hello, World!'

        fill={ Math.round( Math.random() * 0xFFFFFF ) }

        dropShadow={ true }

        dropShadowColor={ Math.round( Math.random() * 0xFFFFFF ) }

        x={ 200 }

        y={ 200 }

      />

    </Application>

  );

} );
