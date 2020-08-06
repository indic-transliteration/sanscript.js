const fsp = require("fs").promises;
const path = require("path");

async function main () {
    // Get lists of Brahmic and roman schemes
    // Each of bschemes and rschemes is an array of which each element is of
    // the form [filename, filepath]
    const [bschemes, rschemes] = await Promise.all(
        ["brahmic", "roman"].map(async (x) => {
            const dirpath = path.join(__dirname, "..", "src", "schemes", x);
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
            const fileContents = await fsp.readFile(filepath);
            return [schemeName, fileContents];
        })),
    ));

    // Get file handle for sanscript.js
    let out;
    try {
        out = await fsp.open(
            path.join(__dirname, "sanscript.js"), "w",
        );
        out.write("var schemes = {};\n");
        for (const [scheme, contents] of bfiles) {
            out.write(`schemes.${scheme} = ${contents.toString().trim()};\n`);
        }
        for (const [scheme, contents] of rfiles) {
            out.write(`schemes.${scheme} = ${contents.toString().trim()};\n`);
        }
        // Write the code to the output file
        out.write(await fsp.readFile(
            path.join(__dirname, "..", "src", "sanscript.js"),
        ));
    } finally {
        if (out !== undefined)
            await out.close();
    }
}

main().catch(console.error);
