import React from 'react';
import { motion } from 'framer-motion';

interface HowData {
  num: string;
  title: string;
  desc: string;
  chain: string;
}

interface HowCardProps {
  data: HowData;
}

const HowCard: React.FC<HowCardProps> = ({ data }) => {
  return (
    <motion.div
      className="how-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="how-num">{data.num}</div>
      <div className="how-title">{data.title}</div>
      <div className="how-desc">{data.desc}</div>
      <div className="how-chain">{data.chain}</div>
    </motion.div>
  );
};

export default HowCard;