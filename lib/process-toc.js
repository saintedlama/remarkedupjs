var Tree = require('./tree');

module.exports = function(context) {
    var root = new Tree();
    var current = root;
    context.content = context.content.replace(/<h([1-6])>(.*?)<\/h[1-6]>/g, function(match, level, title) {
        var id = title.replace(/[^a-zA-Z]/g, '_');

        current = current.find(function(node) {
           return node.level < parseInt(level);
        });

        current = current.add({ level: parseInt(level), title : title, id : id });

        return '<h' + level + ' id="' + id + '">' + title + '</h' + level + '>';
    });

    context.toc = root.nodes;
}
