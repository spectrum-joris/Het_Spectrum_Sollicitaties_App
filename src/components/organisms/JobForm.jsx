import { useState } from 'react';
import FormRow from '../molecules/FormRow.jsx';
import Input from '../atoms/Input.jsx';
import Textarea from '../atoms/Textarea.jsx';
import Button from '../atoms/Button.jsx';

export default function JobForm({ initialData = {}, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    title: initialData.title || '',
    requirements_text: initialData.requirements_text || '',
    grade: initialData.grade || '',
    subject: initialData.subject || '',
    hours: initialData.hours || '',
    period_text: initialData.period_text || '',
    start_date: initialData.start_date || ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Titel is verplicht';
    if (!formData.grade.trim()) newErrors.grade = 'Graad is verplicht';
    if (!formData.subject.trim()) newErrors.subject = 'Vak is verplicht';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="job-form">
      <FormRow label="Titel" htmlFor="title" required error={errors.title}>
        <Input
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="bijv. Leraar Wiskunde"
        />
      </FormRow>

      <FormRow label="Vereisten" htmlFor="requirements_text">
        <Textarea
          id="requirements_text"
          name="requirements_text"
          value={formData.requirements_text}
          onChange={handleChange}
          placeholder="Omschrijf de vereisten voor deze functie"
          rows={4}
        />
      </FormRow>

      <FormRow label="Graad" htmlFor="grade" required error={errors.grade}>
        <Input
          id="grade"
          name="grade"
          value={formData.grade}
          onChange={handleChange}
          placeholder="bijv. Secundair onderwijs"
        />
      </FormRow>

      <FormRow label="Vak" htmlFor="subject" required error={errors.subject}>
        <Input
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          placeholder="bijv. Wiskunde"
        />
      </FormRow>

      <FormRow label="Aantal uren" htmlFor="hours">
        <Input
          id="hours"
          name="hours"
          type="number"
          step="0.5"
          value={formData.hours}
          onChange={handleChange}
          placeholder="bijv. 20"
        />
      </FormRow>

      <FormRow label="Periode" htmlFor="period_text">
        <Input
          id="period_text"
          name="period_text"
          value={formData.period_text}
          onChange={handleChange}
          placeholder="bijv. Schooljaar 2025-2026"
        />
      </FormRow>

      <FormRow label="Startdatum" htmlFor="start_date">
        <Input
          id="start_date"
          name="start_date"
          type="date"
          value={formData.start_date}
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
