var fs = require('fs'),
    path = require('path'),
    utils = require('./utils.js'),
    markdown = require('github-flavored-markdown');

var create = function (input, htmlTemplate, opt) {
    return new Generator(input, htmlTemplate, opt);
}

var Generator = function (input, htmlTemplate, opt) {
    this.input = input;
    this.htmlTemplate = htmlTemplate;
    this.opt = opt || {};
}

Generator.prototype.execute = function () {
    var output = this.getOutput();

    var data = fs.readFileSync(this.input, this.opt.encoding);

    var context = utils.safeClone(this.opt);
    context.content = markdown.parse(data);

    this.postProcess(this.opt.postProcessors, context);

    this.htmlTemplate.bind(context, output);
}

Generator.prototype.postProcess = function(postProcessors, context) {
    if (postProcessors) {
        for (var i = 0; i < postProcessors.length; i++) {
            postProcessors[i](context);
        }
    }
}

Generator.prototype.getOutput = function () {
    var outfilename = utils.changeExtension(this.input, '.html');
    var outfile = path.join(this.opt.output, path.normalize(outfilename));
    var outputDirectory = path.dirname(outfile);

    return { filename:outfile, directory:outputDirectory};
}

module.exports.create = create;