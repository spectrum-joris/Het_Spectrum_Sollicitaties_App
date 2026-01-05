import express from 'express';
import { requireAuth, requireRole } from '../auth/session.js';
import { upload } from '../storage/upload.js';
import { uploadFile } from '../storage/blob-storage.js';
import * as applicationsService from '../services/applicationsService.js';
import * as notificationsService from '../services/notificationsService.js';
import * as candidatesService from '../services/candidatesService.js';

const router = express.Router();

router.get('/', requireAuth, async (req, res) => {
  try {
    const applications = await applicationsService.getAllApplications();
    res.json(applications);
  } catch (error) {
    console.error('Error fetching applications:', error);
    res.status(500).json({ error: 'Fout bij ophalen sollicitaties' });
  }
});

router.get('/:id', requireAuth, async (req, res) => {
  try {
    const application = await applicationsService.getApplicationById(req.params.id);
    if (!application) {
      return res.status(404).json({ error: 'Sollicitatie niet gevonden' });
    }

    const jobs = await applicationsService.getJobsForApplication(req.params.id);
    const attachments = await applicationsService.getAttachmentsForApplication(req.params.id);

    res.json({
      ...application,
      jobs,
      attachments
    });
  } catch (error) {
    console.error('Error fetching application:', error);
    res.status(500).json({ error: 'Fout bij ophalen sollicitatie' });
  }
});

router.post('/', requireRole(['admin']), async (req, res) => {
  try {
    const { job_ids, ...applicationData } = req.body;

    const applicationId = await applicationsService.createApplication(
      applicationData,
      req.session.userId
    );

    if (job_ids && job_ids.length > 0) {
      await applicationsService.linkApplicationToJobs(applicationId, job_ids);
    }

    // Send notifications
    const candidate = await candidatesService.getCandidateById(applicationData.candidate_id);
    const candidateName = `${candidate.first_name} ${candidate.last_name}`;
    await notificationsService.notifyNewApplication(applicationId, candidateName);

    const application = await applicationsService.getApplicationById(applicationId);
    res.status(201).json(application);
  } catch (error) {
    console.error('Error creating application:', error);
    res.status(500).json({ error: 'Fout bij aanmaken sollicitatie' });
  }
});

router.put('/:id', requireRole(['admin']), async (req, res) => {
  try {
    const { job_ids, ...applicationData } = req.body;

    const application = await applicationsService.updateApplication(req.params.id, applicationData);

    if (job_ids !== undefined) {
      await applicationsService.linkApplicationToJobs(req.params.id, job_ids);
    }

    res.json(application);
  } catch (error) {
    console.error('Error updating application:', error);
    res.status(500).json({ error: 'Fout bij bijwerken sollicitatie' });
  }
});

router.delete('/:id', requireRole(['admin']), async (req, res) => {
  try {
    await applicationsService.deleteApplication(req.params.id);
    res.json({ message: 'Sollicitatie verwijderd' });
  } catch (error) {
    console.error('Error deleting application:', error);
    res.status(500).json({ error: 'Fout bij verwijderen sollicitatie' });
  }
});

router.post('/:id/attachments', requireRole(['admin']), upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Geen bestand geüpload' });
    }

    // Upload file to Vercel Blob or local storage
    const { url, pathname } = await uploadFile(
      req.file.buffer,
      req.file.originalname,
      req.file.mimetype
    );

    const attachmentId = await applicationsService.addAttachment(req.params.id, {
      kind: req.body.kind || 'other',
      filename: req.file.originalname,
      storage_path: pathname, // Store the pathname or URL
      storage_url: url, // Store the full URL for easy access
      mime_type: req.file.mimetype
    });

    res.status(201).json({
      id: attachmentId,
      filename: req.file.originalname,
      url: url,
      kind: req.body.kind || 'other'
    });
  } catch (error) {
    console.error('Error uploading attachment:', error);
    res.status(500).json({ error: 'Fout bij uploaden bijlage' });
  }
});

export default router;
