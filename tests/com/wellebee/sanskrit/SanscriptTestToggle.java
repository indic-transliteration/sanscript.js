package com.wellebee.sanskrit;

import org.junit.Test;

public class SanscriptTestToggle extends SanscriptTest {
    @Test
    public void testHarvardKyoto() {
        TransHelper f = transHelper("hk", "devanagari");
        f.run("akSa##kSa##ra", "अक्षkSaर", "Basic disable");
        f.run("##akSa##kSa##ra", "akSaक्षra", "Initial disable");
        f.run("akSa##ra##", "अक्षra", "Final disable 1");
        f.run("akSa##ra", "अक्षra", "Final disable 2");
        f.run("akSa##kSa##ra####", "अक्षkSaर", "Redundant disable 1");
        f.run("a####kSara", "अक्षर", "Redundant disable 2");
        f.run("a#kSara", "अ#क्षर", "Misleading disable");
    }
    @Test
    public void testDevanagari() {
        TransHelper f = transHelper("devanagari", "hk");
        f.run("अ##क्ष##र", "aक्षra", "Basic disable");
        f.run("##अ##क्षर", "अkSara", "Initial disable");
        f.run("अक्ष##र##", "akSaर", "Final disable 1");
        f.run("अक्ष##र", "akSaर", "Final disable 2");
        f.run("अक्ष##र####", "akSaर", "Redundant disable 1");
        f.run("अ####क्षर", "akSara", "Redundant disable 2");
        f.run("अ#क्षर", "a#kSara", "Misleading disable");
    }
}
