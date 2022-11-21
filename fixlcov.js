const path = require("path");
const { readFileSync, writeFileSync } = require("fs");

const lcovFile = path.resolve(__dirname, "./coverage/lcov.info");
const rawFile = readFileSync(lcovFile, "utf8");
const rebuiltPaths = rawFile
    .split("\n")
    .map((singleLine) => {
        if (singleLine.startsWith("SF:")) {
            return singleLine.replace("SF:", `SF:${__dirname}\\`);
        }
        return singleLine;
    })
    .join("\n");
writeFileSync(lcovFile, rebuiltPaths, "utf8");
console.log("lcov.info fixed!")
