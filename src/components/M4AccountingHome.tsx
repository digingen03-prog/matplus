import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiPhone, 
  FiMail, 
  FiFacebook, 
  FiLinkedin, 
  FiTwitter, 
  FiInstagram, 
  FiTrendingUp, 
  FiSliders, 
  FiMessageSquare, 
  FiAward, 
  FiUsers, 
  FiHeart, 
  FiChevronDown, 
  FiChevronUp, 
  FiArrowRight, 
  FiDownload, 
  FiStar,
  FiCheckCircle,
  FiShield,
  FiClock,
  FiTarget
} from 'react-icons/fi';

// Logo Strip Data
const BRANDS = ['MYOB', 'Xero', 'QuickBooks', 'Reckon', 'Odoo'];

// FAQs Data (10 questions)
const FAQS = [
  {
    q: "What business structures do you advise on?",
    a: "We advise on all major Australian business structures including Sole Traders, Partnerships, Proprietary Limited (Pty Ltd) Companies, Family Trusts, Unit Trusts, and Self-Managed Super Funds (SMSFs). We help you choose the structure that offers the best asset protection and tax minimization."
  },
  {
    q: "How often should I meet with my business advisor?",
    a: "Meeting frequency depends on your business size and goals. We offer monthly, quarterly, and annual review packages. For rapid-growth businesses, we recommend monthly advisory sessions to track KPIs, monitor cash flow, and adjust strategy dynamically."
  },
  {
    q: "What is the difference between bookkeeping and accounting?",
    a: "Bookkeeping is the administrative task of recording daily financial transactions, processing payroll, and reconciling bank statements. Accounting is the strategic analysis of that data—interpreting financial statements, preparing tax planning strategies, and providing growth advisory."
  },
  {
    q: "Can you help me transition to cloud systems like Xero or MYOB?",
    a: "Absolutely. We are certified gold partners with Xero and MYOB. We handle the complete setup, migrate your historical ledger data, configure automated bank feeds, set up payroll/STP, and provide training for you and your staff."
  },
  {
    q: "Do you handle Self-Managed Super Funds (SMSF) compliance?",
    a: "Yes, we provide end-to-end SMSF services. This includes establishing the SMSF trust, preparing annual financial accounts and member statements, managing the tax return, and coordinating the mandatory independent annual audit."
  },
  {
    q: "How do you charge for your accounting services?",
    a: "We operate on a transparent, fixed monthly fee model for recurring accounting and compliance packages, so you always know your costs. For custom advisory or restructuring projects, we provide detailed upfront project quotes before work begins."
  },
  {
    q: "What tax planning strategies can help my company save money?",
    a: "Tax planning involves reviewing your position before June 30. Common strategies include restructuring profit distributions, utilizing temporary full expensing for asset purchases, making superannuation contributions, and deferring taxable income."
  },
  {
    q: "Can you act as our virtual Chief Financial Officer (CFO)?",
    a: "Yes, our Virtual CFO service provides high-level financial strategy, cash flow forecasting, board reporting, cost-benefit analysis, and capital raising advisory, giving you corporate-level expertise without the cost of a full-time executive salary."
  },
  {
    q: "How do we get started with M4 Plus Accounting?",
    a: "Getting started is simple. Book a free 30-minute consultation via our website form. We will review your current systems, discuss your challenges, and present a tailored services proposal with a transparent fee structure."
  },
  {
    q: "What information do I need to bring to our first consultation?",
    a: "To make the most of your session, please bring your latest financial reports (balance sheet and profit & loss statement), your most recent tax returns, and login details or read-only access to your bookkeeping software (Xero/MYOB)."
  }
];

// Testimonials Data
const TESTIMONIALS = [
  {
    quote: "M4 Plus has completely transformed our business operations. Their virtual CFO service helped us scale our construction firm from $1.5M to $6M in annual turnover while increasing our margins. They truly go beyond standard tax returns.",
    name: "Michael Henderson",
    role: "Managing Director",
    company: "Henderson Build Group",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80"
  },
  {
    quote: "Switching to M4 Plus was the best decision we made. Their cloud accounting migration was seamless, and their proactive tax planning saved us over $45,000 in our first year alone. Their response time is exceptional.",
    name: "Sarah Jenkins",
    role: "Co-Founder",
    company: "Velo Digital Agency",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80"
  },
  {
    quote: "As a medical practitioner, finding advisors who understand professional fee split structures and SMSFs was critical. M4 Plus provides expert, reliable advice that has secured my family's financial future.",
    name: "Dr. David Chen",
    role: "Principal Cardiologist",
    company: "Metro Heart Clinic",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80"
  }
];

