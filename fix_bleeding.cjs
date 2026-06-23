const fs = require('fs');
let code = fs.readFileSync('src/pages/marketing/Home.jsx', 'utf8');

// Engineered for Operations (grid)
code = code.replace(/<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-6">/g, '<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-4">');

// Engineered for Operations (cards)
// Let's replace the whole card map function content to be safe and exact
code = code.replace(/className="bg-white rounded-\[20px\] p-3 lg:p-4 border border-border shadow-sm hover:shadow-lg transition-all"/g, 'className="bg-white rounded-2xl p-5 lg:p-6 border border-border shadow-sm hover:shadow-lg transition-all"');

// Fix inner margins in cards
code = code.replace(/<div className="w-10 h-10 rounded-xl bg-warm border border-border flex items-center justify-center mb-4">/g, '<div className="w-10 h-10 rounded-xl bg-warm border border-border flex items-center justify-center mb-2">');
code = code.replace(/<h3 className="font-display font-bold text-sm mb-4 text-charcoal">\{feature.title\}<\/h3>/g, '<h3 className="font-display font-bold text-sm mb-1 text-charcoal">{feature.title}</h3>');
code = code.replace(/<p className="text-body text-sm md:text-base leading-relaxed">\{feature.desc\}<\/p>/g, '<p className="text-body text-[10px] md:text-xs leading-relaxed">{feature.desc}</p>');

// Visual Maintenance Routing (just to be absolutely sure it doesn't bleed out the bottom)
code = code.replace(/<div className="flex flex-col overflow-hidden gap-6 relative z-10">/g, '<div className="flex flex-col gap-3 relative z-10">');
code = code.replace(/<div className="bg-charcoal rounded-\[20px\] p-6 lg:p-8 text-white relative overflow-hidden">/g, '<div className="bg-charcoal rounded-2xl p-4 lg:p-6 text-white relative overflow-hidden">');
code = code.replace(/<div className="bg-accent rounded-\[20px\] p-6 lg:p-8 text-white relative overflow-hidden">/g, '<div className="bg-accent rounded-2xl p-4 lg:p-6 text-white relative overflow-hidden">');

fs.writeFileSync('src/pages/marketing/Home.jsx', code, 'utf8');
console.log('Fixed bleeding sections!');
