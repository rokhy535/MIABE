import React, { useState } from 'react';

interface DepositProps {
  navigateTo: (page: string) => void;
  showToast: (msg: string) => void;
  isLoggedIn: boolean;
  userType: string | null;
}

const Deposit: React.FC<DepositProps> = ({ navigateTo, showToast, isLoggedIn, userType }) => {
  const [titre, setTitre] = useState('');
  const [type, setType] = useState('');
  const [artiste, setArtiste] = useState('');
  const [fileLoaded, setFileLoaded] = useState(false);

  const generateHash = () => {
    return '0x' + Array.from({ length: 16 }, () => Math.floor(Math.random() * 16).toString(16)).join('') + '...';
  };

  const updateCert = () => {
    const preview = document.getElementById('certPreview');
    if (titre || type || artiste) {
      preview?.classList.add('show');
      document.getElementById('cp-titre')!.textContent = titre || '—';
      document.getElementById('cp-type')!.textContent = type || '—';
      document.getElementById('cp-artiste')!.textContent = artiste || '—';
      const now = new Date();
      document.getElementById('cp-date')!.textContent = now.toISOString().replace('T', ' ').substring(0, 19) + ' UTC';
      document.getElementById('cp-hash')!.textContent = generateHash();
    } else {
      preview?.classList.remove('show');
    }
  };

  const handleSubmit = () => {
    if (!isLoggedIn || userType !== 'artist') {
      showToast('Veuillez vous connecter en tant qu\'artiste pour déposer une oeuvre');
      navigateTo('login');
      return;
    }
    if (!titre) {
      showToast('Veuillez remplir le titre de l\'oeuvre');
      return;
    }
    showToast('Certification blockchain en cours... ✓ Oeuvre enregistrée !');
    setTimeout(() => navigateTo('artist-detail'), 1500);
  };

  const handleFileUpload = () => {
    setFileLoaded(true);
    showToast('Fichier simulé : djembe_royal.mp3 chargé ✓');
    updateCert();
  };

  return (
    <div className="form-section">
      <div className="form-title">Déposer une oeuvre</div>
      <div className="form-subtitle">Certification blockchain horodatée · Preuve légale d'antériorité</div>

      <div className="form-group">
        <label className="form-label">Titre de l'oeuvre *</label>
        <input className="form-input" type="text" placeholder="Ex : Set du Djembé Royal" value={titre} onChange={(e) => { setTitre(e.target.value); updateCert(); }} />
      </div>
      <div className="form-row">
        <div className="form-group">
          <label className="form-label">Type d'oeuvre *</label>
          <select className="form-select" value={type} onChange={(e) => { setType(e.target.value); updateCert(); }}>
            <option value="">Sélectionner...</option>
            <option>Musique</option>
            <option>Photographie</option>
            <option>Cinéma / Vidéo</option>
            <option>Arts visuels</option>
            <option>Littérature</option>
          </select>
        </div>
        <div className="form-group">
          <label className="form-label">Artiste *</label>
          <input className="form-input" type="text" placeholder="Votre nom certifié" value={artiste} onChange={(e) => { setArtiste(e.target.value); updateCert(); }} />
        </div>
      </div>
      <div className="form-group">
        <label className="form-label">Description</label>
        <textarea className="form-textarea" placeholder="Décrivez votre oeuvre..."></textarea>
      </div>
      <div className="form-group">
        <label className="form-label">Fichier de l'oeuvre</label>
        <div className="upload-zone" onClick={handleFileUpload}>
          {!fileLoaded ? (
            <>
              <div className="uz-icon">↑</div>
              <div className="uz-label">Glissez votre fichier ici ou cliquez</div>
              <div className="uz-sub">MP3, MP4, JPG, PNG, PDF · Max 200MB</div>
            </>
          ) : (
            <>
              <div className="uz-icon">✓</div>
              <div className="uz-label" style={{ color: 'var(--blue-light)' }}>djembe_royal.mp3 chargé</div>
              <div className="uz-sub">SHA-256 calculé</div>
            </>
          )}
        </div>
      </div>

      <div className="cert-preview" id="certPreview">
        <div className="cert-title">Aperçu du certificat blockchain</div>
        <div className="cert-line"><span className="cl">Titre</span><span className="cv" id="cp-titre">—</span></div>
        <div className="cert-line"><span className="cl">Type</span><span className="cv" id="cp-type">—</span></div>
        <div className="cert-line"><span className="cl">Artiste</span><span className="cv" id="cp-artiste">—</span></div>
        <div className="cert-line"><span className="cl">Horodatage</span><span className="cv" id="cp-date">—</span></div>
        <div className="cert-line"><span className="cl">Réseau</span><span className="cv">ArtistID Chain · Sénégal</span></div>
        <div className="cert-hash">Hash SHA-256 : <span className="chv" id="cp-hash">—</span></div>
      </div>

      <div style={{ display: 'flex', gap: '12px', marginTop: '28px' }}>
        <button className="btn-primary" style={{ flex: 1 }} onClick={handleSubmit}>Certifier sur la blockchain →</button>
        <button className="btn-secondary" onClick={() => navigateTo('home')}>Annuler</button>
      </div>
    </div>
  );
};

export default Deposit;