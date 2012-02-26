var bind = require('bind'),
    wrench = require('wrench'),
    path = require('path'),
    fs = require('fs'),
    utils = require('./utils');

var load = function(templateName, encoding) {
    var template = utils.discoverFileSync(path.join('templates', templateName),
        process.cwd(),
        path.join(__dirname, '..')
    );

    if (!template) {
        throw "Template could not be found in current directory or in script directory";
    }

    return new Template(fs.readFileSync(template, encoding));
}

var Template = function(content) {
    this.templateContent = content;
}

Template.prototype.bind = function(context, output) {
    wrench.mkdirSyncRecursive(output.directory);

    bind.to(this.templateContent, context, function (renderedOutput) {
        fs.writeFile(output.filename, renderedOutput, function (err) {
            if (err) throw err;
        });
    });
}

module.exports.load = load;