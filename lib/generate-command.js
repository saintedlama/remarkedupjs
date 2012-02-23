var fs = require('fs'),
    fsUtil = require('./fs-util');

var GenerateMarkdownCommand = function (input, htmlTemplate, opt) {
    this.input = input;
    this.htmlTemplate = htmlTemplate;
    this.opt = opt || {};
}

GenerateMarkdownCommand.prototype.execute = function () {
    var output = this.getOutput();

    var data = fs.readFileSync(this.input, this.opt.encoding);

    var context = fsUtil.safeClone(this.opt);
    context.content = markdown.parse(data);

    // Parse content and add extra data to context
    context.toc = this.makeToc(context.content);
    context.refs = this.makeRefs(context.content);

    wrench.mkdirSyncRecursive(output.directory);

    bind.to(this.htmlTemplate, context, function (renderedOutput) {
        fs.writeFile(output.filename, renderedOutput, function (err) {
            if (err) throw err;
        });
    });
}

GenerateMarkdownCommand.prototype.makeToc = function (content) {
    var toc = content.match(/<h[1-6]>.*?<\/h[1-6>]/gm);

    var nodes = { level: "0", nodes: []}; // Prepares the root node
    var current = nodes;

    for (var i=0;i<toc.length;i++) {
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

GenerateMarkdownCommand.prototype.makeTocNode = function (header) {
    var result = {};
    result.level = header[2];
    result.text = header.slice(4, -4);
    result.nodes = [];

    return result;
}

GenerateMarkdownCommand.prototype.makeRefs = function (content) {

}

GenerateMarkdownCommand.prototype.getOutput = function () {
    var outfilename = fsUtil.changeExtension(this.input, '.html');
    var outfile = path.join(this.opt.output, path.normalize(outfilename));
    var outputDirectory = path.dirname(outfile);

    return { filename:outfile, directory:outputDirectory};
}

exports.GenerateMarkdownCommand = GenerateMarkdownCommand;