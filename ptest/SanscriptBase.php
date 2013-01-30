<?php

abstract class SanscriptBase extends PHPUnit_Framework_TestCase {
    protected $sanscript;
    protected $data;

    protected function setUp() {
        include_once '../sanscript/sanscript.php';
        $this->sanscript = new Sanscript();

        $this->data = array(
            'bengali' => array(
                'vowels' => 'অ আ ই ঈ উ ঊ ঋ ৠ ঌ ৡ এ ঐ ও ঔ',
                'marks' => 'ক খা গি ঘী ঙু চূ ছৃ জৄ ঝৢ ঞৣ টে ঠৈ ডো ঢৌ ণং তঃ থ্',
                'consonants' => 'ক খ গ ঘ ঙ চ ছ জ ঝ ঞ ট ঠ ড ঢ ণ ত থ দ ধ ন প ফ ব ভ ম',
                'other' => 'য র ল ব শ ষ স হ ळ',
                'symbols' => 'ॐ । ॥ ০ ১ ২ ৩ ৪ ৫ ৬ ৭ ৮ ৯',
                'putra' => 'পুত্র',
                'naraIti' => 'নর ইতি',
                'sentence' => 'ধর্মক্ষেত্রে কুরুক্ষেত্রে সমবেতা যুযুত্সবঃ ।'
            ),
            'devanagari' => array(
                'vowels' => 'अ आ इ ई उ ऊ ऋ ॠ ऌ ॡ ए ऐ ओ औ',
                'short_vowels' => 'ऎ ए ऒ ओ',
                'marks' => 'क खा गि घी ङु चू छृ जॄ झॢ ञॣ टे ठै डो ढौ णं तः थ्',
                'short_marks' => 'कॆ के कॊ को',
                'consonants' => 'क ख ग घ ङ च छ ज झ ञ ट ठ ड ढ ण त थ द ध न प फ ब भ म',
                'other' => 'य र ल व श ष स ह ळ',
                'symbols' => 'ॐ । ॥ ० १ २ ३ ४ ५ ६ ७ ८ ९',
                'putra' => 'पुत्र',
                'naraIti' => 'नर इति',
                'sentence' => 'धर्मक्षेत्रे कुरुक्षेत्रे समवेता युयुत्सवः ।'
            ),
            'gujarati' => array(
                'vowels' => 'અ આ ઇ ઈ ઉ ઊ ઋ ૠ ઌ ૡ એ ઐ ઓ ઔ',
                'marks' => 'ક ખા ગિ ઘી ઙુ ચૂ છૃ જૄ ઝૢ ઞૣ ટે ઠૈ ડો ઢૌ ણં તઃ થ્',
                'consonants' => 'ક ખ ગ ઘ ઙ ચ છ જ ઝ ઞ ટ ઠ ડ ઢ ણ ત થ દ ધ ન પ ફ બ ભ મ',
                'other' => 'ય ર લ વ શ ષ સ હ ળ',
                'symbols' => 'ૐ ૤ ૥ ૦ ૧ ૨ ૩ ૪ ૫ ૬ ૭ ૮ ૯',
                'putra' => 'પુત્ર',
                'naraIti' => 'નર ઇતિ',
                'sentence' => 'ધર્મક્ષેત્રે કુરુક્ષેત્રે સમવેતા યુયુત્સવઃ ૤'
            ),
            'gurmukhi' => array(
                'vowels' => 'ਅ ਆ ਇ ਈ ਉ ਊ ਏ ਐ ਓ ਔ',
                'marks' => 'ਕ ਖਾ ਗਿ ਘੀ ਙੁ ਚੂ ਟੇ ਠੈ ਡੋ ਢੌ ਣਂ ਤਃ ਥ੍',
                'consonants' => 'ਕ ਖ ਗ ਘ ਙ ਚ ਛ ਜ ਝ ਞ ਟ ਠ ਡ ਢ ਣ ਤ ਥ ਦ ਧ ਨ ਪ ਫ ਬ ਭ ਮ',
                'other' => 'ਯ ਰ ਲ ਵ ਸ਼ ਸ਼ ਸ ਹ ਲ਼',
                'symbols' => 'ॐ । ॥ ੦ ੧ ੨ ੩ ੪ ੫ ੬ ੭ ੮ ੯',
                'putra' => 'ਪੁਤ੍ਰ',
                'naraIti' => 'ਨਰ ਇਤਿ',
                'sentence' => 'ਧਰ੍ਮਕ੍ਸ਼ੇਤ੍ਰੇ ਕੁਰੁਕ੍ਸ਼ੇਤ੍ਰੇ ਸਮਵੇਤਾ ਯੁਯੁਤ੍ਸਵਃ ।'
            ),
            'hk' => array(
                'vowels' => 'a A i I u U R RR lR lRR e ai o au',
                'marks' => 'ka khA gi ghI Gu cU chR jRR jhlR JlRR Te Thai Do Dhau NaM taH th',
                'consonants' => 'ka kha ga gha Ga ca cha ja jha Ja Ta Tha Da Dha Na ta tha da dha na pa pha ba bha ma',
                'other' => 'ya ra la va za Sa sa ha La',
                'symbols' => 'OM | || 0 1 2 3 4 5 6 7 8 9',
                'putra' => 'putra',
                'naraIti' => 'nara iti',
                'sentence' => 'dharmakSetre kurukSetre samavetA yuyutsavaH |'
            ),
            'iast' => array(
                'vowels' => 'a ā i ī u ū ṛ ṝ ḷ ḹ e ai o au',
                'marks' => 'ka khā gi ghī ṅu cū chṛ jṝ jhḷ ñḹ ṭe ṭhai ḍo ḍhau ṇaṃ taḥ th',
                'consonants' => 'ka kha ga gha ṅa ca cha ja jha ña ṭa ṭha ḍa ḍha ṇa ta tha da dha na pa pha ba bha ma',
                'other' => 'ya ra la va śa ṣa sa ha ḻa',
                'symbols' => 'oṃ । ॥ 0 1 2 3 4 5 6 7 8 9',
                'putra' => 'putra',
                'naraIti' => 'nara iti',
                'sentence' => 'dharmakṣetre kurukṣetre samavetā yuyutsavaḥ ।'
            ),
            'itrans' => array(
                'vowels' => 'a A i I u U RRi RRI LLi LLI e ai o au',
                'marks' => 'ka khA gi ghI ~Nu chU ChRRi jRRI jhLLi ~nLLI Te Thai Do Dhau NaM taH th',
                'consonants' => 'ka kha ga gha ~Na cha Cha ja jha ~na Ta Tha Da Dha Na ta tha da dha na pa pha ba bha ma',
                'other' => 'ya ra la va sha Sha sa ha La',
                'symbols' => 'OM | || 0 1 2 3 4 5 6 7 8 9',
                'putra' => 'putra',
                'naraIti' => 'nara iti',
                'sentence' => 'dharmakShetre kurukShetre samavetA yuyutsavaH |'
            ),
            'itrans_dravidian' => array(
                'short_vowels' => 'e E o O',
                'short_marks' => 'ke kE ko kO',
            ),
            'kolkata' => array(
                'short_vowels' => 'e ē o ō',
                'short_marks' => 'ke kē ko kō',
            ),
            'kannada' => array(
                'vowels' => 'ಅ ಆ ಇ ಈ ಉ ಊ ಋ ೠ ಌ ೡ ಏ ಐ ಓ ಔ',
                'short_vowels' => 'ಎ ಏ ಒ ಓ',
                'marks' => 'ಕ ಖಾ ಗಿ ಘೀ ಙು ಚೂ ಛೃ ಜೄ ಝೢ ಞೣ ಟೇ ಠೈ ಡೋ ಢೌ ಣಂ ತಃ ಥ್',
                'short_marks' => 'ಕೆ ಕೇ ಕೊ ಕೋ',
                'consonants' => 'ಕ ಖ ಗ ಘ ಙ ಚ ಛ ಜ ಝ ಞ ಟ ಠ ಡ ಢ ಣ ತ ಥ ದ ಧ ನ ಪ ಫ ಬ ಭ ಮ',
                'other' => 'ಯ ರ ಲ ವ ಶ ಷ ಸ ಹ ಳ',
                'symbols' => 'ಓಂ । ॥ ೦ ೧ ೨ ೩ ೪ ೫ ೬ ೭ ೮ ೯',
                'putra' => 'ಪುತ್ರ',
                'naraIti' => 'ನರ ಇತಿ',
                'sentence' => 'ಧರ್ಮಕ್ಷೇತ್ರೇ ಕುರುಕ್ಷೇತ್ರೇ ಸಮವೇತಾ ಯುಯುತ್ಸವಃ ।'
            ),
            'malayalam' => array(
                'vowels' => 'അ ആ ഇ ഈ ഉ ഊ ഋ ൠ ഌ ൡ ഏ ഐ ഓ ഔ',
                'short_vowels' => 'എ ഏ ഒ ഓ',
                'marks' => 'ക ഖാ ഗി ഘീ ങു ചൂ ഛൃ ജൄ ഝൢ ഞൣ ടേ ഠൈ ഡോ ഢൌ ണം തഃ ഥ്',
                'short_marks' => 'കെ കേ കൊ കോ',
                'consonants' => 'ക ഖ ഗ ഘ ങ ച ഛ ജ ഝ ഞ ട ഠ ഡ ഢ ണ ത ഥ ദ ധ ന പ ഫ ബ ഭ മ',
                'other' => 'യ ര ല വ ശ ഷ സ ഹ ള',
                'symbols' => 'ഓം । ॥ ൦ ൧ ൨ ൩ ൪ ൫ ൬ ൭ ൮ ൯',
                'putra' => 'പുത്ര',
                'naraIti' => 'നര ഇതി',
                'sentence' => 'ധര്മക്ഷേത്രേ കുരുക്ഷേത്രേ സമവേതാ യുയുത്സവഃ ।'
            ),
            'oriya' => array(
                'vowels' => 'ଅ ଆ ଇ ଈ ଉ ଊ ଋ ୠ ଌ ୡ ଏ ଐ ଓ ଔ',
                'marks' => 'କ ଖା ଗି ଘୀ ଙୁ ଚୂ ଛୃ ଜୄ ଟେ ଠୈ ଡୋ ଢୌ ଣଂ ତଃ ଥ୍',
                'consonants' => 'କ ଖ ଗ ଘ ଙ ଚ ଛ ଜ ଝ ଞ ଟ ଠ ଡ ଢ ଣ ତ ଥ ଦ ଧ ନ ପ ଫ ବ ଭ ମ',
                'other' => 'ଯ ର ଲ ଵ ଶ ଷ ସ ହ ଳ',
                'symbols' => 'ଓଂ । ॥ ୦ ୧ ୨ ୩ ୪ ୫ ୬ ୭ ୮ ୯',
                'putra' => 'ପୁତ୍ର',
                'naraIti' => 'ନର ଇତି',
                'sentence' => 'ଧର୍ମକ୍ଷେତ୍ରେ କୁରୁକ୍ଷେତ୍ରେ ସମଵେତା ଯୁଯୁତ୍ସଵଃ ।'
            ),
            'tamil' => array(
                'short_vowels' => 'எ ஏ ஒ ஓ',
                'short_marks' => 'கெ கே கொ கோ',
            ),
            'telugu' => array(
                'vowels' => 'అ ఆ ఇ ఈ ఉ ఊ ఋ ౠ ఌ ౡ ఏ ఐ ఓ ఔ',
                'short_vowels' => 'ఎ ఏ ఒ ఓ',
                'marks' => 'క ఖా గి ఘీ ఙు చూ ఛృ జౄ ఝౢ ఞౣ టే ఠై డో ఢౌ ణం తః థ్',
                'short_marks' => 'కె కే కొ కో',
                'consonants' => 'క ఖ గ ఘ ఙ చ ఛ జ ఝ ఞ ట ఠ డ ఢ ణ త థ ద ధ న ప ఫ బ భ మ',
                'other' => 'య ర ల వ శ ష స హ ళ',
                'symbols' => 'ఓం । ॥ ౦ ౧ ౨ ౩ ౪ ౫ ౬ ౭ ౮ ౯',
                'putra' => 'పుత్ర',
                'naraIti' => 'నర ఇతి',
                'sentence' => 'ధర్మక్షేత్రే కురుక్షేత్రే సమవేతా యుయుత్సవః ।'
            ),
            'wx' => array(
                'consonants' => 'ka Ka ga Ga fa ca Ca ja Ja Fa ta Ta da Da Na wa Wa xa Xa na pa Pa ba Ba ma',
                'symbols' => 'oM | || 0 1 2 3 4 5 6 7 8 9',
                'putra' => 'puwra',
                'naraIti' => 'nara iwi',
                'sentence' => 'XarmakRewre kurukRewre samavewA yuyuwsavaH |'
            ),
        );
    }

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
    protected function transHelper($from, $to, $options = NULL) {
        $that = $this;
        $sanscript = $this->sanscript;
        return function($input, $output, $description = '') use ($that, $sanscript, $from, $to, $options) {
            $that->assertEquals($output, $sanscript->t($input, $from, $to, $options), $description);
        };
    }
}
