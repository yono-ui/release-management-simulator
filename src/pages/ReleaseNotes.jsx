import React from 'react'
import sampleData from '../data/sampleData'
import { loadState } from '../utils/storage'
import ReleaseNotes from '../components/ReleaseNotes'
import '../styles/release-notes.css'

export default function ReleaseNotesPage(){
  const created = loadState('createdReleases', [])
  const all = React.useMemo(() => [...created, ...sampleData.releases].sort((a,b)=> (a.date||'').localeCompare(b.date||'')), [created])

  const [selectedId, setSelectedId] = React.useState(all.length ? all[0].id : null)

  React.useEffect(()=>{
    if(!selectedId && all.length) setSelectedId(all[0].id)
  }, [all, selectedId])

  const selected = all.find(r => r.id === selectedId)

  return (
    <section className="page release-notes-page">
      <h2>Release Notes Generator</h2>
      <p className="muted">Select a release to generate formatted release notes. Use Copy or Download to export.</p>

      <div className="rn-top">
        <label>Select release</label>
        <select value={selectedId || ''} onChange={e=>setSelectedId(Number(e.target.value))}>
          {all.map(r => (
            <option key={r.id} value={r.id}>{r.version} — {r.projectName} {r.status ? `(${r.status})` : ''}</option>
          ))}
        </select>
      </div>

      <div className="rn-container">
        <ReleaseNotes release={selected} />
      </div>
    </section>
  )
}
