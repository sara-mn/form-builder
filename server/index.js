import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { existsSync, mkdirSync, copyFileSync } from 'fs';
import createApp from './app.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const seedPath = join(__dirname, 'db.json');

const isProduction = process.env.NODE_ENV === 'production';
const dbPath = process.env.DB_PATH ?? seedPath;

if (!existsSync(dbPath)) {
    mkdirSync(dirname(dbPath), { recursive: true });
    copyFileSync(seedPath, dbPath);
    console.log(`Seeded database at ${dbPath}`);
}

const app = createApp({ dbPath, isProduction });

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
