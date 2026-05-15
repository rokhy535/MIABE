import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Artists from './pages/Artists';
import Oeuvres from './pages/Oeuvres';
import ArtistDetail from './pages/ArtistDetail';
import Deposit from './pages/Deposit';
import Verify from './pages/Verify';
import Login from './pages/Login';
import Toast from './components/Toast';
import './styles/global.css';

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
  category?: string;
  bio?: string;
  hash?: string;
  certifiedDate?: string;
  tags?: string[];
}

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [toast, setToast] = useState({ message: '', show: false });
  const [selectedArtist, setSelectedArtist] = useState<Artist | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToast({ message, show: true });
    setTimeout(() => setToast({ message: '', show: false }), 3000);
  };

  const navigateTo = (page: string, artist: Artist | null = null) => {
    if (artist) setSelectedArtist(artist);
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const handleLogin = (type: string) => {
    setIsLoggedIn(true);
    setUserType(type);
    showToast(`Bienvenue${type === 'artist' ? ' artiste' : ' fan'} !`);
    navigateTo('home', null);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserType(null);
    showToast('Déconnexion réussie');
    navigateTo('home', null);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home navigateTo={navigateTo} showToast={showToast} />;
      case 'artists':
        return <Artists navigateTo={navigateTo} />;
      case 'oeuvres':
        return <Oeuvres navigateTo={navigateTo} showToast={showToast} />;
      case 'artist-detail':
        return <ArtistDetail artist={selectedArtist} navigateTo={navigateTo} showToast={showToast} isLoggedIn={isLoggedIn} />;
      case 'deposit':
        return <Deposit navigateTo={navigateTo} showToast={showToast} isLoggedIn={isLoggedIn} userType={userType} />;
      case 'verify':
        return <Verify navigateTo={navigateTo} showToast={showToast} />;
      case 'login':
        return <Login navigateTo={navigateTo} showToast={showToast} onLogin={handleLogin} />;
      default:
        return <Home navigateTo={navigateTo} showToast={showToast} />;
    }
  };

  return (
    <div className="app">
      <Navbar
        currentPage={currentPage}
        navigateTo={navigateTo}
        isLoggedIn={isLoggedIn}
        userType={userType}
        onLogout={handleLogout}
      />
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPage}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.25 }}
        >
          {renderPage()}
        </motion.div>
      </AnimatePresence>
      <Footer navigateTo={navigateTo} />
      <Toast message={toast.message} show={toast.show} />
    </div>
  );
};

export default App;