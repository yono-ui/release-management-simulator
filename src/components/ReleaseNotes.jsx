import React from 'react'

export default function ReleaseNotes({ release }){
  if(!release) return <div className="rn-empty">Select a release to generate notes.</div>

  const { projectName, version, type, date, status, features = [], bugfixes = [], improvements = [] } = release

  function buildNotes(){
    const lines = []
    lines.push('RELEASE NOTES')
    lines.push('Project Name: ' + projectName)
    lines.push('Version: ' + version)
    lines.push('Release Type: ' + (type || '—'))
    lines.push('Release Date: ' + (date || 'TBD'))
    lines.push('')
    lines.push('NEW FEATURES')
    if(features.length === 0) lines.push('* None')
    else features.forEach(f => lines.push(`* ${f}`))
    lines.push('')
    lines.push('BUG FIXES')
    if(bugfixes.length === 0) lines.push('* None')
    else bugfixes.forEach(b => lines.push(`* ${b}`))
    lines.push('')
    lines.push('IMPROVEMENTS')
    if(improvements.length === 0) lines.push('* None')
    else improvements.forEach(i => lines.push(`* ${i}`))
    lines.push('')
    lines.push('RELEASE STATUS: ' + (status || '—'))

    return lines.join('\n')
  }

  const notesText = buildNotes()

  const [copied, setCopied] = React.useState(false)

  async function handleCopy(){
    try{
      await navigator.clipboard.writeText(notesText)
      setCopied(true)
      setTimeout(()=>setCopied(false), 2500)
    }catch(e){
      console.error('copy failed', e)
    }
  }

  function handleDownload(){
    const blob = new Blob([notesText], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${projectName.replace(/\s+/g,'_')}_${version}_release_notes.txt`
    document.body.appendChild(a)
    a.click()
    a.remove()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="release-notes">
      <div className="rn-header">
        <h3>Release Notes Preview</h3>
        <div className="rn-actions">
          <button className="btn" onClick={handleCopy}>{copied ? 'Copied!' : 'Copy to Clipboard'}</button>
          <button className="btn" onClick={handleDownload}>Download .txt</button>
        </div>
      </div>

      <pre className="rn-preview" aria-live="polite">{notesText}</pre>
    </div>
  )
}
