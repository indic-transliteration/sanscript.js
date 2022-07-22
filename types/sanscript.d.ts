export namespace defaults {
    const skip_sgml: boolean;
    const syncope: boolean;
    const preferred_alternates: {[key:string]:{[key:string]:string}};
}

export type Options = {
    skip_sgml: boolean;
    syncope: boolean;
    preferred_alternates: {[key:string]:{[key:string]:string}};
}
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
 * @param name    the scheme name
 * @param scheme  the scheme data itself. This should be constructed as
 *                described above.
 */
export function addBrahmicScheme(name: string, scheme: {[key:string]:{[key:string]:string}}): void;
/**
 * Add a roman scheme to Sanscript.
 *
 * See the comments on Sanscript.addBrahmicScheme. The "vowel_marks" field
 * can be omitted.
 *
 * @param name    the scheme name
 * @param scheme  the scheme data itself
 */
export function addRomanScheme(name: string, scheme: {[key:string]:{[key:string]:string}}): void;
/**
 * Transliterate from one script to another.
 *
 * @param data     the string to transliterate
 * @param from     the source script
 * @param to       the destination script
 * @param options  transliteration options
 * @return         the finished string
 */
export function t(data: string, from: string, to: string, options: any): string;
export { schemes, Sanscript };
