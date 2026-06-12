import React, { useState } from 'react';

export default function LandingPage({ onLeadSubmitted, backendUrl }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    serviceInterest: 'Development',
    message: ''
  });

  const [status, setStatus] = useState({
    submitting: false,
    success: false,
    error: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic frontend validations
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus({ submitting: false, success: false, error: 'Please fill out all required fields.' });
      return;
    }

    if (formData.name.trim().length < 2) {
      setStatus({ submitting: false, success: false, error: 'Name must be at least 2 characters.' });
      return;
    }

    if (formData.message.trim().length < 10) {
      setStatus({ submitting: false, success: false, error: 'Message must be at least 10 characters.' });
      return;
    }

    setStatus({ submitting: true, success: false, error: null });

    try {
      const response = await fetch(backendUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong. Please try again.');
      }

      setStatus({ submitting: false, success: true, error: null });
      // Reset form
      setFormData({
        name: '',
        email: '',
        company: '',
        serviceInterest: 'Development',
        message: ''
      });

      // Call parent handler to refresh dashboard list if necessary
      if (onLeadSubmitted) {
        onLeadSubmitted();
      }

      // Hide success message after 5 seconds
      setTimeout(() => {
        setStatus(prev => ({ ...prev, success: false }));
      }, 5000);

    } catch (err) {
      setStatus({
        submitting: false,
        success: false,
        error: err.message
      });
    }
  };

  const [billingPeriod, setBillingPeriod] = useState('monthly');

  return (
    <div className="animate-fade-in" style={{ paddingBottom: '5rem' }}>
      {/* HERO SECTION */}
      <section style={styles.heroSection}>
        <h1 style={styles.heroTitle}>
          Build the Future of Web Apps with <span className="text-gradient">Antigravity</span>
        </h1>
        <p style={styles.heroSubtitle}>
          An ultra-premium, high-performance toolkit designed for modern creators. Scale your workflow, deploy in seconds, and dazzle your audience.
        </p>
        <div style={styles.heroActions}>
          <a href="#join-form" className="btn btn-primary">Get Started Today</a>
          <a href="#features" className="btn btn-secondary">Explore Features</a>
        </div>
      </section>

      {/* METRICS SECTION */}
      <section style={styles.metricsGrid}>
        <div className="glass-panel glass-card" style={styles.metricItem}>
          <h3 style={styles.metricVal}>99.99%</h3>
          <p style={styles.metricLbl}>Uptime Guarantee</p>
        </div>
        <div className="glass-panel glass-card" style={styles.metricItem}>
          <h3 style={styles.metricVal}>10x</h3>
          <p style={styles.metricLbl}>Faster Performance</p>
        </div>
        <div className="glass-panel glass-card" style={styles.metricItem}>
          <h3 style={styles.metricVal}>4.9/5</h3>
          <p style={styles.metricLbl}>Developer Rating</p>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section id="features" style={styles.featuresSection}>
        <div style={styles.sectionHeader}>
          <span style={styles.badge}>Our Features</span>
          <h2 style={styles.sectionTitle}>Engineered for Excellence</h2>
          <p style={styles.sectionSubtitle}>Explore our powerful modules engineered to take your web experience to the next level.</p>
        </div>

        <div style={styles.featuresGrid}>
          <div className="glass-panel glass-card" style={styles.featureCard}>
            <div style={styles.featureIcon}>⚡</div>
            <h3 style={styles.featureTitle}>Full Stack Automation</h3>
            <p>Automate your boilerplate code, database schema creations, API routing generation, and frontend UI templates in a single click.</p>
          </div>
          <div className="glass-panel glass-card" style={styles.featureCard}>
            <div style={styles.featureIcon}>✨</div>
            <h3 style={styles.featureTitle}>Premium Micro-Styling</h3>
            <p>Leverage HSL dynamic colors, custom glassmorphism overlays, custom typography, and responsive, fluid grid layouts natively.</p>
          </div>
          <div className="glass-panel glass-card" style={styles.featureCard}>
            <div style={styles.featureIcon}>📊</div>
            <h3 style={styles.featureTitle}>Predictive Analytics</h3>
            <p>Generate deep analytical insights, user signup heatmaps, service demand forecasts, and database usage telemetry out of the box.</p>
          </div>
        </div>
      </section>

      {/* PRICING SECTION */}
      <section style={styles.pricingSection}>
        <div style={styles.sectionHeader}>
          <span style={styles.badge}>Pricing</span>
          <h2 style={styles.sectionTitle}>Flexible Plans, No Hidden Fees</h2>
          
          {/* Billing Switcher */}
          <div style={styles.billingToggleContainer}>
            <span style={billingPeriod === 'monthly' ? styles.activeBillingText : styles.inactiveBillingText}>Monthly</span>
            <button 
              onClick={() => setBillingPeriod(prev => prev === 'monthly' ? 'yearly' : 'monthly')}
              style={styles.toggleBtn}
            >
              <div style={{
                ...styles.toggleCircle,
                transform: billingPeriod === 'yearly' ? 'translateX(22px)' : 'translateX(0)'
              }} />
            </button>
            <span style={billingPeriod === 'yearly' ? styles.activeBillingText : styles.inactiveBillingText}>
              Yearly <span style={styles.saveBadge}>Save 20%</span>
            </span>
          </div>
        </div>

        <div style={styles.pricingGrid}>
          {/* Plan 1 */}
          <div className="glass-panel glass-card" style={styles.pricingCard}>
            <h3 style={styles.planName}>Starter</h3>
            <div style={styles.planPrice}>
              <span style={styles.currency}>$</span>
              <span style={styles.amount}>{billingPeriod === 'monthly' ? '19' : '15'}</span>
              <span style={styles.period}>/mo</span>
            </div>
            <p style={styles.planDesc}>Perfect for freelancers and solo projects looking for core functionalities.</p>
            <ul style={styles.planFeatures}>
              <li>✓ Basic lead capture</li>
              <li>✓ 3 Active projects</li>
              <li>✓ Shared server hosting</li>
              <li>✓ Email support</li>
            </ul>
            <a href="#join-form" className="btn btn-secondary" style={{ width: '100%', marginTop: '1.5rem' }}>Get Started</a>
          </div>

          {/* Plan 2 - Featured */}
          <div className="glass-panel glass-card" style={{ ...styles.pricingCard, border: '1px solid var(--color-primary)', boxShadow: '0 8px 32px 0 rgba(99, 102, 241, 0.15)' }}>
            <div style={styles.featuredBadge}>POPULAR</div>
            <h3 style={styles.planName}>Pro Developer</h3>
            <div style={styles.planPrice}>
              <span style={styles.currency}>$</span>
              <span style={styles.amount}>{billingPeriod === 'monthly' ? '49' : '39'}</span>
              <span style={styles.period}>/mo</span>
            </div>
            <p style={styles.planDesc}>Ideal for growing agencies and professional developers requiring analytics.</p>
            <ul style={styles.planFeatures}>
              <li>✓ Advanced analytics dashboard</li>
              <li>✓ Unlimited leads database</li>
              <li>✓ Custom domain mapping</li>
              <li>✓ Priority support (24/7)</li>
            </ul>
            <a href="#join-form" className="btn btn-primary" style={{ width: '100%', marginTop: '1.5rem' }}>Go Pro Now</a>
          </div>

          {/* Plan 3 */}
          <div className="glass-panel glass-card" style={styles.pricingCard}>
            <h3 style={styles.planName}>Enterprise</h3>
            <div style={styles.planPrice}>
              <span style={styles.currency}>$</span>
              <span style={styles.amount}>{billingPeriod === 'monthly' ? '99' : '79'}</span>
              <span style={styles.period}>/mo</span>
            </div>
            <p style={styles.planDesc}>Designed for large organizations requiring tailored configurations.</p>
            <ul style={styles.planFeatures}>
              <li>✓ Dedicated database storage</li>
              <li>✓ White-labeling solutions</li>
              <li>✓ SLA & Uptime guarantee</li>
              <li>✓ Dedicated account manager</li>
            </ul>
            <a href="#join-form" className="btn btn-secondary" style={{ width: '100%', marginTop: '1.5rem' }}>Contact Sales</a>
          </div>
        </div>
      </section>

      {/* LEAD CAPTURE FORM SECTION */}
      <section id="join-form" style={styles.formSection}>
        <div className="glass-panel glass-card" style={styles.formContainer}>
          <h2 style={{ fontSize: '2rem', marginBottom: '0.75rem', textAlign: 'center' }}>Secure Your Interest</h2>
          <p style={{ textAlign: 'center', marginBottom: '2rem' }}>Fill out the form below. Our team will verify your application and send dashboard access information within 24 hours.</p>

          <form onSubmit={handleSubmit}>
            {status.error && (
              <div style={styles.alertError}>
                ⚠️ {status.error}
              </div>
            )}

            {status.success && (
              <div style={styles.alertSuccess}>
                ✓ Your inquiry has been successfully saved! You can check it instantly in the Admin Dashboard page.
              </div>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
              <div className="form-group">
                <label className="form-label" htmlFor="name">Full Name <span style={{ color: '#f87171' }}>*</span></label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="form-control"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="email">Email Address <span style={{ color: '#f87171' }}>*</span></label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="form-control"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
              <div className="form-group">
                <label className="form-label" htmlFor="company">Company Name</label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  className="form-control"
                  placeholder="Optional"
                  value={formData.company}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="serviceInterest">Service of Interest <span style={{ color: '#f87171' }}>*</span></label>
                <select
                  id="serviceInterest"
                  name="serviceInterest"
                  className="form-control"
                  value={formData.serviceInterest}
                  onChange={handleChange}
                  style={{ appearance: 'none', backgroundPosition: 'right 1rem center', backgroundRepeat: 'no-repeat' }}
                >
                  <option value="Development">Development</option>
                  <option value="Design">Design</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Consulting">Consulting</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="message">Message Description <span style={{ color: '#f87171' }}>*</span></label>
              <textarea
                id="message"
                name="message"
                className="form-control"
                placeholder="Tell us about your project requirements..."
                value={formData.message}
                onChange={handleChange}
                rows="4"
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              style={{ width: '100%', padding: '0.9rem', fontSize: '1.05rem', marginTop: '0.5rem' }}
              disabled={status.submitting}
            >
              {status.submitting ? 'Submitting to Database...' : 'Submit Inquiry'}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}

const styles = {
  heroSection: {
    padding: '7rem 0 4rem 0',
    textAlign: 'center',
    maxWidth: '800px',
    margin: '0 auto',
  },
  heroTitle: {
    fontSize: '3.5rem',
    marginBottom: '1.5rem',
    lineHeight: '1.15',
  },
  heroSubtitle: {
    fontSize: '1.2rem',
    marginBottom: '2.5rem',
    color: 'var(--text-muted)',
  },
  heroActions: {
    display: 'flex',
    justifyContent: 'center',
    gap: '1rem',
    flexWrap: 'wrap',
  },
  metricsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '1.5rem',
    maxWidth: '1000px',
    margin: '0 auto 5rem auto',
    padding: '0 1rem',
  },
  metricItem: {
    padding: '1.5rem',
    textAlign: 'center',
  },
  metricVal: {
    fontSize: '2.5rem',
    marginBottom: '0.25rem',
    background: 'var(--gradient-hero)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  metricLbl: {
    fontSize: '0.9rem',
    fontWeight: '500',
  },
  featuresSection: {
    padding: '3rem 0',
    maxWidth: '1100px',
    margin: '0 auto',
  },
  sectionHeader: {
    textAlign: 'center',
    marginBottom: '3.5rem',
  },
  badge: {
    display: 'inline-block',
    background: 'var(--status-new-bg)',
    color: 'var(--status-new)',
    padding: '0.35rem 0.85rem',
    borderRadius: '20px',
    fontSize: '0.75rem',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    marginBottom: '0.75rem',
  },
  sectionTitle: {
    fontSize: '2.25rem',
    marginBottom: '1rem',
  },
  sectionSubtitle: {
    maxWidth: '600px',
    margin: '0 auto',
  },
  featuresGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '2rem',
  },
  featureCard: {
    padding: '2.5rem 2rem',
  },
  featureIcon: {
    fontSize: '2rem',
    marginBottom: '1.25rem',
  },
  featureTitle: {
    fontSize: '1.25rem',
    marginBottom: '0.75rem',
  },
  pricingSection: {
    padding: '5rem 0',
    maxWidth: '1100px',
    margin: '0 auto',
  },
  billingToggleContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '1rem',
    marginTop: '1.5rem',
  },
  activeBillingText: {
    fontSize: '0.95rem',
    fontWeight: '600',
    color: 'var(--text-main)',
    transition: 'color var(--transition-fast)',
  },
  inactiveBillingText: {
    fontSize: '0.95rem',
    fontWeight: '500',
    color: 'var(--text-muted)',
    transition: 'color var(--transition-fast)',
  },
  toggleBtn: {
    width: '48px',
    height: '26px',
    borderRadius: '13px',
    background: 'rgba(255, 255, 255, 0.1)',
    border: '1px solid var(--border-color)',
    cursor: 'pointer',
    position: 'relative',
    padding: '2px',
    transition: 'background var(--transition-fast)',
  },
  toggleCircle: {
    width: '20px',
    height: '20px',
    borderRadius: '50%',
    background: 'var(--color-primary)',
    transition: 'transform var(--transition-fast)',
  },
  saveBadge: {
    background: 'rgba(20, 184, 166, 0.15)',
    color: 'var(--color-accent)',
    fontSize: '0.75rem',
    padding: '0.15rem 0.4rem',
    borderRadius: '4px',
    marginLeft: '0.25rem',
  },
  pricingGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '2rem',
    alignItems: 'stretch',
  },
  pricingCard: {
    position: 'relative',
    padding: '3rem 2rem 2.5rem 2rem',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    overflow: 'hidden',
  },
  featuredBadge: {
    position: 'absolute',
    top: '12px',
    right: '12px',
    background: 'var(--gradient-hero)',
    color: 'white',
    fontSize: '0.7rem',
    fontWeight: '700',
    padding: '0.25rem 0.6rem',
    borderRadius: '4px',
    letterSpacing: '0.05em',
  },
  planName: {
    fontSize: '1.5rem',
    marginBottom: '1rem',
  },
  planPrice: {
    display: 'flex',
    alignItems: 'baseline',
    marginBottom: '1.25rem',
  },
  currency: {
    fontSize: '1.5rem',
    fontWeight: '600',
    color: 'var(--text-muted)',
  },
  amount: {
    fontSize: '3.5rem',
    fontWeight: '800',
    color: 'white',
  },
  period: {
    fontSize: '0.95rem',
    color: 'var(--text-muted)',
  },
  planDesc: {
    fontSize: '0.9rem',
    marginBottom: '2rem',
  },
  planFeatures: {
    listStyle: 'none',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
    fontSize: '0.9rem',
    marginBottom: '2rem',
    flexGrow: 1,
  },
  formSection: {
    padding: '3rem 0',
    maxWidth: '700px',
    margin: '0 auto',
  },
  formContainer: {
    padding: '3rem',
  },
  alertError: {
    background: 'rgba(239, 68, 68, 0.15)',
    border: '1px solid rgba(239, 68, 68, 0.3)',
    color: '#f87171',
    padding: '1rem',
    borderRadius: '8px',
    marginBottom: '1.5rem',
    fontSize: '0.9rem',
  },
  alertSuccess: {
    background: 'rgba(16, 185, 129, 0.15)',
    border: '1px solid rgba(16, 185, 129, 0.3)',
    color: '#34d399',
    padding: '1rem',
    borderRadius: '8px',
    marginBottom: '1.5rem',
    fontSize: '0.9rem',
  }
};
