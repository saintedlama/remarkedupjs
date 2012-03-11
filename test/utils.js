var utils = require('../lib/utils'),
    should = require('should'),
    shouldThrow = require('./throws');

describe('utils', function() {

    describe('#discoverFileSync()', function() {
        it('should return null in case no directories passed', function(done) {
            var filename = utils.discoverFileSync('file');
            should.not.exist(filename);
            done();
        });

        it('should return null in case the file was not found', function (done) {
            var filename = utils.discoverFileSync('file', 'dir', 'dir2');
            should.not.exist(filename);
            done();
        });

        it('should throw in case no file passed', function (done) {
            shouldThrow(function() {
                utils.discoverFileSync();
            });
            done();
        });

        it('should discover file in first directory', function (done) {
            done();
        });

        it('should discover file in fallback directory', function (done) {
            done();
        });
    });

    describe('#changeExtension()', function() {
        it('should throw in case no file was passed', function(done) {
            shouldThrow(function() {
                utils.changeExtension();
            });
            done();
        });

        it('should change extension for files with extensions', function(done) {
            var changedExtension = utils.changeExtension('filename.html', '.ext');
            changedExtension.should.equal('filename.ext');
            done();
        });

        it('should append extension for files without extensions', function(done) {
            var appendedExtension = utils.changeExtension('filename', '.ext');
            appendedExtension.should.equal('filename.ext');
            done();
        });

        it('should throw in case no extension was passed', function(done) {
            shouldThrow(function() {
                utils.changeExtension('filename');
            });
            done();
        });
    });

    describe('#safeClone', function() {
       it('should create a new object in case undefined was passed', function(done) {
           var clone = utils.safeClone(undefined);
           should.exist(clone);
           done();
       });

       it('should create a cloned object', function(done) {
           var toClone = { key : 'value' };
           var clone = utils.safeClone(toClone);

           toClone.key = 'newValue';

           clone.key.should.equal('value');
           done();
       });
    });
})