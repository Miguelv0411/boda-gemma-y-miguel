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
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzEeXDkjVIc1ibIUGxKDc4KLpquNZu2RtcfOo50ku29_gvn4xswWoHErTkXaLZvLWp6/exec';

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
          animation-delay: 1s; /* Aparecen casi al instante para que no te los pierdas */
          animation-fill-mode: both;
        }
        .anim-bird-flap {
          animation: flyFlap 2.5s ease-in-out infinite; /* Vuelo suave */
        }
      `}</style>
      <div className="anim-bird-container">
        <div className="anim-bird-flap flex items-start gap-3 text-[#2A3327]">
          {/* Pájaro 1 (Principal) */}
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-12 h-12 opacity-80 drop-shadow-md">
            <path d="M2 12C5.5 9 9 9 12 12C15 9 18.5 9 22 12C19.5 9 15 9 12 10.5C9 9 4.5 9 2 12Z" />
          </svg>
          {/* Pájaro 2 (Acompañante, más pequeño y un poco atrás) */}
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
    {/* Cola (levantada y sutilmente curvada) */}
    <path d="M 20 30 Q 8 30 10 10 Q 15 5 20 15" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
    {/* Cuerpo */}
    <rect x="18" y="25" width="40" height="20" rx="10" />
    {/* Cabeza */}
    <circle cx="62" cy="20" r="12" />
    {/* Orejas */}
    <polygon points="53,12 56,2 62,9" />
    <polygon points="62,9 68,2 73,12" />
    {/* Patas animadas */}
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
          bottom: 0px; /* Alineados a la base */
          display: flex;
          align-items: flex-end;
          gap: 12px;
          animation: walkAcrossScreen 35s linear infinite; /* Paseo muy tranquilo (35s en cruzar) */
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
          {/* Primer gato (Principal) */}
          <CatSVG className="w-14 h-10 md:w-16 md:h-12 text-[#899A8B]" />
        </div>
        <div className="cat-bounce-delayed pb-0.5">
          {/* Segundo gato, acompañante, un poquito más pequeño y de tono rosado empolvado */}
          <CatSVG className="w-12 h-8 md:w-14 md:h-10 text-[#C29B9B] -ml-2" />
        </div>
      </div>
    </div>
  );
};

// Efecto de hojas cayendo
const FallingLeaves = () => {
  const leaves = useMemo(() => [
    // 1. Cae desde arriba hacia abajo
    { id: 0, startLeft: '20%', startTop: '-20%', endLeft: '30%', endTop: '120%', delay: 2.5, dur: 18, sway: 6, size: 45, rot: -20 },
    // 2. Entra desde el lateral izquierdo superior hacia el centro-derecha abajo
    { id: 1, startLeft: '-10%', startTop: '15%', endLeft: '40%', endTop: '120%', delay: 4.0, dur: 20, sway: 5, size: 52, rot: 15 },
    // 3. Cae desde arriba a la derecha hacia el centro
    { id: 2, startLeft: '80%', startTop: '-20%', endLeft: '60%', endTop: '120%', delay: 5.2, dur: 17, sway: 7, size: 42, rot: 45 },
    // 4. Entra desde el lateral derecho superior hacia la izquierda abajo
    { id: 3, startLeft: '110%', startTop: '25%', endLeft: '50%', endTop: '120%', delay: 7.5, dur: 22, sway: 6, size: 50, rot: -60 },
    // 5. Entra desde el lateral izquierdo medio hacia el centro abajo
    { id: 4, startLeft: '-10%', startTop: '45%', endLeft: '60%', endTop: '120%', delay: 8.8, dur: 19, sway: 5.5, size: 48, rot: 30 }
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
          className="anim-leaf-base text-[#6B7264]"
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
    web: 'lacasaviejasotosalbos.lodgify.com',
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
    desc: 'El sitio idóneo para el vermú o una comida sentada. César, su dueño, es puro encanto.',
    specialty: 'Vermú y Tradición',
    contact: '650 94 99 61',
  },
  {
    name: 'Alejandro Manrique',
    location: 'Sotosalbos',
    desc: 'Horno de asar tradicional en el corazón del pueblo. Calidad y sabor segoviano auténtico.',
    specialty: 'Horno de Asar',
    contact: '921 40 30 77',
  },
  {
    name: 'Paz&Pan',
    location: 'Sotosalbos',
    desc: 'Un refugio acogedor donde el Mediterráneo y el Líbano se fusionan.',
    specialty: 'Fusión Libanesa',
    contact: '921 12 89 42',
  },
  {
    name: 'El Rancho de la Aldegüela',
    location: 'Torrecaballeros',
    desc: 'A 7 min. Un referente para cochinillo y cordero. Ideal comidas familiares.',
    specialty: 'Asados Tradicionales',
    contact: '921 40 10 60',
  },
  {
    name: 'El Huerto de San Roque',
    location: 'Torrecaballeros',
    desc: 'Un rincón con mucho encanto para disfrutar de la buena mesa en un entorno idílico.',
    specialty: 'Tradición y Calidad',
    contact: '641 03 26 00',
  },
  {
    name: 'Ta-Berna Horno de Asar',
    location: 'Collado Hermoso',
    desc: 'Regentado por Berna y Nieves. Fantástico para un picoteo pre o post boda.',
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
      
      // Cálculo exacto forzando el redondeo estricto hacia abajo (floor)
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    };

    // Actualizar el estado inmediatamente para evitar 1 segundo de retraso o parpadeo inicial
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
        <span className="text-4xl sm:text-5xl md:text-7xl font-light font-serif text-[#3E4A3D] tabular-nums tracking-tighter drop-shadow-sm">
          {val.toString().padStart(2, '0')}
        </span>
      </div>
      <span className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-[#899A8B] mt-2 font-bold">
        {label}
      </span>
    </div>
  );

  return (
    <div className="flex justify-center items-center pt-8 md:pt-12 pb-4 md:pb-8 px-4 md:px-12 w-full">
      <TimeBox val={timeLeft.days} label="Días" />
      <div className="h-12 md:h-20 w-px bg-[#899A8B]/20"></div>
      <TimeBox val={timeLeft.hours} label="Horas" />
      <div className="h-12 md:h-20 w-px bg-[#899A8B]/20 hidden sm:block"></div>
      <TimeBox val={timeLeft.minutes} label="Min" />
    </div>
  );
};

// --- APP PRINCIPAL ---
export default function App() {
  const [view, setView] = useState('landing');
  const [rsvps, setRsvps] = useState([]);
  const [formStatus, setFormStatus] = useState('idle');
  const [adminPass, setAdminPass] = useState('');
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loadingData, setLoadingData] = useState(false);
  const [expandedAcc, setExpandedAcc] = useState(null);

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

    // Evita que los navegadores móviles (iOS/Android) conviertan los números de teléfono en enlaces clicables por defecto
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
      alert('⚠️ Error: Falta configurar la URL de Google Sheets en el código.');
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

  // --- VISTA ADMIN (DASHBOARD) ---
  if (view === 'admin') {
    const totalBusPax = rsvps
      .filter((r) => r.asistira === 'si' && r.transporte === 'bus')
      .reduce((acc, curr) => acc + (parseInt(curr.invitados) || 1), 0);

    const totalConfirmados = rsvps
      .filter((r) => r.asistira === 'si')
      .reduce((acc, curr) => acc + (parseInt(curr.invitados) || 1), 0);

    return (
      <div className="min-h-screen bg-[#F7F5F0] font-sans text-[#3E4A3D]">
        <div className="bg-white/80 backdrop-blur-md border-b border-[#EAE6DF] px-4 md:px-6 py-4 flex justify-between items-center sticky top-0 z-50">
          <div className="flex items-center gap-2 md:gap-3">
            <span className="font-serif font-bold text-lg md:text-xl tracking-tight text-[#899A8B]">
              Panel de Gemma y Miguel
            </span>
          </div>
          <button
            onClick={() => setView('landing')}
            className="text-sm font-medium hover:text-[#C29B9B] transition flex items-center gap-2"
          >
            <span className="hidden sm:inline">Ver Web</span>{' '}
            <ArrowRight size={16} />
          </button>
        </div>

        {!isAdminAuthenticated ? (
          <div className="flex items-center justify-center h-[80vh] px-4">
            <div className="bg-white p-8 md:p-10 rounded-2xl shadow-xl border border-[#EAE6DF] w-full max-w-sm text-center">
              <div className="w-16 h-16 bg-[#F7F5F0] rounded-full flex items-center justify-center mx-auto mb-6">
                <Lock className="text-[#899A8B]" size={24} />
              </div>
              <h2 className="text-2xl font-serif mb-2 text-[#3E4A3D]">Acceso Novios</h2>
              <p className="text-[#899A8B] text-sm mb-6">
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
                  className="w-full p-3 text-center text-lg tracking-widest border border-[#EAE6DF] rounded-lg focus:ring-2 focus:ring-[#899A8B] outline-none"
                  value={adminPass}
                  onChange={(e) => setAdminPass(e.target.value)}
                />
                <button className="w-full bg-[#3E4A3D] text-[#F7F5F0] py-3 rounded-lg font-medium hover:bg-[#4A5749] transition">
                  Entrar al Panel
                </button>
              </form>
            </div>
          </div>
        ) : (
          <div className="max-w-6xl mx-auto p-4 md:p-10">
            {/* Aviso Conexión */}
            {!GOOGLE_SCRIPT_URL && (
              <div className="bg-red-50 border border-red-200 text-red-800 p-4 rounded-xl mb-8 flex items-start gap-3">
                <Database className="flex-shrink-0 mt-1" size={20} />
                <div>
                  <p className="font-bold text-sm uppercase tracking-wide">
                    Falta Configuración
                  </p>
                  <p className="text-sm mt-1 opacity-90">
                    Aún no has puesto la URL de tu Google Sheet en el código.
                  </p>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-8 md:mb-10">
              <div className="bg-[#3E4A3D] text-[#F7F5F0] p-6 rounded-2xl shadow-lg col-span-1">
                <p className="text-[#899A8B] text-xs uppercase tracking-widest font-bold mb-2">
                  Total Confirmados
                </p>
                <p className="text-4xl md:text-5xl font-serif">
                  {loadingData ? '...' : totalConfirmados}
                </p>
                <p className="text-[#899A8B] text-xs mt-2">Personas</p>
              </div>

              {/* CARD BUS */}
              <div className="bg-[#899A8B] text-white p-6 rounded-2xl shadow-lg col-span-1 relative overflow-hidden group">
                <div className="relative z-10">
                  <p className="text-[#EAE6DF] text-xs uppercase tracking-widest font-bold mb-2 flex items-center gap-2">
                    <Bus size={14} /> Plazas Bus
                  </p>
                  <p className="text-4xl md:text-5xl font-serif mb-4">
                    {loadingData ? '...' : totalBusPax}
                  </p>
                </div>
                <Bus className="absolute -bottom-4 -right-4 text-[#3E4A3D] opacity-10 w-24 h-24 md:w-32 md:h-32 transform -rotate-12" />
              </div>

              {/* CARD ACCIONES */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#EAE6DF] col-span-1 sm:col-span-2 flex flex-col justify-between">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-bold text-lg flex items-center gap-2 text-[#3E4A3D]">
                      <FileSpreadsheet size={18} className="text-[#899A8B]" />{' '}
                      Google Sheets
                    </h3>
                    <p className="text-[#899A8B] text-xs mt-1">
                      Los datos se guardan en tu hoja de cálculo.
                    </p>
                  </div>
                  <button
                    onClick={fetchSheetData}
                    disabled={loadingData}
                    className="p-2 hover:bg-[#F7F5F0] rounded-full transition text-[#899A8B]"
                    title="Recargar datos"
                  >
                    <RefreshCw
                      size={16}
                      className={loadingData ? 'animate-spin' : ''}
                    />
                  </button>
                </div>
                <div className="flex gap-3 mt-auto">
                  <a
                    href="https://docs.google.com/spreadsheets"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 bg-[#F7F5F0] hover:bg-[#EAE6DF] text-[#3E4A3D] py-3 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors"
                  >
                    <ExternalLink size={14} /> Abrir Excel en Drive
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-[#EAE6DF] overflow-hidden">
              <div className="px-4 md:px-6 py-4 border-b border-[#EAE6DF] flex justify-between items-center bg-[#F7F5F0]/50">
                <h3 className="font-bold text-[#3E4A3D]">
                  Listado en Tiempo Real
                </h3>
                <span className="text-xs text-[#899A8B] bg-white px-2 py-1 rounded border border-[#EAE6DF]">
                  {rsvps.length} registros
                </span>
              </div>
              <div className="overflow-x-auto">
                {loadingData ? (
                  <div className="p-8 text-center text-[#899A8B] flex flex-col items-center gap-2">
                    <Loader2 className="animate-spin text-[#C29B9B]" />
                    <span className="text-xs uppercase tracking-widest">
                      Sincronizando con Google...
                    </span>
                  </div>
                ) : rsvps.length === 0 ? (
                  <div className="p-8 text-center text-[#899A8B] italic">
                    Aún no hay datos en la hoja o no se han podido cargar.
                  </div>
                ) : (
                  <table className="w-full text-left text-sm min-w-[600px]">
                    <thead className="bg-[#F7F5F0] text-[#899A8B] uppercase tracking-wider text-xs font-medium">
                      <tr>
                        <th className="px-6 py-4">Fecha</th>
                        <th className="px-6 py-4">Nombre</th>
                        <th className="px-6 py-4 text-center">Estado</th>
                        <th className="px-6 py-4 text-center">Pax</th>
                        <th className="px-6 py-4">Transporte</th>
                        <th className="px-6 py-4">Observaciones</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#EAE6DF]">
                      {rsvps.map((rsvp, idx) => (
                        <tr
                          key={idx}
                          className="hover:bg-[#F7F5F0]/50 transition-colors"
                        >
                          <td className="px-6 py-4 text-xs text-[#899A8B] font-mono">
                            {new Date(rsvp.timestamp).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 font-medium text-[#3E4A3D]">
                            {rsvp.nombre}
                          </td>
                          <td className="px-6 py-4 text-center">
                            <span
                              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide ${
                                rsvp.asistira === 'si'
                                  ? 'bg-[#899A8B]/20 text-[#3E4A3D]'
                                  : 'bg-[#C29B9B]/20 text-[#3E4A3D]'
                              }`}
                            >
                              {rsvp.asistira === 'si'
                                ? 'Confirmado'
                                : 'Rechazado'}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-center font-mono text-[#6B7264]">
                            {rsvp.invitados || 1}
                          </td>
                          <td className="px-6 py-4 text-[#6B7264]">
                            {rsvp.asistira === 'si' ? (
                              rsvp.transporte === 'bus' ? (
                                <span className="flex items-center gap-2 text-[#899A8B] font-medium">
                                  <Bus size={14} /> Bus
                                </span>
                              ) : (
                                <span className="flex items-center gap-2 text-[#B3ABA2]">
                                  <Car size={14} /> Propio
                                </span>
                              )
                            ) : (
                              <span className="text-[#EAE6DF]">-</span>
                            )}
                          </td>
                          <td className="px-6 py-4 text-[#899A8B] max-w-xs truncate">
                            {rsvp.observaciones || '-'}
                          </td>
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

  // --- VISTA PÚBLICA (LANDING) ---
  return (
    <div className="bg-[#F7F5F0] text-[#4A4F46] font-sans selection:bg-[#EAE6DF] selection:text-[#3E4A3D] overflow-x-hidden pt-[60px] md:pt-[64px] relative">
      
      {/* Navbar Floral/Premium */}
      <nav className="fixed top-0 left-0 w-full z-40 transition-all duration-300 bg-[#F7F5F0]/90 backdrop-blur-md border-b border-[#EAE6DF] shadow-sm">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex justify-between items-center">
          <span className="font-serif text-xl md:text-2xl font-bold tracking-tighter text-[#3E4A3D] z-50 relative">
            Gemma y Miguel
          </span>

          {/* Desktop Nav */}
          <div className="hidden lg:flex space-x-10 text-xs uppercase tracking-[0.2em] font-medium items-center text-[#899A8B]">
            <a href="#historia" className="hover:text-[#3E4A3D] transition-colors">Historia</a>
            <a href="#detalles" className="hover:text-[#3E4A3D] transition-colors">Detalles</a>
            <a href="#itinerario" className="hover:text-[#3E4A3D] transition-colors">Itinerario</a>
            <a href="#alojamiento" className="hover:text-[#3E4A3D] transition-colors">Guía</a>
            <a href="#rsvp" className="bg-[#3E4A3D] text-[#F7F5F0] px-6 py-2.5 rounded-full hover:bg-[#899A8B] transition-all hover:shadow-lg transform hover:-translate-y-0.5">
              Confirmar
            </a>
            <button onClick={() => setView('admin')} className="p-2 hover:bg-[#EAE6DF] rounded-full transition text-[#B3ABA2]">
              <Lock size={14} />
            </button>
          </div>

          {/* Mobile Toggle */}
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden z-50 p-2 relative text-[#3E4A3D]">
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-[#F7F5F0]/95 backdrop-blur-xl z-40 flex flex-col items-center justify-center transition-all duration-500 transform ${
          mobileMenuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full pointer-events-none'
        }`}
      >
        <div className="flex flex-col space-y-8 text-center font-serif text-3xl text-[#3E4A3D]">
          <a href="#inicio" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#C29B9B] transition">Inicio</a>
          <a href="#historia" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#C29B9B] transition">Nuestra Historia</a>
          <a href="#detalles" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#C29B9B] transition">Detalles</a>
          <a href="#itinerario" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#C29B9B] transition">Itinerario</a>
          <a href="#alojamiento" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#C29B9B] transition">Guía Local</a>
          <a href="#rsvp" onClick={() => setMobileMenuOpen(false)} className="text-[#899A8B] italic">Confirmar Asistencia</a>
          <button onClick={() => { setMobileMenuOpen(false); setView('admin'); }} className="text-sm font-sans uppercase tracking-widest text-[#B3ABA2] mt-8">
            Acceso Novios
          </button>
        </div>
      </div>

      {/* Hero Section con Integración de Fondo Gradiente */}
      <section
        id="inicio"
        className="relative w-full h-[calc(100dvh-60px)] md:h-[calc(100dvh-64px)] flex items-center justify-center overflow-hidden"
      >
        {/* Fondo borroso para rellenar toda la pantalla sin oscurecer */}
        <div
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://i.postimg.cc/XNw9G4mr/Gemini_Generated_Image_5rucma5rucma5ruc.png')`,
            filter: 'blur(40px)',
          }}
        />

        {/* Imagen principal nítida (bg-contain garantiza que NUNCA se recorte) */}
        <div
          className="absolute inset-0 z-10 bg-contain bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://i.postimg.cc/XNw9G4mr/Gemini_Generated_Image_5rucma5rucma5ruc.png')`,
          }}
        />

        {/* Efecto de pájaros volando */}
        <FlyingBirds />

        {/* Efecto de hojas cayendo */}
        <FallingLeaves />
        
        {/* Gradientes laterales para fundir los bordes */}
        <div className="absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-[#F7F5F0] to-transparent z-20 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-[#F7F5F0] to-transparent z-20 pointer-events-none" />
        
        {/* Gradiente inferior muy corto para no tapar la fecha ni los nombres */}
        <div className="absolute bottom-0 left-0 w-full h-8 md:h-12 bg-gradient-to-t from-[#F7F5F0] to-transparent z-20 pointer-events-none" />
      </section>

      {/* Countdown Section */}
      <section className="bg-transparent relative z-20 pt-8 md:pt-16">
        <div className="max-w-5xl mx-auto">
          <FadeInSection>
            {/* Fijado a las 00:00 exactas de la fecha de la boda, con la zona horaria estricta de Madrid en horario de verano (+02:00) */}
            <Countdown targetDate={new Date('2027-04-24T00:00:00+02:00').getTime()} />
          </FadeInSection>
        </div>
      </section>

      {/* Historia Section */}
      <section
        id="historia"
        className="pt-10 md:pt-12 pb-16 md:pb-20 px-6 md:px-12 max-w-5xl mx-auto text-center relative z-20"
      >
        <FadeInSection>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-12 md:h-16 bg-gradient-to-b from-transparent to-[#899A8B]/30"></div>
          <Sparkles className="mx-auto text-[#C29B9B] mb-6 md:mb-8 opacity-80" size={32} strokeWidth={1} />
          <h2 className="text-3xl md:text-6xl mb-6 md:mb-10 font-serif text-[#3E4A3D]">
            Nuestra Historia
          </h2>
          <p className="text-base md:text-2xl leading-relaxed text-[#6B7264] font-light max-w-3xl mx-auto">
            "Todo comenzó como un encuentro inesperado y se convirtió en el viaje de
            nuestras vidas. Sotosalbos, con sus calles de piedra y atardeceres
            dorados, será el testigo de nuestro 'sí, quiero'. Formáis parte de nuestra historia y queremos que también los seáis de este día."
          </p>
        </FadeInSection>
      </section>

      {/* Detalles Grid */}
      <section
        id="detalles"
        className="py-16 md:py-20 px-4 relative overflow-hidden border-t border-[#EAE6DF]"
      >
        <div className="max-w-7xl mx-auto relative z-10">
          <FadeInSection className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-10">
            {/* Card Ceremonia */}
            <div className="group relative bg-white/60 backdrop-blur-sm p-8 md:p-12 rounded-[2rem] md:rounded-[2.5rem] transition-all duration-500 border border-[#EAE6DF] hover:border-[#899A8B] hover:shadow-2xl hover:shadow-[#899A8B]/5">
              <div className="flex items-center gap-4 md:gap-6 mb-8 md:mb-10">
                <div className="w-12 h-12 md:w-16 md:h-16 flex-shrink-0 flex items-center justify-center bg-[#F7F5F0] rounded-2xl shadow-sm border border-[#EAE6DF] group-hover:scale-110 group-hover:border-[#C29B9B] transition-all duration-500">
                  <Church className="text-[#899A8B] group-hover:text-[#C29B9B] transition-colors" size={24} />
                </div>
                <div>
                  <h3 className="text-2xl md:text-3xl font-serif text-[#3E4A3D] leading-none mb-1 md:mb-2">
                    Ceremonia
                  </h3>
                  <p className="text-[#C29B9B] font-medium uppercase tracking-widest text-[10px]">
                    NUESTRO SÍ, QUIERO
                  </p>
                </div>
              </div>

              <div className="space-y-6 text-[#6B7264] pl-2">
                <div className="flex items-start gap-4 md:gap-5 group/item">
                  <div className="p-2 bg-white rounded-full border border-[#EAE6DF] group-hover/item:border-[#899A8B] transition-colors mt-0.5">
                    <Clock className="text-[#899A8B]" size={16} />
                  </div>
                  <div>
                    <p className="font-bold text-[#3E4A3D] text-lg">11:00 Horas</p>
                    <p className="text-sm font-light">Se ruega puntualidad</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 md:gap-5 group/item">
                  <div className="p-2 bg-white rounded-full border border-[#EAE6DF] group-hover/item:border-[#899A8B] transition-colors mt-0.5">
                    <MapPin className="text-[#899A8B]" size={16} />
                  </div>
                  <div>
                    <p className="font-bold text-[#3E4A3D] text-lg">Iglesia de San Miguel</p>
                    <p className="text-sm font-light">C. de la Iglesia, 4, Sotosalbos</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 md:gap-5 group/item">
                  <div className="p-2 bg-white rounded-full border border-[#EAE6DF] group-hover/item:border-[#899A8B] transition-colors mt-0.5">
                    <Car className="text-[#899A8B]" size={16} />
                  </div>
                  <div>
                    <p className="font-bold text-[#3E4A3D] text-lg">Parking</p>
                    <p className="text-sm font-light">Zona de aparcamiento cercana</p>
                  </div>
                </div>
              </div>
              <a
                href="https://www.google.com/maps/search/?api=1&query=Iglesia+de+San+Miguel+Sotosalbos"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-8 md:mt-10 ml-2 text-xs font-bold uppercase tracking-[0.2em] text-[#899A8B] hover:text-[#3E4A3D] transition-colors group/link"
              >
                CÓMO LLEGAR <ArrowRight size={14} className="group-hover/link:translate-x-1 transition-transform" />
              </a>
            </div>

            {/* Card Celebración */}
            <div className="group relative bg-white/60 backdrop-blur-sm p-8 md:p-12 rounded-[2rem] md:rounded-[2.5rem] transition-all duration-500 border border-[#EAE6DF] hover:border-[#899A8B] hover:shadow-2xl hover:shadow-[#899A8B]/5">
              <div className="flex items-center gap-4 md:gap-6 mb-8 md:mb-10">
                <div className="w-12 h-12 md:w-16 md:h-16 flex-shrink-0 flex items-center justify-center bg-[#F7F5F0] rounded-2xl shadow-sm border border-[#EAE6DF] group-hover:scale-110 group-hover:border-[#C29B9B] transition-all duration-500">
                  <Utensils className="text-[#899A8B] group-hover:text-[#C29B9B] transition-colors" size={24} />
                </div>
                <div>
                  <h3 className="text-2xl md:text-3xl font-serif text-[#3E4A3D] leading-none mb-1 md:mb-2">
                    Celebración
                  </h3>
                  <p className="text-[#C29B9B] font-medium uppercase tracking-widest text-[10px]">
                    Cóctel y Banquete
                  </p>
                </div>
              </div>

              <div className="space-y-6 text-[#6B7264] pl-2">
                <div className="flex items-start gap-4 md:gap-5 group/item">
                  <div className="p-2 bg-white rounded-full border border-[#EAE6DF] group-hover/item:border-[#899A8B] transition-colors mt-0.5">
                    <Clock className="text-[#899A8B]" size={16} />
                  </div>
                  <div>
                    <p className="font-bold text-[#3E4A3D] text-lg">13:00 Horas</p>
                    <p className="text-sm font-light">Hasta que el cuerpo aguante</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 md:gap-5 group/item">
                  <div className="p-2 bg-white rounded-full border border-[#EAE6DF] group-hover/item:border-[#899A8B] transition-colors mt-0.5">
                    <MapPin className="text-[#899A8B]" size={16} />
                  </div>
                  <div>
                    <p className="font-bold text-[#3E4A3D] text-lg">Mencía de Sotosalbos</p>
                    <p className="text-sm font-light">Ctra. Segovia a Soria, km 172</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 md:gap-5 group/item">
                  <div className="p-2 bg-white rounded-full border border-[#EAE6DF] group-hover/item:border-[#899A8B] transition-colors mt-0.5">
                    <Car className="text-[#899A8B]" size={16} />
                  </div>
                  <div>
                    <p className="font-bold text-[#3E4A3D] text-lg">Parking</p>
                    <p className="text-sm font-light">Parking privado en la finca</p>
                  </div>
                </div>
              </div>
              <a
                href="https://www.google.com/maps/search/?api=1&query=Finca+Mencía+Sotosalbos"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-8 md:mt-10 ml-2 text-xs font-bold uppercase tracking-[0.2em] text-[#899A8B] hover:text-[#3E4A3D] transition-colors group/link"
              >
                CÓMO LLEGAR <ArrowRight size={14} className="group-hover/link:translate-x-1 transition-transform" />
              </a>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* Itinerario Section */}
      <section id="itinerario" className="py-16 md:py-20 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <FadeInSection>
            <div className="text-center mb-12 md:mb-16">
              <span className="text-[#C29B9B] text-xs font-bold uppercase tracking-[0.3em] mb-4 block">Timeline</span>
              <h2 className="text-3xl md:text-5xl font-serif text-[#3E4A3D] mb-6">El Gran Día</h2>
              <div className="w-16 md:w-24 h-px bg-[#EAE6DF] mx-auto"></div>
            </div>

            <div className="relative">
              <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-[#EAE6DF] transform md:-translate-x-1/2"></div>
              <div className="space-y-12">
                
                {/* 10:30 */}
                <div className="relative flex flex-col md:flex-row items-start md:items-center md:justify-between group pl-12 md:pl-0">
                  <div className="md:w-5/12 text-left md:text-right md:pr-12 w-full order-2 md:order-1 mt-2 md:mt-0">
                    <h4 className="font-serif text-xl md:text-2xl text-[#3E4A3D]">Llegada de Invitados</h4>
                    <p className="text-[#8B9185] text-sm mt-1">Bienvenida en la Iglesia de San Miguel</p>
                  </div>
                  <div className="absolute left-4 md:left-1/2 w-4 h-4 bg-[#F7F5F0] border-4 border-[#C29B9B] rounded-full transform -translate-x-1/2 z-10 group-hover:scale-125 transition-transform duration-300 mt-1 md:mt-0"></div>
                  <div className="md:w-5/12 md:pl-12 w-full text-left order-1 md:order-3">
                    <span className="inline-block px-3 py-1 bg-white border border-[#EAE6DF] rounded-full text-[10px] md:text-xs font-bold tracking-widest text-[#C29B9B] shadow-sm">10:30</span>
                  </div>
                </div>

                {/* 11:00 */}
                <div className="relative flex flex-col md:flex-row-reverse items-start md:items-center md:justify-between group pl-12 md:pl-0">
                  <div className="md:w-5/12 text-left md:pl-12 w-full order-2 md:order-1 mt-2 md:mt-0">
                    <h4 className="font-serif text-xl md:text-2xl text-[#3E4A3D]">Ceremonia</h4>
                    <p className="text-[#8B9185] text-sm mt-1">El "Sí, quiero" más esperado</p>
                  </div>
                  <div className="absolute left-4 md:left-1/2 w-4 h-4 bg-[#F7F5F0] border-4 border-[#899A8B] rounded-full transform -translate-x-1/2 z-10 group-hover:scale-125 transition-transform duration-300 group-hover:border-[#3E4A3D] mt-1 md:mt-0"></div>
                  <div className="md:w-5/12 md:pr-12 w-full text-left md:text-right order-1 md:order-3">
                    <span className="inline-block px-3 py-1 bg-white border border-[#EAE6DF] rounded-full text-[10px] md:text-xs font-bold tracking-widest text-[#899A8B] shadow-sm">11:00</span>
                  </div>
                </div>

                {/* 13:00 */}
                <div className="relative flex flex-col md:flex-row items-start md:items-center md:justify-between group pl-12 md:pl-0">
                  <div className="md:w-5/12 text-left md:text-right md:pr-12 w-full order-2 md:order-1 mt-2 md:mt-0">
                    <h4 className="font-serif text-xl md:text-2xl text-[#3E4A3D]">Cóctel de Bienvenida</h4>
                    <p className="text-[#8B9185] text-sm mt-1">Música en vivo en los jardines</p>
                  </div>
                  <div className="absolute left-4 md:left-1/2 w-8 h-8 md:w-10 md:h-10 bg-white border border-[#EAE6DF] rounded-full flex items-center justify-center transform -translate-x-1/2 z-10 shadow-sm group-hover:scale-110 transition-transform mt-0 md:mt-0">
                    <Wine size={14} className="text-[#C29B9B]" />
                  </div>
                  <div className="md:w-5/12 md:pl-12 w-full text-left order-1 md:order-3">
                    <span className="inline-block px-3 py-1 bg-white border border-[#EAE6DF] rounded-full text-[10px] md:text-xs font-bold tracking-widest text-[#899A8B] shadow-sm">13:00</span>
                  </div>
                </div>

                {/* 15:00 */}
                <div className="relative flex flex-col md:flex-row-reverse items-start md:items-center md:justify-between group pl-12 md:pl-0">
                  <div className="md:w-5/12 text-left md:pl-12 w-full order-2 md:order-1 mt-2 md:mt-0">
                    <h4 className="font-serif text-xl md:text-2xl text-[#3E4A3D]">Banquete</h4>
                    <p className="text-[#8B9185] text-sm mt-1">Gastronomía local con toque moderno</p>
                  </div>
                  <div className="absolute left-4 md:left-1/2 w-8 h-8 md:w-10 md:h-10 bg-white border border-[#EAE6DF] rounded-full flex items-center justify-center transform -translate-x-1/2 z-10 shadow-sm group-hover:scale-110 transition-transform mt-0 md:mt-0">
                    <Utensils size={14} className="text-[#C29B9B]" />
                  </div>
                  <div className="md:w-5/12 md:pr-12 w-full text-left md:text-right order-1 md:order-3">
                    <span className="inline-block px-3 py-1 bg-white border border-[#EAE6DF] rounded-full text-[10px] md:text-xs font-bold tracking-widest text-[#899A8B] shadow-sm">15:00</span>
                  </div>
                </div>

                {/* 18:30 */}
                <div className="relative flex flex-col md:flex-row items-start md:items-center md:justify-between group pl-12 md:pl-0">
                  <div className="md:w-5/12 text-left md:text-right md:pr-12 w-full order-2 md:order-1 mt-2 md:mt-0">
                    <h4 className="font-serif text-xl md:text-2xl text-[#3E4A3D]">Fiesta y Barra Libre</h4>
                    <p className="text-[#8B9185] text-sm mt-1">¡Baile hasta que se ponga el sol!</p>
                  </div>
                  <div className="absolute left-4 md:left-1/2 w-8 h-8 md:w-10 md:h-10 bg-[#3E4A3D] border border-[#3E4A3D] rounded-full flex items-center justify-center transform -translate-x-1/2 z-10 shadow-sm group-hover:scale-110 transition-transform mt-0 md:mt-0">
                    <Music size={14} className="text-[#F7F5F0]" />
                  </div>
                  <div className="md:w-5/12 md:pl-12 w-full text-left order-1 md:order-3">
                    <span className="inline-block px-3 py-1 bg-[#3E4A3D] text-white rounded-full text-[10px] md:text-xs font-bold tracking-widest shadow-sm">18:30</span>
                  </div>
                </div>
              </div>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* --- SECCIÓN ALOJAMIENTO --- */}
      <section id="alojamiento" className="py-16 md:py-20 px-4 relative">
        <div className="max-w-6xl mx-auto relative z-10">
          <FadeInSection>
            <div className="text-center mb-12 md:mb-16">
              <span className="text-[#899A8B] text-xs font-bold uppercase tracking-[0.3em] mb-4 block">
                Para Descansar
              </span>
              <h2 className="text-3xl md:text-5xl font-serif text-[#3E4A3D] mb-6">
                Alojamientos Recomendados
              </h2>
              <p className="text-[#6B7264] font-light max-w-2xl mx-auto text-sm md:text-base">
                Hemos seleccionado las mejores opciones cerca de la finca para
                que disfrutéis sin preocupaciones.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {accommodations.map((acc, index) => (
                <div
                  key={index}
                  onClick={() => setExpandedAcc(expandedAcc === index ? null : index)}
                  className="cursor-pointer bg-white/80 backdrop-blur-sm p-5 md:p-6 rounded-2xl shadow-sm border border-[#EAE6DF] hover:shadow-md hover:border-[#899A8B] transition-all duration-300 flex flex-col group"
                >
                  <div className="flex justify-between items-start mb-3">
                    <span className="bg-[#F7F5F0] text-[#3E4A3D] text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest border border-[#EAE6DF]">
                      {acc.tag}
                    </span>
                    <Bed size={18} className="text-[#B3ABA2] group-hover:text-[#899A8B] transition-colors" />
                  </div>
                  <h3 className="text-xl font-serif text-[#3E4A3D] mb-1">
                    {acc.name}
                  </h3>
                  <p className="text-[10px] font-bold text-[#899A8B] uppercase tracking-widest">
                    {acc.type}
                  </p>

                  <div
                    className={`grid transition-all duration-300 ease-in-out ${
                      expandedAcc === index
                        ? 'grid-rows-[1fr] opacity-100 mt-4'
                        : 'grid-rows-[0fr] opacity-0 mt-0'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="pt-4 border-t border-[#EAE6DF] flex flex-col gap-4">
                        <p className="text-[#6B7264] text-sm leading-relaxed">
                          {acc.desc}
                        </p>
                        <div className="space-y-3">
                          <div className="flex items-center gap-3 text-sm text-[#899A8B]">
                            <Phone size={14} className="flex-shrink-0" /> <span>{acc.contact}</span>
                          </div>
                          {acc.web && (
                            <a 
                              href={acc.web.startsWith('http') ? acc.web : `https://${acc.web}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="flex items-center gap-3 text-sm text-[#899A8B] hover:text-[#3E4A3D] transition truncate"
                            >
                              <Globe size={14} className="flex-shrink-0" />{' '}
                              <span className="truncate">{acc.web}</span>
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[#F7F5F0] flex items-center justify-center gap-2 text-[10px] uppercase tracking-widest text-[#B3ABA2] group-hover:text-[#C29B9B] transition-colors">
                    {expandedAcc === index ? 'Cerrar detalle' : 'Ver detalle'}
                    <ArrowRight
                      size={12}
                      className={`transform transition-transform duration-300 ${
                        expandedAcc === index ? '-rotate-90' : 'rotate-90'
                      }`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* --- SECCIÓN GASTRONOMÍA --- */}
      <section
        id="gastronomia"
        className="py-16 md:py-20 px-4 relative overflow-hidden"
      >
        <div className="max-w-6xl mx-auto relative z-10">
          <FadeInSection>
            <div className="text-center mb-12 md:mb-16">
              <span className="text-[#C29B9B] text-xs font-bold uppercase tracking-[0.3em] mb-4 block">
                Sabores Locales
              </span>
              <h2 className="text-3xl md:text-5xl font-serif text-[#3E4A3D] mb-6">
                Gastronomía Cercana
              </h2>
              <p className="text-[#6B7264] font-light max-w-2xl mx-auto text-sm md:text-base">
                Para disfrutar antes o después de la boda. Nuestros favoritos
                para vermú, asados o picoteo.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {restaurants.map((rest, index) => (
                <div
                  key={index}
                  className="group relative bg-white/60 backdrop-blur-sm p-6 md:p-8 rounded-3xl overflow-hidden hover:bg-[#F7F5F0] transition-colors duration-500 border border-[#EAE6DF]"
                >
                  <div className="absolute top-0 right-0 bg-white p-4 rounded-bl-3xl z-10 border-l border-b border-[#EAE6DF]">
                    {rest.icon ? (
                      rest.icon
                    ) : (
                      <UtensilsCrossed
                        size={20}
                        className="text-[#C29B9B] group-hover:text-[#899A8B] transition-colors"
                      />
                    )}
                  </div>

                  <div className="relative z-10">
                    <div className="mb-6">
                      <h3 className="text-xl md:text-2xl font-serif text-[#3E4A3D] mb-1">
                        {rest.name}
                      </h3>
                      <div className="flex items-center gap-2 text-[#899A8B] text-xs uppercase tracking-widest">
                        <MapPin size={12} /> {rest.location}
                      </div>
                    </div>

                    <p className="text-[#6B7264] text-sm leading-relaxed mb-6 transition-colors">
                      {rest.desc}
                    </p>

                    <div className="flex justify-between items-end border-t border-[#EAE6DF] pt-6 transition-colors">
                      <div>
                        <span className="block text-[10px] uppercase text-[#B3ABA2] mb-1">
                          Especialidad
                        </span>
                        <span className="text-[#899A8B] font-medium text-sm">
                          {rest.specialty}
                        </span>
                      </div>
                      <span className="text-[#3E4A3D] text-sm font-mono">
                        {rest.contact}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* --- SECCIÓN RUTA AUTOBÚS --- */}
      <section id="autobus" className="py-16 md:py-20 px-4 relative bg-[#F7F5F0] border-t border-[#EAE6DF]">
        <div className="max-w-5xl mx-auto relative z-10">
          <FadeInSection>
            <div className="text-center mb-12 md:mb-16">
              <span className="text-[#899A8B] text-xs font-bold uppercase tracking-[0.3em] mb-4 block">
                Transporte
              </span>
              <h2 className="text-3xl md:text-5xl font-serif text-[#3E4A3D] mb-6">
                Ruta del Autobús
              </h2>
              <p className="text-[#6B7264] font-light max-w-2xl mx-auto text-sm md:text-base">
                Para vuestra mayor comodidad, dispondremos de un servicio de autobús que realizará el siguiente recorrido.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
              {/* RUTA DE IDA */}
              <div className="bg-white/60 backdrop-blur-sm p-8 md:p-10 rounded-[2rem] border border-[#EAE6DF] hover:border-[#899A8B] transition-colors duration-500 shadow-sm">
                <div className="flex items-center gap-4 mb-10">
                  <div className="w-12 h-12 flex items-center justify-center bg-[#F7F5F0] rounded-2xl shadow-sm border border-[#EAE6DF]">
                    <Bus className="text-[#899A8B]" size={20} />
                  </div>
                  <h3 className="text-2xl font-serif text-[#3E4A3D]">Ruta de Ida</h3>
                </div>
                
                <div className="relative pl-6 md:pl-8">
                  {/* Línea conectora */}
                  <div className="absolute left-[7px] md:left-[15px] top-2 bottom-2 w-px bg-[#EAE6DF]"></div>
                  
                  <div className="flex flex-col gap-5 md:gap-6">
                    <div className="relative group">
                      <div className="absolute -left-[33px] md:-left-[41px] top-1.5 w-4 h-4 bg-[#F7F5F0] border-[3px] border-[#899A8B] rounded-full group-hover:scale-125 transition-transform duration-300"></div>
                      <p className="font-bold text-[#3E4A3D] text-lg">Intercambiador de Moncloa</p>
                      <p className="text-[10px] text-[#899A8B] uppercase tracking-widest mt-1 font-bold">Salida principal</p>
                    </div>

                    <div className="flex items-center gap-2 text-[#899A8B] text-[10px] font-bold uppercase tracking-widest bg-white w-fit px-3 py-1.5 rounded-full border border-[#EAE6DF] shadow-sm relative z-10 -ml-1">
                       <Clock size={12} className="text-[#C29B9B]" /> 1h 10m <span className="text-[#EAE6DF]">|</span> 95 km
                    </div>

                    <div className="relative group">
                      <div className="absolute -left-[33px] md:-left-[41px] top-1.5 w-4 h-4 bg-[#F7F5F0] border-[3px] border-[#899A8B] rounded-full group-hover:scale-125 transition-transform duration-300"></div>
                      <p className="font-bold text-[#3E4A3D] text-lg">Torrecaballeros</p>
                      <p className="text-[10px] text-[#899A8B] uppercase tracking-widest mt-1">Parada intermedia</p>
                    </div>

                    <div className="flex items-center gap-2 text-[#899A8B] text-[10px] font-bold uppercase tracking-widest bg-white w-fit px-3 py-1.5 rounded-full border border-[#EAE6DF] shadow-sm relative z-10 -ml-1">
                       <Clock size={12} className="text-[#C29B9B]" /> 10 min <span className="text-[#EAE6DF]">|</span> 9 km
                    </div>

                    <div className="relative group">
                      <div className="absolute -left-[33px] md:-left-[41px] top-1.5 w-4 h-4 bg-[#F7F5F0] border-[3px] border-[#899A8B] rounded-full group-hover:scale-125 transition-transform duration-300"></div>
                      <p className="font-bold text-[#3E4A3D] text-lg">Iglesia de Sotosalbos</p>
                      <p className="text-[10px] text-[#C29B9B] uppercase tracking-widest mt-1 font-bold">Ceremonia</p>
                    </div>

                    <div className="flex items-center gap-2 text-[#899A8B] text-[10px] font-bold uppercase tracking-widest bg-white w-fit px-3 py-1.5 rounded-full border border-[#EAE6DF] shadow-sm relative z-10 -ml-1">
                       <Clock size={12} className="text-[#C29B9B]" /> 2 min <span className="text-[#EAE6DF]">|</span> 1 km
                    </div>

                    <div className="relative group">
                      <div className="absolute -left-[33px] md:-left-[41px] top-1.5 w-4 h-4 bg-white border-[3px] border-[#C29B9B] rounded-full shadow-sm group-hover:scale-125 transition-transform duration-300"></div>
                      <p className="font-bold text-[#3E4A3D] text-lg">Finca Mencía de Sotosalbos</p>
                      <p className="text-[10px] text-[#899A8B] uppercase tracking-widest mt-1">Continuación tras la ceremonia</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* RUTA DE VUELTA */}
              <div className="bg-white/60 backdrop-blur-sm p-8 md:p-10 rounded-[2rem] border border-[#EAE6DF] hover:border-[#899A8B] transition-colors duration-500 shadow-sm">
                <div className="flex items-center gap-4 mb-10">
                  <div className="w-12 h-12 flex items-center justify-center bg-[#F7F5F0] rounded-2xl shadow-sm border border-[#EAE6DF]">
                    <Bus className="text-[#C29B9B]" size={20} />
                  </div>
                  <h3 className="text-2xl font-serif text-[#3E4A3D]">Ruta de Vuelta</h3>
                </div>
                
                <div className="relative pl-6 md:pl-8">
                  {/* Línea conectora */}
                  <div className="absolute left-[7px] md:left-[15px] top-2 bottom-2 w-px bg-[#EAE6DF]"></div>
                  
                  <div className="flex flex-col gap-5 md:gap-6">
                    <div className="relative group">
                      <div className="absolute -left-[33px] md:-left-[41px] top-1.5 w-4 h-4 bg-white border-[3px] border-[#C29B9B] rounded-full shadow-sm group-hover:scale-125 transition-transform duration-300"></div>
                      <p className="font-bold text-[#3E4A3D] text-lg">Finca Mencía de Sotosalbos</p>
                      <p className="text-[10px] text-[#C29B9B] uppercase tracking-widest mt-1 font-bold">Fin de fiesta y recogida</p>
                    </div>

                    <div className="flex items-center gap-2 text-[#899A8B] text-[10px] font-bold uppercase tracking-widest bg-white w-fit px-3 py-1.5 rounded-full border border-[#EAE6DF] shadow-sm relative z-10 -ml-1">
                       <Clock size={12} className="text-[#C29B9B]" /> 2 min <span className="text-[#EAE6DF]">|</span> 1 km
                    </div>

                    <div className="relative group">
                      <div className="absolute -left-[33px] md:-left-[41px] top-1.5 w-4 h-4 bg-[#F7F5F0] border-[3px] border-[#899A8B] rounded-full group-hover:scale-125 transition-transform duration-300"></div>
                      <p className="font-bold text-[#3E4A3D] text-lg">Iglesia de Sotosalbos</p>
                      <p className="text-[10px] text-[#899A8B] uppercase tracking-widest mt-1">Parada intermedia</p>
                    </div>

                    <div className="flex items-center gap-2 text-[#899A8B] text-[10px] font-bold uppercase tracking-widest bg-white w-fit px-3 py-1.5 rounded-full border border-[#EAE6DF] shadow-sm relative z-10 -ml-1">
                       <Clock size={12} className="text-[#C29B9B]" /> 10 min <span className="text-[#EAE6DF]">|</span> 9 km
                    </div>

                    <div className="relative group">
                      <div className="absolute -left-[33px] md:-left-[41px] top-1.5 w-4 h-4 bg-[#F7F5F0] border-[3px] border-[#899A8B] rounded-full group-hover:scale-125 transition-transform duration-300"></div>
                      <p className="font-bold text-[#3E4A3D] text-lg">Torrecaballeros</p>
                      <p className="text-[10px] text-[#899A8B] uppercase tracking-widest mt-1">Parada intermedia</p>
                    </div>

                    <div className="flex items-center gap-2 text-[#899A8B] text-[10px] font-bold uppercase tracking-widest bg-white w-fit px-3 py-1.5 rounded-full border border-[#EAE6DF] shadow-sm relative z-10 -ml-1">
                       <Clock size={12} className="text-[#C29B9B]" /> 1h 10m <span className="text-[#EAE6DF]">|</span> 95 km
                    </div>

                    <div className="relative group">
                      <div className="absolute -left-[33px] md:-left-[41px] top-1.5 w-4 h-4 bg-[#F7F5F0] border-[3px] border-[#899A8B] rounded-full group-hover:scale-125 transition-transform duration-300"></div>
                      <p className="font-bold text-[#3E4A3D] text-lg">Intercambiador de Moncloa</p>
                      <p className="text-[10px] text-[#899A8B] uppercase tracking-widest mt-1 font-bold">Fin del trayecto</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* RSVP Section */}
      <section
        id="rsvp"
        className="py-16 md:py-24 px-4 bg-[#3E4A3D] text-[#F7F5F0] relative overflow-hidden"
      >
        <div className="max-w-xl mx-auto relative z-10">
          <FadeInSection>
            <div className="text-center mb-12 md:mb-16">
              <span className="text-[#C29B9B] uppercase tracking-[0.3em] text-xs font-bold mb-4 block">
                Confirmación
              </span>
              <h2 className="text-3xl md:text-6xl font-serif text-white mb-4 md:mb-6">
                ¿Nos acompañas?
              </h2>
              <p className="text-[#B3ABA2] font-light text-sm md:text-base">
                Confirma tu asistencia antes del 24 de Marzo.
              </p>
            </div>

            {formStatus === 'success' ? (
              <div className="bg-white/5 backdrop-blur-md border border-[#899A8B]/30 p-8 md:p-10 rounded-[2rem] text-center animate-in zoom-in duration-500">
                <div className="w-16 h-16 bg-[#899A8B]/20 rounded-full flex items-center justify-center mx-auto mb-6 text-[#899A8B]">
                  <Check size={32} />
                </div>
                <h3 className="text-2xl font-serif text-white mb-4">
                  ¡Gracias por confirmar!
                </h3>
                <div className="bg-black/20 p-6 rounded-xl text-[#EAE6DF] text-sm italic mb-6">
                  <Sparkles size={12} className="inline text-[#C29B9B] mr-2" />
                  Tus datos se han enviado a la hoja de confirmaciones de los novios.
                </div>
                <button
                  onClick={() => setFormStatus('idle')}
                  className="text-xs uppercase tracking-widest text-[#B3ABA2] hover:text-[#C29B9B] transition"
                >
                  Volver al formulario
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSheetRSVP}
                className="space-y-6 md:space-y-8 bg-[#F7F5F0]/5 backdrop-blur-sm p-6 md:p-12 rounded-[2rem] md:rounded-[2.5rem] border border-[#F7F5F0]/10 shadow-2xl"
              >
                <div className="group">
                  <label className="block text-[10px] uppercase tracking-[0.2em] text-[#B3ABA2] mb-2 group-focus-within:text-[#C29B9B] transition-colors">
                    Nombre Completo
                  </label>
                  <input
                    name="nombre"
                    required
                    className="w-full bg-transparent border-b border-[#F7F5F0]/30 py-3 text-base md:text-lg focus:outline-none focus:border-[#899A8B] transition-colors text-white placeholder-[#F7F5F0]/30"
                    placeholder="Ej. Ana García"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                  <div className="group">
                    <label className="block text-[10px] uppercase tracking-[0.2em] text-[#B3ABA2] mb-2 group-focus-within:text-[#C29B9B] transition-colors">
                      Asistencia
                    </label>
                    <div className="relative">
                      <select
                        name="asistira"
                        className="w-full bg-transparent border-b border-[#F7F5F0]/30 py-3 text-base md:text-lg focus:outline-none focus:border-[#899A8B] transition-colors text-white appearance-none cursor-pointer"
                      >
                        <option value="si" className="text-[#3E4A3D]">Sí, asisto</option>
                        <option value="no" className="text-[#3E4A3D]">No puedo</option>
                      </select>
                      <ArrowRight className="absolute right-0 top-4 text-[#B3ABA2] pointer-events-none rotate-90" size={14} />
                    </div>
                  </div>
                  <div className="group">
                    <label className="block text-[10px] uppercase tracking-[0.2em] text-[#B3ABA2] mb-2 group-focus-within:text-[#C29B9B] transition-colors">
                      Invitados
                    </label>
                    <input
                      name="invitados"
                      type="number"
                      min="1"
                      defaultValue="1"
                      className="w-full bg-transparent border-b border-[#F7F5F0]/30 py-3 text-base md:text-lg focus:outline-none focus:border-[#899A8B] transition-colors text-white"
                    />
                  </div>
                </div>

                <div className="group">
                  <label className="block text-[10px] uppercase tracking-[0.2em] text-[#B3ABA2] mb-3 group-focus-within:text-[#C29B9B] transition-colors">
                    Transporte
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <label className="flex items-center gap-3 cursor-pointer group/option p-3 rounded-lg border border-[#F7F5F0]/20 hover:border-[#899A8B] transition-colors">
                      <input
                        type="radio"
                        name="transporte"
                        value="bus"
                        className="appearance-none w-4 h-4 border border-[#F7F5F0]/50 rounded-full checked:bg-[#899A8B] checked:border-[#899A8B] transition-all"
                        defaultChecked
                      />
                      <span className="text-[#EAE6DF] group-hover/option:text-white transition-colors text-sm font-medium">
                        Autobús (Ida/Vuelta)
                      </span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer group/option p-3 rounded-lg border border-[#F7F5F0]/20 hover:border-[#899A8B] transition-colors">
                      <input
                        type="radio"
                        name="transporte"
                        value="propio"
                        className="appearance-none w-4 h-4 border border-[#F7F5F0]/50 rounded-full checked:bg-[#899A8B] checked:border-[#899A8B] transition-all"
                      />
                      <span className="text-[#EAE6DF] group-hover/option:text-white transition-colors text-sm font-medium">
                        Vehículo Propio
                      </span>
                    </label>
                  </div>
                </div>

                <div className="group relative">
                  <div className="flex justify-between items-end mb-2">
                    <label className="block text-[10px] uppercase tracking-[0.2em] text-[#B3ABA2] group-focus-within:text-[#C29B9B] transition-colors">
                      Observaciones
                    </label>
                  </div>
                  <textarea
                    name="observaciones"
                    rows="3"
                    className="w-full bg-transparent border-b border-[#F7F5F0]/30 py-3 text-sm focus:outline-none focus:border-[#899A8B] transition-colors text-white resize-none"
                    placeholder="Alergias, menú infantil... o una bonita dedicatoria."
                  />
                </div>

                <button
                  type="submit"
                  disabled={formStatus === 'loading'}
                  className="w-full bg-[#C29B9B] text-white py-4 md:py-5 rounded-xl font-bold uppercase tracking-[0.2em] text-xs hover:bg-[#899A8B] transition-all shadow-lg disabled:opacity-50 mt-4"
                >
                  {formStatus === 'loading' ? 'Enviando...' : 'Enviar Respuesta'}
                </button>

                {/* Enlace Eterno Digital */}
                <div className="mt-8 flex justify-center">
                  <a
                    href="https://eterno-digital.netlify.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#2C3629] border border-[#F7F5F0]/10 hover:border-[#C29B9B]/50 hover:bg-[#232B21] transition-all duration-300"
                  >
                    <Sparkles size={12} className="text-[#899A8B] group-hover:text-[#C29B9B] transition-colors" />
                    <span className="text-[10px] uppercase tracking-widest font-medium text-[#B3ABA2] group-hover:text-[#EAE6DF] transition-colors">
                      Web creada por <span className="text-white group-hover:text-[#C29B9B] font-bold ml-1">Eterno Digital</span>
                    </span>
                  </a>
                </div>
              </form>
            )}
          </FadeInSection>
        </div>
      </section>

      {/* Footer Minimalista */}
      <footer className="bg-[#2A3327] text-[#8B9185] py-16 md:py-20 px-6 text-center border-t border-[#1F261D]">
        <p className="text-[10px] uppercase tracking-[0.5em] opacity-40 hover:opacity-100 transition-opacity cursor-default">
          Gemma y Miguel — 2027
        </p>
      </footer>
    </div>
  );
}
