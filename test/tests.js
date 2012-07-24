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
    var dev2hk = function(from, to, description) {
        equal(Sanscript.t(from, 'devanagari', 'hk'), to, description);
    };

    // Letters
    dev2hk('अ आ इ ई उ ऊ ऋ ॠ ऌ ॡ ए ऐ ओ औ',
        'a A i I u U R RR lR lRR e ai o au', 'Vowels');
    dev2hk('क खा गि घी ङु चू छृ जॄ झॢ ञॣ टे ठै डो ढौ णं तः थ्',
        'ka khA gi ghI Gu cU chR jRR jhlR JlRR Te Thai Do Dhau NaM taH th', 'Marks');
    dev2hk('क ख ग घ ङ च छ ज झ ञ ट ठ ड ढ ण त थ द ध न प फ ब भ म',
        'ka kha ga gha Ga ca cha ja jha Ja Ta Tha Da Dha Na ta tha da dha na pa pha ba bha ma', 'Stops and nasals');
    dev2hk('य र ल व श ष स ह ळ',
        'ya ra la va za Sa sa ha La', 'Other consonants');
    dev2hk('ॐ । ॥ ० १ २ ३ ४ ५ ६ ७ ८ ९', 'OM | || 0 1 2 3 4 5 6 7 8 9',
        'Symbols and punctuation');
    
    // Words and sentences
    dev2hk('पुत्र', 'putra', 'Single word');
    dev2hk('नर इति', 'nara iti', 'Two words, one with explicit vowel');
    dev2hk('धर्मक्षेत्रे कुरुक्षेत्रे समवेता युयुत्सवः ।',
        'dharmakSetre kurukSetre samavetA yuyutsavaH |', 'Simple sentence');
    
    // Other
    dev2hk('wwॠww', 'wwRRww', 'Vowel among other letters');
    dev2hk('wwकww', 'wwkaww', 'Consonant among other letters');
});

test("Transliteration (Devanagari to Kannada)", function() {
    var dev2kan = function(from, to, description) { 
        equal(Sanscript.t(from, 'devanagari', 'kannada'), to, description);
    };
    
    // Letters
    dev2kan('अ आ इ ई उ ऊ ऋ ॠ ए ऐ ओ औ', 'ಅ ಆ ಇ ಈ ಉ ಊ ಋ ೠ ಏ ಐ ಓ ಔ', 'Vowels');
    dev2kan('क खा गि घी ङु चू छृ जॄ टे ठै डो ढौ णं तः थ्',
        'ಕ ಖಾ ಗಿ ಘೀ ಙು ಚೂ ಛೃ ಜೄ ಟೇ ಠೈ ಡೋ ಢೌ ಣಂ ತಃ ಥ್', 'Marks');
    dev2kan('क ख ग घ ङ च छ ज झ ञ ट ठ ड ढ ण त थ द ध न प फ ब भ म',
        'ಕ ಖ ಗ ಘ ಙ ಚ ಛ ಜ ಝ ಞ ಟ ಠ ಡ ಢ ಣ ತ ಥ ದ ಧ ನ ಪ ಫ ಬ ಭ ಮ', 'Stops and nasals');
    dev2kan('य र ल व श ष स ह ळ', 'ಯ ರ ಲ ವ ಶ ಷ ಸ ಹ ಳ', 'Other consonants');
    dev2kan('ॐ । ॥ ० १ २ ३ ४ ५ ६ ७ ८ ९', 'ಓಂ । ॥ ೦ ೧ ೨ ೩ ೪ ೫ ೬ ೭ ೮ ೯',
        'Symbols and punctuation');
    
    // Words and sentences
    dev2kan('पुत्र', 'ಪುತ್ರ', 'Single word');
    dev2kan('नर इति', 'ನರ ಇತಿ', 'Two words, one with explicit vowel');
});

test('Transliteration (Harvard-Kyoto to Devanagari)', function() {
    var hk2dev = function(from, to, description) {
        var result = Sanscript.t(from, 'hk', 'devanagari');
        equal(result, to, description);
    };
    
    hk2dev('a A i I u U R RR lR lRR e ai o au',
        'अ आ इ ई उ ऊ ऋ ॠ ऌ ॡ ए ऐ ओ औ', 'Vowels');
    hk2dev('ka khA gi ghI Gu cU chR jRR jhlR JlRR Te Thai Do Dhau NaM taH th',
        'क खा गि घी ङु चू छृ जॄ झॢ ञॣ टे ठै डो ढौ णं तः थ्', 'Marks');
    hk2dev('ka kha ga gha Ga ca cha ja jha Ja Ta Tha Da Dha Na ta tha da dha na pa pha ba bha ma', 
        'क ख ग घ ङ च छ ज झ ञ ट ठ ड ढ ण त थ द ध न प फ ब भ म', 'Stops and nasals');
    hk2dev('ya ra la va za Sa sa ha La', 
        'य र ल व श ष स ह ळ', 'Other consonants');
    hk2dev('OM | || 0 1 2 3 4 5 6 7 8 9',
        'ॐ । ॥ ० १ २ ३ ४ ५ ६ ७ ८ ९', 'Symbols and punctuation');
        
    // Words and sentences
    hk2dev('putra', 'पुत्र', 'Single word');
    hk2dev('nara iti', 'नर इति', 'Two words, one with explicit vowel');
    hk2dev('dharmakSetre kurukSetre samavetA yuyutsavaH |',
        'धर्मक्षेत्रे कुरुक्षेत्रे समवेता युयुत्सवः ।', 'Simple sentence');
});
