package com.wellebee.sanskrit;

import org.junit.Test;
import static org.junit.Assert.*;

import java.util.HashMap;
import java.util.Map;

public class SanscriptTestSetup extends SanscriptTest {
    @Test
    public void testSchemeDefinitions() {
        // Find the typical lengths of each category. We use Devanagari because it
        // contains every category, including "marks".
        Sanscript.Schemes schemes = sanscript.getSchemes();
        Sanscript.Scheme devanagari = schemes.get("devanagari");
        Map<String, Integer> lengths = new HashMap<String, Integer>();
        for (Map.Entry<String, String[]> entry : devanagari.entrySet()) {
            lengths.put(entry.getKey(), entry.getValue().length);
        }
        for (Map.Entry<String, Sanscript.Scheme> entry : schemes.entrySet()) {
            String name = entry.getKey();
            Sanscript.Scheme scheme = entry.getValue();
            for (Map.Entry<String, String[]> entry1 : scheme.entrySet()) {
                String key = entry1.getKey();
                String[] value = entry1.getValue();
                assertEquals(name + "." + key, (int) lengths.get(key), (int) value.length);
            }
        }
    }

    @Test
    public void testRomanSchemeMembership() {
        // Find the typical lengths of each category. We use Devanagari because it
        // contains every category, including "marks".
        String[] roman = new String[] {"iast", "itrans", "hk", "kolkata", "slp1", "velthuis", "wx"};
        String[] other = new String[] {"bengali", "devanagari", "gujarati", "gurmukhi", "kannada", "malayalam", "oriya", "tamil", "telugu"};

        for (String name : roman) {
            assertTrue(name, sanscript.isRomanScheme(name));
        }
        for (String name : other) {
            assertTrue(name, !sanscript.isRomanScheme(name));
        }
    }

    @Test
    public void testAddingSchemes() {
        Sanscript.Scheme sanskritOCR = new Sanscript.HashScheme();
        sanskritOCR.put("vowels", new String[] {"a", "å", "i", "ï", "u", "÷", "Ÿ", "", "", "", "e", "ai", "o", "au"});
        sanskritOCR.put("consonants", new String[] {"k", "kh", "g", "gh", "¼",
        "c", "ch", "j", "jh", "ñ",
        "¶", "¶h", "·", "·h", "½",
        "t", "th", "d", "dh", "n",
        "p", "ph", "b", "bh", "m",
        "y", "r", "l", "v",
        "¸", "¹", "s", "h",
        "", "k¹", "jñ"});
        sanscript.addRomanScheme("sanskritOCR", sanskritOCR);
        TransHelper f = transHelper("sanskritOCR", "devanagari");
        f.run("bhïma", "भीम", "");
        f.run("narå½åm", "नराणाम्", "");
    }
}
