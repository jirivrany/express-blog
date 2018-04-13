module.exports = {
    firstNWords: function(n, text) {
        let words = text.split(" ");
        let output = "";
        for (var i = 0; i <= n; i++) {
            if (words[i]) {
                output += words[i] + " ";
            }
        }
        return output + " ...";
    }
}