/* Scheme basics
 * -------------
 * Test that all schemes have the same number of elements for each category,
 * e.g. "vowels" and "consonants".
 */
test("Scheme definitions", function() {
    // Find the typical lengths of each category. We use Devanagari because it
    // contains every category, including "marks".
    var schemes = Sanscript.schemes,
        devanagari = schemes.devanagari,
        lengths = {}
    for (var key in devanagari) {
        lengths[key] = devanagari[key].length
    }
    
    for (var name in schemes) {
        for (var key in schemes[name]) {
            // The virama is distinct from other categories.
            if (key != 'virama') {
                equal(schemes[name][key].length, lengths[key], name + "." + key);
            }
        }
    }
});

/* Roman schemes
 * -------------
 * Test that Sanscript.isRomanScheme returns true for all Roman schemes.
 */
test("Roman scheme membership", function() {
    var roman = ['iast', 'hk', 'kolkata', 'slp1', 'velthuis'],
        other = ['devanagari'];
    
    for (var i in roman) {
        ok(Sanscript.isRomanScheme(roman[i]), roman[i]);
    }
    for (var i in other) {
        ok(!Sanscript.isRomanScheme(other[i]), other[i]);
    }
});

test("Transliteration (Devanagari to Harvard-Kyoto)", function() {
    dev2hk = function(from, to, description) {
        equal(Sanscript.t(from, 'devanagari', 'hk'), to, description);
    };

    // Basics
    dev2hk('अ', 'a', 'Single vowel');
    dev2hk('आ', 'A', 'Vowel with mark alternate');
    dev2hk('क', 'ka', 'Single consonant');
    dev2hk('क्', 'k', 'Single consonant with virama');
    dev2hk('पुत्र', 'putra', 'Single word');
    dev2hk('अब्रवीत् ।', 'abravIt .', 'Word and punctuation');
    dev2hk('नर इति', 'nara iti', 'Two words, one with explicit vowel');
    dev2hk('wwॠww', 'wwRRww', 'Vowel among other letters');
    dev2hk('wwकww', 'wwkaww', 'Consonant among other letters');
});

