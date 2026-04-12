import React, { useState, useEffect, useRef } from 'react';
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
// IMPORTANTE: Sigue las instrucciones del archivo "Instrucciones_Google_Sheets.md"
// y pega aquí la URL de tu Web App de Google Apps Script.
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzEeXDkjVIc1ibIUGxKDc4KLpquNZu2RtcfOo50ku29_gvn4xswWoHErTkXaLZvLWp6/exec';

// --- UTILS & HOOKS ---

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

const FormattedText = ({ text, className = '' }) => {
  if (!text) return null;
  const processLine = (line) => {
    const parts = line.split(/(\*\*.*?\*\*|\*.*?\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**'))
        return (
          <strong key={i} className="font-bold text-amber-900">
            {part.slice(2, -2)}
          </strong>
        );
      if (part.startsWith('*') && part.endsWith('*'))
        return (
          <em key={i} className="italic text-stone-600">
            {part.slice(1, -1)}
          </em>
        );
      return part;
    });
  };
  return (
    <div className={`space-y-3 ${className}`}>
      {text.split('\n').map((line, i) => (
        <p key={i} className="leading-relaxed text-stone-600">
          {line.startsWith('- ') || line.startsWith('* ') ? (
            <span className="flex items-start">
              <span className="mr-3 text-amber-500 mt-1.5 h-1.5 w-1.5 rounded-full bg-amber-500 flex-shrink-0"></span>
              <span>{processLine(line.substring(2))}</span>
            </span>
          ) : (
            processLine(line)
          )}
        </p>
      ))}
    </div>
  );
};

