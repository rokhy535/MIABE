import React, { useState } from 'react';
import ArtistCard from '../components/ArtistCard';

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
  category: string;
}

interface ArtistsProps {
  navigateTo: (page: string, artist?: Artist) => void;
}

const allArtists: Artist[] = [
  { id: 1, initials: 'YN', name: "Youssou N'Dour", type: 'MUSICIEN', certified: true, oeuvres: 148, fans: 4200, fcfas: 12500000, rank: 1, avatarColor: 'blue', category: 'musique' },
  { id: 2, initials: 'OW', name: 'Omar Waly Kouyaté', type: 'PHOTOGRAPHE', certified: true, oeuvres: 312, fans: 890, fcfas: 2100000, rank: 2, avatarColor: 'red', category: 'photo' },
  { id: 3, initials: 'AB', name: 'Aïcha Bâ', type: 'VIDÉASTE', certified: true, oeuvres: 27, fans: 1400, fcfas: 4800000, rank: 3, avatarColor: 'gold', category: 'video' },
  { id: 4, initials: 'MD', name: 'Moussa Dramé', type: 'MUSICIEN · GRIOT', certified: true, oeuvres: 89, fans: 2300, fcfas: 3200000, rank: 4, avatarColor: 'blue', category: 'musique' },
  { id: 5, initials: 'FK', name: 'Fatou Kebe', type: 'ARTS VISUELS', certified: false, oeuvres: 54, fans: 340, fcfas: 780000, rank: 5, avatarColor: 'red', category: 'art' },
  { id: 6, initials: 'SC', name: 'Samba Cissé', type: 'PHOTOGRAPHE', certified: false, oeuvres: 203, fans: 610, fcfas: 1100000, rank: 6, avatarColor: 'gold', category: 'photo' },
  { id: 7, initials: 'AM', name: 'Alioune Mbaye', type: 'MUSICIEN', certified: true, oeuvres: 61, fans: 1800, fcfas: 5600000, rank: 7, avatarColor: 'blue', category: 'musique' },
  { id: 8, initials: 'KS', name: 'Khady Sow', type: 'ARTS VISUELS', certified: true, oeuvres: 95, fans: 720, fcfas: 900000, rank: 8, avatarColor: 'red', category: 'art' },
];

const categories = [
  { id: 'all', label: 'Tous' },
  { id: 'musique', label: 'Musiciens' },
  { id: 'photo', label: 'Photographes' },
  { id: 'video', label: 'Vidéastes' },
  { id: 'art', label: 'Arts visuels' },
];

const Artists: React.FC<ArtistsProps> = ({ navigateTo }) => {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredArtists = activeCategory === 'all'
    ? allArtists
    : allArtists.filter(a => a.category === activeCategory);

  return (
    <div className="section">
      <div className="section-header">
        <div className="section-title">Tous les artistes <span>certifiés</span></div>
        <button className="btn-primary small" onClick={() => navigateTo('login')}>+ Enregistrer mon profil</button>
      </div>

      <div className="category-filters">
        {categories.map(cat => (
          <button
            key={cat.id}
            className={`filter-btn ${activeCategory === cat.id ? 'active' : ''}`}
            onClick={() => setActiveCategory(cat.id)}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div className="artists-grid">
        {filteredArtists.map(artist => (
          <ArtistCard key={artist.id} artist={artist} onClick={() => navigateTo('artist-detail', artist)} />
        ))}
      </div>
    </div>
  );
};

export default Artists;