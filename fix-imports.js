const fs = require('fs');
const path = require('path');
const folder = 'src/components/landing';
const files = fs.readdirSync(folder);
files.forEach(f => {
    if (f.endsWith('.tsx')) {
        const p = path.join(folder, f);
        let c = fs.readFileSync(p, 'utf-8');
        c = c.replace(/@\/src\/components\/ui\/Logo/g, '@/components/ui/Logo');
        fs.writeFileSync(p, c);
    }
});
console.log('Fixed imports!');
