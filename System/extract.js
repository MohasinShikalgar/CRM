const fs = require('fs');

const filePath = 'C:\\Users\\Mohasin\\.gemini\\]antigravity-ide\\brain\\0ecab322-da21-4623-9d6d-0bfb47ccf45b\\.system_generated\\steps\\238\\content.md';
// Standardize windows path
const resolvedPath = filePath.replace('\\]', '\\');

if (fs.existsSync(resolvedPath)) {
  const content = fs.readFileSync(resolvedPath, 'utf8');
  
  // Find index of .jpg or .png
  let index = 0;
  const matches = [];
  while (true) {
    const nextJpg = content.indexOf('.jpg', index);
    const nextPng = content.indexOf('.png', index);
    
    let nextPos = -1;
    if (nextJpg !== -1 && nextPng !== -1) {
      nextPos = Math.min(nextJpg, nextPng);
    } else if (nextJpg !== -1) {
      nextPos = nextJpg;
    } else if (nextPng !== -1) {
      nextPos = nextPng;
    }
    
    if (nextPos === -1) break;
    
    // Extract context
    const start = Math.max(0, nextPos - 80);
    const end = Math.min(content.length, nextPos + 50);
    matches.push(content.substring(start, end));
    
    index = nextPos + 5;
    if (matches.length > 20) break; // Limit to 20
  }
  
  console.log(`Found ${matches.length} matches:`);
  console.log(JSON.stringify(matches, null, 2));
} else {
  console.log('File does not exist: ' + resolvedPath);
}
