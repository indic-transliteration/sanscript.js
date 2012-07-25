var data = {
    bengali: {
        vowels: 'অ আ ই ঈ উ ঊ ঋ ৠ ঌ ৡ এ ঐ ও ঔ',
        marks: 'ক খা গি ঘী ঙু চূ ছৃ জৄ ঝৢ ঞৣ টে ঠৈ ডো ঢৌ ণং তঃ থ্',
        consonants: 'ক খ গ ঘ ঙ চ ছ জ ঝ ঞ ট ঠ ড ঢ ণ ত থ দ ধ ন প ফ ব ভ ম',
        other: 'য র ল ব শ ষ স হ ळ',
        symbols: 'ॐ । ॥ ০ ১ ২ ৩ ৪ ৫ ৬ ৭ ৮ ৯',
        putra: 'পুত্র',
        naraIti: 'নর ইতি',
        sentence: 'ধর্মক্ষেত্রে কুরুক্ষেত্রে সমবেতা যুযুত্সবঃ ।',
    },
    devanagari: {
        vowels: 'अ आ इ ई उ ऊ ऋ ॠ ऌ ॡ ए ऐ ओ औ',
        marks: 'क खा गि घी ङु चू छृ जॄ झॢ ञॣ टे ठै डो ढौ णं तः थ्',
        consonants: 'क ख ग घ ङ च छ ज झ ञ ट ठ ड ढ ण त थ द ध न प फ ब भ म',
        other: 'य र ल व श ष स ह ळ',
        symbols: 'ॐ । ॥ ० १ २ ३ ४ ५ ६ ७ ८ ९',
        putra: 'पुत्र',
        naraIti: 'नर इति',
        sentence: 'धर्मक्षेत्रे कुरुक्षेत्रे समवेता युयुत्सवः ।',
    },
    hk: {
        vowels: 'a A i I u U R RR lR lRR e ai o au',
        marks: 'ka khA gi ghI Gu cU chR jRR jhlR JlRR Te Thai Do Dhau NaM taH th',
        consonants: 'ka kha ga gha Ga ca cha ja jha Ja Ta Tha Da Dha Na ta tha da dha na pa pha ba bha ma',
        other: 'ya ra la va za Sa sa ha La',
        symbols: 'OM | || 0 1 2 3 4 5 6 7 8 9',
        putra: 'putra',
        naraIti: 'nara iti',
        sentence: 'dharmakSetre kurukSetre samavetA yuyutsavaH |',
    },
    iast: {
        vowels: 'a ā i ī u ū ṛ ṝ ḷ ḹ e ai o au',
        marks: 'ka khā gi ghī ṅu cū chṛ jṝ jhḷ ñḹ ṭe ṭhai ḍo ḍhau ṇaṃ taḥ th',
        consonants: 'ka kha ga gha ṅa ca cha ja jha ña ṭa ṭha ḍa ḍha ṇa ta tha da dha na pa pha ba bha ma',
        other: 'ya ra la va śa ṣa sa ha ḻa',
        symbols: 'oṃ । ॥ 0 1 2 3 4 5 6 7 8 9',
        putra: 'putra',
        naraIti: 'nara iti',
        sentence: 'dharmakṣetre kurukṣetre samavetā yuyutsavaḥ ।',
    },
    kannada: {
        vowels: 'ಅ ಆ ಇ ಈ ಉ ಊ ಋ ೠ ಏ ಐ ಓ ಔ',
        marks: 'ಕ ಖಾ ಗಿ ಘೀ ಙು ಚೂ ಛೃ ಜೄ ಟೇ ಠೈ ಡೋ ಢೌ ಣಂ ತಃ ಥ್',
        consonants: 'ಕ ಖ ಗ ಘ ಙ ಚ ಛ ಜ ಝ ಞ ಟ ಠ ಡ ಢ ಣ ತ ಥ ದ ಧ ನ ಪ ಫ ಬ ಭ ಮ',
        other: 'ಯ ರ ಲ ವ ಶ ಷ ಸ ಹ ಳ',
        symbols: 'ಓಂ । ॥ ೦ ೧ ೨ ೩ ೪ ೫ ೬ ೭ ೮ ೯',
        putra: 'ಪುತ್ರ',
        naraIti: 'ನರ ಇತಿ',
        sentence: 'ಧರ್ಮಕ್ಷೇತ್ರೇ ಕುರುಕ್ಷೇತ್ರೇ ಸಮವೇತಾ ಯುಯುತ್ಸವಃ ।',
    },
    malayalam: {
        vowels: 'അ ആ ഇ ഈ ഉ ഊ ഋ ൠ ഌ ൡ ഏ ഐ ഓ ഔ',
        marks: 'ക ഖാ ഗി ഘീ ങു ചൂ ഛൃ ജൄ ഝൢ ഞൣ ടേ ഠൈ ഡോ ഢൌ ണം തഃ ഥ്',
        consonants: 'ക ഖ ഗ ഘ ങ ച ഛ ജ ഝ ഞ ട ഠ ഡ ഢ ണ ത ഥ ദ ധ ന പ ഫ ബ ഭ മ',
        other: 'യ ര ല വ ശ ഷ സ ഹ ള',
        symbols: 'ഓം । ॥ ൦ ൧ ൨ ൩ ൪ ൫ ൬ ൭ ൮ ൯',
        putra: 'പുത്ര',
        naraIti: 'നര ഇതി',
        sentence: 'ധര്മക്ഷേത്രേ കുരുക്ഷേത്രേ സമവേതാ യുയുത്സവഃ ।'
    },
    telugu: {
        vowels: 'అ ఆ ఇ ఈ ఉ ఊ ఋ ౠ ఌ ౡ ఏ ఐ ఓ ఔ',
        marks: 'క ఖా గి ఘీ ఙు చూ ఛృ జౄ ఝౢ ఞౣ టే ఠై డో ఢౌ ణం తః థ్',
        consonants: 'క ఖ గ ఘ ఙ చ ఛ జ ఝ ఞ ట ఠ డ ఢ ణ త థ ద ధ న ప ఫ బ భ మ',
        other: 'య ర ల వ శ ష స హ ళ',
        symbols: 'ఓం । ॥ ౦ ౧ ౨ ౩ ౪ ౫ ౬ ౭ ౮ ౯',
        putra: 'పుత్ర',
        naraIti: 'నర ఇతి',
        sentence: 'ధర్మక్షేత్రే కురుక్షేత్రే సమవేతా యుయుత్సవః ।'
    },
};

