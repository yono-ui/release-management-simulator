import React from 'react'
import { loadState, saveState } from '../utils/storage'
import '../styles/pipeline.css'

const STAGE_NAMES = [
  'Identify Components',
  'Assign Release Identifier',
  'Prepare Configuration',
  'Prepare Data Files',
  'Prepare Documentation',
  'Prepare Installation Instructions',
  'Generate Release Notes',
  'Create Release Package',
  'Ready for Distribution'
]

const STORAGE_KEY = 'pipelineStages'

function makeDefault(){
  return STAGE_NAMES.map((name, idx) => ({ id: idx + 1, name, status: 'pending' }))
}

export default function ReleasePipeline(){
  const [stages, setStages] = React.useState(() => loadState(STORAGE_KEY, makeDefault()))

  React.useEffect(() => {
    saveState(STORAGE_KEY, stages)
  }, [stages])

  const completedCount = stages.filter(s => s.status === 'completed').length
  const inProgressCount = stages.filter(s => s.status === 'in-progress').length
  const progress = Math.round(((completedCount + inProgressCount) / stages.length) * 100)

  function handleNext(){
    setStages(prev => {
      const inProgressIndex = prev.findIndex(s => s.status === 'in-progress')

      // If none in progress, activate the first pending
      if(inProgressIndex === -1){
        const firstPending = prev.findIndex(s => s.status === 'pending')
        if(firstPending === -1) return prev // all done
        const next = prev.map((s, i) => i === firstPending ? { ...s, status: 'in-progress' } : s)
        saveState(STORAGE_KEY, next)
        return next
      }

      // If there is an in-progress: mark it completed, and activate the next pending (if any)
      const nextPending = prev.findIndex((s, i) => i > inProgressIndex && s.status === 'pending')

      const next = prev.map((s, i) => {
        if(i === inProgressIndex) return { ...s, status: 'completed' }
        if(i === nextPending) return { ...s, status: 'in-progress' }
        return s
      })

      saveState(STORAGE_KEY, next)
      return next
    })
  }

  function handleReset(){
    const def = makeDefault()
    setStages(def)
    saveState(STORAGE_KEY, def)
  }

  return (
    <section className="page pipeline-page">
      <h2>Release Pipeline</h2>
      <p className="muted">Step through the release pipeline stages. Progress persists in localStorage for the demo.</p>

      <div className="pipeline-controls">
        <div className="progress">
          <div className="progress-bar" aria-hidden>
            <div className="progress-inner" style={{ width: `${progress}%` }} />
          </div>
          <div className="progress-label">Progress: {progress}%</div>
        </div>

        <div className="controls">
          <button className="btn" onClick={handleNext}>Next Step</button>
          <button className="btn-link" onClick={handleReset}>Reset</button>
        </div>
      </div>

      <div className="pipeline">
        {stages.map((s, idx) => (
          <div className={`stage ${s.status}`} key={s.id}>
            <div className="stage-marker">
              {s.status === 'completed' ? '✓' : s.status === 'in-progress' ? '→' : '○'}
            </div>
            <div className="stage-name">{s.name}</div>
            <div className="stage-index">{idx + 1}</div>
          </div>
        ))}
      </div>

      <section className="pipeline-legend">
        <div><span className="legend-dot completed"/> Completed</div>
        <div><span className="legend-dot in-progress"/> In Progress</div>
        <div><span className="legend-dot pending"/> Pending</div>
      </section>

    </section>
  )
}
