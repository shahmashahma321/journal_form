"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Heart, Star, Sparkles, PenTool, Smile, Coffee, Music, Camera, Palette, BookOpen } from 'lucide-react'

export default function JournalForms() {
  const [stickyNote, setStickyNote] = useState({ x: 50, y: 50 })
  const [isDragging, setIsDragging] = useState(false)
  const [sparkles, setSparkles] = useState<Array<{ id: number; x: number; y: number }>>([])
  const [mascotBounce, setMascotBounce] = useState(false)

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setStickyNote({
        x: e.clientX - 50,
        y: e.clientY - 50
      })
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const createSparkles = () => {
    const newSparkles = Array.from({ length: 5 }, (_, i) => ({
      id: Date.now() + i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight
    }))
    setSparkles(newSparkles)
    setTimeout(() => setSparkles([]), 2000)
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setMascotBounce(true)
      setTimeout(() => setMascotBounce(false), 600)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div 
      className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 relative overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      style={{
        backgroundImage: `
          radial-gradient(circle at 20% 20%, rgba(255, 182, 193, 0.1) 0%, transparent 50%),
          radial-gradient(circle at 80% 80%, rgba(173, 216, 230, 0.1) 0%, transparent 50%),
          radial-gradient(circle at 40% 60%, rgba(221, 160, 221, 0.1) 0%, transparent 50%)
        `
      }}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-2 h-2 bg-pink-300 rounded-full"></div>
        <div className="absolute top-20 right-20 w-1 h-1 bg-purple-300 rounded-full"></div>
        <div className="absolute bottom-20 left-20 w-3 h-3 bg-blue-300 rounded-full"></div>
        <div className="absolute bottom-10 right-10 w-2 h-2 bg-yellow-300 rounded-full"></div>
        {/* Dotted pattern */}
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.1) 1px, transparent 1px)',
          backgroundSize: '20px 20px'
        }}></div>
      </div>

      {/* Sparkles Animation */}
      {sparkles.map((sparkle) => (
        <div
          key={sparkle.id}
          className="absolute animate-ping"
          style={{ left: sparkle.x, top: sparkle.y }}
        >
          <Sparkles className="w-4 h-4 text-yellow-400" />
        </div>
      ))}

      {/* Header with Animated Mascot */}
      <header className="relative z-10 p-6 text-center">
        <div className="flex items-center justify-center gap-4 mb-4">
          <div className={`transition-transform duration-300 ${mascotBounce ? 'animate-bounce' : ''}`}>
            <PenTool className="w-8 h-8 text-purple-500 transform rotate-12" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
            Journal Forms
          </h1>
          <div className={`transition-transform duration-300 ${mascotBounce ? 'animate-bounce' : ''}`}>
            <Smile className="w-8 h-8 text-pink-500" />
          </div>
        </div>
        <p className="text-gray-600 font-medium">Your cozy digital stationery space ✨</p>
      </header>

      {/* Main Content Grid */}
      <main className="container mx-auto px-6 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-auto">
          
          {/* Daily Thoughts Card */}
          <Card className="p-6 bg-gradient-to-br from-pink-100 to-pink-50 border-pink-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:-rotate-1 transform">
            <div className="flex items-center gap-2 mb-4">
              <Heart className="w-5 h-5 text-pink-500" />
              <h3 className="font-semibold text-pink-800">Daily Thoughts</h3>
            </div>
            <Textarea 
              placeholder="What's on your mind today? ✨"
              className="border-pink-200 focus:border-pink-400 bg-white/50 backdrop-blur-sm resize-none"
              rows={4}
            />
            <div className="mt-3 flex gap-2">
              <div className="w-3 h-3 bg-pink-300 rounded-full"></div>
              <div className="w-3 h-3 bg-pink-400 rounded-full"></div>
              <div className="w-3 h-3 bg-pink-500 rounded-full"></div>
            </div>
          </Card>

          {/* Mood Tracker */}
          <Card className="p-6 bg-gradient-to-br from-purple-100 to-purple-50 border-purple-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:rotate-1 transform">
            <div className="flex items-center gap-2 mb-4">
              <Smile className="w-5 h-5 text-purple-500" />
              <h3 className="font-semibold text-purple-800">Mood Today</h3>
            </div>
            <div className="grid grid-cols-3 gap-3 mb-4">
              {['😊', '😌', '🥰', '😴', '🤔', '✨'].map((emoji, i) => (
                <button
                  key={i}
                  className="p-3 text-2xl bg-white/50 rounded-lg hover:bg-white/80 transition-all duration-200 hover:scale-110"
                >
                  {emoji}
                </button>
              ))}
            </div>
            <Input 
              placeholder="Describe your mood..."
              className="border-purple-200 focus:border-purple-400 bg-white/50"
            />
          </Card>

          {/* Creative Corner */}
          <Card className="p-6 bg-gradient-to-br from-blue-100 to-blue-50 border-blue-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:-rotate-1 transform row-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Palette className="w-5 h-5 text-blue-500" />
              <h3 className="font-semibold text-blue-800">Creative Corner</h3>
            </div>
            <div className="space-y-4">
              <div className="bg-white/50 rounded-lg p-4 border-2 border-dashed border-blue-300">
                <Camera className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                <p className="text-sm text-blue-600 text-center">Drop your inspiration here</p>
              </div>
              <Textarea 
                placeholder="Sketch your ideas with words..."
                className="border-blue-200 focus:border-blue-400 bg-white/50"
                rows={6}
              />
              <div className="flex gap-2 flex-wrap">
                {['#creative', '#inspiration', '#art', '#ideas'].map((tag, i) => (
                  <span key={i} className="px-2 py-1 bg-blue-200 text-blue-700 rounded-full text-xs">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </Card>

          {/* Goals & Dreams */}
          <Card className="p-6 bg-gradient-to-br from-yellow-100 to-yellow-50 border-yellow-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:rotate-1 transform">
            <div className="flex items-center gap-2 mb-4">
              <Star className="w-5 h-5 text-yellow-500" />
              <h3 className="font-semibold text-yellow-800">Goals & Dreams</h3>
            </div>
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-yellow-400 rounded"></div>
                  <Input 
                    placeholder={`Dream ${i}...`}
                    className="border-yellow-200 focus:border-yellow-400 bg-white/50"
                  />
                </div>
              ))}
            </div>
          </Card>

          {/* Music & Vibes */}
          <Card className="p-6 bg-gradient-to-br from-green-100 to-green-50 border-green-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:-rotate-1 transform">
            <div className="flex items-center gap-2 mb-4">
              <Music className="w-5 h-5 text-green-500" />
              <h3 className="font-semibold text-green-800">Current Vibes</h3>
            </div>
            <Input 
              placeholder="What song matches your mood?"
              className="border-green-200 focus:border-green-400 bg-white/50 mb-3"
            />
            <div className="flex gap-2">
              <div className="w-2 h-8 bg-green-300 rounded animate-pulse"></div>
              <div className="w-2 h-6 bg-green-400 rounded animate-pulse" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-2 h-10 bg-green-500 rounded animate-pulse" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-2 h-4 bg-green-300 rounded animate-pulse" style={{ animationDelay: '0.3s' }}></div>
            </div>
          </Card>

          {/* Reading List */}
          <Card className="p-6 bg-gradient-to-br from-indigo-100 to-indigo-50 border-indigo-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:rotate-1 transform">
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="w-5 h-5 text-indigo-500" />
              <h3 className="font-semibold text-indigo-800">Reading List</h3>
            </div>
            <div className="space-y-2">
              <Input 
                placeholder="Book title..."
                className="border-indigo-200 focus:border-indigo-400 bg-white/50"
              />
              <Input 
                placeholder="Author..."
                className="border-indigo-200 focus:border-indigo-400 bg-white/50"
              />
              <div className="flex gap-1 mt-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-4 h-4 text-yellow-400 hover:fill-current cursor-pointer" />
                ))}
              </div>
            </div>
          </Card>

          {/* Coffee Corner */}
          <Card className="p-6 bg-gradient-to-br from-orange-100 to-orange-50 border-orange-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:-rotate-1 transform">
            <div className="flex items-center gap-2 mb-4">
              <Coffee className="w-5 h-5 text-orange-500" />
              <h3 className="font-semibold text-orange-800">Coffee Corner</h3>
            </div>
            <p className="text-sm text-orange-600 mb-3">Today's fuel ☕</p>
            <div className="grid grid-cols-2 gap-2">
              {['Latte', 'Cappuccino', 'Americano', 'Tea'].map((drink, i) => (
                <button
                  key={i}
                  className="p-2 bg-white/50 rounded-lg text-sm hover:bg-white/80 transition-all duration-200 hover:scale-105"
                >
                  {drink}
                </button>
              ))}
            </div>
          </Card>

        </div>

        {/* Floating Action Button */}
        <div className="fixed bottom-8 right-8">
          <Button
            onClick={createSparkles}
            className="w-16 h-16 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
          >
            <Sparkles className="w-6 h-6" />
          </Button>
        </div>
      </main>

      {/* Draggable Sticky Note */}
      <div
        className="fixed w-24 h-24 bg-yellow-200 shadow-lg cursor-move transform hover:scale-105 transition-transform duration-200 z-20"
        style={{
          left: stickyNote.x,
          top: stickyNote.y,
          transform: `translate(${stickyNote.x}px, ${stickyNote.y}px) rotate(${isDragging ? '5deg' : '-3deg'})`
        }}
        onMouseDown={handleMouseDown}
      >
        <div className="p-2 text-xs text-yellow-800">
          <p>Drag me!</p>
          <p>✨</p>
        </div>
      </div>
    </div>
  )
}
