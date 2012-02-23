var path = require('path');

exports.discoverFileSync = function discover(filename) {

    if (!filename) {
        throw 'No file passed to discover!';
    }

    if (!arguments.length) {
        return null;
    }

    var directories = Array.prototype.slice.call(arguments, 1);

    for (var i = 0; i < directories.length; i++) {
        var filepath = path.join(directories[i], filename);

        if (path.existsSync(filepath)) {
            return filepath;
        }
    }

    return null;
}

exports.changeExtension = function (filename, extension) {
    if (!filename) {
        throw 'Required parameter "filename" not passed!';
    }

    if (!extension) {
        throw 'Required parameter "extension" not passed!';
    }

    var sliceAt = path.extname(filename).length > 0 ? -path.extname(filename).length : filename.length;
    return filename.slice(0, sliceAt) + extension;
}

exports.safeClone = function (obj) {
    var result = {};
    obj = obj || {};

    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            result[key] = obj[key];
        }
    }

    return result;
}