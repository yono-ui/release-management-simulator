*** Begin Patch
*** Update File: src/components/ReleaseDetails.jsx
@@
 export default function ReleaseDetails({
   release,
   onStartPreparation = () => {},
   onGenerateNotes = () => {},
   onCreatePackage = () => {},
   onMarkReleased = () => {}
 }){
+  const [showPackage, setShowPackage] = React.useState(false)
   if(!release) return (
     <div className="release-details empty">Select a release to see details.</div>
   )
@@
-  return (
-    <div className="release-details">
+  return (
+    <div className="release-details">
@@
       <div className="rd-actions">
         <button className="btn" onClick={()=>onStartPreparation(release)} disabled={isReleased || isInProgress}>Start Release Preparation</button>
         <button className="btn" onClick={()=>onGenerateNotes(release)}>Generate Release Notes</button>
-        <button className="btn" onClick={()=>{ onCreatePackage(release); setShowPackage(true) }} disabled={isReleased}>Create Release Package</button>
+        <button className="btn" onClick={()=>{ onCreatePackage(release); setShowPackage(true) }} disabled={isReleased}>Create Release Package</button>
         <button className="btn-primary" onClick={()=>onMarkReleased(release)} disabled={isReleased}>Mark as Released</button>
       </div>
+      {showPackage && (
+        <ReleasePackage release={release} onClose={()=>setShowPackage(false)} />
+      )}
     </div>
   )
 }
*** End Patch
