import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, PencilSimple } from '@phosphor-icons/react';
import Button from '../components/atoms/Button.jsx';
import Card from '../components/molecules/Card.jsx';
import Table from '../components/molecules/Table.jsx';
import { api } from '../lib/apiClient.js';
import { formatDate } from '../lib/format.js';

export default function JobDetailPage({ user }) {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadJobData();
  }, [jobId]);

  const loadJobData = async () => {
    try {
      const jobData = await api.getJob(jobId);
      setJob(jobData);

      const applicationsData = await api.getApplications();
      setApplications(applicationsData.filter(app =>
        app.jobs?.some(j => j.id === parseInt(jobId))
      ));
    } catch (error) {
      console.error('Error loading job:', error);
    } finally {
      setLoading(false);
    }
  };

  const canManage = user?.role === 'admin' || user?.role === 'directie';

  const applicationColumns = [
    {
      header: 'Kandidaat',
      render: (app) => `${app.first_name} ${app.last_name}`
    },
    {
      header: 'E-mail',
      field: 'candidate_email'
    },
    {
      header: 'Datum',
      render: (app) => formatDate(app.created_at)
    }
  ];

  if (loading) return <div className="loading">Laden...</div>;
  if (!job) return <div>Vacature niet gevonden</div>;

  return (
    <div className="job-detail-page">
      <div className="page-header">
        <Button variant="secondary" onClick={() => navigate('/jobs')}>
          <ArrowLeft size={20} />
          Terug
        </Button>
        {canManage && (
          <Button onClick={() => navigate(`/jobs/${jobId}/edit`)}>
            <PencilSimple size={20} />
            Bewerken
          </Button>
        )}
      </div>

      <Card title={job.title}>
        <div className="detail-grid">
          <div className="detail-item">
            <label>Vak</label>
            <p>{job.subject}</p>
          </div>
          <div className="detail-item">
            <label>Graad</label>
            <p>{job.grade}</p>
          </div>
          <div className="detail-item">
            <label>Aantal uren</label>
            <p>{job.hours}</p>
          </div>
          <div className="detail-item">
            <label>Periode</label>
            <p>{job.period_text}</p>
          </div>
          <div className="detail-item">
            <label>Startdatum</label>
            <p>{formatDate(job.start_date)}</p>
          </div>
        </div>

        {job.requirements_text && (
          <div className="detail-item">
            <label>Vereisten</label>
            <p className="whitespace-pre-wrap">{job.requirements_text}</p>
          </div>
        )}
      </Card>

      <Card title="Sollicitaties">
        <Table
          columns={applicationColumns}
          data={applications}
          onRowClick={(app) => navigate(`/applications/${app.id}`)}
          emptyMessage="Nog geen sollicitaties voor deze vacature"
        />
      </Card>

      <div className="page-actions">
        <Link to={`/jobs/${jobId}/selection`}>
          <Button variant="primary">Selectie-overzicht →</Button>
        </Link>
      </div>
    </div>
  );
}
