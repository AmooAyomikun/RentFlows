const fs = require('fs');
let code = fs.readFileSync('src/pages/marketing/Home.jsx', 'utf8');

// ENGINEERED FOR OPERATIONS - MICRO SHRINK
code = code.replace(/<div className="max-w-marketing mx-auto px-6 w-full my-auto lg:py-0.5">/g, '<div className="max-w-marketing mx-auto px-6 w-full my-auto py-0 lg:py-0">');

code = code.replace(/<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2 lg:gap-3">/g, '<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-1.5 lg:gap-2">');

code = code.replace(/className="bg-white rounded-xl p-3 lg:p-4 border border-border shadow-sm hover:shadow-lg transition-all"/g, 'className="bg-white rounded-xl p-2 lg:p-3 border border-border shadow-sm hover:shadow-lg transition-all"');

code = code.replace(/<div className="w-8 h-8 rounded-lg bg-warm border border-border flex items-center justify-center mb-1">/g, '<div className="w-6 h-6 rounded-md bg-warm border border-border flex items-center justify-center mb-1">');

code = code.replace(/<feature.icon size={18} className="text-primary" \/>/g, '<feature.icon size={12} className="text-primary" />');

code = code.replace(/<h3 className="font-display font-bold text-\[10px\] md:text-xs mb-1 text-charcoal">\{feature.title\}<\/h3>/g, '<h3 className="font-display font-bold text-[9px] md:text-[10px] mb-0.5 text-charcoal">{feature.title}</h3>');

code = code.replace(/<p className="text-body text-\[9px\] leading-tight">\{feature.desc\}<\/p>/g, '<p className="text-body text-[8px] leading-tight">{feature.desc}</p>');

fs.writeFileSync('src/pages/marketing/Home.jsx', code, 'utf8');
console.log('Micro shrink done!');
