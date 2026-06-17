import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiCheckCircle, 
  FiPhone, 
  FiMail, 
  FiMapPin, 
  FiClock, 
  FiAward, 
  FiShield, 
  FiTrendingUp, 
  FiCompass, 
  FiChevronDown, 
  FiChevronUp,
  FiFileText,
  FiUsers
} from 'react-icons/fi';
import { FaBuilding } from 'react-icons/fa';

export default function ContactUs({ backendUrl, onLeadSubmitted }) {
  // 1. Form state
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    serviceRequired: 'Accounting & Compliance',
    meetingType: 'Phone Consultation',
    message: ''
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
          company: 'Personal Inquiry',
          serviceInterest: formData.serviceRequired,
          email: formData.email,
          message: `Meeting Preference: ${formData.meetingType}. Message: ${formData.message}`
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Server error. Please try again.');
      }

      setStatus({ submitting: false, success: true, error: null });
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        serviceRequired: 'Accounting & Compliance',
        meetingType: 'Phone Consultation',
        message: ''
      });

      if (onLeadSubmitted) onLeadSubmitted();

      setTimeout(() => {
        setStatus(prev => ({ ...prev, success: false }));
      }, 6000);

    } catch (err) {
      setStatus({ submitting: false, success: false, error: err.message });
    }
  };

  // 2. FAQ Accordion State
  const [activeFaq, setActiveFaq] = useState(null);
  const faqs = [
    { 
      q: "Do you offer a free initial consultation?", 
      a: "Yes. We provide a confidential initial consultation to understand your requirements and discuss the best way forward." 
    },
    { 
      q: "Can meetings be conducted remotely?", 
      a: "Yes. We offer telephone consultations, video meetings (Zoom / Teams) and in-person appointments." 
    },
    { 
      q: "Do you work with clients outside London?", 
      a: "Absolutely. We support businesses, families and individuals across the UK through both in-person and digital advisory services." 
    },
    { 
      q: "What information should I prepare before the meeting?", 
      a: "Any relevant financial information, business details or questions you may have. Our team will guide you through the process." 
    }
  ];

  return (
    <div className="animate-fade-in text-slate-800" style={{ paddingBottom: '3rem' }}>
      
      {/* 1. HERO SECTION */}
      <section className="contact-hero-section">
        <div className="hero-slide-overlay" style={{ background: 'linear-gradient(135deg, rgba(9, 13, 22, 0.95) 0%, rgba(15, 23, 42, 0.85) 100%)' }} />
        
        <div className="container relative-z" style={{ zIndex: 10, position: 'relative' }}>
          <div className="contact-hero-grid">
            
            {/* Left side: Value props */}
            <div style={{ color: 'white' }}>
              <span className="section-badge" style={{ color: '#ff4d4d', fontWeight: 700 }}>Get in Touch</span>
              <h1 className="contact-hero-title">
                Let's Start The Conversation
              </h1>
              <p style={{ color: '#cbd5e1', fontSize: '1.05rem', lineHeight: '1.7', marginBottom: '2rem' }}>
                Whether you need accounting support, tax planning, estate planning, wills, probate services or business advice, our team is here to help. We believe in providing clear, proactive and personalised advice tailored to your goals.
              </p>
              
              <div className="hero-bullet-grid">
                {[
                  "Free Initial Consultation",
                  "Personalised Advice",
                  "Trusted Across The UK",
                  "Friendly & Professional Team"
                ].map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <FiCheckCircle style={{ color: '#ff4d4d', flexShrink: 0 }} />
                    <span style={{ fontSize: '0.9rem', color: '#f1f5f9' }}>{item}</span>
                  </div>
                ))}
              </div>

              <a 
                href="#message-form-section" 
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('message-form-section')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="btn btn-primary-gradient" 
                style={{ padding: '1rem 2rem', fontSize: '1rem', border: 'none' }}
              >
                Book Your Consultation
              </a>
            </div>

            {/* Right side: Meeting Image */}
            <div className="contact-hero-image-wrap">
              <img 
                src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=800&q=80" 
                alt="Matplus office client meeting" 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(9,13,22,0.4), transparent)' }} />
            </div>

          </div>
        </div>
      </section>

      {/* 2. CONTACT INFORMATION GRID */}
      <section className="section bg-white">
        <div className="container">
          <div className="section-header" style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <span className="section-badge">Contact Details</span>
            <h2 className="section-title" style={{ fontWeight: 800 }}>Get In Touch</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '2rem' }}>
            {/* Phone */}
            <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '2rem', textRendering: 'optimizeLegibility', textAlign: 'center' }}>
              <div style={{ color: 'var(--color-primary)', fontSize: '2rem', marginBottom: '1.25rem', display: 'flex', justifyContent: 'center' }}>
                <FiPhone />
              </div>
              <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#090d16', marginBottom: '0.5rem' }}>Phone</h4>
              <p style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '0.5rem' }}>Speak directly with our team for immediate assistance.</p>
              <a href="tel:+442071839432" style={{ fontWeight: 700, color: 'var(--color-primary)', fontSize: '1rem' }}>+44 20 7183 9432</a>
            </div>

            {/* Email */}
            <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '2rem', textRendering: 'optimizeLegibility', textAlign: 'center' }}>
              <div style={{ color: 'var(--color-primary)', fontSize: '2rem', marginBottom: '1.25rem', display: 'flex', justifyContent: 'center' }}>
                <FiMail />
              </div>
              <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#090d16', marginBottom: '0.5rem' }}>Email</h4>
              <p style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '0.5rem' }}>Send us your enquiry and we will respond promptly.</p>
              <a href="mailto:info@matplus.co.uk" style={{ fontWeight: 700, color: 'var(--color-primary)', fontSize: '1rem' }}>info@matplus.co.uk</a>
            </div>

            {/* Office Location */}
            <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '2rem', textRendering: 'optimizeLegibility', textAlign: 'center' }}>
              <div style={{ color: 'var(--color-primary)', fontSize: '2rem', marginBottom: '1.25rem', display: 'flex', justifyContent: 'center' }}>
                <FiMapPin />
              </div>
              <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#090d16', marginBottom: '0.5rem' }}>Office Location</h4>
              <p style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '0.5rem' }}>Serving clients across the United Kingdom with offices in London.</p>
              <span style={{ fontWeight: 700, color: '#090d16', fontSize: '0.95rem' }}>Kings Cross, London</span>
            </div>

            {/* Working Hours */}
            <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '2rem', textRendering: 'optimizeLegibility', textAlign: 'center' }}>
              <div style={{ color: 'var(--color-primary)', fontSize: '2rem', marginBottom: '1.25rem', display: 'flex', justifyContent: 'center' }}>
                <FiClock />
              </div>
              <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#090d16', marginBottom: '0.5rem' }}>Working Hours</h4>
              <div style={{ fontSize: '0.85rem', color: '#475569', display: 'flex', flexDirection: 'column', gap: '2px' }}>
                <p><strong>Monday – Friday:</strong> 9:00 AM – 6:00 PM</p>
                <p><strong>Saturday:</strong> By Appointment</p>
                <p><strong>Sunday:</strong> Closed</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SEND US A MESSAGE (DETAILED CONSULTATION FORM) */}
      <section id="message-form-section" className="section" style={{ background: '#f8fafc', borderTop: '1px solid #e2e8f0' }}>
        <div className="container" style={{ maxWidth: '700px' }}>
          <div className="callback-card-responsive">
            <h3 className="callback-title" style={{ textAlign: 'center', fontSize: '1.75rem', fontWeight: 800, color: '#090d16', marginBottom: '0.25rem' }}>
              Request A Free Consultation
            </h3>
            <p className="callback-desc text-muted" style={{ textAlign: 'center', color: '#64748b', marginBottom: '2.5rem', fontSize: '0.95rem' }}>
              Schedule a call back with a certified legacy wealth strategist.
            </p>

            <form onSubmit={handleFormSubmit}>
              {status.error && (
                <div style={{ background: 'rgba(239, 68, 68, 0.08)', border: '1px solid rgba(239, 68, 68, 0.15)', color: '#dc2626', padding: '0.75rem 1rem', borderRadius: '6px', marginBottom: '1.25rem', fontSize: '0.85rem' }}>
                  ⚠️ {status.error}
                </div>
              )}

              {status.success && (
                <div style={{ background: 'rgba(22, 163, 74, 0.08)', border: '1px solid rgba(22, 163, 74, 0.15)', color: '#16a34a', padding: '0.75rem 1rem', borderRadius: '6px', marginBottom: '1.25rem', fontSize: '0.85rem' }}>
                  ✓ Inquiry logged successfully. We will call you back shortly!
                </div>
              )}

              <div className="form-grid">
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">First Name *</label>
                  <input 
                    type="text" 
                    name="firstName"
                    required
                    className="form-control" 
                    placeholder="Enter first name" 
                    value={formData.firstName}
                    onChange={handleFormChange}
                  />
                </div>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Last Name</label>
                  <input 
                    type="text" 
                    name="lastName"
                    className="form-control" 
                    placeholder="Enter last name" 
                    value={formData.lastName}
                    onChange={handleFormChange}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Email Address *</label>
                <input 
                  type="email" 
                  name="email"
                  required
                  className="form-control" 
                  placeholder="name@example.com" 
                  value={formData.email}
                  onChange={handleFormChange}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Phone Number *</label>
                <input 
                  type="tel" 
                  name="phone"
                  required
                  className="form-control" 
                  placeholder="e.g. +44 7700 900077" 
                  value={formData.phone}
                  onChange={handleFormChange}
                />
              </div>

              <div className="form-grid">
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Service Required</label>
                  <select 
                    name="serviceRequired"
                    className="form-control"
                    value={formData.serviceRequired}
                    onChange={handleFormChange}
                    style={{ cursor: 'pointer' }}
                  >
                    <option value="Accounting & Compliance">Accounting & Compliance</option>
                    <option value="Tax Planning">Tax Planning</option>
                    <option value="Estate Planning">Estate Planning</option>
                    <option value="Wills & Probate">Wills & Probate</option>
                    <option value="Property Tax Planning">Property Tax Planning</option>
                    <option value="Business Advisory">Business Advisory</option>
                    <option value="Start-Up Support">Start-Up Support</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Preferred Meeting Type</label>
                  <select 
                    name="meetingType"
                    className="form-control"
                    value={formData.meetingType}
                    onChange={handleFormChange}
                    style={{ cursor: 'pointer' }}
                  >
                    <option value="Phone Consultation">Phone Consultation</option>
                    <option value="Video Meeting">Video Meeting (Zoom / Teams)</option>
                    <option value="In-Person Meeting">In-Person Meeting</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">How can we help you?</label>
                <textarea 
                  name="message"
                  className="form-control" 
                  placeholder="Describe your inquiry..." 
                  value={formData.message}
                  onChange={handleFormChange}
                  rows="3"
                  style={{ resize: 'none' }}
                />
              </div>

              <button 
                type="submit" 
                className="btn btn-primary" 
                style={{ width: '100%', padding: '0.85rem', marginTop: '0.5rem', fontSize: '1rem' }}
                disabled={status.submitting}
              >
                {status.submitting ? 'Booking Consultation...' : 'Book Free Initial Consultation'}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* 4. WHY CLIENTS CHOOSE MATPLUS */}
      <section className="section bg-white">
        <div className="container">
          <div className="section-header" style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <span className="section-badge">Our Commitment</span>
            <h2 className="section-title" style={{ fontWeight: 800 }}>Why Clients Choose Matplus</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '2rem' }}>
            {[
              { title: "Expert Team", desc: "Certified professionals with years of experience in corporate & estate advisory.", icon: <FiAward /> },
              { title: "Trusted & Secure", desc: "Confidential advice with complete peace of mind and bank-level privacy standards.", icon: <FiShield /> },
              { title: "Always Available", desc: "Responsive advisory support and direct helpline paths whenever you need guidance.", icon: <FiClock /> },
              { title: "Proven Results", desc: "Helping businesses and family structures protect, grow, and optimize estate values.", icon: <FiTrendingUp /> }
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

      {/* 5. SERVICES WE CAN HELP WITH */}
      <section className="section" style={{ background: '#f8fafc' }}>
        <div className="container">
          <div className="section-header" style={{ textAlign: 'center', marginBottom: '4.5rem' }}>
            <span className="section-badge">Services</span>
            <h2 className="section-title" style={{ fontWeight: 800 }}>Services We Can Help With</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2.5rem' }}>
            {[
              { title: "Accounting & Compliance", desc: "Keeping your business compliant and efficient, taking care of filings, books, and payroll.", icon: <FiFileText /> },
              { title: "Tax Planning", desc: "Reducing tax liabilities and maximizing operational margins through pre-emptive restructuring.", icon: <FiTrendingUp /> },
              { title: "Estate Planning", desc: "Protecting your family structures and securing legacy wealth from high IHT exposures.", icon: <FiShield /> },
              { title: "Wills & Probate", desc: "Ensuring wealth asset transfers are completed legally in complete alignment with your wishes.", icon: <FiCompass /> },
              { title: "Property Tax Planning", desc: "Specialist tax advisory for commercial/residential property landlords and trade investors.", icon: <FaBuilding /> },
              { title: "Business Advisory", desc: "Supporting business management groups at every lifecycle stage to fuel growth.", icon: <FiUsers /> }
            ].map((srv, idx) => (
              <div key={idx} style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '2rem', display: 'flex', gap: '1.25rem', alignItems: 'flex-start', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' }}>
                <div style={{ color: 'white', background: 'var(--color-primary)', width: '3rem', height: '3rem', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '1.25rem' }}>
                  {srv.icon}
                </div>
                <div>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#090d16', marginBottom: '0.5rem' }}>{srv.title}</h4>
                  <p style={{ fontSize: '0.85rem', color: '#64748b', lineHeight: '1.6' }}>{srv.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. FAQ ACCORDION SECTION */}
      <section className="section bg-white">
        <div className="container" style={{ maxWidth: '800px' }}>
          <div className="section-header" style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <span className="section-badge">FAQ</span>
            <h2 className="section-title" style={{ fontWeight: 800 }}>Frequently Asked Questions</h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                className="faq-item"
                onClick={() => setActiveFaq(prev => prev === index ? null : index)}
                style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', cursor: 'pointer', padding: '1.25rem 1.5rem', transition: 'all 0.2s' }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontWeight: 700, fontSize: '0.95rem', color: '#1e293b' }}>{faq.q}</span>
                  <span style={{ color: 'var(--color-primary)', display: 'flex', alignItems: 'center' }}>
                    {activeFaq === index ? <FiChevronUp /> : <FiChevronDown />}
                  </span>
                </div>
                {activeFaq === index && (
                  <div className="animate-fade-in" style={{ marginTop: '1rem', fontSize: '0.85rem', color: '#475569', lineHeight: '1.6', borderTop: '1px solid #cbd5e1', paddingTop: '1rem' }}>
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. MAP SECTION */}
      <section className="section" style={{ background: '#f8fafc', borderTop: '1px solid #e2e8f0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <span className="section-badge">Our Office</span>
          <h2 className="section-title" style={{ fontWeight: 800, marginBottom: '0.5rem' }}>Serving Clients Across The United Kingdom</h2>
          <p style={{ color: '#64748b', fontSize: '0.95rem', marginBottom: '2.5rem' }}>Office Location: Kings Cross, London</p>
          
          {/* Embedded Google Maps frame */}
          <div style={{ borderRadius: '20px', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.08)', height: '400px', width: '100%', maxWidth: '900px', margin: '0 auto' }}>
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2482.029864273574!2d-0.1265882842291585!3d51.53018247963842!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48761b3cd3cfc5c7%3A0xe54ef92bbcb468e8!2sKings%20Cross%2C%20London!5e0!3m2!1sen!2suk!4v1687000000000!5m2!1sen!2suk" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Matplus London Kings Cross Office Map"
            />
          </div>
        </div>
      </section>

      {/* 8. FINAL CALL TO ACTION */}
      <section className="section" style={{ padding: '6rem 0', background: '#090d16', color: 'white', position: 'relative' }}>
        <div style={{ absolute: 'absolute', inset: 0, opacity: 0.15, backgroundImage: "url('https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80')", backgroundSize: 'cover', backgroundPosition: 'center', pointerEvents: 'none' }} />
        
        <div className="container relative-z" style={{ textAlign: 'center', maxWidth: '750px', position: 'relative', zIndex: 5 }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'white', marginBottom: '1.25rem', lineHeight: '1.2' }}>
            Give Us A Go And Book A Free Initial Consultation
          </h2>
          <p style={{ color: '#cbd5e1', fontSize: '1.05rem', lineHeight: '1.7', marginBottom: '2.5rem' }}>
            We're here to provide practical advice and long-term support for your business, wealth and family.
          </p>
          <a 
            href="#message-form-section" 
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('message-form-section')?.scrollIntoView({ behavior: 'smooth' });
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
