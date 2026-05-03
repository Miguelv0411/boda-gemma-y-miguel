import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  MapPin,
  Church,
  Utensils,
  Gift,
  CreditCard,
  Menu,
  X,
  Check,
  Users,
  LogOut,
  Lock,
  Sparkles,
  ArrowRight,
  MessageSquare,
  Send,
  Loader2,
  Lightbulb,
  Calendar,
  Clock,
  Music,
  Wine,
  Bus,
  Car,
  Bed,
  Home,
  UtensilsCrossed,
  Phone,
  Globe,
  Coffee,
  PenTool,
  Mail,
  Database,
  Cloud,
  FileSpreadsheet,
  ExternalLink,
  RefreshCw,
} from 'lucide-react';

// --- CONFIGURACIÓN GOOGLE SHEETS ---
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxi7cLkUVTmsICd5cskyth3OSeaJ5T25nIE-y9p8nLZu54wjDMAgbBylUXbd5g0zwnWEg/exec';

// --- UTILS y HOOKS ---

const useScrollAnimation = () => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => setIsVisible(entry.isIntersecting));
      },
      { threshold: 0.1 }
    );

    const currentRef = domRef.current;
    if (currentRef) observer.observe(currentRef);
    return () => currentRef && observer.unobserve(currentRef);
  }, []);

  return [domRef, isVisible];
};

const FadeInSection = ({ children, className = '', delay = '0' }) => {
  const [ref, isVisible] = useScrollAnimation();
  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

// Efecto de pájaros volando
const FlyingBirds = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 14 }}>
      <style>{`
        @keyframes flyAcross {
          0% { left: -10%; top: 30%; transform: scale(0.8) rotate(10deg); opacity: 0; }
          5% { opacity: 0.9; }
          95% { opacity: 0.9; }
          100% { left: 110%; top: 15%; transform: scale(0.6) rotate(0deg); opacity: 0; }
        }
        @keyframes flyFlap {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .anim-bird-container {
          position: absolute;
          animation: flyAcross 16s linear 1;
          animation-delay: 1s;
          animation-fill-mode: both;
        }
        .anim-bird-flap {
          animation: flyFlap 2.5s ease-in-out infinite;
        }
      `}</style>
      <div className="anim-bird-container">
        <div className="anim-bird-flap flex items-start gap-3 text-stone-800">
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-12 h-12 opacity-80 drop-shadow-md">
            <path d="M2 12C5.5 9 9 9 12 12C15 9 18.5 9 22 12C19.5 9 15 9 12 10.5C9 9 4.5 9 2 12Z" />
          </svg>
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 opacity-60 mt-6 -ml-2 drop-shadow-md">
            <path d="M2 12C5.5 9 9 9 12 12C15 9 18.5 9 22 12C19.5 9 15 9 12 10.5C9 9 4.5 9 2 12Z" />
          </svg>
        </div>
      </div>
    </div>
  );
};

// Componente de los gatos paseando
const CatSVG = ({ className }) => (
  <svg viewBox="0 0 100 60" className={`overflow-visible ${className}`} fill="currentColor">
    <path d="M 20 30 Q 8 30 10 10 Q 15 5 20 15" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
    <rect x="18" y="25" width="40" height="20" rx="10" />
    <circle cx="62" cy="20" r="12" />
    <polygon points="53,12 56,2 62,9" />
    <polygon points="62,9 68,2 73,12" />
    <rect x="22" y="40" width="4" height="14" rx="2" className="cat-leg-1" style={{ transformOrigin: '24px 40px' }} />
    <rect x="32" y="40" width="4" height="14" rx="2" className="cat-leg-2" style={{ transformOrigin: '34px 40px' }} />
    <rect x="44" y="40" width="4" height="14" rx="2" className="cat-leg-3" style={{ transformOrigin: '46px 40px' }} />
    <rect x="54" y="40" width="4" height="14" rx="2" className="cat-leg-4" style={{ transformOrigin: '56px 40px' }} />
  </svg>
);

const WalkingCats = () => {
  return (
    <div className="w-full relative h-12 md:h-16 overflow-hidden bg-transparent opacity-80" style={{ zIndex: 15 }}>
      <style>{`
        @keyframes walkAcrossScreen {
          0% { transform: translateX(-15vw); }
          100% { transform: translateX(115vw); }
        }
        @keyframes legSwing1 {
          0% { transform: rotate(25deg); }
          50% { transform: rotate(-25deg); }
          100% { transform: rotate(25deg); }
        }
        @keyframes legSwing2 {
          0% { transform: rotate(-25deg); }
          50% { transform: rotate(25deg); }
          100% { transform: rotate(-25deg); }
        }
        @keyframes catBounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-2px); }
        }
        .cats-container {
          position: absolute;
          bottom: 0px;
          display: flex;
          align-items: flex-end;
          gap: 12px;
          animation: walkAcrossScreen 35s linear infinite;
        }
        .cat-bounce {
          animation: catBounce 0.8s ease-in-out infinite;
        }
        .cat-bounce-delayed {
          animation: catBounce 0.8s ease-in-out infinite;
          animation-delay: 0.4s;
        }
        .cat-leg-1 { animation: legSwing1 0.8s infinite; }
        .cat-leg-2 { animation: legSwing2 0.8s infinite; }
        .cat-leg-3 { animation: legSwing2 0.8s infinite; }
        .cat-leg-4 { animation: legSwing1 0.8s infinite; }
      `}</style>
      <div className="cats-container">
        <div className="cat-bounce">
          <CatSVG className="w-14 h-10 md:w-16 md:h-12 text-amber-500" />
        </div>
        <div className="cat-bounce-delayed pb-0.5">
          <CatSVG className="w-12 h-8 md:w-14 md:h-10 text-amber-600 -ml-2" />
        </div>
      </div>
    </div>
  );
};

// Efecto de hojas cayendo
const FallingLeaves = () => {
  const leaves = useMemo(() => [
    { id: 0, startLeft: '20%', startTop: '-20%', endLeft: '30%', endTop: '120%', delay: 0.5, dur: 18, sway: 6, size: 45, rot: -20 },
    { id: 1, startLeft: '-10%', startTop: '15%', endLeft: '40%', endTop: '120%', delay: 2.0, dur: 20, sway: 5, size: 52, rot: 15 },
    { id: 2, startLeft: '80%', startTop: '-20%', endLeft: '60%', endTop: '120%', delay: 3.2, dur: 17, sway: 7, size: 42, rot: 45 },
    { id: 3, startLeft: '110%', startTop: '25%', endLeft: '50%', endTop: '120%', delay: 5.5, dur: 22, sway: 6, size: 50, rot: -60 },
    { id: 4, startLeft: '-10%', startTop: '45%', endLeft: '60%', endTop: '120%', delay: 6.8, dur: 19, sway: 5.5, size: 48, rot: 30 }
  ], []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 15 }}>
      <style>{`
        ${leaves.map(leaf => `
          @keyframes leafFall${leaf.id} {
            0% { top: ${leaf.startTop}; left: ${leaf.startLeft}; opacity: 0; }
            10% { opacity: 0; }
            20% { opacity: 0.9; }
            85% { opacity: 0.9; }
            100% { top: ${leaf.endTop}; left: ${leaf.endLeft}; opacity: 0; }
          }
        `).join('')}
        @keyframes leafSway {
          0% { transform: translateX(-150px) rotate(-60deg); }
          100% { transform: translateX(150px) rotate(60deg); }
        }
        .anim-leaf-base {
          position: absolute;
          opacity: 0;
          animation-timing-function: cubic-bezier(0.37, 0, 0.63, 1);
          animation-iteration-count: 1;
          animation-fill-mode: both;
        }
        .anim-leaf-inner {
          animation-name: leafSway;
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
          animation-direction: alternate;
          transform-origin: center center;
        }
      `}</style>
      {leaves.map((leaf) => (
        <div
          key={leaf.id}
          className="anim-leaf-base text-[#899A8B]"
          style={{
            animationName: `leafFall${leaf.id}`,
            animationDelay: `${leaf.delay}s`,
            animationDuration: `${leaf.dur}s`,
          }}
        >
          <div
            className="anim-leaf-inner drop-shadow-md"
            style={{
              animationDuration: `${leaf.sway}s`,
              animationDelay: `${leaf.delay}s`,
            }}
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="transform" style={{ width: `${leaf.size}px`, height: `${leaf.size}px`, transform: `rotate(${leaf.rot}deg)` }} xmlns="http://www.w3.org/2000/svg">
              <path d="M12 1C10 4 6 10 6 15C6 18 8.5 21 11.5 22L11.5 24L12.5 24L12.5 22C15.5 21 18 18 18 15C18 10 14 4 12 1Z" />
              <path d="M12 1C12 1 12 15 12 22" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" fill="none" />
              <path d="M12 12C12 12 14 10 15 9" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" fill="none" />
              <path d="M12 16C12 16 14 14 15 13" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" fill="none" />
              <path d="M12 8C12 8 14 6 15 5" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" fill="none" />
              <path d="M12 14C12 14 10 12 9 11" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" fill="none" />
              <path d="M12 18C12 18 10 16 9 15" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" fill="none" />
              <path d="M12 10C12 10 10 8 9 7" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" fill="none" />
            </svg>
          </div>
        </div>
      ))}
    </div>
  );
};

