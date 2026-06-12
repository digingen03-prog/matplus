import React, { useState, useEffect, useCallback } from 'react';
import { FiRefreshCw, FiPhone, FiAlertTriangle } from 'react-icons/fi';

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

  // Load on filter change
  useEffect(() => {
    refreshData();
  }, [search, serviceFilter, statusFilter]);

  // Update lead status
  const handleStatusChange = async (id, newStatus) => {
    try {
      const response = await fetch(`${backendUrl}/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });

      if (!response.ok) throw new Error('Failed to update status.');
      
      // Update local state
      setLeads(prev => prev.map(l => l._id === id ? { ...l, status: newStatus } : l));
      // Refresh stats
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

  // SVG Trend Line Chart
  const renderTrendChart = () => {
    if (!stats || !stats.dailyTrend || stats.dailyTrend.length === 0) return null;

    const trend = stats.dailyTrend;
    const maxVal = Math.max(...trend.map(t => t.count), 4);
    
    const width = 500;
    const height = 150;
    const padding = 20;
    const chartWidth = width - padding * 2;
    const chartHeight = height - padding * 2;

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
          <h3 style={{ fontSize: '1.05rem', fontWeight: 600, color: 'var(--color-secondary)' }}>Lead Signups Trend</h3>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Peak: {Math.max(...trend.map(t => t.count))} Leads/day</span>
        </div>
        
        <svg viewBox={`0 0 ${width} ${height}`} style={{ width: '100%', height: 'auto', overflow: 'visible' }}>
          <defs>
            <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.2" />
              <stop offset="100%" stopColor="var(--color-primary)" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {[0, 0.25, 0.5, 0.75, 1].map((val, idx) => {
            const y = padding + chartHeight * val;
            return (
              <line 
                key={idx} 
                x1={padding} 
                y1={y} 
                x2={width - padding} 
                y2={y} 
                stroke="#e2e8f0" 
                strokeDasharray="4 4" 
              />
            );
          })}

          <path d={areaPath} fill="url(#chartGradient)" />

          <path 
            d={linePath} 
            fill="none" 
            stroke="var(--color-primary)" 
            strokeWidth="2.5" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
          />

          {points.map((p, idx) => (
            <g key={idx}>
              <circle 
                cx={p.x} 
                cy={p.y} 
                r="4" 
                fill="#ffffff" 
                stroke="var(--color-primary)" 
                strokeWidth="2" 
              />
              <text 
                x={p.x} 
                y={p.y - 10} 
                fontSize="8" 
                fill="var(--color-secondary)" 
                textAnchor="middle" 
                fontWeight="700"
              >
                {p.count > 0 ? p.count : ''}
              </text>
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
      
      {/* HEADER */}
      <div style={styles.header}>
        <div>
          <h1 style={{ fontSize: '2.25rem', marginBottom: '0.25rem' }}>Lead Console</h1>
          <p style={{ color: 'var(--text-muted)' }}>Real-time database analytics and callback request monitor.</p>
        </div>
        <button 
          onClick={refreshData} 
          className="btn btn-secondary"
          style={{ padding: '0.55rem 1.1rem', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '6px' }}
          disabled={loading}
        >
          <FiRefreshCw style={{ animation: loading ? 'spin 1.5s linear infinite' : 'none' }} /> {loading ? 'Refreshing...' : 'Refresh Data'}
        </button>
      </div>

      {/* STATS OVERVIEW CARDS */}
      {stats && (
        <div style={styles.statsGrid}>
          <div className="glass-panel glass-card" style={styles.statCard}>
            <span style={styles.statLabel}>Total Requests</span>
            <div style={styles.statNumber}>{stats.totalLeads}</div>
            <div style={{ ...styles.statTrend, color: 'var(--color-primary)' }}>Live Database Connect</div>
          </div>

          <div className="glass-panel glass-card" style={styles.statCard}>
            <span style={styles.statLabel}>New Queries</span>
            <div style={{ ...styles.statNumber, color: 'var(--status-new)' }}>{stats.byStatus.New}</div>
            <div style={styles.statTrend}>Awaiting response</div>
          </div>

          <div className="glass-panel glass-card" style={styles.statCard}>
            <span style={styles.statLabel}>Active Pipelines</span>
            <div style={{ ...styles.statNumber, color: 'var(--status-progress)' }}>
              {stats.byStatus['In Progress'] + stats.byStatus.Contacted}
            </div>
            <div style={styles.statTrend}>In progress / contacted</div>
          </div>

          <div className="glass-panel glass-card" style={styles.statCard}>
            <span style={styles.statLabel}>Resolved Queries</span>
            <div style={{ ...styles.statNumber, color: 'var(--text-muted)' }}>{stats.byStatus.Archived}</div>
            <div style={styles.statTrend}>Archived records</div>
          </div>
        </div>
      )}

      {/* GRAPH & CATEGORIES split */}
      {stats && (
        <div style={styles.visualsSplit}>
          <div className="glass-panel glass-card" style={{ flex: '1 1 500px', padding: '1.5rem' }}>
            {renderTrendChart()}
          </div>

          <div className="glass-panel glass-card" style={{ flex: '1 1 300px', padding: '1.5rem' }}>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 600, color: 'var(--color-secondary)', marginBottom: '1.5rem' }}>Demand by Service</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {Object.entries(stats.byService).map(([srv, count]) => {
                const total = stats.totalLeads || 1;
                const pct = Math.round((count / total) * 100);
                return (
                  <div key={srv}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.825rem', marginBottom: '0.35rem' }}>
                      <span style={{ fontWeight: '600' }}>{srv}</span>
                      <span style={{ color: 'var(--text-muted)' }}>{count} ({pct}%)</span>
                    </div>
                    <div className="bar-outer">
                      <div 
                        className="bar-inner"
                        style={{ 
                          width: `${pct}%`,
                          background: srv === 'Accounting' ? 'var(--color-primary)' : 
                                      srv === 'Tax Planning' ? '#3b82f6' : 
                                      srv === 'Bookkeeping' ? '#10b981' : 
                                      srv === 'Business Growth' ? '#f59e0b' : '#94a3b8'
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

      {/* FILTERS */}
      <div className="dashboard-filter-bar">
        <div style={{ flexGrow: 1, minWidth: '200px' }}>
          <input
            type="text"
            className="form-control"
            placeholder="Search request name, phone, company..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ padding: '0.55rem 0.85rem' }}
          />
        </div>

        <div style={styles.filterSelects}>
          <div>
            <select
              className="form-control"
              value={serviceFilter}
              onChange={(e) => setServiceFilter(e.target.value)}
              style={{ padding: '0.55rem 2rem 0.55rem 0.85rem', fontSize: '0.85rem' }}
            >
              <option value="All">All Services</option>
              <option value="Accounting">Accounting & Compliance</option>
              <option value="Tax Planning">Strategic Tax Planning</option>
              <option value="Bookkeeping">Direct Bookkeeping</option>
              <option value="Business Growth">Business Growth advisory</option>
              <option value="Consulting">General Consulting</option>
            </select>
          </div>

          <div>
            <select
              className="form-control"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              style={{ padding: '0.55rem 2rem 0.55rem 0.85rem', fontSize: '0.85rem' }}
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

      {/* TABLE */}
      <div className="dashboard-table-card" style={{ overflowX: 'auto' }}>
        {loading ? (
          <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
            Loading dashboard data from database...
          </div>
        ) : error ? (
          <div style={{ textAlign: 'center', padding: '3rem', color: '#dc2626', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
            <FiAlertTriangle /> Error loading database records: {error}
          </div>
        ) : leads.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-muted)' }}>
            <h3>No callback requests found matching criteria.</h3>
            <p style={{ marginTop: '0.5rem' }}>Submit a test form on the landing page or adjust your search query.</p>
          </div>
        ) : (
          <table className="dashboard-table">
            <thead>
              <tr>
                <th className="dashboard-th">Contact Info</th>
                <th className="dashboard-th">Service Interest</th>
                <th className="dashboard-th">Message Query</th>
                <th className="dashboard-th">Created On</th>
                <th className="dashboard-th">Status</th>
                <th className="dashboard-th">Action</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr key={lead._id} className="dashboard-tr">
                  {/* Contact Info */}
                  <td className="dashboard-td">
                    <div style={{ fontWeight: '700', fontSize: '0.95rem', color: 'var(--color-secondary)' }}>{lead.name}</div>
                    <div style={{ fontSize: '0.825rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <FiPhone style={{ fontSize: '0.75rem' }} /> {lead.phone}
                    </div>
                    {lead.company && (
                      <div style={styles.companyTag}>{lead.company}</div>
                    )}
                  </td>
                  
                  {/* Service Interest */}
                  <td className="dashboard-td">
                    <span style={{ 
                      ...styles.serviceLabel,
                      borderColor: lead.serviceInterest === 'Accounting' ? 'rgba(200, 16, 46, 0.4)' : 
                                  lead.serviceInterest === 'Tax Planning' ? 'rgba(59, 130, 246, 0.4)' : 
                                  lead.serviceInterest === 'Bookkeeping' ? 'rgba(16, 185, 129, 0.4)' : 'rgba(0,0,0,0.15)',
                      color: lead.serviceInterest === 'Accounting' ? 'var(--color-primary)' :
                             lead.serviceInterest === 'Tax Planning' ? '#2563eb' :
                             lead.serviceInterest === 'Bookkeeping' ? '#059669' : 'var(--color-secondary)'
                    }}>
                      {lead.serviceInterest}
                    </span>
                  </td>

                  {/* Message */}
                  <td className="dashboard-td" style={{ maxWidth: '300px' }}>
                    <p style={{ fontSize: '0.85rem', color: 'var(--color-secondary)', whiteSpace: 'normal', wordBreak: 'break-word' }}>
                      {lead.message}
                    </p>
                  </td>

                  {/* Date */}
                  <td className="dashboard-td">
                    <div style={{ fontSize: '0.825rem', color: 'var(--color-secondary)' }}>
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

                  {/* Status Dropdown */}
                  <td className="dashboard-td">
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
                      <option value="New">New</option>
                      <option value="Contacted">Contacted</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Archived">Archived</option>
                    </select>
                  </td>

                  {/* Action delete */}
                  <td className="dashboard-td">
                    <button 
                      onClick={() => handleDeleteLead(lead._id)} 
                      className="btn btn-danger"
                      style={{ padding: '0.35rem 0.75rem', fontSize: '0.75rem', borderRadius: '4px' }}
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
    marginBottom: '2rem',
    flexWrap: 'wrap',
    gap: '1rem',
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: '1.25rem',
    marginBottom: '2rem',
  },
  statCard: {
    padding: '1.25rem 1.5rem',
    display: 'flex',
    flexDirection: 'column',
    background: '#ffffff',
    border: '1px solid var(--border-color)',
    borderRadius: '8px',
    boxShadow: 'var(--shadow-sm)'
  },
  statLabel: {
    fontSize: '0.75rem',
    fontWeight: '700',
    textTransform: 'uppercase',
    color: 'var(--text-muted)',
    letterSpacing: '0.05em',
    marginBottom: '0.4rem',
  },
  statNumber: {
    fontSize: '1.85rem',
    fontWeight: '800',
    marginBottom: '0.2rem',
    color: 'var(--color-secondary)'
  },
  statTrend: {
    fontSize: '0.75rem',
    color: 'var(--text-muted)',
  },
  visualsSplit: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '1.5rem',
    marginBottom: '2rem',
  },
  chartContainer: {
    width: '100%',
  },
  filterSelects: {
    display: 'flex',
    gap: '0.75rem',
    flexWrap: 'wrap',
  },
  companyTag: {
    display: 'inline-block',
    background: '#f1f5f9',
    color: 'var(--color-secondary)',
    border: '1px solid #e2e8f0',
    padding: '0.15rem 0.4rem',
    borderRadius: '4px',
    fontSize: '0.7rem',
    marginTop: '0.25rem',
    fontWeight: '600'
  },
  serviceLabel: {
    display: 'inline-block',
    padding: '0.25rem 0.5rem',
    borderRadius: '4px',
    fontSize: '0.75rem',
    fontWeight: '600',
    border: '1px solid',
  },
  statusSelect: {
    padding: '0.3rem 1.1rem 0.3rem 0.5rem',
    borderRadius: '4px',
    fontSize: '0.8rem',
    fontWeight: '700',
    border: '1px solid rgba(0,0,0,0.08)',
    cursor: 'pointer',
    outline: 'none',
    appearance: 'none',
    backgroundImage: `url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`,
    backgroundPosition: 'right 0.25rem center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: '0.65rem',
    transition: 'all 0.2s',
  }
};
