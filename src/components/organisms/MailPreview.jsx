import { useState } from 'react';
import Button from '../atoms/Button.jsx';
import FormRow from '../molecules/FormRow.jsx';
import Input from '../atoms/Input.jsx';
import Textarea from '../atoms/Textarea.jsx';
import Badge from '../atoms/Badge.jsx';
import { MAIL_STATUS_LABELS } from '../../../shared/constants.js';

export default function MailPreview({ mail, onUpdate, onApprove, onSend, canEdit = false, canApprove = false }) {
  const [isEditing, setIsEditing] = useState(false);
  const [subject, setSubject] = useState(mail.subject);
  const [body, setBody] = useState(mail.body);

  const handleSave = async () => {
    await onUpdate(mail.id, { subject, body });
    setIsEditing(false);
  };

  const getStatusVariant = (status) => {
    switch (status) {
      case 'draft': return 'warning';
      case 'approved': return 'info';
      case 'sent': return 'success';
      default: return 'default';
    }
  };

  return (
    <div className="mail-preview">
      <div className="mail-preview__header">
        <Badge variant={getStatusVariant(mail.status)}>
          {MAIL_STATUS_LABELS[mail.status]}
        </Badge>
        {canEdit && mail.status === 'draft' && !isEditing && (
          <Button size="small" onClick={() => setIsEditing(true)}>
            Bewerken
          </Button>
        )}
      </div>

      {isEditing ? (
        <div className="mail-preview__edit">
          <FormRow label="Onderwerp">
            <Input
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
          </FormRow>
          <FormRow label="Bericht">
            <Textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              rows={12}
            />
          </FormRow>
          <div className="form-actions">
            <Button onClick={handleSave}>Opslaan</Button>
            <Button variant="secondary" onClick={() => setIsEditing(false)}>
              Annuleren
            </Button>
          </div>
        </div>
      ) : (
        <div className="mail-preview__content">
          <div className="mail-preview__field">
            <strong>Aan:</strong> {mail.candidate_email}
          </div>
          <div className="mail-preview__field">
            <strong>Onderwerp:</strong> {mail.subject}
          </div>
          <div className="mail-preview__body">
            {mail.body.split('\n').map((line, i) => (
              <p key={i}>{line}</p>
            ))}
          </div>
        </div>
      )}

      <div className="mail-preview__actions">
        {canApprove && mail.status === 'draft' && (
          <Button onClick={() => onApprove(mail.id)} variant="primary">
            Goedkeuren
          </Button>
        )}
        {canApprove && mail.status === 'approved' && (
          <Button onClick={() => onSend(mail.id)} variant="success">
            Markeer als verzonden
          </Button>
        )}
      </div>
    </div>
  );
}
