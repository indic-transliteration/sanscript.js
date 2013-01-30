<?php

include_once './SanscriptBase.php';

class SanscriptSetup extends SanscriptBase {

    public function testSchemeDefinitions() {
        // Find the typical lengths of each category. We use Devanagari because it
        // contains every category, including "marks".
        $schemes = $this->sanscript->schemes;
        $devanagari = &$schemes['devanagari'];
        $lengths = array();
        foreach ($devanagari as $key => $value) {
            $lengths[$key] = count($devanagari[$key]);
        }

        foreach ($schemes as $name => &$scheme) {
            foreach ($scheme as $key => $value) {
                // The virama is distinct from other categories.
                if ($key !== 'virama') {
                    $this->assertEquals($lengths[$key], count($value), $name . "." . $key);
                }
            }
        }
    }

    public function testRomanSchemeMembership() {
        // Find the typical lengths of each category. We use Devanagari because it
        // contains every category, including "marks".
        $sanscript = $this->sanscript;
        $roman = array('iast', 'itrans', 'hk', 'kolkata', 'slp1', 'velthuis', 'wx');
        $other = array('bengali', 'devanagari', 'gujarati', 'gurmukhi', 'kannada', 'malayalam', 'oriya', 'tamil', 'telugu');

        foreach ($roman as $name) {
            $this->assertTrue($sanscript->isRomanScheme($name), $name);
        }
        foreach ($other as $name) {
            $this->assertTrue(!$sanscript->isRomanScheme($name), $name);
        }
    }

    public function testAddingSchemes() {
        $sanscript = $this->sanscript;
        $sanskritOCR = array(
            "vowels" => array("a", "å", "i", "ï", "u", "÷", "Ÿ", "", "", "", "e", "ai", "o", "au"),
            "consonants" => array("k", "kh", "g", "gh", "¼",
                "c", "ch", "j", "jh", "ñ",
                "¶", "¶h", "·", "·h", "½",
                "t", "th", "d", "dh", "n",
                "p", "ph", "b", "bh", "m",
                "y", "r", "l", "v",
                "¸", "¹", "s", "h",
                "", "k¹", "jñ"),
        );
        $sanscript->addRomanScheme('sanskritOCR', $sanskritOCR);
        $f = $this->transHelper('sanskritOCR', 'devanagari');
        $f('bhïma', 'भीम');
        $f('narå½åm', 'नराणाम्');
    }
}
