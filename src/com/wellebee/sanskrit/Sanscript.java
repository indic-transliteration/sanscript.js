package com.wellebee.sanskrit;

/**
 * Sanscript
 *
 * Sanscript is a Sanskrit transliteration library. Currently, it supports
 * other Indian languages only incidentally.
 *
 * Released under the MIT and GPL Licenses.
 */

import java.util.*;
import java.lang.Math;

public class Sanscript {

    public Sanscript() {
        initializeSchemes();
        initializeAlternates();
        initializeSpecialSchemes();
    }

    // Options interface.
    public static interface Options extends Map<String, Object> {}

    // Options default implementation.
    public static class HashOptions extends HashMap<String, Object> implements Options  {
        public HashOptions set(String key, Object value) {
            put(key, value);
            return this;
        }
    }

    private Options defaults = new HashOptions().set("skip_sgml", false).set("syncope", false);

    // Scheme interface.
    public static interface Scheme extends Map<String, String[]> {
        // Create a deep copy of a scheme.
        public Scheme cheapCopy();
    }

    // Scheme default implementation.
    public static class HashScheme extends HashMap<String, String[]> implements Scheme {
        public Scheme cheapCopy() {
            Scheme copy = new HashScheme();
            for (Map.Entry<String, String[]> entry : entrySet()) {
                String[] value = entry.getValue();
                copy.put(entry.getKey(), Arrays.copyOf(value, value.length));
            }
            return copy;
        }
    }

    public class Schemes extends HashMap<String, Scheme> {}

    private Schemes schemes = new Schemes();

