var fs = require('fs'),
    path = require('path'),
    utils = require('./utils.js'),
    markdown = require('github-flavored-markdown');

var create = function(input, htmlTemplate, opt) {
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

    if (this.opt.postProcessors) {
        for (var i = 0; i < opt.postProcessors.length; i++) {
            postProcessor(context);
        }
    }

    this.htmlTemplate.bind(context, output);
}

Generator.prototype.makeToc = function (content) {
    var toc = content.match(/<h[1-6]>.*?<\/h[1-6>]/gm);

    var nodes = { level:"0", nodes:[]}; // Prepares the root node
    var current = nodes;

    for (var i = 0; i < toc.length; i++) {
        var node = this.makeTocNode(toc[i]);
        if (current.level >= node.level) {
            current = node;
            nodes.push(node);
        } else {
            while (current.level < node.level)
                current.nodes.push(node);
        }
    }

    return nodes;
}

Generator.prototype.makeTocNode = function (header) {
    var result = {};
    result.level = header[2];
    result.text = header.slice(4, -4);
    result.nodes = [];

    return result;
}

Generator.prototype.getOutput = function () {
    var outfilename = utils.changeExtension(this.input, '.html');
    var outfile = path.join(this.opt.output, path.normalize(outfilename));
    var outputDirectory = path.dirname(outfile);

    return { filename:outfile, directory:outputDirectory};
}

module.exports.create = create;