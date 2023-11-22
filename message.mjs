import * as fs from "node:fs";

fs.writeFile("example.txt", "Hello,Nico!", (err) => {
  if (err) {
    console.error("Error file:", err);
  }
  fs.writeFile("example2.txt", "Hello,Nico Marci!", (err) => {
    if (err) {
      console.error("Error file:", err);
    }
  });
});
