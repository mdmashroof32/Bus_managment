import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const databasePath = path.join(projectRoot, 'server', 'data', 'delhi_transport.db');
const lfsPointerHeader = 'version https://git-lfs.github.com/spec/v1';

if (fs.existsSync(databasePath)) {
  const header = fs.readFileSync(databasePath).subarray(0, lfsPointerHeader.length).toString('utf8');
  if (header === lfsPointerHeader) {
    fs.unlinkSync(databasePath);
    console.warn('Removed the Git LFS pointer at the SQLite database path; SQLite will create a fresh database on startup.');
  }
}
