import { executeQuery } from '../db/client.js';

export async function getAllJobs() {
  const result = await executeQuery(`
    SELECT j.*, u.name as creator_name
    FROM jobs j
    LEFT JOIN users u ON j.created_by = u.id
    ORDER BY j.created_at DESC
  `);
  return result.rows;
}

export async function getJobById(id) {
  const result = await executeQuery(
    'SELECT j.*, u.name as creator_name FROM jobs j LEFT JOIN users u ON j.created_by = u.id WHERE j.id = ?',
    [id]
  );
  return result.rows[0] || null;
}

export async function createJob(jobData, createdBy) {
  const result = await executeQuery(
    `INSERT INTO jobs (title, requirements_text, grade, subject, hours, period_text, start_date, created_by)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      jobData.title,
      jobData.requirements_text,
      jobData.grade,
      jobData.subject,
      jobData.hours,
      jobData.period_text,
      jobData.start_date,
      createdBy
    ]
  );
  return result.lastInsertRowid;
}

export async function updateJob(id, jobData) {
  await executeQuery(
    `UPDATE jobs
     SET title = ?, requirements_text = ?, grade = ?, subject = ?, hours = ?, period_text = ?, start_date = ?
     WHERE id = ?`,
    [
      jobData.title,
      jobData.requirements_text,
      jobData.grade,
      jobData.subject,
      jobData.hours,
      jobData.period_text,
      jobData.start_date,
      id
    ]
  );
  return await getJobById(id);
}

export async function deleteJob(id) {
  await executeQuery('DELETE FROM jobs WHERE id = ?', [id]);
}

export async function getJobsWithApplicationCount() {
  const result = await executeQuery(`
    SELECT j.*, COUNT(DISTINCT aj.application_id) as application_count
    FROM jobs j
    LEFT JOIN application_jobs aj ON j.id = aj.job_id
    GROUP BY j.id
    ORDER BY j.created_at DESC
  `);
  return result.rows;
}
