import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus } from '@phosphor-icons/react';
import Button from '../components/atoms/Button.jsx';
import Table from '../components/molecules/Table.jsx';
import { api } from '../lib/apiClient.js';
import { formatDate } from '../lib/format.js';

export default function JobsListPage({ user }) {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadJobs();
  }, []);

  const loadJobs = async () => {
    try {
      const data = await api.getJobs();
      setJobs(data);
    } catch (error) {
      console.error('Error loading jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  const canManageJobs = user?.role === 'admin' || user?.role === 'directie';

  const columns = [
    { header: 'Titel', field: 'title' },
    { header: 'Vak', field: 'subject' },
    { header: 'Graad', field: 'grade' },
    { header: 'Uren', field: 'hours' },
    {
      header: 'Startdatum',
      render: (job) => formatDate(job.start_date)
    },
    {
      header: 'Sollicitaties',
      render: (job) => job.application_count || 0
    }
  ];

  if (loading) return <div className="loading">Laden...</div>;

  return (
    <div className="jobs-list-page">
      <div className="page-header">
        <h1>Vacatures</h1>
        {canManageJobs && (
          <Link to="/jobs/new">
            <Button variant="primary">
              <Plus size={20} weight="bold" />
              Nieuwe vacature
            </Button>
          </Link>
        )}
      </div>

      <Table
        columns={columns}
        data={jobs}
        onRowClick={(job) => window.location.href = `/jobs/${job.id}`}
        emptyMessage="Nog geen vacatures"
      />
    </div>
  );
}
