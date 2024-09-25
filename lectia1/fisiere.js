const fs = require("fs");
const path = require("path");

const fisiere = {
  writeMyFile: function (filePath, content) {
    try {
      let fullPath = path.join(__dirname, filePath);
      fs.writeFileSync(fullPath, content);
      console.log(`File ${filePath} created successfully.`);
    } catch (err) {
      console.error("Error writing to file:", err);
    }
  },

  readFile: function (filePath, callback) {
    let fullPath = path.join(__dirname, filePath);
    console.log("Trying to read file from:", fullPath);

    fs.readFile(fullPath, "utf-8", (err, data) => {
      if (err) {
        console.error("Error reading file:", err);
        callback(null); // trimite null dacă există eroare
      } else {
        callback(data); // trimite conținutul fișierului în callback
      }
    });
  },

  generateMultiplicationTable: function (number) {
    let result = "";
    for (let i = 1; i <= 10; i++) {
      result += `${number} * ${i} = ${number * i}\n`;
    }
    return result;
  },

  createSeparateFiles: function () {
    for (let i = 1; i <= 10; i++) {
      let multiplicationTable = this.generateMultiplicationTable(i);
      let fileName = `table_${i}.txt`;
      this.writeMyFile(fileName, multiplicationTable);
    }
  },

  countAndReadFilesInDirectory: function (directoryPath, callback) {
    try {
      let fullPath = path.join(__dirname, directoryPath);

      // Verifică dacă directorul există, dacă nu, creează-l
      if (!fs.existsSync(fullPath)) {
        fs.mkdirSync(fullPath, { recursive: true }); // Creează directorul
        console.log(`Directory created: ${fullPath}`);
      }

      let files = fs.readdirSync(fullPath);
      let txtFiles = files.filter((file) => file.endsWith(".txt"));

      console.log(`Number of files in the directory: ${files.length}`);
      console.log(`Number of .txt files in the directory: ${txtFiles.length}`);

      let allContent = "";
      let filesRead = 0;

      txtFiles.forEach((file) => {
        let filePath = path.join(fullPath, file);

        fs.readFile(filePath, "utf-8", (err, content) => {
          filesRead++;
          if (!err) {
            allContent += `\n--- Content of ${file} ---\n${content}`;
          }

          // Dacă toate fișierele au fost citite
          if (filesRead === txtFiles.length) {
            this.writeMyFile(path.join(directoryPath, "all_contents.txt"), allContent);
            callback(allContent); // trimite conținutul în callback
          }
        });
      });

    } catch (err) {
      console.error("Error reading directory or files:", err);
      callback(null); // trimite null dacă există eroare
    }
  },
};

// Creează fișierele cu tabelele de înmulțire
fisiere.createSeparateFiles();

// Citește conținutul unui singur fișier `table_1.txt`
fisiere.readFile("table_1.txt", (content) => {
  if (content) {
    console.log("File content:\n", content);
  } else {
    console.log("Failed to read the file.");
  }
});