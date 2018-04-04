'use strict';

import { doc } from 'storybook-readme';

import { setOptions } from '@storybook/addon-options';

import { openLink } from '@storybook/addon-links/dist/preview';

import React from 'react';

import ReactDOM from 'react-dom';

import $ from 'jquery';


const showHash = function( hash ) {

  let $body = $( 'html, body' );

  let top0 = $body.scrollTop();

  let element, top1;

  if ( hash ) {

    element = document.querySelector( hash );

    if ( ! element ) return;

    top1 = Math.min( element.offsetTop, $body[ 0 ].scrollHeight - $body[ 0 ].clientHeight );

  } else {

    element = document.querySelector( 'h1' );

    top1 = 0;

  }

  let topDelta = Math.abs( top1 - top0 );

  let scrollDuration = Math.pow( topDelta, 0.5 ) * 10;

  if ( scrollDuration < 50 ) {

    $( 'html, body' ).stop( true, false ).animate( { scrollTop: top1 }, scrollDuration );

    if ( element.tagName !== 'H1' ) {

      $( element ).stop( true, false ).animate( { opacity: 0.25 }, 250 ).animate( { opacity: 1 }, 250 );

    }

  } else {

    $( 'html, body' ).stop( true, false ).animate( { scrollTop: top1 }, scrollDuration, function() {

      if ( element.tagName !== 'H1' ) {

        $( element ).stop( true, false ).animate( { opacity: 0.25 }, 250 ).animate( { opacity: 1 }, 250 );

      }

    } );

  }

};

const waitUntil = function( doCheck ) {

  let intervalId = setInterval( () => {

    let check = doCheck();

    if ( check ) clearInterval( intervalId );

  }, 50 );

};

const waitHash = function( hash ) {

  let location = window.top.location.href;

  waitUntil( () => {

    if ( window.top.location.href !== location ) {

      return true;

    }

    if ( document.querySelector( hash ) ) {

      showHash( hash );

      return true;

    }

  } );

};


let initialHash = window.top.location.hash;

if ( initialHash.length > 1 ) {

  waitUntil( () => {

    if ( ! window.top.location.hash ) {

      waitHash( initialHash );

      return true;

    }

  } );

}


const addReadmeStory = function( stories, Readme ) {

  let UpdatedReadme;

  stories.add( 'Reference', function( { kind, story } ) {

    setOptions( { showAddonPanel: false } );


    if ( ! UpdatedReadme ) {

      UpdatedReadme = $( `<div>${ Readme }</div>` );


      UpdatedReadme.find( 'a[href]' ).each( function() {

        let $link = $( this );

        let href = $link.attr( 'href' );

        if ( ! href ) return;

        let check = href.match( /^(?:\.\.\/)+(.+)\/README\.md(#.+)?$/ );

        if ( ! check ) return;

        let hrefKind = check[ 1 ].replace( /\//g, ':' );

        let hrefStory = 'Reference';

        let hrefHash = check[ 2 ] || '';

        $link.attr( 'data-href', JSON.stringify( { kind: hrefKind, story: hrefStory, hash: hrefHash } ) );

        href = `/`;

        href += `?selectedKind=${ encodeURIComponent( hrefKind ) }`;

        href += `&selectedStory=${ encodeURIComponent( hrefStory ) }`;

        href += hrefHash;

        $link.attr( 'href', href );

      } );


      UpdatedReadme.find( 'h1, h2, h3, h4, h5, h6' ).each( function() {

        let $header = $( this );

        let id = $header.attr( 'id' );

        if ( ! id ) return;

        if ( /^[^a-zA-Z]+$/.test( id ) ) return;

        id = $header.text().trim()

          .toLowerCase()

          .replace( /[\]\[\!\"\#\$\%\&\'\(\)\*\+\,\.\/\:\;\<\=\>\?\@\\\^\_\{\|\}\~\`]/g, '' )

          .replace( /\s+/g, '-' )

          .replace( /^\-+/, '' )

          .replace( /\-+$/, '' );

        $header.attr( 'id', id );

      } );


      UpdatedReadme = UpdatedReadme.html();

    }


    let result;

    result = doc( UpdatedReadme )( { kind, story } );

    result = React.cloneElement( result, { ref: ( ref ) => {

      $( 'html, body' ).stop( true, false ).scrollTop( 0 );

      if ( ! ref ) return;

      let node = ReactDOM.findDOMNode( ref );

      $( node ).on( 'click', 'a[href]', ( event ) => {

        let $link = $( event.currentTarget );


        let href = $link.attr( 'href' );

        if ( href[ 0 ] === '#' ) {

          showHash( href );

          event.preventDefault();

          event.stopPropagation();

          return;

        }


        let data = $link.attr( 'data-href' );

        if ( data ) {

          data = JSON.parse( data );

          let location = window.top.location.href;

          openLink( { kind: data.kind, story: data.story } );

          waitUntil( () => {

            if ( window.top.location.href !== location ) {

              if ( data.hash ) {

                waitHash( data.hash );

              }

              return true;

            }

          } );

          event.preventDefault();

          event.stopPropagation();

          return;

        }

      } );

    } } );

    return result;

  } );

};


export default addReadmeStory;
