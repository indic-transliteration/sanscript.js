module.exports = {
    "env" : {
        "amd"     : true,
        "browser" : true,
        "es6"     : true,
        "node"    : true,
    },
    "extends"        : "eslint:recommended",
    "ignorePatterns" : [
        "/sanscript.es6.js",
        "/sanscript.js",
    ],
    "parserOptions" : {
        "ecmaVersion" : 2018,
    },
    "root"  : true,
    "rules" : {
        "arrow-parens"                : ["error", "always"],
        "comma-dangle"                : ["error", "always-multiline"],
        "indent"                      : ["error", 4],
        "linebreak-style"             : ["error", "unix"],
        "no-multi-assign"             : ["error"],
        "no-prototype-builtins"       : ["warn"],
        "no-unused-vars"              : ["warn", { "argsIgnorePattern" : "^_" }],
        "no-var"                      : ["error"],
        "one-var"                     : ["error", "never"],
        "prefer-const"                : ["error"],
        "semi"                        : ["error", "always"],
        "space-before-function-paren" : ["error", "always"],

        "no-console" : ["error", {
            allow : ["error"],
        }],

        "key-spacing" : ["error", {
            "afterColon"  : true,
            "align"       : "colon",
            "beforeColon" : true,
        }],
    },
};
