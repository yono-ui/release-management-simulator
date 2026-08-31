*** Begin Patch
*** Update File: src/pages/ReleaseNotes.jsx
@@
-import sampleData from '../data/sampleData'
-import { loadState } from '../utils/storage'
+import sampleData from '../data/sampleData'
+import { useReleases } from '../context/ReleasesContext'
@@
-export default function ReleaseNotesPage(){
-  const created = loadState('createdReleases', [])
-  const all = React.useMemo(() => [...created, ...sampleData.releases].sort((a,b)=> (a.date||'').localeCompare(b.date||'')), [created])
-
-  const [selectedId, setSelectedId] = React.useState(all.length ? all[0].id : null)
-
-  React.useEffect(()=>{
-    if(!selectedId && all.length) setSelectedId(all[0].id)
-  }, [all, selectedId])
-
-  const selected = all.find(r => r.id === selectedId)
+export default function ReleaseNotesPage(){
+  const { releases } = useReleases()
+  const all = React.useMemo(() => releases.slice(), [releases])
+
+  const [selectedId, setSelectedId] = React.useState(all.length ? all[0].id : null)
+
+  React.useEffect(()=>{
+    if(!selectedId && all.length) setSelectedId(all[0].id)
+  }, [all, selectedId])
+
+  const selected = all.find(r => r.id === selectedId)
*** End Patch
