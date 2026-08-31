export const RELEASES_KEY = 'createdReleases'

export function loadState(key, defaultValue = null){
  try{
    const raw = localStorage.getItem(key)
    if(!raw) return defaultValue
    return JSON.parse(raw)
  }catch(e){
    console.warn(`Failed to load key ${key} from localStorage:`, e)
    return defaultValue
  }
}

export function saveState(key, value){
  try{
    localStorage.setItem(key, JSON.stringify(value))
    return true
  }catch(e){
    console.warn(`Failed to save key ${key} to localStorage:`, e)
    return false
  }
}

// --- Releases API ---

export function loadReleases(){
  const data = loadState(RELEASES_KEY, [])
  if(!Array.isArray(data)){
    // corrupted or unexpected data, reset to empty
    console.warn('createdReleases in localStorage is not an array — resetting')
    saveReleases([])
    return []
  }
  // basic validation: ensure each release has an id and version
  return data.filter(r => r && (typeof r.id === 'number' || typeof r.id === 'string') && r.version)
}

export function saveReleases(releases){
  if(!Array.isArray(releases)) releases = []
  return saveState(RELEASES_KEY, releases)
}

export function addRelease(release){
  const current = loadReleases()
  const updated = [release, ...current]
  saveReleases(updated)
  return updated
}

export function updateRelease(release){
  const current = loadReleases()
  const exists = current.some(r => r.id === release.id)
  if(!exists){
    console.warn('Attempted to update release that does not exist in storage — falling back to add')
    return addRelease(release)
  }
  const updated = current.map(r => r.id === release.id ? release : r)
  saveReleases(updated)
  return updated
}

export function deleteRelease(id){
  const current = loadReleases()
  const updated = current.filter(r => r.id !== id)
  saveReleases(updated)
  return updated
}
