const fs = require('fs');

const originalFile = fs.readFileSync('original_home.jsx', 'utf8');
const currentFile = fs.readFileSync('src/pages/marketing/Home.jsx', 'utf8');

function extractSectionStrict(content, commentSubstr) {
  const startIndex = content.indexOf(commentSubstr);
  if (startIndex === -1) throw new Error('Could not find section comment: ' + commentSubstr);
  const searchEnd = content.indexOf('</section>', startIndex);
  if (searchEnd === -1) throw new Error('Could not find end tag for: ' + commentSubstr);
  return content.slice(startIndex, searchEnd + 10); // include </section>
}

// 1. Extract Old Sections from original_home.jsx
// Note the broken utf-16 characters
const bentoBox = extractSectionStrict(originalFile, '{/* ΓöÇΓöÇΓöÇ Bento Box Features ΓöÇΓöÇΓöÇ */}');
const split1 = extractSectionStrict(originalFile, '{/* ΓöÇΓöÇΓöÇ Split Section 1 ΓöÇΓöÇΓöÇ */}');
const split2 = extractSectionStrict(originalFile, '{/* ΓöÇΓöÇΓöÇ Split Section 2 ΓöÇΓöÇΓöÇ */}');
const timeline = extractSectionStrict(originalFile, '{/* ΓöÇΓöÇΓöÇ Timeline ΓöÇΓöÇΓöÇ */}');
const oldCTA = extractSectionStrict(originalFile, '{/* ΓöÇΓöÇΓöÇ Footer Section CTA ΓöÇΓöÇΓöÇ */}');
const testimonials = extractSectionStrict(originalFile, '{/* ΓöÇΓöÇΓöÇ Testimonials ΓöÇΓöÇΓöÇ */}');

// 2. Extract New Sections from current Home.jsx
const manageOnTheGo = extractSectionStrict(currentFile, '{/* ─── Manage on the go ─── */}');
const fourSteps = extractSectionStrict(currentFile, '{/* ─── 4 Steps to Effortless Management ─── */}');
const engineered = extractSectionStrict(currentFile, '{/* ─── Engineered for Operations ─── */}');
const visualMaintenance = extractSectionStrict(currentFile, '{/* ─── Visual Maintenance Routing ─── */}');
const integrations = extractSectionStrict(currentFile, '{/* ─── Works with your existing stack ─── */}');
const comparison = extractSectionStrict(currentFile, '{/* ─── RentFlow vs. The Old Way ─── */}');
const security = extractSectionStrict(currentFile, '{/* ─── Your data, fortified ─── */}');
const insights = extractSectionStrict(currentFile, '{/* ─── Latest Insights ─── */}');
const faq = extractSectionStrict(currentFile, '{/* ─── Common Questions ─── */}');
const finalCTA = extractSectionStrict(currentFile, '{/* ─── Final CTA ─── */}');

// 3. Extract Hero & boilerplate
const heroSplitIndex = currentFile.indexOf('{/* ─── Manage on the go ─── */}');
const headerAndHero = currentFile.slice(0, heroSplitIndex);
const footerTags = '\n\n    </div>\n  );\n};\n\nexport default Home;\n';

// 4. Transform New Sections to have snap scrolling and smaller paddings
function applySnap(html) {
  let res = html;
  res = res.replace(/className="py-16 lg:py-24 (bg-[a-z-]+)( border-t border-border)?"/g, 'className="py-8 lg:py-0 lg:min-h-[calc(100vh-72px)] flex flex-col snap-start scroll-mt-[72px] $1$2"');
  res = res.replace(/<div className="max-w-marketing mx-auto px-6( text-center)?">/g, '<div className="max-w-marketing mx-auto px-6 w-full my-auto lg:py-8$1">');
  res = res.replace('gap-12 lg:gap-20', 'gap-8 lg:gap-12');
  res = res.replace('min-h-[240px]', 'min-h-[200px]');
  res = res.replace(/mb-12/g, 'mb-6');
  res = res.replace('gap-12 items-center', 'gap-6 lg:gap-8 items-center');
  res = res.replace('p-8 lg:p-12', 'p-6 lg:p-8');
  res = res.replace('p-8 lg:p-16', 'p-6 lg:p-8');
  res = res.replace('rounded-[32px]', 'rounded-[24px]');
  return res;
}

const finalHTML = 
  headerAndHero +
  applySnap(manageOnTheGo) + '\n\n' +
  split1 + '\n\n' +
  split2 + '\n\n' +
  bentoBox + '\n\n' +
  applySnap(engineered) + '\n\n' +
  applySnap(visualMaintenance) + '\n\n' +
  applySnap(integrations) + '\n\n' +
  applySnap(comparison) + '\n\n' +
  applySnap(security) + '\n\n' +
  timeline + '\n\n' +
  applySnap(fourSteps) + '\n\n' +
  testimonials + '\n\n' +
  applySnap(insights) + '\n\n' +
  applySnap(faq) + '\n\n' +
  oldCTA + '\n\n' +
  applySnap(finalCTA) +
  footerTags;

fs.writeFileSync('src/pages/marketing/Home.jsx', finalHTML, 'utf8');
console.log('Successfully rebuilt Home.jsx with all sections!');
