import React from 'react'

export default function TopNav({ title }){
  return (
    <header className="topnav">
      <div className="topnav-left">
        <button className="menu-button" aria-label="Toggle menu">☰</button>
        <h1 className="topnav-title">{title}</h1>
      </div>
      <div className="topnav-right">
        <div className="user">Academic Project</div>
      </div>
    </header>
  )
}