// --- DATA ---
const accommodations = [
  // ZONA SOTOSALBOS Y ALREDEDORES
  {
    name: 'La Casa del Guarda',
    type: 'Casa Rural 4*',
    desc: 'A escasos minutos de la finca. Ideal grupos (Max 10 pax). 10% dto.',
    contact: '676 06 95 69',
    web: 'turismosotosalbos.com',
    tag: 'Sotosalbos',
  },
  {
    name: 'Fuente Techada',
    type: 'Hotel Finca',
    desc: 'Exclusivo solo adultos (salvo alquiler completo). Max 14 pax.',
    contact: '619 65 18 65',
    web: 'hotelfincafuentetechada.com',
    tag: 'Sotosalbos',
  },
  {
    name: 'Saltus Alvus',
    type: 'Casas Rurales',
    desc: 'Gran capacidad, perfecto para familias grandes. Max 18 pax.',
    contact: '639 89 12 20',
    web: 'saltusalvuscasaruralsegovia.com',
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
    name: 'Fuente Plateada',
    type: 'Posada & Restaurante',
    desc: 'En Collado Hermoso, al lado de la finca. Circuito spa gratuito.',
    contact: '618 97 89 74',
    web: 'turismosotosalbos.com',
    tag: 'Collado Hermoso',
  },
  // ZONA TORRECABALLEROS
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
    name: 'Hostal Burgos',
    type: 'Hostal',
    desc: 'Alojamiento práctico y muy cercano.',
    contact: '921 40 12 18',
    web: 'hostalburgos.com',
    tag: 'Torrecaballeros',
  },
  {
    name: 'La Casa de la Era',
    type: 'Casa Rural',
    desc: 'Tranquilidad a pocos kilómetros.',
    contact: '667 02 49 91',
    tag: 'Torrecaballeros',
  },
  {
    name: 'Casa de San Medel',
    type: 'Apartamentos Rurales',
    desc: 'Flexibilidad y espacio para familias.',
    contact: '685 72 95 98',
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
    specialty: 'Vermú & Tradición',
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
    desc: 'Ideal para desayunos, meriendas o comprar pan artesano. Un rincón con encanto.',
    specialty: 'Panadería & Café',
    contact: 'Sotosalbos',
    icon: (
      <Coffee
        size={20}
        className="text-amber-600 group-hover:text-amber-400 transition-colors"
      />
    ),
  },
  {
    name: 'El Rancho de la Aldegüela',
    location: 'Torrecaballeros',
    desc: 'A 7 min. Un referente para cochinillo y cordero. Ideal comidas familiares.',
    specialty: 'Asados Tradicionales',
    contact: '921 40 10 60',
  },
  {
    name: 'Ta-Berna Horno de Asar',
    location: 'Collado Hermoso',
    desc: 'Regentado por Berna y Nieves. Fantástico para un picoteo pre o post boda.',
    specialty: 'Picoteo & Calidad',
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
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;
      if (difference <= 0) clearInterval(timer);
      else {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor(
            (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          ),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  const TimeBox = ({ val, label }) => (
    <div className="flex flex-col items-center mx-4 md:mx-10">
      <div className="relative">
        <span className="text-4xl sm:text-5xl md:text-7xl font-light font-serif text-stone-900 tabular-nums tracking-tighter">
          {val.toString().padStart(2, '0')}
        </span>
      </div>
      <span className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-stone-400 mt-2 font-bold">
        {label}
      </span>
    </div>
  );

  return (
    <div className="flex justify-center items-center py-10 md:py-16 px-4 md:px-12 w-full">
      <TimeBox val={timeLeft.days} label="Días" />
      <div className="h-12 md:h-20 w-px bg-stone-200"></div>
      <TimeBox val={timeLeft.hours} label="Horas" />
      <div className="h-12 md:h-20 w-px bg-stone-200 hidden sm:block"></div>
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

  // --- EFECTO PARA TÍTULO Y FAVICON ---
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
  }, []);

  // Parallax Effect State
  const [offsetY, setOffsetY] = useState(0);
  const handleScroll = () => setOffsetY(window.pageYOffset);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // FUNCIÓN: Cargar datos desde Google Sheets (Para el Admin)
  const fetchSheetData = async () => {
    if (!GOOGLE_SCRIPT_URL) return;
    setLoadingData(true);
    try {
      const response = await fetch(GOOGLE_SCRIPT_URL);
      const data = await response.json();
      // Asumimos que el script devuelve un array de objetos
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

  // FUNCIÓN: Enviar a Google Sheets
  const handleSheetRSVP = async (e) => {
    e.preventDefault();

    if (!GOOGLE_SCRIPT_URL) {
      alert('⚠️ Error: Falta configurar la URL de Google Sheets en el código.');
      return;
    }

    setFormStatus('loading');
    const formEl = e.target;
    const formData = new FormData(formEl);

    // Convertir FormData a URLSearchParams para enviar como formulario simple
    const data = new URLSearchParams();
    for (const pair of formData) {
      data.append(pair[0], pair[1]);
    }
    // Añadir timestamp manual si se quiere, aunque el script lo pone mejor
    data.append('timestamp', new Date().toISOString());

    try {
      // Usamos mode: 'no-cors' porque Google Scripts no devuelve cabeceras CORS estándar en POST
      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        body: data,
        mode: 'no-cors', // Importante para evitar error de red visible
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
      <div className="min-h-screen bg-stone-100 font-sans text-stone-800">
        <div className="bg-white border-b border-stone-200 px-4 md:px-6 py-4 flex justify-between items-center sticky top-0 z-50">
          <div className="flex items-center gap-2 md:gap-3">
            <span className="font-serif font-bold text-lg md:text-xl tracking-tight">
              G&M Panel
            </span>
            <span className="px-2 py-0.5 bg-green-100 text-green-800 text-[10px] uppercase font-bold tracking-widest rounded-full hidden sm:inline-block">
              Google Sheets
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
              <h2 className="text-2xl font-serif mb-2">Acceso Novios</h2>
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
                    Lee el archivo "Instrucciones_Google_Sheets.md".
                  </p>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-8 md:mb-10">
              <div className="bg-stone-900 text-white p-6 rounded-2xl shadow-lg col-span-1">
                <p className="text-stone-400 text-xs uppercase tracking-widest font-bold mb-2">
                  Total Confirmados
                </p>
                <p className="text-4xl md:text-5xl font-serif">
                  {loadingData ? '...' : totalConfirmados}
                </p>
                <p className="text-stone-500 text-xs mt-2">Personas</p>
              </div>

              {/* CARD BUS */}
              <div className="bg-amber-500 text-white p-6 rounded-2xl shadow-lg col-span-1 relative overflow-hidden group">
                <div className="relative z-10">
                  <p className="text-amber-100 text-xs uppercase tracking-widest font-bold mb-2 flex items-center gap-2">
                    <Bus size={14} /> Plazas Bus
                  </p>
                  <p className="text-4xl md:text-5xl font-serif mb-4">
                    {loadingData ? '...' : totalBusPax}
                  </p>
                </div>
                <Bus className="absolute -bottom-4 -right-4 text-amber-600 opacity-20 w-24 h-24 md:w-32 md:h-32 transform -rotate-12" />
              </div>

              {/* CARD ACCIONES */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-200 col-span-1 sm:col-span-2 flex flex-col justify-between">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-bold text-lg flex items-center gap-2 text-stone-900">
                      <FileSpreadsheet size={18} className="text-green-600" />{' '}
                      Google Sheets
                    </h3>
                    <p className="text-stone-500 text-xs mt-1">
                      Los datos se guardan en tu hoja de cálculo.
                    </p>
                  </div>
                  <button
                    onClick={fetchSheetData}
                    disabled={loadingData}
                    className="p-2 hover:bg-stone-100 rounded-full transition text-stone-400 hover:text-stone-600"
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
                    className="flex-1 flex items-center justify-center gap-2 bg-green-50 hover:bg-green-100 text-green-800 py-3 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors"
                  >
                    <ExternalLink size={14} /> Abrir Excel en Drive
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden">
              <div className="px-4 md:px-6 py-4 border-b border-stone-100 flex justify-between items-center bg-stone-50/50">
                <h3 className="font-bold text-stone-700">
                  Listado en Tiempo Real
                </h3>
                <span className="text-xs text-stone-400 bg-white px-2 py-1 rounded border border-stone-200">
                  {rsvps.length} registros
                </span>
              </div>
              <div className="overflow-x-auto">
                {loadingData ? (
                  <div className="p-8 text-center text-stone-400 flex flex-col items-center gap-2">
                    <Loader2 className="animate-spin text-amber-500" />
                    <span className="text-xs uppercase tracking-widest">
                      Sincronizando con Google...
                    </span>
                  </div>
                ) : rsvps.length === 0 ? (
                  <div className="p-8 text-center text-stone-400 italic">
                    Aún no hay datos en la hoja o no se han podido cargar.
                  </div>
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
                        <tr
                          key={idx}
                          className="hover:bg-amber-50/30 transition-colors"
                        >
                          <td className="px-6 py-4 text-xs text-stone-400 font-mono">
                            {new Date(rsvp.timestamp).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 font-medium text-stone-800">
                            {rsvp.nombre}
                          </td>
                          <td className="px-6 py-4 text-center">
                            <span
                              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide ${
                                rsvp.asistira === 'si'
                                  ? 'bg-green-100 text-green-800'
                                  : 'bg-red-50 text-red-800'
                              }`}
                            >
                              {rsvp.asistira === 'si'
                                ? 'Confirmado'
                                : 'Rechazado'}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-center font-mono text-stone-500">
                            {rsvp.invitados || 1}
                          </td>
                          <td className="px-6 py-4 text-stone-600">
                            {rsvp.asistira === 'si' ? (
                              rsvp.transporte === 'bus' ? (
                                <span className="flex items-center gap-2 text-amber-700 font-medium">
                                  <Bus size={14} /> Bus
                                </span>
                              ) : (
                                <span className="flex items-center gap-2 text-stone-500">
                                  <Car size={14} /> Propio
                                </span>
                              )
                            ) : (
                              <span className="text-stone-300">-</span>
                            )}
                          </td>
                          <td className="px-6 py-4 text-stone-500 max-w-xs truncate">
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
    <div className="bg-[#FAF9F6] text-stone-800 font-sans selection:bg-amber-200 selection:text-amber-900 overflow-x-hidden pt-[60px] md:pt-[64px]">
      {/* Navbar Premium */}
      <nav className="fixed top-0 left-0 w-full z-40 transition-all duration-300 bg-white/95 backdrop-blur-md border-b border-stone-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex justify-between items-center">
          <span className="font-serif text-xl md:text-2xl font-bold tracking-tighter text-stone-900 z-50 relative">
            G&M
          </span>

          {/* Desktop Nav */}
          <div className="hidden lg:flex space-x-10 text-xs uppercase tracking-[0.2em] font-medium items-center text-stone-500">
            <a
              href="#historia"
              className="hover:text-stone-900 transition-colors"
            >
              Historia
            </a>
            <a
              href="#detalles"
              className="hover:text-stone-900 transition-colors"
            >
              Detalles
            </a>
            <a
              href="#itinerario"
              className="hover:text-stone-900 transition-colors"
            >
              Itinerario
            </a>
            <a
              href="#alojamiento"
              className="hover:text-stone-900 transition-colors"
            >
              Guía
            </a>
            <a
              href="#rsvp"
              className="bg-stone-900 text-white px-6 py-2.5 rounded-full hover:bg-amber-900 transition-all hover:shadow-lg transform hover:-translate-y-0.5"
            >
              Confirmar
            </a>
            <button
              onClick={() => setView('admin')}
              className="p-2 hover:bg-stone-100 rounded-full transition"
            >
              <Lock size={14} />
            </button>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden z-50 p-2 relative text-stone-800"
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-stone-100/95 backdrop-blur-xl z-40 flex flex-col items-center justify-center transition-all duration-500 transform ${
          mobileMenuOpen
            ? 'opacity-100 translate-x-0'
            : 'opacity-0 translate-x-full pointer-events-none'
        }`}
      >
        <div className="flex flex-col space-y-8 text-center font-serif text-3xl">
          <a
            href="#inicio"
            onClick={() => setMobileMenuOpen(false)}
            className="hover:text-amber-700 transition"
          >
            Inicio
          </a>
          <a
            href="#historia"
            onClick={() => setMobileMenuOpen(false)}
            className="hover:text-amber-700 transition"
          >
            Nuestra Historia
          </a>
          <a
            href="#detalles"
            onClick={() => setMobileMenuOpen(false)}
            className="hover:text-amber-700 transition"
          >
            Detalles
          </a>
          <a
            href="#itinerario"
            onClick={() => setMobileMenuOpen(false)}
            className="hover:text-amber-700 transition"
          >
            Itinerario
          </a>
          <a
            href="#alojamiento"
            onClick={() => setMobileMenuOpen(false)}
            className="hover:text-amber-700 transition"
          >
            Guía Local
          </a>
          <a
            href="#rsvp"
            onClick={() => setMobileMenuOpen(false)}
            className="text-amber-900 italic"
          >
            Confirmar Asistencia
          </a>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              setView('admin');
            }}
            className="text-sm font-sans uppercase tracking-widest text-stone-400 mt-8"
          >
            Acceso Novios
          </button>
        </div>
      </div>

      {/* Hero Section con Parallax */}
      <section
        id="inicio"
        className="relative h-[calc(100vh-60px)] md:h-[calc(100vh-64px)] flex items-center justify-center overflow-hidden bg-stone-950"
      >
        {/* Fondo borroso para rellenar toda la pantalla */}
        <div
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-60"
          style={{
            backgroundImage: `url('https://i.postimg.cc/XNw9G4mr/Gemini_Generated_Image_5rucma5rucma5ruc.png')`,
            filter: 'blur(30px) brightness(0.6)',
            transform: 'scale(1.1)', // Para evitar los bordes claros del desenfoque
          }}
        />

        {/* Imagen principal nítida y sin recortes */}
        <div
          className="absolute inset-0 z-10 bg-contain bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://i.postimg.cc/XNw9G4mr/Gemini_Generated_Image_5rucma5rucma5ruc.png')`,
            filter: 'brightness(0.95)',
          }}
        />

        {/* Gradiente sutil para integrar todo */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/50 z-20 pointer-events-none" />
      </section>

      {/* Countdown Section */}
      <section className="bg-transparent relative z-20 border-b border-stone-200">
        <div className="max-w-5xl mx-auto">
          <FadeInSection>
            <Countdown targetDate={new Date('2027-04-24T11:00:00').getTime()} />
          </FadeInSection>
        </div>
      </section>

      {/* Historia Section */}
      <section
        id="historia"
        className="py-20 md:py-32 px-6 md:px-12 max-w-5xl mx-auto text-center relative"
      >
        <FadeInSection>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-16 md:h-24 bg-gradient-to-b from-transparent to-amber-900/20"></div>
          <Sparkles
            className="mx-auto text-amber-600 mb-6 md:mb-8 opacity-80"
            size={32}
            strokeWidth={1}
          />
          <h2 className="text-3xl md:text-6xl mb-6 md:mb-10 font-serif text-stone-900">
            Nuestra Historia
          </h2>
          <p className="text-base md:text-2xl leading-relaxed text-stone-600 font-light max-w-3xl mx-auto">
            "Todo comenzó como un encuentro inesperado y se convirtió en el viaje de
            nuestras vidas. Sotosalbos, con sus calles de piedra y atardeceres
            dorados, será el testigo de nuestro 'sí, quiero'. Formáis parte de nuestra historia y queremos que también los seáis de este día."
          </p>
        </FadeInSection>
      </section>

      {/* Detalles Grid */}
      <section
        id="detalles"
        className="py-20 md:py-24 px-4 bg-white relative overflow-hidden"
      >
        <div
          className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(#444 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        ></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <FadeInSection className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-10">
            {/* Card Ceremonia */}
            <div className="group relative bg-stone-50 hover:bg-white p-8 md:p-12 rounded-[2rem] md:rounded-[2.5rem] transition-all duration-500 border border-stone-100 hover:border-amber-100 hover:shadow-2xl hover:shadow-amber-900/5">
              <div className="flex items-center gap-4 md:gap-6 mb-8 md:mb-10">
                <div className="w-12 h-12 md:w-16 md:h-16 flex-shrink-0 flex items-center justify-center bg-white rounded-2xl shadow-sm border border-stone-100 group-hover:scale-110 group-hover:border-amber-200 transition-all duration-500">
                  <Church
                    className="text-stone-400 group-hover:text-amber-600 transition-colors"
                    size={24}
                  />
                </div>
                <div>
                  <h3 className="text-2xl md:text-3xl font-serif text-stone-900 leading-none mb-1 md:mb-2">
                    Ceremonia
                  </h3>
                  <p className="text-amber-800 font-medium uppercase tracking-widest text-[10px]">
                    NUESTRO SÍ, QUIERO
                  </p>
                </div>
              </div>

              <div className="space-y-6 text-stone-600 pl-2">
                <div className="flex items-start gap-4 md:gap-5 group/item">
                  <div className="p-2 bg-white rounded-full border border-stone-100 group-hover/item:border-amber-200 transition-colors mt-0.5">
                    <Clock className="text-amber-600/70" size={16} />
                  </div>
                  <div>
                    <p className="font-bold text-stone-900 text-lg">
                      11:00 Horas
                    </p>
                    <p className="text-sm font-light">Se ruega puntualidad</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 md:gap-5 group/item">
                  <div className="p-2 bg-white rounded-full border border-stone-100 group-hover/item:border-amber-200 transition-colors mt-0.5">
                    <MapPin className="text-amber-600/70" size={16} />
                  </div>
                  <div>
                    <p className="font-bold text-stone-900 text-lg">
                      Iglesia de San Miguel
                    </p>
                    <p className="text-sm font-light">
                      C. de la Iglesia, 4, Sotosalbos
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4 md:gap-5 group/item">
                  <div className="p-2 bg-white rounded-full border border-stone-100 group-hover/item:border-amber-200 transition-colors mt-0.5">
                    <Car className="text-amber-600/70" size={16} />
                  </div>
                  <div>
                    <p className="font-bold text-stone-900 text-lg">Parking</p>
                    <p className="text-sm font-light">
                      Zona de aparcamiento cercana
                    </p>
                  </div>
                </div>
              </div>
              <a
                href="https://www.google.com/maps/search/?api=1&query=Iglesia+de+San+Miguel+Sotosalbos"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-8 md:mt-10 ml-2 text-xs font-bold uppercase tracking-[0.2em] text-stone-400 hover:text-amber-700 transition-colors group/link"
              >
                CÓMO LLEGAR{' '}
                <ArrowRight
                  size={14}
                  className="group-hover/link:translate-x-1 transition-transform"
                />
              </a>
            </div>

            {/* Card Celebración */}
            <div className="group relative bg-stone-50 hover:bg-white p-8 md:p-12 rounded-[2rem] md:rounded-[2.5rem] transition-all duration-500 border border-stone-100 hover:border-amber-100 hover:shadow-2xl hover:shadow-amber-900/5">
              <div className="flex items-center gap-4 md:gap-6 mb-8 md:mb-10">
                <div className="w-12 h-12 md:w-16 md:h-16 flex-shrink-0 flex items-center justify-center bg-white rounded-2xl shadow-sm border border-stone-100 group-hover:scale-110 group-hover:border-amber-200 transition-all duration-500">
                  <Utensils
                    className="text-stone-400 group-hover:text-amber-600 transition-colors"
                    size={24}
                  />
                </div>
                <div>
                  <h3 className="text-2xl md:text-3xl font-serif text-stone-900 leading-none mb-1 md:mb-2">
                    Celebración
                  </h3>
                  <p className="text-amber-800 font-medium uppercase tracking-widest text-[10px]">
                    Cóctel y Banquete
                  </p>
                </div>
              </div>

              <div className="space-y-6 text-stone-600 pl-2">
                <div className="flex items-start gap-4 md:gap-5 group/item">
                  <div className="p-2 bg-white rounded-full border border-stone-100 group-hover/item:border-amber-200 transition-colors mt-0.5">
                    <Clock className="text-amber-600/70" size={16} />
                  </div>
                  <div>
                    <p className="font-bold text-stone-900 text-lg">
                      13:00 Horas
                    </p>
                    <p className="text-sm font-light">
                      Hasta que el cuerpo aguante
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4 md:gap-5 group/item">
                  <div className="p-2 bg-white rounded-full border border-stone-100 group-hover/item:border-amber-200 transition-colors mt-0.5">
                    <MapPin className="text-amber-600/70" size={16} />
                  </div>
                  <div>
                    <p className="font-bold text-stone-900 text-lg">
                      Mencía de Sotosalbos
                    </p>
                    <p className="text-sm font-light">
                      Ctra. Segovia a Soria, km 172
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4 md:gap-5 group/item">
                  <div className="p-2 bg-white rounded-full border border-stone-100 group-hover/item:border-amber-200 transition-colors mt-0.5">
                    <Car className="text-amber-600/70" size={16} />
                  </div>
                  <div>
                    <p className="font-bold text-stone-900 text-lg">Parking</p>
                    <p className="text-sm font-light">
                      Parking privado en la finca
                    </p>
                  </div>
                </div>
              </div>
              <a
                href="https://www.google.com/maps/search/?api=1&query=Finca+Mencía+Sotosalbos"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-8 md:mt-10 ml-2 text-xs font-bold uppercase tracking-[0.2em] text-stone-400 hover:text-amber-700 transition-colors group/link"
              >
                CÓMO LLEGAR{' '}
                <ArrowRight
                  size={14}
                  className="group-hover/link:translate-x-1 transition-transform"
                />
              </a>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* Itinerario Section */}
      <section
        id="itinerario"
        className="py-20 md:py-24 bg-[#FAF9F6] relative overflow-hidden"
      >
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <FadeInSection>
            <div className="text-center mb-12 md:mb-16">
              <span className="text-amber-600/80 text-xs font-bold uppercase tracking-[0.3em] mb-4 block">
                Timeline
              </span>
              <h2 className="text-3xl md:text-5xl font-serif text-stone-900 mb-6">
                El Gran Día
              </h2>
              <div className="w-16 md:w-24 h-px bg-stone-300 mx-auto"></div>
            </div>

            <div className="relative">
              {/* Vertical line: Left aligned on mobile, Center on desktop */}
              <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-stone-300 transform md:-translate-x-1/2"></div>
              <div className="space-y-12">
                {/* 17:00 -> 10:30 */}
                <div className="relative flex flex-col md:flex-row items-start md:items-center md:justify-between group pl-12 md:pl-0">
                  <div className="md:w-5/12 text-left md:text-right md:pr-12 w-full order-2 md:order-1 mt-2 md:mt-0">
                    <h4 className="font-serif text-xl md:text-2xl text-stone-800">
                      Llegada de Invitados
                    </h4>
                    <p className="text-stone-500 text-sm mt-1">
                      Bienvenida en la Iglesia de San Miguel
                    </p>
                  </div>
                  <div className="absolute left-4 md:left-1/2 w-4 h-4 bg-white border-4 border-amber-300 rounded-full transform -translate-x-1/2 z-10 group-hover:scale-125 transition-transform duration-300 mt-1 md:mt-0"></div>
                  <div className="md:w-5/12 md:pl-12 w-full text-left order-1 md:order-3">
                    <span className="inline-block px-3 py-1 bg-white border border-stone-200 rounded-full text-[10px] md:text-xs font-bold tracking-widest text-amber-900 shadow-sm">
                      10:30
                    </span>
                  </div>
                </div>

                {/* 17:30 -> 11:00 */}
                <div className="relative flex flex-col md:flex-row-reverse items-start md:items-center md:justify-between group pl-12 md:pl-0">
                  <div className="md:w-5/12 text-left md:pl-12 w-full order-2 md:order-1 mt-2 md:mt-0">
                    <h4 className="font-serif text-xl md:text-2xl text-stone-800">
                      Ceremonia
                    </h4>
                    <p className="text-stone-500 text-sm mt-1">
                      El "Sí, quiero" más esperado
                    </p>
                  </div>
                  <div className="absolute left-4 md:left-1/2 w-4 h-4 bg-white border-4 border-stone-400 rounded-full transform -translate-x-1/2 z-10 group-hover:scale-125 transition-transform duration-300 group-hover:border-amber-400 mt-1 md:mt-0"></div>
                  <div className="md:w-5/12 md:pr-12 w-full text-left md:text-right order-1 md:order-3">
                    <span className="inline-block px-3 py-1 bg-white border border-stone-200 rounded-full text-[10px] md:text-xs font-bold tracking-widest text-stone-600 shadow-sm">
                      11:00
                    </span>
                  </div>
                </div>

                {/* 19:00 -> 13:00 */}
                <div className="relative flex flex-col md:flex-row items-start md:items-center md:justify-between group pl-12 md:pl-0">
                  <div className="md:w-5/12 text-left md:text-right md:pr-12 w-full order-2 md:order-1 mt-2 md:mt-0">
                    <h4 className="font-serif text-xl md:text-2xl text-stone-800">
                      Cóctel de Bienvenida
                    </h4>
                    <p className="text-stone-500 text-sm mt-1">
                      Música en vivo en los jardines
                    </p>
                  </div>
                  <div className="absolute left-4 md:left-1/2 w-8 h-8 md:w-10 md:h-10 bg-white border border-stone-100 rounded-full flex items-center justify-center transform -translate-x-1/2 z-10 shadow-md group-hover:scale-110 transition-transform mt-0 md:mt-0">
                    <Wine size={14} className="text-amber-600" />
                  </div>
                  <div className="md:w-5/12 md:pl-12 w-full text-left order-1 md:order-3">
                    <span className="inline-block px-3 py-1 bg-white border border-stone-200 rounded-full text-[10px] md:text-xs font-bold tracking-widest text-stone-600 shadow-sm">
                      13:00
                    </span>
                  </div>
                </div>

                {/* 21:00 -> 15:00 (Banquete) */}
                <div className="relative flex flex-col md:flex-row-reverse items-start md:items-center md:justify-between group pl-12 md:pl-0">
                  <div className="md:w-5/12 text-left md:pl-12 w-full order-2 md:order-1 mt-2 md:mt-0">
                    <h4 className="font-serif text-xl md:text-2xl text-stone-800">
                      Banquete
                    </h4>
                    <p className="text-stone-500 text-sm mt-1">
                      Gastronomía local con toque moderno
                    </p>
                  </div>
                  <div className="absolute left-4 md:left-1/2 w-8 h-8 md:w-10 md:h-10 bg-white border border-stone-100 rounded-full flex items-center justify-center transform -translate-x-1/2 z-10 shadow-md group-hover:scale-110 transition-transform mt-0 md:mt-0">
                    <Utensils size={14} className="text-amber-600" />
                  </div>
                  <div className="md:w-5/12 md:pr-12 w-full text-left md:text-right order-1 md:order-3">
                    <span className="inline-block px-3 py-1 bg-white border border-stone-200 rounded-full text-[10px] md:text-xs font-bold tracking-widest text-stone-600 shadow-sm">
                      15:00
                    </span>
                  </div>
                </div>

                {/* 00:00 -> 18:30 (Fiesta) */}
                <div className="relative flex flex-col md:flex-row items-start md:items-center md:justify-between group pl-12 md:pl-0">
                  <div className="md:w-5/12 text-left md:text-right md:pr-12 w-full order-2 md:order-1 mt-2 md:mt-0">
                    <h4 className="font-serif text-xl md:text-2xl text-stone-800">
                      Fiesta & Barra Libre
                    </h4>
                    <p className="text-stone-500 text-sm mt-1">
                      ¡Baile hasta que se ponga el sol!
                    </p>
                  </div>
                  <div className="absolute left-4 md:left-1/2 w-8 h-8 md:w-10 md:h-10 bg-stone-900 border border-stone-900 rounded-full flex items-center justify-center transform -translate-x-1/2 z-10 shadow-md group-hover:scale-110 transition-transform mt-0 md:mt-0">
                    <Music size={14} className="text-white" />
                  </div>
                  <div className="md:w-5/12 md:pl-12 w-full text-left order-1 md:order-3">
                    <span className="inline-block px-3 py-1 bg-stone-900 text-white rounded-full text-[10px] md:text-xs font-bold tracking-widest shadow-sm">
                      18:30
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* --- SECCIÓN ALOJAMIENTO --- */}
      <section id="alojamiento" className="py-20 md:py-24 bg-stone-100 px-4">
        <div className="max-w-6xl mx-auto">
          <FadeInSection>
            <div className="text-center mb-12 md:mb-16">
              <span className="text-amber-600/80 text-xs font-bold uppercase tracking-[0.3em] mb-4 block">
                Para Descansar
              </span>
              <h2 className="text-3xl md:text-5xl font-serif text-stone-900 mb-6">
                Alojamientos Recomendados
              </h2>
              <p className="text-stone-500 font-light max-w-2xl mx-auto text-sm md:text-base">
                Hemos seleccionado las mejores opciones cerca de la finca para
                que disfrutéis sin preocupaciones.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {accommodations.map((acc, index) => (
                <div
                  key={index}
                  onClick={() => setExpandedAcc(expandedAcc === index ? null : index)}
                  className="cursor-pointer bg-white p-5 md:p-6 rounded-2xl shadow-sm border border-stone-100 hover:shadow-md hover:border-amber-200 transition-all duration-300 flex flex-col group"
                >
                  <div className="flex justify-between items-start mb-3">
                    <span className="bg-amber-50 text-amber-800 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                      {acc.tag}
                    </span>
                    <Bed size={18} className="text-stone-300 group-hover:text-amber-400 transition-colors" />
                  </div>
                  <h3 className="text-xl font-serif text-stone-900 mb-1">
                    {acc.name}
                  </h3>
                  <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">
                    {acc.type}
                  </p>

                  {/* Expandable Content */}
                  <div
                    className={`grid transition-all duration-300 ease-in-out ${
                      expandedAcc === index
                        ? 'grid-rows-[1fr] opacity-100 mt-4'
                        : 'grid-rows-[0fr] opacity-0 mt-0'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="pt-4 border-t border-stone-100 flex flex-col gap-4">
                        <p className="text-stone-600 text-sm leading-relaxed">
                          {acc.desc}
                        </p>
                        <div className="space-y-3">
                          <div className="flex items-center gap-3 text-sm text-stone-500 hover:text-amber-700 transition">
                            <Phone size={14} className="flex-shrink-0" /> <span>{acc.contact}</span>
                          </div>
                          {acc.web && (
                            <div className="flex items-center gap-3 text-sm text-stone-500 hover:text-amber-700 transition truncate">
                              <Globe size={14} className="flex-shrink-0" />{' '}
                              <span className="truncate">{acc.web}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Toggle Button/Indicator */}
                  <div className="mt-4 pt-3 border-t border-stone-50 flex items-center justify-center gap-2 text-[10px] uppercase tracking-widest text-stone-400 group-hover:text-amber-600 transition-colors">
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
        className="py-20 md:py-24 bg-white px-4 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-50 rounded-full filter blur-3xl opacity-50 pointer-events-none"></div>
        <div className="max-w-6xl mx-auto relative z-10">
          <FadeInSection>
            <div className="text-center mb-12 md:mb-16">
              <span className="text-amber-600/80 text-xs font-bold uppercase tracking-[0.3em] mb-4 block">
                Sabores Locales
              </span>
              <h2 className="text-3xl md:text-5xl font-serif text-stone-900 mb-6">
                Gastronomía Cercana
              </h2>
              <p className="text-stone-500 font-light max-w-2xl mx-auto text-sm md:text-base">
                Para disfrutar antes o después de la boda. Nuestros favoritos
                para vermú, asados o picoteo.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {restaurants.map((rest, index) => (
                <div
                  key={index}
                  className="group relative bg-stone-50 p-6 md:p-8 rounded-3xl overflow-hidden hover:bg-stone-900 transition-colors duration-500"
                >
                  <div className="absolute top-0 right-0 bg-white p-4 rounded-bl-3xl z-10">
                    {rest.icon ? (
                      rest.icon
                    ) : (
                      <UtensilsCrossed
                        size={20}
                        className="text-amber-600 group-hover:text-amber-400 transition-colors"
                      />
                    )}
                  </div>

                  <div className="relative z-10">
                    <div className="mb-6">
                      <h3 className="text-xl md:text-2xl font-serif text-stone-900 group-hover:text-white transition-colors mb-1">
                        {rest.name}
                      </h3>
                      <div className="flex items-center gap-2 text-stone-400 text-xs uppercase tracking-widest group-hover:text-stone-500">
                        <MapPin size={12} /> {rest.location}
                      </div>
                    </div>

                    <p className="text-stone-600 group-hover:text-stone-300 text-sm leading-relaxed mb-6 transition-colors">
                      {rest.desc}
                    </p>

                    <div className="flex justify-between items-end border-t border-stone-200 group-hover:border-stone-700 pt-6 transition-colors">
                      <div>
                        <span className="block text-[10px] uppercase text-stone-400 mb-1">
                          Especialidad
                        </span>
                        <span className="text-amber-800 group-hover:text-amber-400 font-medium text-sm">
                          {rest.specialty}
                        </span>
                      </div>
                      <span className="text-stone-400 text-sm font-mono group-hover:text-stone-500">
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

      {/* RSVP Section */}
      <section
        id="rsvp"
        className="py-20 md:py-32 px-4 bg-stone-900 text-stone-200 relative"
      >
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
        <div className="max-w-xl mx-auto relative z-10">
          <FadeInSection>
            <div className="text-center mb-12 md:mb-16">
              <span className="text-amber-500 uppercase tracking-[0.3em] text-xs font-bold mb-4 block">
                RSVP
              </span>
              <h2 className="text-3xl md:text-6xl font-serif text-white mb-4 md:mb-6">
                ¿Nos acompañas?
              </h2>
              <p className="text-stone-400 font-light text-sm md:text-base">
                Confirma tu asistencia antes del 24 de Marzo.
              </p>
            </div>

            {formStatus === 'success' ? (
              <div className="bg-white/10 backdrop-blur-md border border-white/10 p-8 md:p-10 rounded-[2rem] text-center animate-in zoom-in duration-500">
                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6 text-green-400">
                  <Check size={32} />
                </div>
                <h3 className="text-2xl font-serif text-white mb-4">
                  ¡Gracias por confirmar!
                </h3>
                <div className="bg-black/20 p-6 rounded-xl text-stone-300 text-sm italic mb-6">
                  <Sparkles size={12} className="inline text-amber-400 mr-2" />
                  Tus datos se han enviado a la hoja de confirmaciones de los
                  novios.
                </div>
                <button
                  onClick={() => setFormStatus('idle')}
                  className="text-xs uppercase tracking-widest hover:text-amber-400 transition"
                >
                  Volver al formulario
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSheetRSVP}
                className="space-y-6 md:space-y-8 bg-white/5 backdrop-blur-sm p-6 md:p-12 rounded-[2rem] md:rounded-[2.5rem] border border-white/10 shadow-2xl"
              >
                <div className="group">
                  <label className="block text-[10px] uppercase tracking-[0.2em] text-stone-500 mb-2 group-focus-within:text-amber-500 transition-colors">
                    Nombre Completo
                  </label>
                  <input
                    name="nombre"
                    required
                    className="w-full bg-transparent border-b border-stone-700 py-3 text-base md:text-lg focus:outline-none focus:border-amber-500 transition-colors text-white placeholder-stone-700"
                    placeholder="Ej. Ana García"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                  <div className="group">
                    <label className="block text-[10px] uppercase tracking-[0.2em] text-stone-500 mb-2 group-focus-within:text-amber-500 transition-colors">
                      Asistencia
                    </label>
                    <div className="relative">
                      <select
                        name="asistira"
                        className="w-full bg-transparent border-b border-stone-700 py-3 text-base md:text-lg focus:outline-none focus:border-amber-500 transition-colors text-white appearance-none cursor-pointer"
                      >
                        <option value="si" className="text-stone-900">
                          Sí, asisto
                        </option>
                        <option value="no" className="text-stone-900">
                          No puedo
                        </option>
                      </select>
                      <ArrowRight
                        className="absolute right-0 top-4 text-stone-600 pointer-events-none rotate-90"
                        size={14}
                      />
                    </div>
                  </div>
                  <div className="group">
                    <label className="block text-[10px] uppercase tracking-[0.2em] text-stone-500 mb-2 group-focus-within:text-amber-500 transition-colors">
                      Invitados
                    </label>
                    <input
                      name="invitados"
                      type="number"
                      min="1"
                      defaultValue="1"
                      className="w-full bg-transparent border-b border-stone-700 py-3 text-base md:text-lg focus:outline-none focus:border-amber-500 transition-colors text-white"
                    />
                  </div>
                </div>

                {/* SECCIÓN TRANSPORTE */}
                <div className="group">
                  <label className="block text-[10px] uppercase tracking-[0.2em] text-stone-500 mb-3 group-focus-within:text-amber-500 transition-colors">
                    Transporte
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <label className="flex items-center gap-3 cursor-pointer group/option p-3 rounded-lg border border-stone-800 hover:border-stone-600 transition-colors">
                      <input
                        type="radio"
                        name="transporte"
                        value="bus"
                        className="appearance-none w-4 h-4 border border-stone-500 rounded-full checked:bg-amber-500 checked:border-amber-500 transition-all"
                        defaultChecked
                      />
                      <span className="text-stone-400 group-hover/option:text-stone-200 transition-colors text-sm font-medium">
                        Autobús (Ida/Vuelta)
                      </span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer group/option p-3 rounded-lg border border-stone-800 hover:border-stone-600 transition-colors">
                      <input
                        type="radio"
                        name="transporte"
                        value="propio"
                        className="appearance-none w-4 h-4 border border-stone-500 rounded-full checked:bg-amber-500 checked:border-amber-500 transition-all"
                      />
                      <span className="text-stone-400 group-hover/option:text-stone-200 transition-colors text-sm font-medium">
                        Vehículo Propio
                      </span>
                    </label>
                  </div>
                </div>

                <div className="group relative">
                  <div className="flex justify-between items-end mb-2">
                    <label className="block text-[10px] uppercase tracking-[0.2em] text-stone-500 group-focus-within:text-amber-500 transition-colors">
                      Observaciones
                    </label>
                  </div>
                  <textarea
                    name="observaciones"
                    rows="3"
                    className="w-full bg-transparent border-b border-stone-700 py-3 text-sm focus:outline-none focus:border-amber-500 transition-colors text-white resize-none"
                    placeholder="Alergias, menú infantil... o una bonita dedicatoria."
                  />
                </div>

                <button
                  type="submit"
                  disabled={formStatus === 'loading'}
                  className="w-full bg-white text-stone-900 py-4 md:py-5 rounded-xl font-bold uppercase tracking-[0.2em] text-xs hover:bg-amber-400 transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(251,191,36,0.4)] disabled:opacity-50 mt-4"
                >
                  {formStatus === 'loading'
                    ? 'Enviando...'
                    : 'Enviar Respuesta'}
                </button>

                {/* Enlace Eterno Digital */}
                <div className="mt-8 flex justify-center">
                  <a
                    href="https://eterno-digital.netlify.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-stone-800/50 border border-stone-700 hover:border-red-500/50 hover:bg-stone-900 transition-all duration-300 hover:shadow-[0_0_15px_rgba(239,68,68,0.15)]"
                  >
                    <Sparkles
                      size={12}
                      className="text-stone-500 group-hover:text-red-400 transition-colors"
                    />
                    <span className="text-[10px] uppercase tracking-widest font-medium text-stone-400 group-hover:text-stone-300 transition-colors">
                      Web creada por{' '}
                      <span className="text-stone-300 group-hover:text-red-400 font-bold ml-1">
                        Eterno Digital
                      </span>
                    </span>
                  </a>
                </div>
              </form>
            )}
          </FadeInSection>
        </div>
      </section>

      {/* Footer Minimalista */}
      <footer className="bg-stone-950 text-stone-600 py-16 md:py-20 px-6 text-center border-t border-stone-900">
        <div className="max-w-md mx-auto mb-16">
          <Gift size={32} className="mx-auto mb-6 opacity-30" />
          <h3 className="font-serif text-xl md:text-2xl text-stone-400 italic mb-6">
            Lista de Boda
          </h3>
          <div className="border border-stone-800 rounded-xl p-6 md:p-8 bg-stone-900/50">
            <p className="text-xs uppercase tracking-widest mb-4">
              Transferencia Bancaria
            </p>
            <p className="font-mono text-amber-500/80 text-base md:text-lg tracking-wider select-all break-all">
              ES12 3456 7890 12 1234567890
            </p>
          </div>
        </div>
        <p className="text-[10px] uppercase tracking-[0.5em] opacity-40 hover:opacity-100 transition-opacity cursor-default">
          Gemma & Miguel — 2027
        </p>
      </footer>
    </div>
  );
}