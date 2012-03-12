var Tree = require('../lib/tree'),
    should = require('should');

describe('Tree', function () {
    describe('#constructur', function () {
        it('should create root nodes with level 0', function () {
            var root = new Tree();
            root.level.should.equal(0);
        });

        it('should merge data into node', function () {
            var root = new Tree(null, 0, { title : 'title' });
            root.title.should.equal('title');
        });

        it('should create node with zero sub nodes', function () {
            var root = new Tree();
            root.nodes.length.should.equal(0);
        });
    });

    describe('#add', function () {
        it('should create linked child node', function (done) {
            var root = new Tree();
            var childNode = root.add();

            childNode.parent.should.equal(root);
            done();
        });

        it('should create child node with node level plus 1', function (done) {
            var root = new Tree();
            var childNode = root.add();

            childNode.level.should.equal(root.level + 1);
            done();
        });
    });

    describe('#find', function () {
        it('should return null if no parent node exists', function (done) {
            var root = new Tree();
            var parent = root.find(function () {
                return false;
            });

            should.not.exist(parent);
            done();
        });

        it('should traverse tree to parent', function(done) {
            var root = new Tree();
            var child = root.add();
            var i=0;

            child.find(function() { i=i+1; return false; });

            i.should.equal(2);
            done();
        });

        it('should return first matching node', function(done) {
            var root = new Tree();
            var child = root.add();
            var parent = child.find(function() { return true; });

            child.should.equal(parent);
            done();
        });

        it('should find parent node by node level', function(done) {
            var root = new Tree();
            var secondChild = root.add().add();
            var foundNode = secondChild.find(function(node) {
                return node.level < 1;
            });

            foundNode.should.equal(root);
            done();
        });
    });
});
