import React from 'react';
import { motion } from 'framer-motion';

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

interface ArtistCardProps {
  artist: Artist;
  onClick: () => void;
}

const ArtistCard: React.FC<ArtistCardProps> = ({ artist, onClick }) => {
  const formatFCFA = (amount: number) => {
    if (amount >= 1000000) return `${(amount / 1000000).toFixed(1)}M`;
    if (amount >= 1000) return `${(amount / 1000).toFixed(0)}k`;
    return amount.toString();
  };

  return (
    <motion.div
      className="artist-card"
      onClick={onClick}
      whileHover={{ y: -2, transition: { duration: 0.2 } }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <span className="ac-rank">#{artist.rank}</span>
      <div className={`ac-avatar ${artist.avatarColor === 'red' ? 'red' : artist.avatarColor === 'gold' ? 'gold' : ''}`}>
        {artist.initials}
      </div>
      <div className="ac-name">{artist.name}</div>
      <div className="ac-type">{artist.type}</div>
      <div className={`ac-badge ${artist.certified ? 'verified' : 'pending'}`}>
        {artist.certified ? '● CERTIFIÉ BLOCKCHAIN' : '◌ VÉRIFICATION EN COURS'}
      </div>
      <div className="ac-stats">
        <div className="ac-stat"><div className="v">{artist.oeuvres}</div><div className="l">Oeuvres</div></div>
        <div className="ac-stat"><div className="v">{artist.fans}</div><div className="l">Fans</div></div>
        <div className="ac-stat"><div className="v">{formatFCFA(artist.fcfas)}</div><div className="l">FCFA</div></div>
      </div>
    </motion.div>
  );
};

export default ArtistCard;