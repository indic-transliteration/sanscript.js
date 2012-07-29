var data = {
    bengali: {
        vowels: 'অ আ ই ঈ উ ঊ ঋ ৠ ঌ ৡ এ ঐ ও ঔ',
        marks: 'ক খা গি ঘী ঙু চূ ছৃ জৄ ঝৢ ঞৣ টে ঠৈ ডো ঢৌ ণং তঃ থ্',
        consonants: 'ক খ গ ঘ ঙ চ ছ জ ঝ ঞ ট ঠ ড ঢ ণ ত থ দ ধ ন প ফ ব ভ ম',
        other: 'য র ল ব শ ষ স হ ळ',
        symbols: 'ॐ । ॥ ০ ১ ২ ৩ ৪ ৫ ৬ ৭ ৮ ৯',
        putra: 'পুত্র',
        naraIti: 'নর ইতি',
        sentence: 'ধর্মক্ষেত্রে কুরুক্ষেত্রে সমবেতা যুযুত্সবঃ ।'
    },
    devanagari: {
        vowels: 'अ आ इ ई उ ऊ ऋ ॠ ऌ ॡ ए ऐ ओ औ',
        marks: 'क खा गि घी ङु चू छृ जॄ झॢ ञॣ टे ठै डो ढौ णं तः थ्',
        consonants: 'क ख ग घ ङ च छ ज झ ञ ट ठ ड ढ ण त थ द ध न प फ ब भ म',
        other: 'य र ल व श ष स ह ळ',
        symbols: 'ॐ । ॥ ० १ २ ३ ४ ५ ६ ७ ८ ९',
        putra: 'पुत्र',
        naraIti: 'नर इति',
        sentence: 'धर्मक्षेत्रे कुरुक्षेत्रे समवेता युयुत्सवः ।'
    },
    gujarati: {
        vowels: 'અ આ ઇ ઈ ઉ ઊ ઋ ૠ ઌ ૡ એ ઐ ઓ ઔ',
        marks: 'ક ખા ગિ ઘી ઙુ ચૂ છૃ જૄ ઝૢ ઞૣ ટે ઠૈ ડો ઢૌ ણં તઃ થ્',
        consonants: 'ક ખ ગ ઘ ઙ ચ છ જ ઝ ઞ ટ ઠ ડ ઢ ણ ત થ દ ધ ન પ ફ બ ભ મ',
        other: 'ય ર લ વ શ ષ સ હ ળ',
        symbols: 'ૐ ૤ ૥ ૦ ૧ ૨ ૩ ૪ ૫ ૬ ૭ ૮ ૯',
        putra: 'પુત્ર',
        naraIti: 'નર ઇતિ',
        sentence: 'ધર્મક્ષેત્રે કુરુક્ષેત્રે સમવેતા યુયુત્સવઃ ૤'
    },
    gurmukhi: {
        vowels: 'ਅ ਆ ਇ ਈ ਉ ਊ ਏ ਐ ਓ ਔ',
        marks: 'ਕ ਖਾ ਗਿ ਘੀ ਙੁ ਚੂ ਟੇ ਠੈ ਡੋ ਢੌ ਣਂ ਤਃ ਥ੍',
        consonants: 'ਕ ਖ ਗ ਘ ਙ ਚ ਛ ਜ ਝ ਞ ਟ ਠ ਡ ਢ ਣ ਤ ਥ ਦ ਧ ਨ ਪ ਫ ਬ ਭ ਮ',
        other: 'ਯ ਰ ਲ ਵ ਸ਼ ਸ਼ ਸ ਹ ਲ਼',
        symbols: 'ॐ । ॥ ੦ ੧ ੨ ੩ ੪ ੫ ੬ ੭ ੮ ੯',
        putra: 'ਪੁਤ੍ਰ',
        naraIti: 'ਨਰ ਇਤਿ',
        sentence: 'ਧਰ੍ਮਕ੍ਸ਼ੇਤ੍ਰੇ ਕੁਰੁਕ੍ਸ਼ੇਤ੍ਰੇ ਸਮਵੇਤਾ ਯੁਯੁਤ੍ਸਵਃ ।'
    },
    hk: {
        vowels: 'a A i I u U R RR lR lRR e ai o au',
        marks: 'ka khA gi ghI Gu cU chR jRR jhlR JlRR Te Thai Do Dhau NaM taH th',
        consonants: 'ka kha ga gha Ga ca cha ja jha Ja Ta Tha Da Dha Na ta tha da dha na pa pha ba bha ma',
        other: 'ya ra la va za Sa sa ha La',
        symbols: 'OM | || 0 1 2 3 4 5 6 7 8 9',
        putra: 'putra',
        naraIti: 'nara iti',
        sentence: 'dharmakSetre kurukSetre samavetA yuyutsavaH |'
    },
    iast: {
        vowels: 'a ā i ī u ū ṛ ṝ ḷ ḹ e ai o au',
        marks: 'ka khā gi ghī ṅu cū chṛ jṝ jhḷ ñḹ ṭe ṭhai ḍo ḍhau ṇaṃ taḥ th',
        consonants: 'ka kha ga gha ṅa ca cha ja jha ña ṭa ṭha ḍa ḍha ṇa ta tha da dha na pa pha ba bha ma',
        other: 'ya ra la va śa ṣa sa ha ḻa',
        symbols: 'oṃ । ॥ 0 1 2 3 4 5 6 7 8 9',
        putra: 'putra',
        naraIti: 'nara iti',
        sentence: 'dharmakṣetre kurukṣetre samavetā yuyutsavaḥ ।'
    },
    kannada: {
        vowels: 'ಅ ಆ ಇ ಈ ಉ ಊ ಋ ೠ ಏ ಐ ಓ ಔ',
        marks: 'ಕ ಖಾ ಗಿ ಘೀ ಙು ಚೂ ಛೃ ಜೄ ಟೇ ಠೈ ಡೋ ಢೌ ಣಂ ತಃ ಥ್',
        consonants: 'ಕ ಖ ಗ ಘ ಙ ಚ ಛ ಜ ಝ ಞ ಟ ಠ ಡ ಢ ಣ ತ ಥ ದ ಧ ನ ಪ ಫ ಬ ಭ ಮ',
        other: 'ಯ ರ ಲ ವ ಶ ಷ ಸ ಹ ಳ',
        symbols: 'ಓಂ । ॥ ೦ ೧ ೨ ೩ ೪ ೫ ೬ ೭ ೮ ೯',
        putra: 'ಪುತ್ರ',
        naraIti: 'ನರ ಇತಿ',
        sentence: 'ಧರ್ಮಕ್ಷೇತ್ರೇ ಕುರುಕ್ಷೇತ್ರೇ ಸಮವೇತಾ ಯುಯುತ್ಸವಃ ।'
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
    oriya: {
        vowels: 'ଅ ଆ ଇ ଈ ଉ ଊ ଋ ୠ ଌ ୡ ଏ ଐ ଓ ଔ',
        marks: 'କ ଖା ଗି ଘୀ ଙୁ ଚୂ ଛୃ ଜୄ ଟେ ଠୈ ଡୋ ଢୌ ଣଂ ତଃ ଥ୍',
        consonants: 'କ ଖ ଗ ଘ ଙ ଚ ଛ ଜ ଝ ଞ ଟ ଠ ଡ ଢ ଣ ତ ଥ ଦ ଧ ନ ପ ଫ ବ ଭ ମ',
        other: 'ଯ ର ଲ ଵ ଶ ଷ ସ ହ ଳ',
        symbols: 'ଓଂ । ॥ ୦ ୧ ୨ ୩ ୪ ୫ ୬ ୭ ୮ ୯',
        putra: 'ପୁତ୍ର',
        naraIti: 'ନର ଇତି',
        sentence: 'ଧର୍ମକ୍ଷେତ୍ରେ କୁରୁକ୍ଷେତ୍ରେ ସମଵେତା ଯୁଯୁତ୍ସଵଃ ।'
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
    }
};

// -----------------------------------------------------------------------

module('Setup');

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
        lengths = {};
    for (var key in devanagari) {
        lengths[key] = devanagari[key].length;
    }
    
    for (var name in schemes) {
        for (var key in schemes[name]) {
            // The virama is distinct from other categories.
            if (key !== 'virama') {
                equal(schemes[name][key].length, lengths[key], name + "." + key);
            }
        }
    }
});

