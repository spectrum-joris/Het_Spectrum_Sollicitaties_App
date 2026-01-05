import 'dotenv/config';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { getDbClient } from '../client.js';
import { seedDatabase } from '../seed.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function runMigrations() {
  console.log('🚀 Running database migrations...');

  const db = getDbClient();
  const schemaPath = join(__dirname, '..', 'schema.sql');
  const schema = readFileSync(schemaPath, 'utf-8');

  // Split by semicolon and execute each statement
  const statements = schema
    .split(';')
    .map(s => s.trim())
    .filter(s => s.length > 0);

  for (const statement of statements) {
    try {
      await db.execute(statement);
    } catch (error) {
      console.error('Migration error:', error);
      throw error;
    }
  }

  console.log('✓ Migrations completed');

  // Run seed
  await seedDatabase();

  console.log('✓ Database setup complete!');
  process.exit(0);
}

runMigrations().catch(error => {
  console.error('Failed to run migrations:', error);
  process.exit(1);
});
