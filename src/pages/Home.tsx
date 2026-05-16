// Home.tsx mis à jour
import React from 'react';
import ParticlesBackground from '../components/ParticlesBackground';
import ArtistCard from '../components/ArtistCard';
import OeuvreCard from '../components/OeuvreCard';
import HowCard from '../components/HowCard';

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
}

interface Oeuvre {
  id: number;
  title: string;
  artist: string;
  date: string;
  type: string;
  certified: boolean;
  gradient: string;
}

interface HowData {
  num: string;
  title: string;
  desc: string;
  chain: string;
}

interface HomeProps {
  navigateTo: (page: string, artist?: Artist) => void;
  showToast: (msg: string) => void;
}

const artistsData: Artist[] = [
  { id: 1, initials: 'YN', name: "Youssou N'Dour", type: 'MUSICIEN', certified: true, oeuvres: 148, fans: 4200, fcfas: 12500000, rank: 1, avatarColor: 'blue' },
  { id: 2, initials: 'OW', name: 'Omar Waly Kouyaté', type: 'PHOTOGRAPHE', certified: true, oeuvres: 312, fans: 890, fcfas: 2100000, rank: 2, avatarColor: 'red' },
  { id: 3, initials: 'AB', name: 'Aïcha Bâ', type: 'VIDÉASTE · CINÉMA', certified: true, oeuvres: 27, fans: 1400, fcfas: 4800000, rank: 3, avatarColor: 'gold' },
  { id: 4, initials: 'MD', name: 'Moussa Dramé', type: 'MUSICIEN · GRIOT', certified: true, oeuvres: 89, fans: 2300, fcfas: 3200000, rank: 4, avatarColor: 'blue' },
  { id: 5, initials: 'FK', name: 'Fatou Kebe', type: 'ARTS VISUELS', certified: false, oeuvres: 54, fans: 340, fcfas: 780000, rank: 5, avatarColor: 'red' },
  { id: 6, initials: 'SC', name: 'Samba Cissé', type: 'PHOTOGRAPHE', certified: false, oeuvres: 203, fans: 610, fcfas: 1100000, rank: 6, avatarColor: 'gold' },
];

const oeuvresData: Oeuvre[] = [
  { id: 1, title: 'Set du Djembé Royal', artist: 'Moussa Dramé', date: '2026-05-10', type: 'music', certified: true, gradient: '#0a1628,#1a3a6b' },
  { id: 2, title: 'Teranga — Documentaire', artist: 'Aïcha Bâ', date: '2026-05-08', type: 'film', certified: true, gradient: '#1a0a0a,#5a1a0a' },
  { id: 3, title: 'Dakar 2030 — Série', artist: 'Omar Waly Kouyaté', date: '2026-05-07', type: 'photo', certified: true, gradient: '#0a1a0a,#1a4a1a' },
  { id: 4, title: 'Masques du Casamance', artist: 'Fatou Kebe', date: '2026-05-06', type: 'art', certified: true, gradient: '#1a1a0a,#4a3a0a' },
];

const howData: HowData[] = [
  { num: '01', title: 'Créez votre profil certifié', desc: 'Enregistrez votre identité artistique sur la blockchain. Votre signature cryptographique est unique et infalsifiable.', chain: 'BLOCKCHAIN' },
  { num: '02', title: 'Déposez vos oeuvres', desc: "Chaque oeuvre reçoit un horodatage cryptographique. C'est une preuve légale d'antériorité reconnue dans plusieurs juridictions.", chain: 'HASH + DATE' },
  { num: '03', title: 'Les fans vérifient', desc: "Un QR code ou un hash permet à n'importe qui de vérifier instantanément s'il interagit avec le vrai artiste ou un usurpateur.", chain: 'QR VERIFY' },
  { num: '04', title: 'Recevez les soutiens', desc: 'Les dons des fans arrivent directement sur votre profil certifié, sans intermédiaire. Chaque transaction est traçable.', chain: 'DIRECT' },
];

