import React from 'react'
import Placeholder from '../components/Placeholder'
import sampleData from '../data/sampleData'

export default function Home(){
  return (
    <div className="home-page">
      <h2>Welcome</h2>
      <p>This is a minimal scaffold for the Release Management Simulator.</p>
      <Placeholder />

      <section>
        <h3>Sample Data</h3>
        <pre>{JSON.stringify(sampleData, null, 2)}</pre>
      </section>
    </div>
  )
}
