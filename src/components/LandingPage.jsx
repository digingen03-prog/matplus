import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaStar, FaCheckCircle, FaBookOpen, FaTimes } from 'react-icons/fa';
import { 
  FiArrowRight, 
  FiChevronDown, 
  FiChevronUp, 
  FiChevronLeft,
  FiChevronRight,
  FiPhone, 
  FiPhoneCall,
  FiUser, 
  FiFileText, 
  FiShield, 
  FiBriefcase, 
  FiAlertTriangle,
  FiAward,
  FiCompass,
  FiZap,
  FiTrendingUp
} from 'react-icons/fi';

// Reusable Animated Counter component that counts up when triggered
function AnimatedCounter({ value, duration = 1.8, trigger = false }) {
  const [count, setCount] = useState('0');

  useEffect(() => {
    if (!trigger) return;

    const numericStr = value.replace(/[^0-9]/g, '');
    const target = parseInt(numericStr, 10);
    if (isNaN(target)) {
      setCount(value);
      return;
    }

    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
      const easedProgress = progress * (2 - progress); // Ease out quad
      const currentVal = Math.floor(easedProgress * target);
      
      let displayVal = currentVal.toLocaleString();
      if (value.includes('+')) displayVal += '+';
      if (value.includes('%')) displayVal += '%';
      
      setCount(displayVal);

      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };

    window.requestAnimationFrame(step);
  }, [value, duration, trigger]);

  return <span>{count}</span>;
}

