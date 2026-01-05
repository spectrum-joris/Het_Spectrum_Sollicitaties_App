import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from '@phosphor-icons/react';
import Button from '../components/atoms/Button.jsx';
import Card from '../components/molecules/Card.jsx';
import ApplicationForm from '../components/organisms/ApplicationForm.jsx';
import { api } from '../lib/apiClient.js';

export default function ApplicationFormPage() {
  const navigate = useNavigate();

  const handleSubmit = async (formData) => {
    try {
      const newApp = await api.createApplication(formData);
      alert('Sollicitatie aangemaakt');
      navigate(`/applications/${newApp.id}`);
    } catch (error) {
      alert('Fout bij opslaan: ' + error.message);
    }
  };

  return (
    <div className="application-form-page">
      <div className="page-header">
        <Button variant="secondary" onClick={() => navigate('/applications')}>
          <ArrowLeft size={20} />
          Terug
        </Button>
      </div>

      <Card title="Nieuwe sollicitatie">
        <ApplicationForm
          onSubmit={handleSubmit}
          onCancel={() => navigate('/applications')}
        />
      </Card>
    </div>
  );
}
