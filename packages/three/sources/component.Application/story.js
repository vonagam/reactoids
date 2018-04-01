const stories = StoriesOf( 'component.Application', module );


stories.add( 'Example', function() {

  return <Application width={ 400 } height={ 400 } />;

} );
