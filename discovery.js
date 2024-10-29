const fs = require('fs');
const path = require('path');

// Get folder path and keyword from command line arguments
const folderPath = process.argv[2];
const keyword = process.argv[3];

if (!folderPath || !keyword) {
    console.error('Usage: node script.js <folderPath> <keyword>');
    process.exit(1);
}

fs.readdir(folderPath, (err, files) => {
    if (err) {
        return console.error('Error reading directory:', err);
    }

    files.forEach((file) => {
        const filePath = path.join(folderPath, file);

        // Check if it's a file
        if (fs.lstatSync(filePath).isFile()) {
            fs.readFile(filePath, 'utf8', (err, data) => {
                if (err) {
                    return console.error(`Error reading file ${filePath}:`, err);
                }

                // Check if the keyword exists in the file
                if (data.includes(keyword)) {
                    // Print the filename without extension
                    console.log(path.parse(file).name);
                }
            });
        }
    });
});
