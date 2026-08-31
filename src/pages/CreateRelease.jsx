*** Begin Patch
*** Update File: src/pages/CreateRelease.jsx
@@
-import { loadState, saveState } from '../utils/storage'
+import { useReleases } from '../context/ReleasesContext'
@@
-  const [createdReleases, setCreatedReleases] = React.useState(() => loadReleases())
+  const { addRelease } = useReleases()
+  const [createdReleases, setCreatedReleases] = React.useState([])
@@
-    const updated = addRelease(newRelease)
-    setCreatedReleases(updated)
-
-    // notify other pages/components in-app that created releases changed
-    try{ window.dispatchEvent(new CustomEvent('createdReleasesUpdated')) }catch(e){}
+    const updated = addRelease(newRelease)
+    setCreatedReleases(updated)
@@
   }
*** End Patch
