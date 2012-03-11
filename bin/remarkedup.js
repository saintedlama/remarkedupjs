#!/usr/bin/env node

var program = require('commander'),
    batchGenerate = require('../lib/batch-generate.js'),
    processToc = require('../lib/process-toc.js');

program.version('0.1.0')
    .description('parses markdown files and transforms them to html.')
    .option('-i, --input <glob>', 'input file or path')
    .option('-o, --output <path>', 'output path')
    .option('-t, --template', 'html template file to use')
    .option('-w, --watch', 'watch files for modification and regenerate html output');

program.parse(process.argv);

// Get extra args passed to commander
for (var i = 0; i < program.args.length; i++) {
    var parts = program.args[i].split('=');
    if (parts && parts.length == 2) {
        program[parts[0]] = parts[1];
    }
}

program.postProcessors = [];
program.postProcessors.push(processToc);
batchGenerate(program);
