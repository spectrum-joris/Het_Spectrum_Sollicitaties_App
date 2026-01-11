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

  // Create sample candidates
  const sampleCandidates = [
    {
      first_name: 'Jan',
      last_name: 'Peeters',
      email: 'jan.peeters@example.com',
      phone: '0471234567',
      notes: 'Sterke kandidaat met veel ervaring'
    },
    {
      first_name: 'Marie',
      last_name: 'Janssens',
      email: 'marie.janssens@example.com',
      phone: '0472345678',
      notes: 'Pas afgestudeerd, enthousiast'
    },
    {
      first_name: 'Pieter',
      last_name: 'De Vries',
      email: 'pieter.devries@example.com',
      phone: '0473456789',
      notes: 'Goede referenties'
    }
  ];

  for (const candidate of sampleCandidates) {
    try {
      await executeQuery(
        `INSERT INTO candidates (first_name, last_name, email, phone, notes)
         VALUES (?, ?, ?, ?, ?)`,
        [candidate.first_name, candidate.last_name, candidate.email, candidate.phone, candidate.notes]
      );
      console.log(`✓ Created candidate: ${candidate.first_name} ${candidate.last_name}`);
    } catch (error) {
      console.log(`→ Candidate ${candidate.first_name} ${candidate.last_name} might already exist`);
    }
  }

  // Create sample applications
  const sampleApplications = [
    {
      candidate_id: 1,
      source_email_subject: 'Sollicitatie Leraar Wiskunde',
      source_email_from: 'jan.peeters@example.com',
      received_at: '2025-01-05 10:30:00',
      status: 'in_review',
      job_ids: [1]
    },
    {
      candidate_id: 2,
      source_email_subject: 'Sollicitatie Leraar Nederlands',
      source_email_from: 'marie.janssens@example.com',
      received_at: '2025-01-06 14:15:00',
      status: 'new',
      job_ids: [2]
    },
    {
      candidate_id: 3,
      source_email_subject: 'Sollicitatie voor openstaande vacatures',
      source_email_from: 'pieter.devries@example.com',
      received_at: '2025-01-07 09:00:00',
      status: 'new',
      job_ids: [1, 2]
    }
  ];

  for (const application of sampleApplications) {
    try {
      const result = await executeQuery(
        `INSERT INTO applications (candidate_id, source_email_subject, source_email_from, received_at, status, created_by)
         VALUES (?, ?, ?, ?, ?, 1)`,
        [application.candidate_id, application.source_email_subject, application.source_email_from,
         application.received_at, application.status]
      );

      const applicationId = result.lastInsertRowid;

      // Link application to jobs
      for (const jobId of application.job_ids) {
        await executeQuery(
          `INSERT INTO application_jobs (application_id, job_id) VALUES (?, ?)`,
          [applicationId, jobId]
        );
      }

      console.log(`✓ Created application from ${application.source_email_from}`);
    } catch (error) {
      console.log(`→ Application from ${application.source_email_from} might already exist`);
    }
  }

  // Create sample evaluation for first application
  try {
    await executeQuery(
      `INSERT INTO evaluations (job_id, application_id, interview_date, interview_time, verdict, ranking_int, chosen_bool, evaluator_user_id)
       VALUES (1, 1, '2025-01-15', '14:00', 'geschikt', 1, 1, 2)`,
      []
    );
    console.log('✓ Created sample evaluation');
  } catch (error) {
    console.log('→ Sample evaluation might already exist');
  }

  // Create sample notification
  try {
    await executeQuery(
      `INSERT INTO notifications (user_id, type, payload_json, is_read)
       VALUES (2, 'new_application', '{"applicationId": 2, "candidateName": "Marie Janssens"}', 0)`,
      []
    );
    console.log('✓ Created sample notification');
  } catch (error) {
    console.log('→ Sample notification might already exist');
  }

  console.log('✓ Database seeded successfully with comprehensive test data');
}
