import React from 'react';

interface FooterProps {
  navigateTo: (page: string, artist?: any) => void;
}

const Footer: React.FC<FooterProps> = ({ navigateTo }) => {
  return (
    <>
      <div className="footer-top">
        <div className="footer-grid">
          <div>
            <div className="fg-title">ArtistID</div>
            <div className="fg-link" onClick={() => navigateTo('home')}>Accueil</div>
            <div className="fg-link" onClick={() => navigateTo('artists')}>Artistes certifiés</div>
            <div className="fg-link" onClick={() => navigateTo('oeuvres')}>Oeuvres déposées</div>
            <div className="fg-link" onClick={() => navigateTo('verify')}>Vérifier un artiste</div>
          </div>
          <div>
            <div className="fg-title">Artistes</div>
            <div className="fg-link" onClick={() => navigateTo('login')}>Créer mon profil</div>
            <div className="fg-link" onClick={() => navigateTo('deposit')}>Déposer une oeuvre</div>
            <div className="fg-link">Obtenir mon certificat</div>
            <div className="fg-link">Guide d'utilisation</div>
          </div>
          <div>
            <div className="fg-title">Fans</div>
            <div className="fg-link" onClick={() => navigateTo('verify')}>Vérifier avant de payer</div>
            <div className="fg-link">Envoyer un soutien</div>
            <div className="fg-link">Signaler un usurpateur</div>
          </div>
          <div>
            <div className="fg-title">Légal & Partenaires</div>
            <div className="fg-link">BSDA Sénégal</div>
            <div className="fg-link">Conditions d'utilisation</div>
            <div className="fg-link">Politique de confidentialité</div>
            <div className="fg-link">MIABE Hackathon 2026</div>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="footer-bottom-inner">
          <span className="fb-copy">     © 2026 SN-01 ArtistID — MIABE Hackathon   </span>
          <span className="fb-chain"><span className="dot"></span>ArtistID Chain · Nœud actif · Sénégal</span>
        </div>
      </div>
    </>
  );
};

export default Footer;