/* Roman schemes
 * -------------
 * Test that Sanscript.isRomanScheme returns true for all roman schemes.
 */
test('Roman scheme membership', function() {
    var roman = ['iast', 'itrans', 'hk', 'kolkata', 'slp1', 'velthuis'],
        other = ['bengali', 'devanagari', 'gujarati', 'gurmukhi', 'kannada',
                 'malayalam', 'oriya', 'tamil', 'telugu'];

    for (var i in roman) {
        ok(Sanscript.isRomanScheme(roman[i]), roman[i]);
    }
    for (var i in other) {
        ok(!Sanscript.isRomanScheme(other[i]), other[i]);
    }
});


test('Adding schemes', function() {
    var sanskritOCR = {
        vowels: ["a", "å", "i", "ï", "u", "÷", "Ÿ", "", "", "", "e", "ai", "o", "au"],
        consonants: ["k", "kh", "g", "gh", "¼", 
			"c", "ch", "j", "jh", "ñ", 
			"¶", "¶h", "·", "·h", "½", 
			"t", "th", "d", "dh", "n", 
			"p", "ph", "b", "bh", "m", 
			"y", "r", "l", "v", 
			"¸", "¹", "s", "h", 
			"", "k¹", "jñ"]
    };
    Sanscript.addRomanScheme('sanskritOCR', sanskritOCR);
    var f = transHelper('sanskritOCR', 'devanagari');
    f('bhïma', 'भीम');
    f('narå½åm', 'नराणाम्');
});

