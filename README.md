Sanscript.js
=============================

## Introduction

Sanscript is a transliteration library for Indian languages. It supports the most popular Indian scripts and several different romanization schemes. Although Sanscript focuses on Sanskrit transliteration, it has partial support for other languages and is easy to extend.

## Setup
The package is officially distributed at npm [here](https://www.npmjs.com/package/@sanskrit-coders/sanscript), whereas a variant due to Vikram Iyer is separately available [here](https://www.npmjs.com/package/sanscript). So one can use commands such as:

- `npm install @sanskrit-coders/sanscript`
- `yarn add @sanskrit-coders/sanscript`

## Usage

Sanscript is simple to use:

    var output = Sanscript.t(input, from, to);

Here, `from` and `to` are the names of different **schemes**. In Sanscript, the word "scheme" refers to both scripts and romanizations. These schemes are of two types:

1. **Brahmic** schemes, which are *abugidas*. All Indian scripts are Brahmic schemes.
2. **Roman** schemes, which are *alphabets*. All romanizations are Roman schemes.

By default, Sanscript supports the following Brahmic schemes:

* `bengali`
* `devanagari`
* `gujarati`
* `gurmukhi`
* `kannada`
* `malayalam`
* `oriya`
* `tamil`
* `telugu`

and the following Roman schemes:

* `hk` (Harvard-Kyoto)
* `iast` (International Alphabet of Sanskrit Transliteration)
* `itrans` (ITRANS)
* `itrans_dravidian` (ITRANS with support for Dravidian short "e" and "o")
* `kolkata` (National Library at Kolkata)
* `slp1` (Sanskrit Library Phonetic Basic)
* `velthuis` (Velthuis)
* `wx` (WX)

### Disabling transliteration
When Sanscript sees the token `##`, it toggles the transliteration state:

    Sanscript.t('ga##Na##pa##te', 'hk', 'devanagari'); // गNaपte
    Sanscript.t('ध##र्म##क्षेत्रे', 'devanagari', 'hk'); // dhaर्मkSetre

When Sanscript sees the token `\`, it disables transliteration on the character that immediately follows. `\` is used for ITRANS compatibility; we recommend always using `##` instead.

    Sanscript.t('a \\a', 'itrans', 'devanagari'); // अ a
    Sanscript.t('\\##aham', 'itrans', 'devanagari'); // ##अहम्

### Transliterating to lossy schemes
A **lossy** scheme does not have the letters needed to support lossless translation. For example, Bengali is a lossy scheme because it uses `ব` for both `ba` and `va`. In future releases, Sanscript might let you choose how to handle lossiness. For the time being, it makes some fairly bad hard-coded assumptions. Corrections and advice are always welcome.

### Transliteration options
You can tweak the transliteration function by passing an `options` object:

    var output = Sanscript.t(input, from, to, options);
    
`options` maps options to values. Currently, these options are supported:

* `skip_sgml` - If true, transliterate SGML tags as if they were ordinary words (`<b>iti</b>` → `<ब्>इति</ब्>`). Defaults to `false`.
* `syncope` - If true, use Hindi-style transliteration (`ajay` → `अजय`). In linguistics, this behavior is known as [schwa syncope](http://en.wikipedia.org/wiki/Schwa_deletion_in_Indo-Aryan_languages). Defaults to `false`.

## Contributing
### Adding new schemes

Adding a new scheme is simple:

    Sanscript.addBrahmicScheme(schemeName, schemeData);
    Sanscript.addRomanScheme(schemeName, schemeData);

For help in creating `schemeData`, see the comments on the `addBrahmicScheme` and `addRomanScheme` functions.

### Testing
We use qunit. Just install the dev dependencies with `yarn` and then open [test/index.html](test/index.html) to see the tests run.

### Publishing to npm
`npm publish --access public`