/**
 * For a script pair (f, t), return a function that takes two strings s1 and
 * s2 and asserts that s1, when transliterated from f to t, equals s2. The
 * returned function takes an optional 'description' parameter for QUnit.
 *
 * @param fromScript  the source script
 * @param toScript    the destination script
 * @return            the function described above.
 */
var transHelper = function(fromScript, toScript) {
    return function(from, to, description) {
        equal(Sanscript.t(from, fromScript, toScript), to, description);
    }
}

/* Scheme basics
 * -------------
 * Test that all schemes have the same number of elements for each category,
 * e.g. "vowels" and "consonants".
 */
test('Scheme definitions', function() {
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
test('Roman scheme membership', function() {
    var roman = ['iast', 'itrans', 'hk', 'kolkata', 'slp1', 'velthuis'],
        other = ['devanagari'];
    
    for (var i in roman) {
        ok(Sanscript.isRomanScheme(roman[i]), roman[i]);
    }
    for (var i in other) {
        ok(!Sanscript.isRomanScheme(other[i]), other[i]);
    }
});

/* Standard transliteration tests
 * ------------------------------
 * This group of tests examines every common Sanskrit symbol and ensuret that
 * it is transliterated as expected.
 */
function standardTests(from, to, f) {
    // Letters
    f(from.vowels, to.vowels, 'Vowels');
    f(from.marks, to.marks, 'Marks');
    f(from.consonants, to.consonants, 'Stops and nasals');
    f(from.other, to.other, 'Other consonants');
    f(from.symbols, to.symbols, 'Symbols and punctuation');
    
    // Words and sentences
    f(from.putra, to.putra, 'Single word');
    f(from.naraIti, to.naraIti, 'Two words, one with explicit vowel');
    f(from.sentence, to.sentence, 'Basic sentence');
}

test('Transliteration (Devanagari to Harvard-Kyoto)', function() {
    var from = data.devanagari,
        to = data.hk,
        f = transHelper('devanagari', 'hk');
    standardTests(from, to, f);
    
    f('', '', 'Simple sentence');
    
    // Other
    f('wwॠww', 'wwRRww', 'Vowel among other letters');
    f('wwकww', 'wwkaww', 'Consonant among other letters');
});

test('Transliteration (Devanagari to Bengali)', function() {
    var f = transHelper('devanagari', 'bengali');
    standardTests(data.devanagari, data.bengali, f);
});

test('Transliteration (Devanagari to Kannada)', function() {
    // Letters
    var dev = data.devanagari, kan = data.kannada,
        dev2kan = transHelper('devanagari', 'kannada');
    dev2kan('अ आ इ ई उ ऊ ऋ ॠ ए ऐ ओ औ', kan.vowels, 'Vowels'); // no ऌ or ॡ
    dev2kan('क खा गि घी ङु चू छृ जॄ टे ठै डो ढौ णं तः थ्', kan.marks, 'Marks'); // no ऌ or ॡ
    dev2kan(dev.consonants, kan.consonants, 'Stops and nasals');
    dev2kan(dev.other, kan.other, 'Other consonants');
    dev2kan(dev.symbols, kan.symbols, 'Symbols and punctuation');
    
    // Words and sentences
    dev2kan(dev.putra, kan.putra, 'Single word');
    dev2kan(dev.naraIti, kan.naraIti, 'Two words, one with explicit vowel');
});

test('Transliteration (Devanagari to Malayalam)', function() {
    var f = transHelper('devanagari', 'malayalam');
    standardTests(data.devanagari, data.malayalam, f);
});
test('Transliteration (Devanagari to Telugu)', function() {
    var f = transHelper('devanagari', 'telugu');
    standardTests(data.devanagari, data.telugu, f);
});

test('Transliteration (Harvard-Kyoto to Devanagari)', function() {
    var f = transHelper('hk', 'devanagari');
    standardTests(data.hk, data.devanagari, f);
});

test('Transliteration (Harvard-Kyoto to IAST)', function() {
    var f = transHelper('hk', 'iast');
    standardTests(data.hk, data.iast, f);
});

test('Disabling transliteration', function() {
    var f = transHelper('hk', 'devanagari');
    f('akSa##kSa##ra', 'अक्षkSaर', 'Basic disable');
    f('##akSa##kSa##ra', 'akSaक्षra', 'Initial disable');
    f('akSa##kSa##ra####', 'अक्षkSaर', 'Redundant disable');
});

test('ITRANS special features', function() {
    var f = transHelper('itrans', 'devanagari');
    f('bara_u', 'बरउ', 'Separated vowels');
    f('k_Shetra', 'क्‍षेत्र', 'Separated consonants');
});
