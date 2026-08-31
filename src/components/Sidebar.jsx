diff --git a/src/components/Sidebar.jsx b/src/components/Sidebar.jsx
index 0b6b6c8..0000000 100644
--- a/src/components/Sidebar.jsx
+++ b/src/components/Sidebar.jsx
@@
 export default function Sidebar({ selected, onSelect }){
   return (
     <aside className="sidebar" aria-label="Main navigation">
       <div className="sidebar-brand">RMS</div>
       <nav className="sidebar-nav">
-        <NavItem label="Dashboard" active={selected==='dashboard'} onClick={()=>onSelect('dashboard')} />
-        <NavItem label="Create Release" active={selected==='create'} onClick={()=>onSelect('create')} />
-        <NavItem label="Release Pipeline" active={selected==='pipeline'} onClick={()=>onSelect('pipeline')} />
-        <NavItem label="Release History" active={selected==='history'} onClick={()=>onSelect('history')} />
+        <NavItem label="Dashboard" active={selected==='dashboard'} onClick={()=>onSelect('dashboard')} />
+        <NavItem label="Create Release" active={selected==='create'} onClick={()=>onSelect('create')} />
+        <NavItem label="Release Pipeline" active={selected==='pipeline'} onClick={()=>onSelect('pipeline')} />
+        <NavItem label="Release History" active={selected==='history'} onClick={()=>onSelect('history')} />
+        <NavItem label="Release Notes" active={selected==='notes'} onClick={()=>onSelect('notes')} />
       </nav>
       <div className="sidebar-footer">v0.1.0</div>
     </aside>
   )
 }
