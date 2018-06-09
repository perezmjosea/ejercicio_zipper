const fs = require("fs");
const archiver = require("archiver");

const output = fs.createWriteStream("./myfiles.zip");
const archive = archiver("zip", { zlib: { level: 9 } });

output.on("close", () =>
  console.log(`Archivo comprimido con: ${archive.pointer()} bytes`)
);

archive.on("error", function(err) {
  throw err;
});

archive.pipe(output);

archive.append(fs.createReadStream("./files/file1.txt"), {
  name: "archivo1.txt"
});
archive.file("./files/file2.txt", { name: "archivo2.txt" });

archive.finalize();