// -----------------------------------------------------------------------

module('Transliteration');

/**
 * For a script pair (f, t), return a function that takes two strings s1 and
 * s2 and asserts that s1, when transliterated from f to t, equals s2. The
 * returned function takes an optional 'description' parameter for QUnit.
 *
 * @param from     the source script
 * @param to       the destination script
 * @param options  transliteration options
 * @return         the function described above.
 */
var transHelper = function(from, to, options) {
    return function(input, output, description) {
        equal(Sanscript.t(input, from, to, options), output, description);
    };
};

/* Letter transliteration tests
 * ----------------------------
 * Basic checks on letters and symbols.
 *
 * @param from  the source data
 * @param to    the destination data
 * @param f     the function to use
 */
function letterTests(from, to, f) {
    f(from.vowels, to.vowels, 'Vowels');
    f(from.marks, to.marks, 'Marks');
    f(from.consonants, to.consonants, 'Stops and nasals');
    f(from.other, to.other, 'Other consonants');
    f(from.symbols, to.symbols, 'Symbols and punctuation');
}

/* Text transliteration tests
 * --------------------------
 * Basic checks on words and sentences.
 *
 * @param from  the source data
 * @param to    the destination data
 * @param f     the function to use
 */
function textTests(from, to, f) {
    f(from.putra, to.putra, 'Single word');
    f(from.naraIti, to.naraIti, 'Two words, one with explicit vowel');
    f(from.sentence, to.sentence, 'Basic sentence');
}

test('Devanagari to Bengali', function() {
    var from = data.devanagari, to = data.bengali,
        f = transHelper('devanagari', 'bengali');
    letterTests(from, to, f);
    textTests(from, to, f);
    f('व', 'ব', 'व transliteration');
    f('ब', 'ব', 'ब transliteration');
});

test('Devanagari to Harvard-Kyoto', function() {
    var from = data.devanagari,
        to = data.hk,
        f = transHelper('devanagari', 'hk');
    letterTests(from, to, f);
    textTests(from, to, f);
    
    // Other
    f('wwॠww', 'wwRRww', 'Vowel among other letters');
    f('wwकww', 'wwkaww', 'Consonant among other letters');
});

test('Devanagari to Gujarati', function() {
    var from = data.devanagari, to = data.gujarati,
        f = transHelper('devanagari', 'gujarati');
    letterTests(from, to, f);
    textTests(from, to, f);
});

