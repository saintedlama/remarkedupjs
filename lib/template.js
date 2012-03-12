var Templ8 = require('Templ8'),
    wrench = require('wrench'),
    path = require('path'),
    fs = require('fs'),
    utils = require('./utils');

var load = function(templateName, encoding) {
    var template = utils.discoverFileSync(templateName,
        process.cwd(),
        path.join(__dirname, '..', 'templates')
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

    var tpl = new Templ8(this.templateContent);
    var renderedOutput = tpl.parse(context);

    //bind.to(this.templateContent, context, function (renderedOutput) {
        fs.writeFile(output.filename, renderedOutput, function (err) {
            if (err) throw err;
        });
    //});
}

module.exports.load = load;