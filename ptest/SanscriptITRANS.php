<?php

include_once './SanscriptBase.php';

class SanscriptITRANS extends SanscriptBase {

    public function testZeroWidthJoiner() {
        $f = $this->transHelper('itrans', 'devanagari');
        $f('bara_u', 'बरउ', 'Separated vowels');
        $f('k{}Shetra', 'क्‍षेत्र', 'Separated consonants');
    }

    public function testVirama() {
        $f = $this->transHelper('itrans', 'devanagari');
        $g = $this->transHelper('devanagari', 'itrans');
        $f('tattatvam.h', 'तत्तत्वम्', 'ITRANS to Devanagari');
        $g('तत्तत्वम्', 'tattatvam', 'Devanagari to ITRANS');
    }

    public function testAlternates() {
        $that = $this;
        $sanscript = $this->sanscript;
        $f = function($itrans1, $itrans2, $description) use ($that, $sanscript) {
            $dev1 = $sanscript->t($itrans1, 'itrans', 'devanagari');
            $dev2 = $sanscript->t($itrans2, 'itrans', 'devanagari');
            $that->assertEquals($dev2, $dev1, $description);
        };

        $f('A I U RRi RRI LLi LLI', 'aa ii uu R^i R^I L^i L^I', 'vowels');
        $f('kA kI kU kRRi kRRI kLLi kLLI', 'kaa kii kuu kR^i kR^I kL^i kL^I', 'vowels (marks)');
        $f('I U', 'ee oo', 'long I and U');
        $f('kI kU', 'kee koo', 'long I and U (marks)');
        $f('aM aM', 'a.m a.n', 'anusvara');
        $f('~Na', 'N^a', 'na (kavarga)');
        $f('ca', 'cha', 'ca');
        $f('Cha Cha', 'Ca chha', 'cha');
        $f('va', 'wa', 'va/wa');
        $f('Sha Sha', 'Sa shha', 'sha (retroflex)');
        $f('kSha kSha kSha', 'kSa kshha xa', 'ksha');
        $f('j~na j~na', 'GYa dnya', 'jna');
        $f('OM', 'AUM', 'om');
        $f(".a | ||", '~ . ..', 'punctuation');
        $f('za', 'Ja', 'Devanagari za');
        $f('a{\\m+}', 'a.h.N', '{\\m+}');
    }

    public function testBackslashEscape() {
        $f = $this->transHelper('itrans', 'devanagari');
        $f('\\nara', 'nअर');
        $f('na\\ra', 'नrअ');
        $f('nara\\', 'नर');
    }

    public function testAccent() {
        $f = $this->transHelper('itrans', 'devanagari');
        $f("a\\_gnimI\\'le pu\\_rohi\\'tam", 'अ॒ग्निमी॑ले पु॒रोहि॑तम्');
        $f("naH\\' naH\\_ naH\\`", 'नः॑ नः॒ नः॒', 'Visarga + accent');
        $f("na\\'H na\\_H na\\`H", 'नः॑ नः॒ नः॒', 'Accent + visarga');
        $f("taM\\' ta.m\\' ta.n\\' taM\\_ ta.m\\_ ta.n\\_ taM\\` ta.m\\` ta.n\\`", 'तं॑ तं॑ तं॑ तं॒ तं॒ तं॒ तं॒ तं॒ तं॒', 'Anusvara + accent');
        $f("ta\\'M ta\\'.m ta\\'.n ta\\_M ta\\_.m ta\\_.n ta\\`M ta\\`.m ta\\`.n", 'तं॑ तं॑ तं॑ तं॒ तं॒ तं॒ तं॒ तं॒ तं॒', 'Accent + anusvara');
    }

    public function testNonSanskritLetters() {
        $ben = $this->transHelper('itrans', 'bengali');
        $dev = $this->transHelper('itrans', 'devanagari');
        $kan = $this->transHelper('itrans', 'kannada');
        $guj = $this->transHelper('itrans', 'gujarati');
        $gur = $this->transHelper('itrans', 'gurmukhi');
        $mal = $this->transHelper('itrans', 'malayalam');
        $ori = $this->transHelper('itrans', 'oriya');
        $tam = $this->transHelper('itrans', 'tamil');
        $tel = $this->transHelper('itrans', 'telugu');
        $ben('.De .Dhe Ye', 'ডে ঢে যে');
        $dev('qa KA Gi zI .Du .DU fRRi YRRI RLLi', 'क़ ख़ा ग़ि ज़ी ड़ु ड़ू फ़ृ य़ॄ ऱॢ');
        $dev('ka.cna', 'कॅन');
        $kan('fI RI', 'ಫೀ ಱೀ');
        $guj('ka.cna', 'કૅન');
        $gur('Ko Go zo Jo .Do fo', 'ਖੋ ਗੋ ਜੋ ਜੋ ਡੋ ਫੋ');
        $mal('RI', 'റീ');
        $ori('.DU .DhU YU', 'ଡୂ ଢୂ ଯୂ');
        $tam('RI', 'றீ');
    }
}
