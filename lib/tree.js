module.exports = TreeNode;

function TreeNode(parent, level, data) {
    this.parent = parent;
    this.level = level || 0;
    this.nodes = [];

    if (data) {
        for (var key in data) {
            if (data.hasOwnProperty(key)) {
                this[key] = data[key];
            }
        }
    }
}

TreeNode.prototype.add = function (data) {
    var node = new TreeNode(this, this.level + 1, data);

    this.nodes.push(node);
    return node;
}

TreeNode.prototype.find = function (fn) {
    var current = this;
    while (current && !fn(current)) {
        current = current.parent;
    }

    return current;
}