// --- DATA ---
const accommodations = [
  {
    name: 'La Casa del Guarda',
    type: 'Casa Rural 4*',
    desc: 'A escasos minutos de la finca. Ideal grupos (Max 10 pax). 10% dto.',
    contact: '676 06 95 69',
    web: 'turismosotosalbos.com',
    tag: 'Sotosalbos',
  },
  {
    name: 'Saltus Alvus',
    type: 'Casas Rurales',
    desc: 'Gran capacidad, perfecto para familias grandes. Max 18 pax.',
    contact: '639 89 12 20',
    web: 'www.saltusalvuscasaruralsegovia.com',
    tag: 'Sotosalbos',
  },
  {
    name: 'La Casa Vieja',
    type: 'Casa Rural',
    desc: 'Encanto rural para grupos grandes. Max 12 pax.',
    contact: '600 38 50 93',
    web: 'villacristinasotosalbos.lodgify.com',
    tag: 'Sotosalbos',
  },
  {
    name: 'Casa del Maestro',
    type: 'Boutique Country House',
    desc: 'Dos casas con mucho encanto (4 y 6 pax).',
    contact: '630 95 77 97',
    web: 'casadelmaestro.es',
    tag: 'Sotosalbos',
  },
  {
    name: 'La Casita del Castillo',
    type: 'Casa Rural',
    desc: 'Acogedora, ideal para familias pequeñas. Max 4 pax.',
    contact: '648 22 75 98',
    tag: 'Sotosalbos',
  },
  {
    name: 'Buscando Lino',
    type: 'Apartamento Rural',
    desc: 'En el mismo pueblo. Íntimo y cómodo. Max 3 pax.',
    contact: '666 99 13 83',
    web: 'turismosotosalbos.com',
    tag: 'Sotosalbos',
  },
  {
    name: 'El Rancho de la Aldegüela',
    type: 'Hotel 4*',
    desc: "Opción clásica y confortable. 10% dto código 'MENCIASOTOSALBOS'.",
    contact: '921 40 10 60',
    web: 'fincaelrancho.es',
    tag: 'Torrecaballeros',
  },
  {
    name: 'Hotel Las Fuentes',
    type: 'Hotel 2*',
    desc: 'Sencillo y funcional, a solo 7km de la boda.',
    contact: '649 44 93 59',
    web: 'lasfuenteshotel.es',
    tag: 'Torrecaballeros',
  },
  {
    name: 'Casa Rural Torrecaballeros',
    type: 'Casa Rural',
    desc: 'Ambiente tradicional.',
    contact: '610 77 92 96',
    web: 'casaruraltorrecaballeros.net',
    tag: 'Torrecaballeros',
  },
];

const restaurants = [
  {
    name: 'La Chimenea',
    location: 'Sotosalbos',
    desc: 'Es el sitio idóneo para tomar el vermú o disfrutar de una buena comida.',
    specialty: 'Vermú y Tradición',
    contact: '650 94 99 61',
  },
  {
    name: 'Alejandro Manrique',
    location: 'Sotosalbos',
    desc: 'Especialistas en asados tradicionales típicos de Segovia.',
    specialty: 'Horno de Asar',
    contact: '921 40 30 77',
  },
  {
    name: 'Paz&Pan',
    location: 'Sotosalbos',
    desc: 'Un lugar acogedor donde el Mediterráno y el Líbano se fusionan.',
    specialty: 'Fusión Libanesa',
    contact: '921 12 89 42',
  },
  {
    name: 'El Rancho de la Aldegüela',
    location: 'Torrecaballeros',
    desc: 'A tan sólo 7 minutos de la finca, de lo mejor de la zona para cochinillo y cordero.',
    specialty: 'Asados Tradicionales',
    contact: '921 40 10 60',
  },
  {
    name: 'El Huerto de San Roque',
    location: 'Torrecaballeros',
    desc: 'Un rincón con mucho encanto para disfrutar de una buena comida en un entorno idílico.',
    specialty: 'Tradición y Calidad',
    contact: '641 03 26 00',
  },
  {
    name: 'Ta-Berna Horno de Asar',
    location: 'Collado Hermoso',
    desc: 'Muy cerca de la finca, lo regenta un matrimonio encantador y la comida es fantástica.',
    specialty: 'Picoteo y Calidad',
    contact: '921 40 30 61',
  },
];

// --- COMPONENTES UI ---

const Countdown = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;
      
      if (difference <= 0) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }
      
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    };

    setTimeLeft(calculateTime());

    const timer = setInterval(() => {
      const newTime = calculateTime();
      setTimeLeft(newTime);
      if (newTime.days === 0 && newTime.hours === 0 && newTime.minutes === 0 && newTime.seconds === 0) {
        clearInterval(timer);
      }
    }, 1000);
    
    return () => clearInterval(timer);
  }, [targetDate]);

  const TimeBox = ({ val, label }) => (
    <div className="flex flex-col items-center mx-4 md:mx-10">
      <div className="relative">
        <span className="text-4xl sm:text-5xl md:text-7xl font-light font-serif text-stone-900 tabular-nums tracking-tighter drop-shadow-sm">
          {val.toString().padStart(2, '0')}
        </span>
      </div>
      <span className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-amber-500 mt-2 font-bold">
        {label}
      </span>
    </div>
  );

  return (
    <div className="flex justify-center items-center pt-8 md:pt-12 pb-4 md:pb-8 px-4 md:px-12 w-full">
      <TimeBox val={timeLeft.days} label="Días" />
      <TimeBox val={timeLeft.hours} label="Horas" />
      <TimeBox val={timeLeft.minutes} label="Min" />
    </div>
  );
};

