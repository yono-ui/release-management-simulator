export function loadState(key, defaultValue){
  try{
    const raw = localStorage.getItem(key)
    if(raw) return JSON.parse(raw)
  }catch(e){
    console.warn('Failed to load state', e)
  }
  return defaultValue
}

export function saveState(key, value){
  try{
    localStorage.setItem(key, JSON.stringify(value))
  }catch(e){
    console.warn('Failed to save state', e)
  }
}
