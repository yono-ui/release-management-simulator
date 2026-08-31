import React from 'react'
import sampleData from '../data/sampleData'
import { loadReleases, addRelease as storageAdd, updateRelease as storageUpdate, deleteRelease as storageDelete, saveReleases } from '../utils/storage'

const ReleasesContext = React.createContext(null)

export function ReleasesProvider({ children }){
  const [created, setCreated] = React.useState(() => loadReleases())
  const [releases, setReleases] = React.useState(() => merge(loadReleases()))
  const [selectedId, setSelectedId] = React.useState(null)

  React.useEffect(() => {
    setReleases(merge(created))
  }, [created])

  function merge(createdList){
    const combined = [...createdList, ...sampleData.releases]
    return combined.slice().sort((a,b)=> (b.date || '').localeCompare(a.date || ''))
  }

  function addRelease(release){
    const updated = storageAdd(release)
    setCreated(updated)
    return updated
  }

  function updateRelease(release){
    const updated = storageUpdate(release)
    setCreated(updated)
    return updated
  }

  function deleteRelease(id){
    const updated = storageDelete(id)
    setCreated(updated)
    return updated
  }

  function loadAll(){
    const c = loadReleases()
    setCreated(c)
    setReleases(merge(c))
    return c
  }

  function setAllTo(releasesArray){
    // replace created releases storage with provided array
    saveReleases(releasesArray)
    loadAll()
  }

  const value = {
    created,
    releases,
    selectedId,
    setSelectedId,
    addRelease,
    updateRelease,
    deleteRelease,
    loadAll,
    setAllTo
  }

  return (
    <ReleasesContext.Provider value={value}>{children}</ReleasesContext.Provider>
  )
}

export function useReleases(){
  const ctx = React.useContext(ReleasesContext)
  if(!ctx) throw new Error('useReleases must be used within ReleasesProvider')
  return ctx
}
