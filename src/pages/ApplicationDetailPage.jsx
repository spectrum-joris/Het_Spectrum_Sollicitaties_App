import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, DownloadSimple, Upload } from '@phosphor-icons/react';
import Button from '../components/atoms/Button.jsx';
import Badge from '../components/atoms/Badge.jsx';
import Card from '../components/molecules/Card.jsx';
import Table from '../components/molecules/Table.jsx';
import { api } from '../lib/apiClient.js';
import { formatDate, formatDateTime } from '../lib/format.js';
import { APPLICATION_STATUS_LABELS, ATTACHMENT_KIND_LABELS } from '../../shared/constants.js';

export default function ApplicationDetailPage({ user }) {
  const { applicationId } = useParams();
  const navigate = useNavigate();
  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    loadApplication();
  }, [applicationId]);

  const loadApplication = async () => {
    try {
      const data = await api.getApplication(applicationId);
      setApplication(data);
    } catch (error) {
      console.error('Error loading application:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (e, kind) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    try {
      await api.uploadAttachment(applicationId, file, kind);
      alert('Bestand geüpload');
      loadApplication();
    } catch (error) {
      alert('Fout bij uploaden: ' + error.message);
    } finally {
      setUploading(false);
    }
  };

  const canManage = user?.role === 'admin';

  const jobColumns = [
    { header: 'Titel', field: 'title' },
    { header: 'Vak', field: 'subject' },
    { header: 'Uren', field: 'hours' }
  ];

  const attachmentColumns = [
    {
      header: 'Type',
      render: (att) => ATTACHMENT_KIND_LABELS[att.kind]
    },
    { header: 'Bestandsnaam', field: 'filename' },
    {
      header: 'Geüpload',
      render: (att) => formatDateTime(att.uploaded_at)
    },
    {
      header: 'Acties',
      render: (att) => (
        <a href={`/uploads/${att.storage_path}`} target="_blank" rel="noopener noreferrer">
          <Button size="small">
            <DownloadSimple size={16} />
            Download
          </Button>
        </a>
      )
    }
  ];

  if (loading) return <div className="loading">Laden...</div>;
  if (!application) return <div>Sollicitatie niet gevonden</div>;

  return (
    <div className="application-detail-page">
      <div className="page-header">
        <Button variant="secondary" onClick={() => navigate('/applications')}>
          <ArrowLeft size={20} />
          Terug
        </Button>
      </div>

      <Card title="Kandidaatinformatie">
        <div className="detail-grid">
          <div className="detail-item">
            <label>Naam</label>
            <p>{application.first_name} {application.last_name}</p>
          </div>
          <div className="detail-item">
            <label>E-mail</label>
            <p>{application.candidate_email}</p>
          </div>
          <div className="detail-item">
            <label>Telefoon</label>
            <p>{application.phone || '-'}</p>
          </div>
          <div className="detail-item">
            <label>Status</label>
            <Badge>{APPLICATION_STATUS_LABELS[application.status]}</Badge>
          </div>
        </div>

        {application.notes && (
          <div className="detail-item">
            <label>Opmerkingen</label>
            <p className="whitespace-pre-wrap">{application.notes}</p>
          </div>
        )}
      </Card>

      <Card title="Sollicitatie details">
        <div className="detail-grid">
          <div className="detail-item">
            <label>E-mail onderwerp</label>
            <p>{application.source_email_subject || '-'}</p>
          </div>
          <div className="detail-item">
            <label>E-mail van</label>
            <p>{application.source_email_from || '-'}</p>
          </div>
          <div className="detail-item">
            <label>Ontvangen op</label>
            <p>{formatDateTime(application.received_at)}</p>
          </div>
          <div className="detail-item">
            <label>Aangemaakt op</label>
            <p>{formatDate(application.created_at)}</p>
          </div>
        </div>
      </Card>

      <Card title="Gekoppelde vacatures">
        <Table
          columns={jobColumns}
          data={application.jobs || []}
          onRowClick={(job) => navigate(`/jobs/${job.id}`)}
          emptyMessage="Geen vacatures gekoppeld"
        />
      </Card>

      <Card title="Bijlagen">
        {canManage && (
          <div className="upload-section">
            <label className="upload-button">
              <input
                type="file"
                onChange={(e) => handleFileUpload(e, 'cv')}
                disabled={uploading}
                style={{ display: 'none' }}
              />
              <Button as="span" disabled={uploading}>
                <Upload size={20} />
                Upload CV
              </Button>
            </label>

            <label className="upload-button">
              <input
                type="file"
                onChange={(e) => handleFileUpload(e, 'letter')}
                disabled={uploading}
                style={{ display: 'none' }}
              />
              <Button as="span" disabled={uploading}>
                <Upload size={20} />
                Upload Brief
              </Button>
            </label>
          </div>
        )}

        <Table
          columns={attachmentColumns}
          data={application.attachments || []}
          emptyMessage="Nog geen bijlagen"
        />
      </Card>
    </div>
  );
}
