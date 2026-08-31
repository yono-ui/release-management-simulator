*** Begin Patch
*** Update File: src/pages/CreateRelease.jsx
@@
     const updated = [newRelease, ...createdReleases]
     setCreatedReleases(updated)
     saveState('createdReleases', updated)
-
+    // notify other pages/components in-app that created releases changed
+    try{ window.dispatchEvent(new CustomEvent('createdReleasesUpdated')) }catch(e){}
     
     setSuccessMessage(`Release ${newRelease.version} created.`)
*** End Patch
