var processToc = require('../lib/process-toc'),
    should = require('should');

describe('processToc', function(){
    it('should extract nodes from headings', function(done) {
        var context = {
            content : "<h1>SomeHeader</h1><p>SomeParagraph</p>"
        };

        processToc(context);
        context.toc.length.should.equal(1);
        done();
    });

    it('should extract one root node', function(done) {
        var context = {
            content : "<h1>SomeHeader</h1><h2>SomeOtherHeader</h2>"
        };

        processToc(context);
        context.toc.length.should.equal(1);
        done();
    });

    it('should extract hierarchic nodes', function(done) {
        var context = {
            content : "<h1>SomeHeader</h1><h2>SomeOtherHeader</h2>"
        };

        processToc(context);
        context.toc[0].nodes.length.should.equal(1);
        done();
    });

    it('should fall back to parent node', function(done) {
        var context = {
            content : "<h2>h2_1</h2><h3>h3_1</h3><h3>h3_2</h3><h2>h2_2</h2>"
        };

        processToc(context);
        context.toc.length.should.equal(2);
        context.toc[0].nodes.length.should.equal(2);
        context.toc[1].nodes.length.should.equal(0);
        done();
    });
})