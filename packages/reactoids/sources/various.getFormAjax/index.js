import 'jquery-serializejson';


export default getFormAjax = function( form, overrides = {} ) {

  let $form = $( form );


  let action = (

    overrides.action ||

    $form.prop( 'action' ) ||

    window.location.href

  );

  let method = (

    overrides.method ||

    _.get( _.findLast( $form.serializeArray(), ( { name } ) => name === '_method' ), 'value' ) ||

    $form.prop( 'method' ) ||

    'get'

  );

  let noValidate = (

    overrides.noValidate ||

    $form.prop( 'noValidate' ) ||

    false

  );

  let encType = (

    overrides.encType ||

    $form.attr( 'data-enctype' ) ||

    $form.prop( 'enctype' ) ||

    'application/x-www-form-urlencoded'

  );


  if ( ! noValidate ) {

    if ( form.reportValidity && ! form.reportValidity() ) {

      return undefined;

    }

  }


  let ajax = {};

  ajax.url = action;

  ajax.method = method;

  switch ( encType ) {

    case 'application/x-www-form-urlencoded':

      ajax.contentType = encType;

      ajax.data = $form.serializeArray();

      break;

    case 'multipart/form-data':

      ajax.contentType = false;

      ajax.data = new window.FormData( form );

      ajax.processData = false;

      break;

    case 'application/json':

      ajax.contentType = encType;

      ajax.data = $form.serializeJSON();

      break;

    default:

      throw new Error( `unknown form enctype "${ enctype }"` );

    //

  }


  return ajax;

};
