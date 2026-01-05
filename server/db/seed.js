import { executeQuery } from './client.js';
import { hashPassword } from '../auth/password.js';

export async function seedDatabase() {
  console.log('🌱 Seeding database...');

  // Create default users
  const defaultPassword = await hashPassword('Welcome123!');

  const users = [
    { name: 'Admin User', email: 'admin@hetspectrum.be', role: 'admin' },
    { name: 'Directie User', email: 'directie@hetspectrum.be', role: 'directie' },
    { name: 'Staf User', email: 'staf@hetspectrum.be', role: 'staf' },
    { name: 'Psycholoog User', email: 'psycholoog@hetspectrum.be', role: 'psycholoog' }
  ];

  for (const user of users) {
    try {
      await executeQuery(
        'INSERT INTO users (name, email, password_hash, role) VALUES (?, ?, ?, ?)',
        [user.name, user.email, defaultPassword, user.role]
      );
      console.log(`✓ Created user: ${user.email} (password: Welcome123!)`);
    } catch (error) {
      if (error.message.includes('UNIQUE')) {
        console.log(`→ User ${user.email} already exists`);
      } else {
        throw error;
      }
    }
  }

  // Create sample jobs
  const sampleJobs = [
    {
      title: 'Leraar Wiskunde',
      requirements_text: 'Master in de wiskunde of gelijkwaardig, pedagogische bekwaamheid',
      grade: 'Secundair onderwijs',
      subject: 'Wiskunde',
      hours: 20,
      period_text: 'Schooljaar 2025-2026',
      start_date: '2025-09-01'
    },
    {
      title: 'Leraar Nederlands',
      requirements_text: 'Master in de taal- en letterkunde Nederlands, pedagogische bekwaamheid',
      grade: 'Secundair onderwijs',
      subject: 'Nederlands',
      hours: 18,
      period_text: 'Schooljaar 2025-2026',
      start_date: '2025-09-01'
    }
  ];

  for (const job of sampleJobs) {
    try {
      await executeQuery(
        `INSERT INTO jobs (title, requirements_text, grade, subject, hours, period_text, start_date, created_by)
         VALUES (?, ?, ?, ?, ?, ?, ?, 1)`,
        [job.title, job.requirements_text, job.grade, job.subject, job.hours, job.period_text, job.start_date]
      );
      console.log(`✓ Created job: ${job.title}`);
    } catch (error) {
      console.log(`→ Job ${job.title} might already exist`);
    }
  }

  console.log('✓ Database seeded successfully');
}
