import React, { useState, useEffect, useCallback } from 'react';

export default function Dashboard({ backendUrl }) {
  const [leads, setLeads] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filters
  const [search, setSearch] = useState('');
  const [serviceFilter, setServiceFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  // Fetch all leads
  const fetchLeads = useCallback(async () => {
    try {
      const queryParams = new URLSearchParams();
      if (search) queryParams.append('search', search);
      if (serviceFilter !== 'All') queryParams.append('service', serviceFilter);
      if (statusFilter !== 'All') queryParams.append('status', statusFilter);

      const response = await fetch(`${backendUrl}?${queryParams.toString()}`);
      if (!response.ok) throw new Error('Failed to load leads list.');
      const data = await response.json();
      setLeads(data);
    } catch (err) {
      setError(err.message);
    }
  }, [backendUrl, search, serviceFilter, statusFilter]);

  // Fetch stats dashboard overview
  const fetchStats = useCallback(async () => {
    try {
      const response = await fetch(`${backendUrl}/stats`);
      if (!response.ok) throw new Error('Failed to load statistics.');
      const data = await response.json();
      setStats(data);
    } catch (err) {
      console.error(err.message);
    }
  }, [backendUrl]);

  // Combined fetch trigger
  const refreshData = useCallback(async () => {
    setLoading(true);
    setError(null);
    await Promise.all([fetchLeads(), fetchStats()]);
    setLoading(false);
  }, [fetchLeads, fetchStats]);

  // Load once on mount, and reload when filters change
  useEffect(() => {
    refreshData();
  }, [search, serviceFilter, statusFilter]);

  // Update a lead's status
  const handleStatusChange = async (id, newStatus) => {
    try {
      const response = await fetch(`${backendUrl}/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });

      if (!response.ok) throw new Error('Failed to update status.');
      
      // Update local state smoothly
      setLeads(prev => prev.map(l => l._id === id ? { ...l, status: newStatus } : l));
      // Refresh stats aggregates
      fetchStats();
    } catch (err) {
      alert(err.message);
    }
  };

  // Delete lead record
  const handleDeleteLead = async (id) => {
    if (!window.confirm('Are you sure you want to delete this lead record?')) return;

    try {
      const response = await fetch(`${backendUrl}/${id}`, {
        method: 'DELETE'
      });

      if (!response.ok) throw new Error('Failed to delete lead.');

      setLeads(prev => prev.filter(l => l._id !== id));
      fetchStats();
    } catch (err) {
      alert(err.message);
    }
  };

  // Render SVG Sparkline Trend Chart
  const renderTrendChart = () => {
    if (!stats || !stats.dailyTrend || stats.dailyTrend.length === 0) return null;

    const trend = stats.dailyTrend;
    const maxVal = Math.max(...trend.map(t => t.count), 4); // minimum ceiling of 4 for better proportions
    
    // Chart proportions
    const width = 500;
    const height = 150;
    const padding = 20;
    const chartWidth = width - padding * 2;
    const chartHeight = height - padding * 2;

    // Build SVG coordinates
    const points = trend.map((t, i) => {
      const x = padding + (i / (trend.length - 1)) * chartWidth;
      const y = padding + chartHeight - (t.count / maxVal) * chartHeight;
      return { x, y, ...t };
    });

    const linePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
    const areaPath = `${linePath} L ${points[points.length - 1].x} ${height - padding} L ${points[0].x} ${height - padding} Z`;

    return (
      <div style={styles.chartContainer}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 600 }}>Lead Generation Trend (Last 7 Days)</h3>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Peak: {Math.max(...trend.map(t => t.count))} Leads/day</span>
        </div>
        
        <svg viewBox={`0 0 ${width} ${height}`} style={{ width: '100%', height: 'auto', overflow: 'visible' }}>
          <defs>
            <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.4" />
              <stop offset="100%" stopColor="var(--color-primary)" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          {[0, 0.25, 0.5, 0.75, 1].map((val, idx) => {
            const y = padding + chartHeight * val;
            return (
              <line 
                key={idx} 
                x1={padding} 
                y1={y} 
                x2={width - padding} 
                y2={y} 
                stroke="rgba(255,255,255,0.05)" 
                strokeDasharray="4 4" 
              />
            );
          })}

          {/* Gradient Area */}
          <path d={areaPath} fill="url(#chartGradient)" />

          {/* Line Path */}
          <path 
            d={linePath} 
            fill="none" 
            stroke="var(--color-primary)" 
            strokeWidth="3" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
          />

          {/* Points */}
          {points.map((p, idx) => (
            <g key={idx} className="chart-point-group">
              <circle 
                cx={p.x} 
                cy={p.y} 
                r="5" 
                fill="#07090e" 
                stroke="var(--color-primary)" 
                strokeWidth="2.5" 
                style={{ transition: 'all 0.2s' }}
              />
              <circle 
                cx={p.x} 
                cy={p.y} 
                r="9" 
                fill="var(--color-primary)" 
                opacity="0"
                style={{ transition: 'opacity 0.2s', cursor: 'pointer' }}
                onMouseEnter={(e) => e.target.setAttribute('opacity', '0.3')}
                onMouseLeave={(e) => e.target.setAttribute('opacity', '0')}
              />
              {/* Tooltip text */}
              <text 
                x={p.x} 
                y={p.y - 12} 
                fontSize="9" 
                fill="white" 
                textAnchor="middle" 
                fontWeight="700"
                backgroundColor="#000"
              >
                {p.count > 0 ? p.count : ''}
              </text>
              {/* X Axis Label */}
              <text 
                x={p.x} 
                y={height - 2} 
                fontSize="8" 
                fill="var(--text-muted)" 
                textAnchor="middle"
              >
                {p.date.split(',')[0]}
              </text>
            </g>
          ))}
        </svg>
      </div>
    );
  };

  return (
    <div className="animate-fade-in" style={{ padding: '2rem 0 5rem 0' }}>
      {/* HEADER SECTION */}
      <div style={styles.header}>
        <div>
          <h1 style={{ fontSize: '2.25rem', marginBottom: '0.25rem' }}>Lead Console</h1>
          <p style={{ color: 'var(--text-muted)' }}>Real-time database analytics and visitor inquiries monitor.</p>
        </div>
        <button 
          onClick={refreshData} 
          className="btn btn-secondary"
          style={{ padding: '0.6rem 1.2rem', fontSize: '0.85rem' }}
          disabled={loading}
        >
          {loading ? 'Refreshing...' : '🔄 Refresh Console'}
        </button>
      </div>

      {/* STATS OVERVIEW CARDS */}
      {stats && (
        <div style={styles.statsGrid}>
          <div className="glass-panel glass-card" style={styles.statCard}>
            <span style={styles.statLabel}>Total Signups</span>
            <div style={styles.statNumber}>{stats.totalLeads}</div>
            <div style={{ ...styles.statTrend, color: 'var(--color-accent)' }}>Live Database Connect</div>
          </div>

          <div className="glass-panel glass-card" style={styles.statCard}>
            <span style={styles.statLabel}>New Inquiries</span>
            <div style={{ ...styles.statNumber, color: 'var(--status-new)' }}>{stats.byStatus.New}</div>
            <div style={styles.statTrend}>Awaiting response</div>
          </div>

          <div className="glass-panel glass-card" style={styles.statCard}>
            <span style={styles.statLabel}>Active Pipelines</span>
            <div style={{ ...styles.statNumber, color: 'var(--status-progress)' }}>
              {stats.byStatus['In Progress'] + stats.byStatus.Contacted}
            </div>
            <div style={styles.statTrend}>Follow-up status</div>
          </div>

          <div className="glass-panel glass-card" style={styles.statCard}>
            <span style={styles.statLabel}>Archived Files</span>
            <div style={{ ...styles.statNumber, color: 'var(--text-muted)' }}>{stats.byStatus.Archived}</div>
            <div style={styles.statTrend}>Resolved items</div>
          </div>
        </div>
      )}

      {/* GRAPH AND DEMAND INSIGHTS SECTION */}
      {stats && (
        <div style={styles.visualsSplit}>
          <div className="glass-panel glass-card" style={{ flex: '1 1 500px', padding: '1.5rem' }}>
            {renderTrendChart()}
          </div>

          <div className="glass-panel glass-card" style={{ flex: '1 1 300px', padding: '1.5rem' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '1.5rem' }}>Demand by Service</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {Object.entries(stats.byService).map(([srv, count]) => {
                const total = stats.totalLeads || 1;
                const pct = Math.round((count / total) * 100);
                return (
                  <div key={srv}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.4rem' }}>
                      <span style={{ fontWeight: '600' }}>{srv}</span>
                      <span style={{ color: 'var(--text-muted)' }}>{count} ({pct}%)</span>
                    </div>
                    {/* Visual bar container */}
                    <div style={styles.barOuter}>
                      <div 
                        style={{ 
                          ...styles.barInner, 
                          width: `${pct}%`,
                          background: srv === 'Development' ? 'var(--color-primary)' : 
                                      srv === 'Design' ? 'var(--color-secondary)' : 
                                      srv === 'Marketing' ? 'var(--color-accent)' : '#9ca3af'
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* FILTER CONTROLS */}
      <div className="glass-panel" style={styles.filterBar}>
        <div style={{ flexGrow: 1, minWidth: '200px' }}>
          <input
            type="text"
            className="form-control"
            placeholder="Search leads name, email, company, content..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ padding: '0.6rem 1rem' }}
          />
        </div>

        <div style={styles.filterSelects}>
          <div>
            <select
              className="form-control"
              value={serviceFilter}
              onChange={(e) => setServiceFilter(e.target.value)}
              style={{ padding: '0.6rem 2rem 0.6rem 1rem', fontSize: '0.875rem' }}
            >
              <option value="All">All Services</option>
              <option value="Development">Development</option>
              <option value="Design">Design</option>
              <option value="Marketing">Marketing</option>
              <option value="Consulting">Consulting</option>
            </select>
          </div>

          <div>
            <select
              className="form-control"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              style={{ padding: '0.6rem 2rem 0.6rem 1rem', fontSize: '0.875rem' }}
            >
              <option value="All">All Statuses</option>
              <option value="New">New</option>
              <option value="Contacted">Contacted</option>
              <option value="In Progress">In Progress</option>
              <option value="Archived">Archived</option>
            </select>
          </div>
        </div>
      </div>

      {/* LEADS DATABASE GRID TABLE */}
      <div className="glass-panel" style={{ overflowX: 'auto', padding: '1rem' }}>
        {loading ? (
          <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
            Loading dashboard data from database...
          </div>
        ) : error ? (
          <div style={{ textAlign: 'center', padding: '3rem', color: '#f87171' }}>
            ⚠️ Error loading database records: {error}
          </div>
        ) : leads.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-muted)' }}>
            <h3>No inquiries found matching criteria.</h3>
            <p style={{ marginTop: '0.5rem' }}>Submit a test form on Page 1 or expand your filters above.</p>
          </div>
        ) : (
          <table style={styles.table}>
            <thead>
              <tr style={styles.thRow}>
                <th style={styles.th}>Contact Info</th>
                <th style={styles.th}>Service Interest</th>
                <th style={styles.th}>Message Query</th>
                <th style={styles.th}>Created On</th>
                <th style={styles.th}>Status Pipeline</th>
                <th style={styles.th}>Action</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr key={lead._id} style={styles.tr}>
                  {/* Contact */}
                  <td style={styles.td}>
                    <div style={{ fontWeight: '700', fontSize: '0.95rem' }}>{lead.name}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{lead.email}</div>
                    {lead.company && (
                      <div style={styles.companyTag}>{lead.company}</div>
                    )}
                  </td>
                  
                  {/* Service Interest */}
                  <td style={styles.td}>
                    <span style={{ 
                      ...styles.serviceLabel,
                      borderColor: lead.serviceInterest === 'Development' ? 'rgba(99, 102, 241, 0.4)' : 
                                  lead.serviceInterest === 'Design' ? 'rgba(168, 85, 247, 0.4)' : 
                                  lead.serviceInterest === 'Marketing' ? 'rgba(20, 184, 166, 0.4)' : 'rgba(255,255,255,0.2)'
                    }}>
                      {lead.serviceInterest}
                    </span>
                  </td>

                  {/* Message */}
                  <td style={{ ...styles.td, maxWidth: '300px' }}>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-main)', whiteSpace: 'normal', wordBreak: 'break-word' }}>
                      {lead.message}
                    </p>
                  </td>

                  {/* Date */}
                  <td style={styles.td}>
                    <div style={{ fontSize: '0.85rem' }}>
                      {new Date(lead.createdAt).toLocaleDateString(undefined, {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      {new Date(lead.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </td>

                  {/* Status update */}
                  <td style={styles.td}>
                    <div style={{ position: 'relative', display: 'inline-block' }}>
                      <select
                        value={lead.status}
                        onChange={(e) => handleStatusChange(lead._id, e.target.value)}
                        style={{
                          ...styles.statusSelect,
                          color: lead.status === 'New' ? 'var(--status-new)' :
                                 lead.status === 'Contacted' ? 'var(--status-contacted)' :
                                 lead.status === 'In Progress' ? 'var(--status-progress)' : 'var(--text-muted)',
                          background: lead.status === 'New' ? 'var(--status-new-bg)' :
                                      lead.status === 'Contacted' ? 'var(--status-contacted-bg)' :
                                      lead.status === 'In Progress' ? 'var(--status-progress-bg)' : 'var(--status-archived-bg)'
                        }}
                      >
                        <option value="New" style={{ color: 'var(--status-new)', background: '#0f1624' }}>New</option>
                        <option value="Contacted" style={{ color: 'var(--status-contacted)', background: '#0f1624' }}>Contacted</option>
                        <option value="In Progress" style={{ color: 'var(--status-progress)', background: '#0f1624' }}>In Progress</option>
                        <option value="Archived" style={{ color: 'var(--text-muted)', background: '#0f1624' }}>Archived</option>
                      </select>
                    </div>
                  </td>

                  {/* Actions */}
                  <td style={styles.td}>
                    <button 
                      onClick={() => handleDeleteLead(lead._id)} 
                      className="btn btn-danger"
                      style={{ padding: '0.4rem 0.8rem', fontSize: '0.75rem', borderRadius: '6px' }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

const styles = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '2.5rem',
    flexWrap: 'wrap',
    gap: '1rem',
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: '1.25rem',
    marginBottom: '2.5rem',
  },
  statCard: {
    padding: '1.5rem',
    display: 'flex',
    flexDirection: 'column',
  },
  statLabel: {
    fontSize: '0.8rem',
    fontWeight: '600',
    textTransform: 'uppercase',
    color: 'var(--text-muted)',
    letterSpacing: '0.05em',
    marginBottom: '0.5rem',
  },
  statNumber: {
    fontSize: '2rem',
    fontWeight: '800',
    marginBottom: '0.25rem',
  },
  statTrend: {
    fontSize: '0.75rem',
    color: 'var(--text-muted)',
  },
  visualsSplit: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '1.5rem',
    marginBottom: '2.5rem',
  },
  chartContainer: {
    width: '100%',
  },
  barOuter: {
    width: '100%',
    height: '6px',
    background: 'rgba(255, 255, 255, 0.05)',
    borderRadius: '3px',
    overflow: 'hidden',
  },
  barInner: {
    height: '100%',
    borderRadius: '3px',
    transition: 'width 0.8s ease-out',
  },
  filterBar: {
    display: 'flex',
    padding: '1rem',
    gap: '1rem',
    marginBottom: '1.5rem',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  filterSelects: {
    display: 'flex',
    gap: '0.75rem',
    flexWrap: 'wrap',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    textAlign: 'left',
    fontSize: '0.9rem',
  },
  thRow: {
    borderBottom: '1px solid var(--border-color)',
  },
  th: {
    padding: '0.75rem 1rem',
    color: 'var(--text-muted)',
    fontWeight: '600',
    fontSize: '0.8rem',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },
  tr: {
    borderBottom: '1px solid rgba(255, 255, 255, 0.04)',
    transition: 'background-color 0.2s',
  },
  td: {
    padding: '1rem',
    verticalAlign: 'middle',
  },
  companyTag: {
    display: 'inline-block',
    background: 'rgba(255, 255, 255, 0.05)',
    color: 'white',
    padding: '0.15rem 0.4rem',
    borderRadius: '4px',
    fontSize: '0.7rem',
    marginTop: '0.25rem',
  },
  serviceLabel: {
    display: 'inline-block',
    padding: '0.25rem 0.6rem',
    borderRadius: '12px',
    fontSize: '0.75rem',
    fontWeight: '600',
    border: '1px solid',
  },
  statusSelect: {
    padding: '0.35rem 1.25rem 0.35rem 0.6rem',
    borderRadius: '8px',
    fontSize: '0.8rem',
    fontWeight: '700',
    border: 'none',
    cursor: 'pointer',
    outline: 'none',
    appearance: 'none',
    backgroundImage: `url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='rgba(255,255,255,0.6)' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`,
    backgroundPosition: 'right 0.35rem center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: '0.75rem',
    transition: 'all 0.2s',
  }
};
