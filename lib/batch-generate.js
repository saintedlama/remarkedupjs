var fs = require('fs'),
    glob = require('glob'),
    generator = require('./generator'),
    template = require('./template');

module.exports = function batchGenerate(opt) {
    opt = setDefaultOptions(opt);

    console.log('Generating html from markdown files matching pattern ' + opt.input);

    // Match all input files
    glob(opt.input, function (err, files) {
        if (err) {
            console.log('An error occured ' + err);
            return;
        }

        if (!files || files.length == 0) {
            console.log('No files were found matching pattern ' + opt.input);
            return;
        }

        // Loads the html template here and passes it around!
        var htmlTemplate = template.load(opt.template, opt.encoding);

        files.forEach(function (file) {
            var gen = generator.create(file, htmlTemplate, opt);
            gen.execute();

            if (opt.watch) {
                fs.watch(file, function (event) {
                    if (event != 'change') {
                        return;
                    }

                    console.log('File ' + file + ' changed. Regenerating html output!');
                    gen.execute();
                });
            }
        });

        if (opt.watch) {
            console.log('Watching files for changes...');
            console.log('Press CTRL-C to exit');
        }
    });
}

function setDefaultOptions(opt) {
   opt.input = opt.input ? opt.input : "*.markdown";
   opt.output = opt.output ? opt.output : process.cwd();
   opt.encoding = opt.encoding ? commander.encoding : 'utf-8';
   opt.template = opt.template ? opt.template : 'default.html';

   return opt;
}