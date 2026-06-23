const fs = require('fs');
let code = fs.readFileSync('src/pages/marketing/Home.jsx', 'utf8');

// Fix Comparison table row paddings
code = code.replace(/<div key=\{idx\} className="grid grid-cols-3 p-4 items-center gap-2 hover:bg-white transition-colors">/g, '<div key={idx} className="grid grid-cols-3 p-1.5 items-center gap-1 hover:bg-white transition-colors">');
code = code.replace(/<div className="flex items-center gap-1 text-body text-xs md:text-sm">/g, '<div className="flex items-center gap-1 text-body text-[10px] md:text-xs">');
code = code.replace(/<div className="flex items-center gap-2 text-primary font-bold text-xs md:text-sm">/g, '<div className="flex items-center gap-1 text-primary font-bold text-[10px] md:text-xs">');
code = code.replace(/<div className="w-4 h-4 rounded-full bg-accent\/10 flex items-center justify-center shrink-0 text-accent font-bold text-\[10px\]">/g, '<div className="w-3 h-3 rounded-full bg-accent/10 flex items-center justify-center shrink-0 text-accent font-bold text-[8px]">');
code = code.replace(/<div className="w-4 h-4 rounded-full bg-success\/20 flex items-center justify-center shrink-0 text-success font-bold text-\[10px\]">/g, '<div className="w-3 h-3 rounded-full bg-success/20 flex items-center justify-center shrink-0 text-success font-bold text-[8px]">');
code = code.replace(/<div className="font-bold text-charcoal text-xs md:text-sm">\{row.feature\}<\/div>/g, '<div className="font-bold text-charcoal text-[10px] md:text-xs">{row.feature}</div>');

fs.writeFileSync('src/pages/marketing/Home.jsx', code, 'utf8');
console.log('Fixed Comparison table rows padding!');
