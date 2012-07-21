/* Scheme basics
 * -------------
 * Test that all schemes have the same number of elements for each category,
 * e.g. "vowels" and "consonants".
 */
test("scheme basics", function() {
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
