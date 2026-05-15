import React from 'react';
import { motion } from 'framer-motion';

interface Oeuvre {
  id: number;
  title: string;
  artist: string;
  date: string;
  type: string;
  certified: boolean;
  gradient: string;
}

interface OeuvreCardProps {
  oeuvre: Oeuvre;
  navigateTo: (page: string, artist?: any) => void;
  showToast: (msg: string) => void;
}

const typeConfig: Record<string, { label: string; className: string; icon: string }> = {
  music: { label: 'MUSIQUE', className: 'music', icon: '♪' },
  film: { label: 'CINÉMA', className: 'film', icon: '◉' },
  photo: { label: 'PHOTO', className: 'photo', icon: '◈' },
  art: { label: 'ART VISUEL', className: 'art', icon: '✦' },
};

const OeuvreCard: React.FC<OeuvreCardProps> = ({ oeuvre, navigateTo, showToast }) => {
  const config = typeConfig[oeuvre.type] || typeConfig.music;
  const [grad1, grad2] = oeuvre.gradient.split(',');
  const gradientStyle = {
    background: `linear-gradient(135deg, ${grad1}, ${grad2})`
  };

  const handleSupport = (e: React.MouseEvent) => {
    e.stopPropagation();
    showToast('Soutien envoyé ! Merci de votre générosité.');
  };

  const handleVerify = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigateTo('verify');
  };

  return (
    <motion.div
      className="oeuvre-card"
      whileHover={{ y: -2, transition: { duration: 0.2 } }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="oc-thumb" style={gradientStyle}>
        <div className="oc-thumb-inner">{config.icon}</div>
        <span className={`oc-type-badge ${config.className}`}>{config.label}</span>
        {oeuvre.certified && <span className="oc-certified">✓ CERTIFIÉ</span>}
      </div>
      <div className="oc-info">
        <div className="oc-title">{oeuvre.title}</div>
        <div className="oc-artist">{oeuvre.artist}</div>
        <div className="oc-meta">
          <span className="oc-date">{oeuvre.date}</span>
          <div className="oc-actions">
            <button className="oc-btn" onClick={handleVerify}>Vérifier</button>
            <button className="oc-btn support" onClick={handleSupport}>♥ Soutenir</button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default OeuvreCard;