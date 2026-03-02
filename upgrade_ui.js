const fs = require('fs');
const path = require('path');

const dir = process.argv[2];
if (!dir) { console.error("No dir"); process.exit(1); }

const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx'));
const replacements = [
    [/bg-white/g, 'bg-card/60 backdrop-blur-3xl'],
    [/bg-gray-50/g, 'bg-muted/30'],
    [/bg-gray-100/g, 'bg-muted'],
    [/text-gray-900/g, 'text-foreground'],
    [/text-gray-800/g, 'text-foreground/90'],
    [/text-gray-700/g, 'text-muted-foreground'],
    [/text-gray-600/g, 'text-muted-foreground'],
    [/text-gray-500/g, 'text-muted-foreground/80'],
    [/text-gray-400/g, 'text-muted-foreground/60'],
    [/border-gray-200/g, 'border-border/50'],
    [/border-gray-300/g, 'border-border'],
    [/shadow-sm/g, 'shadow-soft'],
    [/rounded-xl/g, 'rounded-[3rem]'],
];

files.forEach(f => {
    let content = fs.readFileSync(path.join(dir, f), 'utf-8');
    replacements.forEach(([regex, repl]) => {
        content = content.replace(regex, repl);
    });
    fs.writeFileSync(path.join(dir, f), content);
    console.log(`Updated ${f}`);
});
