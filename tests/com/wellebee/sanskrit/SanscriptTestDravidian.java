package com.wellebee.sanskrit;

import org.junit.Test;

public class SanscriptTestDravidian extends SanscriptTest {
    void dravidianTest(String fromScript, String toScript) {
        TransHelper f = transHelper(fromScript, toScript);
        DataSet from = dataSets.get(fromScript);
        DataSet to = dataSets.get(toScript);
        f.run(from.get("short_vowels"), to.get("short_vowels"), "Vowels (forward)");
        f.run(from.get("short_marks"), to.get("short_marks"), "Vowel marks (forward)");
    }

    @Test
    public void testDravidianToKolkata() throws Exception {
        dravidianTest("itrans_dravidian", "kolkata");
    }

    @Test
    public void testDravidianToDevanagari() throws Exception {
        dravidianTest("itrans_dravidian", "devanagari");
    }

    @Test
    public void testDravidianToKannada() throws Exception {
        dravidianTest("itrans_dravidian", "kannada");
    }

    @Test
    public void testDravidianToMalayalam() throws Exception {
        dravidianTest("itrans_dravidian", "malayalam");
    }

    public void testDravidianToTamil() throws Exception {
        dravidianTest("itrans_dravidian", "tamil");
    }

    @Test
    public void testDravidianToTelugu() throws Exception {
        dravidianTest("itrans_dravidian", "telugu");
    }

    @Test
    public void testKolkataToDevanagari() throws Exception {
        dravidianTest("kolkata", "devanagari");
    }
}
