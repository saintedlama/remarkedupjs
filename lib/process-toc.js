module.exports = function(context) {
    context.content.search(/<h[1-6]>.*?<\/h[1-6]>/g);
}
