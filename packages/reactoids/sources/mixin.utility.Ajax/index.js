export default AjaxMixin = Mixin.create( {

  name: 'AjaxMixin',

  mixin: _.once( () => {

    const toggleAjax = function( that, name, ajax ) {

      let ajaxes = that._AjaxMixin;

      if ( ajax ) {

        ajaxes[ name ] = ajax;

      } else {

        if ( ! ajaxes[ name ] ) return;

        ajaxes[ name ].abort();

        delete ajaxes[ name ];

      }

      that.setState( { ajaxes: _.mapValues( ajaxes, () => true ) } );

    };


    const handleRedirect = function( that, redirect, xhr, status, data ) {

      let location = xhr.getResponseHeader( 'Location' );

      let allow = _.funced( redirect, location, xhr, status, data );

      if ( _.isString( allow ) ) {

        location = allow;

        allow = true;

      }

      if ( ! ( allow === true && _.isString( location ) ) ) return;

      simulateLink( location, ReactDOM.findDOMNode( that ) );

    };

    const handleSuccess = function( that, redirect, data, status, xhr ) {

      handleRedirect( that, redirect, xhr, status, data );

    };

    const handleError = function( that, redirect, xhr, status ) {

      handleRedirect( that, redirect, xhr, status, undefined );

    };

    const handleComplete = function( that, name ) {

      toggleAjax( that, name, false );

    };


    return {

      getInitialState() {

        return { ajaxes: {} };

      },

      getInitialMembers() {

        return { _AjaxMixin: {} };

      },

      componentWillUnmount() {

        _.each( this._AjaxMixin, ( ajax, name ) => {

          this.abortAjax( name );

        } );

      },

      sendAjax( name, options ) {

        if ( _.isEmpty( options ) ) return;

        options = _.clone( options );


        let force = options.force;

        delete options.force;

        if ( this._AjaxMixin[ name ] ) {

          if ( ! force ) return;

          this.abortAjax( name );

        }


        let redirect = options.redirect;

        delete options.redirect;

        options.success = _.queue( options.success, _.partial( handleSuccess, this, redirect ) );

        options.error = _.queue( options.error, _.partial( handleError, this, redirect ) );


        options.complete = _.queue( _.partial( handleComplete, this, name ), options.complete );


        let ajax = $.ajax( options );

        toggleAjax( this, name, ajax );

      },

      isWaitingAjax( name ) {

        if ( name === undefined ) {

          return ! _.isEmpty( this._AjaxMixin );

        } else {

          return Boolean( this._AjaxMixin[ name ] );

        }

      },

      abortAjax( name ) {

        toggleAjax( this, name, false );

      },

    };

  } ),

} );
