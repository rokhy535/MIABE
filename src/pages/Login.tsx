import React, { useState } from 'react';

interface LoginProps {
  navigateTo: (page: string) => void;
  showToast: (msg: string) => void;
  onLogin: (type: string) => void;
}

const Login: React.FC<LoginProps> = ({ navigateTo, showToast, onLogin }) => {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [artistName, setArtistName] = useState('');
  const [activityType, setActivityType] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);

  const handleLogin = () => {
    if (!email || !password) {
      showToast('Veuillez remplir tous les champs');
      return;
    }
    onLogin('fan');
    showToast('Connexion réussie. Bienvenue !');
  };

  const handleFanLogin = () => {
    onLogin('fan');
    showToast('Connecté en tant que fan !');
  };

  const handleRegister = () => {
    if (!artistName || !activityType || !email || !password) {
      showToast('Veuillez remplir tous les champs');
      return;
    }
    if (!acceptTerms) {
      showToast('Veuillez accepter les conditions');
      return;
    }
    onLogin('artist');
    showToast('Profil créé ! Déposez votre première oeuvre.');
    navigateTo('deposit');
  };

  return (
    <div className="auth-center">
      <div className="auth-card">
        <div className="auth-title">Accéder à ArtistID</div>
        <div className="auth-sub">Plateforme d'identification artistique blockchain · Sénégal</div>
        <div className="auth-tabs">
          <button className={`auth-tab ${activeTab === 'login' ? 'active' : ''}`} onClick={() => setActiveTab('login')}>Se connecter</button>
          <button className={`auth-tab ${activeTab === 'register' ? 'active' : ''}`} onClick={() => setActiveTab('register')}>Créer un profil</button>
        </div>

        {activeTab === 'login' && (
          <div>
            <div className="form-group">
              <label className="form-label">Adresse email ou identifiant</label>
              <input className="form-input" type="email" placeholder="artiste@email.com" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label">Mot de passe</label>
              <input className="form-input" type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <button className="btn-block" onClick={handleLogin}>Se connecter →</button>
            <div className="form-divider" style={{ display: 'flex', alignItems: 'center', gap: '12px', margin: '20px 0', fontSize: '11px', color: 'var(--text3)' }}>
              <span style={{ flex: 1, height: '1px', background: 'var(--border)' }}></span>
              ou
              <span style={{ flex: 1, height: '1px', background: 'var(--border)' }}></span>
            </div>
            <button className="btn-fan" style={{ width: '100%', background: 'transparent', border: '1px solid rgba(239,68,68,0.35)', borderRadius: '3px', padding: '10px', color: 'var(--red-light)', fontSize: '13px', cursor: 'pointer' }} onClick={handleFanLogin}>Continuer comme fan</button>
          </div>
        )}

        {activeTab === 'register' && (
          <div>
            <div className="form-group">
              <label className="form-label">Nom artistique *</label>
              <input className="form-input" type="text" placeholder="Votre nom d'artiste" value={artistName} onChange={(e) => setArtistName(e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label">Type d'activité *</label>
              <select className="form-select" value={activityType} onChange={(e) => setActivityType(e.target.value)}>
                <option value="">Sélectionner...</option>
                <option>Musicien(ne)</option>
                <option>Photographe</option>
                <option>Vidéaste / Cinéaste</option>
                <option>Artiste visuel(le)</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Email *</label>
              <input className="form-input" type="email" placeholder="artiste@email.com" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label">Mot de passe *</label>
              <input className="form-input" type="password" placeholder="Minimum 8 caractères" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <label className="form-check" style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '12px', color: 'var(--text3)', marginBottom: '16px', cursor: 'pointer' }}>
              <input type="checkbox" checked={acceptTerms} onChange={(e) => setAcceptTerms(e.target.checked)} style={{ marginTop: '2px' }} />
              J'accepte que mon profil soit enregistré sur la blockchain ArtistID (immuable et public).
            </label>
            <button className="btn-block" onClick={handleRegister}>Créer mon profil certifié →</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;