import React from 'react'
import '../styles/release-package.css'

export default function ReleasePackage({ release, onClose = () => {} }){
  const defaultItems = [
    { key: 'executable', label: 'Executable Code', required: true },
    { key: 'config', label: 'Configuration Files', required: true },
    { key: 'data', label: 'Data Files', required: true },
    { key: 'install', label: 'Installation Instructions', required: true },
    { key: 'docs', label: 'Documentation', required: true },
    { key: 'notes', label: 'Release Notes', required: true }
  ]

  const [items, setItems] = React.useState(() => defaultItems.map(it => ({ ...it, checked: false })))
  const [created, setCreated] = React.useState(false)

  const requiredCount = items.filter(it => it.required).length
  const checkedCount = items.filter(it => it.required && it.checked).length
  const completion = Math.round((checkedCount / requiredCount) * 100)
  const ready = completion === 100

  function toggle(key){
    setItems(prev => prev.map(it => it.key === key ? { ...it, checked: !it.checked } : it))
  }

  function handleCreate(){
    if(!ready) return
    // Simulation only
    setCreated(true)
    setTimeout(()=>{
      // keep message visible; user can close
    }, 400)
  }

  function handleClose(){
    onClose()
  }

  return (
    <div className="rp-overlay" role="dialog" aria-modal="true">
      <div className="rp-modal">
        <div className="rp-header">
          <div>
            <div className="rp-title">Create Release Package</div>
            <div className="rp-sub">{release ? `${release.projectName} — ${release.version}` : 'No release selected'}</div>
          </div>
          <button className="rp-close" onClick={handleClose} aria-label="Close">✕</button>
        </div>

        <div className="rp-body">
          <ul className="rp-checklist">
            {items.map(it => (
              <li key={it.key} className={`rp-item ${it.checked ? 'checked' : ''}`}>
                <label>
                  <input type="checkbox" checked={it.checked} onChange={()=>toggle(it.key)} />
                  <span className="rp-item-label">{it.label}</span>
                </label>
              </li>
            ))}
          </ul>

          <div className="rp-summary">
            <div>Package Completion: <strong>{completion}%</strong></div>
            {ready ? <div className="rp-ready">Release Package Ready for Distribution</div> : <div className="rp-not-ready">Complete all required items to enable packaging.</div>}
          </div>

        </div>

        <div className="rp-actions">
          <button className="btn" onClick={handleCreate} disabled={!ready || created}>{created ? 'Package Created (simulation)' : 'Create Package'}</button>
          <button className="btn-link" onClick={handleClose}>Close</button>
        </div>

      </div>
    </div>
  )
}
