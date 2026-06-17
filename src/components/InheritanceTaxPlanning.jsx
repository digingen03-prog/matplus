import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiShield, 
  FiFileText, 
  FiBriefcase, 
  FiAward, 
  FiUsers, 
  FiClock, 
  FiCheckCircle, 
  FiChevronDown, 
  FiChevronUp, 
  FiBookOpen,
  FiTrendingUp,
  FiCompass,
  FiMail,
  FiPhone,
  FiUser,
  FiActivity
} from 'react-icons/fi';
import { FaStar, FaBuilding, FaGift } from 'react-icons/fa';

export default function InheritanceTaxPlanning({ backendUrl, onLeadSubmitted }) {
  // 1. Consultation Form State
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    query: '',
    preference: 'zoom'
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

    if (!formData.firstName.trim() || !formData.email.trim() || !formData.phone.trim()) {
      setStatus({ submitting: false, success: false, error: 'First Name, Email, and Phone Number are required.' });
      return;
    }

    setStatus({ submitting: true, success: false, error: null });

    try {
      const response = await fetch(backendUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: `${formData.firstName} ${formData.lastName}`.trim(),
          phone: formData.phone,
          company: 'Personal Estate',
          serviceInterest: 'Inheritance Tax Planning',
          email: formData.email,
          message: `Preference: ${formData.preference}. Query: ${formData.query}`
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Server error. Please try again.');
      }

      setStatus({ submitting: false, success: true, error: null });
      setFormData({ firstName: '', lastName: '', email: '', phone: '', query: '', preference: 'zoom' });

      if (onLeadSubmitted) onLeadSubmitted();

      setTimeout(() => {
        setStatus(prev => ({ ...prev, success: false }));
      }, 6000);

    } catch (err) {
      setStatus({ submitting: false, success: false, error: err.message });
    }
  };

  // 2. Case Studies Carousel State
  const caseStudies = [
    {
      title: "High-Value Estate with Property & Investments",
      who: "Retired couple with combined estate exceeding £2.5m.",
      challenge: "Potential inheritance tax liability and concerns about protecting assets from care fees.",
      solution: "Lifetime gifting strategies, discretionary trust structure, and comprehensive estate review.",
      results: [
        "£400,000+ projected inheritance tax savings",
        "Protected family assets from care fee exposure",
        "Clear, structured succession plan established"
      ]
    },
    {
      title: "Business Owner Succession Planning",
      who: "Founder of a regional logistics company valued at £4.2m.",
      challenge: "Ensuring smooth operational transition to children without causing a massive tax bill.",
      solution: "Claiming Business Property Relief (BPR), structuring family trusts, and issuing non-voting shares.",
      results: [
        "Eliminated immediate inheritance tax on business transfer",
        "Retained operational control during leadership transition",
        "Provided fair inheritance shares for non-active children"
      ]
    },
    {
      title: "Blended Family Asset Protection",
      who: "Homeowner with estate of £1.1m with children from a previous marriage.",
      challenge: "Ensuring the current spouse has lifelong security while protecting children's final inheritance.",
      solution: "Life Interest Trust Will protecting the family property and direct cash legacy structures.",
      results: [
        "Guaranteed spouse can live in home for life",
        "Secured asset transition directly to children afterwards",
        "Optimised residence nil-rate band exemptions"
      ]
    }
  ];
  const [currentCase, setCurrentCase] = useState(0);

  // 3. FAQ Accordion State
  const [activeFaq, setActiveFaq] = useState(null);
  const faqs = [
    { 
      q: "What is inheritance tax?", 
      a: "Inheritance Tax (IHT) is a tax on the estate (property, money, and possessions) of someone who has died. It is generally charged at 40% on the portion of the estate that exceeds the tax-free allowance thresholds." 
    },
    { 
      q: "How much inheritance tax will my estate pay?", 
      a: "Your estate will not pay tax if its value is below the £325,000 Nil-Rate Band (NRB). If you leave your home to your direct descendants, you may qualify for the additional £175,000 Residence Nil-Rate Band (RNRB), raising your individual threshold to £500,000 (or up to £1M for married couples when allowances are transferred)." 
    },
    { 
      q: "Can trusts reduce inheritance tax?", 
      a: "Yes, trusts are highly effective legal structures. By transferring assets into specific trusts (like Discretionary or Interest in Possession Trusts), you can remove them from your personal estate value, potentially eliminating the 40% tax charge while maintaining control over how and when beneficiaries receive support." 
    },
    { 
      q: "How can I protect my family home?", 
      a: "You can protect your family home by utilising the Residence Nil-Rate Band, structuring Life Interest Trusts in your Wills, or establishing lifetime gifting structures. This ensures the asset passes to children or grandchildren while avoiding forced sales or massive tax liabilities." 
    },
    { 
      q: "What happens if I don't have a will?", 
      a: "If you die without a Will, your estate is distributed according to the laws of intestacy. This means your assets may not go to the people you want (especially for unmarried partners or blended families), and your estate will miss out on crucial inheritance tax planning reliefs." 
    },
    { 
      q: "How often should I review my estate plan?", 
      a: "We recommend reviewing your estate plan every 3 to 5 years, or immediately following any major life events such as marriage, divorce, births, substantial changes in asset values, or modifications to government tax legislation." 
    }
  ];

  return (
    <div className="animate-fade-in text-slate-800" style={{ paddingBottom: '3rem' }}>
      
      {/* 1. HERO SECTION */}
      <section className="hero-slider-container" style={{ height: 'auto', minHeight: '680px', padding: '5rem 0', backgroundImage: 'url("https://images.unsplash.com/photo-1581579438747-1dc8d1e0ca96?auto=format&fit=crop&w=1600&q=80")', backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="hero-slide-overlay" style={{ background: 'linear-gradient(135deg, rgba(9, 13, 22, 0.93) 0%, rgba(15, 23, 42, 0.83) 100%)' }} />
        
        <div className="container relative-z" style={{ zIndex: 10, position: 'relative' }}>
          <div className="hero-grid-layout" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3rem' }}>
            
            {/* Left side: Value Propositions */}
            <div style={{ color: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div className="section-badge" style={{ color: '#ff4d4d', fontWeight: '700', textTransform: 'uppercase', marginBottom: '1rem', letterSpacing: '1px' }}>
                🛡 Legacy Wealth Protection
              </div>
              <h1 className="hero-title" style={{ fontSize: '2.75rem', lineHeight: '1.2', color: 'white', marginBottom: '1.5rem', fontWeight: 800 }}>
                Protect Your Legacy.<br/>Minimise <span style={{ color: '#ff4d4d' }}>Inheritance Tax</span>.
              </h1>
              <p style={{ color: '#cbd5e1', fontSize: '1.05rem', lineHeight: '1.7', marginBottom: '2rem', maxWidth: '540px' }}>
                Helping families preserve wealth, reduce inheritance tax liabilities, and ensure assets are passed to future generations with absolute confidence.
              </p>
              
              {/* Bullet checklist */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2.5rem' }}>
                {[
                  "Tailored Estate Planning & Tax Minimisation",
                  "Trust & Will Structuring to Safeguard Wealth",
                  "Business Succession Planning for Owners",
                  "Lifetime Gifting & Wealth Transfer Strategies"
                ].map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <FiCheckCircle style={{ color: '#ff4d4d', fontSize: '1.25rem', flexShrink: 0 }} />
                    <span style={{ fontSize: '0.95rem', color: '#f1f5f9' }}>{item}</span>
                  </div>
                ))}
              </div>

              <div>
                <a 
                  href="#callback-consultation-section" 
                  className="btn btn-primary-gradient"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('callback-consultation-section')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  style={{ padding: '1rem 2rem', fontSize: '1rem' }}
                >
                  Book Free Consultation
                </a>
              </div>
            </div>

            {/* Right side: Consultation Form */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
              <div className="hero-callback-card" style={{ background: 'rgba(255, 255, 255, 0.98)', border: '1px solid rgba(255,255,255,0.9)', boxShadow: '0 25px 60px rgba(0,0,0,0.3)', width: '100%', maxWidth: '460px' }}>
                <h3 className="hero-card-title" style={{ fontSize: '1.5rem', fontWeight: 800, color: '#090d16', marginBottom: '0.25rem' }}>
                  Premium Consultation
                </h3>
                <p className="hero-card-subtitle" style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '1.5rem' }}>
                  Plan ahead. Book your free inheritance tax check today.
                </p>

                <form onSubmit={handleFormSubmit}>
                  {status.error && (
                    <div style={{ background: 'rgba(239, 68, 68, 0.08)', border: '1px solid rgba(239, 68, 68, 0.15)', color: '#dc2626', padding: '0.75rem', borderRadius: '6px', marginBottom: '1rem', fontSize: '0.8rem' }}>
                      ⚠️ {status.error}
                    </div>
                  )}

                  {status.success && (
                    <div style={{ background: 'rgba(22, 163, 74, 0.08)', border: '1px solid rgba(22, 163, 74, 0.15)', color: '#16a34a', padding: '0.75rem', borderRadius: '6px', marginBottom: '1rem', fontSize: '0.8rem' }}>
                      ✓ Your consultation inquiry is logged. We'll contact you shortly.
                    </div>
                  )}

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '0.75rem' }}>
                    <div className="form-group-hero" style={{ marginBottom: 0 }}>
                      <label className="form-label-hero" style={{ fontSize: '0.75rem' }}>First Name *</label>
                      <input 
                        type="text" 
                        name="firstName"
                        required
                        className="form-control-hero" 
                        placeholder="John" 
                        value={formData.firstName}
                        onChange={handleFormChange}
                        style={{ padding: '0.65rem 0.9rem', borderRadius: '8px' }}
                      />
                    </div>
                    <div className="form-group-hero" style={{ marginBottom: 0 }}>
                      <label className="form-label-hero" style={{ fontSize: '0.75rem' }}>Last Name</label>
                      <input 
                        type="text" 
                        name="lastName"
                        className="form-control-hero" 
                        placeholder="Doe" 
                        value={formData.lastName}
                        onChange={handleFormChange}
                        style={{ padding: '0.65rem 0.9rem', borderRadius: '8px' }}
                      />
                    </div>
                  </div>

                  <div className="form-group-hero" style={{ marginBottom: '0.75rem' }}>
                    <label className="form-label-hero" style={{ fontSize: '0.75rem' }}>Email Address *</label>
                    <input 
                      type="email" 
                      name="email"
                      required
                      className="form-control-hero" 
                      placeholder="john.doe@example.com" 
                      value={formData.email}
                      onChange={handleFormChange}
                      style={{ padding: '0.65rem 0.9rem', borderRadius: '8px' }}
                    />
                  </div>

                  <div className="form-group-hero" style={{ marginBottom: '0.75rem' }}>
                    <label className="form-label-hero" style={{ fontSize: '0.75rem' }}>Phone Number *</label>
                    <input 
                      type="tel" 
                      name="phone"
                      required
                      className="form-control-hero" 
                      placeholder="e.g. +44 7700 900077" 
                      value={formData.phone}
                      onChange={handleFormChange}
                      style={{ padding: '0.65rem 0.9rem', borderRadius: '8px' }}
                    />
                  </div>

                  <div className="form-group-hero" style={{ marginBottom: '0.75rem' }}>
                    <label className="form-label-hero" style={{ fontSize: '0.75rem' }}>Meeting Preference</label>
                    <select 
                      name="preference"
                      className="form-control-hero"
                      value={formData.preference}
                      onChange={handleFormChange}
                      style={{ padding: '0.65rem 0.9rem', borderRadius: '8px', cursor: 'pointer' }}
                    >
                      <option value="zoom">Virtual Meeting (Zoom / Teams)</option>
                      <option value="office">In-Office (Melbourne Office)</option>
                      <option value="phone">Telephone Call</option>
                    </select>
                  </div>

                  <div className="form-group-hero" style={{ marginBottom: '1.25rem' }}>
                    <label className="form-label-hero" style={{ fontSize: '0.75rem' }}>How Can We Help You?</label>
                    <textarea 
                      name="query"
                      className="form-control-hero" 
                      placeholder="Tell us briefly about your estate setup (optional)" 
                      value={formData.query}
                      onChange={handleFormChange}
                      rows="2"
                      style={{ padding: '0.65rem 0.9rem', borderRadius: '8px', resize: 'none' }}
                    />
                  </div>

                  <button 
                    type="submit" 
                    className="btn btn-primary-gradient" 
                    style={{ width: '100%', padding: '0.9rem', fontSize: '0.95rem', border: 'none', cursor: 'pointer' }}
                    disabled={status.submitting}
                  >
                    {status.submitting ? 'Booking Consultation...' : 'Book Free Initial Consultation'}
                  </button>
                </form>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. TRUST INDICATORS STRIP */}
      <section className="partners-bar" style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', padding: '2.5rem 0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', textAlign: 'center' }}>
            {[
              { label: "40+ Years Experience", val: "Expert Advisors" },
              { label: "1,200+ Clients Supported", val: "Family Legacies Securing" },
              { label: "£Millions Protected", val: "Asset Value Saved" },
              { label: "Certified Professionals", val: "ICAEW & CPA Practice" }
            ].map((stat, idx) => (
              <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <span style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-primary)' }}>{stat.label}</span>
                <span style={{ fontSize: '0.8rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.05em' }}>{stat.val}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. INTRODUCTION SECTION */}
      <section className="section bg-white" style={{ padding: '5rem 0' }}>
        <div className="container" style={{ maxWidth: '800px', textAlign: 'center' }}>
          <span className="section-badge" style={{ color: 'var(--color-primary)', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase' }}>Introduction</span>
          <h2 className="section-title" style={{ fontSize: '2.25rem', marginTop: '0.5rem', marginBottom: '1.5rem', fontWeight: 800 }}>
            Estate Planning That Protects What Matters Most
          </h2>
          <p style={{ fontSize: '1.1rem', color: '#334155', lineHeight: '1.7', marginBottom: '1.5rem' }}>
            Estate planning is essential for protecting your wealth, ensuring your wishes are carried out, and minimising inheritance tax liabilities for your loved ones.
          </p>
          <p style={{ fontSize: '1rem', color: '#475569', lineHeight: '1.7', marginBottom: '1.5rem', background: '#f1f5f9', padding: '1.25rem', borderRadius: '12px', borderLeft: '4px solid var(--color-primary)' }}>
            With the inheritance tax nil-rate band frozen at <strong>£325,000</strong> and the residence nil-rate band at <strong>£175,000</strong> until at least 2030, many families face significant tax exposure.
          </p>
          <p style={{ fontSize: '1rem', color: '#475569', lineHeight: '1.7' }}>
            At Matplus, we provide strategic estate planning solutions designed to preserve wealth, protect family assets, and create smooth succession plans for future generations.
          </p>
        </div>
      </section>

      {/* 4. FOUR KEY COMPONENTS SECTION */}
      <section className="section" style={{ background: '#f8fafc', padding: '5rem 0' }}>
        <div className="container">
          <div className="section-header" style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <span className="section-badge">Core Pillars</span>
            <h2 className="section-title" style={{ fontWeight: 800 }}>4 Key Components of Estate Planning</h2>
            <p className="section-subtitle">A comprehensive strategy to protect wealth from every angle.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '2rem' }}>
            {[
              {
                title: "Inheritance Tax Review & Mitigation Strategy",
                desc: "Comprehensive assessment of current inheritance tax exposure, identification of available reliefs, and tax planning strategies to reduce future liabilities.",
                icon: <FiShield style={{ color: 'white', fontSize: '1.5rem' }} />
              },
              {
                title: "Will & Trust Structuring",
                desc: "Expert advice on drafting wills, discretionary trusts, life interest trusts, and asset protection strategies designed to safeguard family wealth.",
                icon: <FiFileText style={{ color: 'white', fontSize: '1.5rem' }} />
              },
              {
                title: "Business & Asset Succession Planning",
                desc: "Tax-efficient transfer of business shares, partnerships, and property portfolios to future generations while maintaining critical operational control.",
                icon: <FaBuilding style={{ color: 'white', fontSize: '1.3rem' }} />
              },
              {
                title: "Lifetime Gifting & Wealth Transfer Advice",
                desc: "Strategic gifting plans and trust funding designed to reduce overall estate values over time while maintaining your financial flexibility.",
                icon: <FaGift style={{ color: 'white', fontSize: '1.3rem' }} />
              }
            ].map((card, idx) => (
              <div key={idx} className="benefit-card" style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '2rem', display: 'flex', flexDirection: 'column', height: '100%', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
                <div style={{ width: '3.5rem', height: '3.5rem', borderRadius: '12px', background: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyOrigin: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                  {card.icon}
                </div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#090d16', marginBottom: '1rem', lineHeight: '1.4' }}>{card.title}</h3>
                <p style={{ fontSize: '0.9rem', color: '#475569', lineHeight: '1.6' }}>{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. WHY ESTATE PLANNING MATTERS */}
      <section className="section bg-white" style={{ padding: '5rem 0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '4rem', alignItems: 'center' }}>
            
            {/* Left Column: Image */}
            <div style={{ position: 'relative', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.1)', height: '420px' }}>
              <img 
                src="/Common Objectives.webp" 
                alt="Multi-generational family legacy" 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div style={{ absolute: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)', padding: '2rem', color: 'white' }}>
                <h4 style={{ fontWeight: 700, color: 'white' }}>Securing Legacies</h4>
                <p style={{ color: '#cbd5e1', fontSize: '0.85rem' }}>Making sure legacy funds reach the right beneficiaries smoothly.</p>
              </div>
            </div>

            {/* Right Column: Content List */}
            <div>
              <span className="section-badge">Common Objectives</span>
              <h2 className="section-title" style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '1.5rem' }}>
                Why Estate Planning Matters
              </h2>
              <p style={{ color: '#475569', marginBottom: '2rem', lineHeight: '1.6' }}>
                Failing to prepare a structured plan exposes your hard-earned assets to excessive taxation and complex legal disputes. Our strategic solutions address the goals that matter most:
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem 2rem' }}>
                {[
                  "Protecting the family home",
                  "Reducing inheritance tax liability",
                  "Supporting kids & grandkids",
                  "Providing for blended families",
                  "Protecting vulnerable heirs",
                  "Business succession pathways",
                  "Avoiding family disputes",
                  "Preserving wealth legacy"
                ].map((goal, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <FiCheckCircle style={{ color: 'var(--color-primary)', flexShrink: 0 }} />
                    <span style={{ fontSize: '0.9rem', fontWeight: 600, color: '#1e293b' }}>{goal}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 6. OUR ESTATE PLANNING PROCESS */}
      <section className="section" style={{ background: '#f8fafc', padding: '5rem 0' }}>
        <div className="container">
          <div className="section-header" style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <span className="section-badge">Methodology</span>
            <h2 className="section-title" style={{ fontWeight: 800 }}>Our Estate Planning Process</h2>
            <p className="section-subtitle">Five steps to secure wealth protection, simple and clear.</p>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center', alignItems: 'center' }}>
            {[
              { step: "01", title: "Review Your Estate", desc: "We evaluate all properties, savings, business assets, and policies." },
              { step: "02", title: "Identify Tax Exposure", desc: "Calculating liabilities based on Nil-Rate bands and exemptions." },
              { step: "03", title: "Design Tailored Strategy", desc: "Drafting structuring recommendations, trust options, and gift pathways." },
              { step: "04", title: "Implement Wills & Trusts", desc: "Setting up the legal structures to safeguard assets legally." },
              { step: "05", title: "Ongoing Reviews", desc: "Yearly checking for policy shifts and life status modifications." }
            ].map((stepObj, idx, arr) => (
              <React.Fragment key={idx}>
                <div style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '1.75rem', width: '220px', textAlign: 'center', boxShadow: '0 4px 6px rgba(0,0,0,0.02)', position: 'relative' }}>
                  <span style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--color-primary-glow)', WebkitTextStroke: '1px var(--color-primary)', opacity: 0.3, display: 'block', marginBottom: '0.5rem' }}>
                    {stepObj.step}
                  </span>
                  <h4 style={{ fontSize: '1rem', fontWeight: 800, color: '#090d16', marginBottom: '0.5rem' }}>{stepObj.title}</h4>
                  <p style={{ fontSize: '0.8rem', color: '#64748b', lineHeight: '1.5' }}>{stepObj.desc}</p>
                </div>
                {idx < arr.length - 1 && (
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-primary)' }}>
                    {/* Horizontal Arrow SVG */}
                    <svg className="workflow-arrow-horizontal" width="30" height="16" viewBox="0 0 30 16" fill="none" style={{ transform: 'rotate(0deg)' }}>
                      <path d="M0 8H26M26 8L18 2M26 8L18 14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* 7. CASE STUDIES CAROUSEL */}
      <section className="section bg-white" style={{ padding: '5rem 0' }}>
        <div className="container">
          <div className="section-header" style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <span className="section-badge">Success Stories</span>
            <h2 className="section-title" style={{ fontWeight: 800 }}>Real Client Success Stories</h2>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyOrigin: 'center', justifyContent: 'space-between', maxWidth: '800px', margin: '0 auto', gap: '2rem' }}>
            {/* Nav Left */}
            <button 
              className="testimonial-nav-btn" 
              onClick={() => setCurrentCase(prev => (prev - 1 + caseStudies.length) % caseStudies.length)}
              style={{ flexShrink: 0, padding: 0 }}
            >
              ‹
            </button>

            {/* Case Study Card */}
            <div key={currentCase} className="benefit-card animate-fade-in" style={{ flexGrow: 1, background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '20px', padding: '2.5rem', boxShadow: 'var(--shadow-md)' }}>
              <div style={{ display: 'inline-block', background: 'var(--color-primary-glow)', border: '1px solid var(--color-primary)', color: 'var(--color-primary)', fontSize: '0.75rem', fontWeight: 700, padding: '0.25rem 0.75rem', borderRadius: '50px', marginBottom: '1.25rem' }}>
                Case Study {currentCase + 1}
              </div>
              <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#090d16', marginBottom: '1rem' }}>
                {caseStudies[currentCase].title}
              </h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
                <p><strong>Who:</strong> {caseStudies[currentCase].who}</p>
                <p><strong>Challenge:</strong> {caseStudies[currentCase].challenge}</p>
                <p><strong>Solution:</strong> {caseStudies[currentCase].solution}</p>
              </div>

              <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '1.25rem' }}>
                <strong style={{ display: 'block', fontSize: '0.85rem', textTransform: 'uppercase', color: '#64748b', marginBottom: '0.75rem', letterSpacing: '0.05em' }}>Key Results Achieved:</strong>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {caseStudies[currentCase].results.map((result, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', fontWeight: 650, color: '#16a34a' }}>
                      <FiCheckCircle style={{ flexShrink: 0 }} />
                      <span>{result}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Nav Right */}
            <button 
              className="testimonial-nav-btn" 
              onClick={() => setCurrentCase(prev => (prev + 1) % caseStudies.length)}
              style={{ flexShrink: 0, padding: 0 }}
            >
              ›
            </button>
          </div>
        </div>
      </section>

      {/* 8. LONG FORM CONTENT SECTION */}
      <section className="section" style={{ background: '#f8fafc', padding: '5rem 0' }}>
        <div className="container">
          <div className="section-header" style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <span className="section-badge">Detailed Guide</span>
            <h2 className="section-title" style={{ fontWeight: 800 }}>Comprehensive Estate Planning Services</h2>
            <p className="section-subtitle">Diving deeper into structure strategies and protective provisions.</p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem' }}>
            {[
              {
                title: "Maximising Tax-Free Allowances & Gifting Reliefs",
                desc: "Many estate assets can pass tax-free if structuring takes place early enough. By aligning your estate to maximise the Nil-Rate Band (£325k) and Residence Nil-Rate Band (£175k), married couples can protect up to £1M of family assets. Furthermore, lifetime gifting rules, including the 7-year potentially exempt transfers (PETs) and annual gift exemptions, provide pathways to steadily reduce your taxable estate value without triggering immediate tax charges.",
                img: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&q=80",
                icon: <FiTrendingUp style={{ color: 'white', fontSize: '1.25rem' }} />,
                alignRight: false
              },
              {
                title: "Securing Assets via Discretionary & Life Interest Trusts",
                desc: "A Will alone is often insufficient for complex family situations, particularly blended families or vulnerable heirs. Utilizing Life Interest Trusts guarantees that your spouse has the right to occupy properties for life, while securing the ultimate inheritance value for children from previous marriages. Discretionary trusts allow trustees to manage and distribute inheritance capital dynamically, shielding beneficiaries from asset division, divorce settlements, or insolvency claims.",
                img: "https://images.unsplash.com/photo-1586486855514-8c633cc6fd38?auto=format&fit=crop&w=600&q=80",
                icon: <FiShield style={{ color: 'white', fontSize: '1.25rem' }} />,
                alignRight: true
              },
              {
                title: "Structured Corporate Succession & BPR Claims",
                desc: "For family businesses and property portfolio owners, legacy planning must protect corporate continuity. We help business owners claim Business Property Relief (BPR) to secure up to 100% inheritance tax exemption on qualifying business shares. Setting up Family Limited Partnerships or structures allows you to pass share ownership value to the next generation while maintaining 100% control of operations and voting rights.",
                img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80",
                icon: <FiBriefcase style={{ color: 'white', fontSize: '1.25rem' }} />,
                alignRight: false
              }
            ].map((block, idx) => (
              <div key={idx} style={{ display: 'flex', flexWrap: 'wrap', gap: '3rem', alignItems: 'center', flexDirection: block.alignRight ? 'row-reverse' : 'row' }}>
                <div style={{ flex: '1 1 340px' }}>
                  <div style={{ width: '3rem', height: '3rem', borderRadius: '10px', background: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
                    {block.icon}
                  </div>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#090d16', marginBottom: '1.25rem' }}>{block.title}</h3>
                  <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: '1.7', textAlign: 'justify' }}>{block.desc}</p>
                </div>
                <div style={{ flex: '1 1 340px', borderRadius: '16px', overflow: 'hidden', height: '280px', boxShadow: '0 10px 20px rgba(0,0,0,0.05)' }}>
                  <img src={block.img} alt={block.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. FREE GUIDE DOWNLOAD SECTION */}
      <section className="section" style={{ background: '#7f0c1d', padding: '4.5rem 0', color: 'white', position: 'relative', overflow: 'hidden' }}>
        <div style={{ absolute: 'absolute', inset: 0, opacity: 0.1, backgroundImage: "url('https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1200&q=80')", backgroundSize: 'cover', backgroundPosition: 'center', pointerEvents: 'none' }} />
        
        <div className="container relative-z" style={{ display: 'flex', flexWrap: 'wrap', gap: '2.5rem', justifyContent: 'space-between', alignItems: 'center', position: 'relative', zIndex: 5 }}>
          <div>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', background: 'rgba(255,255,255,0.2)', padding: '0.25rem 0.75rem', borderRadius: '4px' }}>Free Guide Booklet</span>
            <h2 style={{ fontSize: '2rem', fontWeight: 800, color: 'white', marginTop: '0.75rem', marginBottom: '0.5rem' }}>
              Safeguarding Your Family's Wealth
            </h2>
            <p style={{ color: '#f8fafc', fontSize: '0.95rem' }}>Download our FREE "Protect Your Legacy Guide" and start planning for your family's future.</p>
          </div>
          <div>
            <a 
              href="#callback-consultation-section" 
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('callback-consultation-section')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="btn btn-secondary-glass" 
              style={{ background: 'white', color: '#7f0c1d', fontWeight: 750, padding: '1rem 2rem', borderRadius: '8px', border: 'none' }}
            >
              Download Guide Now
            </a>
          </div>
        </div>
      </section>

      {/* 10. WHY CHOOSE US */}
      <section className="section bg-white" style={{ padding: '5rem 0' }}>
        <div className="container">
          <div className="section-header" style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <span className="section-badge">Client Assurances</span>
            <h2 className="section-title" style={{ fontWeight: 800 }}>Why Choose Us</h2>
            <p className="section-subtitle">Unwavering commitment to family estates and asset optimization.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '2rem' }}>
            {[
              { title: "Expert Team", desc: "Certified professionals with years of experience in legacy estate taxes and trust advisory.", icon: <FiAward /> },
              { title: "Trusted & Secure", desc: "Bank-level confidentiality, secure data records, and full regulatory compliance guarantees.", icon: <FiShield /> },
              { title: "Always Available", desc: "Responsive communications. Direct access paths to professional accounting advisers.", icon: <FiClock /> },
              { title: "Proven Results", desc: "Successfully helping hundreds of families protect and pass on their hard-earned legacy values.", icon: <FiCheckCircle /> }
            ].map((card, idx) => (
              <div key={idx} style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '1.75rem', textAlign: 'center' }}>
                <div style={{ color: 'var(--color-primary)', fontSize: '2rem', marginBottom: '1rem', display: 'flex', justifyContent: 'center' }}>
                  {card.icon}
                </div>
                <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#090d16', marginBottom: '0.75rem' }}>{card.title}</h4>
                <p style={{ fontSize: '0.85rem', color: '#64748b', lineHeight: '1.6' }}>{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 11. FAQ SECTION */}
      <section className="section" style={{ background: '#f8fafc', padding: '5rem 0' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <div className="section-header" style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <span className="section-badge">F.A.Q</span>
            <h2 className="section-title" style={{ fontWeight: 800 }}>Frequently Asked Questions</h2>
            <p className="section-subtitle">Answering typical queries regarding estate taxes, bands, and trusts.</p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                className="faq-item"
                onClick={() => setActiveFaq(prev => prev === index ? null : index)}
                style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: '8px', cursor: 'pointer', padding: '1.25rem 1.5rem', transition: 'all 0.2s' }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontWeight: 700, fontSize: '0.95rem', color: '#1e293b' }}>{faq.q}</span>
                  <span style={{ color: 'var(--color-primary)', display: 'flex', alignItems: 'center' }}>
                    {activeFaq === index ? <FiChevronUp /> : <FiChevronDown />}
                  </span>
                </div>
                {activeFaq === index && (
                  <div className="animate-fade-in" style={{ marginTop: '1rem', fontSize: '0.85rem', color: '#475569', lineHeight: '1.6', borderTop: '1px solid #f1f5f9', paddingTop: '1rem' }}>
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 12. FINAL CALL TO ACTION */}
      <section id="callback-consultation-section" className="section" style={{ padding: '6rem 0', background: '#090d16', color: 'white', position: 'relative' }}>
        <div style={{ absolute: 'absolute', inset: 0, opacity: 0.15, backgroundImage: "url('https://images.unsplash.com/photo-1542037104857-ffbb0b9155fb?auto=format&fit=crop&w=1200&q=80')", backgroundSize: 'cover', backgroundPosition: 'center', pointerEvents: 'none' }} />
        
        <div className="container relative-z" style={{ textAlign: 'center', maxWidth: '700px', position: 'relative', zIndex: 5 }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'white', marginBottom: '1.25rem', lineHeight: '1.2' }}>
            Give Us A Go And Book A Free Initial Consultation
          </h2>
          <p style={{ color: '#cbd5e1', fontSize: '1.05rem', lineHeight: '1.7', marginBottom: '2.5rem' }}>
            Protect your wealth, minimise inheritance tax, and secure your family's future with confidence.
          </p>
          <a 
            href="#top" 
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="btn btn-primary-gradient" 
            style={{ padding: '1.1rem 2.5rem', fontSize: '1.05rem', border: 'none' }}
          >
            Book Free Consultation
          </a>
        </div>
      </section>

    </div>
  );
}
