import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';
import { FiPhone, FiMail, FiMapPin, FiMenu, FiX } from 'react-icons/fi';
import { FaLinkedin, FaFacebook, FaTwitter } from 'react-icons/fa';

const BACKEND_URL = 'http://localhost:5000/api/leads';

function App() {
  const [activeTab, setActiveTab] = useState('landing');
  const [layoutModel, setLayoutModel] = useState('model1');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const handleConsultationClick = (e) => {
    e.preventDefault();
    if (activeTab !== 'landing') {
      setActiveTab('landing');
      setTimeout(() => {
        const formEl = document.getElementById('join-form');
        if (formEl) formEl.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const formEl = document.getElementById('join-form');
      if (formEl) formEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className={`theme-${layoutModel}`}>
      {/* 1. TOP UTILITY HEADER STRIP */}
      <div className="top-header-strip">
        <div className="container top-header-flex">
          <div className="top-header-contacts">
            <a href="tel:1300043287" className="top-header-link">
              <FiPhone style={{ color: 'var(--color-primary)' }} /> 1300 043 287
            </a>
            <a href="mailto:hello@m4plus.com.au" className="top-header-link">
              <FiMail style={{ color: 'var(--color-primary)' }} /> hello@m4plus.com.au
            </a>
          </div>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <span style={{ fontSize: '0.8rem', color: '#64748b' }}>Melbourne VIC 3000</span>
          </div>
        </div>
      </div>

      {/* 2. MAIN NAVIGATION HEADER */}
      <header className="navbar">
        <div className="container navbar-flex">
          <a href="#" className="logo" onClick={(e) => { e.preventDefault(); setActiveTab('landing'); closeMobileMenu(); }}>
            <img 
              src="/matplus-logo.png" 
              alt="MATPLUS+ Chartered Accountants" 
              style={{ height: '52px', width: 'auto', objectFit: 'contain', display: 'block' }} 
            />
          </a>

          {/* Desktop Navigation */}
          <nav className="desktop-nav">
            <ul className="nav-links">
              <li 
                className={`nav-item ${activeTab === 'landing' ? 'active' : ''}`}
                onClick={() => setActiveTab('landing')}
              >
                Home
              </li>
              <li className="nav-item" onClick={handleConsultationClick}>Services</li>
              <li className="nav-item" onClick={handleConsultationClick}>Industries</li>
              <li className="nav-item" onClick={handleConsultationClick}>About Us</li>
              
              {/* Layout Dropdown trigger */}
              <li className="nav-item dropdown-layouts">
                <div 
                  className="dropdown-trigger"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  Layouts <span style={{ fontSize: '0.65rem' }}>▼</span>
                </div>
                {isDropdownOpen && (
                  <ul className="dropdown-menu">
                    <li 
                      className={`dropdown-item ${layoutModel === 'model1' ? 'active-model' : ''}`}
                      onClick={() => { setLayoutModel('model1'); setIsDropdownOpen(false); }}
                    >
                      Model 1 - Frost Glass
                    </li>
                    <li 
                      className={`dropdown-item ${layoutModel === 'model2' ? 'active-model' : ''}`}
                      onClick={() => { setLayoutModel('model2'); setIsDropdownOpen(false); }}
                    >
                      Model 2 - Golden Premium
                    </li>
                    <li 
                      className={`dropdown-item ${layoutModel === 'model3' ? 'active-model' : ''}`}
                      onClick={() => { setLayoutModel('model3'); setIsDropdownOpen(false); }}
                    >
                      Model 3 - Ocean Blue
                    </li>
                  </ul>
                )}
              </li>

              <li>
                <a 
                  href="#join-form" 
                  className="btn btn-primary navbar-cta-btn"
                  onClick={handleConsultationClick}
                >
                  Book a Free Consultation
                </a>
              </li>
            </ul>
          </nav>

          {/* Hamburger Button (Mobile Only) */}
          <button 
            className="mobile-menu-toggle"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle navigation"
          >
            {isMobileMenuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>

        {/* Mobile Slide-Down Navigation */}
        {isMobileMenuOpen && (
          <div className="mobile-nav-overlay">
            <ul className="mobile-nav-links">
              <li className={`mobile-nav-item ${activeTab === 'landing' ? 'active' : ''}`} onClick={() => { setActiveTab('landing'); closeMobileMenu(); }}>Home</li>
              <li className="mobile-nav-item" onClick={() => { handleConsultationClick({ preventDefault: () => {} }); closeMobileMenu(); }}>Services</li>
              <li className="mobile-nav-item" onClick={() => { handleConsultationClick({ preventDefault: () => {} }); closeMobileMenu(); }}>Industries</li>
              <li className="mobile-nav-item" onClick={() => { handleConsultationClick({ preventDefault: () => {} }); closeMobileMenu(); }}>About Us</li>
              <li className="mobile-nav-item mobile-nav-divider">Layouts</li>
              <li className={`mobile-nav-item mobile-nav-sub ${layoutModel === 'model1' ? 'active' : ''}`} onClick={() => { setLayoutModel('model1'); closeMobileMenu(); }}>⬛ Model 1 - Frost Glass</li>
              <li className={`mobile-nav-item mobile-nav-sub ${layoutModel === 'model2' ? 'active' : ''}`} onClick={() => { setLayoutModel('model2'); closeMobileMenu(); }}>🏅 Model 2 - Golden Premium</li>
              <li className={`mobile-nav-item mobile-nav-sub ${layoutModel === 'model3' ? 'active' : ''}`} onClick={() => { setLayoutModel('model3'); closeMobileMenu(); }}>🌊 Model 3 - Ocean Blue</li>
              <li style={{ padding: '0.75rem 1.5rem' }}>
                <a 
                  href="#join-form" 
                  className="btn btn-primary" 
                  style={{ width: '100%', textAlign: 'center', display: 'block' }}
                  onClick={() => { handleConsultationClick({ preventDefault: () => {} }); closeMobileMenu(); }}
                >
                  Book a Free Consultation
                </a>
              </li>
            </ul>
          </div>
        )}
      </header>

      {/* 3. DYNAMIC CONTENT AREA */}
      <main className={activeTab === 'landing' ? 'landing-main-wrapper' : 'container'}>
        {activeTab === 'landing' ? (
          <LandingPage 
            backendUrl={BACKEND_URL} 
            layoutModel={layoutModel}
            onLeadSubmitted={() => {
              console.log('Inquiry submitted, database sync complete.');
            }} 
          />
        ) : (
          <Dashboard backendUrl={BACKEND_URL} />
        )}
      </main>

      {/* 4. FOOTER */}
      <footer className="footer">
        <div className="container">
          <div className="footer-top-grid">
            <div>
              <div style={{ display: 'inline-block', background: 'white', borderRadius: '10px', padding: '8px 14px', marginBottom: '1.25rem' }}>
                <img src="/matplus-logo.png" alt="MATPLUS+ Chartered Accountants" style={{ height: '50px', width: 'auto', objectFit: 'contain', display: 'block' }} />
              </div>
              <p style={{ fontSize: '0.875rem', color: '#94a3b8', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                Providing smart financial solutions, proactive tax advice, and business structures for clients across Australia.
              </p>
              <div style={{ display: 'flex', gap: '1.25rem', fontSize: '1.2rem', color: '#94a3b8' }}>
                <a href="#" className="footer-link-a" style={{ display: 'flex' }}><FaLinkedin /></a>
                <a href="#" className="footer-link-a" style={{ display: 'flex' }}><FaFacebook /></a>
                <a href="#" className="footer-link-a" style={{ display: 'flex' }}><FaTwitter /></a>
              </div>
            </div>

            <div>
              <h4 className="footer-col-title">Services</h4>
              <ul className="footer-links-list">
                <li><a href="#" className="footer-link-a">Taxation & Compliance</a></li>
                <li><a href="#" className="footer-link-a">Accounting Advisory</a></li>
                <li><a href="#" className="footer-link-a">Business Growth Advice</a></li>
                <li><a href="#" className="footer-link-a">Bookkeeping Automation</a></li>
                <li><a href="#" className="footer-link-a">Payroll Services</a></li>
              </ul>
            </div>

            <div>
              <h4 className="footer-col-title">Industries</h4>
              <ul className="footer-links-list">
                <li><a href="#" className="footer-link-a">Retail & E-commerce</a></li>
                <li><a href="#" className="footer-link-a">Professional Services</a></li>
                <li><a href="#" className="footer-link-a">Construction & Trade</a></li>
                <li><a href="#" className="footer-link-a">Healthcare Clinics</a></li>
                <li><a href="#" className="footer-link-a">Hospitality & Food</a></li>
              </ul>
            </div>

            <div>
              <h4 className="footer-col-title">Contact Us</h4>
              <ul className="footer-links-list" style={{ fontSize: '0.875rem', color: '#94a3b8' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <FiPhone style={{ color: 'var(--color-primary)' }} /> 1300 043 287
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <FiMail style={{ color: 'var(--color-primary)' }} /> hello@m4plus.com.au
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                  <FiMapPin style={{ color: 'var(--color-primary)', marginTop: '3px', flexShrink: 0 }} />
                  <span>Suite 3, 530 Lonsdale St, Melbourne VIC 3000</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom-flex">
            <p>© 2026 MATPLUS Accounting. All rights reserved. ICAEW Certified Practice.</p>
            <div style={{ display: 'flex', gap: '1.25rem' }}>
              <a href="#" className="footer-link-a">Privacy Policy</a>
              <a href="#" className="footer-link-a">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
