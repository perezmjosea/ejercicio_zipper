const fs = require("fs");
const archiver = require("archiver");

function finish(archive) {
  archive.finalize();
}

function addFiles(archive, files, baseRoute) {
  files.forEach(item =>
    archive.append(fs.createReadStream(`${baseRoute}${item}`), { name: item })
  );

  return archive;
}

function generateArchive(format, compressionLevel, outputStream) {
  const archive = archiver(format, { zlib: { level: compressionLevel } });

  // Si hay un error paro la ejecución
  archive.on("error", function(err) {
    throw err;
  });

  // Le paso al generador de compresión el stream para que opere sobre él
  archive.pipe(outputStream);

  return archive;
}

module.exports = {
  generateArchive,
  addFiles,
  finish
};
