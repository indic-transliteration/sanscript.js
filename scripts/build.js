const fsp = require("fs").promises;
const path = require("path");
const toml = require( 'toml' );

async function main () {
    const rootDir = path.dirname(__dirname);

    // Get lists of Brahmic and roman schemes
    // Each of bschemes and rschemes is an array of which each element is of
    // the form [filename, filepath]
    const [bschemes, rschemes] = await Promise.all(
        ["brahmic", "roman"].map(async (x) => {
            const dirpath = path.join(rootDir, "node_modules", "@indic-transliteration", "common_maps", x);
            const paths = [];
            for (const filename of await fsp.readdir(dirpath)) {
                paths.push([filename, path.join(dirpath, filename)]);
            }
            return paths;
        }),
    );

    // Get arrays of Brahmic and roman scheme file contents
    // Each of bfiles and rfiles is an array of which each element is of the
    // form [schemeName, fileContents]
    const [bfiles, rfiles] = await Promise.all([bschemes, rschemes].map((x) =>
        Promise.all(x.map(async ([filename, filepath]) => {
            const schemeName = filename.split(".");
            schemeName.pop();
            let fileContents = await fsp.readFile(filepath);
            const schemeObj = toml.parse(fileContents);
            
            if (filepath.match(/\broman\b/)) {
                schemeObj.isRomanScheme = true;
            }
            fileContents = JSON.stringify(schemeObj);
            return [schemeName, fileContents];
        })),
    ));

    let devanagariVowelToMarks = await fsp.readFile(path.join(rootDir, "node_modules", "@indic-transliteration", "common_maps", "_devanagari_vowel_to_marks.toml"));
    devanagariVowelToMarks = JSON.stringify(toml.parse(devanagariVowelToMarks));


    // Get file handle for sanscript.js
    let out;
    try {
        out = await fsp.open(
            path.join(rootDir, "sanscript.es6.js"), "w",
        );
        out.write("const schemes = {};\n");
        for (const [scheme, contents] of bfiles) {
            out.write(`schemes.${scheme} = ${contents.toString().trim()};\n`);
        }
        for (const [scheme, contents] of rfiles) {
            out.write(`schemes.${scheme} = ${contents.toString().trim()};\n`);
        }
        out.write(`const devanagariVowelToMarks = ${devanagariVowelToMarks};`);
        // Write the code to the output file
        out.write(await fsp.readFile(
            path.join(rootDir, "src", "sanscript.js"),
        ));
    } finally {
        if (out !== undefined)
            await out.close();
    }
}

main().catch(console.error);
