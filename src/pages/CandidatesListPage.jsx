import { useState, useEffect } from 'react';
import { Plus } from '@phosphor-icons/react';
import Button from '../components/atoms/Button.jsx';
import Input from '../components/atoms/Input.jsx';
import Table from '../components/molecules/Table.jsx';
import { api } from '../lib/apiClient.js';
import { formatDate } from '../lib/format.js';

export default function CandidatesListPage({ user }) {
  const [candidates, setCandidates] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCandidates();
  }, []);

  const loadCandidates = async () => {
    try {
      const data = await api.getCandidates();
      setCandidates(data);
    } catch (error) {
      console.error('Error loading candidates:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await api.getCandidates(searchTerm);
      setCandidates(data);
    } catch (error) {
      console.error('Error searching candidates:', error);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      header: 'Naam',
      render: (candidate) => `${candidate.first_name} ${candidate.last_name}`
    },
    { header: 'E-mail', field: 'email' },
    { header: 'Telefoon', field: 'phone' },
    {
      header: 'Sollicitaties',
      render: (candidate) => candidate.application_count || 0
    },
    {
      header: 'Toegevoegd',
      render: (candidate) => formatDate(candidate.created_at)
    }
  ];

  if (loading) return <div className="loading">Laden...</div>;

  return (
    <div className="candidates-list-page">
      <div className="page-header">
        <h1>Kandidaten</h1>
      </div>

      <form onSubmit={handleSearch} className="search-bar">
        <Input
          type="search"
          placeholder="Zoek kandidaten op naam of e-mail..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button type="submit">Zoeken</Button>
      </form>

      <Table
        columns={columns}
        data={candidates}
        emptyMessage="Nog geen kandidaten"
      />
    </div>
  );
}
