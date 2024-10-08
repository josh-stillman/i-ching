import fs from 'fs';

import opentype from 'opentype.js';
import path from 'path';

const main = async () => {
  const buffer = fs.readFileSync(
    path.join(__dirname, 'LibreFranklin-Italic-VariableFont_wght.ttf')
  );

  const font = opentype.parse(buffer.buffer);

  console.log(font);

  const x = font.toArrayBuffer();

  const typed = new Uint8Array(x);

  fs.writeFileSync('ital.otf', typed, 'utf-8');
};

main();
