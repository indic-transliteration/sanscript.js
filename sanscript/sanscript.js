/**
 * sanscript.js
 *
 * sanscript.js is a Sanskrit transliteration library. Currently, it supports
 * other Indian languages only incidentally.
 *
 * Produced by learnsanskrit.org
 *
 * Released under the MIT and GPL Licenses.
 */
 
var Sanscript = new function() {
    var Sanscript = this;
    Sanscript.schemes = {
        /* Devanagari (full ITRANS) */
        devanagari: {
            vowels: 'अ आ इ ई उ ऊ ऋ ॠ ऌ ॡ ए ऐ ओ औ'.split(' '),
            vowel_marks: 'ा ि ी ु ू ृ ॄ ॢ ॣ े ै ो ौ'.split(' '),
            other_marks: 'ं ः ँ'.split(' '),
            virama: '्',
            consonants: 'क ख ग घ ङ च छ ज झ ञ ट ठ ड ढ ण त थ द ध न प फ ब भ म य र ल व श ष स ह ळ क्ष ज्ञ'.split(' '),
            other: '० १ २ ३ ४ ५ ६ ७ ८ ९ ॐ ऽ । ॥ ‍'.split(' '), // Last element is ZWJ
        },
        
        /* International Alphabet of Sanskrit Transliteration
         * --------------------------------------------------
         * The most "professional" Sanskrit romanization scheme.
         * 
         */
        iast: {
            vowels: 'a ā i ī u ū ṛ ṝ ḷ ḹ e ai o au'.split(' '),
            other_marks: 'ṃ ḥ ~'.split(' '),
            virama: '',
            consonants: 'k kh g gh ṅ c ch j jh ñ ṭ ṭh ḍ ḍh ṇ t th d dh n p ph b bh m y r l v ś ṣ s h ḻ kṣ jñ'.split(' '),
            other: "0 1 2 3 4 5 6 7 8 9 oṃ ' । ॥ ".split(' ')
        },
        
        /* ITRANS
         * ------
         * ITRANS is a complicated scheme. Several letters have alternate
         * representations. These alternates are included as a helper
         * function in makeMap().
         */
        itrans: {
            vowels: 'a A i I u U RRi RRI LLi LLI e ai o au'.split(' '),
            other_marks: 'M H .N'.split(' '),
            virama: '',
            consonants: 'ka kha ga gha ~Na cha Cha ja jha ~na Ta Tha Da Dha Na ta tha da dha na pa pha ba bha ma ya ra la va sha Sha sa ha La kSha j~na'.split(' '),
            other: '0 1 2 3 4 5 6 7 8 9 OM .a | || {}'.split(' '),
        
        },
        
        /* Harvard-Kyoto
         * -------------
         * 
         */
        hk: {
            vowels: 'a A i I u U R RR lR lRR e ai o au'.split(' '),
            other_marks: 'M H ~'.split(' '),
            virama: '',
            consonants: 'k kh g gh G c ch j jh J T Th D Dh N t th d dh n p ph b bh m y r l v z S s h L kS jJ'.split(' '),
            other: "0 1 2 3 4 5 6 7 8 9 OM ' | || ".split(' ')
        },
        
        /* National Library at Kolkata
         * ---------------------------
         * Apart from using "ē" and "ō" instead of "e" and "o", this scheme is
         * identical to IAST.
         */
        kolkata: {
            vowels: 'a ā i ī u ū ṛ ṝ ḷ ḹ ē ai ō au'.split(' '),
            other_marks: 'ṃ ḥ ~'.split(' '),
            virama: '',
            consonants: 'k kh g gh ṅ c ch j jh ñ ṭ ṭh ḍ ḍh ṇ t th d dh n p ph b bh m y r l v ś ṣ s h ḻ kṣ jñ'.split(' '),
            other: "0 1 2 3 4 5 6 7 8 9 oṃ ' । ॥ ".split(' ')
        },
        
        /* Sanskrit Library Phonetic Basic encoding
         * ----------------------------------------
         * With one ASCII letter per phoneme, this is the tersest transliteration
         * scheme in use today and is especially suited to computer processing.
         */
        slp1: {
            vowels: 'a A i I u U f F x X e E o O'.split(' '),
            other_marks: 'M H ~'.split(' '),
            virama: '',
            consonants: 'k K g G N c C j J Y w W q Q R t T d D n p P b B m y r l v S z s h L kz jY'.split(' '),
            other: "0 1 2 3 4 5 6 7 8 9 oM ' . .. ".split(' ')
        },
        
        /* Velthuis
         * --------
         * 
         */
        velthuis: {
            vowels: 'a aa i ii u uu .r .rr .li .ll e ai o au'.split(' '),
            other_marks: '.m .h '.split(' '), // TODO
            virama: '',
            consonants: 'k kh g gh "n c ch j jh ~n .t .th .d .d .n t th d dh n p ph b bh m y r l v ~s .s s h L k.s j~n'.split(' '),
            other: "0 1 2 3 4 5 6 7 8 9 o.m ' | || ".split(' '),
        },
    };
    
    var romanSchemes = ['iast', 'hk', 'kolkata', 'slp1', 'velthuis'];
    
    // Add a "vowel_marks" field for each roman scheme
    for (var i = 0, name; name = romanSchemes[i]; i++) {
        var scheme = Sanscript.schemes[name];
        scheme.vowel_marks = scheme.vowels.slice(1);
    }
    
    /**
     * Check whether the given scheme encodes romanized Sanskrit.
     * O(n) is fast enough.
     *
     * @param name  the scheme name
     */
    Sanscript.isRomanScheme = function(name) {
        for (var i = 0, x; x = romanSchemes[i]; i++) {
            if (name === x) {
                return true;
            }
        }
        return false;
    };
   
    /* ----------------------------------------------------------------
     *  Script setup
     * ----------------------------------------------------------------
     */
    
    var unicodeOffsets = {
		bengali   : 0x0080,
		gurmukhi  : 0x0100,
		gujarati  : 0x0180,
		oriya     : 0x0200,
		tamil     : 0x0280,
		telugu    : 0x0300,
		kannada   : 0x0380,
		malayalam : 0x0400,
	};
    
    // Maps primary representations to a list of alternates.
	var scriptAlternates = {
	    itrans: {
	        A: ['aa'],
	        I: ['ii', 'ee'],
	        U: ['uu', 'oo'],
	        RRi: ['R^i'],
	        RRI: ['R^I'],
	        LLi: ['L^i'],
	        LLI: ['L^I'],
	        '': ['.h'],
	        M: ['.m', '.n'],
	        ch: ['c'],
	        Ch: ['C', 'chh'],
	        '~n': ['JN'],
	        v: ['w'],
	        Sh: ['S', 'shh'],
	        kSh: ['kS', 'x'],
	        'j~n': ['GY', 'dny'],
	        OM: ['AUM'],
	        "'": ['~'],
	        '|': ['.'],
	        '||': ['..'],
	        '{}': ['_'],
	    },
	};
	
	var scriptOverrides = {
	    kannada: {'ॐ': 'ಓಂ', '।': '।', '॥': '॥'}
	};
	
	// Using the Unicode offsets above, create schemes for the other Brahmi scripts.
	for (var script in unicodeOffsets) {
	    var scheme = {},
	        offset = unicodeOffsets[script],
	        dev = this.schemes.devanagari,
	        overrides = scriptOverrides[script];
	    
	    for (groupName in dev) {
	        var data = [],
	            group = dev[groupName],
	            temp;
	        for (var i = 0, cluster; cluster = group[i]; i++) {
	            // Use overrides if they are defined.
	            if (overrides && (temp = overrides[cluster]) !== undefined) {
	                data.push(temp);
	            } else {
	                var buf = [];
	                // We can't assume that each cluster has just one letter.
	                for (var j = 0, L; L = cluster.charAt(j); j++) {
	                    buf.push(String.fromCharCode(L.charCodeAt(0) + offset));
	                };
	                data.push(buf.join(''));
	            }
	        }
	        scheme[groupName] = data;
	    }
	    this.schemes[script] = scheme;
	}
  
    /**
     * Create a map from every character in `from` to its partner in `to`.
     * Also, store any "marks" that `from` might have.
     * 
     * @param from     input scheme
     * @param to       output scheme
     * @param options  scheme options
     */
    var makeMap = function(from, to, options) {
        var consonants = {},
            fromScheme = Sanscript.schemes[from],
            letters = {},
            marks = {},
            toScheme = Sanscript.schemes[to];
        for (var group in fromScheme) {
            var fromGroup = fromScheme[group],
                toGroup = toScheme[group];
            for (var i in fromGroup) {
                if (group === 'vowel_marks') {
                    marks[fromGroup[i]] = toGroup[i];
                } else if (group === 'virama') {
                    marks[fromGroup] = toGroup;
                } else {
                    letters[fromGroup[i]] = toGroup[i];
                    if (group == 'consonants') {
                        consonants[fromGroup[i]] = toGroup[i];
                    }
                }
            }
        }
        return {consonants: consonants,
            fromRoman: Sanscript.isRomanScheme(from),
            letters: letters,
            marks: marks,
            toRoman: Sanscript.isRomanScheme(to),
            virama: toScheme.virama};
    };
  
    /**
     * Transliterate from a romanized script.
     *
     * @param data     the string to transliterate
     * @param map      map data generated from makeMap()
     * @param options  transliteration options (TODO)
     * @return         the finished string 
     */
    var transliterateRoman = function(data, map, options) {
		var buf = [],
			consonants = map.consonants,
			dataLength = data.length,
			hadConsonant = false,
			letters = map.letters,
			marks = map.marks,
			maxTokenLength = 3,
			tempLetter,
			tempMark,
			tokenBuffer = '',
			toRoman = map.toRoman,
			transliterationEnabled = true,
			virama = map.virama;
        // Iterate while there's more left.
		for (var i = 0, L; L = data.charAt(i) || tokenBuffer; i++) {
		    // Build up a token provided it's still possible.
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
		        
		        if (token == '##') {
		            transliterationEnabled = !transliterationEnabled;
		            tokenBuffer = tokenBuffer.substr(2);
		            break;
		        }
		        if ((tempLetter = letters[token]) && transliterationEnabled) {
		            if (toRoman) {
		                buf.push(tempLetter);
		            } else {
		                // Handle the implicit vowel. Ignore 'a' and force
		                // vowels to appear as marks if we've just seen a
		                // consonant.
		                if (hadConsonant) {
		                    if (tempMark = marks[token]) {
		                        buf.push(tempMark)
		                    } else if (token != 'a') {
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
		        } else if (j == maxTokenLength - 1) {
		            if (hadConsonant) {	            
    		            hadConsonant = false;
    		            buf.push(virama)
    		        }
		            buf.push(token);
		            tokenBuffer = tokenBuffer.substr(1);
		            // 'break' is redundant here, "j == ..." is only true on
		            // the last iteration.
		        }
		    }
		}
		if (hadConsonant) {
		    buf.push(virama);
		}
		return buf.join('');
    };
    
    /**
     * Transliterate from a Brahmi script.
     *
     * @param data     the string to transliterate
     * @param map      map data generated from makeMap()
     * @param options  transliteration options (TODO)
     * @return         the finished string 
     */
    var transliterateBrahmi = function(data, map, options) {
        var buf = [],
            consonants = map.consonants,
            hadConsonant = false,
            letters = map.letters,
            marks = map.marks,
            temp,
            toRoman = map.toRoman;
        for (var i = 0, L; L = data.charAt(i); i++) {
			if ((temp = marks[L]) !== undefined) {
				buf.push(temp);
				hadConsonant = false;
			} else {
				if (toRoman && hadConsonant) {
				    // Consecutive consonants -> implicit 'a'
					buf.push('a');
					hadConsonant = false;
				}
				
				// Push transliterated letter if possible. Otherwise, push
				// the letter itself.
				if (temp = letters[L]) {
					buf.push(temp);
					hadConsonant = (L in consonants);
				} else {
					buf.push(L);
				}
			}
        }
        // Ends in bare consonant -> implicit 'a'
        if (toRoman && hadConsonant) {
            buf.push('a');
        }
        return buf.join('');
    };
    
    /**
     * Transliterate from one script to another.
     *
     * @param data     the string to transliterate
     * @param from     the source script
     * @param to       the the destination script
     * @param options  transliteration options (TODO)
     * @return         the finished string 
     */
    Sanscript.t = function(data, from, to, options) {
        var transMap = makeMap(from, to, options);
        
        if (transMap.fromRoman) {
            return transliterateRoman(data, transMap, options);
        } else {
            return transliterateBrahmi(data, transMap, options);
        }
    };
};
