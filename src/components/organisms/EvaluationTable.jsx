import { useState, useEffect } from 'react';
import { Check } from '@phosphor-icons/react';
import Input from '../atoms/Input.jsx';
import Select from '../atoms/Select.jsx';
import Button from '../atoms/Button.jsx';
import { VERDICT, VERDICT_LABELS } from '../../../shared/constants.js';
import { api } from '../../lib/apiClient.js';

export default function EvaluationTable({ jobId, onUpdate }) {
  const [evaluations, setEvaluations] = useState([]);
  const [signoffs, setSignoffs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadEvaluations();
  }, [jobId]);

  const loadEvaluations = async () => {
    try {
      const data = await api.getEvaluationsForJob(jobId);
      setEvaluations(data.evaluations || []);
      setSignoffs(data.signoffs || []);
    } catch (error) {
      console.error('Error loading evaluations:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEvaluationChange = (evalId, field, value) => {
    setEvaluations(prev =>
      prev.map(ev =>
        ev.id === evalId ? { ...ev, [field]: value } : ev
      )
    );
  };

  const handleSave = async (evaluation) => {
    try {
      await api.saveEvaluation({
        job_id: jobId,
        application_id: evaluation.application_id,
        interview_date: evaluation.interview_date,
        interview_time: evaluation.interview_time,
        verdict: evaluation.verdict,
        ranking_int: evaluation.ranking_int ? parseInt(evaluation.ranking_int) : null,
        chosen_bool: evaluation.chosen_bool || false
      });
      alert('Evaluatie opgeslagen');
      if (onUpdate) onUpdate();
    } catch (error) {
      alert('Fout bij opslaan: ' + error.message);
    }
  };

  const handleSignoff = async () => {
    try {
      await api.signoffJob(jobId);
      alert('Aftekening geregistreerd');
      loadEvaluations();
    } catch (error) {
      alert('Fout bij aftekenen: ' + error.message);
    }
  };

  const hasDirectieSignoff = signoffs.some(s => s.role === 'directie');
  const hasPsychologistSignoff = signoffs.some(s => s.role === 'psycholoog');

  if (loading) return <div>Laden...</div>;

  return (
    <div className="evaluation-table">
      <div className="table-wrapper">
        <table className="table">
          <thead>
            <tr>
              <th>Kandidaat</th>
              <th>Datum</th>
              <th>Uur</th>
              <th>Verdict</th>
              <th>Rangschikking</th>
              <th>Gekozen</th>
              <th>Acties</th>
            </tr>
          </thead>
          <tbody>
            {evaluations.map(ev => (
              <tr key={ev.id}>
                <td>{ev.first_name} {ev.last_name}</td>
                <td>
                  <Input
                    type="date"
                    value={ev.interview_date || ''}
                    onChange={(e) => handleEvaluationChange(ev.id, 'interview_date', e.target.value)}
                  />
                </td>
                <td>
                  <Input
                    type="time"
                    value={ev.interview_time || ''}
                    onChange={(e) => handleEvaluationChange(ev.id, 'interview_time', e.target.value)}
                  />
                </td>
                <td>
                  <Select
                    value={ev.verdict || ''}
                    onChange={(e) => handleEvaluationChange(ev.id, 'verdict', e.target.value)}
                    options={Object.entries(VERDICT_LABELS).map(([value, label]) => ({
                      value,
                      label
                    }))}
                    placeholder="Selecteer"
                  />
                </td>
                <td>
                  <Input
                    type="number"
                    value={ev.ranking_int || ''}
                    onChange={(e) => handleEvaluationChange(ev.id, 'ranking_int', e.target.value)}
                    placeholder="#"
                  />
                </td>
                <td>
                  <input
                    type="checkbox"
                    checked={ev.chosen_bool || false}
                    onChange={(e) => handleEvaluationChange(ev.id, 'chosen_bool', e.target.checked)}
                  />
                </td>
                <td>
                  <Button size="small" onClick={() => handleSave(ev)}>
                    Opslaan
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="signoffs">
        <h3>Aftekeningen</h3>
        <div className="signoff-list">
          <div className="signoff-item">
            {hasDirectieSignoff && <Check size={20} weight="bold" />}
            <span>Directie</span>
            {hasDirectieSignoff && (
              <span className="signoff-info">
                {signoffs.find(s => s.role === 'directie')?.signed_by_name}
              </span>
            )}
          </div>
          <div className="signoff-item">
            {hasPsychologistSignoff && <Check size={20} weight="bold" />}
            <span>Arbeidspsycholoog</span>
            {hasPsychologistSignoff && (
              <span className="signoff-info">
                {signoffs.find(s => s.role === 'psycholoog')?.signed_by_name}
              </span>
            )}
          </div>
        </div>
        <Button onClick={handleSignoff} variant="primary">
          Aftekenen
        </Button>
      </div>
    </div>
  );
}
