var fsUtil = require('../lib/fs-util');

exports.shouldReturnNullInCaseTheFileWasNotFound = function (test) {
    var filename = fsUtil.discoverFileSync('file', 'dir', 'dir2');
    test.ok(!filename);
    test.done();
}


exports.shouldReturnNullInCaseNoDirectoriesPassed = function (test) {
    var filename = fsUtil.discoverFileSync('file');
    test.ok(!filename);
    test.done();
}

exports.shouldThrowInCaseNoFilePassed = function (test) {
    test.throws(function () {
        fsUtil.discoverFileSync();
    });
    test.done();
}

exports.changeExtensionShouldThrowInCaseNoFilenamePassed = function (test) {
    test.throws(function () {
        fsUtil.changeExtension();
    });
    test.done();
}

exports.changeExtensionShouldChangeExtension = function (test) {
    var changedExt = fsUtil.changeExtension('filename.html', '.ext');
    test.equal(changedExt, 'filename.ext');
    test.done();
}

exports.changeExtensionShouldAppendExtForFilesWithoutExt = function (test) {
    var changedExt = fsUtil.changeExtension('filename', '.ext');
    test.equal(changedExt, 'filename.ext');
    test.done();
}

exports.changeExtensionShouldThrowIfNoExtensionPassed = function (test) {
    test.throws(function () {
        fsUtil.changeExtension('filename');
    });
    test.done();
}