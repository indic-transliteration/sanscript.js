module.exports = {
    "env" : {
        "amd"     : true,
        "browser" : true,
        "es6"     : true,
        "node"    : true,
    },
    "extends"       : "eslint:recommended",
    "parserOptions" : {
        "ecmaVersion" : 2018,
    },
    "root"  : true,
    "rules" : {
        "arrow-parens"                : ["error", "always"],
        "comma-dangle"                : ["error", "always-multiline"],
        "indent"                      : ["error", 4],
        "linebreak-style"             : ["error", "unix"],
        "no-prototype-builtins"       : ["warn"],
        "no-unused-vars"              : ["warn"],
        "prefer-const"                : ["error"],
        "quotes"                      : ["error", "double"],
        "semi"                        : ["error", "always"],
        "space-before-function-paren" : ["error", "always"],

        "key-spacing" : ["error", {
            "afterColon"  : true,
            "align"       : "colon",
            "beforeColon" : true,
        }],
    },
};
