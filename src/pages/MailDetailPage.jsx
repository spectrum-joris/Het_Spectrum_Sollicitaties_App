import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from '@phosphor-icons/react';
import Button from '../components/atoms/Button.jsx';
import Card from '../components/molecules/Card.jsx';
import MailPreview from '../components/organisms/MailPreview.jsx';
import { api } from '../lib/apiClient.js';

export default function MailDetailPage({ user }) {
  const { mailId } = useParams();
  const navigate = useNavigate();
  const [mail, setMail] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMail();
  }, [mailId]);

  const loadMail = async () => {
    try {
      const data = await api.getMailDraft(mailId);
      setMail(data);
    } catch (error) {
      console.error('Error loading mail:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (id, data) => {
    try {
      await api.updateMailDraft(id, data.subject, data.body);
      alert('Mail bijgewerkt');
      loadMail();
    } catch (error) {
      alert('Fout bij bijwerken: ' + error.message);
    }
  };

  const handleApprove = async (id) => {
    try {
      await api.approveMail(id);
      alert('Mail goedgekeurd');
      loadMail();
    } catch (error) {
      alert('Fout bij goedkeuren: ' + error.message);
    }
  };

  const handleSend = async (id) => {
    try {
      await api.sendMail(id);
      alert('Mail gemarkeerd als verzonden');
      loadMail();
    } catch (error) {
      alert('Fout bij verzenden: ' + error.message);
    }
  };

  const canEdit = user?.role === 'admin' || user?.role === 'directie';
  const canApprove = user?.role === 'directie';

  if (loading) return <div className="loading">Laden...</div>;
  if (!mail) return <div>Mail niet gevonden</div>;

  return (
    <div className="mail-detail-page">
      <div className="page-header">
        <Button variant="secondary" onClick={() => navigate('/mail/outbox')}>
          <ArrowLeft size={20} />
          Terug
        </Button>
      </div>

      <Card title="Mail preview">
        <MailPreview
          mail={mail}
          onUpdate={handleUpdate}
          onApprove={handleApprove}
          onSend={handleSend}
          canEdit={canEdit}
          canApprove={canApprove}
        />
      </Card>
    </div>
  );
}
