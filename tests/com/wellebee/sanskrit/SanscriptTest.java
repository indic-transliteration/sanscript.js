package com.wellebee.sanskrit;

import java.util.HashMap;

import static org.junit.Assert.*;

public class SanscriptTest {
    protected Sanscript sanscript = new Sanscript();

    protected class DataSet extends HashMap<String, String> {}
    protected class DataSets extends HashMap<String, DataSet> {}
    protected DataSets dataSets = new DataSets();

    SanscriptTest() {
        initializeDataSets();
    }

    void initializeDataSets() {
        DataSet dataSet;

        dataSet = new DataSet();
        dataSet.put("vowels", "অ আ ই ঈ উ ঊ ঋ ৠ ঌ ৡ এ ঐ ও ঔ");
        dataSet.put("marks", "ক খা গি ঘী ঙু চূ ছৃ জৄ ঝৢ ঞৣ টে ঠৈ ডো ঢৌ ণং তঃ থ্");
        dataSet.put("consonants", "ক খ গ ঘ ঙ চ ছ জ ঝ ঞ ট ঠ ড ঢ ণ ত থ দ ধ ন প ফ ব ভ ম");
        dataSet.put("other", "য র ল ব শ ষ স হ ळ");
        dataSet.put("symbols", "ॐ । ॥ ০ ১ ২ ৩ ৪ ৫ ৬ ৭ ৮ ৯");
        dataSet.put("putra", "পুত্র");
        dataSet.put("naraIti", "নর ইতি");
        dataSet.put("sentence", "ধর্মক্ষেত্রে কুরুক্ষেত্রে সমবেতা যুযুত্সবঃ ।");
        dataSets.put("bengali", dataSet);

        dataSet = new DataSet();
        dataSet.put("vowels", "अ आ इ ई उ ऊ ऋ ॠ ऌ ॡ ए ऐ ओ औ");
        dataSet.put("short_vowels", "ऎ ए ऒ ओ");
        dataSet.put("marks", "क खा गि घी ङु चू छृ जॄ झॢ ञॣ टे ठै डो ढौ णं तः थ्");
        dataSet.put("short_marks", "कॆ के कॊ को");
        dataSet.put("consonants", "क ख ग घ ङ च छ ज झ ञ ट ठ ड ढ ण त थ द ध न प फ ब भ म");
        dataSet.put("other", "य र ल व श ष स ह ळ");
        dataSet.put("symbols", "ॐ । ॥ ० १ २ ३ ४ ५ ६ ७ ८ ९");
        dataSet.put("putra", "पुत्र");
        dataSet.put("naraIti", "नर इति");
        dataSet.put("sentence", "धर्मक्षेत्रे कुरुक्षेत्रे समवेता युयुत्सवः ।");
        dataSets.put("devanagari", dataSet);

        dataSet = new DataSet();
        dataSet.put("vowels", "અ આ ઇ ઈ ઉ ઊ ઋ ૠ ઌ ૡ એ ઐ ઓ ઔ");
        dataSet.put("marks", "ક ખા ગિ ઘી ઙુ ચૂ છૃ જૄ ઝૢ ઞૣ ટે ઠૈ ડો ઢૌ ણં તઃ થ્");
        dataSet.put("consonants", "ક ખ ગ ઘ ઙ ચ છ જ ઝ ઞ ટ ઠ ડ ઢ ણ ત થ દ ધ ન પ ફ બ ભ મ");
        dataSet.put("other", "ય ર લ વ શ ષ સ હ ળ");
        dataSet.put("symbols", "ૐ ૤ ૥ ૦ ૧ ૨ ૩ ૪ ૫ ૬ ૭ ૮ ૯");
        dataSet.put("putra", "પુત્ર");
        dataSet.put("naraIti", "નર ઇતિ");
        dataSet.put("sentence", "ધર્મક્ષેત્રે કુરુક્ષેત્રે સમવેતા યુયુત્સવઃ ૤");
        dataSets.put("gujarati", dataSet);

        dataSet = new DataSet();
        dataSet.put("vowels", "ਅ ਆ ਇ ਈ ਉ ਊ ਏ ਐ ਓ ਔ");
        dataSet.put("marks", "ਕ ਖਾ ਗਿ ਘੀ ਙੁ ਚੂ ਟੇ ਠੈ ਡੋ ਢੌ ਣਂ ਤਃ ਥ੍");
        dataSet.put("consonants", "ਕ ਖ ਗ ਘ ਙ ਚ ਛ ਜ ਝ ਞ ਟ ਠ ਡ ਢ ਣ ਤ ਥ ਦ ਧ ਨ ਪ ਫ ਬ ਭ ਮ");
        dataSet.put("other", "ਯ ਰ ਲ ਵ ਸ਼ ਸ਼ ਸ ਹ ਲ਼");
        dataSet.put("symbols", "ॐ । ॥ ੦ ੧ ੨ ੩ ੪ ੫ ੬ ੭ ੮ ੯");
        dataSet.put("putra", "ਪੁਤ੍ਰ");
        dataSet.put("naraIti", "ਨਰ ਇਤਿ");
        dataSet.put("sentence", "ਧਰ੍ਮਕ੍ਸ਼ੇਤ੍ਰੇ ਕੁਰੁਕ੍ਸ਼ੇਤ੍ਰੇ ਸਮਵੇਤਾ ਯੁਯੁਤ੍ਸਵਃ ।");
        dataSets.put("gurmukhi", dataSet);

        dataSet = new DataSet();
        dataSet.put("vowels", "a A i I u U R RR lR lRR e ai o au");
        dataSet.put("marks", "ka khA gi ghI Gu cU chR jRR jhlR JlRR Te Thai Do Dhau NaM taH th");
        dataSet.put("consonants", "ka kha ga gha Ga ca cha ja jha Ja Ta Tha Da Dha Na ta tha da dha na pa pha ba bha ma");
        dataSet.put("other", "ya ra la va za Sa sa ha La");
        dataSet.put("symbols", "OM | || 0 1 2 3 4 5 6 7 8 9");
        dataSet.put("putra", "putra");
        dataSet.put("naraIti", "nara iti");
        dataSet.put("sentence", "dharmakSetre kurukSetre samavetA yuyutsavaH |");
        dataSets.put("hk", dataSet);

        dataSet = new DataSet();
        dataSet.put("vowels", "a ā i ī u ū ṛ ṝ ḷ ḹ e ai o au");
        dataSet.put("marks", "ka khā gi ghī ṅu cū chṛ jṝ jhḷ ñḹ ṭe ṭhai ḍo ḍhau ṇaṃ taḥ th");
        dataSet.put("consonants", "ka kha ga gha ṅa ca cha ja jha ña ṭa ṭha ḍa ḍha ṇa ta tha da dha na pa pha ba bha ma");
        dataSet.put("other", "ya ra la va śa ṣa sa ha ḻa");
        dataSet.put("symbols", "oṃ । ॥ 0 1 2 3 4 5 6 7 8 9");
        dataSet.put("putra", "putra");
        dataSet.put("naraIti", "nara iti");
        dataSet.put("sentence", "dharmakṣetre kurukṣetre samavetā yuyutsavaḥ ।");
        dataSets.put("iast", dataSet);

        dataSet = new DataSet();
        dataSet.put("vowels", "a A i I u U RRi RRI LLi LLI e ai o au");
        dataSet.put("marks", "ka khA gi ghI ~Nu chU ChRRi jRRI jhLLi ~nLLI Te Thai Do Dhau NaM taH th");
        dataSet.put("consonants", "ka kha ga gha ~Na cha Cha ja jha ~na Ta Tha Da Dha Na ta tha da dha na pa pha ba bha ma");
        dataSet.put("other", "ya ra la va sha Sha sa ha La");
        dataSet.put("symbols", "OM | || 0 1 2 3 4 5 6 7 8 9");
        dataSet.put("putra", "putra");
        dataSet.put("naraIti", "nara iti");
        dataSet.put("sentence", "dharmakShetre kurukShetre samavetA yuyutsavaH |");
        dataSets.put("itrans", dataSet);

        dataSet = new DataSet();
        dataSet.put("short_vowels", "e E o O");
        dataSet.put("short_marks", "ke kE ko kO");
        dataSets.put("itrans_dravidian", dataSet);

        dataSet = new DataSet();
        dataSet.put("short_vowels", "e ē o ō");
        dataSet.put("short_marks", "ke kē ko kō");
        dataSets.put("kolkata", dataSet);

        dataSet = new DataSet();
        dataSet.put("vowels", "ಅ ಆ ಇ ಈ ಉ ಊ ಋ ೠ ಌ ೡ ಏ ಐ ಓ ಔ");
        dataSet.put("short_vowels", "ಎ ಏ ಒ ಓ");
        dataSet.put("marks", "ಕ ಖಾ ಗಿ ಘೀ ಙು ಚೂ ಛೃ ಜೄ ಝೢ ಞೣ ಟೇ ಠೈ ಡೋ ಢೌ ಣಂ ತಃ ಥ್");
        dataSet.put("short_marks", "ಕೆ ಕೇ ಕೊ ಕೋ");
        dataSet.put("consonants", "ಕ ಖ ಗ ಘ ಙ ಚ ಛ ಜ ಝ ಞ ಟ ಠ ಡ ಢ ಣ ತ ಥ ದ ಧ ನ ಪ ಫ ಬ ಭ ಮ");
        dataSet.put("other", "ಯ ರ ಲ ವ ಶ ಷ ಸ ಹ ಳ");
        dataSet.put("symbols", "ಓಂ । ॥ ೦ ೧ ೨ ೩ ೪ ೫ ೬ ೭ ೮ ೯");
        dataSet.put("putra", "ಪುತ್ರ");
        dataSet.put("naraIti", "ನರ ಇತಿ");
        dataSet.put("sentence", "ಧರ್ಮಕ್ಷೇತ್ರೇ ಕುರುಕ್ಷೇತ್ರೇ ಸಮವೇತಾ ಯುಯುತ್ಸವಃ ।");
        dataSets.put("kannada", dataSet);

        dataSet = new DataSet();
        dataSet.put("vowels", "അ ആ ഇ ഈ ഉ ഊ ഋ ൠ ഌ ൡ ഏ ഐ ഓ ഔ");
        dataSet.put("short_vowels", "എ ഏ ഒ ഓ");
        dataSet.put("marks", "ക ഖാ ഗി ഘീ ങു ചൂ ഛൃ ജൄ ഝൢ ഞൣ ടേ ഠൈ ഡോ ഢൌ ണം തഃ ഥ്");
        dataSet.put("short_marks", "കെ കേ കൊ കോ");
        dataSet.put("consonants", "ക ഖ ഗ ഘ ങ ച ഛ ജ ഝ ഞ ട ഠ ഡ ഢ ണ ത ഥ ദ ധ ന പ ഫ ബ ഭ മ");
        dataSet.put("other", "യ ര ല വ ശ ഷ സ ഹ ള");
        dataSet.put("symbols", "ഓം । ॥ ൦ ൧ ൨ ൩ ൪ ൫ ൬ ൭ ൮ ൯");
        dataSet.put("putra", "പുത്ര");
        dataSet.put("naraIti", "നര ഇതി");
        dataSet.put("sentence", "ധര്മക്ഷേത്രേ കുരുക്ഷേത്രേ സമവേതാ യുയുത്സവഃ ।");
        dataSets.put("malayalam", dataSet);

        dataSet = new DataSet();
        dataSet.put("vowels", "ଅ ଆ ଇ ଈ ଉ ଊ ଋ ୠ ଌ ୡ ଏ ଐ ଓ ଔ");
        dataSet.put("marks", "କ ଖା ଗି ଘୀ ଙୁ ଚୂ ଛୃ ଜୄ ଟେ ଠୈ ଡୋ ଢୌ ଣଂ ତଃ ଥ୍");
        dataSet.put("consonants", "କ ଖ ଗ ଘ ଙ ଚ ଛ ଜ ଝ ଞ ଟ ଠ ଡ ଢ ଣ ତ ଥ ଦ ଧ ନ ପ ଫ ବ ଭ ମ");
        dataSet.put("other", "ଯ ର ଲ ଵ ଶ ଷ ସ ହ ଳ");
        dataSet.put("symbols", "ଓଂ । ॥ ୦ ୧ ୨ ୩ ୪ ୫ ୬ ୭ ୮ ୯");
        dataSet.put("putra", "ପୁତ୍ର");
        dataSet.put("naraIti", "ନର ଇତି");
        dataSet.put("sentence", "ଧର୍ମକ୍ଷେତ୍ରେ କୁରୁକ୍ଷେତ୍ରେ ସମଵେତା ଯୁଯୁତ୍ସଵଃ ।");
        dataSets.put("oriya", dataSet);

        dataSet = new DataSet();
        dataSet.put("short_vowels", "எ ஏ ஒ ஓ");
        dataSet.put("short_marks", "கெ கே கொ கோ");
        dataSets.put("tamil", dataSet);

        dataSet = new DataSet();
        dataSet.put("vowels", "అ ఆ ఇ ఈ ఉ ఊ ఋ ౠ ఌ ౡ ఏ ఐ ఓ ఔ");
        dataSet.put("short_vowels", "ఎ ఏ ఒ ఓ");
        dataSet.put("marks", "క ఖా గి ఘీ ఙు చూ ఛృ జౄ ఝౢ ఞౣ టే ఠై డో ఢౌ ణం తః థ్");
        dataSet.put("short_marks", "కె కే కొ కో");
        dataSet.put("consonants", "క ఖ గ ఘ ఙ చ ఛ జ ఝ ఞ ట ఠ డ ఢ ణ త థ ద ధ న ప ఫ బ భ మ");
        dataSet.put("other", "య ర ల వ శ ష స హ ళ");
        dataSet.put("symbols", "ఓం । ॥ ౦ ౧ ౨ ౩ ౪ ౫ ౬ ౭ ౮ ౯");
        dataSet.put("putra", "పుత్ర");
        dataSet.put("naraIti", "నర ఇతి");
        dataSet.put("sentence", "ధర్మక్షేత్రే కురుక్షేత్రే సమవేతా యుయుత్సవః ।");
        dataSets.put("telugu", dataSet);

        dataSet = new DataSet();
        dataSet.put("consonants", "ka Ka ga Ga fa ca Ca ja Ja Fa ta Ta da Da Na wa Wa xa Xa na pa Pa ba Ba ma");
        dataSet.put("symbols", "oM | || 0 1 2 3 4 5 6 7 8 9");
        dataSet.put("putra", "puwra");
        dataSet.put("naraIti", "nara iwi");
        dataSet.put("sentence", "XarmakRewre kurukRewre samavewA yuyuwsavaH |");
        dataSets.put("wx", dataSet);
    }

    protected interface TransHelper {
         void run(String input, String output, String description);
    }

    /**
     * For a script pair (f, t), return a function that takes two strings s1 and
     * s2 and asserts that s1, when transliterated from f to t, equals s2. The
     * returned function takes an optional 'description' parameter for JUnit.
     *
     * @param from      the source script
     * @param to        the destination script
     * @param options   transliteration options
     * @return          the function described above.
     */
    protected TransHelper transHelper(String from, String to, Sanscript.Options options) {
        return (input, output, description) -> {
            assertEquals(description, output, sanscript.t(input, from, to, options));
        };
    }

    protected TransHelper transHelper(String from, String to) {
        return transHelper(from, to, null);
    }
}