// --- APP PRINCIPAL ---
export default function App() {
  const [view, setView] = useState('landing');
  const [rsvps, setRsvps] = useState([]);
  const [formStatus, setFormStatus] = useState('idle');
  const [transporteSeleccionado, setTransporteSeleccionado] = useState('bus');
  const [adminPass, setAdminPass] = useState('');
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loadingData, setLoadingData] = useState(false);
  const [expandedAcc, setExpandedAcc] = useState(null);
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.title = 'Boda Gemma y Miguel 2027';
    const link =
      document.querySelector("link[rel*='icon']") ||
      document.createElement('link');
    link.type = 'image/svg+xml';
    link.rel = 'icon';
    link.href =
      'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>❤️</text></svg>';
    document.head.appendChild(link);

    const fontLink = document.createElement('link');
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap';
    fontLink.rel = 'stylesheet';
    document.head.appendChild(fontLink);

    const meta = document.createElement('meta');
    meta.name = 'format-detection';
    meta.content = 'telephone=no';
    document.head.appendChild(meta);
  }, []);

  const fetchSheetData = async () => {
    if (!GOOGLE_SCRIPT_URL) return;
    setLoadingData(true);
    try {
      const response = await fetch(GOOGLE_SCRIPT_URL);
      const data = await response.json();
      if (Array.isArray(data)) {
        setRsvps(data);
      }
    } catch (error) {
      console.error('Error cargando datos:', error);
    } finally {
      setLoadingData(false);
    }
  };

  useEffect(() => {
    if (view === 'admin' && isAdminAuthenticated) {
      fetchSheetData();
    }
  }, [view, isAdminAuthenticated]);

  const handleSheetRSVP = async (e) => {
    e.preventDefault();

    if (!GOOGLE_SCRIPT_URL) {
      return;
    }

    setFormStatus('loading');
    const formEl = e.target;
    const formData = new FormData(formEl);

    const data = new URLSearchParams();
    for (const pair of formData) {
      data.append(pair[0], pair[1]);
    }
    data.append('timestamp', new Date().toISOString());
    if (transporteSeleccionado !== 'bus') {
      data.append('recorrido', '-');
    }

    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        body: data,
        mode: 'no-cors', 
      });

      setFormStatus('success');
      formEl.reset();
    } catch (error) {
      console.error('Error al enviar:', error);
      setFormStatus('error');
    }
  };

  if (view === 'admin') {
    const totalBusPax = rsvps
      .filter((r) => r.asistira === 'si' && r.transporte === 'bus')
      .reduce((acc, curr) => acc + (parseInt(curr.invitados) || 1), 0);

    const totalConfirmados = rsvps
      .filter((r) => r.asistira === 'si')
      .reduce((acc, curr) => acc + (parseInt(curr.invitados) || 1), 0);

    return (
      <div className="min-h-screen bg-stone-100 font-sans text-stone-800">
        <div className="bg-white/80 backdrop-blur-md border-b border-stone-200 px-4 md:px-6 py-4 flex justify-between items-center sticky top-0 z-50">
          <div className="flex items-center gap-2 md:gap-3">
            <span className="text-2xl md:text-3xl text-stone-900 mt-1" style={{ fontFamily: "'Great Vibes', cursive" }}>
              Panel de Gemma y Miguel
            </span>
          </div>
          <button
            onClick={() => setView('landing')}
            className="text-sm font-medium hover:text-amber-700 transition flex items-center gap-2"
          >
            <span className="hidden sm:inline">Ver Web</span>{' '}
            <ArrowRight size={16} />
          </button>
        </div>

        {!isAdminAuthenticated ? (
          <div className="flex items-center justify-center h-[80vh] px-4">
            <div className="bg-white p-8 md:p-10 rounded-2xl shadow-xl border border-stone-100 w-full max-w-sm text-center">
              <div className="w-16 h-16 bg-stone-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <Lock className="text-stone-400" size={24} />
              </div>
              <h2 className="text-2xl font-serif mb-2 text-stone-900">Acceso Novios</h2>
              <p className="text-stone-500 text-sm mb-6">
                Introduce la contraseña
              </p>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (adminPass.toLowerCase() === 'boda2027')
                    setIsAdminAuthenticated(true);
                }}
                className="space-y-4"
              >
                <input
                  type="password"
                  autoFocus
                  placeholder="••••••••"
                  className="w-full p-3 text-center text-lg tracking-widest border border-stone-200 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none"
                  value={adminPass}
                  onChange={(e) => setAdminPass(e.target.value)}
                />
                <button className="w-full bg-stone-900 text-white py-3 rounded-lg font-medium hover:bg-stone-800 transition">
                  Entrar al Panel
                </button>
              </form>
            </div>
          </div>
        ) : (
          <div className="max-w-6xl mx-auto p-4 md:p-10">
            {!GOOGLE_SCRIPT_URL && (
              <div className="bg-red-50 border border-red-200 text-red-800 p-4 rounded-xl mb-8 flex items-start gap-3">
                <Database className="flex-shrink-0 mt-1" size={20} />
                <div>
                  <p className="font-bold text-sm uppercase tracking-wide">Falta Configuración</p>
                  <p className="text-sm mt-1 opacity-90">Aún no has puesto la URL de tu Google Sheet.</p>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-8 md:mb-10">
              <div className="bg-stone-900 text-white p-6 rounded-2xl shadow-lg col-span-1">
                <p className="text-stone-400 text-xs uppercase tracking-widest font-bold mb-2">Total Confirmados</p>
                <p className="text-4xl md:text-5xl font-serif">{loadingData ? '...' : totalConfirmados}</p>
                <p className="text-stone-500 text-xs mt-2">Personas</p>
              </div>

              <div className="bg-amber-500 text-white p-6 rounded-2xl shadow-lg col-span-1 relative overflow-hidden group">
                <div className="relative z-10">
                  <p className="text-amber-100 text-xs uppercase tracking-widest font-bold mb-2 flex items-center gap-2">
                    <Bus size={14} /> Plazas Bus
                  </p>
                  <p className="text-4xl md:text-5xl font-serif mb-4">{loadingData ? '...' : totalBusPax}</p>
                </div>
                <Bus className="absolute -bottom-4 -right-4 text-amber-600 opacity-20 w-24 h-24 md:w-32 md:h-32 transform -rotate-12" />
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-200 col-span-1 sm:col-span-2 flex flex-col justify-between">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-bold text-lg flex items-center gap-2 text-stone-900">
                      <FileSpreadsheet size={18} className="text-green-600" /> Google Sheets
                    </h3>
                    <p className="text-stone-500 text-xs mt-1">Los datos se guardan en tu hoja de cálculo.</p>
                  </div>
                  <button
                    onClick={fetchSheetData}
                    disabled={loadingData}
                    className="p-2 hover:bg-stone-100 rounded-full transition text-stone-400 hover:text-stone-600"
                    title="Recargar datos"
                  >
                    <RefreshCw size={16} className={loadingData ? 'animate-spin' : ''} />
                  </button>
                </div>
                <div className="flex gap-3 mt-auto">
                  <a
                    href="https://docs.google.com/spreadsheets"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 bg-stone-50 hover:bg-stone-100 text-stone-800 py-3 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors"
                  >
                    <ExternalLink size={14} /> Abrir Excel en Drive
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden">
              <div className="px-4 md:px-6 py-4 border-b border-stone-100 flex justify-between items-center bg-stone-50/50">
                <h3 className="font-bold text-stone-700">Listado en Tiempo Real</h3>
                <span className="text-xs text-stone-400 bg-white px-2 py-1 rounded border border-stone-200">{rsvps.length} registros</span>
              </div>
              <div className="overflow-x-auto">
                {loadingData ? (
                  <div className="p-8 text-center text-stone-400 flex flex-col items-center gap-2">
                    <Loader2 className="animate-spin text-amber-500" />
                    <span className="text-xs uppercase tracking-widest">Sincronizando con Google...</span>
                  </div>
                ) : rsvps.length === 0 ? (
                  <div className="p-8 text-center text-stone-400 italic">Aún no hay datos en la hoja.</div>
                ) : (
                  <table className="w-full text-left text-sm min-w-[600px]">
                    <thead className="bg-stone-50 text-stone-400 uppercase tracking-wider text-xs font-medium">
                      <tr>
                        <th className="px-6 py-4">Fecha</th>
                        <th className="px-6 py-4">Nombre</th>
                        <th className="px-6 py-4 text-center">Estado</th>
                        <th className="px-6 py-4 text-center">Pax</th>
                        <th className="px-6 py-4">Transporte</th>
                        <th className="px-6 py-4">Observaciones</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-100">
                      {rsvps.map((rsvp, idx) => (
                        <tr key={idx} className="hover:bg-amber-50/30 transition-colors">
                          <td className="px-6 py-4 text-xs text-stone-400 font-mono">{new Date(rsvp.timestamp).toLocaleDateString()}</td>
                          <td className="px-6 py-4 font-medium text-stone-800">{rsvp.nombre}</td>
                          <td className="px-6 py-4 text-center">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide ${rsvp.asistira === 'si' ? 'bg-green-100 text-green-800' : 'bg-red-50 text-red-800'}`}>
                              {rsvp.asistira === 'si' ? 'Confirmado' : 'Rechazado'}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-center font-mono text-stone-500">{rsvp.invitados || 1}</td>
                          <td className="px-6 py-4 text-stone-600">
                            {rsvp.asistira === 'si' ? (
                              rsvp.transporte === 'bus' ? (
                                <span className="flex items-center gap-2 text-amber-700 font-medium">
                                  <Bus size={14} /> Bus
                                  {rsvp.recorrido && rsvp.recorrido !== '-' && (
                                    <span className="text-[10px] opacity-70 uppercase tracking-wider">({rsvp.recorrido})</span>
                                  )}
                                </span>
                              ) : (
                                <span className="flex items-center gap-2 text-stone-500"><Car size={14} /> Propio</span>
                              )
                            ) : (
                              <span className="text-stone-300">-</span>
                            )}
                          </td>
                          <td className="px-6 py-4 text-stone-500 max-w-xs truncate">{rsvp.observaciones || '-'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="bg-[#FAF9F6] text-stone-800 font-sans selection:bg-amber-200 selection:text-amber-900 overflow-x-hidden pt-[60px] md:pt-[64px] relative">
      
      <nav className="fixed top-0 left-0 w-full z-40 transition-all duration-300 bg-white/70 backdrop-blur-md border-b border-white/20 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex justify-between items-center">
          <a 
            href="#inicio"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="text-3xl md:text-4xl text-stone-900 z-50 relative mt-1 cursor-pointer" 
            style={{ fontFamily: "'Great Vibes', cursive" }}
          >
            Gemma y Miguel
          </a>

          <div className="flex space-x-3 md:space-x-10 text-[10px] md:text-xs uppercase tracking-[0.2em] font-medium items-center text-stone-500">
            <a 
              href="#rsvp" 
              className="bg-stone-900 text-white px-4 md:px-6 py-2 md:py-2.5 rounded-full hover:bg-amber-400 hover:text-stone-900 transition-all hover:shadow-lg transform hover:-translate-y-0.5 whitespace-nowrap"
            >
              Confirmar
            </a>
            <button onClick={() => setView('admin')} className="p-2 hover:bg-stone-100 rounded-full transition text-stone-800">
              <Lock size={14} />
            </button>
          </div>
        </div>
      </nav>

      <section id="inicio" className="relative w-full h-[calc(100dvh-60px)] md:h-[calc(100dvh-64px)] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url('https://i.postimg.cc/XNw9G4mr/Gemini_Generated_Image_5rucma5rucma5ruc.png')`, filter: 'blur(40px)' }} />
        <div className="absolute inset-0 z-10 bg-contain bg-center bg-no-repeat" style={{ backgroundImage: `url('https://i.postimg.cc/XNw9G4mr/Gemini_Generated_Image_5rucma5rucma5ruc.png')` }} />
        <FlyingBirds />
        <FallingLeaves />
        <div className="absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-[#FAF9F6] to-transparent z-20 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-[#FAF9F6] to-transparent z-20 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-full h-8 md:h-12 bg-gradient-to-t from-[#FAF9F6] to-transparent z-20 pointer-events-none" />

        {/* Indicador de Scroll */}
        <div className={`md:hidden absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 flex flex-col items-center gap-2 animate-bounce transition-opacity duration-500 ${hasScrolled ? 'opacity-0 pointer-events-none' : 'opacity-80'}`}>
          <span className="text-[9px] uppercase tracking-[0.4em] font-bold text-stone-500">Desliza</span>
          <ArrowRight size={14} className="text-stone-400 transform rotate-90" />
        </div>
      </section>

      <section className="bg-transparent relative z-20 pt-8 md:pt-16">
        <div className="max-w-5xl mx-auto">
          <FadeInSection>
            <Countdown targetDate={new Date('2027-04-24T00:00:00+02:00').getTime()} />
          </FadeInSection>
        </div>
      </section>

      <section id="historia" className="pt-10 md:pt-12 pb-16 md:pb-20 px-6 md:px-12 max-w-5xl mx-auto text-center relative z-20">
        <FadeInSection>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-12 md:h-16 bg-gradient-to-b from-transparent to-amber-900/20"></div>
          <h2 className="text-3xl md:text-6xl mb-6 md:mb-10 font-serif text-stone-900">Nuestra Historia</h2>
          <p className="text-base md:text-2xl leading-relaxed text-stone-600 font-light max-w-3xl mx-auto">
            Todo empezó casi sin planearlo, como esos encuentros que no te esperas… y terminó convirtiéndose en el viaje más bonito de nuestras vidas. Ahora, en Sotosalbos, entre sus calles de piedra y sus atardeceres dorados, diremos nuestro “sí, quiero”.
          </p>
        </FadeInSection>
      </section>

      <section id="detalles" className="py-16 md:py-20 px-4 relative overflow-hidden border-t border-stone-200">
        <div className="max-w-7xl mx-auto relative z-10">
          <FadeInSection className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-10">
            <div className="group relative bg-stone-50 hover:bg-white p-8 md:p-12 rounded-[2rem] md:rounded-[2.5rem] transition-all duration-500 border border-stone-100 hover:border-amber-100 hover:shadow-2xl hover:shadow-amber-900/5">
              <div className="flex items-center gap-4 md:gap-6 mb-8 md:mb-10">
                <div className="w-12 h-12 md:w-16 md:h-16 flex-shrink-0 flex items-center justify-center bg-white rounded-2xl shadow-sm border border-stone-100 group-hover:scale-110 group-hover:border-amber-200 transition-all duration-500">
                  <Church className="text-stone-400 group-hover:text-amber-600 transition-colors" size={24} />
                </div>
                <div>
                  <h3 className="text-2xl md:text-3xl font-serif text-stone-900 leading-none mb-1 md:mb-2">Ceremonia</h3>
                  <p className="text-amber-600/80 font-medium uppercase tracking-widest text-[10px]">NUESTRO SÍ, QUIERO</p>
                </div>
              </div>
              <div className="space-y-6 text-stone-600 pl-2">
                <div className="flex items-start gap-4 md:gap-5 group/item">
                  <div className="p-2 bg-white rounded-full border border-stone-100 group-hover/item:border-amber-200 transition-colors mt-0.5"><Clock className="text-amber-600/70" size={16} /></div>
                  <div><p className="font-bold text-stone-900 text-lg">12:00 Horas</p><p className="text-sm font-light">Se ruega puntualidad</p></div>
                </div>
                <div className="flex items-start gap-4 md:gap-5 group/item">
                  <div className="p-2 bg-white rounded-full border border-stone-100 group-hover/item:border-amber-200 transition-colors mt-0.5"><MapPin className="text-amber-600/70" size={16} /></div>
                  <div><p className="font-bold text-stone-900 text-lg">Iglesia de San Miguel</p><p className="text-sm font-light">C. de la Iglesia, 4, Sotosalbos</p></div>
                </div>
                <div className="flex items-start gap-4 md:gap-5 group/item">
                  <div className="p-2 bg-white rounded-full border border-stone-100 group-hover/item:border-amber-200 transition-colors mt-0.5"><Car className="text-amber-600/70" size={16} /></div>
                  <div><p className="font-bold text-stone-900 text-lg">Parking</p><p className="text-sm font-light">Zona de aparcamiento gratuita cercana</p></div>
                </div>
              </div>
              <a href="https://www.google.com/maps/search/?api=1&query=Iglesia+de+San+Miguel+Sotosalbos" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 mt-8 md:mt-10 ml-2 text-xs font-bold uppercase tracking-[0.2em] text-stone-400 hover:text-amber-700 transition-colors group/link">
                CÓMO LLEGAR <ArrowRight size={14} className="group-hover/link:translate-x-1 transition-transform" />
              </a>
            </div>

            <div className="group relative bg-stone-50 hover:bg-white p-8 md:p-12 rounded-[2rem] md:rounded-[2.5rem] transition-all duration-500 border border-stone-100 hover:border-amber-100 hover:shadow-2xl hover:shadow-amber-900/5">
              <div className="flex items-center gap-4 md:gap-6 mb-8 md:mb-10">
                <div className="w-12 h-12 md:w-16 md:h-16 flex-shrink-0 flex items-center justify-center bg-white rounded-2xl shadow-sm border border-stone-100 group-hover:scale-110 group-hover:border-amber-200 transition-all duration-500">
                  <Utensils className="text-stone-400 group-hover:text-amber-600 transition-colors" size={24} />
                </div>
                <div>
                  <h3 className="text-2xl md:text-3xl font-serif text-stone-900 leading-none mb-1 md:mb-2">Celebración</h3>
                  <p className="text-amber-600/80 font-medium uppercase tracking-widest text-[10px]">Cóctel y Banquete</p>
                </div>
              </div>
              <div className="space-y-6 text-stone-600 pl-2">
                <div className="flex items-start gap-4 md:gap-5 group/item">
                  <div className="p-2 bg-white rounded-full border border-stone-100 group-hover/item:border-amber-200 transition-colors mt-0.5"><Clock className="text-amber-600/70" size={16} /></div>
                  <div><p className="font-bold text-stone-900 text-lg">13:00 Horas</p><p className="text-sm font-light">Hasta que el cuerpo aguante</p></div>
                </div>
                <div className="flex items-start gap-4 md:gap-5 group/item">
                  <div className="p-2 bg-white rounded-full border border-stone-100 group-hover/item:border-amber-200 transition-colors mt-0.5"><MapPin className="text-amber-600/70" size={16} /></div>
                  <div><p className="font-bold text-stone-900 text-lg">Mencía de Sotosalbos</p><p className="text-sm font-light">Ctra. Segovia a Soria, km 172</p></div>
                </div>
                <div className="flex items-start gap-4 md:gap-5 group/item">
                  <div className="p-2 bg-white rounded-full border border-stone-100 group-hover/item:border-amber-200 transition-colors mt-0.5"><Car className="text-amber-600/70" size={16} /></div>
                  <div><p className="font-bold text-stone-900 text-lg">Parking</p><p className="text-sm font-light">Parking privado en la finca</p></div>
                </div>
              </div>
              <a href="https://www.google.com/maps/search/?api=1&query=Finca+Mencía+Sotosalbos" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 mt-8 md:mt-10 ml-2 text-xs font-bold uppercase tracking-[0.2em] text-stone-400 hover:text-amber-700 transition-colors group/link">
                CÓMO LLEGAR <ArrowRight size={14} className="group-hover/link:translate-x-1 transition-transform" />
              </a>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* Imagen Mencía de Sotosalbos */}
      <div className="w-full flex justify-center py-8 md:py-12 relative z-10 bg-[#FAF9F6]">
        <img 
          src="https://i.postimg.cc/k4rnjqwH/f67fe8aa-7573-43a2-92f5-c6f72789c428.png" 
          alt="Mencía de Sotosalbos" 
          className="max-w-[380px] md:max-w-3xl w-full px-4 object-contain mix-blend-multiply"
          style={{ filter: 'contrast(1.05) brightness(1.02)' }}
        />
      </div>

      <section id="itinerario" className="py-16 md:py-20 relative overflow-hidden bg-[#FAF9F6]">
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <FadeInSection>
            <div className="text-center mb-12 md:mb-16">
              <span className="text-amber-600/80 text-xs font-bold uppercase tracking-[0.3em] mb-4 block">Timeline</span>
              <h2 className="text-3xl md:text-5xl font-serif text-stone-900 mb-6">El Gran Día</h2>
              <div className="w-16 md:w-24 h-px bg-stone-300 mx-auto"></div>
            </div>
            <div className="relative">
              <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-stone-300 transform md:-translate-x-1/2"></div>
              <div className="space-y-12">
                <div className="relative flex flex-col md:flex-row items-start md:items-center md:justify-between group pl-12 md:pl-0">
                  <div className="md:w-5/12 text-left md:text-right md:pr-12 w-full order-2 md:order-1 mt-2 md:mt-0">
                    <h4 className="font-serif text-xl md:text-2xl text-stone-800">Llegada de Invitados</h4>
                    <p className="text-stone-500 text-sm mt-1">Bienvenida en la Iglesia de San Miguel</p>
                  </div>
                  <div className="absolute left-4 md:left-1/2 w-4 h-4 bg-white border-4 border-amber-300 rounded-full transform -translate-x-1/2 z-10 group-hover:scale-125 transition-transform duration-300 mt-1 md:mt-0"></div>
                  <div className="md:w-5/12 md:pl-12 w-full text-left order-1 md:order-3">
                    <span className="inline-block px-3 py-1 bg-white border border-stone-200 rounded-full text-[10px] md:text-xs font-bold tracking-widest text-amber-900 shadow-sm">11:30</span>
                  </div>
                </div>
                <div className="relative flex flex-col md:flex-row-reverse items-start md:items-center md:justify-between group pl-12 md:pl-0">
                  <div className="md:w-5/12 text-left md:pl-12 w-full order-2 md:order-1 mt-2 md:mt-0">
                    <h4 className="font-serif text-xl md:text-2xl text-stone-800">Ceremonia</h4>
                    <p className="text-stone-500 text-sm mt-1">El "Sí, quiero" más esperado</p>
                  </div>
                  <div className="absolute left-4 md:left-1/2 w-4 h-4 bg-white border-4 border-stone-400 group-hover:border-amber-400 rounded-full transform -translate-x-1/2 z-10 group-hover:scale-125 transition-transform duration-300 mt-1 md:mt-0"></div>
                  <div className="md:w-5/12 md:pr-12 w-full text-left md:text-right order-1 md:order-3">
                    <span className="inline-block px-3 py-1 bg-white border border-stone-200 text-stone-600 rounded-full text-[10px] md:text-xs font-bold tracking-widest shadow-sm">12:00</span>
                  </div>
                </div>
                <div className="relative flex flex-col md:flex-row items-start md:items-center md:justify-between group pl-12 md:pl-0">
                  <div className="md:w-5/12 text-left md:text-right md:pr-12 w-full order-2 md:order-1 mt-2 md:mt-0">
                    <h4 className="font-serif text-xl md:text-2xl text-stone-800">Cóctel de Bienvenida</h4>
                    <p className="text-stone-500 text-sm mt-1">Música en vivo en los jardines</p>
                  </div>
                  <div className="absolute left-4 md:left-1/2 w-8 h-8 md:w-10 md:h-10 bg-white border border-stone-100 rounded-full flex items-center justify-center transform -translate-x-1/2 z-10 shadow-sm group-hover:scale-110 transition-transform mt-0">
                    <Wine size={14} className="text-amber-600" />
                  </div>
                  <div className="md:w-5/12 md:pl-12 w-full text-left order-1 md:order-3">
                    <span className="inline-block px-3 py-1 bg-white border border-stone-200 text-stone-600 rounded-full text-[10px] md:text-xs font-bold tracking-widest shadow-sm">13:00</span>
                  </div>
                </div>
                <div className="relative flex flex-col md:flex-row-reverse items-start md:items-center md:justify-between group pl-12 md:pl-0">
                  <div className="md:w-5/12 text-left md:pl-12 w-full order-2 md:order-1 mt-2 md:mt-0">
                    <h4 className="font-serif text-xl md:text-2xl text-stone-800">Banquete</h4>
                    <p className="text-stone-500 text-sm mt-1">Celebrar, compartir, disfrutar</p>
                  </div>
                  <div className="absolute left-4 md:left-1/2 w-8 h-8 md:w-10 md:h-10 bg-white border border-stone-100 rounded-full flex items-center justify-center transform -translate-x-1/2 z-10 shadow-sm group-hover:scale-110 transition-transform mt-0">
                    <Utensils size={14} className="text-amber-600" />
                  </div>
                  <div className="md:w-5/12 md:pr-12 w-full text-left md:text-right order-1 md:order-3">
                    <span className="inline-block px-3 py-1 bg-white border border-stone-200 text-stone-600 rounded-full text-[10px] md:text-xs font-bold tracking-widest shadow-sm">15:00</span>
                  </div>
                </div>
                <div className="relative flex flex-col md:flex-row items-start md:items-center md:justify-between group pl-12 md:pl-0">
                  <div className="md:w-5/12 text-left md:text-right md:pr-12 w-full order-2 md:order-1 mt-2 md:mt-0">
                    <h4 className="font-serif text-xl md:text-2xl text-stone-800">Fiesta y Barra Libre</h4>
                    <p className="text-stone-500 text-sm mt-1">¡Baile hasta que se ponga el sol!</p>
                  </div>
                  <div className="absolute left-4 md:left-1/2 w-8 h-8 md:w-10 md:h-10 bg-stone-900 border border-stone-900 rounded-full flex items-center justify-center transform -translate-x-1/2 z-10 shadow-sm group-hover:scale-110 transition-transform mt-0">
                    <Music size={14} className="text-white" />
                  </div>
                  <div className="md:w-5/12 md:pl-12 w-full text-left order-1 md:order-3"></div>
                </div>
              </div>
            </div>
          </FadeInSection>
        </div>
      </section>

      <section id="alojamiento" className="py-16 md:py-20 px-4 relative bg-stone-100">
        <div className="max-w-6xl mx-auto relative z-10">
          <FadeInSection>
            <div className="text-center mb-12 md:mb-16">
              <span className="text-amber-600/80 text-xs font-bold uppercase tracking-[0.3em] mb-4 block">Para Descansar</span>
              <h2 className="text-3xl md:text-5xl font-serif text-stone-900 mb-6">Alojamientos Recomendados</h2>
              <p className="text-stone-500 font-light max-w-2xl mx-auto text-sm md:text-base">Hemos seleccionado las mejores opciones cerca de la finca para que podáis disfrutar sin preocupaciones.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {accommodations.map((acc, index) => (
                <div key={index} onClick={() => setExpandedAcc(expandedAcc === index ? null : index)} className="cursor-pointer bg-white p-5 md:p-6 rounded-2xl shadow-sm border border-stone-100 hover:shadow-lg hover:border-amber-200 transition-all duration-300 flex flex-col group">
                  <div className="flex justify-between items-start mb-3">
                    <span className="bg-amber-50 text-amber-800 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">{acc.tag}</span>
                    <Bed size={18} className="text-stone-300 group-hover:text-amber-500 transition-colors" />
                  </div>
                  <h3 className="text-xl font-serif text-stone-900 mb-1">{acc.name}</h3>
                  <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">{acc.type}</p>
                  <div className={`grid transition-all duration-300 ease-in-out ${expandedAcc === index ? 'grid-rows-[1fr] opacity-100 mt-4' : 'grid-rows-[0fr] opacity-0 mt-0'}`}>
                    <div className="overflow-hidden">
                      <div className="pt-4 border-t border-stone-100 flex flex-col gap-4">
                        <p className="text-stone-600 text-sm leading-relaxed">{acc.desc}</p>
                        <div className="space-y-3">
                          <div className="flex items-center gap-3 text-sm text-stone-500 hover:text-amber-700 transition"><Phone size={14} className="flex-shrink-0 text-stone-400" /> <span>{acc.contact}</span></div>
                          {acc.web && <a href={acc.web.startsWith('http') ? acc.web : `https://${acc.web}`} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="flex items-center gap-3 text-sm text-stone-500 hover:text-amber-700 transition truncate"><Globe size={14} className="flex-shrink-0 text-stone-400" /> <span className="truncate">{acc.web}</span></a>}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 pt-3 border-t border-stone-50 flex items-center justify-center gap-2 text-[10px] uppercase tracking-widest text-stone-400 group-hover:text-amber-700 transition-colors">
                    {expandedAcc === index ? 'Cerrar detalle' : 'Ver detalle'}
                    <ArrowRight size={12} className={`transform transition-transform duration-300 ${expandedAcc === index ? '-rotate-90' : 'rotate-90'}`} />
                  </div>
                </div>
              ))}
            </div>
          </FadeInSection>
        </div>
      </section>

      <section id="gastronomia" className="py-16 md:py-20 px-4 relative overflow-hidden bg-white">
        <div className="max-w-6xl mx-auto relative z-10">
          <FadeInSection>
            <div className="text-center mb-12 md:mb-16">
              <span className="text-amber-600/80 text-xs font-bold uppercase tracking-[0.3em] mb-4 block">Sabores Locales</span>
              <h2 className="text-3xl md:text-5xl font-serif text-stone-900 mb-6">Gastronomía Cercana</h2>
              <p className="text-stone-500 font-light max-w-2xl mx-auto text-sm md:text-base">Para disfrutar antes o después de la boda, nuestros lugares favoritos para el vermú, asados o picoteo.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {restaurants.map((rest, index) => (
                <div key={index} className="group relative bg-stone-50 p-6 md:p-8 rounded-3xl overflow-hidden hover:bg-stone-900 transition-colors duration-500">
                  <div className="absolute top-0 right-0 bg-white p-4 rounded-bl-3xl z-10">
                    <UtensilsCrossed size={20} className="text-amber-600 group-hover:text-amber-400 transition-colors" />
                  </div>
                  <div className="relative z-10">
                    <div className="mb-6">
                      <h3 className="text-xl md:text-2xl font-serif text-stone-900 group-hover:text-white transition-colors mb-1">{rest.name}</h3>
                      <div className="flex items-center gap-2 text-stone-400 text-xs uppercase tracking-widest group-hover:text-stone-500"><MapPin size={12} /> {rest.location}</div>
                    </div>
                    <p className="text-stone-600 group-hover:text-stone-300 text-sm leading-relaxed mb-6 transition-colors">{rest.desc}</p>
                    <div className="flex justify-between items-end border-t border-stone-200 group-hover:border-stone-700 pt-6 transition-colors">
                      <div><span className="block text-[10px] uppercase text-stone-400 mb-1">Especialidad</span><span className="text-amber-800 group-hover:text-amber-400 font-medium text-sm">{rest.specialty}</span></div>
                      <span className="text-stone-400 text-sm font-mono group-hover:text-stone-500">{rest.contact}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </FadeInSection>
        </div>
      </section>

      <section id="autobus" className="py-16 md:py-20 px-4 relative overflow-hidden border-t border-stone-200">
        <div className="max-w-7xl mx-auto relative z-10">
          <FadeInSection>
            <div className="text-center mb-12 md:mb-16">
              <span className="text-amber-600/80 text-xs font-bold uppercase tracking-[0.3em] mb-4 block">Transporte</span>
              <h2 className="text-3xl md:text-5xl font-serif text-stone-900 mb-6">Ruta del Autobús</h2>
              <p className="text-stone-500 font-light max-w-2xl mx-auto text-sm md:text-base">Para mayor comodidad, dispondremos de un servicio de autobús que realizará el siguiente recorrido.</p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-10">
              <div className="group relative bg-stone-50 hover:bg-white p-8 md:p-12 rounded-[2rem] md:rounded-[2.5rem] transition-all duration-500 border border-stone-100 hover:border-amber-100 hover:shadow-2xl hover:shadow-amber-900/5">
                <div className="flex items-center gap-4 md:gap-6 mb-8 md:mb-10">
                  <div className="w-12 h-12 md:w-16 md:h-16 flex-shrink-0 flex items-center justify-center bg-white rounded-2xl shadow-sm border border-stone-100 group-hover:scale-110 group-hover:border-amber-200 transition-all duration-500"><Bus className="text-stone-400 group-hover:text-amber-600 transition-colors" size={24} /></div>
                  <div><h3 className="text-2xl md:text-3xl font-serif text-stone-900 leading-none mb-1 md:mb-2">Ruta de Ida</h3><p className="text-amber-600/80 font-medium uppercase tracking-widest text-[10px]">Transporte Invitados</p></div>
                </div>
                <div className="relative pl-6 md:pl-8 text-stone-600">
                  <div className="absolute left-[7px] md:left-[15px] top-2 bottom-2 w-px bg-stone-200 group-hover:bg-amber-100 transition-colors duration-500"></div>
                  <div className="flex flex-col gap-5 md:gap-6">
                    <div className="relative group/stop"><div className="absolute -left-[33px] md:-left-[41px] top-1.5 w-4 h-4 bg-white border-[3px] border-stone-300 group-hover/stop:border-amber-400 rounded-full group-hover/stop:scale-125 transition-all duration-300"></div><p className="font-bold text-stone-900 text-lg">Intercambiador de Moncloa</p><p className="text-[10px] text-stone-500 uppercase tracking-widest mt-1 font-bold">Salida principal</p></div>
                    <div className="flex items-center gap-2 text-stone-600 text-[10px] font-bold uppercase tracking-widest bg-white w-fit px-3 py-1.5 rounded-full border border-stone-100 shadow-sm relative z-10 -ml-1 group-hover:border-amber-200 transition-colors"><Clock size={12} className="text-amber-600/70" /> 1h 10m <span className="text-stone-300">|</span> 95 km</div>
                    <div className="relative group/stop"><div className="absolute -left-[33px] md:-left-[41px] top-1.5 w-4 h-4 bg-white border-[3px] border-stone-300 group-hover/stop:border-amber-400 rounded-full group-hover/stop:scale-125 transition-all duration-300"></div><p className="font-bold text-stone-900 text-lg">Torrecaballeros</p><p className="text-[10px] text-stone-500 uppercase tracking-widest mt-1">Parada intermedia</p></div>
                    <div className="flex items-center gap-2 text-stone-600 text-[10px] font-bold uppercase tracking-widest bg-white w-fit px-3 py-1.5 rounded-full border border-stone-100 shadow-sm relative z-10 -ml-1 group-hover:border-amber-200 transition-colors"><Clock size={12} className="text-amber-600/70" /> 10 min <span className="text-stone-300">|</span> 9 km</div>
                    <div className="relative group/stop"><div className="absolute -left-[33px] md:-left-[41px] top-1.5 w-4 h-4 bg-white border-[3px] border-stone-300 group-hover/stop:border-amber-400 rounded-full group-hover/stop:scale-125 transition-all duration-300"></div><p className="font-bold text-stone-900 text-lg">Iglesia de Sotosalbos</p><p className="text-[10px] text-amber-600/80 uppercase tracking-widest mt-1 font-bold">Ceremonia</p></div>
                    <div className="flex items-center gap-2 text-stone-600 text-[10px] font-bold uppercase tracking-widest bg-white w-fit px-3 py-1.5 rounded-full border border-stone-100 shadow-sm relative z-10 -ml-1 group-hover:border-amber-200 transition-colors"><Clock size={12} className="text-amber-600/70" /> 2 min <span className="text-stone-300">|</span> 1 km</div>
                    <div className="relative group/stop"><div className="absolute -left-[33px] md:-left-[41px] top-1.5 w-4 h-4 bg-white border-[3px] border-amber-500 group-hover/stop:border-amber-600 rounded-full shadow-sm group-hover/stop:scale-125 transition-all duration-300"></div><p className="font-bold text-stone-900 text-lg">Finca Mencía de Sotosalbos</p><p className="text-[10px] text-stone-500 uppercase tracking-widest mt-1">Continuación tras la ceremonia</p></div>
                  </div>
                </div>
              </div>
              <div className="group relative bg-stone-50 hover:bg-white p-8 md:p-12 rounded-[2rem] md:rounded-[2.5rem] transition-all duration-500 border border-stone-100 hover:border-amber-100 hover:shadow-2xl hover:shadow-amber-900/5">
                <div className="flex items-center gap-4 md:gap-6 mb-8 md:mb-10">
                  <div className="w-12 h-12 md:w-16 md:h-16 flex-shrink-0 flex items-center justify-center bg-white rounded-2xl shadow-sm border border-stone-100 group-hover:scale-110 group-hover:border-amber-200 transition-all duration-500"><Bus className="text-stone-400 group-hover:text-amber-600 transition-colors" size={24} /></div>
                  <div><h3 className="text-2xl md:text-3xl font-serif text-stone-900 leading-none mb-1 md:mb-2">Ruta de Vuelta</h3><p className="text-amber-600/80 font-medium uppercase tracking-widest text-[10px]">FIN DE FIESTA</p></div>
                </div>
                <div className="relative pl-6 md:pl-8 text-stone-600">
                  <div className="absolute left-[7px] md:left-[15px] top-2 bottom-2 w-px bg-stone-200 group-hover:bg-amber-100 transition-colors duration-500"></div>
                  <div className="flex flex-col gap-5 md:gap-6">
                    <div className="relative group/stop"><div className="absolute -left-[33px] md:-left-[41px] top-1.5 w-4 h-4 bg-white border-[3px] border-amber-500 group-hover/stop:border-amber-600 rounded-full shadow-sm group-hover/stop:scale-125 transition-all duration-300"></div><p className="font-bold text-stone-900 text-lg">Finca Mencía de Sotosalbos</p><p className="text-[10px] text-amber-600/80 uppercase tracking-widest mt-1 font-bold">Fin de fiesta y recogida</p></div>
                    <div className="flex items-center gap-2 text-stone-600 text-[10px] font-bold uppercase tracking-widest bg-white w-fit px-3 py-1.5 rounded-full border border-stone-100 shadow-sm relative z-10 -ml-1 group-hover:border-amber-200 transition-colors"><Clock size={12} className="text-amber-600/70" /> 2 min <span className="text-stone-300">|</span> 1 km</div>
                    <div className="relative group/stop"><div className="absolute -left-[33px] md:-left-[41px] top-1.5 w-4 h-4 bg-white border-[3px] border-stone-300 group-hover/stop:border-amber-400 rounded-full group-hover/stop:scale-125 transition-all duration-300"></div><p className="font-bold text-stone-900 text-lg">Iglesia de Sotosalbos</p><p className="text-[10px] text-stone-500 uppercase tracking-widest mt-1">Parada intermedia</p></div>
                    <div className="flex items-center gap-2 text-stone-600 text-[10px] font-bold uppercase tracking-widest bg-white w-fit px-3 py-1.5 rounded-full border border-stone-100 shadow-sm relative z-10 -ml-1 group-hover:border-amber-200 transition-colors"><Clock size={12} className="text-amber-600/70" /> 10 min <span className="text-stone-300">|</span> 9 km</div>
                    <div className="relative group/stop"><div className="absolute -left-[33px] md:-left-[41px] top-1.5 w-4 h-4 bg-white border-[3px] border-stone-300 group-hover/stop:border-amber-400 rounded-full group-hover/stop:scale-125 transition-all duration-300"></div><p className="font-bold text-stone-900 text-lg">Torrecaballeros</p><p className="text-[10px] text-stone-500 uppercase tracking-widest mt-1">Parada intermedia</p></div>
                    <div className="flex items-center gap-2 text-stone-600 text-[10px] font-bold uppercase tracking-widest bg-white w-fit px-3 py-1.5 rounded-full border border-stone-100 shadow-sm relative z-10 -ml-1 group-hover:border-amber-200 transition-colors"><Clock size={12} className="text-amber-600/70" /> 1h 10m <span className="text-stone-300">|</span> 95 km</div>
                    <div className="relative group/stop"><div className="absolute -left-[33px] md:-left-[41px] top-1.5 w-4 h-4 bg-white border-[3px] border-stone-300 group-hover/stop:border-amber-400 rounded-full group-hover/stop:scale-125 transition-all duration-300"></div><p className="font-bold text-stone-900 text-lg">Intercambiador de Moncloa</p><p className="text-[10px] text-stone-500 uppercase tracking-widest mt-1 font-bold">Fin del trayecto</p></div>
                  </div>
                </div>
              </div>
            </div>
          </FadeInSection>
        </div>
      </section>

      <section id="rsvp" className="py-16 md:py-24 px-4 bg-stone-900 text-stone-200 relative overflow-hidden">
        <div className="max-w-xl mx-auto relative z-10">
          <FadeInSection>
            <div className="text-center mb-12 md:mb-16">
              <span className="text-amber-500 uppercase tracking-[0.3em] text-xs font-bold mb-4 block">Confirmación</span>
              <h2 className="text-3xl md:text-6xl font-serif text-white mb-4 md:mb-6">¿Nos acompañas?</h2>
              <p className="text-stone-400 font-light text-sm md:text-base">Confirma tu asistencia.</p>
            </div>
            {formStatus === 'success' ? (
              <div className="bg-white/10 backdrop-blur-md border border-white/10 p-8 md:p-10 rounded-[2rem] text-center animate-in zoom-in duration-500">
                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6 text-green-400"><Check size={32} /></div>
                <h3 className="text-2xl font-serif text-white mb-4">¡Gracias por confirmar!</h3>
                <div className="bg-black/20 p-6 rounded-xl text-stone-300 text-sm italic mb-6">Tus datos se han enviado a la hoja de confirmaciones de los novios.</div>
                <button onClick={() => setFormStatus('idle')} className="text-xs uppercase tracking-widest text-stone-400 hover:text-amber-400 transition">Volver al formulario</button>
              </div>
            ) : (
              <form onSubmit={handleSheetRSVP} className="space-y-6 md:space-y-8 bg-white/5 backdrop-blur-sm p-6 md:p-12 rounded-[2rem] md:rounded-[2.5rem] border border-white/10 shadow-2xl">
                <div className="group"><label className="block text-[10px] uppercase tracking-[0.2em] text-stone-500 mb-2 group-focus-within:text-amber-500 transition-colors">Nombre Completo</label><input name="nombre" required className="w-full bg-transparent border-b border-stone-700 py-3 text-base md:text-lg focus:outline-none focus:border-amber-500 transition-colors text-white placeholder-stone-700" placeholder="Ej. Ana García" /></div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                  <div className="group"><label className="block text-[10px] uppercase tracking-[0.2em] text-stone-500 mb-2 group-focus-within:text-amber-500 transition-colors">Asistencia</label><div className="relative"><select name="asistira" className="w-full bg-transparent border-b border-stone-700 py-3 text-base md:text-lg focus:outline-none focus:border-amber-500 transition-colors text-white appearance-none cursor-pointer"><option value="si" className="text-stone-900">Sí, asisto</option><option value="no" className="text-stone-900">No puedo</option></select><ArrowRight className="absolute right-0 top-4 text-stone-600 pointer-events-none rotate-90" size={14} /></div></div>
                  <div className="group"><label className="block text-[10px] uppercase tracking-[0.2em] text-stone-500 mb-2 group-focus-within:text-amber-500 transition-colors">Invitados</label><input name="invitados" type="number" min="1" defaultValue="1" className="w-full bg-transparent border-b border-stone-700 py-3 text-base md:text-lg focus:outline-none focus:border-amber-500 transition-colors text-white" /></div>
                </div>
                <div className="group">
                  <label className="block text-[10px] uppercase tracking-[0.2em] text-stone-500 mb-3 group-focus-within:text-amber-500 transition-colors">Transporte</label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <label className={`flex items-center gap-3 cursor-pointer group/option p-3 rounded-lg border transition-colors ${transporteSeleccionado === 'bus' ? 'border-amber-500 bg-amber-500/10' : 'border-stone-800 hover:border-stone-600'}`}>
                      <input type="radio" name="transporte" value="bus" checked={transporteSeleccionado === 'bus'} onChange={(e) => setTransporteSeleccionado(e.target.value)} className="appearance-none w-4 h-4 border border-stone-500 rounded-full checked:bg-amber-500 checked:border-amber-500 transition-all" />
                      <span className={`${transporteSeleccionado === 'bus' ? 'text-white' : 'text-stone-400 group-hover/option:text-stone-200'} transition-colors text-sm font-medium`}>Autobús</span>
                    </label>
                    <label className={`flex items-center gap-3 cursor-pointer group/option p-3 rounded-lg border transition-colors ${transporteSeleccionado === 'propio' ? 'border-amber-500 bg-amber-500/10' : 'border-stone-800 hover:border-stone-600'}`}>
                      <input type="radio" name="transporte" value="propio" checked={transporteSeleccionado === 'propio'} onChange={(e) => setTransporteSeleccionado(e.target.value)} className="appearance-none w-4 h-4 border border-stone-500 rounded-full checked:bg-amber-500 checked:border-amber-500 transition-all" />
                      <span className={`${transporteSeleccionado === 'propio' ? 'text-white' : 'text-stone-400 group-hover/option:text-stone-200'} transition-colors text-sm font-medium`}>Vehículo Propio</span>
                    </label>
                  </div>
                  {transporteSeleccionado === 'bus' && (
                    <div className="mt-4 p-4 md:p-5 bg-black/20 rounded-xl border border-white/10 animate-in fade-in slide-in-from-top-2 duration-300">
                      <label className="block text-[10px] uppercase tracking-[0.2em] text-stone-400 mb-3">¿Recorrido Completo?</label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <label className="flex items-center gap-3 cursor-pointer group/sub p-2 rounded-lg hover:bg-white/5 transition-colors"><input type="radio" name="recorrido" value="completo" defaultChecked className="appearance-none w-3.5 h-3.5 border border-stone-500 rounded-full checked:bg-amber-500 checked:border-amber-500 transition-all" /><span className="text-stone-400 group-hover/sub:text-stone-200 text-sm">Sí (Ida y Vuelta)</span></label>
                        <label className="flex items-center gap-3 cursor-pointer group/sub p-2 rounded-lg hover:bg-white/5 transition-colors"><input type="radio" name="recorrido" value="parcial" className="appearance-none w-3.5 h-3.5 border border-stone-500 rounded-full checked:bg-amber-500 checked:border-amber-500 transition-all" /><span className="text-stone-400 group-hover/sub:text-stone-200 text-sm">No (Solo un tramo)</span></label>
                      </div>
                    </div>
                  )}
                </div>
                <div className="group relative"><div className="flex justify-between items-end mb-2"><label className="block text-[10px] uppercase tracking-[0.2em] text-stone-500 group-focus-within:text-amber-500 transition-colors">Observaciones</label></div><textarea name="observaciones" rows="3" className="w-full bg-transparent border-b border-stone-700 py-3 text-sm focus:outline-none focus:border-amber-500 transition-colors text-white resize-none" placeholder="Alergias, menú infantil... o una bonita dedicatoria." /></div>
                <button type="submit" disabled={formStatus === 'loading'} className="w-full bg-white text-stone-900 py-4 md:py-5 rounded-xl font-bold uppercase tracking-[0.2em] text-xs hover:bg-amber-400 hover:text-stone-900 transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(251,191,36,0.4)] disabled:opacity-50 mt-4">
                  {formStatus === 'loading' ? 'Enviando...' : 'Enviar Respuesta'}
                </button>
              </form>
            )}
          </FadeInSection>
        </div>
      </section>

      <footer className="bg-stone-950 text-stone-600 py-16 md:py-20 px-6 text-center border-t border-stone-900">
        <p className="text-[10px] uppercase tracking-[0.5em] opacity-40 hover:opacity-100 transition-opacity cursor-default">Gemma y Miguel — 2027</p>
      </footer>
    </div>
  );
}
