*** Begin Patch
*** Update File: src/components/ReleaseDetails.jsx
@@
-import '../styles/release-details.css'
-import ReleasePackage from './ReleasePackage'
+import '../styles/release-details.css'
+import ReleasePackage from './ReleasePackage'
+import { useReleases } from '../context/ReleasesContext'
@@
 export default function ReleaseDetails({
   release,
   onStartPreparation = () => {},
   onGenerateNotes = () => {},
   onCreatePackage = () => {},
   onMarkReleased = () => {}
 }){
+  const { updateRelease } = useReleases()
   const [showPackage, setShowPackage] = React.useState(false)
   if(!release) return (
     <div className="release-details empty">Select a release to see details.</div>
   )
@@
   return (
     <div className="release-details">
@@
-        <button className="btn" onClick={()=>onStartPreparation(release)} disabled={isReleased || isInProgress}>Start Release Preparation</button>
-        <button className="btn" onClick={()=>onGenerateNotes(release)}>Generate Release Notes</button>
-        <button className="btn" onClick={()=>{ onCreatePackage(release); setShowPackage(true) }} disabled={isReleased}>Create Release Package</button>
-        <button className="btn-primary" onClick={()=>onMarkReleased(release)} disabled={isReleased}>Mark as Released</button>
+        <button className="btn" onClick={()=>{ updateRelease({ ...release, status: 'in-progress' }); onStartPreparation(release) }} disabled={isReleased || isInProgress}>Start Release Preparation</button>
+        <button className="btn" onClick={()=>onGenerateNotes(release)}>Generate Release Notes</button>
+        <button className="btn" onClick={()=>{ onCreatePackage(release); setShowPackage(true) }} disabled={isReleased}>Create Release Package</button>
+        <button className="btn-primary" onClick={()=>{ updateRelease({ ...release, status: 'released' }); onMarkReleased(release) }} disabled={isReleased}>Mark as Released</button>
       </div>
       {showPackage && (
         <ReleasePackage release={release} onClose={()=>setShowPackage(false)} />
       )}
     </div>
   )
 }
*** End Patch
