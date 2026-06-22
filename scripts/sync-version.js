import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function updateVersion() {
  try {
    console.log("Fetching latest ECP version from PyPI...");
    const res = await fetch('https://pypi.org/pypi/ecp-runtime/json');
    if (!res.ok) {
        throw new Error(`Failed to fetch from PyPI: ${res.statusText}`);
    }
    const data = await res.json();
    const latestVersion = data.info.version;
    console.log(`Latest PyPI version: ${latestVersion}`);

    const rootDir = path.join(__dirname, '..');
    
    // List of files to keep updated
    const filesToUpdate = [
      'src/routes/index.tsx',
      'docs/examples.mdx',
      'docs/getting-started/quickstart.mdx',
      'docs/getting-started/intro.mdx'
    ];

    let updatedCount = 0;

    for (const file of filesToUpdate) {
      const filePath = path.join(rootDir, file);
      if (!fs.existsSync(filePath)) {
          console.warn(`File not found, skipping: ${file}`);
          continue;
      }
      
      let content = fs.readFileSync(filePath, 'utf-8');
      
      // We explicitly target the patterns where the version is used
      // 1. pip install "ecp-runtime==X.Y.Z"
      content = content.replace(/==\d+\.\d+\.\d+/g, `==${latestVersion}`);
      
      // 2. vX.Y.Z
      content = content.replace(/v\d+\.\d+\.\d+/g, `v${latestVersion}`);
      
      // 3. The current release line is `X.Y.Z`.
      content = content.replace(/line is `\d+\.\d+\.\d+`/g, `line is \`${latestVersion}\``);

      fs.writeFileSync(filePath, content, 'utf-8');
      updatedCount++;
    }
    
    console.log(`Successfully synced version ${latestVersion} across ${updatedCount} files.`);
  } catch (err) {
    console.error('Failed to sync version:', err);
    process.exit(1);
  }
}

updateVersion();
