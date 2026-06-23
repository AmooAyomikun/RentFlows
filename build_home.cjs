const fs = require('fs');

const originalFile = fs.readFileSync('original_home.jsx', 'utf8');
const currentFile = fs.readFileSync('src/pages/marketing/Home.jsx', 'utf8');

// Helper to extract a section from file content
function extractSection(content, sectionName, endTag) {
  const startComment = `/* ─── ${sectionName} ─── */`;
  const startIndex = content.indexOf(startComment);
  if (startIndex === -1) {
    throw new Error("Could not find section: " + sectionName);
  }
  const realStart = content.lastIndexOf('{', startIndex);
  const searchEnd = content.indexOf(endTag, startIndex);
  const realEnd = searchEnd + endTag.length;
  return content.slice(realStart, realEnd);
}

// 1. Extract Old Sections
const bentoBox = extractSection(originalFile, "Bento Box Features", "</section>\n");
const split1 = extractSection(originalFile, "Split Section 1", "</section>\n");
const split2 = extractSection(originalFile, "Split Section 2", "</section>\n");
const timeline = extractSection(originalFile, "Timeline", "</section>\n");
const oldCTA = extractSection(originalFile, "Footer Section CTA", "</section>\n");
const testimonials = extractSection(originalFile, "Testimonials", "</section>\n");

// 2. Extract New Sections
const manageOnTheGo = extractSection(currentFile, "Manage on the go", "</section>\n");
const fourSteps = extractSection(currentFile, "4 Steps to Effortless Management", "</section>\n");
const engineered = extractSection(currentFile, "Engineered for Operations", "</section>\n");
const visualMaintenance = extractSection(currentFile, "Visual Maintenance Routing", "</section>\n");
const integrations = extractSection(currentFile, "Works with your existing stack", "</section>\n");
const comparison = extractSection(currentFile, "RentFlow vs. The Old Way", "</section>\n");
const security = extractSection(currentFile, "Your data, fortified", "</section>\n");
const insights = extractSection(currentFile, "Latest Insights", "</section>\n");
const faq = extractSection(currentFile, "Common Questions", "</section>\n");
const finalCTA = extractSection(currentFile, "Final CTA", "</section>\n");

// 3. Extract Hero & boilerplate
const heroSplitIndex = currentFile.indexOf('{/* ─── Manage on the go ─── */}');
const headerAndHero = currentFile.slice(0, heroSplitIndex);
const footerTags = "\n    </div>\n  );\n};\n\nexport default Home;\n";

// 4. Transform New Sections to have snap scrolling and smaller paddings
function applySnap(html) {
  let res = html;
  // Replace <section className="py-16 lg:py-24 bg-..." with <section className="py-8 lg:py-0 lg:min-h-[calc(100vh-72px)] flex flex-col snap-start scroll-mt-[72px] bg-..."
  res = res.replace(/className="py-16 lg:py-24 (bg-[a-z-]+)( border-t border-border)?"/g, 'className="py-8 lg:py-0 lg:min-h-[calc(100vh-72px)] flex flex-col snap-start scroll-mt-[72px] $1$2"');
  // Replace <div className="max-w-marketing mx-auto px-6"> with my-auto wrapper
  res = res.replace(/<div className="max-w-marketing mx-auto px-6( text-center)?">/g, '<div className="max-w-marketing mx-auto px-6 w-full my-auto lg:py-8$1">');
  // Make gap-12 lg:gap-20 smaller in Manage on the go
  res = res.replace('gap-12 lg:gap-20', 'gap-8 lg:gap-12');
  // Make min-h-[240px] smaller in 4 steps
  res = res.replace('min-h-[240px]', 'min-h-[200px]');
  // Shrink mb-12 to mb-8
  res = res.replace(/mb-12/g, 'mb-6');
  // Shrink gap-12 in Visual Maintenance
  res = res.replace('gap-12 items-center', 'gap-6 lg:gap-8 items-center');
  res = res.replace('p-8 lg:p-12', 'p-6 lg:p-8');
  res = res.replace('p-8 lg:p-16', 'p-6 lg:p-8');
  res = res.replace('rounded-[32px]', 'rounded-[24px]');
  return res;
}

const finalHTML = 
  headerAndHero +
  applySnap(manageOnTheGo) + '\n' +
  split1 + '\n' +
  split2 + '\n' +
  bentoBox + '\n' +
  applySnap(engineered) + '\n' +
  applySnap(visualMaintenance) + '\n' +
  applySnap(integrations) + '\n' +
  applySnap(comparison) + '\n' +
  applySnap(security) + '\n' +
  timeline + '\n' +
  applySnap(fourSteps) + '\n' +
  testimonials + '\n' +
  applySnap(insights) + '\n' +
  applySnap(faq) + '\n' +
  oldCTA + '\n' +
  applySnap(finalCTA) +
  footerTags;

fs.writeFileSync('src/pages/marketing/Home.jsx', finalHTML, 'utf8');
console.log("Successfully rebuilt Home.jsx with all sections!");
