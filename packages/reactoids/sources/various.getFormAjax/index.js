import 'jquery-serializejson';


export default getFormAjax = function( form ) {

  let ajax = {};

  ajax.url = form.action;

  ajax.method = _.get( _.findLast( $( form ).serializeArray(), ( { name } ) => name === '_method' ), 'value' ) || form.method || 'get';


  let contentType = form.getAttribute( 'data-enctype' ) || form.enctype || 'application/x-www-form-urlencoded';

  switch ( contentType ) {

    case 'application/x-www-form-urlencoded':

      ajax.contentType = contentType;

      ajax.data = $( form ).serializeArray();

      break;

    case 'multipart/form-data':

      ajax.contentType = false;

      ajax.data = new window.FormData( form );

      ajax.processData = false;

      break;

    case 'application/json':

      ajax.contentType = contentType;

      ajax.data = $( form ).serializeJSON();

      break;

    default:

      throw new Error( `unknown form enctype "${ enctype }"` );

    //

  }


  return ajax;

};