test('Devanagari to Gurmukhi', function() {
    var from = data.devanagari, to = data.gurmukhi,
        f = transHelper('devanagari', 'gurmukhi');
    f('अ आ इ ई उ ऊ ए ऐ ओ औ', to.vowels, 'Vowels'); // no ऋ/ॠ/ऌ/ॡ
    f('क खा गि घी ङु चू टे ठै डो ढौ णं तः थ्', to.marks, 'Marks'); // no ऋ/ॠ/ऌ/ॡ
    f(from.consonants, to.consonants, 'Stops and nasals');
    f(from.other, to.other, 'Other consonants');
    f(from.symbols, to.symbols, 'Symbols and punctuation');
    textTests(from, to, f);
});

test('Devanagari to Kannada', function() {
    // Letters
    var from = data.devanagari, to = data.kannada,
        f = transHelper('devanagari', 'kannada');
    f('अ आ इ ई उ ऊ ऋ ॠ ए ऐ ओ औ', to.vowels, 'Vowels'); // no ऌ or ॡ
    f('क खा गि घी ङु चू छृ जॄ टे ठै डो ढौ णं तः थ्', to.marks, 'Marks'); // no ऌ or ॡ
    f(from.consonants, to.consonants, 'Stops and nasals');
    f(from.other, to.other, 'Other consonants');
    f(from.symbols, to.symbols, 'Symbols and punctuation');
    textTests(from, to, f);
});

test('Devanagari to Malayalam', function() {
    var from = data.devanagari, to = data.malayalam,
        f = transHelper('devanagari', 'malayalam');
    letterTests(from, to, f);
    textTests(from, to, f);
});

test('Devanagari to Oriya', function() {
    var from = data.devanagari, to = data.oriya,
        f = transHelper('devanagari', 'oriya');
    f(from.vowels, to.vowels, 'Vowels');
    f('क खा गि घी ङु चू छृ जॄ टे ठै डो ढौ णं तः थ्', to.marks, 'Marks'); // no ऌ or ॡ
    f(from.consonants, to.consonants, 'Stops and nasals');
    f(from.other, to.other, 'Other consonants');
    f(from.symbols, to.symbols, 'Symbols and punctuation');
    textTests(from, to, f);
    textTests(from, to, f);
});

test('Devanagari to Telugu', function() {
    var from = data.devanagari, to = data.telugu,
        f = transHelper('devanagari', 'telugu');
    letterTests(from, to, f);
    textTests(from, to, f);
});

test('Harvard-Kyoto to Devanagari', function() {
    var from = data.hk, to = data.devanagari,
        f = transHelper('hk', 'devanagari');
    letterTests(from, to, f);
    textTests(from, to, f);
    f('naraxiti', 'नरxइति', 'Undefined letters');
});

test('Harvard-Kyoto to IAST', function() {
    var from = data.hk, to = data.iast,
        f = transHelper('hk', 'iast');
    letterTests(from, to, f);
    textTests(from, to, f);
    f('tAmxiti', 'tāmxiti', 'Undefined letters');
});

test('Undefined letters', function() {
    var f = transHelper('devanagari', 'gurmukhi');
    f('ऋच्छति', 'ऋਚ੍ਛਤਿ');
});

// -----------------------------------------------------------------------

module('Toggle');

test('Harvard-Kyoto', function() {
    var f = transHelper('hk', 'devanagari');
    f('akSa##kSa##ra', 'अक्षkSaर', 'Basic disable');
    f('##akSa##kSa##ra', 'akSaक्षra', 'Initial disable');
    f('akSa##ra##', 'अक्षra', 'Final disable 1');
    f('akSa##ra', 'अक्षra', 'Final disable 2');
    f('akSa##kSa##ra####', 'अक्षkSaर', 'Redundant disable 1');
    f('a####kSara', 'अक्षर', 'Redundant disable 2');
    f('akSa#ra', 'अक्ष#र', 'Misleading disable');
});