export default function LandingPage({ onLeadSubmitted, backendUrl, layoutModel }) {
  // 1. Hero Slideshow State
  const slides = [
    {
      title: "MpowerHer+",
      subtitle: "Empowering female-led startups and entrepreneurs. Get all-encompassed accounting support, capital funding advisory, and business scaling guidance built for your success.",
      btnText: "Enquire Today",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1600&q=80",
      badge: "🚀 Women Entrepreneurs",
      highlight: ""
    },
    {
      title: "Thinking about Inheritance Tax?",
      subtitle: "Protect what you have worked a lifetime to build. Start your custom estate and succession planning journey today with our MATPLUS trust specialists.",
      btnText: "Enquire Now",
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1600&q=80",
      badge: "🏡 Estate Planning",
      highlight: "Inheritance Tax"
    },
    {
      title: "Tax refunds for Construction Workers?",
      subtitle: "Claim your average £2,800 CIS rebate. Speak to our specialist tax refund team now to secure your cash refund in under 10 days!",
      btnText: "Enquire Now",
      image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1600&q=80",
      badge: "🏗 Construction Specialists",
      highlight: "Tax refunds"
    }
  ];
  
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % slides.length);
    }, 6500);
    return () => clearInterval(timer);
  }, [slides.length]);

  const handleNextSlide = () => {
    setCurrentSlide(prev => (prev + 1) % slides.length);
  };

  const handlePrevSlide = () => {
    setCurrentSlide(prev => (prev - 1 + slides.length) % slides.length);
  };

  // Helper to highlight key words in title
  const renderTitle = (title, highlight) => {
    if (!highlight) return title;
    const regex = new RegExp(`(${highlight})`, 'gi');
    const parts = title.split(regex);
    return parts.map((part, index) => 
      part.toLowerCase() === highlight.toLowerCase() ? (
        <span key={index} className="text-highlight-red">{part}</span>
      ) : (
        part
      )
    );
  };

  // 2. Lead Callback Form State
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    company: '',
    notes: ''
  });

  const [status, setStatus] = useState({
    submitting: false,
    success: false,
    error: null
  });

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.phone.trim()) {
      setStatus({ submitting: false, success: false, error: 'Name and Phone Number are required.' });
      return;
    }

    setStatus({ submitting: true, success: false, error: null });

    try {
      const response = await fetch(backendUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          company: formData.company || '', 
          serviceInterest: 'Accounting',
          email: '', 
          message: formData.notes || 'Callback Requested'
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Server error. Please check your connection.');
      }

      setStatus({ submitting: false, success: true, error: null });
      setFormData({ name: '', phone: '', company: '', notes: '' });

      if (onLeadSubmitted) {
        onLeadSubmitted();
      }

      setTimeout(() => {
        setStatus(prev => ({ ...prev, success: false }));
      }, 6000);

    } catch (err) {
      setStatus({ submitting: false, success: false, error: err.message });
    }
  };

  const scrollToCallback = (e) => {
    e.preventDefault();
    const el = document.getElementById('callback-form-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  // 3. Testimonial Slider State
  const testimonials = [
    {
      text: "As a growing startup, we needed reliable payroll management and financial guidance. MATPLUS delivered beyond our expectations. Their advisory helps with quick questions between meetings!",
      author: "Michael Chen",
      company: "Tech Start Inc"
    },
    {
      text: "The MATPLUS team helped us navigate complex restaurant industry regulations and optimize our tax strategy. Their personal approach and attention to detail make them stand out from other accounting firms.",
      author: "Rebecca Martinez",
      company: "Martinez Family Restaurant"
    },
    {
      text: "MATPLUS has been instrumental in streamlining our tax processes. Their expertise saved us thousands in tax liability while ensuring full compliance. The team is responsive, professional, and truly understands our business needs.",
      author: "Sarah Johnson",
      company: "Johnson Consulting LLC"
    }
  ];
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  // 4. FAQ State
  const [activeFaq, setActiveFaq] = useState(null);
  const toggleFaq = (index) => {
    setActiveFaq(prev => prev === index ? null : index);
  };

  // 5. Savings Calculator States
  const [turnover, setTurnover] = useState('500k-2m');
  const [structure, setStructure] = useState('company');
  const [currentSpend, setCurrentSpend] = useState('5k-15k');
  const [estimatedSavings, setEstimatedSavings] = useState(3200);

  const [statsInView, setStatsInView] = useState(false);

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

  const faqs = [
    { q: "Where are meetings held?", a: "Meetings can be held in person at our Melbourne office, at your business premises, or virtually via Zoom or Microsoft Teams." },
    { q: "Is the initial consultation free?", a: "Yes, your first initial consultation is completely free of charge, with no pressure or obligation to sign up." },
    { q: "What should I bring to the initial meeting?", a: "Please bring photographic ID, proof of address, copy of your latest tax filings, and details of your cloud accounting ledger (e.g. Xero/MYOB login) if applicable." },
    { q: "How long does the initial meeting last?", a: "The initial conversation typically lasts between 30 to 45 minutes, focusing on mapping what is possible for your business." },
    { q: "How do I book an appointment?", a: "You can book an appointment by submitting our callback form on this page or calling our telephone line directly." },
    { q: "Will I be pressured to sign up?", a: "Never. We believe in building relationships. We present our fee guide and let you make the choice in your own time." },
    { q: "Are you an independent firm of chartered accountants?", a: "Yes, we are a fully independent practice of ICAEW Chartered Accountants serving Australian entities and estates." },
    { q: "Are you regulated?", a: "Yes, we are regulated by the ICAEW and comply with all regulatory, professional indemnity, and ethical standards." },
    { q: "Do you handle specialist areas such as inheritance tax planning or HMRC investigations?", a: "Yes, we have specialists on staff for legacy estate planning, trust accounting, and handling HMRC queries and tax audits." },
    { q: "What happens if my accountant is on holiday?", a: "We operate a pooled team structure. You will have a primary contact, but other certified team members are always brief on your file to assist immediately." },
    { q: "How much does it cost to have my accounts prepared or tax return done?", a: "Fees depend on the volume of transactions and complexity. We supply transparent, fixed monthly quotes after our initial consultation so there are no surprise bills." }
  ];

  return (
    <div className="animate-fade-in" style={{ paddingBottom: '3rem' }}>
      
      {/* 1. HERO SLIDESHOW SECTION */}
      <section className="hero-slider-container">
        
        {/* Background images fade behind everything */}
        {slides.map((slide, idx) => (
          <div 
            key={idx} 
            className={`hero-slide-bg-wrap ${idx === currentSlide ? 'active' : ''}`}
          >
            <div 
              className="hero-slide-bg" 
              style={{ backgroundImage: `url("${slide.image}")` }} 
            />
          </div>
        ))}
        <div className="hero-slide-overlay" />

        {/* Main 55/45 split content layout */}
        <div className="hero-slider-content-overlay">
          <div className="container hero-grid-layout">
            
            {/* Left Column: holds slide-specific content with AnimatePresence */}
            <div className="hero-left-col">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="hero-text-slide"
                >
                  <h1 className="hero-title">
                    {renderTitle(slides[currentSlide].title, slides[currentSlide].highlight)}
                  </h1>
                  
                  <p className="hero-subtitle">
                    {slides[currentSlide].subtitle}
                  </p>
                  
                  <div className="hero-buttons">
                    <a href="#callback-form-section" onClick={scrollToCallback} className="btn btn-primary-gradient">
                      {slides[currentSlide].btnText}
                    </a>
                    <a href="#chapters-section" className="btn btn-secondary-glass">
                      Learn More
                    </a>
                  </div>

                  {/* Trust Indicators below buttons */}
                  <div className="hero-trust-indicators">
                    <div className="trust-badge-card">
                      <span className="stars"><FaStar /><FaStar /><FaStar /><FaStar /><FaStar /></span>
                      <span className="trust-text"><strong>5.0</strong> Google Rating</span>
                    </div>
                    <div className="trust-badge-card">
                      <FiBriefcase className="trust-icon" />
                      <span className="trust-text"><strong>5,000+</strong> Businesses Served</span>
                    </div>
                    <div className="trust-badge-card">
                      <FiAward className="trust-icon" />
                      <span className="trust-text"><strong>15+</strong> Years Experience</span>
                    </div>
                    <div className="trust-badge-card">
                      <FiShield className="trust-icon" />
                      <span className="trust-text"><strong>98%</strong> Client Retention</span>
                    </div>
                  </div>

                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right Column: floating callback form card */}
            <div className="hero-right-col">
              <motion.div 
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="hero-callback-card"
              >
                <h3 className="hero-card-title">Request a Callback</h3>
                <p className="hero-card-subtitle">Speak with one of our specialists.</p>
                
                <form onSubmit={handleFormSubmit}>
                  {status.error && (
                    <div style={styles.alertError}>
                      ⚠️ {status.error}
                    </div>
                  )}
                  
                  {status.success && (
                    <div style={styles.alertSuccess}>
                      ✓ Request logged successfully. We will call you back shortly!
                    </div>
                  )}

                  <div className="form-group-hero">
                    <label className="form-label-hero">Full Name *</label>
                    <input 
                      type="text" 
                      name="name"
                      className="form-control-hero" 
                      placeholder="Enter your name" 
                      value={formData.name}
                      onChange={handleFormChange}
                      required
                    />
                  </div>

                  <div className="form-group-hero">
                    <label className="form-label-hero">Phone Number *</label>
                    <input 
                      type="tel" 
                      name="phone"
                      className="form-control-hero" 
                      placeholder="Enter your phone number" 
                      value={formData.phone}
                      onChange={handleFormChange}
                      required
                    />
                  </div>

                  <div className="form-group-hero">
                    <label className="form-label-hero">Business Name</label>
                    <input 
                      type="text" 
                      name="company"
                      className="form-control-hero" 
                      placeholder="Enter your business name" 
                      value={formData.company}
                      onChange={handleFormChange}
                    />
                  </div>

                  <button 
                    type="submit" 
                    className="btn btn-primary-gradient" 
                    style={{ width: '100%', padding: '1.1rem', marginTop: '0.75rem', fontSize: '1.05rem', border: 'none', cursor: 'pointer' }}
                    disabled={status.submitting}
                  >
                    {status.submitting ? 'Booking Consultation...' : 'Book Free Consultation'}
                  </button>
                </form>
              </motion.div>
            </div>

          </div>
        </div>

        {/* Slideshow Arrows (Premium Glassmorphic) */}
        <button onClick={handlePrevSlide} className="slider-nav-btn prev">
          <FiChevronLeft />
        </button>
        <button onClick={handleNextSlide} className="slider-nav-btn next">
          <FiChevronRight />
        </button>

        {/* Slideshow progress pagination indicators */}
        <div className="slider-progress-pagination">
          {slides.map((_, idx) => (
            <button 
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`slider-progress-bar ${idx === currentSlide ? 'active' : ''}`}
            />
          ))}
        </div>
      </section>

      {/* 2. PARTNERS STRIPE (CSS Marquee Ticker) */}
      <section className="partners-bar" style={{ marginTop: '0.25rem' }}>
        <div className="container partners-flex">
          <div className="partners-text">Trusted by businesses across Australia</div>
          <div className="partners-marquee-container">
            <div className="partners-marquee-track">
              {/* Set 1 */}
              <span className="partner-logo">MYOB</span>
              <span className="partner-logo" style={{ color: '#00b7f1' }}>Xero</span>
              <span className="partner-logo" style={{ color: '#2ca01c' }}>QuickBooks</span>
              <span className="partner-logo">Reckon</span>
              <span className="partner-logo" style={{ color: '#a055f7' }}>Odoo</span>
              {/* Set 2 (Duplicates for infinite marquee loop) */}
              <span className="partner-logo">MYOB</span>
              <span className="partner-logo" style={{ color: '#00b7f1' }}>Xero</span>
              <span className="partner-logo" style={{ color: '#2ca01c' }}>QuickBooks</span>
              <span className="partner-logo">Reckon</span>
              <span className="partner-logo" style={{ color: '#a055f7' }}>Odoo</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. WHY CHOOSE US */}
      <section id="why-choose-us" className="section bg-white-custom why-choose-us-section">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">Our Values</span>
            <h2 className="section-title">We go beyond numbers to drive your success</h2>
            <p className="section-subtitle">We combine expertise, technology, and personalized service to deliver exceptional results.</p>
          </div>

          <div className="benefits-grid">
            {/* Card 1 */}
            <div className="benefit-card">
              <div className="benefit-icon" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}><FiTrendingUp /></div>
              <h3 className="benefit-title">Proactive & Strategic</h3>
              <p>We don't just report history. We help design your future with tax planning templates and forward-looking growth forecasts.</p>
            </div>
            
            {/* Card 2 */}
            <div className="benefit-card">
              <div className="benefit-icon" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}><FiCompass /></div>
              <h3 className="benefit-title">Tailored Solutions</h3>
              <p>Every business model has its own logic. We build structural solutions tailored exclusively to your corporate setup.</p>
            </div>

            {/* Card 3 */}
            <div className="benefit-card">
              <div className="benefit-icon" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}><FiPhoneCall /></div>
              <h3 className="benefit-title">Reliable & Responsive</h3>
              <p>Tired of unreturned calls? We guarantee responses within 4 business hours to address any financial emergency.</p>
            </div>

            {/* Card 4 */}
            <div className="benefit-card">
              <div className="benefit-icon" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}><FiAward /></div>
              <h3 className="benefit-title">Expert Team</h3>
              <p>Certified professionals with years of experience in corporate filings, VAT advisory, and succession pathways.</p>
            </div>
            
            {/* Card 5 */}
            <div className="benefit-card">
              <div className="benefit-icon" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}><FiShield /></div>
              <h3 className="benefit-title">Trusted & Secure</h3>
              <p>Your business records and personal estates are protected with bank-level encryption and full ICAEW regulatory standard compliance.</p>
            </div>
            
            {/* Card 6 */}
            <div className="benefit-card">
              <div className="benefit-icon" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}><FiZap /></div>
              <h3 className="benefit-title">Always Available</h3>
              <p>Around the clock availability. Get direct phone contact pathways and prompt advisory answers whenever you need guidance.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. HOW WE WORK (UNIFIED WORKFLOW SECTION) */}
      <section id="workflow-section" className="section section-bg workflow-section" style={{ background: 'var(--bg-section)' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-badge">Workflow</span>
            <h2 className="section-title">A simple process for lasting impact</h2>
            <p className="section-subtitle">Three clear steps. One trusted team with you through all of them.</p>
          </div>

          <div className="workflow-flex-container">
            {/* Step 1 */}
            <div className="workflow-rect-card">
              <span className="workflow-step-num">01</span>
              <h3 className="workflow-card-title">Understand Your Goals</h3>
              <span className="workflow-card-badge">For Startups & New Ventures</span>
              <p className="workflow-card-desc">
                We sit down to learn about your business structure, cash flow roadblocks, and ultimate financial vision.
              </p>
              <div className="workflow-card-divider" />
              <ul className="workflow-bullets">
                <li>Company Formation & Setups</li>
                <li>Cloud Accounting & Bookkeeping</li>
                <li>VAT & Self-Assessment Filings</li>
              </ul>
            </div>

            {/* Connector 1 */}
            <div className="workflow-connector">
              {/* Horizontal SVG Arrow for desktop */}
              <svg className="workflow-arrow-horizontal" width="60" height="24" viewBox="0 0 60 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path 
                  d="M0 12 H54 L46 6 M54 12 L46 18" 
                  stroke="var(--color-primary)" 
                  strokeWidth="3" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                  strokeDasharray="8 6"
                  className="animated-arrow-path"
                />
              </svg>
              {/* Vertical SVG Arrow for mobile */}
              <svg className="workflow-arrow-vertical" width="24" height="60" viewBox="0 0 24 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path 
                  d="M12 0 V54 L6 46 M12 54 L18 46" 
                  stroke="var(--color-primary)" 
                  strokeWidth="3" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                  strokeDasharray="8 6"
                  className="animated-arrow-path-vertical"
                />
              </svg>
            </div>

            {/* Step 2 */}
            <div className="workflow-rect-card">
              <span className="workflow-step-num">02</span>
              <h3 className="workflow-card-title">Craft Smart Solutions</h3>
              <span className="workflow-card-badge">For SMEs & Business Owners</span>
              <p className="workflow-card-desc">
                Our accountants structure a custom-tailored strategy covering tax, cloud setups, and advisory models.
              </p>
              <div className="workflow-card-divider" />
              <ul className="workflow-bullets">
                <li>Tax Planning & Advisory</li>
                <li>Payroll & Company Restructuring</li>
                <li>Business Valuations & Consulting</li>
              </ul>
            </div>

            {/* Connector 2 */}
            <div className="workflow-connector">
              {/* Horizontal SVG Arrow for desktop */}
              <svg className="workflow-arrow-horizontal" width="60" height="24" viewBox="0 0 60 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path 
                  d="M0 12 H54 L46 6 M54 12 L46 18" 
                  stroke="var(--color-primary)" 
                  strokeWidth="3" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                  strokeDasharray="8 6"
                  className="animated-arrow-path"
                />
              </svg>
              {/* Vertical SVG Arrow for mobile */}
              <svg className="workflow-arrow-vertical" width="24" height="60" viewBox="0 0 24 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path 
                  d="M12 0 V54 L6 46 M12 54 L18 46" 
                  stroke="var(--color-primary)" 
                  strokeWidth="3" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                  strokeDasharray="8 6"
                  className="animated-arrow-path-vertical"
                />
              </svg>
            </div>

            {/* Step 3 */}
            <div className="workflow-rect-card">
              <span className="workflow-step-num">03</span>
              <h3 className="workflow-card-title">Deliver & Grow Together</h3>
              <span className="workflow-card-badge">Estate & Succession Planning</span>
              <p className="workflow-card-desc">
                We implement the plan, run compliance seamlessly, and meet regularly to track cash flow and optimization.
              </p>
              <div className="workflow-card-divider" />
              <ul className="workflow-bullets">
                <li>Succession & Will Planning</li>
                <li>Trust Setup & Tax Planning</li>
                <li>Inheritance Tax Minimisation</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 5. STATISTICS SECTION */}
      <section className="stats-section">
        <div className="stats-bg-overlay" />
        <motion.div 
          className="container relative-z"
          onViewportEnter={() => setStatsInView(true)}
          onViewportLeave={() => setStatsInView(false)}
          viewport={{ once: false, amount: 0.3 }}
        >
          <div className="stats-grid">
            {/* Card 1 */}
            <div className="stats-card">
              <p className="stats-number">
                <AnimatedCounter key={`${layoutModel}-${statsInView}-1`} value="5,000+" trigger={statsInView} />
              </p>
              <div className="stats-divider" />
              <p className="stats-label">Businesses Supported</p>
            </div>

            {/* Card 2 */}
            <div className="stats-card">
              <p className="stats-number">
                <AnimatedCounter key={`${layoutModel}-${statsInView}-2`} value="98%" trigger={statsInView} />
              </p>
              <div className="stats-divider" />
              <p className="stats-label">Client Retention Rate</p>
            </div>

            {/* Card 3 */}
            <div className="stats-card">
              <p className="stats-number">
                <AnimatedCounter key={`${layoutModel}-${statsInView}-3`} value="15+" trigger={statsInView} />
              </p>
              <div className="stats-divider" />
              <p className="stats-label">Years in Business</p>
            </div>

            {/* Card 4 */}
            <div className="stats-card">
              <p className="stats-number">
                <AnimatedCounter key={`${layoutModel}-${statsInView}-4`} value="50+" trigger={statsInView} />
              </p>
              <div className="stats-divider" />
              <p className="stats-label">Expert Team Members</p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* 6. SAVINGS CALCULATOR */}
      <section className="section bg-white-custom calculator-section">
        <div className="container">
          <div className="calculator-grid">
            
            {/* Left Side Info */}
            <div className="calculator-info">
              <span className="section-badge">ROI Estimator</span>
              <h2 className="section-title">See how much you could save</h2>
              <p className="calculator-desc">
                We leverage cloud workflows, paperless systems, and proactive pre-June tax deductions to optimize your bottom line. Use our calculator to see the potential savings on administrative compliance and tax restructuring.
              </p>
              <div className="calculator-points">
                <div className="point-item" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                  <FaCheckCircle className="point-icon" style={{ color: 'var(--theme-color-primary)', flexShrink: 0 }} />
                  <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>Avg. 25% drop in structural administrative overhead</span>
                </div>
                <div className="point-item" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                  <FaCheckCircle className="point-icon" style={{ color: 'var(--theme-color-primary)', flexShrink: 0 }} />
                  <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>Optimized trust distributions and deductions</span>
                </div>
                <div className="point-item" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <FaCheckCircle className="point-icon" style={{ color: 'var(--theme-color-primary)', flexShrink: 0 }} />
                  <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>Gold partner software discounts (Xero / MYOB)</span>
                </div>
              </div>
            </div>

            {/* Right Side Calculator Card */}
            <div className="calculator-card-container">
              <div className="calculator-card">
                <div className="calculator-inputs">
                  
                  {/* Turnover */}
                  <div className="calc-group">
                    <label className="calc-label">Annual Turnover</label>
                    <select 
                      value={turnover}
                      onChange={(e) => setTurnover(e.target.value)}
                      className="calc-select"
                    >
                      <option value="under-500k">Under $500k</option>
                      <option value="500k-2m">$500k - $2M</option>
                      <option value="2m-5m">$2M - $5M</option>
                      <option value="5m-plus">$5M+</option>
                    </select>
                  </div>

                  {/* Structure */}
                  <div className="calc-group">
                    <label className="calc-label">Business Structure</label>
                    <select 
                      value={structure}
                      onChange={(e) => setStructure(e.target.value)}
                      className="calc-select"
                    >
                      <option value="sole-trader">Sole Trader</option>
                      <option value="company">Company / Trust</option>
                      <option value="smsf">SMSF Account</option>
                    </select>
                  </div>

                  {/* Spend */}
                  <div className="calc-group">
                    <label className="calc-label">Current Accounting Spend</label>
                    <select 
                      value={currentSpend}
                      onChange={(e) => setCurrentSpend(e.target.value)}
                      className="calc-select"
                    >
                      <option value="under-5k">Under $5,000 / yr</option>
                      <option value="5k-15k">$5,000 - $15,000</option>
                      <option value="15k-30k">$15,000 - $30,000</option>
                      <option value="30k-plus">$30,000+ / yr</option>
                    </select>
                  </div>

                </div>

                {/* Result Display */}
                <div className="calculator-result">
                  <span className="result-label">Estimated Annual Savings</span>
                  <p className="result-amount">${estimatedSavings.toLocaleString()}</p>
                  <p className="result-note">
                    Calculated based on standard client transition cases and compliance auditing structures.
                  </p>
                </div>

                <a 
                  href="#callback-form-section"
                  onClick={scrollToCallback}
                  className="btn btn-primary-gradient"
                  style={{ width: '100%', textAlign: 'center', display: 'block' }}
                >
                  Claim My Free Strategic Review
                </a>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 8. FAQ ACCORDION SECTION */}
      <section className="section section-bg faq-section">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">Frequently Asked Questions</span>
            <h2 className="section-title">Frequently Asked Questions</h2>
            <p className="section-subtitle">If your question isn’t answered here, please get in touch — we’re happy to help.</p>
          </div>

          <div className="faq-grid">
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                className="faq-item"
                onClick={() => toggleFaq(index)}
              >
                <div className="faq-question">
                  <span className="faq-question-text" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span className="faq-question-icon" style={{ display: 'flex', alignItems: 'center' }}><FiZap style={{ color: 'var(--color-primary)' }} /></span>
                    {faq.q}
                  </span>
                  <span className="faq-toggle-icon">
                    {activeFaq === index ? <FiChevronUp /> : <FiChevronDown />}
                  </span>
                </div>
                {activeFaq === index && (
                  <div className="faq-answer animate-fade-in">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. FEATURES SECTION (Problem Framework Grid) */}
      <section id="features" className="section features-section" style={{ background: 'var(--bg-main)' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-badge">Our Framework</span>
            <h2 className="section-title">Why MATPLUS Accounting?</h2>
            <p className="section-subtitle">
              We understand the real roadblocks holding your business back. Here is how we break down and solve your financial challenges.
            </p>
          </div>

          <div className="benefits-grid">
            {/* External Problem Card */}
            <div className="benefit-card">
              <div className="benefit-icon" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <FiAlertTriangle />
              </div>
              <h3 className="benefit-title">The External Problem</h3>
              <p style={{ marginBottom: '1rem' }}>
                <strong>Complex Tax Compliance.</strong> Tax laws, structures, and filing deadlines are constantly shifting, making compliance a moving target.
              </p>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-light)', borderTop: '1px solid var(--border-color)', paddingTop: '0.75rem', marginTop: 'auto' }}>
                <strong>Our Solution:</strong> Proactive monthly tax reviews and automated compliance pathways.
              </p>
            </div>

            {/* Internal Problem Card */}
            <div className="benefit-card">
              <div className="benefit-icon" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <FiUser />
              </div>
              <h3 className="benefit-title">The Internal Problem</h3>
              <p style={{ marginBottom: '1rem' }}>
                <strong>Financial Uncertainty & Stress.</strong> Feeling overwhelmed by bookkeeping overhead, surprise accounting bills, and lack of clear strategic direction.
              </p>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-light)', borderTop: '1px solid var(--border-color)', paddingTop: '0.75rem', marginTop: 'auto' }}>
                <strong>Our Solution:</strong> Transparent fixed-fee quotes and direct communication channels.
              </p>
            </div>

            {/* Philosophical Problem Card */}
            <div className="benefit-card">
              <div className="benefit-icon" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <FiCompass />
              </div>
              <h3 className="benefit-title">The Philosophical Problem</h3>
              <p style={{ marginBottom: '1rem' }}>
                <strong>The Growth Paradox.</strong> As a business leader, your energy should be spent on scaling and vision, not buried in spreadsheets and regulatory paperwork.
              </p>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-light)', borderTop: '1px solid var(--border-color)', paddingTop: '0.75rem', marginTop: 'auto' }}>
                <strong>Our Solution:</strong> Custom Virtual CFO setups that empower you to lead.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 10. BLOGS STRIP */}
      <section className="section blog-section" style={{ background: 'var(--bg-main)' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1rem', marginBottom: '3rem' }}>
            <div>
              <span className="section-badge">Latest Blogs</span>
              <h2 className="section-title" style={{ margin: 0 }}>Latest Blogs</h2>
            </div>
            <a href="#" style={{ color: 'var(--color-primary)', fontWeight: 700, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              View all blogs <FiArrowRight />
            </a>
          </div>

          <div className="blogs-grid">
            <div className="blog-card">
              <div className="blog-img-holder" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1586486855514-8c633cc6fd38?auto=format&fit=crop&w=600&q=80")' }}>
                <span className="blog-img-text" style={{ background: 'rgba(15, 23, 42, 0.7)', padding: '0.5rem 1rem', borderRadius: '4px', fontSize: '0.9rem', color: 'white', display: 'none' }}><FiShield /> Identity Verification</span>
              </div>
              <div className="blog-body">
                <span className="blog-tag">Regulations</span>
                <h3 className="blog-title">Emerging Identity Verification Requirements: What Accountants Need to...</h3>
                <p style={{ fontSize: '0.85rem' }}>Recent KYC updates from governing agencies and their impact on private corporate ledgers.</p>
                <div className="blog-footer">
                  <span>Jun 10, 2026</span>
                  <span>5 min read</span>
                </div>
              </div>
            </div>

            <div className="blog-card">
              <div className="blog-img-holder" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80")' }}>
                <span className="blog-img-text" style={{ background: 'rgba(15, 23, 42, 0.7)', padding: '0.5rem 1rem', borderRadius: '4px', fontSize: '0.9rem', color: 'white', display: 'none' }}><FiCompass /> Offshore Business</span>
              </div>
              <div className="blog-body">
                <span className="blog-tag">Structuring</span>
                <h3 className="blog-title">Is Setting Up an Offshore Company Right for Your Business?</h3>
                <p style={{ fontSize: '0.85rem' }}>Analyzing compliance costs, registration pathways, and tax realities of corporate relocation.</p>
                <div className="blog-footer">
                  <span>Jun 4, 2026</span>
                  <span>4 min read</span>
                </div>
              </div>
            </div>

            <div className="blog-card">
              <div className="blog-img-holder" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&q=80")' }}>
                <span className="blog-img-text" style={{ background: 'rgba(15, 23, 42, 0.7)', padding: '0.5rem 1rem', borderRadius: '4px', fontSize: '0.9rem', color: 'white', display: 'none' }}><FiFileText /> Wealth Legacy</span>
              </div>
              <div className="blog-body">
                <span className="blog-tag">Legacy Planning</span>
                <h3 className="blog-title">Beyond the Books: How Chartered Accountants Can Help Secure your Legacy</h3>
                <p style={{ fontSize: '0.85rem' }}>Why compliance-focused reporting misses estate security strategies that secure family wealth.</p>
                <div className="blog-footer">
                  <span>May 28, 2026</span>
                  <span>6 min read</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 11. TESTIMONIALS SLIDER SECTION */}
      <section className="section testimonials-section" style={{ background: 'var(--bg-main)' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-badge">Client Testimonials</span>
            <h2 className="section-title">What Our Clients Say</h2>
          </div>

          <div style={styles.testimonialWrapper}>
            <button 
              onClick={() => setCurrentTestimonial(prev => (prev - 1 + testimonials.length) % testimonials.length)}
              style={styles.navTestimonialBtn}
            >
              ‹
            </button>
            
            <div key={currentTestimonial} className="benefit-card animate-fade-in testimonial-card" style={{ flexGrow: 1, margin: '0 1.5rem', textAlign: 'center', boxShadow: 'var(--card-shadow)' }}>
              <div style={{ color: '#fbbf24', display: 'flex', justifyContent: 'center', gap: '2px', marginBottom: '1rem', fontSize: '1.2rem' }}>
                <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
              </div>
              <p style={{ fontSize: '1.1rem', fontStyle: 'italic', marginBottom: '1.5rem', color: 'var(--color-secondary)', lineHeight: 1.7 }}>
                "{testimonials[currentTestimonial].text}"
              </p>
              <div>
                <strong style={{ fontSize: '1rem' }}>{testimonials[currentTestimonial].author}</strong>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-light)', marginTop: '2px' }}>{testimonials[currentTestimonial].company}</div>
              </div>
            </div>

            <button 
              onClick={() => setCurrentTestimonial(prev => (prev + 1) % testimonials.length)}
              style={styles.navTestimonialBtn}
            >
              ›
            </button>
          </div>
          
          <div style={{ textAlign: 'center', marginTop: '1.75rem' }}>
            <a href="#callback-form-section" onClick={scrollToCallback} className="btn btn-secondary" style={{ fontSize: '0.85rem' }}>See Our Testimonials</a>
          </div>
        </div>
      </section>

      {/* 12. BOOKLETS DOWNLOAD SECTION */}
      <section className="section section-bg booklets-section">
        <div className="container">
          <div className="section-header" style={{ marginBottom: '2.5rem' }}>
            <span className="section-badge">Guides</span>
            <h2 className="section-title">Download our latest booklets</h2>
            <p className="section-subtitle">Download our latest booklets</p>
          </div>

          <div className="booklets-grid">
            <div className="booklet-card">
              <div className="booklet-icon-mock">ACA</div>
              <div>
                <h4 style={{ fontSize: '1.05rem', marginBottom: '0.25rem' }}>Startup Structure Booklet</h4>
                <p style={{ fontSize: '0.85rem', marginBottom: '0.5rem' }}>Corporate registers, tax thresholds, and setup.</p>
                <a href="#callback-form-section" onClick={scrollToCallback} className="btn btn-primary" style={{ padding: '0.35rem 0.75rem', fontSize: '0.75rem', borderRadius: '4px' }}>
                  Download
                </a>
              </div>
            </div>

            <div className="booklet-card">
              <div className="booklet-icon-mock" style={{ background: '#0b1329' }}>TAX</div>
              <div>
                <h4 style={{ fontSize: '1.05rem', marginBottom: '0.25rem' }}>SME Growth Strategies</h4>
                <p style={{ fontSize: '0.85rem', marginBottom: '0.5rem' }}>Protecting operational margins and payroll lines.</p>
                <a href="#callback-form-section" onClick={scrollToCallback} className="btn btn-primary" style={{ padding: '0.35rem 0.75rem', fontSize: '0.75rem', borderRadius: '4px' }}>
                  Download
                </a>
              </div>
            </div>

            <div className="booklet-card">
              <div className="booklet-icon-mock" style={{ background: '#0d5c56' }}>WILL</div>
              <div>
                <h4 style={{ fontSize: '1.05rem', marginBottom: '0.25rem' }}>Estate Inheritance Advisory</h4>
                <p style={{ fontSize: '0.85rem', marginBottom: '0.5rem' }}>Securing legacies and trust allocations.</p>
                <a href="#callback-form-section" onClick={scrollToCallback} className="btn btn-primary" style={{ padding: '0.35rem 0.75rem', fontSize: '0.75rem', borderRadius: '4px' }}>
                  Download
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 12. SECURE YOUR CALL BACK SECTION (Last section before footer) */}
      <section id="callback-form-section" className="section callback-form-section" style={{ borderTop: '1px solid var(--border-color)', background: 'var(--bg-main)' }}>
        <div className="container" style={{ maxWidth: '650px' }}>
          <div id="join-form" className="callback-card" style={{ boxShadow: 'var(--card-shadow)', transform: 'none' }}>
            <h3 className="callback-title" style={{ textAlign: 'center', fontSize: '1.75rem', marginBottom: '0.25rem' }}>Schedule a Free Consultation</h3>
            <p className="callback-desc text-muted" style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
              Join hundreds of satisfied clients who trust MATPLUS with their accounting needs. Get started with a free consultation today.
            </p>
            
            <form onSubmit={handleFormSubmit}>
              {status.error && (
                <div style={styles.alertError}>
                  ⚠️ {status.error}
                </div>
              )}
              
              {status.success && (
                <div style={styles.alertSuccess}>
                  ✓ Request logged successfully. We will call you back shortly. Review database entries on the Admin panel!
                </div>
              )}

              <div className="form-group">
                <label className="form-label">Name <span style={{ color: '#ef4444' }}>*</span></label>
                <input 
                  type="text" 
                  name="name"
                  className="form-control" 
                  placeholder="Enter your name" 
                  value={formData.name}
                  onChange={handleFormChange}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Phone Number <span style={{ color: '#ef4444' }}>*</span></label>
                <input 
                  type="tel" 
                  name="phone"
                  className="form-control" 
                  placeholder="Enter your phone number" 
                  value={formData.phone}
                  onChange={handleFormChange}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Brief Notes</label>
                <textarea 
                  name="notes"
                  className="form-control" 
                  placeholder="Describe your inquiry (optional)" 
                  value={formData.notes}
                  onChange={handleFormChange}
                  rows="3"
                />
              </div>

              <button 
                type="submit" 
                className="btn btn-primary" 
                style={{ width: '100%', padding: '0.85rem', marginTop: '0.5rem', fontSize: '1rem' }}
                disabled={status.submitting}
              >
                {status.submitting ? 'Submitting to Database...' : 'Schedule a Free Consultation'}
              </button>
            </form>
          </div>
        </div>
      </section>

    </div>
  );
}

const styles = {
  problemsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
    gap: '2rem'
  },
  guideWrapper: {
    display: 'flex',
    gap: '3.5rem',
    flexWrap: 'wrap',
    alignItems: 'center'
  },
  guideLeft: {
    flex: '1 1 500px'
  },
  guideRight: {
    flex: '1 1 400px',
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem'
  },
  guideFeatureCard: {
    display: 'flex',
    gap: '1.25rem',
    background: 'var(--bg-section)',
    padding: '1.5rem',
    borderRadius: '8px',
    border: '1px solid var(--border-color)'
  },
  guideFeatureIcon: {
    fontSize: '2rem',
    color: 'var(--color-primary)',
    flexShrink: 0,
    marginTop: '2px'
  },
  guideFeatureTitle: {
    fontSize: '1.05rem',
    fontWeight: '700',
    color: 'var(--color-secondary)',
    marginBottom: '0.25rem'
  },
  planBox: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%'
  },
  planSubList: {
    listStyle: 'none',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
    fontSize: '0.875rem',
    color: 'var(--color-secondary)',
    fontWeight: 600,
    marginBottom: '1.5rem',
    background: 'var(--bg-section)',
    padding: '1rem',
    borderRadius: '6px',
    border: '1px solid var(--border-color)'
  },
  planTag: {
    fontSize: '0.8rem',
    fontWeight: 700,
    color: 'var(--color-primary)',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    marginBottom: '0.5rem'
  },
  splitCompareGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
    gap: '2.5rem'
  },
  compareList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.25rem'
  },
  compareItem: {
    display: 'flex',
    gap: '0.75rem',
    fontSize: '0.9rem',
    color: 'var(--color-secondary)',
    lineHeight: 1.5
  },
  compareFooter: {
    textAlign: 'center',
    marginTop: '3.5rem',
    maxWidth: '700px',
    margin: '3.5rem auto 0 auto'
  },
  testimonialWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    maxWidth: '850px',
    margin: '0 auto'
  },
  navTestimonialBtn: {
    background: 'none',
    border: 'none',
    fontSize: '2.5rem',
    color: 'var(--text-light)',
    cursor: 'pointer',
    padding: '0 0.5rem',
    transition: 'color 0.2s'
  },
  alertError: {
    background: 'rgba(239, 68, 68, 0.08)',
    border: '1px solid rgba(239, 68, 68, 0.15)',
    color: '#dc2626',
    padding: '0.75rem 1rem',
    borderRadius: '6px',
    marginBottom: '1.25rem',
    fontSize: '0.85rem',
  },
  alertSuccess: {
    background: 'rgba(22, 163, 74, 0.08)',
    border: '1px solid rgba(22, 163, 74, 0.15)',
    color: '#16a34a',
    padding: '0.75rem 1rem',
    borderRadius: '6px',
    marginBottom: '1.25rem',
    fontSize: '0.85rem',
  }
};
