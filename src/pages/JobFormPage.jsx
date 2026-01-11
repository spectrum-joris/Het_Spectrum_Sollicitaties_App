import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from '@phosphor-icons/react';
import Button from '../components/atoms/Button.jsx';
import Card from '../components/molecules/Card.jsx';
import JobForm from '../components/organisms/JobForm.jsx';
import { api } from '../lib/apiClient.js';

export default function JobFormPage() {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(!!jobId);

  useEffect(() => {
    if (jobId) {
      loadJob();
    }
  }, [jobId]);

  const loadJob = async () => {
    try {
      const data = await api.getJob(jobId);
      setJob(data);
    } catch (error) {
      console.error('Error loading job:', error);
      alert('Fout bij laden vacature');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (formData) => {
    try {
      if (jobId) {
        await api.updateJob(jobId, formData);
        alert('Vacature bijgewerkt');
      } else {
        const newJob = await api.createJob(formData);
        alert('Vacature aangemaakt');
        navigate(`/jobs/${newJob.id}`);
        return;
      }
      navigate(`/jobs/${jobId}`);
    } catch (error) {
      alert('Fout bij opslaan: ' + error.message);
    }
  };

  if (loading) return <div className="loading">Laden...</div>;

  return (
    <div className="job-form-page">
      <div className="page-header">
        <Button variant="secondary" onClick={() => navigate('/jobs')}>
          <ArrowLeft size={20} />
          Terug
        </Button>
      </div>

      <Card title={jobId ? 'Vacature bewerken' : 'Nieuwe vacature'}>
        <JobForm
          initialData={job || {}}
          onSubmit={handleSubmit}
          onCancel={() => navigate('/jobs')}
        />
      </Card>
    </div>
  );
}
