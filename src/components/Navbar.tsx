import { useState, useEffect, useRef } from 'react';

interface NavbarProps {
  currentPage: string;
  navigateTo: (page: string, artist?: any) => void;
  isLoggedIn: boolean;
  userType: string | null;
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentPage, navigateTo, isLoggedIn, userType, onLogout }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const artistsRef = useRef<HTMLDivElement>(null);
  const oeuvresRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Ferme les dropdowns si on clique ailleurs
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (artistsRef.current && !artistsRef.current.contains(e.target as Node)) {
        setOpenDropdown(prev => prev === 'artists' ? null : prev);
      }
      if (oeuvresRef.current && !oeuvresRef.current.contains(e.target as Node)) {
        setOpenDropdown(prev => prev === 'oeuvres' ? null : prev);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleDropdown = (name: string) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  const nav = (p: string) => {
    navigateTo(p);
    setDrawerOpen(false);
    setOpenDropdown(null);
  };

  return (
    <div className="topbar" style={{ zIndex: 10000 }}>
      <div className="navbar-top">

        {/* Bouton mobile */}
        <button className="mobile-menu-btn" onClick={() => setDrawerOpen(true)} aria-label="Menu">☰</button>

        {/* Logo */}
        <div className="logo" onClick={() => nav('home')}>
          <span className="logo-artist">Artist</span>
          <span className="logo-id">ID</span>
          <span className="logo-tag">BLOCKCHAIN</span>
        </div>

        {/* Barre de recherche */}
        <form className="search-bar" onSubmit={(e) => { e.preventDefault(); nav('artists'); }}>
          <select className="search-cat">
            <option>Artistes</option>
            <option>Œuvres</option>
            <option>Musique</option>
            <option>Photo</option>
          </select>
          <input className="search-input" type="text" placeholder="Rechercher un artiste certifié..." />
          <button type="submit" className="search-btn">Rechercher</button>
        </form>

        {/* Toggle thème */}
        <button
          className="theme-toggle"
          onClick={() => setTheme(t => t === 'light' ? 'dark' : 'light')}
          title="Changer de thème"
        >
          <span className="theme-toggle-icon">{theme === 'dark' ? '☀️' : '🌙'}</span>
          <span style={{ fontSize: 10 }}>{theme === 'dark' ? 'Clair' : 'Sombre'}</span>
        </button>

        {/* Connexion */}
        <div className="nav-actions">
          {!isLoggedIn ? (
            <button className="nav-btn" onClick={() => nav('login')}>
              <span className="nb-top">Bonjour</span>
              <span className="nb-main">Connexion ▾</span>
            </button>
          ) : (
            <button className="nav-btn" onClick={onLogout}>
              <span className="nb-top">Déconnexion</span>
              <span className="nb-main">{userType === 'artist' ? 'Mon Profil' : 'Mon Compte'} ▾</span>
            </button>
          )}
        </div>
      </div>

      {/* Barre de navigation secondaire */}
      <div className="navbar-bottom" style={{ position: 'relative', zIndex: 9999 }}>
        <div className="navbar-bottom-inner" style={{ overflow: 'visible' }}>

          <button
            className={`nb-link ${currentPage === 'home' ? 'active' : ''}`}
            onClick={() => nav('home')}
          >
            Accueil
          </button>

          {/* Dropdown Artistes */}
          <div className="nb-dropdown" ref={artistsRef} style={{ position: 'relative' }}>
            <button
              className={`nb-link ${['artists', 'artist-detail'].includes(currentPage) ? 'active' : ''}`}
              onClick={() => toggleDropdown('artists')}
            >
              Artistes 
              <span className={`nb-dropdown-arrow ${openDropdown === 'artists' ? 'open' : ''}`}>▾</span>
            </button>
            {openDropdown === 'artists' && (
              <div 
                className="nb-dropdown-menu show"
                style={{
                  position: 'absolute',
                  top: '100%',
                  left: 0,
                  zIndex: 99999,
                  backgroundColor: 'var(--card-bg2)',
                  minWidth: '220px',
                  display: 'block',
                  borderRadius: '8px',
                  border: '1px solid var(--border2)',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
                  marginTop: '4px'
                }}
              >
                <button className="nb-dropdown-item" onClick={() => nav('artists')} style={{
                  display: 'block',
                  width: '100%',
                  textAlign: 'left',
                  padding: '12px 16px',
                  fontSize: '13px',
                  cursor: 'pointer',
                  background: 'transparent',
                  border: 'none',
                  borderBottom: '1px solid var(--border)',
                  color: 'var(--text2)'
                }}>
                  Artistes certifiés
                </button>
                <button className="nb-dropdown-item" onClick={() => nav('artists')} style={{
                  display: 'block',
                  width: '100%',
                  textAlign: 'left',
                  padding: '12px 16px',
                  fontSize: '13px',
                  cursor: 'pointer',
                  background: 'transparent',
                  border: 'none',
                  borderBottom: '1px solid var(--border)',
                  color: 'var(--text2)'
                }}>
                  Classement des artistes
                </button>
                <button className="nb-dropdown-item" onClick={() => nav('login')} style={{
                  display: 'block',
                  width: '100%',
                  textAlign: 'left',
                  padding: '12px 16px',
                  fontSize: '13px',
                  cursor: 'pointer',
                  background: 'transparent',
                  border: 'none',
                  color: 'var(--text2)'
                }}>
                  Créer mon profil artiste
                </button>
              </div>
            )}
          </div>

          {/* Dropdown Œuvres */}
          <div className="nb-dropdown" ref={oeuvresRef} style={{ position: 'relative' }}>
            <button
              className={`nb-link ${['oeuvres', 'deposit', 'oeuvre-detail'].includes(currentPage) ? 'active' : ''}`}
              onClick={() => toggleDropdown('oeuvres')}
            >
              Œuvres
              <span className={`nb-dropdown-arrow ${openDropdown === 'oeuvres' ? 'open' : ''}`}>▾</span>
            </button>
            {openDropdown === 'oeuvres' && (
              <div 
                className="nb-dropdown-menu show"
                style={{
                  position: 'absolute',
                  top: '100%',
                  left: 0,
                  zIndex: 99999,
                  backgroundColor: 'var(--card-bg2)',
                  minWidth: '220px',
                  display: 'block',
                  borderRadius: '8px',
                  border: '1px solid var(--border2)',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
                  marginTop: '4px'
                }}
              >
                <button className="nb-dropdown-item" onClick={() => nav('oeuvres')} style={{
                  display: 'block',
                  width: '100%',
                  textAlign: 'left',
                  padding: '12px 16px',
                  fontSize: '13px',
                  cursor: 'pointer',
                  background: 'transparent',
                  border: 'none',
                  borderBottom: '1px solid var(--border)',
                  color: 'var(--text2)'
                }}>
                  Toutes les œuvres
                </button>
                <button className="nb-dropdown-item" onClick={() => nav('oeuvres')} style={{
                  display: 'block',
                  width: '100%',
                  textAlign: 'left',
                  padding: '12px 16px',
                  fontSize: '13px',
                  cursor: 'pointer',
                  background: 'transparent',
                  border: 'none',
                  borderBottom: '1px solid var(--border)',
                  color: 'var(--text2)'
                }}>
                  Œuvres certifiées
                </button>
                <button className="nb-dropdown-item" onClick={() => nav('deposit')} style={{
                  display: 'block',
                  width: '100%',
                  textAlign: 'left',
                  padding: '12px 16px',
                  fontSize: '13px',
                  cursor: 'pointer',
                  background: 'transparent',
                  border: 'none',
                  color: 'var(--text2)'
                }}>
                  Déposer une œuvre
                </button>
              </div>
            )}
          </div>

          <button
            className={`nb-link ${currentPage === 'verify' ? 'active' : ''}`}
            onClick={() => nav('verify')}
          >
            Vérifier un artiste
          </button>

          <button
            className={`nb-link ${currentPage === 'deposit' ? 'active' : ''}`}
            onClick={() => nav('deposit')}
          >
            Déposer une œuvre
          </button>

          <button className="nb-link red" onClick={() => nav('report')}>
            ⚠ Signaler un usurpateur
          </button>

        </div>
      </div>

      {/* Drawer mobile */}
      {drawerOpen && (
        <div className="mobile-drawer open" style={{ zIndex: 20000 }}>
          <div className="drawer-backdrop" onClick={() => setDrawerOpen(false)} />
          <div className="drawer-panel">
            <div className="drawer-header">
              <div className="logo" style={{ fontSize: '24px' }}>
                <span className="logo-artist">Artist</span>
                <span className="logo-id">ID</span>
              </div>
              <button className="drawer-close" onClick={() => setDrawerOpen(false)}>✕</button>
            </div>

            <div className="drawer-section">
              <button className="drawer-item" onClick={() => nav('home')}>🏠 Accueil</button>
              <button className="drawer-item" onClick={() => nav('verify')}>✅ Vérifier un artiste</button>
              <button className="drawer-item" onClick={() => nav('deposit')}>📤 Déposer une œuvre</button>
              <button className="drawer-item" onClick={() => nav('report')}>⚠️ Signaler un usurpateur</button>
            </div>

            <div className="drawer-section">
              <div className="drawer-section-title">Artistes</div>
              <button className="drawer-item" onClick={() => nav('artists')}>
                Tous les artistes certifiés
              </button>
              <button className="drawer-item" onClick={() => nav('artists')}>
                Classement des artistes
              </button>
              <button className="drawer-item" onClick={() => nav('login')}>
                Devenir artiste certifié
              </button>
            </div>

            <div className="drawer-section">
              <div className="drawer-section-title">Œuvres</div>
              <button className="drawer-item" onClick={() => nav('oeuvres')}>
                Explorer les œuvres
              </button>
              <button className="drawer-item" onClick={() => nav('oeuvres')}>
                Œuvres certifiées
              </button>
              <button className="drawer-item" onClick={() => nav('deposit')}>
                Déposer une nouvelle œuvre
              </button>
            </div>

            <div className="drawer-section">
              <div className="drawer-section-title">Mon compte</div>
              {!isLoggedIn ? (
                <button className="drawer-item" onClick={() => nav('login')}>
                  Connexion / Inscription
                </button>
              ) : (
                <button className="drawer-item" onClick={() => { onLogout(); setDrawerOpen(false); }}>
                  Déconnexion
                </button>
              )}
            </div>

            <div style={{ padding: 16 }}>
              <button
                onClick={() => setTheme(t => t === 'light' ? 'dark' : 'light')}
                style={{
                  width: '100%',
                  padding: 10,
                  borderRadius: 6,
                  border: '1px solid var(--border2)',
                  background: 'var(--card-bg2)',
                  color: 'var(--text2)',
                  cursor: 'pointer',
                  fontSize: 13
                }}
              >
                {theme === 'light' ? '🌙 Mode sombre' : '☀️ Mode clair'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;