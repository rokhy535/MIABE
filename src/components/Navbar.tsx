import React, { useState } from 'react';

interface NavbarProps {
  currentPage: string;
  navigateTo: (page: string, artist?: any) => void;
  isLoggedIn: boolean;
  userType: string | null;
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentPage, navigateTo, isLoggedIn, userType, onLogout }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchCategory, setSearchCategory] = useState('Artistes');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigateTo('artists');
    }
  };

  return (
    <div className="topbar">
      <div className="navbar-top">
        <div className="logo" onClick={() => navigateTo('home')}>
          <span className="logo-artist">Artist</span>
          <span className="logo-id">ID</span>
          <span className="logo-tag">BLOCKCHAIN</span>
        </div>

        <div className="location-info">
          <span className="location-label">Localisation</span>
          <span className="location-value">Sénégal · Dakar</span>
        </div>

        <form className="search-bar" onSubmit={handleSearch}>
          <select className="search-cat" value={searchCategory} onChange={(e) => setSearchCategory(e.target.value)}>
            <option>Artistes</option>
            <option>Oeuvres</option>
            <option>Musique</option>
            <option>Photographie</option>
            <option>Cinéma</option>
          </select>
          <input
            className="search-input"
            type="text"
            placeholder="Rechercher un artiste certifié, une oeuvre déposée..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit" className="search-btn">Rechercher</button>
        </form>

        <div className="nav-actions">
          {!isLoggedIn ? (
            <button className="nav-btn" onClick={() => navigateTo('login')}>
              <div className="nb-top">Bonjour, connectez-vous</div>
              <div className="nb-main">Compte &amp; Profil ▾</div>
            </button>
          ) : (
            <button className="nav-btn" onClick={onLogout}>
              <div className="nb-top">Déconnexion</div>
              <div className="nb-main">{userType === 'artist' ? 'Mon Profil' : 'Mon Compte'} ▾</div>
            </button>
          )}
          <button className="nav-btn" onClick={() => navigateTo('deposit')}>
            <div className="nb-top">Déposer</div>
            <div className="nb-main">Oeuvre</div>
          </button>
          <button className="nav-btn" onClick={() => navigateTo('verify')}>
            <div className="nb-top">Vérifier</div>
            <div className="nb-main">Identité</div>
          </button>
          <button className="nav-btn" onClick={() => navigateTo('home')}>
            <div className="nb-top">Soutiens</div>
            <div className="nb-main">directs <span className="nav-badge">3</span></div>
          </button>
        </div>
      </div>

      <div className="navbar-bottom">
        <div className="navbar-bottom-inner">
          <button className={`nb-link ${currentPage === 'home' ? 'active' : ''}`} onClick={() => navigateTo('home')}>Accueil</button>
          <button className={`nb-link ${currentPage === 'artists' ? 'active' : ''}`} onClick={() => navigateTo('artists')}>Artistes certifiés</button>
          <button className={`nb-link ${currentPage === 'oeuvres' ? 'active' : ''}`} onClick={() => navigateTo('oeuvres')}>Oeuvres déposées</button>
          <button className={`nb-link ${currentPage === 'deposit' ? 'active' : ''}`} onClick={() => navigateTo('deposit')}>Déposer une oeuvre</button>
          <button className={`nb-link ${currentPage === 'verify' ? 'active' : ''}`} onClick={() => navigateTo('verify')}>Vérifier un artiste</button>
          <button className={`nb-link ${currentPage === 'login' ? 'active' : ''}`} onClick={() => navigateTo('login')}>Créer mon profil</button>
          <button className="nb-link" onClick={() => navigateTo('artists')}>Meilleures ventes</button>
          <button className="nb-link red">⚠ Signaler un usurpateur</button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;