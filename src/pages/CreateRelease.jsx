import React from 'react'
import { loadState, saveState } from '../utils/storage'
import '../styles/create.css'

const emptyItem = () => ({ id: Date.now() + Math.random(), text: '' })

export default function CreateRelease(){
  const [projectName, setProjectName] = React.useState('')
  const [releaseType, setReleaseType] = React.useState('')
  const [version, setVersion] = React.useState('')
  const [date, setDate] = React.useState('')

  const [features, setFeatures] = React.useState([emptyItem()])
  const [bugfixes, setBugfixes] = React.useState([emptyItem()])
  const [improvements, setImprovements] = React.useState([emptyItem()])

  const [errors, setErrors] = React.useState({})
  const [createdReleases, setCreatedReleases] = React.useState(() => loadState('createdReleases', []))
  const [successMessage, setSuccessMessage] = React.useState('')

  function updateList(setter, id, value){
    setter(prev => prev.map(it => it.id === id ? { ...it, text: value } : it))
  }

  function addItem(setter){
    setter(prev => [...prev, emptyItem()])
  }

  function removeItem(setter, id){
    setter(prev => prev.filter(it => it.id !== id))
  }

  function validate(){
    const e = {}
    if(!projectName.trim()) e.projectName = 'Project name is required.'
    if(!releaseType) e.releaseType = 'Release type is required.'
    if(!version.trim()) e.version = 'Version is required.'

    const changes = [...features, ...bugfixes, ...improvements].map(i=>i.text.trim()).filter(Boolean)
    if(changes.length === 0) e.changes = 'Please specify at least one change (feature, bug-fix, or improvement).'

    setErrors(e)
    return Object.keys(e).length === 0
  }

  function handleSubmit(e){
    e.preventDefault()
    setSuccessMessage('')
    if(!validate()) return

    const newRelease = {
      id: Date.now(),
      projectName: projectName.trim(),
      type: releaseType,
      version: version.trim(),
      date: date || null,
      status: 'planned',
      features: features.map(f=>f.text).filter(Boolean),
      bugfixes: bugfixes.map(b=>b.text).filter(Boolean),
      improvements: improvements.map(i=>i.text).filter(Boolean)
    }

    const updated = [newRelease, ...createdReleases]
    setCreatedReleases(updated)
    saveState('createdReleases', updated)

    setSuccessMessage(`Release ${newRelease.version} created.`)

    // reset form
    setProjectName('')
    setReleaseType('')
    setVersion('')
    setDate('')
    setFeatures([emptyItem()])
    setBugfixes([emptyItem()])
    setImprovements([emptyItem()])
    setErrors({})
  }

  return (
    <section className="page create-release-page">
      <h2>Create Release</h2>
      <p className="muted">Fill out the form to create a new release (client-side only).</p>

      <form className="release-form" onSubmit={handleSubmit} noValidate>
        <div className="form-row">
          <label>Project Name <span className="req">*</span></label>
          <input value={projectName} onChange={e=>setProjectName(e.target.value)} />
          {errors.projectName && <div className="error">{errors.projectName}</div>}
        </div>

        <div className="form-row">
          <label>Release Type <span className="req">*</span></label>
          <div className="radio-row">
            <label className={`radio ${releaseType==='major' ? 'checked' : ''}`}>
              <input type="radio" name="releaseType" value="major" checked={releaseType==='major'} onChange={e=>setReleaseType(e.target.value)} />
              Major Release
            </label>
            <label className={`radio ${releaseType==='minor' ? 'checked' : ''}`}>
              <input type="radio" name="releaseType" value="minor" checked={releaseType==='minor'} onChange={e=>setReleaseType(e.target.value)} />
              Minor Release
            </label>
          </div>
          {errors.releaseType && <div className="error">{errors.releaseType}</div>}
        </div>

        <div className="form-row">
          <label>Version Number <span className="req">*</span></label>
          <input value={version} onChange={e=>setVersion(e.target.value)} placeholder="e.g. v2.3" />
          {errors.version && <div className="error">{errors.version}</div>}
        </div>

        <div className="form-row">
          <label>Release Date</label>
          <input type="date" value={date} onChange={e=>setDate(e.target.value)} />
        </div>

        <fieldset className="form-group">
          <legend>New Features</legend>
          {features.map(item => (
            <div className="list-item" key={item.id}>
              <input value={item.text} onChange={e=>updateList(setFeatures, item.id, e.target.value)} placeholder="Feature description" />
              <button type="button" className="btn-link" onClick={()=>removeItem(setFeatures, item.id)} aria-label="Remove feature">Remove</button>
            </div>
          ))}
          <div className="form-actions">
            <button type="button" className="btn" onClick={()=>addItem(setFeatures)}>Add feature</button>
          </div>
        </fieldset>

        <fieldset className="form-group">
          <legend>Bug Fixes</legend>
          {bugfixes.map(item => (
            <div className="list-item" key={item.id}>
              <input value={item.text} onChange={e=>updateList(setBugfixes, item.id, e.target.value)} placeholder="Bug fix description" />
              <button type="button" className="btn-link" onClick={()=>removeItem(setBugfixes, item.id)} aria-label="Remove bugfix">Remove</button>
            </div>
          ))}
          <div className="form-actions">
            <button type="button" className="btn" onClick={()=>addItem(setBugfixes)}>Add bug fix</button>
          </div>
        </fieldset>

        <fieldset className="form-group">
          <legend>Improvements</legend>
          {improvements.map(item => (
            <div className="list-item" key={item.id}>
              <input value={item.text} onChange={e=>updateList(setImprovements, item.id, e.target.value)} placeholder="Improvement description" />
              <button type="button" className="btn-link" onClick={()=>removeItem(setImprovements, item.id)} aria-label="Remove improvement">Remove</button>
            </div>
          ))}
          <div className="form-actions">
            <button type="button" className="btn" onClick={()=>addItem(setImprovements)}>Add improvement</button>
          </div>
        </fieldset>

        {errors.changes && <div className="error">{errors.changes}</div>}

        <div className="form-actions main">
          <button type="submit" className="btn-primary">Create Release</button>
        </div>

        {successMessage && <div className="success">{successMessage}</div>}

      </form>

      {createdReleases.length > 0 && (
        <section className="created-list">
          <h3>Created releases (session)</h3>
          <ul>
            {createdReleases.map(r => (
              <li key={r.id}>{r.version} — {r.projectName} — {r.status}</li>
            ))}
          </ul>
        </section>
      )}
    </section>
  )
}
