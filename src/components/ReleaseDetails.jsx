import React from 'react'
import '../styles/release-details.css'

export default function ReleaseDetails({
  release,
  onStartPreparation = () => {},
  onGenerateNotes = () => {},
  onCreatePackage = () => {},
  onMarkReleased = () => {}
}){
  if(!release) return (
    <div className="release-details empty">Select a release to see details.</div>
  )

  const { projectName, version, type, date, status, features = [], bugfixes = [], improvements = [] } = release

  const isReleased = status === 'released'
  const isInProgress = status === 'in-progress'

  return (
    <div className="release-details">
      <div className="rd-header">
        <div>
          <div className="rd-title">{projectName}</div>
          <div className="rd-subtitle">{version} • {type.charAt(0).toUpperCase() + type.slice(1)} Release</div>
        </div>
        <div className="rd-meta">
          <div className="rd-date">{date || 'TBD'}</div>
          <div className={`rd-status ${status.replace(' ', '-')}`}>{status}</div>
        </div>
      </div>

      <div className="rd-body">
        <div className="rd-grid">
          <div className="rd-section">
            <h4>New Features</h4>
            {features.length === 0 ? <p className="muted">No features listed.</p> : (
              <ul>
                {features.map((f, i) => <li key={i}>{f}</li>)}
              </ul>
            )}
          </div>

          <div className="rd-section">
            <h4>Bug Fixes</h4>
            {bugfixes.length === 0 ? <p className="muted">No bug fixes listed.</p> : (
              <ul>
                {bugfixes.map((b, i) => <li key={i}>{b}</li>)}
              </ul>
            )}
          </div>

          <div className="rd-section">
            <h4>Improvements</h4>
            {improvements.length === 0 ? <p className="muted">No improvements listed.</p> : (
              <ul>
                {improvements.map((im, i) => <li key={i}>{im}</li>)}
              </ul>
            )}
          </div>
        </div>
      </div>

      <div className="rd-actions">
        <button className="btn" onClick={()=>onStartPreparation(release)} disabled={isReleased || isInProgress}>Start Release Preparation</button>
        <button className="btn" onClick={()=>onGenerateNotes(release)}>Generate Release Notes</button>
        <button className="btn" onClick={()=>onCreatePackage(release)} disabled={isReleased}>Create Release Package</button>
        <button className="btn-primary" onClick={()=>onMarkReleased(release)} disabled={isReleased}>Mark as Released</button>
      </div>
    </div>
  )
}
