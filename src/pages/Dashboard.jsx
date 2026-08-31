import React from 'react'
import sampleData from '../data/sampleData'
-import '../styles/dashboard.css'
+import '../styles/dashboard.css'
+import { useReleases } from '../context/ReleasesContext'
 
 function StatCard({ label, value }){
   return (
     <div className="stat-card">
       <div className="stat-value">{value}</div>
       <div className="stat-label">{label}</div>
     </div>
   )
 }
@@
 export default function Dashboard(){
-  const releases = sampleData.releases.slice().sort((a,b)=> new Date(a.date) - new Date(b.date))
-
-  const totalReleases = releases.length
-  const majorReleases = releases.filter(r=>r.type==='major').length
-  const minorReleases = releases.filter(r=>r.type==='minor').length
-  const latestRelease = releases[releases.length - 1]
-  const currentStatus = latestRelease ? latestRelease.status : '—'
+  const { releases } = useReleases()
+
+  const sorted = releases.slice().sort((a,b)=> new Date(a.date || 0) - new Date(b.date || 0))
+
+  const totalReleases = releases.length
+  const majorReleases = releases.filter(r=>r.type==='major').length
+  const minorReleases = releases.filter(r=>r.type==='minor').length
+  const latestRelease = sorted[sorted.length - 1]
+  const currentStatus = latestRelease ? latestRelease.status : '—'
@@
-  const recent = releases.slice().reverse().slice(0,5)
+  const recent = sorted.slice(-5).reverse()
*** End Patch
