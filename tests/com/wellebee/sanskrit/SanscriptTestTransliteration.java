package com.wellebee.sanskrit;

import org.junit.Test;

public class SanscriptTestTransliteration extends SanscriptTest {
    /* Letter transliteration tests
     * ----------------------------
     * Basic checks on letters and symbols.
     *
     * @param from  the source data
     * @param to    the destination data
     * @param f     the function to use
     */
    protected void letterTests(DataSet from, DataSet to, TransHelper f) {
        f.run(from.get("vowels"), to.get("vowels"), "Vowels");
        f.run(from.get("marks"), to.get("marks"), "Marks");
        f.run(from.get("consonants"), to.get("consonants"), "Stops and nasals");
        f.run(from.get("other"), to.get("other"), "Other consonants");
        f.run(from.get("symbols"), to.get("symbols"), "Symbols and punctuation");
    }

    /* Text transliteration tests
     * --------------------------
     * Basic checks on words and sentences.
     *
     * @param from  the source data
     * @param to    the destination data
     * @param f     the void to use
     */
    protected void textTests(DataSet from, DataSet to, TransHelper f) {
        f.run(from.get("putra"), to.get("putra"), "Single word");
        f.run(from.get("naraIti"), to.get("naraIti"), "Two words, one with explicit vowel");
        f.run(from.get("sentence"), to.get("sentence"), "Basic sentence");
    }

    @Test
    public void testDevanagariToBengali() {
        DataSet from = dataSets.get("devanagari");
        DataSet to = dataSets.get("bengali");
        TransHelper f = transHelper("devanagari", "bengali");
        letterTests(from, to, f);
        textTests(from, to, f);
        f.run("व", "ব", "व transliteration");
        f.run("ब", "ব", "ब transliteration");
    }

    @Test
    public void testDevanagariToHarvardKyoto() {
        DataSet from = dataSets.get("devanagari");
        DataSet to = dataSets.get("hk");
        TransHelper f = transHelper("devanagari", "hk");
        letterTests(from, to, f);
        textTests(from, to, f);

        // Other
        f.run("wwॠww", "wwRRww", "Vowel among other letters");
        f.run("wwकww", "wwkaww", "Consonant among other letters");
    }

    @Test
    public void testDevanagariToGujarati() {
        DataSet from = dataSets.get("devanagari");
        DataSet to = dataSets.get("gujarati");
        TransHelper f = transHelper("devanagari", "gujarati");
        letterTests(from, to, f);
        textTests(from, to, f);
    }

    @Test
    public void testDevanagariToGurmukhi() {
        DataSet from = dataSets.get("devanagari");
        DataSet to = dataSets.get("gurmukhi");
        TransHelper f = transHelper("devanagari", "gurmukhi");
        f.run("अ आ इ ई उ ऊ ए ऐ ओ औ", to.get("vowels"), "Vowels"); // no ऋ/ॠ/ऌ/ॡ
        f.run("क खा गि घी ङु चू टे ठै डो ढौ णं तः थ्", to.get("marks"), "Marks"); // no ऋ/ॠ/ऌ/ॡ
        f.run(from.get("consonants"), to.get("consonants"), "Stops and nasals");
        f.run(from.get("other"), to.get("other"), "Other consonants");
        f.run(from.get("symbols"), to.get("symbols"), "Symbols and punctuation");
        textTests(from, to, f);
    }

    @Test
    public void testDevanagariToKannada() {
        // Letters
        DataSet from = dataSets.get("devanagari");
        DataSet to = dataSets.get("kannada");
        TransHelper f = transHelper("devanagari", "kannada");
        letterTests(from, to, f);
        textTests(from, to, f);
    }

    @Test
    public void testDevanagariToMalayalam() {
        DataSet from = dataSets.get("devanagari");
        DataSet to = dataSets.get("malayalam");
        TransHelper f = transHelper("devanagari", "malayalam");
        letterTests(from, to, f);
        textTests(from, to, f);
    }

    @Test
    public void testDevanagariToOriya() {
        DataSet from = dataSets.get("devanagari");
        DataSet to = dataSets.get("oriya");
        TransHelper f = transHelper("devanagari", "oriya");
        f.run(from.get("vowels"), to.get("vowels"), "Vowels");
        f.run("क खा गि घी ङु चू छृ जॄ टे ठै डो ढौ णं तः थ्", to.get("marks"), "Marks"); // no ऌ or ॡ
        f.run(from.get("consonants"), to.get("consonants"), "Stops and nasals");
        f.run(from.get("other"), to.get("other"), "Other consonants");
        f.run(from.get("symbols"), to.get("symbols"), "Symbols and punctuation");
        textTests(from, to, f);
        textTests(from, to, f);
    }

    @Test
    public void testDevanagariToTelugu() {
        DataSet from = dataSets.get("devanagari");
        DataSet to = dataSets.get("telugu");
        TransHelper f = transHelper("devanagari", "telugu");
        letterTests(from, to, f);
        textTests(from, to, f);
    }

    @Test
    public void testHarvardKyotoToDevanagari() {
        DataSet from = dataSets.get("hk");
        DataSet to = dataSets.get("devanagari");
        TransHelper f = transHelper("hk", "devanagari");
        letterTests(from, to, f);
        textTests(from, to, f);
        f.run("naraxiti", "नरxइति", "Undefined letters");
    }

    @Test
    public void testHarvardKyotoToIAST() {
        DataSet from = dataSets.get("hk");
        DataSet to = dataSets.get("iast");
        TransHelper f = transHelper("hk", "iast");
        letterTests(from, to, f);
        textTests(from, to, f);
        f.run("tAmxiti", "tāmxiti", "Undefined letters");
    }

    @Test
    public void testITRANSToDevanagari() {
        DataSet from = dataSets.get("itrans");
        DataSet to = dataSets.get("devanagari");
        TransHelper f = transHelper("itrans", "devanagari");
        letterTests(from, to, f);
        textTests(from, to, f);
    }

    @Test
    public void testWXToDevanagari() {
        DataSet from = dataSets.get("wx");
        DataSet to = dataSets.get("devanagari");
        TransHelper f = transHelper("wx", "devanagari");
        f.run(from.get("consonants"), to.get("consonants"), "Stops and nasals");
        f.run(from.get("symbols"), to.get("symbols"), "Symbols and punctuation");
        textTests(from, to, f);
    }

    @Test
    public void testTeluguToDevanagari() {
        DataSet from = dataSets.get("telugu");
        DataSet to = dataSets.get("devanagari");
        TransHelper f = transHelper("telugu", "devanagari");
        textTests(from, to, f);
    }

    @Test
    public void testUndefinedLetters() {
        TransHelper f = transHelper("devanagari", "gurmukhi");
        f.run("ऋच्छति", "ऋਚ੍ਛਤਿ", "");
    }
}
