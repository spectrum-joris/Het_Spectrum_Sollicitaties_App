import { useState, useEffect } from 'react';
import FormRow from '../molecules/FormRow.jsx';
import Input from '../atoms/Input.jsx';
import Select from '../atoms/Select.jsx';
import Textarea from '../atoms/Textarea.jsx';
import Button from '../atoms/Button.jsx';
import { api } from '../../lib/apiClient.js';
import { APPLICATION_STATUS } from '../../../shared/constants.js';

export default function ApplicationForm({ initialData = {}, onSubmit, onCancel }) {
  const [candidates, setCandidates] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [selectedJobs, setSelectedJobs] = useState(initialData.job_ids || []);

  const [formData, setFormData] = useState({
    candidate_id: initialData.candidate_id || '',
    source_email_subject: initialData.source_email_subject || '',
    source_email_from: initialData.source_email_from || '',
    received_at: initialData.received_at || '',
    status: initialData.status || APPLICATION_STATUS.NEW
  });

  const [errors, setErrors] = useState({});
  const [showNewCandidate, setShowNewCandidate] = useState(false);
  const [newCandidate, setNewCandidate] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    notes: ''
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [candidatesData, jobsData] = await Promise.all([
        api.getCandidates(),
        api.getJobs()
      ]);
      setCandidates(candidatesData);
      setJobs(jobsData);
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleNewCandidateChange = (e) => {
    const { name, value } = e.target;
    setNewCandidate(prev => ({ ...prev, [name]: value }));
  };

  const handleJobToggle = (jobId) => {
    setSelectedJobs(prev =>
      prev.includes(jobId)
        ? prev.filter(id => id !== jobId)
        : [...prev, jobId]
    );
  };

  const handleCreateCandidate = async () => {
    try {
      const candidate = await api.createCandidate(newCandidate);
      setCandidates(prev => [...prev, candidate]);
      setFormData(prev => ({ ...prev, candidate_id: candidate.id }));
      setShowNewCandidate(false);
      setNewCandidate({ first_name: '', last_name: '', email: '', phone: '', notes: '' });
    } catch (error) {
      alert('Fout bij aanmaken kandidaat: ' + error.message);
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.candidate_id) newErrors.candidate_id = 'Selecteer of maak een kandidaat aan';
    if (selectedJobs.length === 0) newErrors.jobs = 'Selecteer minstens één vacature';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit({ ...formData, job_ids: selectedJobs });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="application-form">
      <FormRow label="Kandidaat" required error={errors.candidate_id}>
        {!showNewCandidate ? (
          <>
            <Select
              name="candidate_id"
              value={formData.candidate_id}
              onChange={handleChange}
              placeholder="Selecteer een kandidaat"
              options={candidates.map(c => ({
                value: c.id,
                label: `${c.first_name} ${c.last_name}`
              }))}
            />
            <Button
              type="button"
              variant="secondary"
              size="small"
              onClick={() => setShowNewCandidate(true)}
              className="mt-2"
            >
              + Nieuwe kandidaat
            </Button>
          </>
        ) : (
          <div className="new-candidate-form">
            <Input
              name="first_name"
              placeholder="Voornaam"
              value={newCandidate.first_name}
              onChange={handleNewCandidateChange}
            />
            <Input
              name="last_name"
              placeholder="Achternaam"
              value={newCandidate.last_name}
              onChange={handleNewCandidateChange}
            />
            <Input
              name="email"
              type="email"
              placeholder="E-mail"
              value={newCandidate.email}
              onChange={handleNewCandidateChange}
            />
            <Input
              name="phone"
              placeholder="Telefoon"
              value={newCandidate.phone}
              onChange={handleNewCandidateChange}
            />
            <div className="button-group">
              <Button type="button" size="small" onClick={handleCreateCandidate}>
                Aanmaken
              </Button>
              <Button
                type="button"
                variant="secondary"
                size="small"
                onClick={() => setShowNewCandidate(false)}
              >
                Annuleren
              </Button>
            </div>
          </div>
        )}
      </FormRow>

      <FormRow label="Vacatures" required error={errors.jobs}>
        <div className="checkbox-group">
          {jobs.map(job => (
            <label key={job.id} className="checkbox-label">
              <input
                type="checkbox"
                checked={selectedJobs.includes(job.id)}
                onChange={() => handleJobToggle(job.id)}
              />
              {job.title}
            </label>
          ))}
        </div>
      </FormRow>

      <FormRow label="E-mail onderwerp" htmlFor="source_email_subject">
        <Input
          id="source_email_subject"
          name="source_email_subject"
          value={formData.source_email_subject}
          onChange={handleChange}
          placeholder="Onderwerp van de sollicitatie-email"
        />
      </FormRow>

      <FormRow label="E-mail van" htmlFor="source_email_from">
        <Input
          id="source_email_from"
          name="source_email_from"
          type="email"
          value={formData.source_email_from}
          onChange={handleChange}
          placeholder="E-mailadres van de sollicitant"
        />
      </FormRow>

      <FormRow label="Ontvangen op" htmlFor="received_at">
        <Input
          id="received_at"
          name="received_at"
          type="datetime-local"
          value={formData.received_at}
          onChange={handleChange}
        />
      </FormRow>

      <div className="form-actions">
        <Button type="submit" variant="primary">Opslaan</Button>
        {onCancel && (
          <Button type="button" variant="secondary" onClick={onCancel}>
            Annuleren
          </Button>
        )}
      </div>
    </form>
  );
}