test('Devanagari', function() {
    var f = transHelper('devanagari', 'hk');
    f('अ##क्ष##र', 'aक्षra', 'Basic disable');
    f('##अ##क्षर', 'अkSara', 'Initial disable');
    f('अक्ष##र##', 'akSaर', 'Final disable 1');
    f('अक्ष##र', 'akSaर', 'Final disable 2');
    f('अक्ष##र####', 'akSaर', 'Redundant disable 1');
    f('अ####क्षर', 'akSara', 'Redundant disable 2');
    f('अक्ष#र', 'akSa#ra', 'Misleading disable');
});

// -----------------------------------------------------------------------

module('Options');

test('Hindi-style transliteration', function() {
    var f = transHelper('itrans', 'devanagari', {'virama': false});
    f('karaN', 'करण');
    f('rAj ke lie', 'राज के लिए');
});

test('Skipping SGML', function() {
    var f1 = transHelper('hk', 'devanagari', {'sgml': true});
    var f2 = transHelper('hk', 'devanagari', {'sgml': false});
    f1('<p>nara iti</p>', '<प्>नर इति</प्>');
    f2('<p>nara iti</p>', '<p>नर इति</p>');
});

// -----------------------------------------------------------------------

module('ITRANS');

test('Zero-width joiner', function() {
    var f = transHelper('itrans', 'devanagari');
    f('bara_u', 'बरउ', 'Separated vowels');
    f('k{}Shetra', 'क्‍षेत्र', 'Separated consonants');
});

test('Alternates', function() {
    var f = function(itrans1, itrans2, description) {
        dev1 = Sanscript.t(itrans1, 'itrans', 'devanagari'),
            dev2 = Sanscript.t(itrans2, 'itrans', 'devanagari');
        equal(dev2, dev1, description);
    };
    
    f('A I U RRi RRI LLi LLI', 'aa ii uu R^i R^I L^i L^I');
    f('kA kI kU kRRi kRRI kLLi kLLI', 'kaa kii kuu kR^i kR^I kL^i kL^I');
    f('I U', 'ee oo');
    f('kI kU', 'kee koo');
    f('aM aM', 'a.m a.n');
    f('~Na', 'N^a');
    f('ca', 'cha');
    f('Cha Cha', 'Ca chha');
    f('va', 'wa');
    f('Sha Sha', 'Sa shha');
    f('kSha kSha kSha', 'kSa kshha xa');
    f('j~na j~na', 'GYa dnya');
    f('OM', 'AUM');
    f(".a | ||", '~ . ..');
    f('za', 'Ja');
    f('a{\\m+}', 'a.h.N');
});

test('Backslash escape', function() {
    var f = transHelper('itrans', 'devanagari');
    f('\\nara', 'nअर');
    f('na\\ra', 'नrअ');
    f('nara\\', 'नर');
});

test('Accent', function() {
    var f = transHelper('itrans', 'devanagari');
    f("a\\_gnimI\\'le pu\\_rohi\\'tam", 'अ॒ग्निमी॑ले पु॒रोहि॑तम्');
});

test('Non-Sanskrit letters', function() {
    var ben = transHelper('itrans', 'bengali'),
        dev = transHelper('itrans', 'devanagari'),
        kan = transHelper('itrans', 'kannada'),
        guj = transHelper('itrans', 'gujarati'),
        gur = transHelper('itrans', 'gurmukhi'),
        mal = transHelper('itrans', 'malayalam'),
        ori = transHelper('itrans', 'oriya'),
        tam = transHelper('itrans', 'tamil'),
        tel = transHelper('itrans', 'telugu');
    ben('.De .Dhe Ye', 'ডে ঢে যে');
    dev('qa KA Gi zI .Du .DU fRRi YRRI RLLi', 'क़ ख़ा ग़ि ज़ी ड़ु ड़ू फ़ृ य़ॄ ऱॢ');
    dev('ka.cna', 'कॅन');
    kan('fI RI', 'ಫೀ ಱೀ');
    guj('ka.cna', 'કૅન');
    gur('Ko Go zo Jo .Do fo', 'ਖੋ ਗੋ ਜੋ ਜੋ ਡੋ ਫੋ');
    mal('RI', 'റീ');
    ori('.DU .DhU YU', 'ଡୂ ଢୂ ଯୂ');
    tam('RI', 'றீ');
    tel('qA KA RA', 'కా ఖా ఱా');
});
