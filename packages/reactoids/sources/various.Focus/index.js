// https://github.com/jquery/jquery-ui/blob/master/ui/focusable.js
// https://github.com/davidtheclark/tabbable/blob/master/index.js


const CANDIDATE_SELECTOR = 'input, textarea, select, button, a[href], [tabindex]';

const getTabIndex = function( node ) {

  return Number( node.getAttribute( 'tabindex' ) ) || 0;

};

const isCandidateFocusable = function( $node, onlyTabbable ) {

  if ( onlyTabbable && getTabIndex( $node[ 0 ] ) < 0 ) return false;

  if ( $node.is( ':hidden' ) ) return false;

  if ( $node.css( 'visibility' ) === 'hidden' ) return false;

  if ( $node.is( ':disabled' ) ) return false;

  if ( $node.attr( 'aria-hidden' ) === 'true' ) return false;

  return true;

};

const isFocusable = function( $node, onlyTabbable ) {

  if ( ! $node.is( CANDIDATE_SELECTOR ) ) return false;

  return isCandidateFocusable( $node, onlyTabbable );

};

const findFocusables = function( $node, onlyTabbable ) {

  let $candidates = $node.find( CANDIDATE_SELECTOR );

  $candidates = $candidates.addBack( CANDIDATE_SELECTOR );

  $candidates = $candidates.filter( ( index, node ) => {

    return isCandidateFocusable( $( node ), onlyTabbable );

  } );

  let candidates = _.orderBy( $candidates.toArray(), getTabIndex, 'desc' );

  return candidates;

};


export default Focus = {

  findFocusables( node ) {

    if ( ! node ) return [];

    return findFocusables( $( node ), false );

  },

  findTabbables( node ) {

    if ( ! node ) return [];

    return findFocusables( $( node ), true );

  },

  isFocusable( node ) {

    if ( ! node ) return false;

    return isFocusable( $( node ), false );

  },

  isTabbable( node ) {

    if ( ! node ) return false;

    return isFocusable( $( node ), true );

  },

  closestFocusable( node ) {

    if ( ! node ) return undefined;

    while ( node && node !== document ) {

      if ( Focus.isFocusable( node ) ) return node;

      node = node.parentNode;

    }

    return undefined;

  },

  focus( node ) {

    if ( ! node ) return;

    if ( node.contains( document.activeElement ) ) return;

    let focusables = Focus.findFocusables( node );

    if ( focusables.length === 0 ) return;

    focusables[ 0 ].focus();

  },

  tab( node ) {

    if ( ! node ) return;

    if ( node.contains( document.activeElement ) ) return;

    let tabbables = Focus.findTabbables( node );

    if ( tabbables.length === 0 ) return;

    tabbables[ 0 ].focus();

  },

  blur( node ) {

    if ( ! node ) return;

    if ( ! node.contains( document.activeElement ) ) return;

    document.activeElement.blur();

  },

};
