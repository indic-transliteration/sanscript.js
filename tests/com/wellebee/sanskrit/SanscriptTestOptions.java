package com.wellebee.sanskrit;

import org.junit.Test;

public class SanscriptTestOptions extends SanscriptTest {
    @Test
    public void testHindiStyleTransliteration() {
        Sanscript.Options options = new Sanscript.HashOptions();
        options.put("syncope", true);
        TransHelper f = transHelper("itrans", "devanagari", options);
        f.run("karaN", "करण", "");
        f.run("rAj ke lie", "राज के लिए", "");
    }

    @Test
    public void testSkippingSGML() {
        Sanscript.Options options1 = new Sanscript.HashOptions();
        Sanscript.Options options2 = new Sanscript.HashOptions();
        options1.put("skip_sgml", false);
        options2.put("skip_sgml", true);
        TransHelper f1 = transHelper("hk", "devanagari");
        TransHelper f2 = transHelper("hk", "devanagari", options1);
        TransHelper f3 = transHelper("hk", "devanagari", options2);
        f1.run("<p>nara iti</p>", "<प्>नर इति</प्>", "");
        f2.run("<p>nara iti</p>", "<प्>नर इति</प्>", "");
        f3.run("<p>nara iti</p>", "<p>नर इति</p>", "");
        f3.run("##<p>nara iti</p>", "<p>nara iti</p>", "");
    }
}
