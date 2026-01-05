import express from 'express';
import { requireAuth, requireRole } from '../auth/session.js';
import * as mailService from '../services/mailService.js';
import * as applicationsService from '../services/applicationsService.js';
import * as jobsService from '../services/jobsService.js';

const router = express.Router();

router.get('/outbox', requireAuth, async (req, res) => {
  try {
    const { status } = req.query;
    const drafts = await mailService.getMailDrafts(status);
    res.json(drafts);
  } catch (error) {
    console.error('Error fetching mail drafts:', error);
    res.status(500).json({ error: 'Fout bij ophalen mails' });
  }
});

router.get('/outbox/:id', requireAuth, async (req, res) => {
  try {
    const draft = await mailService.getMailDraftById(req.params.id);
    if (!draft) {
      return res.status(404).json({ error: 'Mail niet gevonden' });
    }
    res.json(draft);
  } catch (error) {
    console.error('Error fetching mail draft:', error);
    res.status(500).json({ error: 'Fout bij ophalen mail' });
  }
});

router.post('/generate', requireRole(['admin', 'directie']), async (req, res) => {
  try {
    const { application_id, job_id, template_type } = req.body;

    if (!application_id || !template_type) {
      return res.status(400).json({ error: 'application_id en template_type zijn verplicht' });
    }

    const application = await applicationsService.getApplicationById(application_id);
    if (!application) {
      return res.status(404).json({ error: 'Sollicitatie niet gevonden' });
    }

    const candidateName = `${application.first_name} ${application.last_name}`;
    let jobTitle = 'de vacature';

    if (job_id) {
      const job = await jobsService.getJobById(job_id);
      if (job) {
        jobTitle = job.title;
      }
    }

    const draftId = await mailService.createMailDraft(
      application_id,
      job_id,
      template_type,
      candidateName,
      jobTitle,
      req.session.userId
    );

    const draft = await mailService.getMailDraftById(draftId);
    res.status(201).json(draft);
  } catch (error) {
    console.error('Error generating mail:', error);
    res.status(500).json({ error: 'Fout bij genereren mail' });
  }
});

router.put('/outbox/:id', requireRole(['admin', 'directie']), async (req, res) => {
  try {
    const { subject, body } = req.body;
    await mailService.updateMailDraft(req.params.id, subject, body);
    const draft = await mailService.getMailDraftById(req.params.id);
    res.json(draft);
  } catch (error) {
    console.error('Error updating mail draft:', error);
    res.status(500).json({ error: 'Fout bij bijwerken mail' });
  }
});

router.post('/outbox/:id/approve', requireRole(['directie']), async (req, res) => {
  try {
    await mailService.approveMailDraft(req.params.id, req.session.userId);
    res.json({ message: 'Mail goedgekeurd' });
  } catch (error) {
    console.error('Error approving mail:', error);
    res.status(500).json({ error: 'Fout bij goedkeuren mail' });
  }
});

router.post('/outbox/:id/send', requireRole(['directie']), async (req, res) => {
  try {
    await mailService.markMailAsSent(req.params.id);
    res.json({ message: 'Mail gemarkeerd als verzonden' });
  } catch (error) {
    console.error('Error marking mail as sent:', error);
    res.status(500).json({ error: 'Fout bij verzenden mail' });
  }
});

export default router;
