// "husky": {
//   "hooks": {
//     "pre-commit": "npm run version:qa && git add package.json"
//   }
// }

//update-version.js
const fs = require('fs');
const packageJson = JSON.parse(fs.readFileSync('/home/joseflorez/Documentos/Repos/conceptTest/package.json', 'utf8'));

const sprintDataPath = './sprint.json';
let sprintData = { lastSprint: new Date().toISOString() };

if (fs.existsSync(sprintDataPath)) {
  sprintData = JSON.parse(fs.readFileSync(sprintDataPath, 'utf8'));
}

const lastSprintDate = new Date(sprintData.lastSprint);
const now = new Date();
const diffDays = Math.floor((now - lastSprintDate) / (1000 * 60 * 60 * 24));

let [major, minor, patch] = packageJson.version.split('.').map(Number);
console.log(`Last sprint: ${lastSprintDate.toISOString()}, Now: ${now.toISOString()}, DiffDays: ${diffDays}`);
if (diffDays >= 15) {
  // Nuevo sprint: reinicia patch y aumenta minor
  //prueba

  patch = 0;
  minor += 1;
  sprintData.lastSprint = now.toISOString();
  fs.writeFileSync(sprintDataPath, JSON.stringify(sprintData, null, 2));
} else {
  // Incrementa patch normalmente
  patch += 1;
}

//PRUEBA

packageJson.version = `${major}.${minor}.${patch}`;
fs.writeFileSync('./package.json', JSON.stringify(packageJson, null, 2));
console.log(`Version updated to: ${packageJson.version}`);
