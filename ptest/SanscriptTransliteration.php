<?php

include_once './SanscriptBase.php';

class SanscriptTransliteration extends SanscriptBase {

    /* Letter transliteration tests
     * ----------------------------
     * Basic checks on letters and symbols.
     *
     * @param from  the source data
     * @param to    the destination data
     * @param f     the function to use
     */
    protected function letterTests(&$from, &$to, $f) {
        $f($from['vowels'], $to['vowels'], 'Vowels');
        $f($from['marks'], $to['marks'], 'Marks');
        $f($from['consonants'], $to['consonants'], 'Stops and nasals');
        $f($from['other'], $to['other'], 'Other consonants');
        $f($from['symbols'], $to['symbols'], 'Symbols and punctuation');
    }

    /* Text transliteration tests
     * --------------------------
     * Basic checks on words and sentences.
     *
     * @param from  the source data
     * @param to    the destination data
     * @param f     the function to use
     */
    protected function textTests(&$from, &$to, $f) {
        $f($from['putra'], $to['putra'], 'Single word');
        $f($from['naraIti'], $to['naraIti'], 'Two words, one with explicit vowel');
        $f($from['sentence'], $to['sentence'], 'Basic sentence');
    }

    public function testDevanagariToBengali() {
        $from = $this->data['devanagari'];
        $to = $this->data['bengali'];
        $f = $this->transHelper('devanagari', 'bengali');
        $this->letterTests($from, $to, $f);
        $this->textTests($from, $to, $f);
        $f('व', 'ব', 'व transliteration');
        $f('ब', 'ব', 'ब transliteration');
    }

    public function testDevanagariToHarvardKyoto() {
        $from = $this->data['devanagari'];
        $to = $this->data['hk'];
        $f = $this->transHelper('devanagari', 'hk');
        $this->letterTests($from, $to, $f);
        $this->textTests($from, $to, $f);

        // Other
        $f('wwॠww', 'wwRRww', 'Vowel among other letters');
        $f('wwकww', 'wwkaww', 'Consonant among other letters');
    }

    public function testDevanagariToGujarati() {
        $from = $this->data['devanagari'];
        $to = $this->data['gujarati'];
        $f = $this->transHelper('devanagari', 'gujarati');
        $this->letterTests($from, $to, $f);
        $this->textTests($from, $to, $f);
    }

    public function testDevanagariToGurmukhi() {
        $from = $this->data['devanagari'];
        $to = $this->data['gurmukhi'];
        $f = $this->transHelper('devanagari', 'gurmukhi');
        $f('अ आ इ ई उ ऊ ए ऐ ओ औ', $to['vowels'], 'Vowels'); // no ऋ/ॠ/ऌ/ॡ
        $f('क खा गि घी ङु चू टे ठै डो ढौ णं तः थ्', $to['marks'], 'Marks'); // no ऋ/ॠ/ऌ/ॡ
        $f($from['consonants'], $to['consonants'], 'Stops and nasals');
        $f($from['other'], $to['other'], 'Other consonants');
        $f($from['symbols'], $to['symbols'], 'Symbols and punctuation');
        $this->textTests($from, $to, $f);
    }

    public function testDevanagariToKannada() {
        // Letters
        $from = $this->data['devanagari'];
        $to = $this->data['kannada'];
        $f = $this->transHelper('devanagari', 'kannada');
        $this->letterTests($from, $to, $f);
        $this->textTests($from, $to, $f);
    }

    public function testDevanagariToMalayalam() {
        $from = $this->data['devanagari'];
        $to = $this->data['malayalam'];
        $f = $this->transHelper('devanagari', 'malayalam');
        $this->letterTests($from, $to, $f);
        $this->textTests($from, $to, $f);
    }

    public function testDevanagariToOriya() {
        $from = $this->data['devanagari'];
        $to = $this->data['oriya'];
        $f = $this->transHelper('devanagari', 'oriya');
        $f($from['vowels'], $to['vowels'], 'Vowels');
        $f('क खा गि घी ङु चू छृ जॄ टे ठै डो ढौ णं तः थ्', $to['marks'], 'Marks'); // no ऌ or ॡ
        $f($from['consonants'], $to['consonants'], 'Stops and nasals');
        $f($from['other'], $to['other'], 'Other consonants');
        $f($from['symbols'], $to['symbols'], 'Symbols and punctuation');
        $this->textTests($from, $to, $f);
        $this->textTests($from, $to, $f);
    }

    public function testDevanagariToTelugu() {
        $from = $this->data['devanagari'];
        $to = $this->data['telugu'];
        $f = $this->transHelper('devanagari', 'telugu');
        $this->letterTests($from, $to, $f);
        $this->textTests($from, $to, $f);
    }

    public function testHarvardKyotoToDevanagari() {
        $from = $this->data['hk'];
        $to = $this->data['devanagari'];
        $f = $this->transHelper('hk', 'devanagari');
        $this->letterTests($from, $to, $f);
        $this->textTests($from, $to, $f);
        $f('naraxiti', 'नरxइति', 'Undefined letters');
    }

    public function testHarvardKyotoToIAST() {
        $from = $this->data['hk'];
        $to = $this->data['iast'];
        $f = $this->transHelper('hk', 'iast');
        $this->letterTests($from, $to, $f);
        $this->textTests($from, $to, $f);
        $f('tAmxiti', 'tāmxiti', 'Undefined letters');
    }

    public function testITRANSToDevanagari() {
        $from = $this->data['itrans'];
        $to = $this->data['devanagari'];
        $f = $this->transHelper('itrans', 'devanagari');
        $this->letterTests($from, $to, $f);
        $this->textTests($from, $to, $f);
    }

    public function testWXToDevanagari() {
        $from = $this->data['wx'];
        $to = $this->data['devanagari'];
        $f = $this->transHelper('wx', 'devanagari');
        $f($from['consonants'], $to['consonants'], 'Stops and nasals');
        $f($from['symbols'], $to['symbols'], 'Symbols and punctuation');
        $this->textTests($from, $to, $f);
    }

    public function testTeluguToDevanagari() {
        $from = $this->data['telugu'];
        $to = $this->data['devanagari'];
        $f = $this->transHelper('telugu', 'devanagari');
        $this->textTests($from, $to, $f);
    }

    public function testUndefinedLetters() {
        $f = $this->transHelper('devanagari', 'gurmukhi');
        $f('ऋच्छति', 'ऋਚ੍ਛਤਿ');
    }
}