// Animation presets
const fadeUp = {
  hidden: { opacity: 0, y: 35 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function M4AccountingHome() {
  // Hero Slider Data
  const heroSlides = [
    {
      title: "From Compliance Accounting",
      subtitle: "Helping businesses stay compliant with confidence through expert accounting, taxation and financial reporting services tailored for sustainable growth.",
      badge: "Enterprise Financial Advisory",
      image: "/Compliance Accounting Image.webp",
      highlight: "Compliance Accounting"
    },
    {
      title: "Estate Planning and Wills",
      subtitle: "Protecting family wealth and ensuring a smooth transfer of assets to future generations through strategic estate planning and tax-effective solutions.",
      badge: "Wealth Protection & Transfer",
      image: "/Estate Planning and Wealth Transfer Image.webp",
      highlight: "Estate Planning and Wills"
    },
    {
      title: "From Construction Workers",
      subtitle: "Supporting builders, contractors and tradies with industry-specific accounting, payroll, taxation and business advisory services.",
      badge: "Industry-Specific Accounting",
      image: "/Construction Industry Image.webp",
      highlight: "Construction Workers"
    },
    {
      title: "Women Entrepreneurs",
      subtitle: "Empowering ambitious women business owners with strategic financial guidance, business growth solutions and long-term wealth creation expertise.",
      badge: "Empowering Women in Business",
      image: "/Women Business Owner Image.webp",
      highlight: "Women Entrepreneurs"
    }
  ];

  const [currentHeroSlide, setCurrentHeroSlide] = useState(0);

  // Auto-slide every 5.5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentHeroSlide(prev => (prev + 1) % heroSlides.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  const renderHeroTitle = (title: string, highlight: string) => {
    if (!highlight) return title;
    const regex = new RegExp(`(${highlight})`, 'gi');
    const parts = title.split(regex);
    return parts.map((part, index) => 
      part.toLowerCase() === highlight.toLowerCase() ? (
        <span key={index} className="text-[#E31E24]">{part}</span>
      ) : (
        part
      )
    );
  };



  // Callback Form State
  const [callbackForm, setCallbackForm] = useState({
    name: '',
    phone: '',
    business: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleCallbackSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!callbackForm.name || !callbackForm.phone) return;
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setCallbackForm({ name: '', phone: '', business: '' });
    }, 5000);
  };

  // Savings Calculator States
  const [turnover, setTurnover] = useState('500k-2m');
  const [structure, setStructure] = useState('company');
  const [currentSpend, setCurrentSpend] = useState('5k-15k');
  const [estimatedSavings, setEstimatedSavings] = useState(3200);

  // Calculate savings dynamically
  useEffect(() => {
    let baseSavings = 1200;

    // Current spend factor
    if (currentSpend === 'under-5k') baseSavings = 950;
    else if (currentSpend === '5k-15k') baseSavings = 3200;
    else if (currentSpend === '15k-30k') baseSavings = 6800;
    else if (currentSpend === '30k-plus') baseSavings = 11500;

    // Structure multiplier
    let structureMult = 1.0;
    if (structure === 'company') structureMult = 1.15;
    else if (structure === 'smsf') structureMult = 1.25;

    // Turnover factor
    let turnoverAdd = 0;
    if (turnover === '2m-5m') turnoverAdd = 800;
    else if (turnover === '5m-plus') turnoverAdd = 1800;

    const finalSavings = Math.round((baseSavings * structureMult) + turnoverAdd);
    setEstimatedSavings(finalSavings);
  }, [turnover, structure, currentSpend]);

  // Accordion active state
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  // Testimonials Slider State
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTestimonial(prev => (prev + 1) % TESTIMONIALS.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-red-500 selection:text-white antialiased">
      
      {/* ------------------------------------------------
          TOP UTILITY BAR
          ------------------------------------------------ */}
      <div className="bg-slate-950 text-slate-300 py-2 border-b border-slate-900 text-xs font-medium">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-6">
            <a href="tel:1300888642" className="flex items-center gap-2 hover:text-[#E31E24] transition-colors duration-200">
              <FiPhone className="text-[#E31E24]" />
              <span>1300 888 642</span>
            </a>
            <a href="mailto:info@m4plus.com.au" className="flex items-center gap-2 hover:text-[#E31E24] transition-colors duration-200">
              <FiMail className="text-[#E31E24]" />
              <span>info@m4plus.com.au</span>
            </a>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-slate-500">Connect with us:</span>
            <a href="#" className="hover:text-[#E31E24] transition-colors"><FiFacebook /></a>
            <a href="#" className="hover:text-[#E31E24] transition-colors"><FiLinkedin /></a>
            <a href="#" className="hover:text-[#E31E24] transition-colors"><FiTwitter /></a>
            <a href="#" className="hover:text-[#E31E24] transition-colors"><FiInstagram /></a>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------
          STICKY HEADER
          ------------------------------------------------ */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 bg-[#E31E24] text-white font-extrabold flex items-center justify-center text-xl rounded-lg group-hover:bg-[#C2141A] transition-colors duration-300">
              M4
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-lg tracking-tight text-slate-950">PLUS</span>
              <span className="text-[10px] text-slate-500 tracking-[0.25em] font-semibold -mt-1">ACCOUNTING</span>
            </div>
          </a>

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8 font-semibold text-slate-600 text-sm relative">
            <a href="#" className="text-slate-950 hover:text-[#E31E24] transition-colors duration-200">Home</a>
            <a href="#services" className="hover:text-[#E31E24] transition-colors duration-200">Services</a>
            <a href="#why-choose-us" className="hover:text-[#E31E24] transition-colors duration-200">Industries</a>
            <a href="#blog" className="hover:text-[#E31E24] transition-colors duration-200">Resources</a>
            <a href="#why-m4" className="hover:text-[#E31E24] transition-colors duration-200">About Us</a>
            <a href="#faq" className="hover:text-[#E31E24] transition-colors duration-200">Contact</a>
          </nav>

          {/* Header CTA */}
          <a 
            href="#join-form" 
            className="bg-[#E31E24] text-white hover:bg-[#C2141A] font-bold text-sm px-6 py-3 rounded-lg shadow-lg hover:shadow-red-500/20 transition-all duration-300"
          >
            Book Free Consultation
          </a>
        </div>
      </header>

      {/* ------------------------------------------------
          SECTION 1 : HERO
          ------------------------------------------------ */}
      <section className="relative bg-slate-50 py-16 lg:py-24 overflow-hidden border-b border-slate-100">
        {/* Decorative Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30" />

        <div className="max-w-7xl mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Hero Left Content */}
          <div className="lg:col-span-7 space-y-8 flex flex-col justify-center min-h-[460px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentHeroSlide}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="space-y-8"
              >
                <div className="inline-flex items-center gap-2 bg-red-50 border border-red-100 rounded-full px-4 py-1.5 text-xs font-semibold text-[#E31E24]">
                  <span className="flex h-2 w-2 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                  </span>
                  {heroSlides[currentHeroSlide].badge}
                </div>
                
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-950 tracking-tight leading-[1.08] min-h-[2.5em] lg:min-h-[2.2em]">
                  {renderHeroTitle(heroSlides[currentHeroSlide].title, heroSlides[currentHeroSlide].highlight)}
                </h1>
                
                <p className="text-lg text-slate-600 max-w-xl leading-relaxed min-h-[4.5em]">
                  {heroSlides[currentHeroSlide].subtitle}
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <a 
                    href="#join-form" 
                    className="bg-[#E31E24] text-white hover:bg-[#C2141A] font-bold text-center px-8 py-4 rounded-lg shadow-xl hover:shadow-red-500/20 transform hover:-translate-y-0.5 transition-all duration-200"
                  >
                    Book Free Consultation
                  </a>
                  <a 
                    href="#services" 
                    className="bg-white text-slate-900 border border-slate-200 hover:border-slate-400 font-bold text-center px-8 py-4 rounded-lg shadow-sm hover:shadow-md transform hover:-translate-y-0.5 transition-all duration-200"
                  >
                    View Our Services
                  </a>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Slide Navigation Dots */}
            <div className="flex items-center gap-2.5 pt-2">
              {heroSlides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentHeroSlide(idx)}
                  className={`h-2.5 rounded-full transition-all duration-300 ${idx === currentHeroSlide ? 'bg-[#E31E24] w-6' : 'bg-slate-350 hover:bg-slate-400 w-2.5'}`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            {/* Trust Badges */}
            <div className="pt-6 border-t border-slate-200/80 flex flex-wrap items-center gap-8">
              <div className="flex items-center gap-3">
                <div className="flex text-yellow-500">
                  {[...Array(5)].map((_, i) => <FiStar key={i} fill="currentColor" className="w-4 h-4" />)}
                </div>
                <div className="text-xs">
                  <p className="font-bold text-slate-900">4.9/5 on Google Reviews</p>
                  <p className="text-slate-500">120+ Active Business Clients</p>
                </div>
              </div>
              <div className="h-8 w-px bg-slate-200" />
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded bg-slate-900 text-white font-extrabold flex items-center justify-center text-xs">CPA</div>
                <div className="text-xs font-bold text-slate-800 uppercase tracking-wider">CPA Practice</div>
              </div>
              <div className="h-8 w-px bg-slate-200" />
              <div className="text-xs">
                <p className="font-bold text-slate-850">Registered Tax Agent</p>
                <p className="text-slate-500 font-medium text-[10px] tracking-wide">BOARD REGISTERED #260517</p>
              </div>
            </div>
          </div>

          {/* Hero Right Callback Card */}
          <div className="lg:col-span-5 relative">
            {/* Background blur orb behind the card */}
            <div className="absolute -inset-4 bg-gradient-to-r from-red-500 to-indigo-500 rounded-2xl filter blur-xl opacity-10" />

            <div className="relative glass-effect p-8 rounded-[20px] shadow-2xl border border-white">
              <h3 className="text-xl font-bold text-slate-950 mb-1">Request a Callback</h3>
              <p className="text-slate-500 text-xs mb-6 font-medium">Leave your details and a strategist will call you back shortly.</p>

              {formSubmitted ? (
                <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-6 text-center text-emerald-800 text-sm">
                  <FiCheckCircle className="w-12 h-12 text-emerald-500 mx-auto mb-3" />
                  <p className="font-bold mb-1">Callback Requested!</p>
                  <p className="text-xs text-emerald-600">We will call you back within 15 minutes.</p>
                </div>
              ) : (
                <form onSubmit={handleCallbackSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5" htmlFor="cb-name">Full Name *</label>
                    <input 
                      type="text" 
                      id="cb-name"
                      required
                      placeholder="e.g. Jane Miller"
                      value={callbackForm.name}
                      onChange={(e) => setCallbackForm(prev => ({...prev, name: e.target.value}))}
                      className="w-full bg-white/70 border border-slate-200 focus:border-[#E31E24] focus:ring-1 focus:ring-[#E31E24] rounded-lg px-4 py-3 text-sm transition-all outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5" htmlFor="cb-phone">Phone Number *</label>
                    <input 
                      type="tel" 
                      id="cb-phone"
                      required
                      placeholder="e.g. 0400 000 000"
                      value={callbackForm.phone}
                      onChange={(e) => setCallbackForm(prev => ({...prev, phone: e.target.value}))}
                      className="w-full bg-white/70 border border-slate-200 focus:border-[#E31E24] focus:ring-1 focus:ring-[#E31E24] rounded-lg px-4 py-3 text-sm transition-all outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5" htmlFor="cb-business">Business Name</label>
                    <input 
                      type="text" 
                      id="cb-business"
                      placeholder="e.g. Miller & Co"
                      value={callbackForm.business}
                      onChange={(e) => setCallbackForm(prev => ({...prev, business: e.target.value}))}
                      className="w-full bg-white/70 border border-slate-200 focus:border-[#E31E24] focus:ring-1 focus:ring-[#E31E24] rounded-lg px-4 py-3 text-sm transition-all outline-none"
                    />
                  </div>

                  <button 
                    type="submit"
                    className="w-full bg-[#E31E24] text-white hover:bg-[#C2141A] font-bold text-sm py-3.5 rounded-lg shadow-md hover:shadow-red-500/10 transition-all duration-300"
                  >
                    Request Callback
                  </button>
                </form>
              )}
            </div>

            {/* Overlapping small visual image */}
            <div className="mt-8 relative h-48 rounded-[20px] overflow-hidden shadow-lg border border-slate-200 bg-slate-100">
              <AnimatePresence mode="wait">
                <motion.img 
                  key={currentHeroSlide}
                  src={heroSlides[currentHeroSlide].image} 
                  alt={heroSlides[currentHeroSlide].title} 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="w-full h-full object-cover absolute inset-0"
                />
              </AnimatePresence>
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------
          SECTION 2 : TRUSTED BRANDS LOGO SLIDER
          ------------------------------------------------ */}
      <section className="py-12 border-b border-slate-100 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-center text-xs font-bold uppercase tracking-widest text-slate-400 mb-8">
            Certified Cloud Integrators & Advisors
          </p>
          
          <div className="relative overflow-hidden w-full flex items-center">
            {/* Soft gradient mask for edges */}
            <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

            <div className="flex animate-infinite-scroll gap-16 min-w-full">
              {[...BRANDS, ...BRANDS, ...BRANDS].map((brand, i) => (
                <div key={i} className="flex items-center justify-center min-w-[140px] h-12">
                  <span className="text-2xl font-black text-slate-300 hover:text-slate-800 transition-colors duration-300 tracking-wider">
                    {brand}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------
          SECTION 3 : WHY CHOOSE US
          ------------------------------------------------ */}
      <section id="services" className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[#E31E24] text-xs font-bold tracking-widest uppercase block mb-3">Our Values</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-950">
              We go beyond numbers to drive your success
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="group bg-slate-50 hover:bg-slate-900 border border-slate-100 p-8 rounded-[20px] shadow-soft hover:shadow-card-hover transform hover:-translate-y-2 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-red-50 text-[#E31E24] group-hover:bg-[#E31E24] group-hover:text-white flex items-center justify-center text-xl transition-all duration-300 mb-6">
                <FiTrendingUp />
              </div>
              <h3 className="text-lg font-bold text-slate-950 group-hover:text-white mb-3 transition-colors duration-300">Proactive & Strategic</h3>
              <p className="text-slate-500 group-hover:text-slate-400 text-sm leading-relaxed transition-colors duration-300">
                We don't just report history. We help design your future with tax planning templates and forward-looking growth forecasts.
              </p>
            </div>

            {/* Card 2 */}
            <div className="group bg-slate-50 hover:bg-slate-900 border border-slate-100 p-8 rounded-[20px] shadow-soft hover:shadow-card-hover transform hover:-translate-y-2 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-red-50 text-[#E31E24] group-hover:bg-[#E31E24] group-hover:text-white flex items-center justify-center text-xl transition-all duration-300 mb-6">
                <FiSliders />
              </div>
              <h3 className="text-lg font-bold text-slate-950 group-hover:text-white mb-3 transition-colors duration-300">Tailored Solutions</h3>
              <p className="text-slate-500 group-hover:text-slate-400 text-sm leading-relaxed transition-colors duration-300">
                Every business model has its own logic. We build structural solutions tailored exclusively to your corporate setup.
              </p>
            </div>

            {/* Card 3 */}
            <div className="group bg-slate-50 hover:bg-slate-900 border border-slate-100 p-8 rounded-[20px] shadow-soft hover:shadow-card-hover transform hover:-translate-y-2 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-red-50 text-[#E31E24] group-hover:bg-[#E31E24] group-hover:text-white flex items-center justify-center text-xl transition-all duration-300 mb-6">
                <FiMessageSquare />
              </div>
              <h3 className="text-lg font-bold text-slate-950 group-hover:text-white mb-3 transition-colors duration-300">Reliable & Responsive</h3>
              <p className="text-slate-500 group-hover:text-slate-400 text-sm leading-relaxed transition-colors duration-300">
                Tired of unreturned calls? We guarantee responses within 4 business hours to address any financial emergency.
              </p>
            </div>

            {/* Card 4 */}
            <div className="group bg-slate-50 hover:bg-slate-900 border border-slate-100 p-8 rounded-[20px] shadow-soft hover:shadow-card-hover transform hover:-translate-y-2 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-red-50 text-[#E31E24] group-hover:bg-[#E31E24] group-hover:text-white flex items-center justify-center text-xl transition-all duration-300 mb-6">
                <FiAward />
              </div>
              <h3 className="text-lg font-bold text-slate-950 group-hover:text-white mb-3 transition-colors duration-300">15+ Years Experience</h3>
              <p className="text-slate-500 group-hover:text-slate-400 text-sm leading-relaxed transition-colors duration-300">
                A verified track record managing portfolios and auditing operations through shifting legal landscapes.
              </p>
            </div>

            {/* Card 5 */}
            <div className="group bg-slate-50 hover:bg-slate-900 border border-slate-100 p-8 rounded-[20px] shadow-soft hover:shadow-card-hover transform hover:-translate-y-2 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-red-50 text-[#E31E24] group-hover:bg-[#E31E24] group-hover:text-white flex items-center justify-center text-xl transition-all duration-300 mb-6">
                <FiUsers />
              </div>
              <h3 className="text-lg font-bold text-slate-950 group-hover:text-white mb-3 transition-colors duration-300">5000+ Happy Clients</h3>
              <p className="text-slate-500 group-hover:text-slate-400 text-sm leading-relaxed transition-colors duration-300">
                From pre-revenue startups to multi-million dollar corporations, our customer network is solid and growing.
              </p>
            </div>

            {/* Card 6 */}
            <div className="group bg-slate-50 hover:bg-slate-900 border border-slate-100 p-8 rounded-[20px] shadow-soft hover:shadow-card-hover transform hover:-translate-y-2 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-red-50 text-[#E31E24] group-hover:bg-[#E31E24] group-hover:text-white flex items-center justify-center text-xl transition-all duration-300 mb-6">
                <FiHeart />
              </div>
              <h3 className="text-lg font-bold text-slate-950 group-hover:text-white mb-3 transition-colors duration-300">98% Satisfaction</h3>
              <p className="text-slate-500 group-hover:text-slate-400 text-sm leading-relaxed transition-colors duration-300">
                Our retention metric shows our clients value consistent, honest, and high-performance financial advisory.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------
          SECTION 4 : HOW WE WORK (TIMELINE)
          ------------------------------------------------ */}
      <section className="py-20 lg:py-28 bg-slate-50 border-t border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <span className="text-[#E31E24] text-xs font-bold tracking-widest uppercase block mb-3">Workflow</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-950">
              A simple process for lasting impact
            </h2>
          </div>

          <div className="relative grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto">
            {/* Connecting line on desktop */}
            <div className="hidden md:block absolute top-[52px] left-[15%] right-[15%] h-0.5 timeline-dotted-line z-0" />

            {/* Step 1 */}
            <div className="relative z-10 text-center flex flex-col items-center group">
              <div className="w-24 h-24 rounded-full bg-white border-4 border-slate-100 text-[#E31E24] font-extrabold text-2xl flex items-center justify-center shadow-md group-hover:border-[#E31E24] transition-all duration-300 mb-6">
                01
              </div>
              <h3 className="text-lg font-bold text-slate-950 mb-2">Understand Your Goals</h3>
              <p className="text-slate-500 text-xs px-4 leading-relaxed">
                We sit down to learn about your business structure, cash flow roadblocks, and ultimate financial vision.
              </p>
            </div>

            {/* Step 2 */}
            <div className="relative z-10 text-center flex flex-col items-center group">
              <div className="w-24 h-24 rounded-full bg-white border-4 border-slate-100 text-[#E31E24] font-extrabold text-2xl flex items-center justify-center shadow-md group-hover:border-[#E31E24] transition-all duration-300 mb-6">
                02
              </div>
              <h3 className="text-lg font-bold text-slate-950 mb-2">Craft Smart Solutions</h3>
              <p className="text-slate-500 text-xs px-4 leading-relaxed">
                Our accountants structure a custom-tailored strategy covering tax, cloud setups, and advisory models.
              </p>
            </div>

            {/* Step 3 */}
            <div className="relative z-10 text-center flex flex-col items-center group">
              <div className="w-24 h-24 rounded-full bg-white border-4 border-slate-100 text-[#E31E24] font-extrabold text-2xl flex items-center justify-center shadow-md group-hover:border-[#E31E24] transition-all duration-300 mb-6">
                03
              </div>
              <h3 className="text-lg font-bold text-slate-950 mb-2">Deliver & Grow Together</h3>
              <p className="text-slate-500 text-xs px-4 leading-relaxed">
                We implement the plan, run compliance seamlessly, and meet regularly to track cash flow and optimization.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------
          SECTION 5 : DARK STATISTICS SECTION
          ------------------------------------------------ */}
      <section className="relative py-24 lg:py-32 overflow-hidden bg-slate-950">
        {/* Background Image with Dark Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-15"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1200&q=80')" }}
        />
        <div className="absolute inset-0 bg-slate-950/85" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            
            {/* Stat Card 1 */}
            <div className="glass-effect-dark p-8 rounded-[20px] text-center">
              <p className="text-5xl font-black text-white mb-2 font-mono tracking-tight">5000+</p>
              <div className="h-0.5 w-12 bg-[#E31E24] mx-auto mb-4" />
              <p className="text-slate-300 font-semibold text-sm">Businesses Supported</p>
            </div>

            {/* Stat Card 2 */}
            <div className="glass-effect-dark p-8 rounded-[20px] text-center">
              <p className="text-5xl font-black text-white mb-2 font-mono tracking-tight">98%</p>
              <div className="h-0.5 w-12 bg-[#E31E24] mx-auto mb-4" />
              <p className="text-slate-300 font-semibold text-sm">Client Retention Rate</p>
            </div>

            {/* Stat Card 3 */}
            <div className="glass-effect-dark p-8 rounded-[20px] text-center">
              <p className="text-5xl font-black text-white mb-2 font-mono tracking-tight">15+</p>
              <div className="h-0.5 w-12 bg-[#E31E24] mx-auto mb-4" />
              <p className="text-slate-300 font-semibold text-sm">Years in Business</p>
            </div>

            {/* Stat Card 4 */}
            <div className="glass-effect-dark p-8 rounded-[20px] text-center">
              <p className="text-5xl font-black text-white mb-2 font-mono tracking-tight">50+</p>
              <div className="h-0.5 w-12 bg-[#E31E24] mx-auto mb-4" />
              <p className="text-slate-300 font-semibold text-sm">Expert Team Members</p>
            </div>

          </div>
        </div>
      </section>

      {/* ------------------------------------------------
          SECTION 6 : SAVINGS CALCULATOR
          ------------------------------------------------ */}
      <section className="py-20 lg:py-28 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Calculator Left Description */}
          <div className="lg:col-span-5 space-y-6">
            <span className="text-[#E31E24] text-xs font-bold tracking-widest uppercase block">ROI Estimator</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight leading-tight">
              See how much you could save
            </h2>
            <p className="text-slate-600 leading-relaxed text-sm">
              We leverage cloud workflows, paperless systems, and proactive pre-June tax deductions to optimize your bottom line. Use our calculator to see the potential savings on administrative compliance and tax restructuring.
            </p>
            <div className="space-y-4 pt-4">
              <div className="flex items-center gap-3">
                <FiCheckCircle className="text-[#E31E24] flex-shrink-0" />
                <span className="text-sm font-semibold text-slate-800">Avg. 25% drop in structural administrative overhead</span>
              </div>
              <div className="flex items-center gap-3">
                <FiCheckCircle className="text-[#E31E24] flex-shrink-0" />
                <span className="text-sm font-semibold text-slate-800">Optimized trust distributions and corporate deductions</span>
              </div>
              <div className="flex items-center gap-3">
                <FiCheckCircle className="text-[#E31E24] flex-shrink-0" />
                <span className="text-sm font-semibold text-slate-800">Gold partner software discounts (Xero / MYOB)</span>
              </div>
            </div>
          </div>

          {/* Calculator Right Interactive Card */}
          <div className="lg:col-span-7">
            <div className="bg-slate-50 border border-slate-100 rounded-[20px] p-8 md:p-10 shadow-xl">
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {/* Turnover */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-2">Annual Turnover</label>
                  <select 
                    value={turnover}
                    onChange={(e) => setTurnover(e.target.value)}
                    className="w-full bg-white border border-slate-200 focus:border-[#E31E24] rounded-lg px-3 py-2.5 text-xs font-medium outline-none"
                  >
                    <option value="under-500k">Under $500k</option>
                    <option value="500k-2m">$500k - $2M</option>
                    <option value="2m-5m">$2M - $5M</option>
                    <option value="5m-plus">$5M+</option>
                  </select>
                </div>

                {/* Structure */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-2">Business Structure</label>
                  <select 
                    value={structure}
                    onChange={(e) => setStructure(e.target.value)}
                    className="w-full bg-white border border-slate-200 focus:border-[#E31E24] rounded-lg px-3 py-2.5 text-xs font-medium outline-none"
                  >
                    <option value="sole-trader">Sole Trader</option>
                    <option value="company">Company / Trust</option>
                    <option value="smsf">SMSF Account</option>
                  </select>
                </div>

                {/* Spend */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-2">Current Accounting Spend</label>
                  <select 
                    value={currentSpend}
                    onChange={(e) => setCurrentSpend(e.target.value)}
                    className="w-full bg-white border border-slate-200 focus:border-[#E31E24] rounded-lg px-3 py-2.5 text-xs font-medium outline-none"
                  >
                    <option value="under-5k">Under $5,000 / yr</option>
                    <option value="5k-15k">$5,000 - $15,000</option>
                    <option value="15k-30k">$15,000 - $30,000</option>
                    <option value="30k-plus">$30,000+ / yr</option>
                  </select>
                </div>
              </div>

              {/* Dynamic Result Panel */}
              <div className="bg-white border border-slate-200 p-8 rounded-xl text-center space-y-4 mb-6 shadow-sm">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Estimated Annual Savings</span>
                <p className="text-5xl font-black text-slate-950 font-mono">
                  ${estimatedSavings.toLocaleString()}
                </p>
                <p className="text-slate-500 text-xs max-w-sm mx-auto leading-relaxed">
                  Calculated based on standard client transition cases and compliance auditing structures.
                </p>
              </div>

              <a 
                href="#join-form"
                className="block text-center bg-[#E31E24] text-white hover:bg-[#C2141A] font-bold text-sm py-4 rounded-lg shadow-md hover:shadow-red-500/10 transition-all duration-300"
              >
                Claim My Free Strategic Review
              </a>

            </div>
          </div>

        </div>
      </section>

      {/* ------------------------------------------------
          SECTION 7 : FAQ (ACCORDION STYLE)
          ------------------------------------------------ */}
      <section id="faq" className="py-20 lg:py-28 bg-slate-50">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[#E31E24] text-xs font-bold tracking-widest uppercase block mb-3">FAQ</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-950">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq, index) => {
              const isOpen = activeFaq === index;
              return (
                <div 
                  key={index}
                  className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-soft transition-all duration-300"
                >
                  <button 
                    onClick={() => toggleFaq(index)}
                    className="w-full text-left p-6 flex justify-between items-center gap-4 hover:bg-slate-50/50 transition-colors"
                  >
                    <span className="font-bold text-slate-900 text-sm md:text-base">{faq.q}</span>
                    <span className={`w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                      <FiChevronDown />
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div 
                        initial={{ height: 0 }}
                        animate={{ height: "auto" }}
                        exit={{ height: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 pt-1 text-slate-600 text-xs md:text-sm leading-relaxed border-t border-slate-50/50 bg-slate-50/30">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------
          SECTION 8 : WHY M4 PLUS
          ------------------------------------------------ */}
      <section id="why-m4" className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[#E31E24] text-xs font-bold tracking-widest uppercase block mb-3">Our Framework</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-950">
              Why M4 Plus?
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Card 1 */}
            <div className="text-center p-6 bg-slate-50 rounded-[20px] border border-slate-100">
              <div className="w-16 h-16 rounded-full bg-red-100/60 border border-red-200 text-[#E31E24] flex items-center justify-center text-2xl mx-auto mb-6">
                <FiUsers />
              </div>
              <h3 className="text-base font-bold text-slate-950 mb-2">Expert Team</h3>
              <p className="text-slate-500 text-xs leading-relaxed px-2">
                CA & CPA certified specialists who continually study changing tax regulations.
              </p>
            </div>

            {/* Card 2 */}
            <div className="text-center p-6 bg-slate-50 rounded-[20px] border border-slate-100">
              <div className="w-16 h-16 rounded-full bg-red-100/60 border border-red-200 text-[#E31E24] flex items-center justify-center text-2xl mx-auto mb-6">
                <FiShield />
              </div>
              <h3 className="text-base font-bold text-slate-950 mb-2">Trusted Advisors</h3>
              <p className="text-slate-500 text-xs leading-relaxed px-2">
                Operating with institutional confidentiality and complete integrity standards.
              </p>
            </div>

            {/* Card 3 */}
            <div className="text-center p-6 bg-slate-50 rounded-[20px] border border-slate-100">
              <div className="w-16 h-16 rounded-full bg-red-100/60 border border-red-200 text-[#E31E24] flex items-center justify-center text-2xl mx-auto mb-6">
                <FiClock />
              </div>
              <h3 className="text-base font-bold text-slate-950 mb-2">Always Available</h3>
              <p className="text-slate-500 text-xs leading-relaxed px-2">
                Responsive email systems and direct-line phone access when you need immediate support.
              </p>
            </div>

            {/* Card 4 */}
            <div className="text-center p-6 bg-slate-50 rounded-[20px] border border-slate-100">
              <div className="w-16 h-16 rounded-full bg-red-100/60 border border-red-200 text-[#E31E24] flex items-center justify-center text-2xl mx-auto mb-6">
                <FiTarget />
              </div>
              <h3 className="text-base font-bold text-slate-950 mb-2">Proven Results</h3>
              <p className="text-slate-500 text-xs leading-relaxed px-2">
                Measurable cash flow enhancements and tax optimization for thousands of companies.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------
          SECTION 9 : BLOG SECTION
          ------------------------------------------------ */}
      <section id="blog" className="py-20 lg:py-28 bg-slate-50 border-t border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[#E31E24] text-xs font-bold tracking-widest uppercase block mb-3">Resources</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-950">
              Insights to help your business grow
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Blog Card 1 */}
            <div className="bg-white border border-slate-100 rounded-[20px] overflow-hidden shadow-soft hover:shadow-md transform hover:scale-[1.03] transition-all duration-300">
              <div className="h-56 relative overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1586486855514-8c633cc6fd38?auto=format&fit=crop&w=600&q=80" 
                  alt="Tax planning" 
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-4 left-4 bg-red-50 text-[#E31E24] border border-red-100 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
                  Tax Planning
                </span>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex items-center gap-3 text-slate-400 text-xs font-medium">
                  <span>Oct 15, 2026</span>
                  <span>•</span>
                  <span>5 min read</span>
                </div>
                <h3 className="text-base font-bold text-slate-950 leading-snug">
                  Key Corporate Tax Planning Strategies for the Next Financial Year
                </h3>
                <p className="text-slate-500 text-xs leading-relaxed line-clamp-3">
                  Discover the pre-June corporate tax deductions and asset consolidation workflows you must register to save on your upcoming ledger.
                </p>
                <a href="#" className="inline-flex items-center gap-1.5 text-sm font-bold text-[#E31E24] hover:text-[#C2141A] transition-colors">
                  Read More <FiArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Blog Card 2 */}
            <div className="bg-white border border-slate-100 rounded-[20px] overflow-hidden shadow-soft hover:shadow-md transform hover:scale-[1.03] transition-all duration-300">
              <div className="h-56 relative overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80" 
                  alt="Business growth" 
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-4 left-4 bg-red-50 text-[#E31E24] border border-red-100 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
                  Business Growth
                </span>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex items-center gap-3 text-slate-400 text-xs font-medium">
                  <span>Oct 08, 2026</span>
                  <span>•</span>
                  <span>7 min read</span>
                </div>
                <h3 className="text-base font-bold text-slate-950 leading-snug">
                  Why Virtual CFO Services Are Essential for Rapidly Scaling SMBs
                </h3>
                <p className="text-slate-500 text-xs leading-relaxed line-clamp-3">
                  Learn how expert board reporting and cash flow forecasting can help you raise capital without compromising equity or overhead constraints.
                </p>
                <a href="#" className="inline-flex items-center gap-1.5 text-sm font-bold text-[#E31E24] hover:text-[#C2141A] transition-colors">
                  Read More <FiArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Blog Card 3 */}
            <div className="bg-white border border-slate-100 rounded-[20px] overflow-hidden shadow-soft hover:shadow-md transform hover:scale-[1.03] transition-all duration-300">
              <div className="h-56 relative overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&q=80" 
                  alt="Accounting services" 
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-4 left-4 bg-red-50 text-[#E31E24] border border-red-100 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
                  Compliance
                </span>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex items-center gap-3 text-slate-400 text-xs font-medium">
                  <span>Sep 29, 2026</span>
                  <span>•</span>
                  <span>4 min read</span>
                </div>
                <h3 className="text-base font-bold text-slate-950 leading-snug">
                  Complete Checklist: Migrating Your Accounting Systems to Cloud Ledger
                </h3>
                <p className="text-slate-500 text-xs leading-relaxed line-clamp-3">
                  A comprehensive breakdown detailing audit guidelines, transition milestones, and staff training requirements for Xero and MYOB.
                </p>
                <a href="#" className="inline-flex items-center gap-1.5 text-sm font-bold text-[#E31E24] hover:text-[#C2141A] transition-colors">
                  Read More <FiArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ------------------------------------------------
          SECTION 10 : TESTIMONIALS
          ------------------------------------------------ */}
      <section className="py-20 lg:py-28 bg-white overflow-hidden">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[#E31E24] text-xs font-bold tracking-widest uppercase block mb-3">Testimonials</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-950">
              What our partners say
            </h2>
          </div>

          {/* Testimonial slider wrap */}
          <div className="relative min-h-[300px] flex items-center justify-center">
            
            <AnimatePresence mode="wait">
              <motion.div 
                key={activeTestimonial}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.4 }}
                className="w-full"
              >
                <div className="glass-effect p-8 md:p-12 rounded-[20px] border border-slate-100 shadow-xl flex flex-col md:flex-row gap-8 items-center md:items-start text-center md:text-left">
                  
                  {/* Avatar */}
                  <div className="flex-shrink-0">
                    <img 
                      src={TESTIMONIALS[activeTestimonial].image} 
                      alt={TESTIMONIALS[activeTestimonial].name} 
                      className="w-20 h-20 rounded-full object-cover border-2 border-[#E31E24] shadow-md"
                    />
                  </div>

                  {/* Quote & details */}
                  <div className="space-y-4">
                    <div className="flex text-yellow-500 justify-center md:justify-start">
                      {[...Array(5)].map((_, i) => <FiStar key={i} fill="currentColor" className="w-4 h-4" />)}
                    </div>
                    
                    <p className="text-slate-700 italic text-base md:text-lg leading-relaxed font-medium">
                      "{TESTIMONIALS[activeTestimonial].quote}"
                    </p>

                    <div>
                      <h4 className="font-bold text-slate-950 text-sm md:text-base">{TESTIMONIALS[activeTestimonial].name}</h4>
                      <p className="text-[#E31E24] text-xs font-semibold">{TESTIMONIALS[activeTestimonial].role}, {TESTIMONIALS[activeTestimonial].company}</p>
                    </div>
                  </div>

                </div>
              </motion.div>
            </AnimatePresence>

            {/* Slider Dots */}
            <div className="absolute -bottom-8 flex gap-2">
              {TESTIMONIALS.map((_, i) => (
                <button 
                  key={i}
                  onClick={() => setActiveTestimonial(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${activeTestimonial === i ? 'bg-[#E31E24] w-6' : 'bg-slate-200'}`}
                />
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ------------------------------------------------
          SECTION 11 : FREE BOOKLETS
          ------------------------------------------------ */}
      <section className="py-20 lg:py-24 bg-gradient-to-r from-[#E31E24] to-[#A81216] text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="bg-white/10 text-white border border-white/20 px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider inline-block mb-3">
              Guides & Templates
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Download Free Financial Guides
            </h2>
            <p className="text-red-100 text-xs md:text-sm mt-3 max-w-lg mx-auto">
              Equip your internal bookkeeping team with verified resources prepared by corporate tax strategists.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Guide Card 1 */}
            <div className="bg-white/10 backdrop-blur-md border border-white/10 p-8 rounded-[20px] flex flex-col justify-between hover:bg-white/15 transition-all duration-300">
              <div>
                <div className="w-10 h-10 rounded-lg bg-white/10 text-white flex items-center justify-center text-lg mb-6">
                  📄
                </div>
                <h3 className="text-lg font-bold mb-2">Tax Planning Guide</h3>
                <p className="text-red-100 text-xs leading-relaxed mb-6">
                  A step-by-step workbook to prepare corporate write-offs, structures, and trust setups.
                </p>
              </div>
              <a 
                href="#"
                onClick={(e) => { e.preventDefault(); alert("Tax Planning Guide download started! (Simulated)"); }}
                className="w-full bg-white text-[#E31E24] hover:bg-red-50 font-bold text-xs py-3 rounded-lg text-center flex items-center justify-center gap-2 transition-all"
              >
                <FiDownload /> Download Guide
              </a>
            </div>

            {/* Guide Card 2 */}
            <div className="bg-white/10 backdrop-blur-md border border-white/10 p-8 rounded-[20px] flex flex-col justify-between hover:bg-white/15 transition-all duration-300">
              <div>
                <div className="w-10 h-10 rounded-lg bg-white/10 text-white flex items-center justify-center text-lg mb-6">
                  📊
                </div>
                <h3 className="text-lg font-bold mb-2">Cash Flow Template</h3>
                <p className="text-red-100 text-xs leading-relaxed mb-6">
                  An Excel dashboard setup to reconcile receivables, payables, and working capital cycles.
                </p>
              </div>
              <a 
                href="#"
                onClick={(e) => { e.preventDefault(); alert("Cash Flow Template download started! (Simulated)"); }}
                className="w-full bg-white text-[#E31E24] hover:bg-red-50 font-bold text-xs py-3 rounded-lg text-center flex items-center justify-center gap-2 transition-all"
              >
                <FiDownload /> Download Template
              </a>
            </div>

            {/* Guide Card 3 */}
            <div className="bg-white/10 backdrop-blur-md border border-white/10 p-8 rounded-[20px] flex flex-col justify-between hover:bg-white/15 transition-all duration-300">
              <div>
                <div className="w-10 h-10 rounded-lg bg-white/10 text-white flex items-center justify-center text-lg mb-6">
                  🚀
                </div>
                <h3 className="text-lg font-bold mb-2">Growth Strategies</h3>
                <p className="text-red-100 text-xs leading-relaxed mb-6">
                  Key financial parameters and benchmarks that fast-scaling retail and tech startups must target.
                </p>
              </div>
              <a 
                href="#"
                onClick={(e) => { e.preventDefault(); alert("Growth Strategies guide download started! (Simulated)"); }}
                className="w-full bg-white text-[#E31E24] hover:bg-red-50 font-bold text-xs py-3 rounded-lg text-center flex items-center justify-center gap-2 transition-all"
              >
                <FiDownload /> Download Guide
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------
          SECTION 12 : FINAL CTA
          ------------------------------------------------ */}
      <section id="join-form" className="py-24 bg-slate-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-radial-gradient from-red-600/10 to-transparent pointer-events-none" />

        <div className="max-w-4xl mx-auto px-6 text-center space-y-8 relative z-10">
          <span className="text-[#E31E24] text-xs font-bold tracking-widest uppercase block">Get Started</span>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Ready to take the next step?
          </h2>
          <p className="text-slate-400 text-sm max-w-xl mx-auto leading-relaxed">
            Book a complimentary, no-obligation session with a business advisor to review your accounts, corporate structure, and potential tax savings.
          </p>

          <div className="pt-4">
            <a 
              href="mailto:info@m4plus.com.au?subject=Consultation Inquiry"
              className="inline-flex items-center gap-3 bg-[#E31E24] hover:bg-[#C2141A] text-white font-bold text-base px-10 py-5 rounded-lg shadow-2xl hover:shadow-red-500/20 transform hover:-translate-y-0.5 transition-all duration-300"
            >
              Book a Free Consultation
            </a>
          </div>

          <div className="flex justify-center items-center gap-6 pt-6 text-xs text-slate-500 font-medium">
            <span>✓ No-obligation reviews</span>
            <span>•</span>
            <span>✓ CA & CPA specialists</span>
            <span>•</span>
            <span>✓ 100% Confidential</span>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------
          FOOTER
          ------------------------------------------------ */}
      <footer className="bg-slate-950 text-slate-400 border-t border-slate-900 py-16 text-sm">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
          
          {/* Col 1 - Logo & About */}
          <div className="lg:col-span-4 space-y-6">
            <a href="#" className="flex items-center gap-2.5">
              <div className="w-9 h-9 bg-[#E31E24] text-white font-extrabold flex items-center justify-center text-lg rounded">
                M4
              </div>
              <span className="font-extrabold text-base tracking-tight text-white">PLUS ACCOUNTING</span>
            </a>
            <p className="text-slate-500 text-xs leading-relaxed max-w-xs">
              CA & CPA certified firm driving structural tax optimization, cloud migrations, and corporate advisory solutions for scaling Australian businesses.
            </p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-white transition-colors text-lg"><FiFacebook /></a>
              <a href="#" className="hover:text-white transition-colors text-lg"><FiLinkedin /></a>
              <a href="#" className="hover:text-white transition-colors text-lg"><FiTwitter /></a>
              <a href="#" className="hover:text-white transition-colors text-lg"><FiInstagram /></a>
            </div>
          </div>

          {/* Col 2 - Services */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider">Services</h4>
            <ul className="space-y-2.5 text-xs font-semibold">
              <li><a href="#" className="hover:text-white transition-colors">Tax Compliance</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Virtual CFO</a></li>
              <li><a href="#" className="hover:text-white transition-colors">SMSF Accounting</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Bookkeeping</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Restructuring</a></li>
            </ul>
          </div>

          {/* Col 3 - Industries */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider">Industries</h4>
            <ul className="space-y-2.5 text-xs font-semibold">
              <li><a href="#" className="hover:text-white transition-colors">Construction</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Medical & Health</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Retail & eCommerce</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Professional Services</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Tech & SaaS</a></li>
            </ul>
          </div>

          {/* Col 4 - Resources */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider">Resources</h4>
            <ul className="space-y-2.5 text-xs font-semibold">
              <li><a href="#" className="hover:text-white transition-colors">Insights Blog</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Guides & Checklists</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Tax Calculators</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Case Studies</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Client Portal</a></li>
            </ul>
          </div>

          {/* Col 5 - Contact Info */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider">Contact</h4>
            <ul className="space-y-2.5 text-xs font-semibold">
              <li className="flex items-center gap-2">
                <FiPhone className="text-[#E31E24]" />
                <a href="tel:1300888642" className="hover:text-white transition-colors">1300 888 642</a>
              </li>
              <li className="flex items-center gap-2">
                <FiMail className="text-[#E31E24]" />
                <a href="mailto:info@m4plus.com.au" className="hover:text-white transition-colors">info@m4plus.com.au</a>
              </li>
              <li className="text-slate-500 leading-normal">
                Suite 404, Level 4,<br />
                88 Phillip St,<br />
                Sydney NSW 2000
              </li>
            </ul>
          </div>

        </div>

        {/* Copyright */}
        <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-slate-900/60 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-600 font-semibold">
          <p>© 2026 M4 Plus Accounting Pty Ltd. All rights reserved. Liability limited by a scheme approved under Professional Standards Legislation.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-slate-400 transition-colors">Privacy Policy</a>
            <span>•</span>
            <a href="#" className="hover:text-slate-400 transition-colors">Terms of Service</a>
          </div>
        </div>
      </footer>

    </div>
  );
}
