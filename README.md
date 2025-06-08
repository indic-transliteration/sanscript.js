Sanscript.js
=============================

## Introduction

Sanscript is a transliteration library for Indian languages. It supports the most popular Indian scripts and several different romanization schemes. Although Sanscript focuses on Sanskrit transliteration, it has partial support for other languages and is easy to extend.

## Setup
The package is officially distributed at npm [here](https://www.npmjs.com/package/@indic-transliteration/sanscript), whereas a variant due to Vikram Iyer is separately available [here](https://www.npmjs.com/package/sanscript). So one can use commands such as:

- `npm install @indic-transliteration/sanscript`

## Usage

Sanscript is simple to use:

```js
var output = Sanscript.t(input, from, to);
```

Here, `from` and `to` are the names of different **schemes**. In Sanscript, the word "scheme" refers to both scripts and romanizations. These schemes are of two types:

1. **Brahmic** schemes, which are *abugidas*. All Indian scripts are Brahmic schemes.
2. **Roman** schemes, which are *alphabets*. All romanizations are Roman schemes.

For a full list of schemes, see `schemes` in [https://github.com/indic-transliteration/common_maps](https://github.com/indic-transliteration/common_maps) . A possibly outdated listing of supported schemes:

ahom, assamese, avestan, balinese, bengali, bhaisuki, brahmi, brahmi_tamil, burmese, chakma, cham, cyrillic, devanagari, dogra, gondi_gunjala, gondi_masaram, grantha, grantha_pandya, gujarati, gurmukhi, hk, iast, itrans, itrans_dravidian, javanese, kannada, khamti_shan, kharoshti, khmer, khom_thai, khudawadi, kolkata, lao, lao_pali, lepcha, limbu, mahajani, malayalam, manipuri, marchen, modi, mon, mro, multani, newa, ol_chiki, oriya, persian_old, phags_pa, ranjana, rejang, rohingya, sanskritOCR, shan, sharada, siddham, sinhala, slp1, sora_sompeng, sundanese, syloti_nagari, tagalog, tagbanwa, tai_laing, takri, tamil, tamil_extended, tamil_superscripted, telugu, thai, tibetan, tirhuta_maithili, urdu, vattelutu, velthuis, wancho, warang_citi, wx, zanbazar_square

of which the following are Roman schemes:

* `hk` (Harvard-Kyoto)
* `iast` (International Alphabet of Sanskrit Transliteration)
* `iso`
* `itrans` (ITRANS)
* `itrans_dravidian` (ITRANS with support for Dravidian short "e" and "o")
* `kolkata` (National Library at Kolkata)
* `slp1` (Sanskrit Library Phonetic Basic)
* `velthuis` (Velthuis)
* `wx` (WX)
* `cyrillic`

### Disabling transliteration
When Sanscript sees the token `##`, it toggles the transliteration state:

```js
Sanscript.t('ga##Na##pa##te', 'hk', 'devanagari'); // गNaपte
Sanscript.t('ध##र्म##क्षेत्रे', 'devanagari', 'hk'); // dhaर्मkSetre
```

When Sanscript sees the token `\`, it disables transliteration on the character that immediately follows. `\` is used for ITRANS compatibility; we recommend always using `##` instead.

```js
Sanscript.t('a \\a', 'itrans', 'devanagari'); // अ a
Sanscript.t('\\##aham', 'itrans', 'devanagari'); // ##अहम्
```

### Transliterating to lossy schemes
A **lossy** scheme does not have the letters needed to support lossless translation. For example, Bengali is a lossy scheme because it uses `ব` for both `ba` and `va`. In future releases, Sanscript might let you choose how to handle lossiness. For the time being, it makes some fairly bad hard-coded assumptions. Corrections and advice are always welcome.

### Transliteration options
You can tweak the transliteration function by passing an `options` object:

```html
<script src="node_modules/@indic-transliteration/sanscript/sanscript.js"></script>
<script>
  var output = Sanscript.t(input, from, to, options);
</script>
```

`options` maps options to values. Currently, these options are supported:

* `skip_sgml` - If true, transliterate SGML tags as if they were ordinary words (`<b>iti</b>` → `<ब्>इति</ब्>`). Defaults to `false`.
* `syncope` - If true, use Hindi-style transliteration (`ajay` → `अजय`). In linguistics, this behavior is known as [schwa syncope](http://en.wikipedia.org/wiki/Schwa_deletion_in_Indo-Aryan_languages). Defaults to `false`.
* `preferred_alternates` - This `object` map can define which alternates should be used during transliteration. I.e. in case you transliterate **to** itrans and you prefer `aa` instead of `A`, `ii` instead of `I`, etc., you can set a map like this:
```js
{ itrans : { "A" : "aa", "I" : "ii", "U" : "uu", "j~n" : "GY" } }
```
## Contributing

1. Check out repo from github.
2. Install package dependencies with `npm install`

Please note that schemes are in a different repo as a separate package dependency, which you can find in [common_maps](https://github.com/indic-transliteration/common_maps) repo.

If you want to efficiently work locally editing schemes try out `npm link`. Check out usage [here](https://docs.npmjs.com/cli/v8/commands/npm-link).

In a nutshell, the steps:

1. Check out in a separate folder the [common_maps](https://github.com/indic-transliteration/common_maps) repo.
2. Navigate into the folder where you checked out the common_maps
3. Type (sudo) `npm link` in the shell
4. Navigate to the `sanscript.js` repo and type `npm link @indic-transliteration/common_maps`

This way the `node_modules/@indic-transliteration/common_maps` folder will become a link, pointing to your local checked out folder. So you can simply make there your changes.

When you want to revert to the real downloaded package simply type `npm unlink @indic-transliteration/common_maps`

### Adding new schemes

Adding a new scheme is simple:

```js
Sanscript.addBrahmicScheme(schemeName, schemeData);
Sanscript.addRomanScheme(schemeName, schemeData);
```

For help in creating `schemeData`, see the comments on the `addBrahmicScheme` and `addRomanScheme` functions.

### Testing
Prior to testing, run `npm run dist` so that the distribution file sanscript.js is generated at the root folder.

We use `qunit` for testing.
After installing dependencies, you can either:

* run `npm run test` to run tests from the command line
* open [test/index.html](test/index.html) to run tests in the browser

### Publishing to npm

```shell
npm publish --access public
```
