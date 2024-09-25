const http = require("http");

http
  .createServer(function (req, res) {
    try {
      console.log("Server is running");

      // Folosim funcția pentru a număra și citi fișierele din director
      fisiere.countAndReadFilesInDirectory("bk", (directoryContent) => {
        if (directoryContent) {
          res.write(directoryContent);
        } else {
          res.write("Error reading directory or files");
        }
        res.end();
      });
    } catch (e) {
      console.error("Error handling request:", e);
      res.write("Server error");
      res.end();
    }
  })
  .listen(3000, () => {
    console.log("Server is listening on port 3000");
  });