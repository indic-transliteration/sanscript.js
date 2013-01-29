<?php
/**
 * Sanscript
 *
 * Sanscript is a Sanskrit transliteration library. Currently, it supports
 * other Indian languages only incidentally.
 *
 * Released under the MIT and GPL Licenses.
 */
class Sanscript {
    // Transliteration option defaults.
    public $defaults;
    // Set of all transliteration schemes.
    public $schemes;
    // Set of names of Roman schemes.
    private $romanSchemes;
    // Map of alternate encodings.
    private $allAlternates;
    // Object cache.
    private $cache;

    private function initializeVariables() {
        $this->defaults = array(
            "skip_sgml" => FALSE,
            "syncope" => FALSE
        );

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
        $this->schemes = array(

            /* Bengali
             * -------
             * 'va' and 'ba' are both rendered as ব.
             */
            "bengali" => array(
                "vowels" => array("অ", "আ", "ই", "ঈ", "উ", "ঊ", "ঋ", "ৠ", "ঌ", "ৡ", "", "এ", "ঐ", "", "ও", "ঔ"),
                "vowel_marks" => array("া", "ি", "ী", "ু", "ূ", "ৃ", "ৄ", "ৢ", "ৣ", "", "ে", "ৈ", "", "ো", "ৌ"),
                "other_marks" => array("ং", "ঃ", "ঁ"),
                "virama" => array("্"),
                "consonants" => array("ক", "খ", "গ", "ঘ", "ঙ", "চ", "ছ", "জ", "ঝ", "ঞ", "ট", "ঠ", "ড", "ঢ", "ণ", "ত", "থ", "দ", "ধ", "ন", "প", "ফ", "ব", "ভ", "ম", "য", "র", "ল", "ব", "শ", "ষ", "স", "হ", "ळ", "ক্ষ", "জ্ঞ"),
                "symbols" => array("০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯", "ॐ", "ঽ", "।", "॥"),
                "other" => array("", "", "", "", "ড", "ঢ", "", "য", "")
            ),

            /* Devanagari
             * ----------
             * The most comprehensive and unambiguous Brahmic script listed.
             */
            "devanagari" => array(
                // "Independent" forms of the vowels. These are used whenever the
                // vowel does not immediately follow a consonant.
                "vowels" => array("अ", "आ", "इ", "ई", "उ", "ऊ", "ऋ", "ॠ", "ऌ", "ॡ", "ऎ", "ए", "ऐ", "ऒ", "ओ", "औ"),

                // "Dependent" forms of the vowels. These are used whenever the
                // vowel immediately follows a consonant. If a letter is not
                // listed in `vowels`, it should not be listed here.
                "vowel_marks" => array("ा", "ि", "ी", "ु", "ू", "ृ", "ॄ", "ॢ", "ॣ", "ॆ", "े", "ै", "ॊ", "ो", "ौ"),

                // Miscellaneous marks, all of which are used in Sanskrit.
                "other_marks" => array("ं", "ः", "ँ"),

                // In syllabic scripts like Devanagari, consonants have an inherent
                // vowel that must be suppressed explicitly. We do so by putting a
                // virama after the consonant.
                "virama" => array("्"),

                // Various Sanskrit consonants and consonant clusters. Every token
                // here has an explicit vowel. Thus "क" is "ka" instead of "k".
                "consonants" => array("क", "ख", "ग", "घ", "ङ", "च", "छ", "ज", "झ", "ञ", "ट", "ठ", "ड", "ढ", "ण", "त", "थ", "द", "ध", "न", "प", "फ", "ब", "भ", "म", "य", "र", "ल", "व", "श", "ष", "स", "ह", "ळ", "क्ष", "ज्ञ"),

                // Numbers and punctuation
                "symbols" => array("०", "१", "२", "३", "४", "५", "६", "७", "८", "९", "ॐ", "ऽ", "।", "॥"),

                // Zero-width joiner. This is used to separate a consonant cluster
                // and avoid a complex ligature.
                "zwj" => json_decode('["\u200D"]'),

                // Dummy consonant. This is used in ITRANS to prevert certain types
                // of parser ambiguity. Thus "barau" -> बरौ but "bara_u" -> बरउ.
                "skip" => array(""),

                // Vedic accent. Udatta and anudatta.
                "accent" => json_decode('["\u0951", "\u0952"]'),

                // Accent combined with anusvara and and visarga. For compatibility
                // with ITRANS, which allows the reverse of these four.
                "combo_accent" => array("ः॑", "ः॒", "ं॑", "ं॒"),

                "candra" => array("ॅ"),

                // Non-Sanskrit consonants
                "other" => array("क़", "ख़", "ग़", "ज़", "ड़", "ढ़", "फ़", "य़", "ऱ")
            ),

            /* Gujarati
             * --------
             * Sanskrit-complete.
             */
            "gujarati" => array(
                "vowels" => array("અ", "આ", "ઇ", "ઈ", "ઉ", "ઊ", "ઋ", "ૠ", "ઌ", "ૡ", "", "એ", "ઐ", "", "ઓ", "ઔ"),
                "vowel_marks" => array("ા", "િ", "ી", "ુ", "ૂ", "ૃ", "ૄ", "ૢ", "ૣ", "", "ે", "ૈ", "", "ો", "ૌ"),
                "other_marks" => array("ં", "ઃ", "ઁ"),
                "virama" => array("્"),
                "consonants" => array("ક", "ખ", "ગ", "ઘ", "ઙ", "ચ", "છ", "જ", "ઝ", "ઞ", "ટ", "ઠ", "ડ", "ઢ", "ણ", "ત", "થ", "દ", "ધ", "ન", "પ", "ફ", "બ", "ભ", "મ", "ય", "ર", "લ", "વ", "શ", "ષ", "સ", "હ", "ળ", "ક્ષ", "જ્ઞ"),
                "symbols" => array("૦", "૧", "૨", "૩", "૪", "૫", "૬", "૭", "૮", "૯", "ૐ", "ઽ", "૤", "૥"),
                "candra" => array("ૅ")
            ),

            /* Gurmukhi
             * --------
             * Missing R/RR/lR/lRR
             */
            "gurmukhi" => array(
                "vowels" => array("ਅ", "ਆ", "ਇ", "ਈ", "ਉ", "ਊ", "", "", "", "", "", "ਏ", "ਐ", "", "ਓ", "ਔ"),
                "vowel_marks" => array("ਾ", "ਿ", "ੀ", "ੁ", "ੂ", "", "", "", "", "", "ੇ", "ੈ", "", "ੋ", "ੌ"),
                "other_marks" => array("ਂ", "ਃ", "ਁ"),
                "virama" => array("੍"),
                "consonants" => array("ਕ", "ਖ", "ਗ", "ਘ", "ਙ", "ਚ", "ਛ", "ਜ", "ਝ", "ਞ", "ਟ", "ਠ", "ਡ", "ਢ", "ਣ", "ਤ", "ਥ", "ਦ", "ਧ", "ਨ", "ਪ", "ਫ", "ਬ", "ਭ", "ਮ", "ਯ", "ਰ", "ਲ", "ਵ", "ਸ਼", "ਸ਼", "ਸ", "ਹ", "ਲ਼", "ਕ੍ਸ਼", "ਜ੍ਞ"),
                "symbols" => array("੦", "੧", "੨", "੩", "੪", "੫", "੬", "੭", "੮", "੯", "ॐ", "ऽ", "।", "॥"),
                "other" => array("", "ਖ", "ਗ", "ਜ", "ਡ", "", "ਫ", "", "")
            ),

            /* Kannada
             * -------
             * Sanskrit-complete.
             */
            "kannada" => array(
                "vowels" => array("ಅ", "ಆ", "ಇ", "ಈ", "ಉ", "ಊ", "ಋ", "ೠ", "ಌ", "ೡ", "ಎ", "ಏ", "ಐ", "ಒ", "ಓ", "ಔ"),
                "vowel_marks" => array("ಾ", "ಿ", "ೀ", "ು", "ೂ", "ೃ", "ೄ", "ೢ", "ೣ", "ೆ", "ೇ", "ೈ", "ೊ", "ೋ", "ೌ"),
                "other_marks" => array("ಂ", "ಃ", "ँ"),
                "virama" => array("್"),
                "consonants" => array("ಕ", "ಖ", "ಗ", "ಘ", "ಙ", "ಚ", "ಛ", "ಜ", "ಝ", "ಞ", "ಟ", "ಠ", "ಡ", "ಢ", "ಣ", "ತ", "ಥ", "ದ", "ಧ", "ನ", "ಪ", "ಫ", "ಬ", "ಭ", "ಮ", "ಯ", "ರ", "ಲ", "ವ", "ಶ", "ಷ", "ಸ", "ಹ", "ಳ", "ಕ್ಷ", "ಜ್ಞ"),
                "symbols" => array("೦", "೧", "೨", "೩", "೪", "೫", "೬", "೭", "೮", "೯", "ಓಂ", "ಽ", "।", "॥"),
                "other" => array("", "", "", "", "", "", "ಫ", "", "ಱ")
            ),

            /* Malayalam
             * ---------
             * Sanskrit-complete.
             */
            "malayalam" => array(
                "vowels" => array("അ", "ആ", "ഇ", "ഈ", "ഉ", "ഊ", "ഋ", "ൠ", "ഌ", "ൡ", "എ", "ഏ", "ഐ", "ഒ", "ഓ", "ഔ"),
                "vowel_marks" => array("ാ", "ി", "ീ", "ു", "ൂ", "ൃ", "ൄ", "ൢ", "ൣ", "െ", "േ", "ൈ", "ൊ", "ോ", "ൌ"),
                "other_marks" => array("ം", "ഃ", "ँ"),
                "virama" => array("്"),
                "consonants" => array("ക", "ഖ", "ഗ", "ഘ", "ങ", "ച", "ഛ", "ജ", "ഝ", "ഞ", "ട", "ഠ", "ഡ", "ഢ", "ണ", "ത", "ഥ", "ദ", "ധ", "ന", "പ", "ഫ", "ബ", "ഭ", "മ", "യ", "ര", "ല", "വ", "ശ", "ഷ", "സ", "ഹ", "ള", "ക്ഷ", "ജ്ഞ"),
                "symbols" => array("൦", "൧", "൨", "൩", "൪", "൫", "൬", "൭", "൮", "൯", "ഓം", "ഽ", "।", "॥"),
                "other" => array("", "", "", "", "", "", "", "", "റ")
            ),

            /* Oriya
             * -----
             * Missing lR/lRR vowel marks
             */
            "oriya" => array(
                "vowels" => array("ଅ", "ଆ", "ଇ", "ଈ", "ଉ", "ଊ", "ଋ", "ୠ", "ଌ", "ୡ", "", "ଏ", "ଐ", "", "ଓ", "ଔ"),
                "vowel_marks" => array("ା", "ି", "ୀ", "ୁ", "ୂ", "ୃ", "ୄ", "", "", "", "େ", "ୈ", "", "ୋ", "ୌ"),
                "other_marks" => array("ଂ", "ଃ", "ଁ"),
                "virama" => array("୍"),
                "consonants" => array("କ", "ଖ", "ଗ", "ଘ", "ଙ", "ଚ", "ଛ", "ଜ", "ଝ", "ଞ", "ଟ", "ଠ", "ଡ", "ଢ", "ଣ", "ତ", "ଥ", "ଦ", "ଧ", "ନ", "ପ", "ଫ", "ବ", "ଭ", "ମ", "ଯ", "ର", "ଲ", "ଵ", "ଶ", "ଷ", "ସ", "ହ", "ଳ", "କ୍ଷ", "ଜ୍ଞ"),
                "symbols" => array("୦", "୧", "୨", "୩", "୪", "୫", "୬", "୭", "୮", "୯", "ଓଂ", "ଽ", "।", "॥"),
                "other" => array("", "", "", "", "ଡ", "ଢ", "", "ଯ", "")
            ),

            /* Tamil
             * -----
             * Missing R/RR/lR/lRR vowel marks and voice/aspiration distinctions.
             * The most incomplete of the Sanskrit schemes here.
             */
            "tamil" => array(
                "vowels" => array("அ", "ஆ", "இ", "ஈ", "உ", "ஊ", "", "", "", "", "எ", "ஏ", "ஐ", "ஒ", "ஓ", "ஔ"),
                "vowel_marks" => array("ா", "ி", "ீ", "ு", "ூ", "", "", "", "", "ெ", "ே", "ை", "ொ", "ோ", "ௌ"),
                "other_marks" => array("ஂ", "ஃ", ""),
                "virama" => array("்"),
                "consonants" => array("க", "க", "க", "க", "ங", "ச", "ச", "ஜ", "ச", "ஞ", "ட", "ட", "ட", "ட", "ண", "த", "த", "த", "த", "ந", "ப", "ப", "ப", "ப", "ம", "ய", "ர", "ல", "வ", "ஶ", "ஷ", "ஸ", "ஹ", "ள", "க்ஷ", "ஜ்ஞ"),
                "symbols" => array("௦", "௧", "௨", "௩", "௪", "௫", "௬", "௭", "௮", "௯", "ௐ", "ऽ", "।", "॥"),
                "other" => array("", "", "", "", "", "", "", "", "ற")
            ),

            /* Telugu
             * ------
             * Sanskrit-complete.
             */
            "telugu" => array(
                "vowels" => array("అ", "ఆ", "ఇ", "ఈ", "ఉ", "ఊ", "ఋ", "ౠ", "ఌ", "ౡ", "ఎ", "ఏ", "ఐ", "ఒ", "ఓ", "ఔ"),
                "vowel_marks" => array("ా", "ి", "ీ", "ు", "ూ", "ృ", "ౄ", "ౢ", "ౣ", "ె", "ే", "ై", "ొ", "ో", "ౌ"),
                "other_marks" => array("ం", "ః", "ఁ"),
                "virama" => array("్"),
                "consonants" => array("క", "ఖ", "గ", "ఘ", "ఙ", "చ", "ఛ", "జ", "ఝ", "ఞ", "ట", "ఠ", "డ", "ఢ", "ణ", "త", "థ", "ద", "ధ", "న", "ప", "ఫ", "బ", "భ", "మ", "య", "ర", "ల", "వ", "శ", "ష", "స", "హ", "ళ", "క్ష", "జ్ఞ"),
                "symbols" => array("౦", "౧", "౨", "౩", "౪", "౫", "౬", "౭", "౮", "౯", "ఓం", "ఽ", "।", "॥"),
                "other" => array("", "", "", "", "", "", "", "", "ఱ")
            ),

            /* International Alphabet of Sanskrit Transliteration
             * --------------------------------------------------
             * The most "professional" Sanskrit romanization scheme.
             */
            "iast" => array(
                "vowels" => array("a", "ā", "i", "ī", "u", "ū", "ṛ", "ṝ", "ḷ", "ḹ", "", "e", "ai", "", "o", "au"),
                "other_marks" => array("ṃ", "ḥ", "~"),
                "virama" => array(""),
                "consonants" => array("k", "kh", "g", "gh", "ṅ", "c", "ch", "j", "jh", "ñ", "ṭ", "ṭh", "ḍ", "ḍh", "ṇ", "t", "th", "d", "dh", "n", "p", "ph", "b", "bh", "m", "y", "r", "l", "v", "ś", "ṣ", "s", "h", "ḻ", "kṣ", "jñ"),
                "symbols" => array("0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "oṃ", "'", "।", "॥")
            ),

            /* ITRANS
             * ------
             * One of the first romanization schemes -- and one of the most
             * complicated. For alternate forms, see the "allAlternates" variable
             * below.
             *
             * '_' is a "null" letter, which allows adjacent vowels.
             */
            "itrans" => array(
                "vowels" => array("a", "A", "i", "I", "u", "U", "RRi", "RRI", "LLi", "LLI", "", "e", "ai", "", "o", "au"),
                "other_marks" => array("M", "H", ".N"),
                "virama" => array(""),
                "consonants" => array("k", "kh", "g", "gh", "~N", "ch", "Ch", "j", "jh", "~n", "T", "Th", "D", "Dh", "N", "t", "th", "d", "dh", "n", "p", "ph", "b", "bh", "m", "y", "r", "l", "v", "sh", "Sh", "s", "h", "L", "kSh", "j~n"),
                "symbols" => array("0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "OM", ".a", "|", "||"),
                "candra" => array(".c"),
                "zwj" => array("{}"),
                "skip" => "_",
                "accent" => array("\\'", "\\_"),
                "combo_accent" => array("\\'H", "\\_H", "\\'M", "\\_M"),
                "other" => array("q", "K", "G", "z", ".D", ".Dh", "f", "Y", "R")
            ),

            /* Harvard-Kyoto
             * -------------
             * A simple 1:1 mapping.
             */
            "hk" => array(
                "vowels" => array("a", "A", "i", "I", "u", "U", "R", "RR", "lR", "lRR", "", "e", "ai", "", "o", "au"),
                "other_marks" => array("M", "H", "~",),
                "virama" => array(""),
                "consonants" => array("k", "kh", "g", "gh", "G", "c", "ch", "j", "jh", "J", "T", "Th", "D", "Dh", "N", "t", "th", "d", "dh", "n", "p", "ph", "b", "bh", "m", "y", "r", "l", "v", "z", "S", "s", "h", "L", "kS", "jJ"),
                "symbols" => array("0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "OM", "'", "|", "||")
            ),

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
            "slp1" => array(
                "vowels" => array("a", "A", "i", "I", "u", "U", "f", "F", "x", "X", "", "e", "E", "", "o", "O"),
                "other_marks" => array("M", "H", "~"),
                "virama" => array(""),
                "consonants" => array("k", "K", "g", "G", "N", "c", "C", "j", "J", "Y", "w", "W", "q", "Q", "R", "t", "T", "d", "D", "n", "p", "P", "b", "B", "m", "y", "r", "l", "v", "S", "z", "s", "h", "L", "kz", "jY"),
                "symbols" => array("0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "oM", "'", ".", "..")
            ),

            /* Velthuis
             * --------
             * A case-insensitive Sanskrit encoding.
             */
            "velthuis" => array(
                "vowels" => array("a", "aa", "i", "ii", "u", "uu", ".r", ".rr", ".li", ".ll", "", "e", "ai", "", "o", "au"),
                "other_marks" => array(".m", ".h", ""),
                "virama" => array(""),
                "consonants" => array("k", "kh", "g", "gh", "\"n", "c", "ch", "j", "jh", "~n", ".t", ".th", ".d", ".d", ".n", "t", "th", "d", "dh", "n", "p", "ph", "b", "bh", "m", "y", "r", "l", "v", "~s", ".s", "s", "h", "L", "k.s", "j~n"),
                "symbols" => array("0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "o.m", "'", "|", "||")
            ),

            /* WX
             * --
             * As terse as SLP1.
             */
            "wx" => array(
                "vowels" => array("a", "A", "i", "I", "u", "U", "q", "Q", "L", "", "", "e", "E", "", "o", "O"),
                "other_marks" => array("M", "H", "z"),
                "virama" => array(""),
                "consonants" => array("k", "K", "g", "G", "f", "c", "C", "j", "J", "F", "t", "T", "d", "D", "N", "w", "W", "x", "X", "n", "p", "P", "b", "B", "m", "y", "r", "l", "v", "S", "R", "s", "h", "", "kR", "jF"),
                "symbols" => array("0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "oM", "'", "|", "||")
            ),
        );

        $this->romanSchemes = array();

        $this->allAlternates = array(
            "itrans" => array(
                "A" => array("aa"),
                "I" => array("ii", "ee"),
                "U" => array("uu", "oo"),
                "RRi" => array("R^i"),
                "RRI" => array("R^I"),
                "LLi" => array("L^i"),
                "LLI" => array("L^I"),
                "M" => array(".m", ".n"),
                "~N" => array("N^"),
                "ch" => array("c"),
                "Ch" => array("C", "chh"),
                "~n" => array("JN"),
                "v" => array("w"),
                "Sh" => array("S", "shh"),
                "kSh" => array("kS", "x"),
                "j~n" => array("GY", "dny"),
                "OM" => array("AUM"),
                "\\_" => array("\\`"),
                "\\_H" => array("\\`H"),
                "\\'M" => array("\\'.m", "\\'.n"),
                "\\_M" => array("\\_.m", "\\_.n", "\\`M", "\\`.m", "\\`.n"),
                ".a" => array("~"),
                "|" => array("."),
                "||" => array(".."),
                "z" => array("J")
            )
        );

        $this->cache = array();
    }

    function __construct () {
        $this->initializeVariables();
        $this->setUpSchemes();
    }

    /**
     * Check whether the given scheme encodes romanized Sanskrit.
     *
     * @param name  the scheme name
     * @return      boolean
     */
    public function isRomanScheme($name) {
        return isset($this->romanSchemes[$name]);
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
    public function addBrahmicScheme($name, &$scheme) {
        $this->schemes[$name] = $scheme;
    }

    /**
     * Add a roman scheme to Sanscript.
     *
     * See the comments on Sanscript.addBrahmicScheme. The "vowel_marks" field
     * can be omitted.
     *
     * @param name    the scheme name
     * @param scheme  the scheme data itself
     */
    public function addRomanScheme($name, &$scheme) {
        if (!isset($scheme['vowel_marks'])) {
            $scheme['vowel_marks'] = array_slice($scheme['vowels'], 1);
        }
        $this->schemes[$name] = $scheme;
        $this->romanSchemes[$name] = TRUE;
    }

    /**
     * Create a deep copy of an object, for certain kinds of objects.
     *
     * @param scheme  the scheme to copy
     * @return        the copy
     */
    private function cheapCopy(&$scheme) {
        $copy = array();
        foreach ($scheme as $key => $value) {
            // PHP assignment automatically copies array $value.
            // @see http://us2.php.net/manual/en/language.types.array.php
            $copy[$key] = $value;
        }
        return $copy;
    }

    // Set up various schemes
    private function setUpSchemes() {
        // Set up roman schemes
        $kolkata = $this->cheapCopy($this->schemes['iast']);
        $kolkata['vowels'] = array("a", "ā", "i", "ī", "u", "ū", "ṛ", "ṝ", "ḷ", "ḹ", "e", "ē", "ai", "o", "ō", "au");
        $this->schemes['kolkata'] = &$kolkata;

        $schemeNames = array("iast", "itrans", "hk", "kolkata", "slp1", "velthuis", "wx");
        // These schemes already belong to $schemes. But by adding
        // them again with `addRomanScheme`, we automatically build up
        // `romanSchemes` and define a `vowel_marks` field for each one.
        foreach ($schemeNames as $name) {
            $this->addRomanScheme($name, $this->schemes[$name]);
        }

        // ITRANS variant, which supports Dravidian short 'e' and 'o'.
        $itrans_dravidian = $this->cheapCopy($this->schemes['itrans']);
        $itrans_dravidian['vowels'] = array("a", "A", "i", "I", "u", "U", "Ri", "RRI", "LLi", "LLi", "e", "E", "ai", "o", "O", "au");
        $itrans_dravidian['vowel_marks'] = array_slice($itrans_dravidian['vowels'], 1);
        $this->allAlternates['itrans_dravidian'] = $this->allAlternates['itrans'];
        $this->addRomanScheme('itrans_dravidian', $itrans_dravidian);
    }

    /**
     * Create a map from every character in `from` to its partner in `to`.
     * Also, store any "marks" that `from` might have.
     *
     * @param from     input scheme
     * @param to       output scheme
     * @param options  scheme options
     */
    private function makeMap($from, $to, &$options) {
        $alternates = isset($this->allAlternates[$from]) ? $this->allAlternates[$from] : array();
        $consonants = array();
        $fromScheme = &$this->schemes[$from];
        $letters = array();
        $tokenLengths = array();
        $marks = array();
        $toScheme = &$this->schemes[$to];

        foreach ($fromScheme as $group => &$fromGroup) {
            if (!isset($toScheme[$group])) {
                continue;
            }
            $toGroup = &$toScheme[$group];
            for ($i = 0; $i < count($fromGroup); $i++) {
                $F = $fromGroup[$i];
                if ($F !== '') {
                    $T = $toGroup[$i];
                    $alts = isset($alternates[$F]) ? $alternates[$F] : array();

                    $tokenLengths[] = mb_strlen($F, 'UTF-8');
                    foreach ($alts as $alt) {
                        $tokenLengths[] = mb_strlen($alt, 'UTF-8');
                    }

                    if ($group === 'vowel_marks' || $group === 'virama') {
                        $marks[$F] = $T;
                        foreach ($alts as $alt) {
                            $marks[$alt] = $T;
                        }
                    } else {
                        $letters[$F] = $T;
                        foreach ($alts as $alt) {
                            $letters[$alt] = $T;
                        }
                        if ($group === 'consonants' || $group === 'other') {
                            $consonants[$F] = $T;
                            foreach ($alts as $alt) {
                                $consonants[$alt] = $T;
                            }
                        }
                    }
                }
            }
        }

        return array(
            "consonants" => $consonants,
            "fromRoman" => $this->isRomanScheme($from),
            "letters" => $letters,
            "marks" => $marks,
            "maxTokenLength" => max($tokenLengths),
            "toRoman" => $this->isRomanScheme($to),
            "virama" => $toScheme['virama'][0],
        );
    }

    /**
     * Transliterate from a romanized script.
     *
     * @param data     the string to transliterate
     * @param map      map data generated from makeMap()
     * @param options  transliteration options
     * @return         the finished string
     */
    private function transliterateRoman($data, &$map, &$options) {
        $buf = array();
        $consonants = &$map['consonants'];
        $hadConsonant = FALSE;
        $letters = &$map['letters'];
        $marks = &$map['marks'];
        $maxTokenLength = &$map['maxTokenLength'];
        $optSyncope = $options['syncope'];
        $tokenBuffer = '';
        $toRoman = &$map['toRoman'];
        $transliterationEnabled = TRUE;
        $virama = &$map['virama'];
        $dataChars = preg_split('//u', $data, -1, PREG_SPLIT_NO_EMPTY);
        $dataLength = count($dataChars);

        for ($i = 0; (($i < $dataLength) && (($L = $dataChars[$i]) || TRUE)) || $tokenBuffer; $i++) {
            // Fill the token buffer, if possible.
            $difference = $maxTokenLength - mb_strlen($tokenBuffer, 'UTF-8');
            if ($difference > 0 && $i < $dataLength) {
                $tokenBuffer .= $L;
                if ($difference > 1) {
                    continue;
                }
            }

            // Match all token substrings to our map.
            for ($j = 0; $j < $maxTokenLength; $j++) {
                $token = mb_substr_fixed($tokenBuffer, 0, $maxTokenLength - $j, 'UTF-8');

                if ($token === '##') {
                    $transliterationEnabled = !$transliterationEnabled;
                    $tokenBuffer = mb_substr_fixed($tokenBuffer, 2, NULL, 'UTF-8');
                    break;
                }
                if (isset($letters[$token]) && $transliterationEnabled) {
                    if ($toRoman) {
                      $buf[] = $letters[$token];
                    } else {
                        // Handle the implicit vowel. Ignore 'a' and force
                        // vowels to appear as marks if we've just seen a
                        // consonant.
                        if ($hadConsonant) {
                            if (isset($marks[$token])) {
                                $buf[] = $marks[$token];
                            } else if ($token !== 'a') {
                                $buf[] = $virama;
                                $buf[] = $letters[$token];
                            }
                        } else {
                            $buf[] = $letters[$token];
                        }
                        $hadConsonant = isset($consonants[$token]);
                    }
                    $tokenBuffer = mb_substr_fixed($tokenBuffer, $maxTokenLength - $j, NULL, 'UTF-8');
                    break;
                } else if ($j === $maxTokenLength - 1) {
                    if ($hadConsonant) {
                        $hadConsonant = FALSE;
                        if (!$optSyncope) {
                            $buf[] = $virama;
                        }
                    }
                    $buf[] = $token;
                    $tokenBuffer = mb_substr_fixed($tokenBuffer, 1, NULL, 'UTF-8');
                    // 'break' is redundant here, "$j == ..." is true only on
                    // the last iteration.
                }
            }
        }
        if ($hadConsonant && !$optSyncope) {
            $buf[] = $virama;
        }
        return implode($buf);
    }

    /**
     * Transliterate from a Brahmic script.
     *
     * @param data     the string to transliterate
     * @param map      map data generated from makeMap()
     * @param options  transliteration options
     * @return         the finished string
     */
    private function transliterateBrahmic($data, &$map, &$options) {
        $buf = array();
        $consonants = &$map['consonants'];
        $danglingHash = FALSE;
        $hadRomanConsonant = FALSE;
        $letters = &$map['letters'];
        $marks = &$map['marks'];
        $toRoman = &$map['toRoman'];
        $transliterationEnabled = TRUE;
        $dataChars = preg_split('//u', $data, -1, PREG_SPLIT_NO_EMPTY);

        foreach ($dataChars as $L) {
            // Toggle transliteration state
            if ($L === '#') {
                if ($danglingHash) {
                    $transliterationEnabled = !$transliterationEnabled;
                    $danglingHash = FALSE;
                } else {
                    $danglingHash = TRUE;
                }
                if ($hadRomanConsonant) {
                    $buf[] = 'a';
                    $hadRomanConsonant = FALSE;
                }
                continue;
            } else if (!$transliterationEnabled) {
                $buf[] = $L;
                continue;
            }

            if (isset($marks[$L])) {
                $buf[] = $marks[$L];
                $hadRomanConsonant = FALSE;
            } else {
                if ($danglingHash) {
                    $buf[] = '#';
                    $danglingHash = FALSE;
                }
                if ($hadRomanConsonant) {
                    $buf[] = 'a';
                    $hadRomanConsonant = FALSE;
                }

                // Push transliterated letter if possible. Otherwise, push
                // the letter itself.
                if (isset($letters[$L]) && $letters[$L] !== '') {
                    $buf[] = $letters[$L];
                    $hadRomanConsonant = $toRoman && isset($consonants[$L]);
                } else {
                    $buf[] = $L;
                }
            }
        }
        if ($hadRomanConsonant) {
            $buf[] = 'a';
        }
        return implode($buf);
    }

    /**
     * Transliterate from one script to another.
     *
     * @param data     the string to transliterate
     * @param from     the source script
     * @param to       the the destination script
     * @param options  transliteration options
     * @return         the finished string
     */
    public function t($data, $from, $to, $options = NULL) {
        $options = isset($options) ? $options : array();
        $cachedOptions = isset($this->cache['options']) ? $this->cache['options'] : array();
        $defaults = $this->defaults;
        $hasPriorState = (isset($this->cache['from']) && $this->cache['from'] === $from && isset($this->cache['to']) && $this->cache['to'] === $to);
        $map;

        // Here we simultaneously build up an `options` object and compare
        // these options to the options from the last run.
        foreach ($defaults as $key => $value) {
            if (isset($options[$key])) {
                $value = $options[$key];
            }
            $options[$key] = $value;

            // This comparison method is not generalizable, but since these
            // objects are associative arrays with identical keys and with
            // values of known type, it works fine here.
            if (!isset($cachedOptions[$key]) || $value !== $cachedOptions[$key]) {
                $hasPriorState = FALSE;
            }
        }

        if ($hasPriorState) {
            $map = &$this->cache['map'];
        } else {
            $map = &$this->makeMap($from, $to, $options);
            $this->cache = array(
                "from" => $from,
                "map" => $map,
                "options" => $options,
                "to" => $to,
            );
        }

        if ($options['skip_sgml']) {
            $data = preg_replace('/(<.*?>)/u', "##$1##", $data);
        }

        // Easy way out for "{\m+}", "\", and ".h".
        if ($from === 'itrans') {
            $data = preg_replace("/\{\\\m\+\}/u", ".h.N", $data);
            $data = preg_replace("/\.h/u", "", $data);
            $data = preg_replace("/\\\([^'`_]|$)/u", "##$1##", $data);
        }

        if ($map['fromRoman']) {
            return $this->transliterateRoman($data, $map, $options);
        } else {
            return $this->transliterateBrahmic($data, $map, $options);
        }
    }
}

/**
 * Replacement for broken mb_substr() in PHP < 5.4.8.
 *
 * @see http://us.php.net/ChangeLog-5.php
 */
function mb_substr_fixed ($str , $start, $length, $encoding) {
    if (PHP_VERSION_ID <= 50408) {
        return mb_substr($str, $start, is_null($length) ? mb_strlen($str) : $length, $encoding);
    }
    else {
        return mb_substr($str, $start, $length, $encoding);
    }
}
