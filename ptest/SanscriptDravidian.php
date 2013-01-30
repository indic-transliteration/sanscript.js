<?php

include_once './SanscriptBase.php';

class SanscriptDravidian extends SanscriptBase {

    function dravidianTest($fromScript, $toScript) {
        $f = $this->transHelper($fromScript, $toScript);
        $from = $this->data[$fromScript];
        $to = $this->data[$toScript];
        $f($from['short_vowels'], $to['short_vowels'], 'Vowels (forward)');
        $f($from['short_marks'], $to['short_marks'], 'Vowel marks (forward)');
    }

    public function testDravidianToKolkata() {
        $this->dravidianTest('itrans_dravidian', 'kolkata');
    }

    public function testDravidianToDevanagari() {
        $this->dravidianTest('itrans_dravidian', 'devanagari');
    }

    public function testDravidianToKannada() {
        $this->dravidianTest('itrans_dravidian', 'kannada');
    }

    public function testDravidianToMalayalam() {
        $this->dravidianTest('itrans_dravidian', 'malayalam');
    }

    public function testDravidianToTamil() {
        $this->dravidianTest('itrans_dravidian', 'tamil');
    }

    public function testDravidianToTelugu() {
        $this->dravidianTest('itrans_dravidian', 'telugu');
    }

    public function testKolkataToDevanagari() {
        $this->dravidianTest('kolkata', 'devanagari');
    }
}
