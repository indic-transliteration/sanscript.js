<?php

include_once './SanscriptBase.php';

class SanscriptToggle extends SanscriptBase {

    public function testHarvardKyoto() {
        $f = $this->transHelper('hk', 'devanagari');
        $f('akSa##kSa##ra', 'अक्षkSaर', 'Basic disable');
        $f('##akSa##kSa##ra', 'akSaक्षra', 'Initial disable');
        $f('akSa##ra##', 'अक्षra', 'Final disable 1');
        $f('akSa##ra', 'अक्षra', 'Final disable 2');
        $f('akSa##kSa##ra####', 'अक्षkSaर', 'Redundant disable 1');
        $f('a####kSara', 'अक्षर', 'Redundant disable 2');
        $f('a#kSara', 'अ#क्षर', 'Misleading disable');
    }

    public function testDevanagari() {
        $f = $this->transHelper('devanagari', 'hk');
        $f('अ##क्ष##र', 'aक्षra', 'Basic disable');
        $f('##अ##क्षर', 'अkSara', 'Initial disable');
        $f('अक्ष##र##', 'akSaर', 'Final disable 1');
        $f('अक्ष##र', 'akSaर', 'Final disable 2');
        $f('अक्ष##र####', 'akSaर', 'Redundant disable 1');
        $f('अ####क्षर', 'akSara', 'Redundant disable 2');
        $f('अ#क्षर', 'a#kSara', 'Misleading disable');
    }
}
