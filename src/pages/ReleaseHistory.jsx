import React from 'react'
import { useReleases } from '../context/ReleasesContext'
import ReleaseDetails from '../components/ReleaseDetails'
import sampleData from '../data/sampleData'
import '../styles/history.css'

export default function ReleaseHistory(){
  const { releases, deleteRelease, updateRelease, setSelectedId } = useReleases()

  const [query, setQuery] = React.useState('')
  const [typeFilter, setTypeFilter] = React.useState('all')
  const [statusFilter, setStatusFilter] = React.useState('all')

  const [viewRelease, setViewRelease] = React.useState(null)
  const [editRelease, setEditRelease] = React.useState(null)

  function filtered(){
    return releases.filter(r => {
      if(query && !r.version.toLowerCase().includes(query.toLowerCase())) return false
      if(typeFilter !== 'all' && r.type !== typeFilter) return false
      if(statusFilter !== 'all' && r.status !== statusFilter) return false
      return true
    })
  }

  function handleDelete(release){
    // only deletable if present in created releases (id likely numeric and newer than sample data)
    if(!confirm(`Delete release ${release.version}? This cannot be undone.`)) return
    deleteRelease(release.id)
  }

  function handleEditSave(updatedRelease){
    updateRelease(updatedRelease)
    setEditRelease(null)
  }

  function handleView(release){
    setSelectedId(release.id)
    setViewRelease(release)
  }

  return (
    <section className="page history-page">
      <h2>Release History</h2>
      <p className="muted">All releases (sample and created). Use search and filters to find entries. Created releases are editable.</p>

      <div className="history-controls">
        <input placeholder="Search by version" value={query} onChange={e=>setQuery(e.target.value)} />
        <select value={typeFilter} onChange={e=>setTypeFilter(e.target.value)}>
          <option value="all">All types</option>
          <option value="major">Major</option>
          <option value="minor">Minor</option>
        </select>
        <select value={statusFilter} onChange={e=>setStatusFilter(e.target.value)}>
          <option value="all">All status</option>
          <option value="planned">Planned</option>
          <option value="in-progress">In Progress</option>
          <option value="released">Released</option>
        </select>
      </div>

      <div className="history-table-wrap">
        <table className="history-table">
          <thead>
            <tr>
              <th>Version</th>
              <th>Release Type</th>
              <th>Release Date</th>
              <th>Status</th>
              <th>Number of Changes</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered().map(r => {
              const changes = (r.features || []).length + (r.bugfixes || []).length + (r.improvements || []).length
              return (
                <tr key={r.id}>
                  <td>{r.version}</td>
                  <td>{r.type}</td>
                  <td>{r.date || 'TBD'}</td>
                  <td className={`status ${r.status ? r.status.replace(' ', '-') : ''}`}>{r.status || '—'}</td>
                  <td>{changes}</td>
                  <td className="actions">
                    <button className="btn-link" onClick={()=>handleView(r)}>View</button>
                    <button className="btn-link" onClick={()=>setEditRelease(r)}>Edit</button>
                    <button className="btn-link text-danger" onClick={()=>handleDelete(r)}>Delete</button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* View modal */}
      {viewRelease && (
        <div className="modal-overlay">
          <div className="modal">
            <button className="modal-close" onClick={()=>setViewRelease(null)}>✕</button>
            <ReleaseDetails release={viewRelease} />
          </div>
        </div>
      )}

      {/* Edit modal */}
      {editRelease && (
        <EditModal release={editRelease} onCancel={()=>setEditRelease(null)} onSave={handleEditSave} />
      )}

    </section>
  )
}

function EditModal({ release, onCancel, onSave }){
  const [projectName, setProjectName] = React.useState(release.projectName || '')
  const [type, setType] = React.useState(release.type || 'minor')
  const [version, setVersion] = React.useState(release.version || '')
  const [date, setDate] = React.useState(release.date || '')
  const [features, setFeatures] = React.useState((release.features || []).slice())
  const [bugfixes, setBugfixes] = React.useState((release.bugfixes || []).slice())
  const [improvements, setImprovements] = React.useState((release.improvements || []).slice())

  function save(){
    const updated = {
      ...release,
      projectName: projectName.trim(),
      type,
      version: version.trim(),
      date: date || null,
      features: features.filter(Boolean),
      bugfixes: bugfixes.filter(Boolean),
      improvements: improvements.filter(Boolean)
    }
    onSave(updated)
  }

  function updateList(setter, idx, value){
    setter(prev => prev.map((it,i)=> i===idx ? value : it))
  }
  function addItem(setter){ setter(prev=>[...prev,'']) }
  function removeItem(setter, idx){ setter(prev=>prev.filter((_,i)=>i!==idx)) }

  return (
    <div className="modal-overlay">
      <div className="modal large">
        <button className="modal-close" onClick={onCancel}>✕</button>
        <h3>Edit Release</h3>
        <div className="edit-form">
          <label>Project Name</label>
          <input value={projectName} onChange={e=>setProjectName(e.target.value)} />

          <label>Release Type</label>
          <select value={type} onChange={e=>setType(e.target.value)}>
            <option value="major">Major</option>
            <option value="minor">Minor</option>
          </select>

          <label>Version</label>
          <input value={version} onChange={e=>setVersion(e.target.value)} />

          <label>Release Date</label>
          <input type="date" value={date||''} onChange={e=>setDate(e.target.value)} />

          <label>Features</label>
          {features.map((f,i)=> (
            <div key={i} className="edit-list-item">
              <input value={f} onChange={e=>updateList(setFeatures,i,e.target.value)} />
              <button className="btn-link" onClick={()=>removeItem(setFeatures,i)}>Remove</button>
            </div>
          ))}
          <button className="btn" onClick={()=>addItem(setFeatures)}>Add feature</button>

          <label>Bug Fixes</label>
          {bugfixes.map((b,i)=> (
            <div key={i} className="edit-list-item">
              <input value={b} onChange={e=>updateList(setBugfixes,i,e.target.value)} />
              <button className="btn-link" onClick={()=>removeItem(setBugfixes,i)}>Remove</button>
            </div>
          ))}
          <button className="btn" onClick={()=>addItem(setBugfixes)}>Add bug fix</button>

          <label>Improvements</label>
          {improvements.map((im,i)=> (
            <div key={i} className="edit-list-item">
              <input value={im} onChange={e=>updateList(setImprovements,i,e.target.value)} />
              <button className="btn-link" onClick={()=>removeItem(setImprovements,i)}>Remove</button>
            </div>
          ))}
          <button className="btn" onClick={()=>addItem(setImprovements)}>Add improvement</button>

          <div className="modal-actions">
            <button className="btn-primary" onClick={save}>Save</button>
            <button className="btn-link" onClick={onCancel}>Cancel</button>
          </div>
        </div>
      </div>
    </div>
  )
}
