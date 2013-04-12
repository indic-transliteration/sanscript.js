<?php

include_once './SanscriptBase.php';

class SanscriptOptions extends SanscriptBase {

    public function testHindiStyleTransliteration() {
        $f = $this->transHelper('itrans', 'devanagari', array('syncope' => TRUE));
        $f('karaN', 'करण');
        $f('rAj ke lie', 'राज के लिए');
    }

    public function testSkippingSGML() {
        $f1 = $this->transHelper('hk', 'devanagari');
        $f2 = $this->transHelper('hk', 'devanagari', array('skip_sgml' => FALSE));
        $f3 = $this->transHelper('hk', 'devanagari', array('skip_sgml' => TRUE));
        $f1('<p>nara iti</p>', '<प्>नर इति</प्>');
        $f2('<p>nara iti</p>', '<प्>नर इति</प्>');
        $f3('<p>nara iti</p>', '<p>नर इति</p>');
    }
}
