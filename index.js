import fs from 'fs';
import path from 'path';
import {fileURLToPath} from 'url';

const fileName = fileURLToPath(import.meta.url);
const dirName = path.dirname(fileName);

const directoryPath = path.join(dirName, 'src/css/img/event');
const outputPath = path.join(dirName, 'images.json');

fs.readdir(directoryPath, (err, files) => {
  const images = files.filter( file => {
   return  ['.jpg', '.jpeg', '.png', '.gif'].includes(path.extname(file).toLowerCase());
  });
  fs.writeFileSync(outputPath,JSON.stringify(images, null, 2));
})


