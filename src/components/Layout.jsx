import React from 'react'
import Sidebar from './components/Sidebar'
import TopNav from './components/TopNav'
import Dashboard from './pages/Dashboard'
import CreateRelease from './pages/CreateRelease'
import ReleasePipeline from './pages/ReleasePipeline'
import ReleaseHistory from './pages/ReleaseHistory'
+import ReleaseNotesPage from './pages/ReleaseNotes'

export default function Layout(){
  const [page, setPage] = React.useState('dashboard')

  function renderPage(){
    switch(page){
      case 'dashboard': return <Dashboard />
      case 'create': return <CreateRelease />
      case 'pipeline': return <ReleasePipeline />
      case 'history': return <ReleaseHistory />
+      case 'notes': return <ReleaseNotesPage />
      default: return <Dashboard />
    }
  }

  return (
    <div className="layout-root">
      <Sidebar selected={page} onSelect={setPage} />
      <div className="layout-main">
        <TopNav title="Release Management Simulator" />
        <main className="content">
          {renderPage()}
        </main>
      </div>
    </div>
  )
}
