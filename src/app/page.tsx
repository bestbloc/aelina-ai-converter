import React from 'react'

export default function HomePage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="text-center space-y-8">
        <h1 className="text-4xl md:text-6xl font-bold text-gradient cyber-text">
          AELINA CYBORG CONVERTER AI
        </h1>
        
        <p className="text-lg text-white/80 max-w-2xl mx-auto">
          Transform any Twitter profile picture into stunning cyborg art using cutting-edge AI technology
        </p>
        
        <div className="max-w-md mx-auto">
          <input 
            type="text" 
            placeholder="Enter Twitter handle (@username)"
            className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50"
          />
          <button className="w-full mt-4 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg hover:scale-105 transition-transform">
            Transform to Cyborg
          </button>
        </div>
        
        <div className="text-sm text-white/60">
          🤖 Powered by Aelina AI • ⚡ Instant Transformations
        </div>
      </div>
    </main>
  )
}
