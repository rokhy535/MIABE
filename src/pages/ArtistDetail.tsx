import React from 'react';

interface Artist {
  id: number;
  initials: string;
  name: string;
  type: string;
  certified: boolean;
  oeuvres: number;
  fans: number;
  fcfas: number;
  rank: number;
  avatarColor: string;
  bio?: string;
  hash?: string;
  certifiedDate?: string;
  tags?: string[];
}

interface ArtistDetailProps {
  artist: Artist | null;
  navigateTo: (page: string, artist?: any) => void;
  showToast: (msg: string) => void;
  isLoggedIn: boolean;
}

const ArtistDetail: React.FC<ArtistDetailProps> = ({ artist, navigateTo, showToast, isLoggedIn }) => {
  // Vérification si artist est null
  if (!artist) {
    return (
      <div className="section">
        <div style={{ textAlign: 'center', padding: '60px 20px' }}>
          <h2>Artiste non trouvé</h2>
          <button className="btn-primary" onClick={() => navigateTo('artists')}>
            Retour à la liste
          </button>
        </div>
      </div>
    );
  }

  const handleSupport = () => {
    if (!isLoggedIn) {
      showToast('Veuillez vous connecter pour envoyer un soutien');
      navigateTo('login');
      return;
    }
    showToast('Merci pour votre soutien ! Transaction envoyée.');
  };

  return (
    <>
      <div className="artist-profile-header">
        <div className="aph-inner">
          <div className="aph-avatar">{artist.initials}</div>
          <div className="aph-info">
            <div className="aph-name">{artist.name}</div>
            <div className="aph-type">{artist.type}</div>
            <div className="aph-tags">
              <span className="tag certified">✓ CERTIFIÉ BLOCKCHAIN</span>
              {artist.tags?.map(tag => (
                <span key={tag} className="tag">{tag}</span>
              ))}
            </div>
            <div className="aph-bio">{artist.bio || 'Artiste certifié sur la blockchain ArtistID.'}</div>
          </div>
          <div className="aph-right">
            <div className="aph-hash-block">
              <span style={{ color: 'var(--text3)', fontSize: '10px', display: 'block', marginBottom: '3px' }}>HASH BLOCKCHAIN :</span>
              <span className="hash-val">{artist.hash || '0x7f4a9c3e1b2d8f5a...'}</span><br />
              <span style={{ color: 'var(--text3)', fontSize: '10px', marginTop: '4px', display: 'block' }}>CERTIFIÉ LE {artist.certifiedDate || '2026-01-15'}</span>
            </div>
            <button className="support-btn" onClick={handleSupport}>♥ Envoyer un soutien direct</button>
          </div>
        </div>
      </div>
      <div className="section">
        <div className="aph-stats">
          <div className="aph-stat-item"><div className="v">{artist.oeuvres}</div><div className="l">OEUVRES DÉPOSÉES</div></div>
          <div className="aph-stat-item"><div className="v">{artist.fans}</div><div className="l">FANS VÉRIFIÉS</div></div>
          <div className="aph-stat-item"><div className="v">{(artist.fcfas / 1000000).toFixed(1)}M</div><div className="l">FCFA REÇUS</div></div>
          <div className="aph-stat-item"><div className="v">0</div><div className="l">USURPATIONS ACTIVES</div></div>
        </div>
        <div className="section-header">
          <div className="section-title">Oeuvres <span>déposées</span></div>
          <button className="oc-btn" onClick={() => showToast('Téléchargement du certificat en cours...')}>Télécharger tous les certificats</button>
        </div>
        <div className="oeuvres-grid">
          <div className="oeuvre-card">
            <div className="oc-thumb" style={{ background: 'linear-gradient(135deg,#0f0a1a,#2a1a5a)' }}>
              <div className="oc-thumb-inner">♪</div>
              <span className="oc-type-badge music">MUSIQUE</span>
              <span className="oc-certified">✓</span>
            </div>
            <div className="oc-info">
              <div className="oc-title">7 Secondes — Remix</div>
              <div className="oc-artist">{artist.name}</div>
              <div className="oc-meta">
                <span className="oc-date">2026-05-04</span>
                <div className="oc-actions">
                  <button className="oc-btn" onClick={() => showToast('Certificat téléchargé ✓')}>Certificat</button>
                  <button className="oc-btn support" onClick={handleSupport}>♥</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ArtistDetail;