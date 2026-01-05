import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from '@phosphor-icons/react';
import Button from '../components/atoms/Button.jsx';
import Card from '../components/molecules/Card.jsx';
import EvaluationTable from '../components/organisms/EvaluationTable.jsx';
import { api } from '../lib/apiClient.js';

export default function SelectionOverviewPage() {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadJob();
  }, [jobId]);

  const loadJob = async () => {
    try {
      const data = await api.getJob(jobId);
      setJob(data);
    } catch (error) {
      console.error('Error loading job:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Laden...</div>;
  if (!job) return <div>Vacature niet gevonden</div>;

  return (
    <div className="selection-overview-page">
      <div className="page-header">
        <Button variant="secondary" onClick={() => navigate(`/jobs/${jobId}`)}>
          <ArrowLeft size={20} />
          Terug
        </Button>
      </div>

      <Card title={`Overzicht selectiegesprekken - ${job.title}`}>
        <EvaluationTable jobId={jobId} onUpdate={loadJob} />
      </Card>
    </div>
  );
}
