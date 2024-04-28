//prints the number of lines in all tsx files for modular audit
const glob = require("glob-promise");
const fs = require("fs");
const path = require("path");

// Adjust the path to point to the 'src' directory from the root of the project
const PROJECT_DIR = path.join(__dirname, "../src");

const countLines = (filePath) => {
  const fileContent = fs.readFileSync(filePath, "utf8");
  return fileContent.split("\n").length;
};

const sortTsxFIlesByLineCount = async () => {
  console.log(`Starting to search for TSX files in directory: ${PROJECT_DIR}`);

  try {
    const files = await glob(`${PROJECT_DIR}/**/*.tsx`);
    if (files.length === 0) {
      console.log("No TSX files found.");
      return;
    }

    console.log(`Found ${files.length} TSX files. Proceeding to count lines.`);

    const fileLineCounts = files.map((file) => {
      const lines = countLines(file);
      return { name: path.basename(file), path: file, lines };
    });

    fileLineCounts.sort((a, b) => b.lines - a.lines);

    console.log("TSX files sorted by line count:");
    fileLineCounts.forEach((file) =>
      console.log(`${file.name}: ${file.lines} lines`),
    );
  } catch (err) {
    console.error("Error finding TSX files:", err);
  }
};

sortTsxFIlesByLineCount();
