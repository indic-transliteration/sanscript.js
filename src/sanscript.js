/**
 * Sanscript
 *
 * Sanscript is a Sanskrit transliteration library. Currently, it supports
 * other Indian languages only incidentally.
 *
 * License: MIT
 */

function exportSanscriptSingleton (global, schemes) {
    "use strict";

    const Sanscript = {};
    // First, we define the Sanscript singleton, with its variables and methods.
    Sanscript.defaults = {
        "skip_sgml" : false,
        "syncope"   : false,
    };

    /* Schemes
     * =======
     * Schemes are of two kinds: "Brahmic" and "roman." "Brahmic" schemes
     * describe abugida scripts found in India. "Roman" schemes describe
     * manufactured alphabets that are meant to describe or encode Brahmi
     * scripts. Abugidas and alphabets are processed by separate algorithms
     * because of the unique difficulties involved with each.
     *
     * Brahmic consonants are stated without a virama. Roman consonants are
     * stated without the vowel 'a'.
     *
     * (Since "abugida" is not a well-known term, Sanscript uses "Brahmic"
     * and "roman" for clarity.)
     */
    Sanscript.schemes = schemes;
    // Set of names of schemes
    const romanSchemes = {};

    // object cache
    let cache = {};

    /**
     * Check whether the given scheme encodes romanized Sanskrit.
     *
     * @param name  the scheme name
     * @return      boolean
     */
    Sanscript.isRomanScheme = function (name) {
        return romanSchemes.hasOwnProperty(name);
    };

    /**
     * Add a Brahmic scheme to Sanscript.
     *
     * Schemes are of two types: "Brahmic" and "roman". Brahmic consonants
     * have an inherent vowel sound, but roman consonants do not. This is the
     * main difference between these two types of scheme.
     *
     * A scheme definition is an object ("{}") that maps a group name to a
     * list of characters. For illustration, see the "devanagari" scheme at
     * the top of this file.
     *
     * You can use whatever group names you like, but for the best results,
     * you should use the same group names that Sanscript does.
     *
     * @param name    the scheme name
     * @param scheme  the scheme data itself. This should be constructed as
     *                described above.
     */
    Sanscript.addBrahmicScheme = function (name, scheme) {
        Sanscript.schemes[name] = scheme;
    };

    /**
     * Add a roman scheme to Sanscript.
     *
     * See the comments on Sanscript.addBrahmicScheme. The "vowel_marks" field
     * can be omitted.
     *
     * @param name    the scheme name
     * @param scheme  the scheme data itself
     */
    Sanscript.addRomanScheme = function (name, scheme) {
        if (!("vowel_marks" in scheme)) {
            scheme.vowel_marks = scheme.vowels.slice(1);
        }
        Sanscript.schemes[name] = scheme;
        romanSchemes[name] = true;
    };

    /**
     * Create a deep copy of an object, for certain kinds of objects.
     *
     * @param scheme  the scheme to copy
     * @return        the copy
     */
    const deepCopy = function (scheme) {
        return JSON.parse(JSON.stringify(scheme));
    };

    // Set up various schemes
    (function () {
        // Set up roman schemes
        const kolkata = deepCopy(schemes.iast);
        schemes.kolkata = kolkata;
        const schemeNames = ["iast", "itrans", "hk", "kolkata", "slp1", "velthuis", "wx", "cyrillic"];
        kolkata.vowels = ["a", "ā", "i", "ī", "u", "ū", "ṛ", "ṝ", "ḷ", "ḹ", "e", "ē", "ai", "o", "ō", "au"];

        // These schemes already belong to Sanscript.schemes. But by adding
        // them again with `addRomanScheme`, we automatically build up
        // `romanSchemes` and define a `vowel_marks` field for each one.
        for (let i = 0, name; (name = schemeNames[i]); i++) {
            Sanscript.addRomanScheme(name, schemes[name]);
        }

        // ITRANS variant, which supports Dravidian short 'e' and 'o'.
        const itrans_dravidian = deepCopy(schemes.itrans);
        itrans_dravidian.vowels = ["a", "A", "i", "I", "u", "U", "Ri", "RRI", "LLi", "LLi", "e", "E", "ai", "o", "O", "au"];
        itrans_dravidian.vowel_marks = itrans_dravidian.vowels.slice(1);
        Sanscript.addRomanScheme("itrans_dravidian", itrans_dravidian);
    }());

    /**
     * Create a map from every character in `from` to its partner in `to`.
     * Also, store any "marks" that `from` might have.
     *
     * @param from     input scheme
     * @param to       output scheme
     * @param options  scheme options
     */
    const makeMap = function (from, to, options) {
        const consonants = {};
        const fromScheme = Sanscript.schemes[from];
        const letters = {};
        const tokenLengths = [];
        const marks = {};
        const toScheme = Sanscript.schemes[to];

        const alternates = fromScheme["alternates"] || {};

        for (const group in fromScheme) {
            if (!fromScheme.hasOwnProperty(group)) {
                continue;
            }
            const fromGroup = fromScheme[group];
            const toGroup = toScheme[group];
            if (toGroup === undefined) {
                continue;
            }
            for (let i = 0; i < fromGroup.length; i++) {
                const F = fromGroup[i];
                const T = toGroup[i];
                const alts = alternates[F] || [];
                const numAlts = alts.length;
                let j = 0;

                tokenLengths.push(F.length);
                for (j = 0; j < numAlts; j++) {
                    tokenLengths.push(alts[j].length);
                }

                if (group === "vowel_marks" || group === "virama") {
                    marks[F] = T;
                    for (j = 0; j < numAlts; j++) {
                        marks[alts[j]] = T;
                    }
                } else {
                    letters[F] = T;
                    for (j = 0; j < numAlts; j++) {
                        letters[alts[j]] = T;
                    }
                    if (group === "consonants" || group === "other") {
                        consonants[F] = T;

                        for (j = 0; j < numAlts; j++) {
                            consonants[alts[j]] = T;
                        }
                    }
                }
            }
        }

        return {
            consonants     : consonants,
            fromRoman      : Sanscript.isRomanScheme(from),
            letters        : letters,
            marks          : marks,
            maxTokenLength : Math.max.apply(Math, tokenLengths),
            toRoman        : Sanscript.isRomanScheme(to),
            virama         : toScheme.virama,
            toSchemeA      : toScheme.vowels[0],
            fromSchemeA    : fromScheme.vowels[0],
        };
    };

    /**
     * Transliterate from a romanized script.
     *
     * @param data     the string to transliterate
     * @param map      map data generated from makeMap()
     * @param options  transliteration options
     * @return         the finished string
     */
    const transliterateRoman = function (data, map, options) {
        const buf = [];
        const consonants = map.consonants;
        const dataLength = data.length;
        const letters = map.letters;
        const marks = map.marks;
        const maxTokenLength = map.maxTokenLength;
        const optSkipSGML = options.skip_sgml;
        const optSyncope = options.syncope;
        const toRoman = map.toRoman;
        const virama = map.virama;

        let hadConsonant = false;
        let tempLetter;
        let tempMark;
        let tokenBuffer = "";

        // Transliteration state. It's controlled by these values:
        // - `skippingSGML`: are we in SGML?
        // - `toggledTrans`: are we in a toggled region?
        //
        // We combine these values into a single variable `skippingTrans`:
        //
        //     `skippingTrans` = skippingSGML || toggledTrans;
        //
        // If (and only if) this value is true, don't transliterate.
        let skippingSGML = false;
        let skippingTrans = false;
        let toggledTrans = false;

        for (let i = 0, L; (L = data.charAt(i)) || tokenBuffer; i++) {
            // Fill the token buffer, if possible.
            const difference = maxTokenLength - tokenBuffer.length;
            if (difference > 0 && i < dataLength) {
                tokenBuffer += L;
                if (difference > 1) {
                    continue;
                }
            }

            // Match all token substrings to our map.
            for (let j = 0; j < maxTokenLength; j++) {
                const token = tokenBuffer.substr(0, maxTokenLength - j);

                if (skippingSGML === true) {
                    skippingSGML = (token !== ">");
                } else if (token === "<") {
                    skippingSGML = optSkipSGML;
                } else if (token === "##") {
                    toggledTrans = !toggledTrans;
                    tokenBuffer = tokenBuffer.substr(2);
                    break;
                }
                skippingTrans = skippingSGML || toggledTrans;
                if ((tempLetter = letters[token]) !== undefined && !skippingTrans) {
                    if (toRoman) {
                        buf.push(tempLetter);
                    } else {
                        // Handle the implicit vowel. Ignore 'a' and force
                        // vowels to appear as marks if we've just seen a
                        // consonant.
                        if (hadConsonant) {
                            if ((tempMark = marks[token])) {
                                buf.push(tempMark);
                            } else if (token !== map.fromSchemeA) {
                                buf.push(virama);
                                buf.push(tempLetter);
                            }
                        } else {
                            buf.push(tempLetter);
                        }
                        hadConsonant = token in consonants;
                    }
                    tokenBuffer = tokenBuffer.substr(maxTokenLength - j);
                    break;
                } else if (j === maxTokenLength - 1) {
                    if (hadConsonant) {
                        hadConsonant = false;
                        if (!optSyncope) {
                            buf.push(virama);
                        }
                    }
                    buf.push(token);
                    tokenBuffer = tokenBuffer.substr(1);
                    // 'break' is redundant here, "j == ..." is true only on
                    // the last iteration.
                }
            }
        }
        if (hadConsonant && !optSyncope) {
            buf.push(virama);
        }
        return buf.join("");
    };

    /**
     * Transliterate from a Brahmic script.
     *
     * @param data     the string to transliterate
     * @param map      map data generated from makeMap()
     * @param options  transliteration options
     * @return         the finished string
     */
    const transliterateBrahmic = function (data, map, options) {
        const buf = [];
        const consonants = map.consonants;
        const letters = map.letters;
        const marks = map.marks;
        const toRoman = map.toRoman;

        let danglingHash = false;
        let hadRomanConsonant = false;
        let temp;
        let skippingTrans = false;

        for (let i = 0, L; (L = data.charAt(i)); i++) {
            // Toggle transliteration state
            if (L === "#") {
                if (danglingHash) {
                    skippingTrans = !skippingTrans;
                    danglingHash = false;
                } else {
                    danglingHash = true;
                }
                if (hadRomanConsonant) {
                    buf.push(map.toSchemeA);
                    hadRomanConsonant = false;
                }
                continue;
            } else if (skippingTrans) {
                buf.push(L);
                continue;
            }

            if ((temp = marks[L]) !== undefined) {
                buf.push(temp);
                hadRomanConsonant = false;
            } else {
                if (danglingHash) {
                    buf.push("#");
                    danglingHash = false;
                }
                if (hadRomanConsonant) {
                    buf.push(map.toSchemeA);
                    hadRomanConsonant = false;
                }

                // Push transliterated letter if possible. Otherwise, push
                // the letter itself.
                if ((temp = letters[L])) {
                    buf.push(temp);
                    hadRomanConsonant = toRoman && (L in consonants);
                } else {
                    buf.push(L);
                }
            }
        }
        if (hadRomanConsonant) {
            buf.push(map.toSchemeA);
        }
        return buf.join("");
    };

    /**
     * Transliterate from one script to another.
     *
     * @param data     the string to transliterate
     * @param from     the source script
     * @param to       the destination script
     * @param options  transliteration options
     * @return         the finished string
     */
    Sanscript.t = function (data, from, to, options) {
        options = options || {};
        const cachedOptions = cache.options || {};
        const defaults = Sanscript.defaults;
        let hasPriorState = (cache.from === from && cache.to === to);
        let map;

        // Here we simultaneously build up an `options` object and compare
        // these options to the options from the last run.
        for (const key in defaults) {
            if (defaults.hasOwnProperty(key)) {
                let value = defaults[key];
                if (key in options) {
                    value = options[key];
                }
                options[key] = value;

                // This comparison method is not generalizable, but since these
                // objects are associative arrays with identical keys and with
                // values of known type, it works fine here.
                if (value !== cachedOptions[key]) {
                    hasPriorState = false;
                }
            }
        }

        if (hasPriorState) {
            map = cache.map;
        } else {
            map = makeMap(from, to, options);
            cache = {
                from    : from,
                map     : map,
                options : options,
                to      : to,
            };
        }

        // Easy way out for "{\m+}", "\", and ".h".
        if (from === "itrans") {
            data = data.replace(/\{\\m\+\}/g, ".h.N");
            data = data.replace(/\.h/g, "");
            data = data.replace(/\\([^'`_]|$)/g, "##$1##");
        }
        if (from === "tamil_superscripted") {
            const pattern = "([" + schemes["tamil_superscripted"]["vowel_marks"].join("") + schemes["tamil_superscripted"]["virama"] + "॒॑" + "]+)([²³⁴])";
            data = data.replace(new RegExp(pattern, "g"), "$2$1");
            console.error("transliteration from tamil_superscripted not fully implemented!");
        }

        let result = "";
        if (map.fromRoman) {
            result = transliterateRoman(data, map, options);
        } else {
            result = transliterateBrahmic(data, map, options);
        }
        if (to === "tamil_superscripted") {
            const pattern = "([²³⁴])([" + schemes["tamil_superscripted"]["vowel_marks"].join("") + schemes["tamil_superscripted"]["virama"] + "॒॑" + "]+)";
            result = result.replace(new RegExp(pattern, "g"), "$2$1");
        }
        return result;
    };

    // Now that Sanscript is fully defined, we now safely export it for use elsewhere.
    // The below block was copied from https://www.npmjs.com/package/sanscript .
    // define seems to be a requirejs thing https://requirejs.org/docs/whyamd.html#amd .
    if (typeof define === "function" && define.amd) {
        define(function () {
            return Sanscript;
        });
    } else if (typeof exports !== "undefined") {
        if (typeof module !== "undefined" && module.exports) {
            exports = Sanscript;
            module.exports = Sanscript;
        }

        exports.Sanscript = Sanscript;
    } else {
        global.Sanscript = Sanscript;
    }
}

/* global schemes */
exportSanscriptSingleton(this, schemes);
