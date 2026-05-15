import React, { useState } from 'react';

interface VerifyProps {
  navigateTo: (page: string) => void;
  showToast: (msg: string) => void;
}

const Verify: React.FC<VerifyProps> = ({ navigateTo, showToast }) => {
  const [inputValue, setInputValue] = useState('');
  const [showOk, setShowOk] = useState(false);
  const [showFake, setShowFake] = useState(false);

  const doVerify = () => {
    const val = inputValue.trim().toLowerCase();
    setShowOk(false);
    setShowFake(false);
    
    if (!val) return;
    
    if (val.includes('0x7f4') || val.includes('youssou') || val.includes('omar') || val.includes('aïcha') || val.includes('moussa') || val.includes('alioune')) {
      setShowOk(true);
    } else {
      setShowFake(true);
    }
  };

  const handleSupport = () => {
    showToast('Soutien envoyé directement à Youssou N\'Dour !');
    navigateTo('login');
  };

  const handleReport = () => {
    showToast('Signalement enregistré. Merci !');
  };

  return (
    <div className="verify-center">
      <div className="verify-title">Vérifier un artiste</div>
      <div className="verify-sub">Entrez le hash blockchain ou le nom de l'artiste</div>
      <div className="verify-input-row">
        <input className="verify-input" type="text" placeholder="0x7f4a9c... ou Youssou N'Dour" value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
        <button className="verify-btn" onClick={doVerify}>Vérifier</button>
      </div>
      <div style={{ fontSize: '11px', color: 'var(--text3)', fontFamily: 'monospace', marginBottom: '32px' }}>
        ou scannez le QR code sur le profil de l'artiste
      </div>

      {showOk && (
        <div className="result-card show verified">
          <div className="result-status ok"><span className="status-indicator ok"></span>Artiste AUTHENTIQUE — Certifié</div>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center', marginBottom: '16px' }}>
            <div className="hc-avatar" style={{ width: '56px', height: '56px', fontSize: '20px' }}>YN</div>
            <div>
              <div style={{ fontSize: '16px', fontWeight: 700, color: '#fff' }}>Youssou N'Dour</div>
              <div style={{ fontSize: '12px', color: 'var(--text3)', fontFamily: 'monospace' }}>Musicien · Dakar</div>
            </div>
            <div className="hc-verified" style={{ marginLeft: 'auto' }}>✓ CERTIFIÉ</div>
          </div>
          <div className="cert-line"><span className="cl">Hash blockchain</span><span className="cv">0x7f4a9c3e1b2d8f5a...</span></div>
          <div className="cert-line"><span className="cl">Certifié le</span><span className="cv">2026-01-15 14:32:07 UTC</span></div>
          <div className="cert-line"><span className="cl">Oeuvres déposées</span><span className="cv">148</span></div>
          <div style={{ marginTop: '16px' }}>
            <button className="support-btn" onClick={handleSupport}>♥ Envoyer un soutien direct</button>
          </div>
        </div>
      )}

      {showFake && (
        <div className="result-card show fake">
          <div className="result-status ko"><span className="status-indicator ko"></span>USURPATEUR DÉTECTÉ</div>
          <div style={{ fontSize: '13px', color: 'var(--text2)', lineHeight: '1.6', marginBottom: '16px' }}>
            Ce compte n'est PAS certifié sur ArtistID. Il ne figure pas dans notre registre blockchain. Ne lui envoyez aucun paiement.
          </div>
          <button className="promo-cta" style={{ borderRadius: '3px' }} onClick={handleReport}>⚠ Signaler cet usurpateur</button>
        </div>
      )}
    </div>
  );
};

export default Verify;