import * as fs from "node:fs";

const fileName = "example.txt";
const fileContent = "Hello, Nico!";

fs.writeFile(fileName, fileContent, (err) => {
  if (err) {
    console.error("Error file:", err);
  }
});
