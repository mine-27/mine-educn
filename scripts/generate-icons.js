/**
 * Generate FA5 icon data JS file from FontAwesome Free CSS and SVGs.
 * Run: node scripts/generate-icons.js
 */
const fs = require('fs');
const path = require('path');

const FA_DIR = 'e:/wordpress-dev/wp-dev/node_modules/@fortawesome/fontawesome-free';
const OUTPUT = 'e:/wordpress-dev/wp-dev/wp-content/themes/mine-educn/src/icon-extension/icon-data.js';

// Step 1: Parse all.css to get icon name → unicode mapping
const allCss = fs.readFileSync(path.join(FA_DIR, 'css/all.css'), 'utf-8');
const unicodeMap = {};
const regex = /\.fa-([a-z0-9-]+):before\s*\{\s*content:\s*"\\([a-f0-9]+)"/g;
let match;
while ((match = regex.exec(allCss)) !== null) {
    unicodeMap[match[1]] = match[2];
}
console.log(`Parsed ${Object.keys(unicodeMap).length} icons from all.css`);

// Step 2: Check SVG directories to determine family
function getSvgs(dir) {
    try {
        return fs.readdirSync(path.join(FA_DIR, 'svgs', dir))
            .filter(f => f.endsWith('.svg'))
            .map(f => f.replace('.svg', ''));
    } catch (e) {
        return [];
    }
}

const solidNames = new Set(getSvgs('solid'));
const regularNames = new Set(getSvgs('regular'));
const brandsNames = new Set(getSvgs('brands'));

console.log(`Found ${solidNames.size} solid, ${regularNames.size} regular, ${brandsNames.size} brands SVGs`);

// Step 3: Build icon data, sorted alphabetically
const icons = [];

for (const [name, unicode] of Object.entries(unicodeMap)) {
    let added = false;
    if (solidNames.has(name)) {
        icons.push({ name, unicode, family: 'solid', label: name.replace(/-/g, ' ') });
        added = true;
    }
    if (regularNames.has(name)) {
        icons.push({ name, unicode, family: 'regular', label: name.replace(/-/g, ' ') });
        added = true;
    }
    if (brandsNames.has(name)) {
        icons.push({ name, unicode, family: 'brands', label: name.replace(/-/g, ' ') });
        added = true;
    }
    if (!added) continue;
}

icons.sort((a, b) => a.name.localeCompare(b.name));

// Step 4: Generate JS file
const js = `/**
 * Auto-generated FA5 Free icon list.
 * DO NOT EDIT MANUALLY — run: node scripts/generate-icons.js
 * Generated: ${new Date().toISOString()}
 */

const FA5_ICONS = ${JSON.stringify(icons, null, 2)};

export default FA5_ICONS;
`;

fs.mkdirSync(path.dirname(OUTPUT), { recursive: true });
fs.writeFileSync(OUTPUT, js);
console.log(`Generated ${icons.length} icons → ${OUTPUT}`);
