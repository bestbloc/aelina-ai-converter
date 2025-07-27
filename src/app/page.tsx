import React from 'react'
import CyborgConverter from '@/components/CyborgConverter'

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="container mx-auto px-4 py-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold text-gradient cyber-text">
            CYBORG CONVERTER AI
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Transform any Twitter profile picture into stunning cyborg art using cutting-edge AI technology
          </p>
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <div className="w-2 h-2 bg-cyborg-green rounded-full animate-pulse" />
            <span>Powered by Stable Diffusion & ControlNet</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 container mx-auto px-4 pb-8">
        <CyborgConverter />
      </div>

      {/* Footer */}
      <footer className="border-t border-white/10 mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-semibold text-gradient mb-4">Features</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• AI-powered transformations</li>
                <li>• Multiple cyborg styles</li>
                <li>• High-quality outputs</li>
                <li>• Easy download & share</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gradient mb-4">Styles Available</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>🤖 Futuristic</li>
                <li>💀 Terminator</li>
                <li>🌈 Cyberpunk</li>
                <li>👽 Alien Tech</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gradient mb-4">About</h3>
              <p className="text-sm text-muted-foreground">
                Cyborg Converter AI uses advanced machine learning models to create 
                stunning cyborg transformations from profile pictures.
              </p>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-white/10 text-center text-sm text-muted-foreground">
            <p>&copy; 2024 Cyborg Converter AI. Transforming the future, one profile at a time.</p>
          </div>
        </div>
      </footer>
    </main>
  )
}
