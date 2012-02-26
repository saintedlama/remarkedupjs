#!/usr/bin/env node

var commander = require('commander'),
    batchGenerate = require('../lib/batch-generate.js');

commander.version('0.1.0')
    .description('parses markdown files and transforms them to html.')
    .option('-i, --input <glob>', 'input file or path')
    .option('-o, --output <path>', 'output path')
    .option('-t, --template', 'html template file to use')
    .option('-w, --watch', 'watch files for modification and regenerate html output');

commander.parse(process.argv);

// Get extra args passed to commander
for (var i = 0; i < commander.args.length; i++) {
    var parts = commander.args[i].split('=');
    if (parts && parts.length == 2) {
        commander[parts[0]] = parts[1];
    }
}

batchGenerate(commander);
