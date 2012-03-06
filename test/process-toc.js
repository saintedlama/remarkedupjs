var toc = require('../lib/process-toc');

exports.shouldExtractOneNode = function(assert) {
    var context = {
        content : "<h1>SomeHeader</h1><p>SomeParagraph</p>"
    };

    var changedContext = toc(context);
    assert.equal(changedContext.toc.length, 1);
}

exports.shouldExtractOneRootNode = function(assert) {
    var context = {
        content : "<h1>SomeHeader</h1><h2>SomeOtherHeader</h2>"
    };

    var changedContext = toc(context);
    assert.equal(changedContext.toc.length, 1);
}

exports.shouldExtractOneNodeHierarchie = function(assert) {
    var context = {
        content : "<h1>SomeHeader</h1><h2>SomeOtherHeader</h2>"
    };

    var changedContext = toc(context);
    assert.equal(changedContext.toc[0].children.length, 1);
}