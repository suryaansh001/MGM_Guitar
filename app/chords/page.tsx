"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Play, Pause, RotateCcw, Settings, Plus, Minus, Music2, Loader } from "lucide-react"

// Mock API functions - replace these with your actual API calls
const mockAPI = {
  // Fetch all songs from database
  fetchSongs: async () => {
    // Replace with actual API call: return await fetch('/api/songs').then(res => res.json())
    // Simulating API delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    return [
      {
        id: 1,
        title: "Sample Song",
        artist: "Demo Artist",
        originalKey: "G",
        difficulty: "Beginner",
        lyrics: [
          { line: "Walking down the street today", chords: ["D", "", "Em", ""] },
          { line: "Feeling like the world is mine", chords: ["", "C", "", "D"] },
          { line: "Every step I take away", chords: ["G", "", "Em", ""] },
          { line: "Leaves the past far behind", chords: ["", "C", "", "D"] },
          { line: "And I know that I will find", chords: ["Am", "", "C", "G"] },
          { line: "Everything I'm looking for", chords: ["", "D", "", ""] },
          { line: "In this moment, peace of mind", chords: ["G", "", "Em", ""] },
          { line: "That's what dreams are for", chords: ["", "C", "D", "G"] },
        ],
        createdAt: "2024-01-15",
        updatedAt: "2024-01-15"
      },
      {
        id: 2,
        title: "Wonderwall",
        artist: "Oasis",
        originalKey: "C",
        difficulty: "Intermediate",
        lyrics: [
          { line: "Today is gonna be the day", chords: ["Em", "G", "D", "C"] },
          { line: "That they're gonna throw it back to you", chords: ["", "", "", ""] },
          { line: "By now you should've somehow", chords: ["Em", "G", "D", "C"] },
          { line: "Realized what you gotta do", chords: ["", "", "", ""] },
          { line: "I don't believe that anybody", chords: ["Em", "G", "D", "C"] },
          { line: "Feels the way I do about you now", chords: ["", "", "", ""] }
        ],
        createdAt: "2024-01-16",
        updatedAt: "2024-01-16"
      }
    ]
  },

  // Fetch single song by ID
  fetchSongById: async (id) => {
    // Replace with: return await fetch(`/api/songs/${id}`).then(res => res.json())
    const songs = await mockAPI.fetchSongs()
    return songs.find(song => song.id === parseInt(id))
  }
}

