"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Edit, Save, X, ListMusic, Plus, Trash2, Eye, Music } from "lucide-react"

// Mock API functions - replace these with your actual API calls
const mockAPI = {
  // Fetch all songs from database
  fetchSongs: async () => {
    // Replace with actual API call: return await fetch('/api/songs').then(res => res.json())
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
          { line: "Leaves the past far behind", chords: ["", "C", "", "D"] }
        ],
        createdAt: "2024-01-15",
        updatedAt: "2024-01-15"
      }
    ]
  },

  // Save new song to database
  saveSong: async (songData) => {
    // Replace with: return await fetch('/api/songs', { method: 'POST', body: JSON.stringify(songData) })
    console.log('Saving song:', songData)
    return { id: Date.now(), ...songData, createdAt: new Date().toISOString().split('T')[0], updatedAt: new Date().toISOString().split('T')[0] }
  },

  // Update existing song
  updateSong: async (id, songData) => {
    // Replace with: return await fetch(`/api/songs/${id}`, { method: 'PUT', body: JSON.stringify(songData) })
    console.log('Updating song:', id, songData)
    return { id, ...songData, updatedAt: new Date().toISOString().split('T')[0] }
  },

  // Delete song
  deleteSong: async (id) => {
    // Replace with: return await fetch(`/api/songs/${id}`, { method: 'DELETE' })
    console.log('Deleting song:', id)
    return { success: true }
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

// Song Preview Modal Component
function SongPreviewModal({ song, isOpen, onClose }) {
  if (!isOpen || !song) return null

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 border border-amber-900/30 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
        <div className="p-6 border-b border-amber-900/30 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-amber-400">{song.title}</h2>
            <p className="text-gray-300">{song.artist} • Key: {song.originalKey} • {song.difficulty}</p>
          </div>
          <Button
            variant="outline"
            onClick={onClose}
            className="border-gray-400 text-gray-400 hover:bg-gray-400 hover:text-black bg-transparent"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
        <div className="p-6 overflow-y-auto max-h-[70vh]">
          <div className="font-mono text-sm bg-gray-800 p-6 rounded-lg">
            {song.lyrics.map((lyricLine, index) => (
              <div key={index} className="mb-6">
                {/* Chord line */}
                <div className="flex text-amber-400 font-bold mb-1 text-lg">
                  {lyricLine.chords.map((chord, chordIndex) => (
                    <span key={chordIndex} className="inline-block min-w-[80px] text-center">
                      {chord}
                    </span>
                  ))}
                </div>
                {/* Lyrics line */}
                <div className="text-white text-lg leading-relaxed">
                  {lyricLine.line}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// Song Form Component
function SongForm({ song, onSave, onCancel, isLoading }) {
  const [formData, setFormData] = useState({
    title: song?.title || "",
    artist: song?.artist || "",
    originalKey: song?.originalKey || "G",
    difficulty: song?.difficulty || "Beginner",
    lyricsText: song ? song.lyrics.map(l => 
      l.chords.join(' ') + '\n' + l.line
    ).join('\n\n') : ""
  })

  const [errors, setErrors] = useState({})

  const validateForm = () => {
    const newErrors = {}
    if (!formData.title.trim()) newErrors.title = "Title is required"
    if (!formData.artist.trim()) newErrors.artist = "Artist is required"
    if (!formData.lyricsText.trim()) newErrors.lyricsText = "Lyrics are required"
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const parseLyricsWithChords = (text) => {
    const lines = text.split('\n').filter(line => line.trim() !== '')
    const result = []
    
    for (let i = 0; i < lines.length; i += 2) {
      const chordLine = lines[i] || ""
      const lyricLine = lines[i + 1] || ""
      
      // Parse chords from chord line
      const chords = []
      const words = lyricLine.split(/\s+/)
      
      // Simple chord parsing - split chord line into segments
      const chordSegments = chordLine.split(/\s+/).filter(c => c.trim() !== '')
      
      // Create chord array matching lyric words
      for (let j = 0; j < Math.max(words.length, 4); j++) {
        chords.push(chordSegments[j] || "")
      }
      
      result.push({
        line: lyricLine,
        chords: chords
      })
    }
    
    return result
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validateForm()) return

    const lyrics = parseLyricsWithChords(formData.lyricsText)
    const songData = {
      title: formData.title.trim(),
      artist: formData.artist.trim(),
      originalKey: formData.originalKey,
      difficulty: formData.difficulty,
      lyrics: lyrics
    }

    onSave(songData)
  }

  return (
    <Card className="bg-black/50 border-amber-900/30">
      <CardHeader>
        <CardTitle className="text-amber-400">
          {song ? 'Edit Song' : 'Add New Song'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Title *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                className={`w-full p-3 bg-gray-800 border rounded text-white ${
                  errors.title ? 'border-red-500' : 'border-amber-900/30'
                }`}
                placeholder="Enter song title"
              />
              {errors.title && <p className="text-red-400 text-sm mt-1">{errors.title}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Artist *
              </label>
              <input
                type="text"
                value={formData.artist}
                onChange={(e) => setFormData(prev => ({ ...prev, artist: e.target.value }))}
                className={`w-full p-3 bg-gray-800 border rounded text-white ${
                  errors.artist ? 'border-red-500' : 'border-amber-900/30'
                }`}
                placeholder="Enter artist name"
              />
              {errors.artist && <p className="text-red-400 text-sm mt-1">{errors.artist}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Original Key
              </label>
              <select
                value={formData.originalKey}
                onChange={(e) => setFormData(prev => ({ ...prev, originalKey: e.target.value }))}
                className="w-full p-3 bg-gray-800 border border-amber-900/30 rounded text-white"
              >
                {Object.keys(chordProgressions).slice(0, 12).map(key => (
                  <option key={key} value={key}>{key}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Difficulty Level
              </label>
              <select
                value={formData.difficulty}
                onChange={(e) => setFormData(prev => ({ ...prev, difficulty: e.target.value }))}
                className="w-full p-3 bg-gray-800 border border-amber-900/30 rounded text-white"
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Lyrics with Chords *
            </label>
            <div className="mb-3 p-3 bg-blue-900/20 border border-blue-500/30 rounded text-sm text-blue-200">
              <strong>Format Instructions:</strong>
              <ul className="mt-2 space-y-1 text-xs">
                <li>• Put chord line first, then lyric line below it</li>
                <li>• Use spaces to align chords with lyrics</li>
                <li>• Leave blank lines between verses</li>
                <li>• Example format shown in placeholder</li>
              </ul>
            </div>
            <textarea
              value={formData.lyricsText}
              onChange={(e) => setFormData(prev => ({ ...prev, lyricsText: e.target.value }))}
              className={`w-full h-80 p-4 bg-gray-800 border rounded text-white font-mono text-sm ${
                errors.lyricsText ? 'border-red-500' : 'border-amber-900/30'
              }`}
              placeholder={`D    Em       C    D
Walking down the street today

     C        D
Feeling like the world is mine

G    Em       C    D
Every step I take away

     C    D    G
Leaves the past behind`}
            />
            {errors.lyricsText && <p className="text-red-400 text-sm mt-1">{errors.lyricsText}</p>}
          </div>

          <div className="flex space-x-4">
            <Button 
              onClick={handleSubmit}
              disabled={isLoading}
              className="bg-amber-500 hover:bg-amber-600 text-black flex-1 disabled:opacity-50"
            >
              <Save className="w-4 h-4 mr-2" />
              {isLoading ? 'Saving...' : (song ? 'Update Song' : 'Save Song')}
            </Button>
            <Button
              variant="outline"
              onClick={onCancel}
              className="border-gray-400 text-gray-400 hover:bg-gray-400 hover:text-black bg-transparent"
            >
              Cancel
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Main Admin Panel Component
export default function GuitarTabsAdminPanel() {
  const [songs, setSongs] = useState([])
  const [loading, setLoading] = useState(true)
  const [editingSong, setEditingSong] = useState(null)
  const [showAddForm, setShowAddForm] = useState(false)
  const [previewSong, setPreviewSong] = useState(null)
  const [saving, setSaving] = useState(false)

  // Load songs on component mount
  useEffect(() => {
    loadSongs()
  }, [])

  const loadSongs = async () => {
    try {
      setLoading(true)
      const songsData = await mockAPI.fetchSongs()
      setSongs(songsData)
    } catch (error) {
      console.error('Error loading songs:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSaveSong = async (songData) => {
    try {
      setSaving(true)
      
      if (editingSong) {
        // Update existing song
        const updatedSong = await mockAPI.updateSong(editingSong.id, songData)
        setSongs(prev => prev.map(song => 
          song.id === editingSong.id ? updatedSong : song
        ))
        setEditingSong(null)
      } else {
        // Add new song
        const newSong = await mockAPI.saveSong(songData)
        setSongs(prev => [...prev, newSong])
        setShowAddForm(false)
      }
    } catch (error) {
      console.error('Error saving song:', error)
    } finally {
      setSaving(false)
    }
  }

  const handleEditSong = (song) => {
    setEditingSong(song)
    setShowAddForm(false)
  }

  const handleDeleteSong = async (songId) => {
    if (!confirm('Are you sure you want to delete this song?')) return
    
    try {
      await mockAPI.deleteSong(songId)
      setSongs(prev => prev.filter(song => song.id !== songId))
    } catch (error) {
      console.error('Error deleting song:', error)
    }
  }

  const handleCancelEdit = () => {
    setEditingSong(null)
    setShowAddForm(false)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-400 mx-auto mb-4"></div>
          <p className="text-amber-400">Loading songs...</p>
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
            <Music className="inline-block w-10 h-10 mr-3" />
            Guitar Tabs Admin Panel
          </h1>
          <p className="text-gray-300 text-lg">Manage your guitar tabs and chord sheets</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-black/50 border-amber-900/30">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-amber-400">{songs.length}</div>
              <p className="text-gray-300">Total Songs</p>
            </CardContent>
          </Card>
          <Card className="bg-black/50 border-amber-900/30">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-green-400">
                {songs.filter(s => s.difficulty === 'Beginner').length}
              </div>
              <p className="text-gray-300">Beginner Level</p>
            </CardContent>
          </Card>
          <Card className="bg-black/50 border-amber-900/30">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-red-400">
                {songs.filter(s => s.difficulty === 'Advanced').length}
              </div>
              <p className="text-gray-300">Advanced Level</p>
            </CardContent>
          </Card>
        </div>

        {/* Add New Song Button */}
        {!showAddForm && !editingSong && (
          <div className="text-center mb-8">
            <Button 
              onClick={() => setShowAddForm(true)}
              className="bg-amber-500 hover:bg-amber-600 text-black text-lg px-8 py-3"
            >
              <Plus className="w-5 h-5 mr-2" />
              Add New Song
            </Button>
          </div>
        )}

        {/* Song Form */}
        {(showAddForm || editingSong) && (
          <div className="mb-8">
            <SongForm
              song={editingSong}
              onSave={handleSaveSong}
              onCancel={handleCancelEdit}
              isLoading={saving}
            />
          </div>
        )}

        {/* Songs List */}
        <Card className="bg-black/50 border-amber-900/30">
          <CardHeader>
            <CardTitle className="text-amber-400 flex items-center space-x-2">
              <ListMusic className="w-5 h-5" />
              <span>Songs Library ({songs.length})</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {songs.length === 0 ? (
              <div className="text-center py-12">
                <Music className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <h3 className="text-xl text-gray-400 mb-2">No songs yet</h3>
                <p className="text-gray-500">Add your first song to get started</p>
              </div>
            ) : (
              <div className="space-y-4">
                {songs.map(song => (
                  <div key={song.id} className="bg-gray-800 p-6 rounded-lg border border-amber-900/20">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center space-x-4 mb-2">
                          <h3 className="text-xl font-bold text-amber-400">{song.title}</h3>
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            song.difficulty === 'Beginner' ? 'bg-green-900/30 text-green-400' :
                            song.difficulty === 'Intermediate' ? 'bg-yellow-900/30 text-yellow-400' :
                            'bg-red-900/30 text-red-400'
                          }`}>
                            {song.difficulty}
                          </span>
                        </div>
                        <p className="text-gray-300 text-lg mb-2">{song.artist}</p>
                        <div className="flex items-center space-x-6 text-sm text-gray-400">
                          <span>Key: <strong className="text-amber-400">{song.originalKey}</strong></span>
                          <span>Lines: <strong>{song.lyrics?.length || 0}</strong></span>
                          {song.createdAt && (
                            <span>Created: <strong>{song.createdAt}</strong></span>
                          )}
                        </div>
                      </div>
                      <div className="flex space-x-2 ml-4">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setPreviewSong(song)}
                          className="border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-black bg-transparent"
                          title="Preview Song"
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEditSong(song)}
                          className="border-amber-400 text-amber-400 hover:bg-amber-400 hover:text-black bg-transparent"
                          title="Edit Song"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDeleteSong(song.id)}
                          className="border-red-400 text-red-400 hover:bg-red-400 hover:text-black bg-transparent"
                          title="Delete Song"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Preview Modal */}
        <SongPreviewModal
          song={previewSong}
          isOpen={!!previewSong}
          onClose={() => setPreviewSong(null)}
        />

        {/* Footer */}
        <div className="mt-12 text-center text-gray-400">
          <p>Guitar Tabs Admin Panel - Manage your chord sheets and lyrics</p>
          <p className="text-sm mt-2">Add, edit, and organize your guitar tabs collection</p>
        </div>
      </div>
    </div>
  )
}