    /**
     * Returns the collection of all schemes.
     *
     * @return Schemes
     */
    public Schemes getSchemes() {
        return schemes;
    }

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
    private void initializeSchemes() {
        Scheme scheme;

        /* Bengali
         * -------
         * 'va' and 'ba' are both rendered as ব.
         */
        scheme = new HashScheme();
        scheme.put("vowels", new String[] {"অ", "আ", "ই", "ঈ", "উ", "ঊ", "ঋ", "ৠ", "ঌ", "ৡ", "", "এ", "ঐ", "", "ও", "ঔ"});
        scheme.put("vowel_marks", new String[] {"া", "ি", "ী", "ু", "ূ", "ৃ", "ৄ", "ৢ", "ৣ", "", "ে", "ৈ", "", "ো", "ৌ"});
        scheme.put("other_marks", new String[] {"ং", "ঃ", "ঁ"});
        scheme.put("virama", new String[] {"্"});
        scheme.put("consonants", new String[] {"ক", "খ", "গ", "ঘ", "ঙ", "চ", "ছ", "জ", "ঝ", "ঞ", "ট", "ঠ", "ড", "ঢ", "ণ", "ত", "থ", "দ", "ধ", "ন", "প", "ফ", "ব", "ভ", "ম", "য", "র", "ল", "ব", "শ", "ষ", "স", "হ", "ळ", "ক্ষ", "জ্ঞ"});
        scheme.put("symbols", new String[] {"০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯", "ॐ", "ঽ", "।", "॥"});
        scheme.put("other", new String[] {"", "", "", "", "ড", "ঢ", "", "য", ""});
        schemes.put("bengali", scheme);

        /* Devanagari
         * ----------
         * The most comprehensive and unambiguous Brahmic script listed.
         */
        scheme = new HashScheme();
        // "Independent" forms of the vowels. These are used whenever the
        // vowel does not immediately follow a consonant.
        scheme.put("vowels", new String[] {"अ", "आ", "इ", "ई", "उ", "ऊ", "ऋ", "ॠ", "ऌ", "ॡ", "ऎ", "ए", "ऐ", "ऒ", "ओ", "औ"});

        // "Dependent" forms of the vowels. These are used whenever the
        // vowel immediately follows a consonant. If a letter is not
        // listed in `vowels`, it should not be listed here.
        scheme.put("vowel_marks", new String[] {"ा", "ि", "ी", "ु", "ू", "ृ", "ॄ", "ॢ", "ॣ", "ॆ", "े", "ै", "ॊ", "ो", "ौ"});

        // Miscellaneous marks, all of which are used in Sanskrit.
        scheme.put("other_marks", new String[] {"ं", "ः", "ँ"});

        // In syllabic scripts like Devanagari, consonants have an inherent
        // vowel that must be suppressed explicitly. We do so by putting a
        // virama after the consonant.
        scheme.put("virama", new String[] {"्"});

        // Various Sanskrit consonants and consonant clusters. Every token
        // here has an explicit vowel. Thus "क" is "ka" instead of "k".
        scheme.put("consonants", new String[] {"क", "ख", "ग", "घ", "ङ", "च", "छ", "ज", "झ", "ञ", "ट", "ठ", "ड", "ढ", "ण", "त", "थ", "द", "ध", "न", "प", "फ", "ब", "भ", "म", "य", "र", "ल", "व", "श", "ष", "स", "ह", "ळ", "क्ष", "ज्ञ"});

        // Numbers and punctuation
        scheme.put("symbols", new String[] {"०", "१", "२", "३", "४", "५", "६", "७", "८", "९", "ॐ", "ऽ", "।", "॥"});

        // Zero-width joiner. This is used to separate a consonant cluster
        // and avoid a complex ligature.
        scheme.put("zwj", new String[] {"\u200D"});

        // Dummy consonant. This is used in ITRANS to prevert certain types
        // of parser ambiguity. Thus "barau" -> बरौ but "bara_u" -> बरउ.
        scheme.put("skip", new String[] {""});

        // Vedic accent. Udatta and anudatta.
        scheme.put("accent", new String[] {"\u0951", "\u0952"});

        // Accent combined with anusvara and and visarga. For compatibility
        // with ITRANS, which allows the reverse of these four.
        scheme.put("combo_accent", new String[] {"ः॑", "ः॒", "ं॑", "ं॒"});

        scheme.put("candra", new String[] {"ॅ"});

        // Non-Sanskrit consonants
        scheme.put("other", new String[] {"क़", "ख़", "ग़", "ज़", "ड़", "ढ़", "फ़", "य़", "ऱ"});
        schemes.put("devanagari", scheme);

        /* Gujarati
         * --------
         * Sanskrit-complete.
         */
        scheme = new HashScheme();
        scheme.put("vowels", new String[] {"અ", "આ", "ઇ", "ઈ", "ઉ", "ઊ", "ઋ", "ૠ", "ઌ", "ૡ", "", "એ", "ઐ", "", "ઓ", "ઔ"});
        scheme.put("vowel_marks", new String[] {"ા", "િ", "ી", "ુ", "ૂ", "ૃ", "ૄ", "ૢ", "ૣ", "", "ે", "ૈ", "", "ો", "ૌ"});
        scheme.put("other_marks", new String[] {"ં", "ઃ", "ઁ"});
        scheme.put("virama", new String[] {"્"});
        scheme.put("consonants", new String[] {"ક", "ખ", "ગ", "ઘ", "ઙ", "ચ", "છ", "જ", "ઝ", "ઞ", "ટ", "ઠ", "ડ", "ઢ", "ણ", "ત", "થ", "દ", "ધ", "ન", "પ", "ફ", "બ", "ભ", "મ", "ય", "ર", "લ", "વ", "શ", "ષ", "સ", "હ", "ળ", "ક્ષ", "જ્ઞ"});
        scheme.put("symbols", new String[] {"૦", "૧", "૨", "૩", "૪", "૫", "૬", "૭", "૮", "૯", "ૐ", "ઽ", "૤", "૥"});
        scheme.put("candra", new String[] {"ૅ"});
        schemes.put("gujarati", scheme);

        /* Gurmukhi
         * --------
         * Missing R/RR/lR/lRR
         */
        scheme = new HashScheme();
        scheme.put("vowels", new String[] {"ਅ", "ਆ", "ਇ", "ਈ", "ਉ", "ਊ", "", "", "", "", "", "ਏ", "ਐ", "", "ਓ", "ਔ"});
        scheme.put("vowel_marks", new String[] {"ਾ", "ਿ", "ੀ", "ੁ", "ੂ", "", "", "", "", "", "ੇ", "ੈ", "", "ੋ", "ੌ"});
        scheme.put("other_marks", new String[] {"ਂ", "ਃ", "ਁ"});
        scheme.put("virama", new String[] {"੍"});
        scheme.put("consonants", new String[] {"ਕ", "ਖ", "ਗ", "ਘ", "ਙ", "ਚ", "ਛ", "ਜ", "ਝ", "ਞ", "ਟ", "ਠ", "ਡ", "ਢ", "ਣ", "ਤ", "ਥ", "ਦ", "ਧ", "ਨ", "ਪ", "ਫ", "ਬ", "ਭ", "ਮ", "ਯ", "ਰ", "ਲ", "ਵ", "ਸ਼", "ਸ਼", "ਸ", "ਹ", "ਲ਼", "ਕ੍ਸ਼", "ਜ੍ਞ"});
        scheme.put("symbols", new String[] {"੦", "੧", "੨", "੩", "੪", "੫", "੬", "੭", "੮", "੯", "ॐ", "ऽ", "।", "॥"});
        scheme.put("other", new String[] {"", "ਖ", "ਗ", "ਜ", "ਡ", "", "ਫ", "", ""});
        schemes.put("gurmukhi", scheme);

        /* Kannada
         * -------
         * Sanskrit-complete.
         */
        scheme = new HashScheme();
        scheme.put("vowels", new String[] {"ಅ", "ಆ", "ಇ", "ಈ", "ಉ", "ಊ", "ಋ", "ೠ", "ಌ", "ೡ", "ಎ", "ಏ", "ಐ", "ಒ", "ಓ", "ಔ"});
        scheme.put("vowel_marks", new String[] {"ಾ", "ಿ", "ೀ", "ು", "ೂ", "ೃ", "ೄ", "ೢ", "ೣ", "ೆ", "ೇ", "ೈ", "ೊ", "ೋ", "ೌ"});
        scheme.put("other_marks", new String[] {"ಂ", "ಃ", "ँ"});
        scheme.put("virama", new String[] {"್"});
        scheme.put("consonants", new String[] {"ಕ", "ಖ", "ಗ", "ಘ", "ಙ", "ಚ", "ಛ", "ಜ", "ಝ", "ಞ", "ಟ", "ಠ", "ಡ", "ಢ", "ಣ", "ತ", "ಥ", "ದ", "ಧ", "ನ", "ಪ", "ಫ", "ಬ", "ಭ", "ಮ", "ಯ", "ರ", "ಲ", "ವ", "ಶ", "ಷ", "ಸ", "ಹ", "ಳ", "ಕ್ಷ", "ಜ್ಞ"});
        scheme.put("symbols", new String[] {"೦", "೧", "೨", "೩", "೪", "೫", "೬", "೭", "೮", "೯", "ಓಂ", "ಽ", "।", "॥"});
        scheme.put("other", new String[] {"", "", "", "", "", "", "ಫ", "", "ಱ"});
        schemes.put("kannada", scheme);

        /* Malayalam
         * ---------
         * Sanskrit-complete.
         */
        scheme = new HashScheme();
        scheme.put("vowels", new String[] {"അ", "ആ", "ഇ", "ഈ", "ഉ", "ഊ", "ഋ", "ൠ", "ഌ", "ൡ", "എ", "ഏ", "ഐ", "ഒ", "ഓ", "ഔ"});
        scheme.put("vowel_marks", new String[] {"ാ", "ി", "ീ", "ു", "ൂ", "ൃ", "ൄ", "ൢ", "ൣ", "െ", "േ", "ൈ", "ൊ", "ോ", "ൌ"});
        scheme.put("other_marks", new String[] {"ം", "ഃ", "ँ"});
        scheme.put("virama", new String[] {"്"});
        scheme.put("consonants", new String[] {"ക", "ഖ", "ഗ", "ഘ", "ങ", "ച", "ഛ", "ജ", "ഝ", "ഞ", "ട", "ഠ", "ഡ", "ഢ", "ണ", "ത", "ഥ", "ദ", "ധ", "ന", "പ", "ഫ", "ബ", "ഭ", "മ", "യ", "ര", "ല", "വ", "ശ", "ഷ", "സ", "ഹ", "ള", "ക്ഷ", "ജ്ഞ"});
        scheme.put("symbols", new String[] {"൦", "൧", "൨", "൩", "൪", "൫", "൬", "൭", "൮", "൯", "ഓം", "ഽ", "।", "॥"});
        scheme.put("other", new String[] {"", "", "", "", "", "", "", "", "റ"});
        schemes.put("malayalam", scheme);

        /* Oriya
         * -----
         * Sanskrit-complete.
         */
        scheme = new HashScheme();
        scheme.put("vowels", new String[] {"ଅ", "ଆ", "ଇ", "ଈ", "ଉ", "ଊ", "ଋ", "ୠ", "ଌ", "ୡ", "", "ଏ", "ଐ", "", "ଓ", "ଔ"});
        scheme.put("vowel_marks", new String[] {"ା", "ି", "ୀ", "ୁ", "ୂ", "ୃ", "ୄ", "ୢ", "ୣ", "", "େ", "ୈ", "", "ୋ", "ୌ"});
        scheme.put("other_marks", new String[] {"ଂ", "ଃ", "ଁ"});
        scheme.put("virama", new String[] {"୍"});
        scheme.put("consonants", new String[] {"କ", "ଖ", "ଗ", "ଘ", "ଙ", "ଚ", "ଛ", "ଜ", "ଝ", "ଞ", "ଟ", "ଠ", "ଡ", "ଢ", "ଣ", "ତ", "ଥ", "ଦ", "ଧ", "ନ", "ପ", "ଫ", "ବ", "ଭ", "ମ", "ଯ", "ର", "ଲ", "ଵ", "ଶ", "ଷ", "ସ", "ହ", "ଳ", "କ୍ଷ", "ଜ୍ଞ"});
        scheme.put("symbols", new String[] {"୦", "୧", "୨", "୩", "୪", "୫", "୬", "୭", "୮", "୯", "ଓଂ", "ଽ", "।", "॥"});
        scheme.put("other", new String[] {"", "", "", "", "ଡ", "ଢ", "", "ଯ", ""});
        schemes.put("oriya", scheme);

        /* Tamil
         * -----
         * Missing R/RR/lR/lRR vowel marks and voice/aspiration distinctions.
         * The most incomplete of the Sanskrit schemes here.
         */
        scheme = new HashScheme();
        scheme.put("vowels", new String[] {"அ", "ஆ", "இ", "ஈ", "உ", "ஊ", "", "", "", "", "எ", "ஏ", "ஐ", "ஒ", "ஓ", "ஔ"});
        scheme.put("vowel_marks", new String[] {"ா", "ி", "ீ", "ு", "ூ", "", "", "", "", "ெ", "ே", "ை", "ொ", "ோ", "ௌ"});
        scheme.put("other_marks", new String[] {"ஂ", "ஃ", ""});
        scheme.put("virama", new String[] {"்"});
        scheme.put("consonants", new String[] {"க", "க", "க", "க", "ங", "ச", "ச", "ஜ", "ச", "ஞ", "ட", "ட", "ட", "ட", "ண", "த", "த", "த", "த", "ந", "ப", "ப", "ப", "ப", "ம", "ய", "ர", "ல", "வ", "ஶ", "ஷ", "ஸ", "ஹ", "ள", "க்ஷ", "ஜ்ஞ"});
        scheme.put("symbols", new String[] {"௦", "௧", "௨", "௩", "௪", "௫", "௬", "௭", "௮", "௯", "ௐ", "ऽ", "।", "॥"});
        scheme.put("other", new String[] {"", "", "", "", "", "", "", "", "ற"});
        schemes.put("tamil", scheme);

        /* Telugu
         * ------
         * Sanskrit-complete.
         */
        scheme = new HashScheme();
        scheme.put("vowels", new String[] {"అ", "ఆ", "ఇ", "ఈ", "ఉ", "ఊ", "ఋ", "ౠ", "ఌ", "ౡ", "ఎ", "ఏ", "ఐ", "ఒ", "ఓ", "ఔ"});
        scheme.put("vowel_marks", new String[] {"ా", "ి", "ీ", "ు", "ూ", "ృ", "ౄ", "ౢ", "ౣ", "ె", "ే", "ై", "ొ", "ో", "ౌ"});
        scheme.put("other_marks", new String[] {"ం", "ః", "ఁ"});
        scheme.put("virama", new String[] {"్"});
        scheme.put("consonants", new String[] {"క", "ఖ", "గ", "ఘ", "ఙ", "చ", "ఛ", "జ", "ఝ", "ఞ", "ట", "ఠ", "డ", "ఢ", "ణ", "త", "థ", "ద", "ధ", "న", "ప", "ఫ", "బ", "భ", "మ", "య", "ర", "ల", "వ", "శ", "ష", "స", "హ", "ళ", "క్ష", "జ్ఞ"});
        scheme.put("symbols", new String[] {"౦", "౧", "౨", "౩", "౪", "౫", "౬", "౭", "౮", "౯", "ఓం", "ఽ", "।", "॥"});
        scheme.put("other", new String[] {"", "", "", "", "", "", "", "", "ఱ"});
        schemes.put("telugu", scheme);

        /* International Alphabet of Sanskrit Transliteration
         * --------------------------------------------------
         * The most "professional" Sanskrit romanization scheme.put("
         */
        scheme = new HashScheme();
        scheme.put("vowels", new String[] {"a", "ā", "i", "ī", "u", "ū", "ṛ", "ṝ", "ḷ", "ḹ", "", "e", "ai", "", "o", "au"});
        scheme.put("other_marks", new String[] {"ṃ", "ḥ", "~"});
        scheme.put("virama", new String[] {""});
        scheme.put("consonants", new String[] {"k", "kh", "g", "gh", "ṅ", "c", "ch", "j", "jh", "ñ", "ṭ", "ṭh", "ḍ", "ḍh", "ṇ", "t", "th", "d", "dh", "n", "p", "ph", "b", "bh", "m", "y", "r", "l", "v", "ś", "ṣ", "s", "h", "ḻ", "kṣ", "jñ"});
        scheme.put("symbols", new String[] {"0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "oṃ", "'", "।", "॥"});
        schemes.put("iast", scheme);

        /* ITRANS
         * ------
         * One of the first romanization schemes -- and one of the most
         * complicated. For alternate forms, see the "allAlternates" variable
         * below.
         *
         * '_' is a "null" letter, which allows adjacent vowels.
         */
        scheme = new HashScheme();
        scheme.put("vowels", new String[] {"a", "A", "i", "I", "u", "U", "RRi", "RRI", "LLi", "LLI", "", "e", "ai", "", "o", "au"});
        scheme.put("other_marks", new String[] {"M", "H", ".N"});
        scheme.put("virama", new String[] {""});
        scheme.put("consonants", new String[] {"k", "kh", "g", "gh", "~N", "ch", "Ch", "j", "jh", "~n", "T", "Th", "D", "Dh", "N", "t", "th", "d", "dh", "n", "p", "ph", "b", "bh", "m", "y", "r", "l", "v", "sh", "Sh", "s", "h", "L", "kSh", "j~n"});
        scheme.put("symbols", new String[] {"0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "OM", ".a", "|", "||"});
        scheme.put("candra", new String[] {".c"});
        scheme.put("zwj", new String[] {"{}"});
        scheme.put("skip", new String[] {"_"});
        scheme.put("accent", new String[] {"\\'", "\\_"});
        scheme.put("combo_accent", new String[] {"\\'H", "\\_H", "\\'M", "\\_M"});
        scheme.put("other", new String[] {"q", "K", "G", "z", ".D", ".Dh", "f", "Y", "R"});
        schemes.put("itrans", scheme);

        /* Harvard-Kyoto
         * -------------
         * A simple 1:1 mapping.
         */
        scheme = new HashScheme();
        scheme.put("vowels", new String[] {"a", "A", "i", "I", "u", "U", "R", "RR", "lR", "lRR", "", "e", "ai", "", "o", "au"});
        scheme.put("other_marks", new String[] {"M", "H", "~",});
        scheme.put("virama", new String[] {""});
        scheme.put("consonants", new String[] {"k", "kh", "g", "gh", "G", "c", "ch", "j", "jh", "J", "T", "Th", "D", "Dh", "N", "t", "th", "d", "dh", "n", "p", "ph", "b", "bh", "m", "y", "r", "l", "v", "z", "S", "s", "h", "L", "kS", "jJ"});
        scheme.put("symbols", new String[] {"0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "OM", "'", "|", "||"});
        schemes.put("hk", scheme);

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
        scheme = new HashScheme();
        scheme.put("vowels", new String[] {"a", "A", "i", "I", "u", "U", "f", "F", "x", "X", "", "e", "E", "", "o", "O"});
        scheme.put("other_marks", new String[] {"M", "H", "~"});
        scheme.put("virama", new String[] {""});
        scheme.put("consonants", new String[] {"k", "K", "g", "G", "N", "c", "C", "j", "J", "Y", "w", "W", "q", "Q", "R", "t", "T", "d", "D", "n", "p", "P", "b", "B", "m", "y", "r", "l", "v", "S", "z", "s", "h", "L", "kz", "jY"});
        scheme.put("symbols", new String[] {"0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "oM", "'", ".", ".."});
        schemes.put("slp1", scheme);

        /* Velthuis
         * --------
         * A case-insensitive Sanskrit encoding.
         */
        scheme = new HashScheme();
        scheme.put("vowels", new String[] {"a", "aa", "i", "ii", "u", "uu", ".r", ".rr", ".li", ".ll", "", "e", "ai", "", "o", "au"});
        scheme.put("other_marks", new String[] {".m", ".h", ""});
        scheme.put("virama", new String[] {""});
        scheme.put("consonants", new String[] {"k", "kh", "g", "gh", "\"n", "c", "ch", "j", "jh", "~n", ".t", ".th", ".d", ".d", ".n", "t", "th", "d", "dh", "n", "p", "ph", "b", "bh", "m", "y", "r", "l", "v", "~s", ".s", "s", "h", "L", "k.s", "j~n"});
        scheme.put("symbols", new String[] {"0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "o.m", "'", "|", "||"});
        schemes.put("velthuis", scheme);

        /* WX
         * --
         * As terse as SLP1.
         */
        scheme = new HashScheme();
        scheme.put("vowels", new String[] {"a", "A", "i", "I", "u", "U", "q", "Q", "L", "", "", "e", "E", "", "o", "O"});
        scheme.put("other_marks", new String[] {"M", "H", "z"});
        scheme.put("virama", new String[] {""});
        scheme.put("consonants", new String[] {"k", "K", "g", "G", "f", "c", "C", "j", "J", "F", "t", "T", "d", "D", "N", "w", "W", "x", "X", "n", "p", "P", "b", "B", "m", "y", "r", "l", "v", "S", "R", "s", "h", "", "kR", "jF"});
        scheme.put("symbols", new String[] {"0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "oM", "'", "|", "||"});
        schemes.put("wx", scheme);
    }

    // Set of names of Roman schemes.
    private Map<String, Boolean> romanSchemes = new HashMap<String, Boolean>();

    // Map of alternate encodings.
    private class AlternateMap extends HashMap<String, String[]> {}
    private class Alternates extends HashMap<String, AlternateMap> {}

    private Alternates allAlternates = new Alternates();

    private void initializeAlternates() {
        AlternateMap map = new AlternateMap();
        map.put("A", new String[] {"aa"});
        map.put("I", new String[] {"ii", "ee"});
        map.put("U", new String[] {"uu", "oo"});
        map.put("RRi", new String[] {"R^i"});
        map.put("RRI", new String[] {"R^I"});
        map.put("LLi", new String[] {"L^i"});
        map.put("LLI", new String[] {"L^I"});
        map.put("M", new String[] {".m", ".n"});
        map.put("~N", new String[] {"N^"});
        map.put("ch", new String[] {"c"});
        map.put("Ch", new String[] {"C", "chh"});
        map.put("~n", new String[] {"JN"});
        map.put("v", new String[] {"w"});
        map.put("Sh", new String[] {"S", "shh"});
        map.put("kSh", new String[] {"kS", "x"});
        map.put("j~n", new String[] {"GY", "dny"});
        map.put("OM", new String[] {"AUM"});
        map.put("\\_", new String[] {"\\`"});
        map.put("\\_H", new String[] {"\\`H"});
        map.put("\\'M", new String[] {"\\'.m", "\\'.n"});
        map.put("\\_M", new String[] {"\\_.m", "\\_.n", "\\`M", "\\`.m", "\\`.n"});
        map.put(".a", new String[] {"~"});
        map.put("|", new String[] {"."});
        map.put("||", new String[] {".."});
        map.put("z", new String[] {"J"});
        allAlternates.put("itrans", map);
    }

    // object cache
    private class Cache {
        public String from = null;
        public String to = null;
        public TMap map = null;
        public Options options = null;
    }

    private Cache cache = new Cache();

    /**
     * Check whether the given scheme encodes romanized Sanskrit.
     *
     * @param name  the scheme name
     * @return      boolean
     */
    public boolean isRomanScheme(String name) {
        Boolean value = romanSchemes.get(name);
        return value != null && value;
    }

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
    public void addBrahmicScheme(String name, Scheme scheme) {
        schemes.put(name, scheme);
    }

    /**
     * Add a roman scheme to Sanscript.
     *
     * See the comments on addBrahmicScheme. The "vowel_marks" field
     * can be omitted.
     *
     * @param name    the scheme name
     * @param scheme  the scheme data itself
     */
    public void addRomanScheme(String name, Scheme scheme) {
        if (scheme.get("vowel_marks") == null) {
            scheme.put("vowel_marks", Arrays.copyOfRange(scheme.get("vowels"), 1, scheme.get("vowels").length));
        }
        schemes.put(name, scheme);
        romanSchemes.put(name, true);
    }

    // Set up various schemes
    private void initializeSpecialSchemes() {
        // Set up roman schemes
        Scheme kolkata = schemes.get("iast").cheapCopy();
        kolkata.put("vowels", new String[] {"a", "ā", "i", "ī", "u", "ū", "ṛ", "ṝ", "ḷ", "ḹ", "e", "ē", "ai", "o", "ō", "au"});
        schemes.put("kolkata", kolkata);

        // These schemes already belong to schemes. But by adding
        // them again with `addRomanScheme`, we automatically build up
        // `romanSchemes` and define a `vowel_marks` field for each one.
        String[] schemeNames = new String[] {"iast", "itrans", "hk", "kolkata", "slp1", "velthuis", "wx"};
        for (String name : schemeNames) {
            addRomanScheme(name, schemes.get(name));
        }

        // ITRANS variant, which supports Dravidian short 'e' and 'o'.
        Scheme itrans_dravidian = schemes.get("itrans").cheapCopy();
        itrans_dravidian.put("vowels", new String[] {"a", "A", "i", "I", "u", "U", "Ri", "RRI", "LLi", "LLi", "e", "E", "ai", "o", "O", "au"});
        itrans_dravidian.put("vowel_marks", Arrays.copyOfRange(itrans_dravidian.get("vowels"), 1, itrans_dravidian.get("vowels").length));
        allAlternates.put("itrans_dravidian", allAlternates.get("itrans"));
        addRomanScheme("itrans_dravidian", itrans_dravidian);
    }

    private class SMap extends HashMap<String, String> {}

    private class TMap {
        public boolean fromRoman;
        public boolean toRoman;
        public SMap consonants;
        public SMap letters;
        public SMap marks;
        public String[] virama;
        public int maxTokenLength;
    }

    /**
     * Create a map from every character in `from` to its partner in `to`.
     * Also, store any "marks" that `from` might have.
     *
     * @param from     input scheme
     * @param to       output scheme
     * @param options  scheme options
     */
    private TMap makeMap(String from, String to, Options options) {
        AlternateMap alternates = allAlternates.get(from) != null ? allAlternates.get(from) : new AlternateMap();
        SMap consonants = new SMap();
        Scheme fromScheme = schemes.get(from);
        SMap letters = new SMap();
        List<Integer> tokenLengths = new ArrayList<Integer>();
        SMap marks = new SMap();
        Scheme toScheme = schemes.get(to);

        for (Map.Entry<String, String[]> entry : fromScheme.entrySet()) {
            String group = entry.getKey();
            String[] fromGroup = entry.getValue();
            String[] toGroup = toScheme.get(group);
            if (toGroup == null) {
                continue;
            }
            for (int i = 0; i < fromGroup.length; i++) {
                String F = fromGroup[i];
                String T = toGroup[i];
                String[] alts = alternates.get(F) != null ? alternates.get(F) : new String[] {};

                tokenLengths.add(F.length());
                for (String value : alts) {
                    tokenLengths.add(value.length());
                }

                if (group.equals("vowel_marks") || group.equals("virama")) {
                    marks.put(F,  T);
                    for (String alt : alts) {
                        marks.put(alt, T);
                    }
                } else {
                    letters.put(F, T);
                    for (String alt : alts) {
                        letters.put(alt, T);
                    }
                    if (group.equals("consonants") || group.equals("other")) {
                        consonants.put(F, T);
                        for (String alt : alts) {
                            consonants.put(alt, T);
                        }
                    }
                }
            }
        }

        TMap map = new TMap();
        map.consonants = consonants;
        map.fromRoman = isRomanScheme(from);
        map.letters = letters;
        map.marks = marks;
        map.maxTokenLength = Collections.max(tokenLengths);
        map.toRoman = isRomanScheme(to);
        map.virama = toScheme.get("virama");

        return map;
    }

    /**
     * Transliterate from a romanized script.
     *
     * @param data     the string to transliterate
     * @param map      map data generated from makeMap()
     * @param options  transliteration options
     * @return         the finished string
     */
    private String transliterateRoman(String data, TMap map, Options options) {
        StringBuilder buf = new StringBuilder();
        SMap consonants = map.consonants;
        int dataLength = data.length();
        boolean hadConsonant = false;
        SMap letters = map.letters;
        SMap marks = map.marks;
        int maxTokenLength = map.maxTokenLength;
        Boolean optSkipSGML = (Boolean) options.get("skip_sgml");
        Boolean optSyncope = (Boolean) options.get("syncope");
        String tempLetter;
        String tempMark;
        StringBuilder tokenBuffer = new StringBuilder();
        boolean toRoman = map.toRoman;
        String[] virama = map.virama;

        // Transliteration state. It's controlled by these values:
        // - `skippingSGML`: are we in SGML?
        // - `toggledTrans`: are we in a toggled region?
        //
        // We combine these values into a single variable `skippingTrans`:
        //
        //     `skippingTrans` = skippingSGML || toggledTrans;
        //
        // If (and only if) this value is true, don't transliterate.
        boolean skippingSGML = false;
        boolean skippingTrans = false;
        boolean toggledTrans = false;

        for (int i = 0; (i < dataLength) || (tokenBuffer.length() > 0); i++) {
            // Fill the token buffer, if possible.
            int difference = maxTokenLength - tokenBuffer.length();
            if (difference > 0 && i < dataLength) {
                tokenBuffer.append(data.charAt(i));
                if (difference > 1) {
                    continue;
                }
            }

            // Match all token substrings to our map.
            for (int j = 0; j < maxTokenLength; j++) {
                String token = tokenBuffer.substring(0, Math.min(maxTokenLength - j, tokenBuffer.length()));

                if (skippingSGML) {
                    skippingSGML = !token.equals(">");
                } else if (token.equals("<")) {
                    skippingSGML = optSkipSGML;
                } else if (token.equals("##")) {
                    toggledTrans = !toggledTrans;
                    tokenBuffer = tokenBuffer.delete(0, 2);
                    break;
                }
                skippingTrans = skippingSGML || toggledTrans;
                if (((tempLetter = letters.get(token)) != null) && !skippingTrans) {
                    if (toRoman) {
                        buf.append(tempLetter);
                    } else {
                        // Handle the implicit vowel. Ignore 'a' and force
                        // vowels to appear as marks if we've just seen a
                        // consonant.
                        if (hadConsonant) {
                            if ((tempMark = marks.get(token)) != null) {
                                buf.append(tempMark);
                            } else if (!token.equals("a")) {
                                buf.append(virama[0]);
                                buf.append(tempLetter);
                            }
                        } else {
                            buf.append(tempLetter);
                        }
                        hadConsonant = consonants.get(token) != null;
                    }
                    tokenBuffer = tokenBuffer.delete(0, maxTokenLength - j);
                    break;
                } else if (j == maxTokenLength - 1) {
                    if (hadConsonant) {
                        hadConsonant = false;
                        if (!optSyncope) {
                            buf.append(virama[0]);
                        }
                    }
                    buf.append(token);
                    tokenBuffer = tokenBuffer.delete(0, 1);
                    // 'break' is redundant here, "j == ..." is true only on
                    // the last iteration.
                }
            }
        }
        if (hadConsonant && !optSyncope) {
            buf.append(virama[0]);
        }
        return buf.toString();
    }

    /**
     * Transliterate from a Brahmic script.
     *
     * @param data     the string to transliterate
     * @param map      map data generated from makeMap()
     * @param options  transliteration options
     * @return         the finished string
     */
    private String transliterateBrahmic(String data, TMap map, Options options) {
        StringBuilder buf = new StringBuilder();
        SMap consonants = map.consonants;
        boolean danglingHash = false;
        boolean hadRomanConsonant = false;
        SMap letters = map.letters;
        SMap marks = map.marks;
        String temp;
        boolean toRoman = map.toRoman;
        boolean skippingTrans = false;

        for (int i = 0; i < data.length(); i++) {
            String L = Character.toString(data.charAt(i));
            // Toggle transliteration state
            if (L.equals("#")) {
                if (danglingHash) {
                    skippingTrans = !skippingTrans;
                    danglingHash = false;
                } else {
                    danglingHash = true;
                }
                if (hadRomanConsonant) {
                    buf.append('a');
                    hadRomanConsonant = false;
                }
                continue;
            } else if (skippingTrans) {
                buf.append(L);
                continue;
            }

            if ((temp = marks.get(L)) != null) {
                buf.append(temp);
                hadRomanConsonant = false;
            } else {
                if (danglingHash) {
                    buf.append('#');
                    danglingHash = false;
                }
                if (hadRomanConsonant) {
                    buf.append('a');
                    hadRomanConsonant = false;
                }

                // Push transliterated letter if possible. Otherwise, push
                // the letter itself.
                if ((temp = letters.get(L)) != null && !temp.equals("")) {
                    buf.append(temp);
                    hadRomanConsonant = toRoman && (consonants.get(L) != null);
                } else {
                    buf.append(L);
                }
            }
        }
        if (hadRomanConsonant) {
            buf.append('a');
        }
        return buf.toString();
    }

    /**
     * Transliterate from one script to another.
     *
     * @param data     the string to transliterate
     * @param from     the source script
     * @param to       the destination script
     * @param options  transliteration options
     * @return         the finished string
     */
    public String t(String data, String from, String to, Options options) {
        if (options == null) {
            options = new HashOptions();
        }
        Options cachedOptions = cache.options != null ? cache.options : new HashOptions();
        boolean hasPriorState = (cache.from != null && cache.from.equals(from) && cache.to != null && cache.to.equals(to));
        TMap map;

        // Here we simultaneously build up an `options` object and compare
        // these options to the options from the last run.
        for (Map.Entry<String, Object> entry : defaults.entrySet()) {
            String key = entry.getKey();
            Object value = entry.getValue();
                if (options.get(key) != null) {
                    value = options.get(key);
                }
                options.put(key, value);

                // This comparison method is not generalizable, but since these
                // objects are associative arrays with identical keys and with
                // values of known type, it works fine here.
                if (!value.equals(cachedOptions.get(key))) {
                    hasPriorState = false;
                }
        }

        if (hasPriorState) {
            map = cache.map;
        } else {
            map = makeMap(from, to, options);
            cache.from = from;
            cache.map = map;
            cache.options = options;
            cache.to = to;
        }

        // Easy way out for "{\m+}", "\", and ".h".
        if (from.equals("itrans")) {
            data = data.replaceAll("\\{\\\\m\\+\\}", ".h.N");
            data = data.replaceAll("\\.h", "");
            data = data.replaceAll("\\\\([^'`_]|$)", "##$1##");
        }

        if (map.fromRoman) {
            return transliterateRoman(data, map, options);
        } else {
            return transliterateBrahmic(data, map, options);
        }
    }

    // Version of t() that supplies null options.
    public String t(String data, String from, String to) {
        return t(data, from, to, null);
    }
}
