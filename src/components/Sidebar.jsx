import React from 'react'

function NavItem({ label, active, onClick }){
  return (
    <button
      className={`nav-item ${active ? 'active' : ''}`}
      onClick={onClick}
    >
      <span className="nav-label">{label}</span>
    </button>
  )
}

export default function Sidebar({ selected, onSelect }){
  return (
    <aside className="sidebar" aria-label="Main navigation">
      <div className="sidebar-brand">RMS</div>
      <nav className="sidebar-nav">
        <NavItem label="Dashboard" active={selected==='dashboard'} onClick={()=>onSelect('dashboard')} />
        <NavItem label="Create Release" active={selected==='create'} onClick={()=>onSelect('create')} />
        <NavItem label="Release Pipeline" active={selected==='pipeline'} onClick={()=>onSelect('pipeline')} />
        <NavItem label="Release History" active={selected==='history'} onClick={()=>onSelect('history')} />
      </nav>
      <div className="sidebar-footer">v0.1.0</div>
    </aside>
  )
}
