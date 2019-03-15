/* Internal warn/error message functions. */
const libSettings = {};
/**
 * @func
 * @param {string} message
 * @return {string} Message with '[libSettings]' prefix.
*/
libSettings.buildMessage = function ( message ) {
	return ( `[libSettings] ${message}` );
};

/**
 * @func
 * @param {string} message
*/
libSettings.warn = function ( message ) {
	mw.log.warn( libSettings.buildMessage( message ) );
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
libSettings.error = function ( message, errorType = 'Error' ) {
	mw.log.error( new window[ errorType ]( libSettings.buildMessage( message ) ) );
};

/** Used so that functions can take a parameter regarding whether
 * an error should be raised, or a warning logged.
 * @func
 * @param {string} message
 * @param {('warn'|'error')} errorLevel
 * @param {string} errorType
*/
libSettings.throw = function ( message, errorLevel, errorType ) {
	switch ( errorLevel ) {
		case 'warn':
			libSettings.warn( message );
			break;
		case 'error':
			libSettings.error( message, errorType );
	}
};

export default libSettings;