const chordProgressions = {
  "C": ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"],
  "C#": ["C#", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B", "C"],
  "Db": ["Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B", "C"],
  "D": ["D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B", "C", "Db"],
  "D#": ["D#", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B", "C", "Db", "D"],
  "Eb": ["Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B", "C", "Db", "D"],
  "E": ["E", "F", "Gb", "G", "Ab", "A", "Bb", "B", "C", "Db", "D", "Eb"],
  "F": ["F", "Gb", "G", "Ab", "A", "Bb", "B", "C", "Db", "D", "Eb", "E"],
  "F#": ["F#", "G", "Ab", "A", "Bb", "B", "C", "Db", "D", "Eb", "E", "F"],
  "Gb": ["Gb", "G", "Ab", "A", "Bb", "B", "C", "Db", "D", "Eb", "E", "F"],
  "G": ["G", "Ab", "A", "Bb", "B", "C", "Db", "D", "Eb", "E", "F", "Gb"],
  "G#": ["G#", "A", "Bb", "B", "C", "Db", "D", "Eb", "E", "F", "Gb", "G"],
  "Ab": ["Ab", "A", "Bb", "B", "C", "Db", "D", "Eb", "E", "F", "Gb", "G"],
  "A": ["A", "Bb", "B", "C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab"],
  "A#": ["A#", "B", "C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A"],
  "Bb": ["Bb", "B", "C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A"],
  "B": ["B", "C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb"],
}

// Loading Component
function LoadingSpinner({ message = "Loading..." }) {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-400 mb-4"></div>
      <p className="text-amber-400 text-lg">{message}</p>
    </div>
  )
}

// Song Card Component
function SongCard({ song, isSelected, onSelect }) {
  return (
    <div
      className={`p-4 rounded-lg border cursor-pointer transition-all hover:shadow-lg ${
        isSelected 
          ? 'border-amber-400 bg-amber-900/30 shadow-amber-400/20' 
          : 'border-amber-900/20 bg-gray-800 hover:bg-gray-700 hover:border-amber-600/40'
      }`}
      onClick={() => onSelect(song)}
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-amber-400 font-bold text-lg">{song.title}</h3>
        <span className={`px-2 py-1 rounded text-xs font-medium ${
          song.difficulty === 'Beginner' ? 'bg-green-900/30 text-green-400' :
          song.difficulty === 'Intermediate' ? 'bg-yellow-900/30 text-yellow-400' :
          'bg-red-900/30 text-red-400'
        }`}>
          {song.difficulty}
        </span>
      </div>
      <p className="text-gray-300 text-sm mb-2">{song.artist}</p>
      <div className="flex items-center justify-between text-xs text-gray-400">
        <span>Key: <strong className="text-amber-300">{song.originalKey}</strong></span>
        <span>{song.lyrics?.length || 0} lines</span>
      </div>
    </div>
  )
}

// Main Player Component
export default function GuitarTabsPlayer() {
  const [songs, setSongs] = useState([])
  const [selectedSong, setSelectedSong] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentLine, setCurrentLine] = useState(0)
  const [scrollSpeed, setScrollSpeed] = useState(0.5)
  const [transpose, setTranspose] = useState(0)
  const [currentKey, setCurrentKey] = useState("G")
  const [capo, setCapo] = useState(0)
  const intervalRef = useRef(null)
  const lyricsRef = useRef(null)

  // Load songs on component mount
  useEffect(() => {
    loadSongs()
  }, [])

  const loadSongs = async () => {
    try {
      setLoading(true)
      const songsData = await mockAPI.fetchSongs()
      setSongs(songsData)
      
      // Auto-select first song if available
      if (songsData.length > 0) {
        setSelectedSong(songsData[0])
        setCurrentKey(songsData[0].originalKey)
      }
    } catch (error) {
      console.error('Error loading songs:', error)
    } finally {
      setLoading(false)
    }
  }

  const transposeChord = (chord, semitones) => {
    if (!chord || chord === "") return chord
    
    const baseChord = chord.replace(/m|7|maj|min|sus|dim|aug|\d/g, "")
    const suffix = chord.replace(baseChord, "")
    
    if (!chordProgressions[baseChord]) return chord
    
    const currentIndex = chordProgressions[baseChord].indexOf(baseChord)
    if (currentIndex === -1) return chord
    
    const newIndex = (currentIndex + semitones + 12) % 12
    const newBaseChord = chordProgressions[baseChord][newIndex]
    
    return newBaseChord + suffix
  }

  const getTransposedLyrics = () => {
    if (!selectedSong) return []
    return selectedSong.lyrics.map(lyricLine => ({
      ...lyricLine,
      chords: lyricLine.chords.map(chord => transposeChord(chord, transpose))
    }))
  }

  const getCurrentChords = () => {
    const transposedLyrics = getTransposedLyrics()
    const allChords = new Set()
    transposedLyrics.forEach(line => {
      line.chords.forEach(chord => {
        if (chord && chord !== "") {
          allChords.add(chord)
        }
      })
    })
    return Array.from(allChords).slice(0, 6)
  }

  const getChordImagePath = (chord) => {
    const cleanChord = chord.replace(/[#b]/g, (match) => {
      return match === '#' ? 'sharp' : 'flat'
    })
    return `/chord_diagrams/${cleanChord}.png`
  }

  // Auto-scroll functionality
  useEffect(() => {
    if (isPlaying && selectedSong) {
      const speedMs = scrollSpeed * 1000
      intervalRef.current = setInterval(() => {
        setCurrentLine((prev) => {
          if (prev >= selectedSong.lyrics.length - 1) {
            setIsPlaying(false)
            return 0
          }
          const nextLine = prev + 1
          
          if (lyricsRef.current) {
            const currentLineElement = lyricsRef.current.children[nextLine]
            if (currentLineElement) {
              currentLineElement.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
              })
            }
          }
          
          return nextLine
        })
      }, speedMs)
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isPlaying, scrollSpeed, selectedSong])

  const togglePlayback = () => {
    setIsPlaying(!isPlaying)
  }

  const resetSong = () => {
    setIsPlaying(false)
    setCurrentLine(0)
  }

  const handleTranspose = (direction) => {
    const newTranspose = direction === "up" ? transpose + 1 : transpose - 1
    setTranspose(newTranspose)
    
    const newCapo = newTranspose < 0 ? Math.abs(newTranspose) : 0
    setCapo(newCapo)
    
    const effectiveTranspose = newTranspose < 0 ? 0 : newTranspose
    const originalKeyIndex = chordProgressions["C"].indexOf(selectedSong?.originalKey || "G")
    const newKeyIndex = (originalKeyIndex + effectiveTranspose + 12) % 12
    setCurrentKey(chordProgressions["C"][newKeyIndex])
  }

  const handleSongChange = (song) => {
    setSelectedSong(song)
    setCurrentKey(song.originalKey)
    setTranspose(0)
    setCapo(0)
    setCurrentLine(0)
    setIsPlaying(false)
  }

  const transposedLyrics = getTransposedLyrics()
  const currentChords = getCurrentChords()

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black flex items-center justify-center">
        <LoadingSpinner message="Loading your guitar tabs..." />
      </div>
    )
  }

  if (songs.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black flex items-center justify-center">
        <div className="text-center">
          <Music2 className="w-16 h-16 text-gray-600 mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-amber-400 mb-4">No Songs Available</h2>
          <p className="text-gray-300 text-lg mb-6">
            It looks like there are no guitar tabs in your collection yet.
          </p>
          <p className="text-gray-400">
            Contact your administrator to add some songs to get started!
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-amber-400 mb-4">
            <Music2 className="inline-block w-10 h-10 mr-3" />
            Guitar Chords & Tabs
          </h1>
          <p className="text-gray-300 text-lg">Interactive chord charts with auto-scroll functionality</p>
        </div>

        {/* Song Selector */}
        <Card className="bg-black/50 border-amber-900/30 mb-6">
          <CardHeader>
            <CardTitle className="text-amber-400 flex items-center justify-between">
              <span>Select Song ({songs.length} available)</span>
              <Button
                variant="outline"
                size="sm"
                onClick={loadSongs}
                className="border-amber-400 text-amber-400 hover:bg-amber-400 hover:text-black bg-transparent"
              >
                <Loader className="w-4 h-4" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-96 overflow-y-auto">
              {songs.map(song => (
                <SongCard
                  key={song.id}
                  song={song}
                  isSelected={selectedSong?.id === song.id}
                  onSelect={handleSongChange}
                />
              ))}
            </div>
          </CardContent>
        </Card>

        {selectedSong && (
          <>
            {/* Song Info */}
            <div className="mb-6">
              <h2 className="text-3xl font-bold text-amber-400 mb-2">
                {selectedSong.title} - {selectedSong.artist}
              </h2>
              <div className="flex items-center space-x-4 text-gray-300">
                <span>Key: <strong className="text-amber-400">{currentKey}</strong></span>
                <span>Capo: <strong className="text-amber-400">{capo > 0 ? `${capo}` : 'None'}</strong></span>
                <span>Difficulty: <strong className="text-amber-400">{selectedSong.difficulty}</strong></span>
                <span>Lines: <strong className="text-amber-400">{selectedSong.lyrics.length}</strong></span>
              </div>
            </div>

            {/* Controls */}
            <Card className="bg-black/50 border-amber-900/30 mb-6">
              <CardHeader>
                <CardTitle className="text-amber-400 flex items-center space-x-2">
                  <Settings className="w-5 h-5" />
                  <span>Playback Controls</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap items-center gap-4">
                  {/* Playback Controls */}
                  <div className="flex items-center space-x-2">
                    <Button 
                      onClick={togglePlayback} 
                      className="bg-amber-500 hover:bg-amber-600 text-black"
                    >
                      {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                      <span className="ml-2">{isPlaying ? 'Pause' : 'Play'}</span>
                    </Button>
                    <Button
                      variant="outline"
                      onClick={resetSong}
                      className="border-amber-400 text-amber-400 hover:bg-amber-400 hover:text-black bg-transparent"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </Button>
                  </div>

                  {/* Speed Control */}
                  <div className="flex items-center space-x-2">
                    <label className="text-sm font-medium text-gray-300">Speed:</label>
                    <input
                      type="range"
                      min="0.1"
                      max="2"
                      step="0.1"
                      value={scrollSpeed}
                      onChange={(e) => setScrollSpeed(Number(e.target.value))}
                      className="w-24 accent-amber-400"
                    />
                    <span className="text-sm text-gray-400 min-w-[50px]">{scrollSpeed}s</span>
                  </div>

                  {/* Transpose Controls */}
                  <div className="flex items-center space-x-2">
                    <label className="text-sm font-medium text-gray-300">Transpose:</label>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleTranspose("down")}
                      className="border-amber-400 text-amber-400 hover:bg-amber-400 hover:text-black bg-transparent"
                    >
                      <Minus className="w-3 h-3" />
                    </Button>
                    <span className="text-sm font-mono min-w-[50px] text-center text-amber-400">
                      {transpose > 0 ? `+${transpose}` : transpose}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleTranspose("up")}
                      className="border-amber-400 text-amber-400 hover:bg-amber-400 hover:text-black bg-transparent"
                    >
                      <Plus className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Main Tab Content */}
              <div className="lg:col-span-2">
                <Card className="bg-black/50 border-amber-900/30">
                  <CardHeader>
                    <CardTitle className="text-amber-400">Guitar Tab</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="font-mono text-sm bg-gray-900/50 p-6 rounded-lg border border-amber-900/20" ref={lyricsRef}>
                      {transposedLyrics.map((lyricLine, index) => (
                        <div
                          key={index}
                          className={`mb-6 transition-all duration-300 ${
                            index === currentLine ? "bg-amber-900/30 p-3 rounded-lg shadow-lg" : ""
                          }`}
                        >
                          {/* Chord line */}
                          <div className="flex text-amber-400 font-bold mb-1 text-lg">
                            {lyricLine.chords.map((chord, chordIndex) => (
                              <span key={chordIndex} className="inline-block min-w-[80px] text-center">
                                {chord}
                              </span>
                            ))}
                          </div>

                          {/* Lyrics line */}
                          <div className="text-white text-lg font-mono leading-relaxed">
                            {lyricLine.line}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Chord Dictionary Sidebar */}
              <div className="lg:col-span-1">
                <Card className="bg-black/50 border-amber-900/30 sticky top-4">
                  <CardHeader>
                    <CardTitle className="text-amber-400">Chord Charts</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {currentChords.length > 0 ? (
                        currentChords.map((chord) => (
                          <div key={chord} className="bg-gray-800 p-4 rounded-lg border border-amber-900/20">
                            <h3 className="text-amber-400 font-bold text-lg mb-3 text-center">{chord}</h3>
                            <div className="flex justify-center">
                              <img
                                src={getChordImagePath(chord)}
                                alt={`${chord} chord diagram`}
                                className="max-w-full h-auto rounded border border-amber-900/30"
                                onError={(e) => {
                                  e.currentTarget.style.display = 'none'
                                  e.currentTarget.nextElementSibling.style.display = 'block'
                                }}
                              />
                              <div className="text-center text-gray-400 text-sm hidden">
                                Diagram not available
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-center text-gray-400 py-8">
                          <Music2 className="w-12 h-12 mx-auto mb-4 opacity-50" />
                          <p>No chords found in this song</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </>
        )}

        {/* Footer */}
        <div className="mt-12 text-center text-gray-400">
          <p>Practice with auto-scroll and transpose features</p>
          <p className="text-sm mt-2">Transpose to find the perfect key for your voice</p>
        </div>
      </div>
    </div>
  )
}