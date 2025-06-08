/* globals QUnit, Sanscript */

if (typeof QUnit == "undefined") {
    QUnit = require("qunit"); // eslint-disable-line no-global-assign
}

if (typeof Sanscript == "undefined") {
    Sanscript = require("../sanscript"); // eslint-disable-line no-global-assign
}


// QUnit test suite
QUnit.module("Basic");

QUnit.test("basicTests", (assert) => {
    assert.strictEqual(Sanscript.detect('pitRRIn'), 'ITRANS');
    assert.strictEqual(Sanscript.detect('পিতৄন্'), 'Bengali');
    assert.strictEqual(Sanscript.t('pitRRIn', null, "bengali"), "পিতৄন্");
});
