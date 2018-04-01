export default simulateLink = function( href = '', containter = 'body', decorateLink = _.noop ) {

  let $link = $( '<a>' );


  $link.attr( 'href', href );

  $link.appendTo( containter );

  decorateLink( $link );


  let event = $.Event( 'click' );

  $link.trigger( event );

  $link.remove();


  if ( ! event.isDefaultPrevented() ) {

    window.location.assign( href );

  }

};
