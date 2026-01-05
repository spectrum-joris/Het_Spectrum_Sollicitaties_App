import { executeQuery } from '../db/client.js';

const MAIL_TEMPLATES = {
  invite: {
    subject: 'Uitnodiging selectiegesprek - Het Spectrum',
    body: `Beste [NAAM],

Bedankt voor uw sollicitatie naar de functie van [FUNCTIE] bij Het Spectrum.

Graag nodigen wij u uit voor een selectiegesprek op [DATUM] om [UUR].

Het gesprek vindt plaats op volgend adres:
Het Spectrum
[ADRES]

Gelieve uw komst te bevestigen.

Met vriendelijke groet,
Het Spectrum`
  },
  reject: {
    subject: 'Uw sollicitatie - Het Spectrum',
    body: `Beste [NAAM],

Bedankt voor uw sollicitatie naar de functie van [FUNCTIE] bij Het Spectrum.

Na zorgvuldige afweging van alle kandidaturen moeten wij u helaas meedelen dat wij niet verder gaan met uw kandidatuur.

Wij wensen u veel succes bij uw verdere zoektocht.

Met vriendelijke groet,
Het Spectrum`
  },
  reserve: {
    subject: 'Uw sollicitatie - Het Spectrum',
    body: `Beste [NAAM],

Bedankt voor uw sollicitatie naar de functie van [FUNCTIE] bij Het Spectrum.

Wij hebben uw kandidatuur weerhouden als reserve. Mocht de gekozen kandidaat onverhoopt afzien, nemen wij contact met u op.

Met vriendelijke groet,
Het Spectrum`
  },
  pending: {
    subject: 'Uw sollicitatie - Het Spectrum',
    body: `Beste [NAAM],

Bedankt voor uw sollicitatie naar de functie van [FUNCTIE] bij Het Spectrum.

Uw dossier is momenteel nog in behandeling. Wij houden u op de hoogte van verdere ontwikkelingen.

Met vriendelijke groet,
Het Spectrum`
  }
};

export async function createMailDraft(applicationId, jobId, templateType, candidateName, jobTitle, createdBy) {
  const template = MAIL_TEMPLATES[templateType];
  if (!template) {
    throw new Error('Ongeldig mail template type');
  }

  let subject = template.subject;
  let body = template.body
    .replace('[NAAM]', candidateName)
    .replace('[FUNCTIE]', jobTitle);

  const result = await executeQuery(
    `INSERT INTO mail_drafts (application_id, job_id, template_type, subject, body, status, created_by)
     VALUES (?, ?, ?, ?, ?, 'draft', ?)`,
    [applicationId, jobId, templateType, subject, body, createdBy]
  );

  return result.lastInsertRowid;
}

export async function getMailDrafts(status = null) {
  let query = `
    SELECT md.*,
           c.first_name, c.last_name,
           j.title as job_title,
           u.name as created_by_name
    FROM mail_drafts md
    JOIN applications a ON md.application_id = a.id
    JOIN candidates c ON a.candidate_id = c.id
    LEFT JOIN jobs j ON md.job_id = j.id
    LEFT JOIN users u ON md.created_by = u.id
  `;

  const params = [];
  if (status) {
    query += ' WHERE md.status = ?';
    params.push(status);
  }

  query += ' ORDER BY md.created_at DESC';

  const result = await executeQuery(query, params);
  return result.rows;
}

export async function getMailDraftById(id) {
  const result = await executeQuery(
    `SELECT md.*,
            c.first_name, c.last_name, c.email as candidate_email,
            j.title as job_title
     FROM mail_drafts md
     JOIN applications a ON md.application_id = a.id
     JOIN candidates c ON a.candidate_id = c.id
     LEFT JOIN jobs j ON md.job_id = j.id
     WHERE md.id = ?`,
    [id]
  );
  return result.rows[0] || null;
}

export async function updateMailDraft(id, subject, body) {
  await executeQuery(
    'UPDATE mail_drafts SET subject = ?, body = ? WHERE id = ?',
    [subject, body, id]
  );
}

export async function approveMailDraft(id, approvedBy) {
  await executeQuery(
    'UPDATE mail_drafts SET status = ?, approved_by = ? WHERE id = ?',
    ['approved', approvedBy, id]
  );
}

export async function markMailAsSent(id) {
  await executeQuery(
    'UPDATE mail_drafts SET status = ?, sent_at = CURRENT_TIMESTAMP WHERE id = ?',
    ['sent', id]
  );
}
