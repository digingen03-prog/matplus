import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';
import { FiPhone, FiMail, FiMapPin } from 'react-icons/fi';
import { FaLinkedin, FaFacebook, FaTwitter } from 'react-icons/fa';

const BACKEND_URL = 'http://localhost:5000/api/leads';

function App() {
  const [activeTab, setActiveTab] = useState('landing');
  const [layoutModel, setLayoutModel] = useState('model1');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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
          <a href="#" className="logo" onClick={(e) => { e.preventDefault(); setActiveTab('landing'); }}>
            MATPLUS<span>ACCOUNTING</span>
          </a>
          
          <nav>
            <ul className="nav-links" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', listStyle: 'none' }}>
              <li 
                className={`nav-item ${activeTab === 'landing' ? 'active' : ''}`}
                onClick={() => setActiveTab('landing')}
                style={{ cursor: 'pointer', fontWeight: 600 }}
              >
                Home
              </li>
              <li className="nav-item" onClick={handleConsultationClick} style={{ cursor: 'pointer', fontWeight: 600 }}>Services</li>
              <li className="nav-item" onClick={handleConsultationClick} style={{ cursor: 'pointer', fontWeight: 600 }}>Industries</li>
              <li className="nav-item" onClick={handleConsultationClick} style={{ cursor: 'pointer', fontWeight: 600 }}>About Us</li>
              
              {/* Layout Dropdown trigger */}
              <li className="nav-item dropdown-layouts" style={{ position: 'relative' }}>
                <div 
                  className="dropdown-trigger" 
                  style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', cursor: 'pointer', fontWeight: 600 }}
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  Layouts <span style={{ fontSize: '0.65rem' }}>▼</span>
                </div>
                {isDropdownOpen && (
                  <ul className="dropdown-menu" style={{
                    position: 'absolute',
                    top: '100%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: 'white',
                    border: '1px solid #cbd5e1',
                    borderRadius: '8px',
                    boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)',
                    listStyle: 'none',
                    padding: '0.5rem 0',
                    minWidth: '200px',
                    zIndex: 100,
                    marginTop: '0.5rem'
                  }}>
                    <li 
                      className="dropdown-item" 
                      style={{ padding: '0.6rem 1.2rem', cursor: 'pointer', fontSize: '0.85rem', color: layoutModel === 'model1' ? 'var(--color-primary)' : '#334155', background: layoutModel === 'model1' ? '#f1f5f9' : 'transparent', fontWeight: layoutModel === 'model1' ? 700 : 500 }}
                      onClick={() => { setLayoutModel('model1'); setIsDropdownOpen(false); }}
                    >
                      Model 1 - Frost Glass
                    </li>
                    <li 
                      className="dropdown-item" 
                      style={{ padding: '0.6rem 1.2rem', cursor: 'pointer', fontSize: '0.85rem', color: layoutModel === 'model2' ? '#F4B400' : '#334155', background: layoutModel === 'model2' ? '#fdfdf6' : 'transparent', fontWeight: layoutModel === 'model2' ? 700 : 500 }}
                      onClick={() => { setLayoutModel('model2'); setIsDropdownOpen(false); }}
                    >
                      Model 2 - Golden Premium
                    </li>
                    <li 
                      className="dropdown-item" 
                      style={{ padding: '0.6rem 1.2rem', cursor: 'pointer', fontSize: '0.85rem', color: layoutModel === 'model3' ? '#2563EB' : '#334155', background: layoutModel === 'model3' ? '#f0f7ff' : 'transparent', fontWeight: layoutModel === 'model3' ? 700 : 500 }}
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
                  className="btn btn-primary" 
                  onClick={handleConsultationClick}
                  style={{ padding: '0.55rem 1.15rem', fontSize: '0.85rem' }}
                >
                  Book a Free Consultation
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* 3. DYNAMIC CONTENT AREA */}
      <main className="container">
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
              <h3 style={{ color: 'white', marginBottom: '1.25rem', fontSize: '1.4rem' }}>MATPLUS<span style={{ color: 'var(--color-primary)' }}>ACCOUNTING</span></h3>
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
              <a href="#" onClick={(e) => { e.preventDefault(); setActiveTab('dashboard'); }} className="footer-link-a" style={{ opacity: 0.5 }}>Admin Login</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
