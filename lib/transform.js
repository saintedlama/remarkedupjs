var fs = require('fs'),
    path = require("path"),
    glob = require('glob'),
    wrench = require('wrench'),
    bind = require('bind'),
    markdown = require('github-flavored-markdown'),
    fsUtil = require('./fs-util');

module.exports = function transform(opt) {
    opt.input = opt.input ? opt.input : "*.markdown";
    opt.output = opt.output ? opt.output : process.cwd();
    opt.encoding = opt.encoding ? commander.encoding : 'utf-8';
    opt.template = opt.template ? opt.template : 'default.html';

    // Match all input files
    glob(opt.input, function (err, files) {
        if (err) {
            console.log('An error occured ' + err);
            return;
        }

        if (!files) {
            console.log('No files were found matching pattern ' + opt.input);
            return;
        }

        // Loads the html template here and passes it around!
        var htmlTemplate = loadHtmlTemplate(opt.template, opt.encoding);

        files.forEach(function (file) {
            var command = new GenerateMarkdownCommand(file, htmlTemplate, opt);
            command.execute();

            if (opt.watch) {
                fs.watch(file, function (event) {
                    if (event != 'change') {
                        return;
                    }

                    console.log('File ' + file + ' changed. Regenerating html!');
                    command.execute();
                });
            }
        });

        if (opt.watch) {
            console.log('Watching files for changes...');
            console.log('Press CTRL-C to exit');
        }
    });
}

function loadHtmlTemplate(templateName, encoding) {
    var template = fsUtil.discoverFileSync(path.join('templates', templateName),
        process.cwd(),
        path.join(__dirname, '..')
    );

    if (!template) {
        throw "Template could not be found in current directory or in script directory";
    }

    return fs.readFileSync(template, encoding);
}

