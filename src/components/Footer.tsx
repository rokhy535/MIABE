export default function Footer() {
  return (
    <div>
      <div className="footer-top">
        <div className="footer-grid">
          {[
            ['ArtistID', ['À propos', 'Blog', 'Presse', 'Contact']],
            ['Artistes', ['Créer un profil', 'Déposer une œuvre', 'Certification']],
            ['Fans', ['Vérifier un artiste', 'Soutenir', 'Signaler']],
            ['Légal', ["Conditions d'utilisation", 'Confidentialité', 'Cookies']],
          ].map(([title, links]) => (
            <div key={title as string}>
              <div className="fg-title">{title}</div>
              {(links as string[]).map(l => <span key={l} className="fg-link">{l}</span>)}
            </div>
          ))}
        </div>
      </div>
      <div className="footer-bottom">
        <div className="footer-bottom-inner">
          <span className="fb-copy">© 2026 ArtistID · MIABE Hackathon · SN-01</span>
          <span style={{ fontSize: 10, color: 'var(--text3)' }}>Blockchain active · Sénégal</span>
        </div>
      </div>
    </div>
  );
}