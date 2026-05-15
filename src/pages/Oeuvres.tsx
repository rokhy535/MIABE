import React from 'react';
import OeuvreCard from '../components/OeuvreCard';

interface Oeuvre {
  id: number;
  title: string;
  artist: string;
  date: string;
  type: string;
  certified: boolean;
  gradient: string;
}

interface OeuvresProps {
  navigateTo: (page: string, artist?: any) => void;
  showToast: (msg: string) => void;
}

const oeuvresData: Oeuvre[] = [
  { id: 1, title: 'Set du Djembé Royal', artist: 'Moussa Dramé', date: '2026-05-10', type: 'music', certified: true, gradient: '#0a1628,#1a3a6b' },
  { id: 2, title: 'Teranga — Documentaire', artist: 'Aïcha Bâ', date: '2026-05-08', type: 'film', certified: true, gradient: '#1a0a0a,#5a1a0a' },
  { id: 3, title: 'Dakar 2030 — Série', artist: 'Omar Waly Kouyaté', date: '2026-05-07', type: 'photo', certified: true, gradient: '#0a1a0a,#1a4a1a' },
  { id: 4, title: 'Masques du Casamance', artist: 'Fatou Kebe', date: '2026-05-06', type: 'art', certified: true, gradient: '#1a1a0a,#4a3a0a' },
  { id: 5, title: '7 Secondes — Remix', artist: "Youssou N'Dour", date: '2026-05-04', type: 'music', certified: true, gradient: '#0f0a1a,#2a1a5a' },
  { id: 6, title: 'Mbour, lumière d\'or', artist: 'Alioune Mbaye', date: '2026-05-02', type: 'film', certified: true, gradient: '#0a1a1a,#0a3a3a' },
];

const Oeuvres: React.FC<OeuvresProps> = ({ navigateTo, showToast }) => {
  return (
    <div className="section">
      <div className="section-header">
        <div className="section-title">Oeuvres <span>déposées et certifiées</span></div>
        <button className="btn-primary small" onClick={() => navigateTo('deposit')}>+ Déposer une oeuvre</button>
      </div>
      <div className="oeuvres-grid">
        {oeuvresData.map(oeuvre => (
          <OeuvreCard key={oeuvre.id} oeuvre={oeuvre} navigateTo={navigateTo} showToast={showToast} />
        ))}
      </div>
    </div>
  );
};

export default Oeuvres;