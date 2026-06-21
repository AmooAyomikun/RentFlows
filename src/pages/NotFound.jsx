import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, ArrowLeft } from 'lucide-react';
import Button from '../components/ui/Button';
import { LogoMark } from '../components/layout/Navbar';

const NotFound = () => (
  <div className="min-h-screen bg-gradient-warm flex flex-col items-center justify-center px-6 text-center">
    <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <Link to="/" className="flex items-center gap-2.5 justify-center mb-10" aria-label="RentFlow home">
        <LogoMark />
        <span className="font-display font-bold text-xl text-white">RentFlow</span>
      </Link>

      {/* 404 visual */}
      <div className="font-mono font-bold text-white/20 select-none mb-8" style={{ fontSize: 'clamp(100px, 20vw, 180px)', letterSpacing: '-0.05em', lineHeight: 1 }} aria-hidden="true">
        404
      </div>

      <h1 className="font-display text-white text-3xl mb-3">Page not found.</h1>
      <p className="text-white/60 mb-8 max-w-sm mx-auto">
        The page you're looking for has moved, been deleted, or never existed. Let's get you back on track.
      </p>

      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Button size="lg" variant="accent" leftIcon={<Home size={16} />} onClick={() => window.location.href = '/'}>
          Go to homepage
        </Button>
        <Button size="lg" className="border-white/30 text-white bg-white/10 hover:bg-white/20" leftIcon={<ArrowLeft size={16} />} onClick={() => window.history.back()}>
          Go back
        </Button>
      </div>
    </motion.div>
  </div>
);

export default NotFound;
