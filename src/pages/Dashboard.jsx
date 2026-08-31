import React from 'react'
import sampleData from '../data/sampleData'
import '../styles/dashboard.css'

function StatCard({ label, value }){
  return (
    <div className="stat-card">
      <div className="stat-value">{value}</div>
      <div className="stat-label">{label}</div>
    </div>
  )
}

function Timeline({ items }){
  return (
    <div className="timeline">
      {items.map((it, idx) => (
        <div key={it.version} className={`timeline-item ${it.status === 'in-progress' ? 'active' : ''}`}>
          <div className="timeline-dot" />
          <div className="timeline-label">{it.version}</div>
          {idx < items.length - 1 && <div className="timeline-arrow">→</div>}
        </div>
      ))}
    </div>
  )
}

export default function Dashboard(){
  const releases = sampleData.releases.slice().sort((a,b)=> new Date(a.date) - new Date(b.date))

  const totalReleases = releases.length
  const majorReleases = releases.filter(r=>r.type==='major').length
  const minorReleases = releases.filter(r=>r.type==='minor').length
  const latestRelease = releases[releases.length - 1]
  const currentStatus = latestRelease ? latestRelease.status : '—'

  // Timeline: pick the five versions requested if present; otherwise use last five
  const timelineOrder = ['v1.0','v1.1','v1.2','v2.0','v2.1']
  const timelineItems = timelineOrder.map(v => releases.find(r => r.version === v)).filter(Boolean)
  // If timelineItems empty or partial, fallback to last 5
  const timeline = timelineItems.length >= 3 ? timelineItems : releases.slice(-5)

  const recent = releases.slice().reverse().slice(0,5)

  return (
    <section className="page dashboard">
      <h2>Dashboard</h2>
      <p className="muted">Overview metrics and recent activity — suitable for presentations.</p>

      <div className="stats-grid">
        <StatCard label="Total Releases" value={totalReleases} />
        <StatCard label="Major Releases" value={majorReleases} />
        <StatCard label="Minor Releases" value={minorReleases} />
        <StatCard label="Latest Version" value={latestRelease ? latestRelease.version : '—'} />
        <StatCard label="Current Release Status" value={currentStatus} />
      </div>

      <section className="section">
        <h3>Release Timeline</h3>
        <Timeline items={timeline} />
      </section>

      <section className="section">
        <h3>Recent Releases</h3>
        <table className="releases-table">
          <thead>
            <tr>
              <th>Version</th>
              <th>Type</th>
              <th>Release date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {recent.map(r => (
              <tr key={r.id}>
                <td>{r.version}</td>
                <td>{r.type}</td>
                <td>{r.date}</td>
                <td className={`status ${r.status.replace(' ', '-')}`}>{r.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </section>
  )
}
