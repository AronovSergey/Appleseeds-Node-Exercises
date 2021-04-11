const fs = require('fs');

fs.writeFileSync("newTextFile.txt", "");
fs.copyFileSync("newTextFile.txt", "newTextFileCoppy.txt");
fs.renameSync("newTextFileCoppy.txt", "newTextFileCopy.txt");
console.log(fs.readdirSync("./"));
console.log(fs.readdirSync("./../01.1-Node_VS_ JS"));
fs.mkdirSync("./folder");