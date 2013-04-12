/**
 * Sanscript
 *
 * Sanscript is a Sanskrit transliteration library. Currently, it supports
 * other Indian languages only incidentally.
 *
 * Released under the MIT and GPL Licenses.
 */

(function(Sanscript) {
    "use strict";

    Sanscript.defaults = {
        "skip_sgml": false,
        "syncope": false
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
    var schemes = Sanscript.schemes = {

        /* Bengali
         * -------
         * 'va' and 'ba' are both rendered as ব.
         */
        "bengali": {
            "vowels": ["অ", "আ", "ই", "ঈ", "উ", "ঊ", "ঋ", "ৠ", "ঌ", "ৡ", "", "এ", "ঐ", "", "ও", "ঔ"],
            "vowel_marks": ["া", "ি", "ী", "ু", "ূ", "ৃ", "ৄ", "ৢ", "ৣ", "", "ে", "ৈ", "", "ো", "ৌ"],
            "other_marks": ["ং", "ঃ", "ঁ"],
            "virama": ["্"],
            "consonants": ["ক", "খ", "গ", "ঘ", "ঙ", "চ", "ছ", "জ", "ঝ", "ঞ", "ট", "ঠ", "ড", "ঢ", "ণ", "ত", "থ", "দ", "ধ", "ন", "প", "ফ", "ব", "ভ", "ম", "য", "র", "ল", "ব", "শ", "ষ", "স", "হ", "ळ", "ক্ষ", "জ্ঞ"],
            "symbols": ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯", "ॐ", "ঽ", "।", "॥"],
            "other": ["", "", "", "", "ড", "ঢ", "", "য", ""]
        },

        /* Devanagari
         * ----------
         * The most comprehensive and unambiguous Brahmic script listed.
         */
        "devanagari": {
            // "Independent" forms of the vowels. These are used whenever the
            // vowel does not immediately follow a consonant.
            "vowels": ["अ", "आ", "इ", "ई", "उ", "ऊ", "ऋ", "ॠ", "ऌ", "ॡ", "ऎ", "ए", "ऐ", "ऒ", "ओ", "औ"],

            // "Dependent" forms of the vowels. These are used whenever the
            // vowel immediately follows a consonant. If a letter is not
            // listed in `vowels`, it should not be listed here.
            "vowel_marks": ["ा", "ि", "ी", "ु", "ू", "ृ", "ॄ", "ॢ", "ॣ", "ॆ", "े", "ै", "ॊ", "ो", "ौ"],

            // Miscellaneous marks, all of which are used in Sanskrit.
            "other_marks": ["ं", "ः", "ँ"],

            // In syllabic scripts like Devanagari, consonants have an inherent
            // vowel that must be suppressed explicitly. We do so by putting a
            // virama after the consonant.
            "virama": ["्"],

            // Various Sanskrit consonants and consonant clusters. Every token
            // here has an explicit vowel. Thus "क" is "ka" instead of "k".
            "consonants": ["क", "ख", "ग", "घ", "ङ", "च", "छ", "ज", "झ", "ञ", "ट", "ठ", "ड", "ढ", "ण", "त", "थ", "द", "ध", "न", "प", "फ", "ब", "भ", "म", "य", "र", "ल", "व", "श", "ष", "स", "ह", "ळ", "क्ष", "ज्ञ"],

            // Numbers and punctuation
            "symbols": ["०", "१", "२", "३", "४", "५", "६", "७", "८", "९", "ॐ", "ऽ", "।", "॥"],

            // Zero-width joiner. This is used to separate a consonant cluster
            // and avoid a complex ligature.
            "zwj": ["\u200D"],

            // Dummy consonant. This is used in ITRANS to prevert certain types
            // of parser ambiguity. Thus "barau" -> बरौ but "bara_u" -> बरउ.
            "skip": [""],

            // Vedic accent. Udatta and anudatta.
            "accent": ["\u0951", "\u0952"],

            // Accent combined with anusvara and and visarga. For compatibility
            // with ITRANS, which allows the reverse of these four.
            "combo_accent": ["ः॑", "ः॒", "ं॑", "ं॒"],

            "candra": ["ॅ"],

            // Non-Sanskrit consonants
            "other": ["क़", "ख़", "ग़", "ज़", "ड़", "ढ़", "फ़", "य़", "ऱ"]
        },

        /* Gujarati
         * --------
         * Sanskrit-complete.
         */
        "gujarati": {
            "vowels": ["અ", "આ", "ઇ", "ઈ", "ઉ", "ઊ", "ઋ", "ૠ", "ઌ", "ૡ", "", "એ", "ઐ", "", "ઓ", "ઔ"],
            "vowel_marks": ["ા", "િ", "ી", "ુ", "ૂ", "ૃ", "ૄ", "ૢ", "ૣ", "", "ે", "ૈ", "", "ો", "ૌ"],
            "other_marks": ["ં", "ઃ", "ઁ"],
            "virama": ["્"],
            "consonants": ["ક", "ખ", "ગ", "ઘ", "ઙ", "ચ", "છ", "જ", "ઝ", "ઞ", "ટ", "ઠ", "ડ", "ઢ", "ણ", "ત", "થ", "દ", "ધ", "ન", "પ", "ફ", "બ", "ભ", "મ", "ય", "ર", "લ", "વ", "શ", "ષ", "સ", "હ", "ળ", "ક્ષ", "જ્ઞ"],
            "symbols": ["૦", "૧", "૨", "૩", "૪", "૫", "૬", "૭", "૮", "૯", "ૐ", "ઽ", "૤", "૥"],
            "candra": ["ૅ"]
        },

        /* Gurmukhi
         * --------
         * Missing R/RR/lR/lRR
         */
        "gurmukhi": {
            "vowels": ["ਅ", "ਆ", "ਇ", "ਈ", "ਉ", "ਊ", "", "", "", "", "", "ਏ", "ਐ", "", "ਓ", "ਔ"],
            "vowel_marks": ["ਾ", "ਿ", "ੀ", "ੁ", "ੂ", "", "", "", "", "", "ੇ", "ੈ", "", "ੋ", "ੌ"],
            "other_marks": ["ਂ", "ਃ", "ਁ"],
            "virama": ["੍"],
            "consonants": ["ਕ", "ਖ", "ਗ", "ਘ", "ਙ", "ਚ", "ਛ", "ਜ", "ਝ", "ਞ", "ਟ", "ਠ", "ਡ", "ਢ", "ਣ", "ਤ", "ਥ", "ਦ", "ਧ", "ਨ", "ਪ", "ਫ", "ਬ", "ਭ", "ਮ", "ਯ", "ਰ", "ਲ", "ਵ", "ਸ਼", "ਸ਼", "ਸ", "ਹ", "ਲ਼", "ਕ੍ਸ਼", "ਜ੍ਞ"],
            "symbols": ["੦", "੧", "੨", "੩", "੪", "੫", "੬", "੭", "੮", "੯", "ॐ", "ऽ", "।", "॥"],
            "other": ["", "ਖ", "ਗ", "ਜ", "ਡ", "", "ਫ", "", ""]
        },

        /* Kannada
         * -------
         * Sanskrit-complete.
         */
        "kannada": {
            "vowels": ["ಅ", "ಆ", "ಇ", "ಈ", "ಉ", "ಊ", "ಋ", "ೠ", "ಌ", "ೡ", "ಎ", "ಏ", "ಐ", "ಒ", "ಓ", "ಔ"],
            "vowel_marks": ["ಾ", "ಿ", "ೀ", "ು", "ೂ", "ೃ", "ೄ", "ೢ", "ೣ", "ೆ", "ೇ", "ೈ", "ೊ", "ೋ", "ೌ"],
            "other_marks": ["ಂ", "ಃ", "ँ"],
            "virama": ["್"],
            "consonants": ["ಕ", "ಖ", "ಗ", "ಘ", "ಙ", "ಚ", "ಛ", "ಜ", "ಝ", "ಞ", "ಟ", "ಠ", "ಡ", "ಢ", "ಣ", "ತ", "ಥ", "ದ", "ಧ", "ನ", "ಪ", "ಫ", "ಬ", "ಭ", "ಮ", "ಯ", "ರ", "ಲ", "ವ", "ಶ", "ಷ", "ಸ", "ಹ", "ಳ", "ಕ್ಷ", "ಜ್ಞ"],
            "symbols": ["೦", "೧", "೨", "೩", "೪", "೫", "೬", "೭", "೮", "೯", "ಓಂ", "ಽ", "।", "॥"],
            "other": ["", "", "", "", "", "", "ಫ", "", "ಱ"]
        },

        /* Malayalam
         * ---------
         * Sanskrit-complete.
         */
        "malayalam": {
            "vowels": ["അ", "ആ", "ഇ", "ഈ", "ഉ", "ഊ", "ഋ", "ൠ", "ഌ", "ൡ", "എ", "ഏ", "ഐ", "ഒ", "ഓ", "ഔ"],
            "vowel_marks": ["ാ", "ി", "ീ", "ു", "ൂ", "ൃ", "ൄ", "ൢ", "ൣ", "െ", "േ", "ൈ", "ൊ", "ോ", "ൌ"],
            "other_marks": ["ം", "ഃ", "ँ"],
            "virama": ["്"],
            "consonants": ["ക", "ഖ", "ഗ", "ഘ", "ങ", "ച", "ഛ", "ജ", "ഝ", "ഞ", "ട", "ഠ", "ഡ", "ഢ", "ണ", "ത", "ഥ", "ദ", "ധ", "ന", "പ", "ഫ", "ബ", "ഭ", "മ", "യ", "ര", "ല", "വ", "ശ", "ഷ", "സ", "ഹ", "ള", "ക്ഷ", "ജ്ഞ"],
            "symbols": ["൦", "൧", "൨", "൩", "൪", "൫", "൬", "൭", "൮", "൯", "ഓം", "ഽ", "।", "॥"],
            "other": ["", "", "", "", "", "", "", "", "റ"]
        },

        /* Oriya
         * -----
         * Missing lR/lRR vowel marks
         */
        "oriya": {
            "vowels": ["ଅ", "ଆ", "ଇ", "ଈ", "ଉ", "ଊ", "ଋ", "ୠ", "ଌ", "ୡ", "", "ଏ", "ଐ", "", "ଓ", "ଔ"],
            "vowel_marks": ["ା", "ି", "ୀ", "ୁ", "ୂ", "ୃ", "ୄ", "", "", "", "େ", "ୈ", "", "ୋ", "ୌ"],
            "other_marks": ["ଂ", "ଃ", "ଁ"],
            "virama": ["୍"],
            "consonants": ["କ", "ଖ", "ଗ", "ଘ", "ଙ", "ଚ", "ଛ", "ଜ", "ଝ", "ଞ", "ଟ", "ଠ", "ଡ", "ଢ", "ଣ", "ତ", "ଥ", "ଦ", "ଧ", "ନ", "ପ", "ଫ", "ବ", "ଭ", "ମ", "ଯ", "ର", "ଲ", "ଵ", "ଶ", "ଷ", "ସ", "ହ", "ଳ", "କ୍ଷ", "ଜ୍ଞ"],
            "symbols": ["୦", "୧", "୨", "୩", "୪", "୫", "୬", "୭", "୮", "୯", "ଓଂ", "ଽ", "।", "॥"],
            "other": ["", "", "", "", "ଡ", "ଢ", "", "ଯ", ""]
        },

        /* Tamil
         * -----
         * Missing R/RR/lR/lRR vowel marks and voice/aspiration distinctions.
         * The most incomplete of the Sanskrit schemes here.
         */
        "tamil": {
            "vowels": ["அ", "ஆ", "இ", "ஈ", "உ", "ஊ", "", "", "", "", "எ", "ஏ", "ஐ", "ஒ", "ஓ", "ஔ"],
            "vowel_marks": ["ா", "ி", "ீ", "ு", "ூ", "", "", "", "", "ெ", "ே", "ை", "ொ", "ோ", "ௌ"],
            "other_marks": ["ஂ", "ஃ", ""],
            "virama": ["்"],
            "consonants": ["க", "க", "க", "க", "ங", "ச", "ச", "ஜ", "ச", "ஞ", "ட", "ட", "ட", "ட", "ண", "த", "த", "த", "த", "ந", "ப", "ப", "ப", "ப", "ம", "ய", "ர", "ல", "வ", "ஶ", "ஷ", "ஸ", "ஹ", "ள", "க்ஷ", "ஜ்ஞ"],
            "symbols": ["௦", "௧", "௨", "௩", "௪", "௫", "௬", "௭", "௮", "௯", "ௐ", "ऽ", "।", "॥"],
            "other": ["", "", "", "", "", "", "", "", "ற"]
        },

        /* Telugu
         * ------
         * Sanskrit-complete.
         */
        "telugu": {
            "vowels": ["అ", "ఆ", "ఇ", "ఈ", "ఉ", "ఊ", "ఋ", "ౠ", "ఌ", "ౡ", "ఎ", "ఏ", "ఐ", "ఒ", "ఓ", "ఔ"],
            "vowel_marks": ["ా", "ి", "ీ", "ు", "ూ", "ృ", "ౄ", "ౢ", "ౣ", "ె", "ే", "ై", "ొ", "ో", "ౌ"],
            "other_marks": ["ం", "ః", "ఁ"],
            "virama": ["్"],
            "consonants": ["క", "ఖ", "గ", "ఘ", "ఙ", "చ", "ఛ", "జ", "ఝ", "ఞ", "ట", "ఠ", "డ", "ఢ", "ణ", "త", "థ", "ద", "ధ", "న", "ప", "ఫ", "బ", "భ", "మ", "య", "ర", "ల", "వ", "శ", "ష", "స", "హ", "ళ", "క్ష", "జ్ఞ"],
            "symbols": ["౦", "౧", "౨", "౩", "౪", "౫", "౬", "౭", "౮", "౯", "ఓం", "ఽ", "।", "॥"],
            "other": ["", "", "", "", "", "", "", "", "ఱ"]
        },

        /* International Alphabet of Sanskrit Transliteration
         * --------------------------------------------------
         * The most "professional" Sanskrit romanization scheme.
         */
        "iast": {
            "vowels": ["a", "ā", "i", "ī", "u", "ū", "ṛ", "ṝ", "ḷ", "ḹ", "", "e", "ai", "", "o", "au"],
            "other_marks": ["ṃ", "ḥ", "~"],
            "virama": [""],
            "consonants": ["k", "kh", "g", "gh", "ṅ", "c", "ch", "j", "jh", "ñ", "ṭ", "ṭh", "ḍ", "ḍh", "ṇ", "t", "th", "d", "dh", "n", "p", "ph", "b", "bh", "m", "y", "r", "l", "v", "ś", "ṣ", "s", "h", "ḻ", "kṣ", "jñ"],
            "symbols": ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "oṃ", "'", "।", "॥"]
        },

        /* ITRANS
         * ------
         * One of the first romanization schemes -- and one of the most
         * complicated. For alternate forms, see the "allAlternates" variable
         * below.
         *
         * '_' is a "null" letter, which allows adjacent vowels.
         */
        "itrans": {
            "vowels": ["a", "A", "i", "I", "u", "U", "RRi", "RRI", "LLi", "LLI", "", "e", "ai", "", "o", "au"],
            "other_marks": ["M", "H", ".N"],
            "virama": [""],
            "consonants": ["k", "kh", "g", "gh", "~N", "ch", "Ch", "j", "jh", "~n", "T", "Th", "D", "Dh", "N", "t", "th", "d", "dh", "n", "p", "ph", "b", "bh", "m", "y", "r", "l", "v", "sh", "Sh", "s", "h", "L", "kSh", "j~n"],
            "symbols": ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "OM", ".a", "|", "||"],
            "candra": [".c"],
            "zwj": ["{}"],
            "skip": "_",
            "accent": ["\\'", "\\_"],
            "combo_accent": ["\\'H", "\\_H", "\\'M", "\\_M"],
            "other": ["q", "K", "G", "z", ".D", ".Dh", "f", "Y", "R"]
        },

        /* Harvard-Kyoto
         * -------------
         * A simple 1:1 mapping.
         */
        "hk": {
            "vowels": ["a", "A", "i", "I", "u", "U", "R", "RR", "lR", "lRR", "", "e", "ai", "", "o", "au"],
            "other_marks": ["M", "H", "~",],
            "virama": [""],
            "consonants": ["k", "kh", "g", "gh", "G", "c", "ch", "j", "jh", "J", "T", "Th", "D", "Dh", "N", "t", "th", "d", "dh", "n", "p", "ph", "b", "bh", "m", "y", "r", "l", "v", "z", "S", "s", "h", "L", "kS", "jJ"],
            "symbols": ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "OM", "'", "|", "||"]
        },

        /* National Library at Kolkata
         * ---------------------------
         * Apart from using "ē" and "ō" instead of "e" and "o", this scheme is
         * identical to IAST. ṝ, ḷ, and ḹ are not part of the scheme proper.
         *
         * This is defined further below.
         */

        /* Sanskrit Library Phonetic Basic
         * -------------------------------
         * With one ASCII letter per phoneme, this is the tersest transliteration
         * scheme in use today and is especially suited to computer processing.
         */
        "slp1": {
            "vowels": ["a", "A", "i", "I", "u", "U", "f", "F", "x", "X", "", "e", "E", "", "o", "O"],
            "other_marks": ["M", "H", "~"],
            "virama": [""],
            "consonants": ["k", "K", "g", "G", "N", "c", "C", "j", "J", "Y", "w", "W", "q", "Q", "R", "t", "T", "d", "D", "n", "p", "P", "b", "B", "m", "y", "r", "l", "v", "S", "z", "s", "h", "L", "kz", "jY"],
            "symbols": ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "oM", "'", ".", ".."]
        },

        /* Velthuis
         * --------
         * A case-insensitive Sanskrit encoding.
         */
        "velthuis": {
            "vowels": ["a", "aa", "i", "ii", "u", "uu", ".r", ".rr", ".li", ".ll", "", "e", "ai", "", "o", "au"],
            "other_marks": [".m", ".h", ""],
            "virama": [""],
            "consonants": ["k", "kh", "g", "gh", "\"n", "c", "ch", "j", "jh", "~n", ".t", ".th", ".d", ".d", ".n", "t", "th", "d", "dh", "n", "p", "ph", "b", "bh", "m", "y", "r", "l", "v", "~s", ".s", "s", "h", "L", "k.s", "j~n"],
            "symbols": ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "o.m", "'", "|", "||"]
        },

        /* WX
         * --
         * As terse as SLP1.
         */
        "wx": {
            "vowels": ["a", "A", "i", "I", "u", "U", "q", "Q", "L", "", "", "e", "E", "", "o", "O"],
            "other_marks": ["M", "H", "z"],
            "virama": [""],
            "consonants": ["k", "K", "g", "G", "f", "c", "C", "j", "J", "F", "t", "T", "d", "D", "N", "w", "W", "x", "X", "n", "p", "P", "b", "B", "m", "y", "r", "l", "v", "S", "R", "s", "h", "", "kR", "jF"],
            "symbols": ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "oM", "'", "|", "||"]
        },
    },

    // Set of names of schemes
    romanSchemes = {},

    // Map of alternate encodings.
    allAlternates = {
        "itrans": {
            "A": ["aa"],
            "I": ["ii", "ee"],
            "U": ["uu", "oo"],
            "RRi": ["R^i"],
            "RRI": ["R^I"],
            "LLi": ["L^i"],
            "LLI": ["L^I"],
            "M": [".m", ".n"],
            "~N": ["N^"],
            "ch": ["c"],
            "Ch": ["C", "chh"],
            "~n": ["JN"],
            "v": ["w"],
            "Sh": ["S", "shh"],
            "kSh": ["kS", "x"],
            "j~n": ["GY", "dny"],
            "OM": ["AUM"],
            "\\_": ["\\`"],
            "\\_H": ["\\`H"],
            "\\'M": ["\\'.m", "\\'.n"],
            "\\_M": ["\\_.m", "\\_.n", "\\`M", "\\`.m", "\\`.n"],
            ".a": ["~"],
            "|": ["."],
            "||": [".."],
            "z": ["J"]
        }
    },

    // object cache
    cache = {};

    /**
     * Check whether the given scheme encodes romanized Sanskrit.
     *
     * @param name  the scheme name
     * @return      boolean
     */
    Sanscript.isRomanScheme = function(name) {
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
    Sanscript.addBrahmicScheme = function(name, scheme) {
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
    Sanscript.addRomanScheme = function(name, scheme) {
        if (!('vowel_marks' in scheme)) {
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
    var cheapCopy = function(scheme) {
        var copy = {};
        for (var key in scheme) {
            if (!scheme.hasOwnProperty(key)) {
                continue;
            }
            copy[key] = scheme[key].slice(0);
        }
        return copy;
    };

    // Set up various schemes
    (function() {
        // Set up roman schemes
        var kolkata = schemes.kolkata = cheapCopy(schemes.iast),
            schemeNames = ["iast", "itrans", "hk", "kolkata", "slp1", "velthuis", "wx"];
        kolkata.vowels = ["a", "ā", "i", "ī", "u", "ū", "ṛ", "ṝ", "ḷ", "ḹ", "e", "ē", "ai", "o", "ō", "au"];

        // These schemes already belong to Sanscript.schemes. But by adding
        // them again with `addRomanScheme`, we automatically build up
        // `romanSchemes` and define a `vowel_marks` field for each one.
        for (var i = 0, name; (name = schemeNames[i]); i++) {
            Sanscript.addRomanScheme(name, schemes[name]);
        }

        // ITRANS variant, which supports Dravidian short 'e' and 'o'.
        var itrans_dravidian = cheapCopy(schemes.itrans);
        itrans_dravidian.vowels = ["a", "A", "i", "I", "u", "U", "Ri", "RRI", "LLi", "LLi", "e", "E", "ai", "o", "O", "au"];
        itrans_dravidian.vowel_marks = itrans_dravidian.vowels.slice(1);
        allAlternates.itrans_dravidian = allAlternates.itrans;
        Sanscript.addRomanScheme('itrans_dravidian', itrans_dravidian);
    }());

    /**
     * Create a map from every character in `from` to its partner in `to`.
     * Also, store any "marks" that `from` might have.
     *
     * @param from     input scheme
     * @param to       output scheme
     * @param options  scheme options
     */
    var makeMap = function(from, to, options) {
        var alternates = allAlternates[from] || {},
            consonants = {},
            fromScheme = Sanscript.schemes[from],
            letters = {},
            tokenLengths = [],
            marks = {},
            toScheme = Sanscript.schemes[to];

        for (var group in fromScheme) {
            if (!fromScheme.hasOwnProperty(group)) {
                continue;
            }
            var fromGroup = fromScheme[group],
                toGroup = toScheme[group];
            if (toGroup === undefined) {
                continue;
            }
            for (var i = 0; i < fromGroup.length; i++) {
                var F = fromGroup[i],
                    T = toGroup[i],
                    alts = alternates[F] || [],
                    numAlts = alts.length,
                    j = 0;

                tokenLengths.push(F.length);
                for (j = 0; j < numAlts; j++) {
                    tokenLengths.push(alts[j].length);
                }

                if (group === 'vowel_marks' || group === 'virama') {
                    marks[F] = T;
                    for (j = 0; j < numAlts; j++) {
                        marks[alts[j]] = T;
                    }
                } else {
                    letters[F] = T;
                    for (j = 0; j < numAlts; j++) {
                        letters[alts[j]] = T;
                    }
                    if (group === 'consonants' || group === 'other') {
                        consonants[F] = T;

                        for (j = 0; j < numAlts; j++) {
                            consonants[alts[j]] = T;
                        }
                    }
                }
            }
        }

        return {consonants: consonants,
            fromRoman: Sanscript.isRomanScheme(from),
            letters: letters,
            marks: marks,
            maxTokenLength: Math.max.apply(Math, tokenLengths),
            toRoman: Sanscript.isRomanScheme(to),
            virama: toScheme.virama};
    };

    /**
     * Transliterate from a romanized script.
     *
     * @param data     the string to transliterate
     * @param map      map data generated from makeMap()
     * @param options  transliteration options
     * @return         the finished string
     */
    var transliterateRoman = function(data, map, options) {
        var buf = [],
            consonants = map.consonants,
            dataLength = data.length,
            hadConsonant = false,
            letters = map.letters,
            marks = map.marks,
            maxTokenLength = map.maxTokenLength,
            optSyncope = options.syncope,
            tempLetter,
            tempMark,
            tokenBuffer = '',
            toRoman = map.toRoman,
            transliterationEnabled = true,
            virama = map.virama;

        for (var i = 0, L; (L = data.charAt(i)) || tokenBuffer; i++) {
            // Fill the token buffer, if possible.
            var difference = maxTokenLength - tokenBuffer.length;
            if (difference > 0 && i < dataLength) {
                tokenBuffer += L;
                if (difference > 1) {
                    continue;
                }
            }

            // Match all token substrings to our map.
            for (var j = 0; j < maxTokenLength; j++) {
                var token = tokenBuffer.substr(0,maxTokenLength-j);

                if (token === '##') {
                    transliterationEnabled = !transliterationEnabled;
                    tokenBuffer = tokenBuffer.substr(2);
                    break;
                }
                if ((tempLetter = letters[token]) !== undefined && transliterationEnabled) {
                    if (toRoman) {
                        buf.push(tempLetter);
                    } else {
                        // Handle the implicit vowel. Ignore 'a' and force
                        // vowels to appear as marks if we've just seen a
                        // consonant.
                        if (hadConsonant) {
                            if ((tempMark = marks[token])) {
                                buf.push(tempMark);
                            } else if (token !== 'a') {
                                buf.push(virama);
                                buf.push(tempLetter);
                            }
                        } else {
                            buf.push(tempLetter);
                        }
                        hadConsonant = token in consonants;
                    }
                    tokenBuffer = tokenBuffer.substr(maxTokenLength-j);
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
        return buf.join('');
    };

    /**
     * Transliterate from a Brahmic script.
     *
     * @param data     the string to transliterate
     * @param map      map data generated from makeMap()
     * @param options  transliteration options
     * @return         the finished string
     */
    var transliterateBrahmic = function(data, map, options) {
        var buf = [],
            consonants = map.consonants,
            danglingHash = false,
            hadRomanConsonant = false,
            letters = map.letters,
            marks = map.marks,
            temp,
            toRoman = map.toRoman,
            transliterationEnabled = true;

        for (var i = 0, L; (L = data.charAt(i)); i++) {
            // Toggle transliteration state
            if (L === '#') {
                if (danglingHash) {
                    transliterationEnabled = !transliterationEnabled;
                    danglingHash = false;
                } else {
                    danglingHash = true;
                }
                if (hadRomanConsonant) {
                    buf.push('a');
                    hadRomanConsonant = false;
                }
                continue;
            } else if (!transliterationEnabled) {
                buf.push(L);
                continue;
            }

            if ((temp = marks[L]) !== undefined) {
                buf.push(temp);
                hadRomanConsonant = false;
            } else {
                if (danglingHash) {
                    buf.push('#');
                    danglingHash = false;
                }
                if (hadRomanConsonant) {
                    buf.push('a');
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
            buf.push('a');
        }
        return buf.join('');
    };

    /**
     * Transliterate from one script to another.
     *
     * @param data     the string to transliterate
     * @param from     the source script
     * @param to       the the destination script
     * @param options  transliteration options
     * @return         the finished string
     */
    Sanscript.t = function(data, from, to, options) {
        options = options || {};
        var cachedOptions = cache.options || {},
            defaults = Sanscript.defaults,
            hasPriorState = (cache.from === from && cache.to === to),
            map;

        // Here we simultaneously build up an `options` object and compare
        // these options to the options from the last run.
        for (var key in defaults) {
            if (defaults.hasOwnProperty(key)) {
                var value = defaults[key];
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
                from: from,
                map: map,
                options: options,
                to: to};
        }

        if (options.skip_sgml) {
            data = data.replace(/(<.*?>)/g, '##$1##');
        }

        // Easy way out for "{\m+}", "\", and ".h".
        if (from === 'itrans') {
            data = data.replace(/\{\\m\+\}/g, ".h.N");
            data = data.replace(/\.h/g, '');
            data = data.replace(/\\([^'`_]|$)/g, "##$1##");
        }

        if (map.fromRoman) {
            return transliterateRoman(data, map, options);
        } else {
            return transliterateBrahmic(data, map, options);
        }
    };
}(window.Sanscript = window.Sanscript || {}));
