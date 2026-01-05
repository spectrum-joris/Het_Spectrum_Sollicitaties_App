import { executeQuery } from '../db/client.js';

export async function getAllCandidates() {
  const result = await executeQuery(`
    SELECT c.*,
           COUNT(DISTINCT a.id) as application_count
    FROM candidates c
    LEFT JOIN applications a ON c.id = a.candidate_id
    GROUP BY c.id
    ORDER BY c.created_at DESC
  `);
  return result.rows;
}

export async function getCandidateById(id) {
  const result = await executeQuery('SELECT * FROM candidates WHERE id = ?', [id]);
  return result.rows[0] || null;
}

export async function createCandidate(candidateData) {
  const result = await executeQuery(
    'INSERT INTO candidates (first_name, last_name, email, phone, notes) VALUES (?, ?, ?, ?, ?)',
    [
      candidateData.first_name,
      candidateData.last_name,
      candidateData.email,
      candidateData.phone,
      candidateData.notes
    ]
  );
  return result.lastInsertRowid;
}

export async function updateCandidate(id, candidateData) {
  await executeQuery(
    'UPDATE candidates SET first_name = ?, last_name = ?, email = ?, phone = ?, notes = ? WHERE id = ?',
    [
      candidateData.first_name,
      candidateData.last_name,
      candidateData.email,
      candidateData.phone,
      candidateData.notes,
      id
    ]
  );
  return await getCandidateById(id);
}

export async function deleteCandidate(id) {
  await executeQuery('DELETE FROM candidates WHERE id = ?', [id]);
}

export async function searchCandidates(searchTerm) {
  const pattern = `%${searchTerm}%`;
  const result = await executeQuery(
    `SELECT * FROM candidates
     WHERE first_name LIKE ? OR last_name LIKE ? OR email LIKE ?
     ORDER BY last_name, first_name`,
    [pattern, pattern, pattern]
  );
  return result.rows;
}
