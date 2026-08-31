*** Begin Patch
*** Update File: src/pages/ReleasePipeline.jsx
@@
 import { loadState, saveState } from '../utils/storage'
 import '../styles/pipeline.css'
+import { useReleases } from '../context/ReleasesContext'
@@
 export default function ReleasePipeline(){
-  const [stages, setStages] = React.useState(() => loadState(STORAGE_KEY, makeDefault()))
+  const { releases, selectedId, updateRelease } = useReleases()
+  const [stages, setStages] = React.useState(() => loadState(STORAGE_KEY, makeDefault()))
@@
   React.useEffect(() => {
     saveState(STORAGE_KEY, stages)
   }, [stages])
@@
   function handleNext(){
     setStages(prev => {
@@
-      // If none in progress, activate the first pending
+      // If none in progress, activate the first pending
       if(inProgressIndex === -1){
         const firstPending = prev.findIndex(s => s.status === 'pending')
         if(firstPending === -1) return prev // all done
         const next = prev.map((s, i) => i === firstPending ? { ...s, status: 'in-progress' } : s)
         saveState(STORAGE_KEY, next)
+        // update selected release to in-progress when pipeline starts
+        try{
+          const sel = releases.find(r=> r.id === selectedId)
+          if(sel) updateRelease({ ...sel, status: 'in-progress' })
+        }catch(e){}
         return next
       }
@@
-      const next = prev.map((s, i) => {
+      const next = prev.map((s, i) => {
         if(i === inProgressIndex) return { ...s, status: 'completed' }
         if(i === nextPending) return { ...s, status: 'in-progress' }
         return s
       })
 
       saveState(STORAGE_KEY, next)
+      // if this completes the last stage, mark the selected release as released
+      try{
+        const isLastCompleted = next.every(s => s.status === 'completed')
+        const sel = releases.find(r=> r.id === selectedId)
+        if(isLastCompleted && sel){
+          updateRelease({ ...sel, status: 'released' })
+        }
+      }catch(e){}
       return next
     })
   }
*** End Patch
