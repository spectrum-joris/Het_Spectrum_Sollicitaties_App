import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus } from '@phosphor-icons/react';
import Button from '../components/atoms/Button.jsx';
import Badge from '../components/atoms/Badge.jsx';
import Table from '../components/molecules/Table.jsx';
import { api } from '../lib/apiClient.js';
import { formatDate } from '../lib/format.js';
import { APPLICATION_STATUS_LABELS } from '../../shared/constants.js';

export default function ApplicationsListPage({ user }) {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadApplications();
  }, []);

  const loadApplications = async () => {
    try {
      const data = await api.getApplications();
      setApplications(data);
    } catch (error) {
      console.error('Error loading applications:', error);
    } finally {
      setLoading(false);
    }
  };

  const canManage = user?.role === 'admin';

  const getStatusVariant = (status) => {
    switch (status) {
      case 'new': return 'info';
      case 'in_review': return 'warning';
      case 'decision_made': return 'success';
      default: return 'default';
    }
  };

  const columns = [
    {
      header: 'Kandidaat',
      render: (app) => `${app.first_name} ${app.last_name}`
    },
    {
      header: 'E-mail',
      field: 'candidate_email'
    },
    {
      header: 'Status',
      render: (app) => (
        <Badge variant={getStatusVariant(app.status)}>
          {APPLICATION_STATUS_LABELS[app.status]}
        </Badge>
      )
    },
    {
      header: 'Ontvangen',
      render: (app) => formatDate(app.created_at)
    }
  ];

  if (loading) return <div className="loading">Laden...</div>;

  return (
    <div className="applications-list-page">
      <div className="page-header">
        <h1>Sollicitaties</h1>
        {canManage && (
          <Link to="/applications/new">
            <Button variant="primary">
              <Plus size={20} weight="bold" />
              Nieuwe sollicitatie
            </Button>
          </Link>
        )}
      </div>

      <Table
        columns={columns}
        data={applications}
        onRowClick={(app) => window.location.href = `/applications/${app.id}`}
        emptyMessage="Nog geen sollicitaties"
      />
    </div>
  );
}
