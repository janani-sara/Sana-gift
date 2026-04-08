const fs = require('fs');
const path = require('path');
const root = path.join(process.cwd(), 'src');
const regex = /(["'])\s*"?E:\\ABDUL\\New folder\\BG-1.0\\Data\\([^"']+?)"?\1/g;
function walk(dir) {
  fs.readdirSync(dir, { withFileTypes: true }).forEach((d) => {
    const p = path.join(dir, d.name);
    if (d.isDirectory()) {
      walk(p);
    } else if (p.endsWith('.tsx')) {
      const txt = fs.readFileSync(p, 'utf8');
      const newTxt = txt.replace(regex, (_, q, file) => `'/data/${file.replace(/\\/g, '/')}'`);
      if (newTxt !== txt) {
        fs.writeFileSync(p, newTxt, 'utf8');
        console.log('updated', p);
      }
    }
  });
}
walk(root);
