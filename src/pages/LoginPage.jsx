import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/atoms/Button.jsx';
import Input from '../components/atoms/Input.jsx';
import FormRow from '../components/molecules/FormRow.jsx';
import { api } from '../lib/apiClient.js';

export default function LoginPage({ onLogin }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const data = await api.login(email, password);
      onLogin(data.user);
      navigate('/');
    } catch (err) {
      setError(err.message || 'Inloggen mislukt');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-card__header">
          <h1>Het Spectrum</h1>
          <p>Sollicitaties Applicatie</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          {error && <div className="alert alert--error">{error}</div>}

          <FormRow label="E-mailadres" htmlFor="email">
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="uw.email@hetspectrum.be"
              required
            />
          </FormRow>

          <FormRow label="Wachtwoord" htmlFor="password">
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </FormRow>

          <Button
            type="submit"
            variant="primary"
            disabled={loading}
            className="login-button"
          >
            {loading ? 'Bezig met inloggen...' : 'Inloggen'}
          </Button>
        </form>

        <div className="login-card__footer">
          <p className="text-muted">Testgebruikers:</p>
          <p className="text-small">admin@hetspectrum.be / Welcome123!</p>
          <p className="text-small">directie@hetspectrum.be / Welcome123!</p>
        </div>
      </div>
    </div>
  );
}
