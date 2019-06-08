/* eslint-disable no-console */
function tests( QUnit ) {
	QUnit.begin( function ( details ) {
		console.log( 'Test amount:', details.totalTests );
	} );
	QUnit.log( ( details ) => {
		return console.log( details.expected );
	} );
	QUnit.test( 'hello test', function ( assert ) {
		// eslint-disable-next-line eqeqeq
		assert.equal( 1 == '1', 'Passed!' );
	} );
}
$.when( mw.loader.using( 'jquery.qunit' ), $.ready ).then(
	() => {
		setTimeout( () => tests( this.QUnit ), 1000 );
	}
);
