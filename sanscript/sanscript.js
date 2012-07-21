/**
 * sanscript.js
 *
 * sanscript.js is a Sanskrit transliteration library. Currently, it supports
 * other Indian languages only incidentally.
 *
 * Produced by learnsanskrit.org
 *
 * Released under the MIT and GPL Licenses.
 */
 
var Sanscript = new function() {
    var Sanscript = this;
    Sanscript.schemes = {
        /* Devanagari (full ITRANS) */
        devanagari: {
            vowels: 'अ आ इ ई उ ऊ ऋ ॠ ऌ ॡ ए ऐ ओ औ'.split(' '),
            marks: 'ा ि ी ु ू ृ ॄ ॢ ॣ े ै ो ौ'.split(' '), // 
            other_marks: 'ं ः ँ'.split(' '),
            virama: '्',
            consonants: 'क ख ग घ ङ च छ ज झ ञ ट ठ ड ढ ण त थ द ध न प फ ब भ म य र ल व श ष स ह ळ क्ष ज्ञ'.split(' '),
            other: '० १ २ ३ ४ ५ ६ ७ ८ ९ ॐ ऽ । ॥ ‍'.split(' '), // Last element is ZWJ
        },
        
        /* International Alphabet of Sanskrit Transliteration
         * --------------------------------------------------
         * The most "professional" Sanskrit romanization scheme.
         * 
         */
        iast: {
            vowels: 'a ā i ī u ū ṛ ṝ ḷ ḹ e ai o au'.split(' '),
            other_marks: 'ṃ ḥ ~'.split(' '),
            virama: '',
            consonants: 'k kh g gh ṅ c ch j jh ñ ṭ ṭh ḍ ḍh ṇ t th d dh n p ph b bh m y r l v ś ṣ s h ḻ kṣ jñ'.split(' '),
            other: "0 1 2 3 4 5 6 7 8 9 oṃ ' । ॥ ".split(' ')
        },
        /* Harvard-Kyoto
         * -------------
         * 
         */
        hk: {
            vowels: 'a A i I u U R RR lR lRR e ai o au'.split(' '),
            other_marks: 'M H ~'.split(' '),
            virama: '',
            consonants: 'k kh g gh G c ch j jh J T Th D Dh N t th d dh n p ph b bh m y r l v z S s h L kS jJ'.split(' '),
            other: "0 1 2 3 4 5 6 7 8 9 oM ' . .. ".split(' ')
        },
        /* National Library at Kolkata
         * ---------------------------
         * Apart from using "ē" and "ō" instead of "e" and "o", this scheme is
         * identical to IAST.
         */
        kolkata: {
            vowels: 'a ā i ī u ū ṛ ṝ ḷ ḹ ē ai ō au'.split(' '),
            other_marks: 'ṃ ḥ ~'.split(' '),
            virama: '',
            consonants: 'k kh g gh ṅ c ch j jh ñ ṭ ṭh ḍ ḍh ṇ t th d dh n p ph b bh m y r l v ś ṣ s h ḻ kṣ jñ'.split(' '),
            other: "0 1 2 3 4 5 6 7 8 9 oṃ ' । ॥ ".split(' ')
        },
        /* Sanskrit Library Phonetic Basic encoding
         * ----------------------------------------
         * With one ASCII letter per phoneme, this is the tersest transliteration
         * scheme in use today and is especially suited to computer processing.
         */
        slp1: {
            vowels: 'a A i I u U f F x X e E o O'.split(' '),
            other_marks: 'M H ~'.split(' '),
            virama: '',
            consonants: 'k K g G N c C j J Y w W q Q R t T d D n p P b B m y r l v S z s h L kz jY'.split(' '),
            other: "0 1 2 3 4 5 6 7 8 9 oM ' . .. ".split(' ')
        },
        /* Velthuis
         * -------------
         * 
         */
        velthuis: {
            vowels: 'a aa i ii u uu .r .rr .li .ll e ai o au'.split(' '),
            other_marks: '.m .h '.split(' '), // TODO
            virama: '',
            consonants: 'k kh g gh "n c ch j jh ~n .t .th .d .d .n t th d dh n p ph b bh m y r l v ~s .s s h L k.s j~n'.split(' '),
            other: "0 1 2 3 4 5 6 7 8 9 o.m ' | || ".split(' '),
        },
    };
    
    var romanSchemes = ['iast', 'hk', 'kolkata', 'slp1', 'velthuis'];
    
    // Add a "marks" field for each roman scheme
    for (var i = 0, name; name = romanSchemes[i]; i++) {
        var scheme = Sanscript.schemes[name];
        scheme.marks = scheme.vowels.slice(1);
    }
    
    /**
     * Check whether the given scheme encodes romanized Sanskrit.
     * O(n) is fast enough.
     *
     * @param name  the scheme name
     */
    Sanscript.isRomanScheme = function(name) {
        for (var i = 0, x; x = romanSchemes[i]; i++) {
            if (name === x) {
                return true;
            }
        }
        return false;
    };
  
    /**
     * Create a map from every character in `from` to its partner in `to`.
     * Also, store any "marks" that `from` might have.
     * 
     * @param from     input scheme
     * @param to       output scheme
     * @param options  scheme options
     */
    var makeMap = function(from, to, options) {
        var marks = {},
            other = {},
            fromScheme = Sanscript.schemes[from],
            toScheme = Sanscript.schemes[to];
        for (var group in fromScheme) {
            var fromGroup = fromScheme[group],
                toGroup = toScheme[group];
            for (var i in fromGroup) {
                if (group === 'marks') {
                    marks[fromGroup[i]] = toGroup[i];
                } else {
                    other[fromGroup[i]] = toGroup[i];
                }
            }
        }
        return {marks: marks, other: other};
    };
  
    var transliterateRoman = function(data, map, options) {
    
    };
    
    var transliterateBrahmi = function(data, map, options) {
        
    };
    
    Sanscript.t = function(data, from, to, options) {
        var transMap = makeMap(from, to, options);
        
        if (Sanscript.isRomanScheme(from)) {
            return transliterateRoman(data, transMap, options);
        } else {
            return transliterateBrahmi(data, transMap, options);
        }
    };
};