const Home: React.FC<HomeProps> = ({ navigateTo, showToast }) => {
  const featuredArtist = artistsData[0];

  return (
    <div>
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-glow-1"></div>
        <div className="hero-glow-2"></div>
        <ParticlesBackground />
        <div className="hero-content">
          <div className="hero-left">
            <p className="hero-label"> Chaque œuvre a son véritable créateur !  </p>
            <h1 className="hero-title">
              <span className="t-blue">Artist</span><span className="t-red">ID</span>
            </h1>
            <div className="hero-divider"></div>
            <p className="hero-desc">
              L'identité artistique blockchain certifiée pour les 30 000 artistes sénégalais. Protégez vos oeuvres, prouvez votre authenticité, recevez le soutien direct de vos fans.
            </p>
            <div className="hero-ctas">
              <button className="btn-primary" onClick={() => navigateTo('login')}>
                Créer mon profil certifié <span style={{ color: '#f87171' }}>→</span>
              </button>
              <button className="btn-secondary" onClick={() => navigateTo('verify')}>Vérifier un artiste</button>
            </div>
            <div className="hero-security">
              <div className="security-badge">
                <span className="blink-dot blue"></span>
                Sécurisé par la blockchain
                <span className="blink-dot red"></span>
              </div>
              <div className="hero-hackathon">MIABE Hackathon 2026 · SN-01 ArtistID</div>
            </div>
          </div>
          <div className="hero-right">
            <div className="hero-card">
              <div className="hc-label"><span className="dot"></span>Profil certifié en direct</div>
              <div className="hc-artist">
                <div className={`hc-avatar ${featuredArtist.avatarColor === 'red' ? 'red' : featuredArtist.avatarColor === 'gold' ? 'gold' : ''}`}>
                  {featuredArtist.initials}
                </div>
                <div className="hc-info">
                  <div className="hc-name">{featuredArtist.name}</div>
                  <div className="hc-type">Musicien · Dakar</div>
                </div>
                <div className="hc-verified"><span className="dot-blue"></span>CERTIFIÉ</div>
              </div>
              <div className="hc-stat-row">
                <div className="hc-stat"><div className="val">{featuredArtist.oeuvres}</div><div className="lbl">Oeuvres</div></div>
                <div className="hc-stat"><div className="val">{featuredArtist.fans}</div><div className="lbl">Fans</div></div>
                <div className="hc-stat"><div className="val">12.5M</div><div className="lbl">FCFA reçus</div></div>
              </div>
              <div className="hc-hash">
                <span className="hash-label">Hash blockchain :</span>
                <span className="hash-val">0x7f4a9c3e1b2d8f5...</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="stats-bar">
        <div className="stats-inner">
          <div className="stat-item"><div><div className="stat-num">30<span>k+</span></div><div className="stat-desc">artistes actifs au Sénégal à protéger</div></div></div>
          <div className="stat-item"><div><div className="stat-num">70<span>%</span></div><div className="stat-desc">ont subi un vol d'identité artistique</div></div></div>
          <div className="stat-item"><div><div className="stat-num">15M<span>+</span></div><div className="stat-desc">FCFA escroqués aux fans en 2022</div></div></div>
          <div className="stat-item"><div><div className="stat-num">1B<span>$</span></div><div className="stat-desc">marché musical africain d'ici 2030</div></div></div>
          <div className="stat-item"><div><div className="stat-num">&lt;5k</div><div className="stat-desc">artistes enregistrés au BSDA seulement</div></div></div>
        </div>
      </div>

      {/* Alerte Usurpation */}
      <div className="promo-bar">
        <span className="promo-icon">⚠</span>
        <span className="promo-text">
          <strong>Alerte usurpation détectée :</strong> Des comptes Facebook imitant des artistes certifiés ont été signalés cette semaine. Vérifiez toujours le badge blockchain avant d'acheter un billet ou d'envoyer un soutien.
        </span>
        <button className="promo-cta" onClick={() => navigateTo('verify')}>Vérifier maintenant</button>
      </div>

      {/* Section: Proposition de valeur - Les 3 piliers */}
      <div className="section pillars-section">
        <div className="section-header text-center">
          <div className="section-badge">Notre proposition de valeur</div>
          <div className="section-title">Protéger, <span>Prouver</span>, <span className="t-red">Connecter</span></div>
          <div className="section-subtitle">Trois piliers pour révolutionner la protection des artistes</div>
        </div>
        <div className="pillars-grid">
          <div className="pillar-card">
            <div className="pillar-icon"></div>
            <div className="pillar-title">Protéger</div>
            <div className="pillar-desc">Une identité blockchain infalsifiable pour chaque artiste. Votre profil cryptographique est unique, immuable et contrôlé uniquement par vous.</div>
            <div className="pillar-feature">✓ Signature cryptographique unique</div>
            <div className="pillar-feature">✓ Contrôle total de vos données</div>
            <div className="pillar-feature">✓ Protection anti-usurpation</div>
          </div>
          <div className="pillar-card">
            <div className="pillar-icon"></div>
            <div className="pillar-title">Prouver</div>
            <div className="pillar-desc">Une preuve légale d'antériorité horodatée pour chaque œuvre. La blockchain atteste de la date exacte de création.</div>
            <div className="pillar-feature">✓ Horodatage certifié</div>
            <div className="pillar-feature">✓ Preuve reconnue juridiquement</div>
            <div className="pillar-feature">✓ Protection contre le vol de droits</div>
          </div>
          <div className="pillar-card">
            <div className="pillar-icon"></div>
            <div className="pillar-title">Connecter</div>
            <div className="pillar-desc">Un lien direct, authentique et financier entre l'artiste et ses fans. Plus d'intermédiaires, plus de confiance.</div>
            <div className="pillar-feature">✓ Soutien direct sans commission</div>
            <div className="pillar-feature">✓ Vérification instantanée par QR</div>
            <div className="pillar-feature">✓ Relation authentique artiste-fan</div>
          </div>
        </div>
      </div>

      {/* Section: Pourquoi maintenant */}
      <div className="section why-now-section">
        <div className="why-now-container">
          <div className="why-now-content">
            <div className="section-badge">Le moment est venu</div>
            <div className="section-title">Pourquoi <span>maintenant</span> ?</div>
            <div className="why-now-text">
              <p>Le marché de la musique africaine pourrait atteindre environ <strong>1 milliard de dollars</strong> d'ici 2030 selon les projections de l'industrie — pourtant les artistes du continent, dont au Sénégal, n'en captent qu'une infime part, notamment <strong>faute de protection d'identité et de droits numériques</strong>.</p>
              <p className="highlight">ArtistID vise à inverser cette tendance.</p>
            </div>
            <div className="why-now-stats">
              <div className="stat-compact">
                <span className="value">+200%</span>
                <span className="label">Croissance du streaming musical africain</span>
              </div>
              <div className="stat-compact">
                <span className="value">&lt;15%</span>
                <span className="label">Des revenus numériques captés par les artistes locaux</span>
              </div>
            </div>
          </div>
          <div className="why-now-visual">
            <div className="growth-chart">
              <div className="chart-bar" style={{ height: '30%' }}><span>Aujourd'hui</span></div>
              <div className="chart-bar" style={{ height: '70%' }}><span>2030</span></div>
            </div>
          </div>
        </div>
      </div>

     

      {/* Section: La solution ArtistID */}
      <div className="section solution-section">
        <div className="section-header text-center">
          <div className="section-badge">Notre réponse</div>
          <div className="section-title">La solution <span>ArtistID</span></div>
          <div className="section-subtitle">Quatre fonctions clés · Vision : le premier registre d'identité artistique certifié sur blockchain au Sénégal</div>
        </div>
        <div className="solution-grid">
          <div className="solution-card">
            <div className="solution-icon"></div>
            <div className="solution-title">Identité certifiée</div>
            <div className="solution-desc">Profil public horodaté, signé cryptographiquement sur Polygon — lié à une clé privée que seul l'artiste contrôle.</div>
          </div>
          <div className="solution-card">
            <div className="solution-icon"></div>
            <div className="solution-title">Preuve d'antériorité</div>
            <div className="solution-desc">Empreinte SHA-256 du fichier, enregistrée on-chain avec date et heure — base de contestation en cas de revendication tierce.</div>
          </div>
          <div className="solution-card">
            <div className="solution-icon"></div>
            <div className="solution-title">Vérification par QR</div>
            <div className="solution-desc">QR unique lié à l'adresse blockchain : en quelques secondes, le fan sait si le profil ou le vendeur est certifié.</div>
          </div>
          <div className="solution-card">
            <div className="solution-icon"></div>
            <div className="solution-title">Soutien direct</div>
            <div className="solution-desc">Smart contracts : dons vers le wallet de l'artiste, sans intermédiaire qui bloque ou prélève abusivement.</div>
          </div>
        </div>
      </div>

      {/* Artistes certifiés */}
      <div className="section">
        <div className="section-header">
          <div className="section-title">Artistes <span>certifiés</span> — Les mieux soutenus</div>
          <span className="section-link" onClick={() => navigateTo('artists')}>Voir tous les artistes →</span>
        </div>
        <div className="artists-grid">
          {artistsData.map(artist => (
            <ArtistCard key={artist.id} artist={artist} onClick={() => navigateTo('artist-detail', artist)} />
          ))}
        </div>
      </div>

      {/* Oeuvres récentes */}
      <div className="section">
        <div className="section-header">
          <div className="section-title">Oeuvres <span>récemment déposées</span></div>
          <span className="section-link" onClick={() => navigateTo('oeuvres')}>Voir toutes →</span>
        </div>
        <div className="oeuvres-grid">
          {oeuvresData.map(oeuvre => (
            <OeuvreCard key={oeuvre.id} oeuvre={oeuvre} navigateTo={navigateTo} showToast={showToast} />
          ))}
        </div>
      </div>

      {/* Comment ça marche */}
      <div className="section">
        <div className="section-header">
          <div className="section-title">Comment <span>ArtistID</span> protège les artistes</div>
        </div>
        <div className="how-grid">
          {howData.map(how => (
            <HowCard key={how.num} data={how} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;