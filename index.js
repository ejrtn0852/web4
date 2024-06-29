import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const fileName = fileURLToPath(import.meta.url);
const dirName = path.dirname(fileName);

// 경로 수정: 올바른 디렉토리 경로 설정
const directoryPath = path.join(dirName, 'src/css/img/eventimg');
console.log(`Directory Path: ${directoryPath}`);
const outputPath = path.join(dirName, 'images.json');

fs.readdir(directoryPath, (err, files) => {
  if (err) {
    console.error(`Error reading directory: ${err.message}`);
    return;
  }

  const images = files.filter(file => {
    return ['.jpg', '.jpeg', '.png', '.gif'].includes(path.extname(file).toLowerCase());
  });

  fs.writeFileSync(outputPath, JSON.stringify(images, null, 2));
  console.log(`Images have been saved to ${outputPath}`);
});