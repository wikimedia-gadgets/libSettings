/* Internal warn/error message functions. */
/**
 * @func
 * @param {string} message
 * @return {string} Message with '[libSettings]' prefix.
*/
mw.libs.libSettings.buildMessage = function ( message ) {
	return ( `[libSettings] ${message}` );
};

/**
 * @func
 * @param {string} message
*/
mw.libs.libSettings.warn = function ( message ) {
	mw.log.warn( mw.libs.libSettings.buildMessage( message ) );
};

/**
 * @func
 * @param {boolean} condition
 * @param {string} message
*/
/*
libSettings.assert = function ( condition, message ) {
	console.assert( condition, libSettings.buildMessage( message ) );
};*/

/**
 * @func
 * @param {string} message
 * @param {string} [errorType = 'Error']
*/
mw.libs.libSettings.error = function ( message, errorType = 'Error' ) {
	mw.log.error( new window[ errorType ]( mw.libs.libSettings.buildMessage( message ) ) );
};

/** Used so that functions can take a parameter regarding whether
 * an error should be raised, or a warning logged.
 * @func
 * @param {string} message
 * @param {('warn'|'error')} errorLevel
 * @param {string} errorType
*/
mw.libs.libSettings.throw = function ( message, errorLevel, errorType ) {
	switch ( errorLevel ) {
		case 'warn':
			mw.libs.libSettings.warn( message );
			break;
		case 'error':
			mw.libs.libSettings.error( message, errorType );
	}
};
