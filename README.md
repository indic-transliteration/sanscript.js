Sanscript.java
=============================

Introduction
-----------------------------
Sanscript is a transliteration library for Indian languages written in Java. It supports the most popular Indian scripts and several different romanization schemes. Although Sanscript focuses on Sanskrit transliteration, it has partial support for other languages and is easy to extend.

Requirements
-----------------------------
Sanscript requires Java 8 or higher.

Usage
-----------------------------
Sanscript is simple to use:

    import com.wellebee.sanskrit;
    Sanscript sanscript = new Sanscript();
    String output = sanscript.t(input, from, to);

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

    sanscript.t("ga##Na##pa##te", "hk", "devanagari"); // गNaपte
    sanscript.t("ध##र्म##क्षेत्रे", "devanagari", "hk"); // dhaर्मkSetre

When Sanscript sees the token `\`, it disables transliteration on the character that immediately follows. `\` is used for ITRANS compatibility; we recommend always using `##` instead.

    sanscript.t("a \\a", "itrans", "devanagari"); // अ a
    sanscript.t("\\##aham", "itrans", "devanagari"); // ##अहम्

### Transliterating to lossy schemes
A **lossy** scheme does not have the letters needed to support lossless translation. For example, Bengali is a lossy scheme because it uses `ব` for both `ba` and `va`. In future releases, Sanscript might let you choose how to handle lossiness. For the time being, it makes some fairly bad hard-coded assumptions. Corrections and advice are always welcome.

### Transliteration options
You can tweak the transliteration function by passing an `options` object:

    String output = sanscript.t(input, from, to, options);

`options` maps options to values. Currently, these options are supported:

* `skip_sgml` - If true, transliterate SGML tags as if they were ordinary words (`<b>iti</b>` → `<ब्>इति</ब्>`). Defaults to `false`.
* `syncope` - If true, use Hindi-style transliteration (`ajay` → `अजय`). In linguistics, this behavior is known as [schwa syncope](http://en.wikipedia.org/wiki/Schwa_deletion_in_Indo-Aryan_languages). Defaults to `false`.

Adding new schemes
-----------------------------
Adding a new scheme is simple:

    sanscript.addBrahmicScheme(schemeName, scheme);
    sanscript.addRomanScheme(schemeName, scheme);

For help in creating `scheme`, see the comments on the `addBrahmicScheme` and `addRomanScheme` functions.
