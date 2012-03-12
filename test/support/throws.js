var should = require('should');

module.exports = function(fn, message) {
    try {
        fn();
        should.fail(message || 'An exception expected to be thrown')
    } catch (err) {

    }
}
