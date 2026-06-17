import React from 'react';
import { motion } from 'framer-motion';
import { 
  FiCheckCircle, 
  FiAward, 
  FiShield, 
  FiClock, 
  FiTrendingUp, 
  FiCompass, 
  FiUsers, 
  FiMapPin, 
  FiFileText, 
  FiTarget,
  FiBookOpen
} from 'react-icons/fi';
import { FaBuilding, FaGift, FaUserTie, FaUserAstronaut } from 'react-icons/fa';

export default function AboutUs({ handleConsultationClick }) {
  const timelineSteps = [
    { year: "2011", title: "Vision Established", desc: "Matplus envisioned and conceptualised by Ms. Tabassum Nathani." },
    { year: "2012", title: "Compliance Services Launched", desc: "First office opened in Sudbury Town, North West London, led by Mr. Arif Punjani." },
    { year: "2015", title: "Estate & Legacy Expansion", desc: "Introduced Estate Planning, Wills, Trusts, and legacy structuring." },
    { year: "2020", title: "Nationwide Digital Scale", desc: "Expanded cloud workflows and remote advisory across the UK." },
    { year: "2021", title: "Kings Cross Office Opened", desc: "Established central London presence to serve urban business hubs." },
    { year: "Today", title: "Serving Clients Nationwide", desc: "Proudly advising individuals, families, and businesses across the UK." }
  ];

  const leadership = [
    {
      name: "Arif Punjani",
      creds: "ACA, TEP",
      role: "Tax Partner",
      specialties: ["Tax Planning", "Estate Planning", "Trust Structures", "Property Tax"],
      avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80"
    },
    {
      name: "Tabassum Nathani",
      creds: "ACA, BFP",
      role: "Managing Director",
      specialties: ["Business Advisory", "Compliance Services", "Female Entrepreneurship", "Strategic Planning"],
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80"
    }
  ];

  const expertise = [
    { title: "Accounting & Compliance", icon: <FiFileText /> },
    { title: "Tax Planning", icon: <FiTrendingUp /> },
    { title: "Estate Planning", icon: <FiShield /> },
    { title: "Wills & Probate", icon: <FiCompass /> },
    { title: "Property Tax", icon: <FaBuilding /> },
    { title: "Business Advisory", icon: <FiUsers /> },
    { title: "Start-Up Support", icon: <FiTarget /> },
    { title: "Female Entrepreneur Programs", icon: <FiBookOpen /> }
  ];

  const partners = ["Xero", "QuickBooks", "MYOB", "HMRC", "Companies House", "Estate Planning Partners"];

  return (
    <div className="animate-fade-in text-slate-800" style={{ paddingBottom: '3rem' }}>
      
      {/* 1. HERO SECTION */}
      <section className="hero-slider-container" style={{ height: 'auto', minHeight: '600px', padding: '6rem 0', background: '#090d16' }}>
        <div className="hero-slide-overlay" style={{ background: 'linear-gradient(135deg, rgba(9, 13, 22, 0.95) 0%, rgba(15, 23, 42, 0.85) 100%)' }} />
        
        <div className="container relative-z" style={{ zIndex: 10, position: 'relative' }}>
          <div className="hero-grid-layout" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '4rem', alignItems: 'center' }}>
            
            {/* Left Content */}
            <div style={{ color: 'white' }}>
              <span className="section-badge" style={{ color: '#ff4d4d', fontWeight: 700 }}>About Matplus</span>
              <h1 className="hero-title" style={{ fontSize: '2.5rem', lineHeight: '1.2', color: 'white', marginTop: '0.5rem', marginBottom: '1.5rem', fontWeight: 800 }}>
                The Personal Accountants Who Care For Your Needs
              </h1>
              <p style={{ color: '#cbd5e1', fontSize: '1.05rem', lineHeight: '1.7', marginBottom: '2rem' }}>
                For over a decade, Matplus Chartered Accountants has been helping businesses, families, and property investors across the UK with expert accounting, tax planning, and estate services.
              </p>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2.5rem' }}>
                {[
                  "Established Since 2012",
                  "Trusted Across the UK",
                  "Property Tax Specialists",
                  "Supporting Female Entrepreneurs"
                ].map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <FiCheckCircle style={{ color: '#ff4d4d', flexShrink: 0 }} />
                    <span style={{ fontSize: '0.9rem', color: '#f1f5f9' }}>{item}</span>
                  </div>
                ))}
              </div>

              <a 
                href="#callback-consultation"
                onClick={handleConsultationClick}
                className="btn btn-primary-gradient" 
                style={{ padding: '1rem 2rem', fontSize: '1rem', border: 'none' }}
              >
                Book Free Consultation
              </a>
            </div>

            {/* Right: Premium Meeting Image */}
            <div style={{ position: 'relative', height: '380px', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.4)' }}>
              <img 
                src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80" 
                alt="Accountant meeting client" 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div style={{ absolute: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(9,13,22,0.4), transparent)' }} />
            </div>

          </div>
        </div>
      </section>

      {/* 2. OUR STORY */}
      <section className="section bg-white" style={{ padding: '5rem 0' }}>
        <div className="container" style={{ maxWidth: '900px' }}>
          <div className="section-header" style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span className="section-badge">Our Journey</span>
            <h2 className="section-title" style={{ fontWeight: 800 }}>Building Relationships Beyond Numbers</h2>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', fontSize: '1rem', color: '#475569', lineHeight: '1.7' }}>
            <p>
              Matplus Chartered Accountants was envisioned and conceptualised by <strong>Ms. Tabassum Nathani</strong> towards the end of 2011. In 2012, the first arm of compliance services was launched under the leadership of <strong>Mr. Arif Punjani</strong> to serve local businesses and individuals in North West London through its first office in Sudbury Town.
            </p>
            <p>
              Over the years, the firm expanded beyond traditional compliance services, introducing specialist offerings including Estate Planning, Wills, Lasting Powers of Attorney (LPA), Probate Services, and Property Tax Planning.
            </p>
            <p style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '12px', borderLeft: '4px solid var(--color-primary)', color: '#1e293b', fontWeight: 500 }}>
              Today, Matplus is recognised as one of the leading firms in the industry, serving clients throughout the UK with a strong presence in Kings Cross since 2021.
            </p>
            <p>
              Our mission is to act as a trusted financial partner for businesses and families while actively supporting start-ups and women-led enterprises.
            </p>
          </div>
        </div>
      </section>

      {/* 3. TIMELINE SECTION */}
      <section className="section" style={{ background: '#f8fafc', padding: '5rem 0' }}>
        <div className="container">
          <div className="section-header" style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <span className="section-badge">Timeline</span>
            <h2 className="section-title" style={{ fontWeight: 800 }}>Our Progress Over Time</h2>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
            {timelineSteps.map((step, idx, arr) => (
              <React.Fragment key={idx}>
                <div style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '1.5rem', width: '220px', textAlign: 'center', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' }}>
                  <span style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--color-primary)', display: 'block', marginBottom: '0.5rem' }}>{step.year}</span>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#090d16', marginBottom: '0.5rem' }}>{step.title}</h4>
                  <p style={{ fontSize: '0.8rem', color: '#64748b', lineHeight: '1.5' }}>{step.desc}</p>
                </div>
                {idx < arr.length - 1 && (
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-primary)' }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ transform: 'rotate(0deg)' }}>
                      <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* 4. MISSION & VISION */}
      <section className="section bg-white" style={{ padding: '5rem 0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem' }}>
            <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '3rem', borderRadius: '20px' }}>
              <div style={{ width: '3rem', height: '3rem', borderRadius: '10px', background: 'var(--color-primary-glow)', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', marginBottom: '1.5rem' }}>
                <FiTarget />
              </div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#090d16', marginBottom: '1rem' }}>Our Mission</h3>
              <p style={{ color: '#475569', lineHeight: '1.7' }}>
                To provide proactive financial advice that helps businesses and families grow, protect wealth, and achieve complete peace of mind.
              </p>
            </div>

            <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '3rem', borderRadius: '20px' }}>
              <div style={{ width: '3rem', height: '3rem', borderRadius: '10px', background: 'var(--color-primary-glow)', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', marginBottom: '1.5rem' }}>
                <FiCompass />
              </div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#090d16', marginBottom: '1rem' }}>Our Vision</h3>
              <p style={{ color: '#475569', lineHeight: '1.7' }}>
                To become one of the UK's most trusted accounting and wealth advisory firms while empowering entrepreneurs and securing future generations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. WHY CHOOSE US */}
      <section className="section" style={{ background: '#f8fafc', padding: '5rem 0' }}>
        <div className="container">
          <div className="section-header" style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <span className="section-badge">Client Guarantees</span>
            <h2 className="section-title" style={{ fontWeight: 800 }}>Why Choose Us</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '2rem' }}>
            {[
              { title: "Expert Team", desc: "Certified professionals with years of experience in corporate advisory.", icon: <FiAward /> },
              { title: "Trusted & Secure", desc: "Confidential and secure systems giving complete peace of mind.", icon: <FiShield /> },
              { title: "Always Available", desc: "Responsive support and ongoing guidance whenever you need answers.", icon: <FiClock /> },
              { title: "Proven Results", desc: "Successfully helping businesses and families save tax and preserve wealth.", icon: <FiTrendingUp /> }
            ].map((card, idx) => (
              <div key={idx} style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '2rem', textAlign: 'center', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' }}>
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

      {/* 6. MEET OUR LEADERSHIP TEAM */}
      <section className="section bg-white" style={{ padding: '5rem 0' }}>
        <div className="container">
          <div className="section-header" style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <span className="section-badge">Our Team</span>
            <h2 className="section-title" style={{ fontWeight: 800 }}>Experienced Leaders You Can Trust</h2>
            <p className="section-subtitle">Dedicated professionals directing our tax and compliance divisions.</p>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3rem', justifyContent: 'center' }}>
            {leadership.map((leader, idx) => (
              <div key={idx} className="benefit-card" style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '20px', padding: '2.5rem', width: '380px', display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                <div style={{ width: '100px', height: '100px', borderRadius: '50%', overflow: 'hidden', flexShrink: 0, border: '3px solid var(--color-primary)' }}>
                  <img src={leader.avatar} alt={leader.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#090d16' }}>{leader.name}</h3>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-primary)', display: 'block', marginBottom: '0.5rem' }}>{leader.creds} — {leader.role}</span>
                  <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '0.5rem' }}>
                    <span style={{ display: 'block', fontSize: '0.7rem', textTransform: 'uppercase', color: '#64748b', fontWeight: 700, marginBottom: '0.25rem' }}>Specialises in:</span>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '0.8rem', color: '#475569', display: 'flex', flexDirection: 'column', gap: '2px' }}>
                      {leader.specialties.map((spec, specIdx) => (
                        <li key={specIdx} style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                          <span style={{ color: 'var(--color-primary)' }}>•</span> {spec}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. AREAS OF EXPERTISE */}
      <section className="section" style={{ background: '#f8fafc', padding: '5rem 0' }}>
        <div className="container">
          <div className="section-header" style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <span className="section-badge">Expertise</span>
            <h2 className="section-title" style={{ fontWeight: 800 }}>Our Areas Of Expertise</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '2rem' }}>
            {expertise.map((item, idx) => (
              <div key={idx} style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '1.75rem', textAlign: 'center', boxShadow: '0 2px 4px rgba(0,0,0,0.01)' }}>
                <div style={{ color: 'white', background: 'var(--color-primary)', width: '3rem', height: '3rem', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem auto', fontSize: '1.25rem' }}>
                  {item.icon}
                </div>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#090d16' }}>{item.title}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. OUR PRESENCE */}
      <section className="section bg-white" style={{ padding: '5rem 0' }}>
        <div className="container" style={{ maxWidth: '800px', textAlign: 'center' }}>
          <div style={{ color: 'var(--color-primary)', fontSize: '2rem', marginBottom: '1.5rem', display: 'flex', justifyContent: 'center' }}>
            <FiMapPin />
          </div>
          <h2 className="section-title" style={{ fontWeight: 800, marginBottom: '1.25rem' }}>Serving Clients Across The United Kingdom</h2>
          <p style={{ color: '#475569', fontSize: '1.05rem', lineHeight: '1.8' }}>
            Originally established in North West London, Matplus expanded with a city presence in Kings Cross in 2021. Today, we proudly support individuals, families and businesses throughout the UK through both in-person and digital advisory services.
          </p>
        </div>
      </section>

      {/* 9. STATISTICS STRIP */}
      <section className="partners-bar" style={{ background: '#090d16', borderBottom: 'none', padding: '3.5rem 0', color: 'white' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', textAlign: 'center' }}>
            {[
              { label: "2012", val: "Founded" },
              { label: "40+", val: "Years Combined Experience" },
              { label: "1,200+", val: "Clients Served" },
              { label: "98%", val: "Client Satisfaction" }
            ].map((stat, idx) => (
              <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <span style={{ fontSize: '2rem', fontWeight: 900, color: 'white' }}>{stat.label}</span>
                <span style={{ fontSize: '0.8rem', color: '#cbd5e1', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.05em' }}>{stat.val}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. PARTNERS LOGO CAROUSEL */}
      <section className="py-12 border-b border-slate-100 bg-white">
        <div className="container">
          <div className="relative overflow-hidden w-full flex items-center">
            <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

            <div className="flex animate-infinite-scroll gap-16 min-w-full">
              {[...partners, ...partners, ...partners].map((partner, i) => (
                <div key={i} className="flex items-center justify-center min-w-[140px] h-12">
                  <span className="text-xl font-black text-slate-300 hover:text-slate-700 transition-colors duration-300 tracking-wider">
                    {partner}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 11. FINAL CALL TO ACTION */}
      <section id="callback-consultation" className="section" style={{ padding: '6rem 0', background: '#090d16', color: 'white', position: 'relative' }}>
        <div style={{ absolute: 'absolute', inset: 0, opacity: 0.15, backgroundImage: "url('https://images.unsplash.com/photo-1542037104857-ffbb0b9155fb?auto=format&fit=crop&w=1200&q=80')", backgroundSize: 'cover', backgroundPosition: 'center', pointerEvents: 'none' }} />
        
        <div className="container relative-z" style={{ textAlign: 'center', maxWidth: '750px', position: 'relative', zIndex: 5 }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'white', marginBottom: '1.25rem', lineHeight: '1.2' }}>
            Let's Build Your Financial Future Together
          </h2>
          <p style={{ color: '#cbd5e1', fontSize: '1.05rem', lineHeight: '1.7', marginBottom: '2.5rem' }}>
            Whether you're starting a business, planning your estate or seeking specialist tax advice, our team is here to help.
          </p>
          <a 
            href="#top" 
            onClick={handleConsultationClick}
            className="btn btn-primary-gradient" 
            style={{ padding: '1.1rem 2.5rem', fontSize: '1.05rem', border: 'none' }}
          >
            Book Free Initial Consultation
          </a>
        </div>
      </section>

    </div>
  );
}
