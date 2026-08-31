import React from 'react'

export default function Dashboard(){
  return (
    <section className="page dashboard">
      <h2>Dashboard</h2>
      <p>Placeholder dashboard: overview charts, KPIs, and quick actions will appear here.</p>
      <div className="card-grid">
        <div className="card">Releases planned: <strong>0</strong></div>
        <div className="card">Active pipeline: <strong>None</strong></div>
        <div className="card">Last release: <strong>—</strong></div>
      </div>
    </section>
  )
}
