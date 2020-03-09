/**
 * Sanscript
 *
 * Sanscript is a Sanskrit transliteration library. Currently, it supports
 * other Indian languages only incidentally.
 *
 * License: MIT
 */

(function (global) {
	"use strict";

	var Sanscript = {};
	// First, we define the Sanscript singleton, with its variables and methods.
	Sanscript.defaults = {
		skip_sgml: false,
		syncope: false,
		enableTamilPronunciation: true,
		enableTamilCharPositionFixes: true,
		enableSanskritVedicAccents : true
	};

	/* Schemes
	 * =======
	 * Schemes are of two kinds: "Brahmic" and "roman." "Brahmic" schemes
	 * describe abugida scripts found in India. "Roman" schemes describe
	 * manufactured alphabets that are meant to describe or encode Brahmi
	 * scripts. Abugidas and alphabets are processed by separate algorithms
	 * because of the unique difficulties involved with each.
	 *
	 * Brahmic consonants are stated without a virama. Roman consonants are
	 * stated without the vowel 'a'.
	 *
	 * (Since "abugida" is not a well-known term, Sanscript uses "Brahmic"
	 * and "roman" for clarity.)
	 */
	var schemes = Sanscript.schemes = {
		/* Devanagari
		 * ----------
		 * The most comprehensive and unambiguous Brahmic script listed.
		 */
		"devanagari": {
			// "Independent" forms of the vowels. These are used whenever the
			// vowel does not immediately follow a consonant.
			vowels: ['अ', 'आ', 'इ', 'ई', 'उ', 'ऊ', 'ऋ', 'ॠ', 'ऌ', 'ॡ', 'ऎ', 'ए', 'ऐ', 'ऒ', 'ओ', 'औ'],

			// "Dependent" forms of the vowels. These are used whenever the
			// vowel immediately follows a consonant. If a letter is not
			// listed in `vowels`, it should not be listed here.
			vowel_marks: ['ा', 'ि', 'ी', 'ु', 'ू', 'ृ', 'ॄ', 'ॢ', 'ॣ', 'ॆ', 'े', 'ै', 'ॊ', 'ो', 'ौ'],

			// Miscellaneous marks, all of which are used in Sanskrit.
			other_marks: ['ं', 'ः', 'ँ'],

			// In syllabic scripts like Devanagari, consonants have an inherent
			// vowel that must be suppressed explicitly. We do so by putting a
			// virama after the consonant.
			virama: ['्'],

			// Various Sanskrit consonants and consonant clusters. Every token
			// here has an explicit vowel. Thus "क" is "ka" instead of "k".
			consonants: ['क', 'ख', 'ग', 'घ', 'ङ', 'च', 'छ', 'ज', 'झ', 'ञ', 'ट', 'ठ', 'ड', 'ढ', 'ण', 'त', 'थ', 'द', 'ध', 'न', 'प', 'फ', 'ब', 'भ', 'म', 'य', 'र', 'ल', 'व', 'श', 'ष', 'स', 'ह', 'ळ', 'क्ष', 'ज्ञ'],

			// Numbers and punctuation
			symbols: ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९', 'ॐ', 'ऽ', '।', '॥'],

			// Non-Sanskrit consonants
			other: ['क़', 'ख़', 'ग़', 'ज़', 'ड़', 'ढ़', 'फ़', 'य़', 'ऱ', 'ऴ'],

			candra: ['ॅ'],

			// Vedic accent. Udatta, anudatta, double udatta and ardhachandra viraama..
			accent: ['\u0951', '\u0952', '\u1cda', '\ua8f3'],

			// Accent combined with anusvara and and visarga. For compatibility
			// with ITRANS, which allows the reverse of these four.
			combo_accent: ['ः॑', 'ः॒', 'ं॑', 'ं॒'],

			// Dummy consonant. This is used in ITRANS to prevert certain types
			// of parser ambiguity. Thus "barau" -> बरौ but "bara_u" -> बरउ.
			skip: [''],

			// Zero-width joiner. This is used to separate a consonant cluster
			// and avoid a complex ligature.
			zwj: ['\u200D'],
		},

		/* Bengali
		 * -------
		 * 'va' and 'ba' are both rendered as ব.
		 */
		bengali: {
			vowels: ['অ', 'আ', 'ই', 'ঈ', 'উ', 'ঊ', 'ঋ', 'ৠ', 'ঌ', 'ৡ', '', 'এ', 'ঐ', '', 'ও', 'ঔ'],
			vowel_marks: ['া', 'ি', 'ী', 'ু', 'ূ', 'ৃ', 'ৄ', 'ৢ', 'ৣ', '', 'ে', 'ৈ', '', 'ো', 'ৌ'],
			other_marks: ['ং', 'ঃ', 'ঁ'],
			virama: ['্'],
			consonants: ['ক', 'খ', 'গ', 'ঘ', 'ঙ', 'চ', 'ছ', 'জ', 'ঝ', 'ঞ', 'ট', 'ঠ', 'ড', 'ঢ', 'ণ', 'ত', 'থ', 'দ', 'ধ', 'ন', 'প', 'ফ', 'ব', 'ভ', 'ম', 'য', 'র', 'ল', 'ব', 'শ', 'ষ', 'স', 'হ', 'ळ', 'ক্ষ', 'জ্ঞ'],
			symbols: ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯', 'ॐ', 'ঽ', '।', '॥'],
			other: ['', '', '', '', 'ড', 'ঢ', '', 'য', '', ''],
			candra: [''],
			accent: ['\u2060', '\u2060', '\u2060', '\u2060'],
			combo_accent: ['', '', '', '']
		},

		/* Grantha
		 * -------
		 * Grantha in Bengali Range as per Elmar's Indolipi font e-Grantamil,
		 * য, ওং is changed compared to Bangla
		 */
		grantha: {
			vowels: ['অ', 'আ', 'ই', 'ঈ', 'উ', 'ঊ', 'ঋ', 'ৠ', 'ঌ', 'ৡ', '', 'এ', 'ঐ', '', 'ও', 'ঔ'],
			vowel_marks: ['া', 'ি', 'ী', 'ু', 'ূ', 'ৃ', 'ৄ', 'ৢ', 'ৣ', '', 'ে', 'ৈ', '', 'ো', 'ৌ'],
			other_marks: ['ং', ' ঃ', ' ঁ'],
			virama: ['্'],
			consonants: ['ক', 'খ', 'গ', 'ঘ', 'ঙ', 'চ', 'ছ', 'জ', 'ঝ', 'ঞ', 'ট', 'ঠ', 'ড', 'ঢ', 'ণ', 'ত', 'থ', 'দ', 'ধ', 'ন', 'প', 'ফ', 'ব', 'ভ', 'ম', 'য', 'র', 'ল', 'ৱ', 'শ', 'ষ', 'স', 'হ', 'ৰ', 'ক্ষ', 'জ্ঞ'],
			symbols: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'ঀ', 'ঽ', '।', '॥'],
			other: ['', '', '', '', 'ড', 'ঢ', '', 'য', '', ''],
			candra: [''],
			accent: ['\u0951', '\u0952', '\u1cda', '\ua8f3'],
			combo_accent: ['', '', '', '']
		},

		/* GranTamil
		 * -----
		 * Grantha in Bengali Range as per Elmar's Indolipi font e-Grantamil,
		 * added for missing letters in Tamil, instead of number superscripts for EaswaranJi
		 * use ந for na as per grantha,
		 * use tamil maatraas with bengali consonants - errs in browsers
		 */
		grantamil: {
			vowels: ['அ', 'ஆ', 'இ', 'ஈ', 'உ', 'ஊ', 'ঋ', 'ৠ', 'ঌ', 'ৡ', 'எ', 'ஏ', 'ஐ', 'ஒ', 'ஓ', 'ஔ'],
			vowel_marks: ['ா', 'ி', 'ீ', 'ு', 'ூ', 'ৃ', 'ৄ', 'ৢ', 'ৣ', 'ெ', 'ே', 'ை', 'ொ', 'ோ', 'ௌ'],  // needs some fixes for grantha characters for e ai o au
			other_marks: ['ம்', 'ঃ', 'ঁ'],
			virama: ['்'],
			consonants: ['க', 'খ', 'গ', 'ঘ', 'ங', 'ச', 'ছ', 'ஜ', 'ঝ', 'ஞ', 'ட', 'ঠ', 'ড', 'ঢ', 'ண', 'த', 'থ', 'দ', 'ধ', 'ந', 'ப', 'ফ', 'ব', 'ভ', 'ம', 'ய', 'ர', 'ல', 'வ', 'ஶ', 'ஷ', 'ஸ', 'ஹ', 'ৰ', 'க்ஷ', 'ஜ்ஞ'],
			symbols: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'ௐ', 'ঽ', '।', '॥'],
			other: ['', '', '', '', '', '', '', '', 'ற', 'ழ'],
			candra: [''],
			// Vedic accent. Udatta and anudatta, double udatta and ardhachandra viraama.
			accent: ['\u0951', '\u0952', '\u1cda', '\ua8f3'],
			combo_accent: ['', '', '', '']
		},

		/* Gujarati
		 * --------
		 * Sanskrit-complete.
		 */
		gujarati: {
			vowels: ['અ', 'આ', 'ઇ', 'ઈ', 'ઉ', 'ઊ', 'ઋ', 'ૠ', 'ઌ', 'ૡ', '', 'એ', 'ઐ', '', 'ઓ', 'ઔ'],
			vowel_marks: ['ા', 'િ', 'ી', 'ુ', 'ૂ', 'ૃ', 'ૄ', 'ૢ', 'ૣ', '', 'ે', 'ૈ', '', 'ો', 'ૌ'],
			other_marks: ['ં', 'ઃ', 'ઁ'],
			virama: ['્'],
			consonants: ['ક', 'ખ', 'ગ', 'ઘ', 'ઙ', 'ચ', 'છ', 'જ', 'ઝ', 'ઞ', 'ટ', 'ઠ', 'ડ', 'ઢ', 'ણ', 'ત', 'થ', 'દ', 'ધ', 'ન', 'પ', 'ફ', 'બ', 'ભ', 'મ', 'ય', 'ર', 'લ', 'વ', 'શ', 'ષ', 'સ', 'હ', 'ળ', 'ક્ષ', 'જ્ઞ'],
			symbols: ['૦', '૧', '૨', '૩', '૪', '૫', '૬', '૭', '૮', '૯', 'ૐ', 'ઽ', '।'/*'૤'*/, '॥'/*'૥'*/],
			other: ['ક', 'ખ', 'ગ', 'જ', 'ડ', 'ઢ', 'ફ', 'ય', 'ર', 'ળ઼'],
			candra: ["ૅ"],
			accent: ['\u0951', '\u0952', '\u1cda', '\ua8f3'],
			combo_accent: ['', '', '', ''],
			skip: [''],
		},

		/* Gurmukhi
		 * --------
		 * Missing R/RR/lR/lRR
		 */
		gurmukhi: {
			vowels: ['ਅ', 'ਆ', 'ਇ', 'ਈ', 'ਉ', 'ਊ', '', '', '', '', '', 'ਏ', 'ਐ', '', 'ਓ', 'ਔ'],
			vowel_marks: ['ਾ', 'ਿ', 'ੀ', 'ੁ', 'ੂ', '', '', '', '', '', 'ੇ', 'ੈ', '', 'ੋ', 'ੌ'],
			other_marks: ['ਂ', 'ਃ', 'ਁ'],
			virama: ['੍'],
			consonants: ['ਕ', 'ਖ', 'ਗ', 'ਘ', 'ਙ', 'ਚ', 'ਛ', 'ਜ', 'ਝ', 'ਞ', 'ਟ', 'ਠ', 'ਡ', 'ਢ', 'ਣ', 'ਤ', 'ਥ', 'ਦ', 'ਧ', 'ਨ', 'ਪ', 'ਫ', 'ਬ', 'ਭ', 'ਮ', 'ਯ', 'ਰ', 'ਲ', 'ਵ', 'ਸ਼', 'ਸ਼', 'ਸ', 'ਹ', 'ਲ਼', 'ਕ੍ਸ਼', 'ਜ੍ਞ'],
			symbols: ['੦', '੧', '੨', '੩', '੪', '੫', '੬', '੭', '੮', '੯', 'ॐ', 'ऽ', '।', '॥'],
			other: ['', 'ਖ', 'ਗ', 'ਜ', 'ਡ', '', 'ਫ', '', 'ਲ਼', ''],
			candra: [''],
			accent: ['\u0951', '\u0952', '\u1cda', '\ua8f3'],
			combo_accent: ['', '', '', '']
		},

		/* Kannada
		 * -------
		 * Sanskrit-complete.
		 */
		kannada: {
			vowels: ['ಅ', 'ಆ', 'ಇ', 'ಈ', 'ಉ', 'ಊ', 'ಋ', 'ೠ', 'ಌ', 'ೡ', 'ಎ', 'ಏ', 'ಐ', 'ಒ', 'ಓ', 'ಔ'],
			vowel_marks: ['ಾ', 'ಿ', 'ೀ', 'ು', 'ೂ', 'ೃ', 'ೄ', 'ೢ', 'ೣ', 'ೆ', 'ೇ', 'ೈ', 'ೊ', 'ೋ', 'ೌ'],
			other_marks: ['ಂ', 'ಃ', 'ँ'],
			virama: ['್'],
			consonants: ['ಕ', 'ಖ', 'ಗ', 'ಘ', 'ಙ', 'ಚ', 'ಛ', 'ಜ', 'ಝ', 'ಞ', 'ಟ', 'ಠ', 'ಡ', 'ಢ', 'ಣ', 'ತ', 'ಥ', 'ದ', 'ಧ', 'ನ', 'ಪ', 'ಫ', 'ಬ', 'ಭ', 'ಮ', 'ಯ', 'ರ', 'ಲ', 'ವ', 'ಶ', 'ಷ', 'ಸ', 'ಹ', 'ಳ', 'ಕ್ಷ', 'ಜ್ಞ'],
			symbols: ['೦', '೧', '೨', '೩', '೪', '೫', '೬', '೭', '೮', '೯', 'ಓಂ', 'ಽ', '।', '॥'],
			other: ['', '', '', '', '', '', 'ಫ', '', 'ಱ', 'ೞ'],
			candra: [''],
			combo_accent: ['', '', '', '']
		},

		/* Malayalam
		 * ---------
		 * Sanskrit-complete.
		 */
		malayalam: {
			vowels: ['അ', 'ആ', 'ഇ', 'ഈ', 'ഉ', 'ഊ', 'ഋ', 'ൠ', 'ഌ', 'ൡ', 'എ', 'ഏ', 'ഐ', 'ഒ', 'ഓ', 'ഔ'],
			vowel_marks: ['ാ', 'ി', 'ീ', 'ു', 'ൂ', 'ൃ', 'ൄ', 'ൢ', 'ൣ', 'െ', 'േ', 'ൈ', 'ൊ', 'ോ', 'ൌ'],
			other_marks: ['ം', 'ഃ', 'ँ'],
			virama: ['്'],
			consonants: ['ക', 'ഖ', 'ഗ', 'ഘ', 'ങ', 'ച', 'ഛ', 'ജ', 'ഝ', 'ഞ', 'ട', 'ഠ', 'ഡ', 'ഢ', 'ണ', 'ത', 'ഥ', 'ദ', 'ധ', 'ന', 'പ', 'ഫ', 'ബ', 'ഭ', 'മ', 'യ', 'ര', 'ല', 'വ', 'ശ', 'ഷ', 'സ', 'ഹ', 'ള', 'ക്ഷ', 'ജ്ഞ'],
			symbols: ['൦', '൧', '൨', '൩', '൪', '൫', '൬', '൭', '൮', '൯', 'ഓം', 'ഽ', '।', '॥'],
			other: ['', '', '', '', '', '', '', '', 'റ', 'ഴ'],
			candra: [''],
			accent: ['\u2060', '\u2060', '\u2060', '\u2060'],
			combo_accent: ['', '', '', '']
		},

		/* Oriya
		 * -----
		 * Sanskrit-complete.
		 */
		oriya: {
			vowels: ['ଅ', 'ଆ', 'ଇ', 'ଈ', 'ଉ', 'ଊ', 'ଋ', 'ୠ', 'ଌ', 'ୡ', '', 'ଏ', 'ଐ', '', 'ଓ', 'ଔ'],
			vowel_marks: ['ା', 'ି', 'ୀ', 'ୁ', 'ୂ', 'ୃ', 'ୄ', 'ୢ', 'ୣ', '', 'େ', 'ୈ', '', 'ୋ', 'ୌ'],
			other_marks: ['ଂ', 'ଃ', 'ଁ'],
			virama: ['୍'],
			consonants: ['କ', 'ଖ', 'ଗ', 'ଘ', 'ଙ', 'ଚ', 'ଛ', 'ଜ', 'ଝ', 'ଞ', 'ଟ', 'ଠ', 'ଡ', 'ଢ', 'ଣ', 'ତ', 'ଥ', 'ଦ', 'ଧ', 'ନ', 'ପ', 'ଫ', 'ବ', 'ଭ', 'ମ', 'ଯ', 'ର', 'ଲ', 'ଵ', 'ଶ', 'ଷ', 'ସ', 'ହ', 'ଳ', 'କ୍ଷ', 'ଜ୍ଞ'],
			symbols: ['୦', '୧', '୨', '୩', '୪', '୫', '୬', '୭', '୮', '୯', 'ଓଂ', 'ଽ', '।', '॥'],
			other: ['', '', '', '', 'ଡ', 'ଢ', '', 'ଯ', '', ''],
			candra: [''],
			accent: ['\u2060', '\u2060', '\u2060', '\u2060'],
			combo_accent: ['', '', '', '']
		},

		/* Tamil
		 * -----
		 * Missing R/RR/lR/lRR vowel marks and voice/aspiration distinctions.
		 * The most incomplete of the Sanskrit schemes here.
		 * using Grantha (Bengali) avagraha - eGrantamil font
		 */
		tamil: {
			vowels: ['அ', 'ஆ', 'இ', 'ஈ', 'உ', 'ஊ', '', '', '', '', 'எ', 'ஏ', 'ஐ', 'ஒ', 'ஓ', 'ஔ'],
			vowel_marks: ['ா', 'ி', 'ீ', 'ு', 'ூ', '', '', '', '', 'ெ', 'ே', 'ை', 'ொ', 'ோ', 'ௌ'],
			other_marks: ['ஂ', 'ஃ', ''],
			virama: ['்'],
			consonants: ['க', 'க²', 'க³', 'க⁴', 'ங', 'ச', 'ச²', 'ஜ', 'ஜ²', 'ஞ', 'ட', 'ட²', 'ட³', 'ட⁴', 'ண', 'த', 'த²', 'த³', 'த⁴', 'ன', 'ப', 'ப²', 'ப³', 'ப⁴', 'ம', 'ய', 'ர', 'ல', 'வ', 'ஶ', 'ஷ', 'ஸ', 'ஹ', 'ள', 'க்ஷ', 'ஜ்ஞ'],
			symbols: ['௦', '௧', '௨', '௩', '௪', '௫', '௬', '௭', '௮', '௯', 'ௐ', 'ऽ', '।', '॥'],
			other: ['', '', '', '', '', '', '', '', 'ற', 'ழ'],
			candra: [''],
			accent: ['\u0951', '\u0952', '\u1cda', '\ua8f3'],
			/* accent: ['\u2060', '\u2060', '\u2060', '\u2060'], */
			combo_accent: ['', '', '', '']
		},

		/* Telugu
		 * ------
		 * Sanskrit-complete.
		 */
		telugu: {
			vowels: ['అ', 'ఆ', 'ఇ', 'ఈ', 'ఉ', 'ఊ', 'ఋ', 'ౠ', 'ఌ', 'ౡ', 'ఎ', 'ఏ', 'ఐ', 'ఒ', 'ఓ', 'ఔ'],
			vowel_marks: ['ా', 'ి', 'ీ', 'ు', 'ూ', 'ృ', 'ౄ', 'ౢ', 'ౣ', 'ె', 'ే', 'ై', 'ొ', 'ో', 'ౌ'],
			other_marks: ['ం', 'ః', 'ఁ'],
			virama: ['్'],
			consonants: ['క', 'ఖ', 'గ', 'ఘ', 'ఙ', 'చ', 'ఛ', 'జ', 'ఝ', 'ఞ', 'ట', 'ఠ', 'డ', 'ఢ', 'ణ', 'త', 'థ', 'ద', 'ధ', 'న', 'ప', 'ఫ', 'బ', 'భ', 'మ', 'య', 'ర', 'ల', 'వ', 'శ', 'ష', 'స', 'హ', 'ళ', 'క్ష', 'జ్ఞ'],
			symbols: ['౦', '౧', '౨', '౩', '౪', '౫', '౬', '౭', '౮', '౯', 'ఓం', 'ఽ', '।', '॥'],
			other: ['', '', '', '', '', '', '', '', 'ఱ', 'ఴ'],
			candra: [''],
			combo_accent: ['', '', '', '']
		},

		/* Cyrillic (Russian)
		* --------
		* Sanskrit-complete.
		*/
		cyrillic: {
			vowels: ['а', 'а̄', 'и', 'ӣ', 'у', 'ӯ', 'р̣', 'р̣̄', 'л̣', 'л̣̄', 'е', 'е', 'аи', 'о', 'о', 'ау'],
			other_marks: ['м̣', 'х̣', 'м̐'],
			virama: [''],
			consonants: ['к', 'кх', 'г', 'гх', 'н̇', 'ч', 'чх', 'ж', 'жх', 'н̃', 'т̣', 'т̣х', 'д̣', 'д̣х', 'н̣', 'т', 'тх', 'д', 'дх', 'н', 'п', 'пх', 'б', 'бх', 'м', 'й', 'р', 'л', 'в', 'щ', 'ш', 'с', 'х', 'л̣', 'кш', 'жн̃'],
			symbols: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'ом̣', '\'', '.', '..'],
			candra: ['ӕ'],
			other: ['к', 'кх', 'г', 'ж', 'д̣', 'дх', 'пх', 'й', 'р', 'л̱']
		},

		/* International Alphabet of Sanskrit Transliteration
		 * --------------------------------------------------
		 * The most "professional" Sanskrit romanization scheme.
		 */
		iast: {
			vowels: ['a', 'ā', 'i', 'ī', 'u', 'ū', 'ṛ', 'ṝ', 'ḷ', 'ḹ', '', 'e', 'ai', '', 'o', 'au'],
			other_marks: ['ṃ', 'ḥ', '~'],
			virama: [''],
			consonants: ['k', 'kh', 'g', 'gh', 'ṅ', 'c', 'ch', 'j', 'jh', 'ñ', 'ṭ', 'ṭh', 'ḍ', 'ḍh', 'ṇ', 't', 'th', 'd', 'dh', 'n', 'p', 'ph', 'b', 'bh', 'm', 'y', 'r', 'l', 'v', 'ś', 'ṣ', 's', 'h', 'ḻ', 'kṣ', 'jñ'],
			symbols: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'oṃ', '\'', '।', '॥'],
			other: ['q', 'k͟h', 'ġ', 'z', 'ṛ', 'ṛh', 'f', 'ẏ', 'ṟ', 'ḻ'],
			candra: ['̆'],
		},

		/* ISO 15919
		 * --------------------------------------------------
		 * International standard for romanization by the International Organization for Standardization
		 * for "Transliteration of Devanagari and related Indic scripts into Latin characters"
		 */
		iso: {
			vowels: ['a', 'ā', 'i', 'ī', 'u', 'ū', 'r̥', 'r̥̄', 'l̥', 'l̥̄', 'ē', 'e', 'ai', 'ō', 'o', 'au'],
			other_marks: ['ṁ', 'ḥ', 'm̐'],
			virama: [''],
			consonants: ['k', 'kh', 'g', 'gh', 'ṅ', 'c', 'ch', 'j', 'jh', 'ñ', 'ṭ', 'ṭh', 'ḍ', 'ḍh', 'ṇ', 't', 'th', 'd', 'dh', 'n', 'p', 'ph', 'b', 'bh', 'm', 'y', 'r', 'l', 'v', 'ś', 'ṣ', 's', 'h', 'ḻ', 'kṣ', 'jñ'],
			symbols: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'oṃ', '’', '।', '॥'],
			other: ['q', 'k͟h', 'ġ', 'z', 'ṛ', 'ṛh', 'f', 'ẏ', 'ṟ', 'ḻ'],
			candra: ['̆'],
		},

		/* ITRANS
		 * ------
		 * One of the first romanization schemes -- and one of the most
		 * complicated. For alternate forms, see the "allAlternates" variable
		 * below.
		 *
		 * '_' is a "null" letter, which allows adjacent vowels.
		 */
		itrans: {
			vowels: ['a', 'A', 'i', 'I', 'u', 'U', 'RRi', 'RRI', 'LLi', 'LLI', '^e', 'e', 'ai', '^o', 'o', 'au'],
			other_marks: ['M', 'H', '.N'],
			virama: [''],
			consonants: ['k', 'kh', 'g', 'gh', '~N', 'ch', 'Ch', 'j', 'jh', '~n', 'T', 'Th', 'D', 'Dh', 'N', 't', 'th', 'd', 'dh', 'n', 'p', 'ph', 'b', 'bh', 'm', 'y', 'r', 'l', 'v', 'sh', 'Sh', 's', 'h', 'L', 'kSh', 'j~n'],
			symbols: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'OM', '.a', '|', '||'],
			other: ['q', 'K', 'G', 'z', '.D', '.Dh', 'f', 'Y', 'R', 'Z'],
			candra: ['.c'],
			accent: ["\\'", "\\_", '"', ''],
			combo_accent: ["\\'H", "\\_H", "\\'M", "\\_M"],
			skip: '_',
			zwj: ['{}'],
		},

		/* Harvard-Kyoto
		 * -------------
		 * A simple 1:1 mapping.
		 */
		hk: {
			vowels: ['a', 'A', 'i', 'I', 'u', 'U', 'R', 'RR', 'lR', 'lRR', '', 'e', 'ai', '', 'o', 'au'],
			other_marks: ['M', 'H', '~'],
			virama: [''],
			consonants: ['k', 'kh', 'g', 'gh', 'G', 'c', 'ch', 'j', 'jh', 'J', 'T', 'Th', 'D', 'Dh', 'N', 't', 'th', 'd', 'dh', 'n', 'p', 'ph', 'b', 'bh', 'm', 'y', 'r', 'l', 'v', 'z', 'S', 's', 'h', 'L', 'kS', 'jJ'],
			symbols: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'OM', '\'', '|', '||'],
			candra: ['̆'],
		},

		/* National Library at Kolkata,
		 * ---------------------------
		 * Apart from using "ē" and "ō" instead of "e" and "o", this scheme is
		 * identical to IAST. ṝ, ḷ, and ḹ are not part of the scheme proper.
		 *
		 * This is defined further below.
		 */

		/* Sanskrit Library Phonetic Basic
		 * -------------------------------
		 * With one ASCII letter per phoneme, this is the tersest transliteration
		 * scheme in use today and is especially suited to computer processing.
		 */
		slp1: {
			vowels: ['a', 'A', 'i', 'I', 'u', 'U', 'f', 'F', 'x', 'X', '', 'e', 'E', '', 'o', 'O'],
			other_marks: ['M', 'H', '~'],
			virama: [''],
			consonants: ['k', 'K', 'g', 'G', 'N', 'c', 'C', 'j', 'J', 'Y', 'w', 'W', 'q', 'Q', 'R', 't', 'T', 'd', 'D', 'n', 'p', 'P', 'b', 'B', 'm', 'y', 'r', 'l', 'v', 'S', 'z', 's', 'h', 'L', 'kz', 'jY'],
			symbols: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'oM', '\'', '.', '..'],
			candra: ['̆']
		},

		/* Velthuis
		 * --------
		 * A case-insensitive Sanskrit encoding.
		 */
		velthuis: {
			vowels: ['a', 'aa', 'i', 'ii', 'u', 'uu', '.r', '.rr', '.li', '.ll', '', 'e', 'ai', '', 'o', 'au'],
			other_marks: ['.m', '.h', ''],
			virama: [''],
			consonants: ['k', 'kh', 'g', 'gh', '\'n', 'c', 'ch', 'j', 'jh', '~n', '.t', '.th', '.d', '.d', '.n', 't', 'th', 'd', 'dh', 'n', 'p', 'ph', 'b', 'bh', 'm', 'y', 'r', 'l', 'v', '~s', '.s', 's', 'h', 'L', 'k.s', 'j~n'],
			symbols: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'o.m', '\'', '|', '||'],
			candra: ['̆']
		},

		/* WX
		 * --
		 * As terse as SLP1.
		 */
		wx: {
			vowels: ['a', 'A', 'i', 'I', 'u', 'U', 'q', 'Q', 'L', '', '', 'e', 'E', '', 'o', 'O'],
			other_marks: ['M', 'H', 'z'],
			virama: [''],
			consonants: ['k', 'K', 'g', 'G', 'f', 'c', 'C', 'j', 'J', 'F', 't', 'T', 'd', 'D', 'N', 'w', 'W', 'x', 'X', 'n', 'p', 'P', 'b', 'B', 'm', 'y', 'r', 'l', 'v', 'S', 'R', 's', 'h', '', 'kR', 'jF'],
			symbols: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'oM', '\'', '|', '||'],
			candra: ['̆']
		},
	},

	// Set of names of schemes
	romanSchemes = {},

	// Map of alternate encodings.
	allAlternates = {
		itrans: {
			A: ['aa'],
			I: ['ii', 'ee'],
			U: ['uu', 'oo'],
			RRi: ['R^i'],
			RRI: ['R^I'],
			LLi: ['L^i'],
			LLI: ['L^I'],
			M: ['.m', '.n'],
			'~N': ['N^'],
			ch: ['c'],
			Ch: ['C', 'chh'],
			'~n': ['JN'],
			v: ['w'],
			Sh: ['S', 'shh'],
			kSh: ['kS', 'x'],
			'j~n': ['GY', 'dny'],
			OM: ['AUM'],
			'\\_': ['\\`'],
			'\\_H': ['\\`H'],
			'\\\'M': ['\\\'.m', '\\\'.n'],
			'\\_M': ['\\_.m', '\\_.n', '\\`M', '\\`.m', '\\`.n'],
			'.a': ['~'],
			'|': ['.'],
			'||': ['..'],
			z: ['J']
		}
	},

	// object cache
	cache = {};

	/**
	 * Check whether the given scheme encodes romanized Sanskrit.
	 *
	 * @param name  the scheme name
	 * @return	  boolean
	 */
	Sanscript.isRomanScheme = function(name) {
		return romanSchemes.hasOwnProperty(name);
	};

	/**
	 * Add a Brahmic scheme to Sanscript.
	 *
	 * Schemes are of two types: "Brahmic" and "roman". Brahmic consonants
	 * have an inherent vowel sound, but roman consonants do not. This is the
	 * main difference between these two types of scheme.
	 *
	 * A scheme definition is an object ("{}") that maps a group name to a
	 * list of characters. For illustration, see the "devanagari" scheme at
	 * the top of this file.
	 *
	 * You can use whatever group names you like, but for the best results,
	 * you should use the same group names that Sanscript does.
	 *
	 * @param name	the scheme name
	 * @param scheme  the scheme data itself. This should be constructed as
	 *				described above.
	 */
	Sanscript.addBrahmicScheme = function(name, scheme) {
		Sanscript.schemes[name] = scheme;
	};

	/**
	 * Add a roman scheme to Sanscript.
	 *
	 * See the comments on Sanscript.addBrahmicScheme. The "vowel_marks" field
	 * can be omitted.
	 *
	 * @param name	the scheme name
	 * @param scheme  the scheme data itself
	 */
	Sanscript.addRomanScheme = function(name, scheme) {
		if (!('vowel_marks' in scheme)) {
			scheme.vowel_marks = scheme.vowels.slice(1);
		}
		Sanscript.schemes[name] = scheme;
		romanSchemes[name] = true;
	};

	/**
	 * Create a deep copy of an object, for certain kinds of objects.
	 *
	 * @param scheme  the scheme to copy
	 * @return		the copy
	 */
	var cheapCopy = function(scheme) {
		var copy = {};
		for (var key in scheme) {
			if (!scheme.hasOwnProperty(key)) {
				continue;
			}
			copy[key] = scheme[key].slice(0);
		}
		return copy;
	};

	// Set up various schemes
	(function() {
		// Set up roman schemes
		var kolkata = schemes.kolkata = cheapCopy(schemes.iast),
			schemeNames = ['cyrillic', 'iast', 'itrans', 'hk', 'kolkata', 'slp1', 'velthuis', 'wx'];
		kolkata.vowels = ['a', 'ā', 'i', 'ī', 'u', 'ū', 'ṛ', 'ṝ', 'ḷ', 'ḹ', 'e', 'ē', 'ai', 'o', 'ō', 'au'];

		// These schemes already belong to Sanscript.schemes. But by adding
		// them again with `addRomanScheme`, we automatically build up
		// `romanSchemes` and define a `vowel_marks` field for each one.
		for (var i = 0, name; (name = schemeNames[i]); i++) {
			Sanscript.addRomanScheme(name, schemes[name]);
		}

		// ITRANS variant, which supports Dravidian short 'e' and 'o'.
		var itrans_dravidian = cheapCopy(schemes.itrans);
		itrans_dravidian.vowels = ['a', 'A', 'i', 'I', 'u', 'U', 'Ri', 'RRI', 'LLi', 'LLi', 'e', 'E', 'ai', 'o', 'O', 'au'];
		itrans_dravidian.vowel_marks = itrans_dravidian.vowels.slice(1);
		allAlternates.itrans_dravidian = allAlternates.itrans;
		Sanscript.addRomanScheme('itrans_dravidian', itrans_dravidian);
	}());

	/**
	 * Create a map from every character in `from` to its partner in `to`.
	 * Also, store any "marks" that `from` might have.
	 *
	 * @param from	 input scheme
	 * @param to	   output scheme
	 * @param options  scheme options
	 */
	var makeMap = function(from, to, options) {
		var alternates = allAlternates[from] || {},
			consonants = {},
			fromScheme = Sanscript.schemes[from],
			letters = {},
			tokenLengths = [],
			marks = {},
			toScheme = Sanscript.schemes[to];

		for (var group in fromScheme) {
			if (!fromScheme.hasOwnProperty(group)) {
				continue;
			}
			var fromGroup = fromScheme[group],
				toGroup = toScheme[group];
			if (toGroup === undefined) {
				continue;
			}
			for (var i = 0; i < fromGroup.length; i++) {
				var F = fromGroup[i],
					T = toGroup[i],
					alts = alternates[F] || [],
					numAlts = alts.length,
					j = 0;

				tokenLengths.push(F.length);
				for (j = 0; j < numAlts; j++) {
					tokenLengths.push(alts[j].length);
				}

				if (group === 'vowel_marks' || group === 'virama') {
					marks[F] = T;
					for (j = 0; j < numAlts; j++) {
						marks[alts[j]] = T;
					}
				} else {
					letters[F] = T;
					for (j = 0; j < numAlts; j++) {
						letters[alts[j]] = T;
					}
					if (group === 'consonants' || group === 'other') {
						consonants[F] = T;

						for (j = 0; j < numAlts; j++) {
							consonants[alts[j]] = T;
						}
					}
				}
			}
		}

		return {consonants: consonants,
			fromRoman: Sanscript.isRomanScheme(from),
			letters: letters,
			marks: marks,
			maxTokenLength: Math.max.apply(Math, tokenLengths),
			toRoman: Sanscript.isRomanScheme(to),
			virama: toScheme.virama};
	};

	/**
	 * Transliterate from a romanized script.
	 *
	 * @param data	 the string to transliterate
	 * @param map	  map data generated from makeMap()
	 * @param options  transliteration options
	 * @return		 the finished string
	 */
	var transliterateRoman = function(data, map, options) {
		var buf = [],
			consonants = map.consonants,
			dataLength = data.length,
			hadConsonant = false,
			letters = map.letters,
			marks = map.marks,
			maxTokenLength = map.maxTokenLength,
			optSkipSGML = options.skip_sgml,
			optSyncope = options.syncope,
			tempLetter,
			tempMark,
			tokenBuffer = '',
			toRoman = map.toRoman,
			virama = map.virama;

		// Transliteration state. It's controlled by these values:
		// - `skippingSGML`: are we in SGML?
		// - `toggledTrans`: are we in a toggled region?
		//
		// We combine these values into a single variable `skippingTrans`:
		// - `skippingTrans` = skippingSGML || toggledTrans;
		//
		// If (and only if) this value is true, don't transliterate.
		var skippingSGML = false,
			skippingTrans = false,
			toggledTrans = false;

		for (var i = 0, L; (L = data.charAt(i)) || tokenBuffer; i++) {
			// Fill the token buffer, if possible.
			var difference = maxTokenLength - tokenBuffer.length;
			if (difference > 0 && i < dataLength) {
				tokenBuffer += L;
				if (difference > 1) {
					continue;
				}
			}

			// Match all token substrings to our map.
			for (var j = 0; j < maxTokenLength; j++) {
				var token = tokenBuffer.substr(0,maxTokenLength-j);

				if (skippingSGML === true) {
					skippingSGML = (token !== '>');
				} else if (token === '<') {
					skippingSGML = optSkipSGML;
				} else if (token === '##') {
					toggledTrans = !toggledTrans;
					tokenBuffer = tokenBuffer.substr(2);
					break;
				}
				skippingTrans = skippingSGML || toggledTrans;
				if ((tempLetter = letters[token]) !== undefined && !skippingTrans) {
					if (toRoman) {
						buf.push(tempLetter);
					} else {
						// Handle the implicit vowel. Ignore 'a' and force
						// vowels to appear as marks if we've just seen a
						// consonant.
						if (hadConsonant) {
							if ((tempMark = marks[token])) {
								buf.push(tempMark);
							} else if (token !== 'a') {
								buf.push(virama);
								buf.push(tempLetter);
							}
						} else {
							buf.push(tempLetter);
						}
						hadConsonant = token in consonants;
					}
					tokenBuffer = tokenBuffer.substr(maxTokenLength-j);
					break;
				} else if (j === maxTokenLength - 1) {
					if (hadConsonant) {
						hadConsonant = false;
						if (!optSyncope) {
							buf.push(virama);
						}
					}
					buf.push(token);
					tokenBuffer = tokenBuffer.substr(1);
					// 'break' is redundant here, "j == ..." is true only on
					// the last iteration.
				}
			}
		}
		if (hadConsonant && !optSyncope) {
			buf.push(virama);
		}
		return buf.join('');
	};

	/**
	 * Transliterate from a Brahmic script.
	 *
	 * @param data	 the string to transliterate
	 * @param map	  map data generated from makeMap()
	 * @param options  transliteration options
	 * @return		 the finished string
	 */
	var transliterateBrahmic = function(data, map, options) {
		var buf = [],
			consonants = map.consonants,
			danglingHash = false,
			hadRomanConsonant = false,
			letters = map.letters,
			marks = map.marks,
			temp,
			toRoman = map.toRoman,
			skippingTrans = false;

		for (var i = 0, L; (L = data.charAt(i)); i++) {
			// Toggle transliteration state
			if (L === '#') {
				if (danglingHash) {
					skippingTrans = !skippingTrans;
					danglingHash = false;
				} else {
					danglingHash = true;
				}
				if (hadRomanConsonant) {
					buf.push('a');
					hadRomanConsonant = false;
				}
				continue;
			} else if (skippingTrans) {
				buf.push(L);
				continue;
			}

			if ((temp = marks[L]) !== undefined) {
				buf.push(temp);
				hadRomanConsonant = false;
			} else {
				if (danglingHash) {
					buf.push('#');
					danglingHash = false;
				}
				if (hadRomanConsonant) {
					buf.push('a');
					hadRomanConsonant = false;
				}

				// Push transliterated letter if possible. Otherwise, push
				// the letter itself.
				if ((temp = letters[L])) {
					buf.push(temp);
					hadRomanConsonant = toRoman && (L in consonants);
				} else {
					buf.push(L);
				}
			}
		}
		if (hadRomanConsonant) {
			buf.push('a');
		}
		return buf.join('');
	};

	/**
	 * Transliterate from one script to another.
	 *
	 * @param data	 the string to transliterate
	 * @param from	 the source script
	 * @param to	   the destination script
	 * @param options  transliteration options
	 * @return		 the finished string
	 */
	Sanscript.t = function(data, from, to, options) {
		options = options || {};
		var cachedOptions = cache.options || {},
			defaults = Sanscript.defaults,
			hasPriorState = (cache.from === from && cache.to === to),
			map;

		// Here we simultaneously build up an `options` object and compare
		// these options to the options from the last run.
		for (var key in defaults) {
			if (defaults.hasOwnProperty(key)) {
				var value = defaults[key];
				if (key in options) {
					value = options[key];
				}
				options[key] = value;

				// This comparison method is not generalizable, but since these
				// objects are associative arrays with identical keys and with
				// values of known type, it works fine here.
				if (value !== cachedOptions[key]) {
					hasPriorState = false;
				}
			}
		}

		if (hasPriorState) {
			map = cache.map;
		} else {
			map = makeMap(from, to, options);
			cache = {
				from: from,
				map: map,
				options: options,
				to: to};
		}

		// Easy way out for "{\m+}", "\", and ".h".
		if (from === 'itrans') {
			data = data.replace(/\{\\m\+\}/g, ".h.N");
			data = data.replace(/\.h/g, '');
			data = data.replace(/\\([^'`_]|$)/g, "##$1##");

			// data = data.replace(/\{\\m\+\}/g, "##<strong>ꣳ</strong>##");
			// data = data.replace(/\(\\"\)/g, "##$1##");
		}

		var alldata = '';
		if (map.fromRoman) {
			alldata = transliterateRoman(data, map, options);
		} else {
			alldata = transliterateBrahmic(data, map, options);
		}

		// devanagari - https://github.com/Sandhi-IITBombay/Shobhika/issues/9#issuecomment-491210185
		if (to == 'devanagari') {
			//  श and not श्र in "s.r " (sru in skt) ;
			alldata = alldata.replace(/शृ/g,"श‍ृ")
		} else if (to == 'bengali') {
			// bengali ya - change virama plus য় to virama plus য
			alldata = alldata.replace(/্য়/g,"্য")
		} else if (to == 'kannada') {
			// kannada - change panchama varna to anusvar, except n
			// ~n, ~N, N to M ;
			alldata = alldata.replace(/ಙ್(ಕ|ಖ|ಗ|ಘ)/g,"ಂ$1")
			alldata = alldata.replace(/ಞ್(ಚ|ಛ|ಜ|ಝ)/g,"ಂ$1")
			alldata = alldata.replace(/ಣ್(ಟ|ಠ|ಡ|ಢ)/g,"ಂ$1")
			alldata = alldata.replace(/ನ್(ತ|ಥ|ದ|ಧ)/g,"ಂ$1")
			alldata = alldata.replace(/ಮ್(ಪ|ಫ|ಬ|ಭ)/g,"ಂ$1")
		} else if (to == 'telugu') {
			alldata = alldata.replace(/ఙ్(క|ఖ|గ|ఘ)/g,"ಂ$1")
			alldata = alldata.replace(/ఞ్(చ|ఛ|జ|ఝ)/g,"ಂ$1")
			alldata = alldata.replace(/ణ్(ట|ఠ|డ|ఢ)/g,"ಂ$1")
			alldata = alldata.replace(/న్(త|థ|ద|ధ)/g,"ಂ$1")
			alldata = alldata.replace(/మ్(ప|ఫ|బ|భ)/g,"ಂ$1")
		} else if (to == 'malayalam') {
			// Enable Malayalam Chillu Support - code to be streamlined after rules are defined correctly
			// m to M ;
			alldata = alldata.replace(/മ്/g,"ം")
			// use ZWJ to create chillus for N, n, r, l, L
			// alldata = alldata.replace(/(ണ്|ന്|ര്|ല്|ള്)/g,"$1\u200D")
			// re-change to glyph when followed by p or m,
			alldata = alldata.replace(/ംമ/g,"മ്മ")
			alldata = alldata.replace(/ംപ/g,"മ്പ")
			// or when following t as in gm tm  nm mm Nm
			alldata = alldata.replace(/ഗ്ം/g,"ഗ്മ്")
			alldata = alldata.replace(/ത്ം/g,"ത്മ്")
			alldata = alldata.replace(/ൻം/g,"ന്മ്")
			alldata = alldata.replace(/ംം/g,"മ്മ്")
			alldata = alldata.replace(/ൺം/g,"ണ്മ്")
			// fix NTa-NNa
			alldata = alldata.replace(/ണ്‍ട/g,"ണ്ട")
			alldata = alldata.replace(/ണ്‍ഠ/g,"ണ്ഠ")
			alldata = alldata.replace(/ണ്‍ഡ/g,"ണ്ഡ")
			alldata = alldata.replace(/ണ്‍ഢ/g,"ണ്ഢ")
			alldata = alldata.replace(/ണ്‍ണ/g,"ണ്ണ")
			// fix nta-nna
			alldata = alldata.replace(/ന്‍ത/g,"ന്ത")
			alldata = alldata.replace(/ന്‍ഥ/g,"ന്ഥ")
			alldata = alldata.replace(/ന്‍ദ/g,"ന്ദ")
			alldata = alldata.replace(/ന്‍ധ/g,"ന്ധ")
			alldata = alldata.replace(/ന്‍ന/g,"ന്ന")
			// remove ZWJ when followed by ya la va
			alldata = alldata.replace(/\u200D(യ|വ|ല)/g,"$1")
			// fix for ര്‍വ.  -  r^va
			alldata = alldata.replace(/ര്വ/g,"ര്‍വ")
			// chillu k not used much
			// alldata = alldata.replace(/ക്/g,"ക്‍")
			// glyph not defined for this yet
			// alldata = alldata.replace(/ൻ്റ/g,"ൻ്റ) ")
		} else if (to == 'tamil') {
			// Enable Tamil Accents Support
			if (options.enableTamilPronunciation == true) {
				alldata = alldata
					.replace(/(.)(²|³|⁴)(ா|ி|ீ|ு|ூ|ெ|ே|ை|ொ|ோ|ௌ)/g,"$1$3$2")
					.replace(/(.)(²|³|⁴)(்|:|ʼ|॒|॑|᳚)/g,"$1$3$2")
					.replace(/(.)(²|³|⁴|ʼ)(॒|॑|᳚)/g,"$1$3$2")
					.replace(/(.)(:)(॒|॑)/g,"$1$3$2")
			}
			if (options.enableTamilCharPositionFixes == true) {
				alldata = alldata
					.replace(/(த(்|ா|ி|ீ|ு|ூ|ெ|ே|ை|ொ|ோ|ௌ)?(²|³|⁴)?)ன/g, "$1ந")
					.replace(/ன((்|ா|ி|ீ|ு|ூ|ெ|ே|ை|ொ|ோ|ௌ)?(²|³|⁴)?)த/g, "ந$1த")
					.replace(/(^|\s)ன/g,"$1ந")
					.replace(/பழனி/g,"பழநி")
					.replace(/யுக³ல/g,"யுக³ள")
					.replace(/துலஸீ/g,"துளஸீ")
					.replace(/தும்ப³ர-தால/g,"தும்ப³ர-தாள")
					.replace(/ராக³தால/g,"ராக³தாள")
					.replace(/மங்க³ல/g,"மங்க³ள")
					.replace(/மம்க³ல/g,"மங்க³ள")
					.replace(/த⁴வல/g,"த⁴வள")
					.replace(/மஞ்ஜுல/g,"மஞ்ஜுள")
					.replace(/கீர்தநாவல/g,"கீர்தநாவள")
					.replace(/முக்தாவல/g,"முக்தாவள")
					.replace(/நாமாவல/g,"நாமாவள")
					.replace(/புஷ்பாவல/g,"புஷ்பாவள")
					.replace(/ரத்நாவல/g,"ரத்நாவள")
					.replace(/ஸ்தோத்ராவல/g,"ஸ்தோத்ராவள")
					.replace(/சரணயுக³லாய/g,"சரணயுக³ளாய")
					.replace(/ப⁴க்திபரிமலாய/g,"ப⁴க்திபரிமளாய")
					.replace(/பத³யுக³லாய/g,"பத³யுக³ளளாய")
					.replace(/துலஸீத³ல/g,"துலஸீத³ள")
					.replace(/ப⁴க்திபரிமலித/g,"ப⁴க்திபரிமளித")
					.replace(/மஞ்ஜுலதம/g,"மஞ்ஜுளதம")
					.replace(/சரணயுக³ல/g,"சரணயுக³ள")
					.replace(/சரணயுக³லத்³ருʼட⁴/g,"சரணயுக³ளத்³ருʼட⁴")
					.replace(/க்ஷராவலி/g,"க்ஷராவளி")
					.replace(/கிரணாவலி/g,"கிரணாவளி")
			}
			alldata = alldata
				.replace(/மங்க³ள்ய/g,"மங்க³ல்ய")
				.replace(/ம்க/g,"ங்க")
				.replace(/ம்ச/g,"ஞ்ச")
				.replace(/ம்ஜ/g,"ஞ்ஜ")
				.replace(/ஞ்ஜ்ஞ/g,"ம்ஜ்ஞ")
				.replace(/ம்த/g,"ந்த")
				.replace(/ம்ட/g,"ண்ட")
		} else if (to == 'grantamil') {
			if(options.enableTamilCharPositionFixes == true) {
				alldata = alldata
					.replace(/(খ|গ|ঘ|ছ|ঝ|ঠ|ড|ঢ|থ|দ|ধ|ফ|ব|ভ|ৰ)(ே)/g, "◌ே$1") //Add invisible \u25CC for it to work
					.replace(/(খ|গ|ঘ|ছ|ঝ|ঠ|ড|ঢ|থ|দ|ধ|ফ|ব|ভ|ৰ)(ோ)/g, "◌ே$1া") //Add invisible \u25CC for it to work
					.replace(/(খ|গ|ঘ|ছ|ঝ|ঠ|ড|ঢ|থ|দ|ধ|ফ|ব|ভ|ৰ)(ை)/g, "◌ை$1") //Add invisible ◌ at beginning
					.replace(/(খ|গ|ঘ|ছ|ঝ|ঠ|ড|ঢ|থ|দ|ধ|ফ|ব|ভ|ৰ)(ௌ)/g, "◌ெ$1ள") //Add invisible ◌ at beginning
			}
			alldata = alldata
				.replace(/ம்க/g,"ங்க")
				.replace(/ம்ச/g,"ஞ்ச")
				.replace(/ம்ஜ/g,"ஞ்ஜ")
				.replace(/ம்த/g,"ந்த")
				.replace(/ம்ட/g,"ண்ட")
				.replace(/ராগதால/g,"ராগதாள")
				.replace(/நாமாவல/g,"நாமாவள")
				.replace(/புஷ்பாவல/g,"புஷ்பாவள")
				.replace(/மங்গல/g,"மங்গள")
				.replace(/மம்গல/g,"மங்গள")
		}
		return alldata;
	};

	// Now that Sanscript is fully defined, we now safely export it for use elsewhere.
	// The below block was copied from https://www.npmjs.com/package/sanscript .
	// define seems to be a requirejs thing https://requirejs.org/docs/whyamd.html#amd .
	if (typeof define === 'function' && define.amd) {
		define(function(){ return Sanscript; });
	} else if(typeof exports !== 'undefined') {
		if (typeof module !== 'undefined' && module.exports) {
			exports = module.exports = Sanscript;
		}

		exports.Sanscript = Sanscript;
	} else {
		global.Sanscript = Sanscript;
	}
})(this);
