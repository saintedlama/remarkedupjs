var GenerateCommand = require('../lib/generate-command.js');

exports.shouldExtractTreeToc = function(test) {
    var command = new GenerateCommand.GenerateMarkdownCommand();
    var toc = command.makeToc("<h1>h1.1</h1><h2>h2.1</h2><h1>h1.2</h1>");

    test.equals(2, toc.length);
    test.equals(1, toc[0].nodes.length);
    test.done();
}
