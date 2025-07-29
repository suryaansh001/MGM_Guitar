"use client"

import { Canvas, useLoader } from "@react-three/fiber"
import { OrbitControls, Environment } from "@react-three/drei"
import { Button } from "@/components/ui/button"
import { Play, Music } from "lucide-react"
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { Suspense } from "react"

// function GuitarModel() {
//   const obj = useLoader(OBJLoader, '/10380_ElectricGuitar_v3_L3.obj')
  
//   // Apply materials to the loaded model
//   obj.traverse((child) => {
//     if (child.isMesh) {
//       child.material = child.material.clone()
//       child.material.color.setHex(0x8B4513) // Brown wood color
//       child.material.roughness = 0.4
//       child.material.metalness = 0.1
//       child.castShadow = true
//       child.receiveShadow = true
//     }
//   })

//   return (
//     <primitive 
//       object={obj} 
//       scale={[0.05, 0.05, 0.05]} // Scale down the guitar as OBJ models are often large
//       position={[0, -1, 0]} // Adjust position to center it better
//       rotation={[0, Math.PI / 4, 0]} // Rotate to show the guitar at an angle
//     />
//   )
// }

function LoadingFallback() {
  return (
    <mesh>
      <boxGeometry args={[2, 4, 0.3]} />
      <meshStandardMaterial color="#8B4513" wireframe />
    </mesh>
  )
}

export function HeroSection() {
  return (
    <section className="relative h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-blue-900">
      <div className="absolute inset-0 bg-black/40" />

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-150 h-150 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="container mx-auto px-4 z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-gray-300 to-blue-400 bg-clip-text text-transparent leading-tight">
              Master the Guitar
            </h1>
            <p className="text-xl lg:text-2xl text-gray-300 mb-8 leading-relaxed">
              Learn from a professional guitarist with 15+ years of experience. From beginner chords to advanced
              techniques, unlock your musical potential.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-semibold shadow-lg shadow-blue-500/25 transform hover:scale-105 transition-all duration-200"
              >
                <Play className="w-5 h-5 mr-2" />
                Start Learning
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-black bg-transparent backdrop-blur-sm border-2 transform hover:scale-105 transition-all duration-200"
              >
                <Music className="w-5 h-5 mr-2" />
                View Workshops
              </Button>
            </div>
          </div>

          <div className="h-96 lg:h-[500px] relative">
            <Canvas 
              camera={{ position: [3, 2, 6], fov: 45 }}
              shadows
            >
              <ambientLight intensity={0.4} />
              <directionalLight 
                position={[5, 5, 5]} 
                intensity={0.8}
                castShadow
                shadow-mapSize-width={2048}
                shadow-mapSize-height={2048}
              />
              <pointLight position={[-5, 0, 5]} intensity={0.3} color="#4FC3F7" />
              <pointLight position={[5, 0, -5]} intensity={0.3} color="#FF6B6B" />
              
              <Suspense fallback={<LoadingFallback />}>
                
              </Suspense>
              
              <OrbitControls 
                enableZoom={false} 
                autoRotate 
                autoRotateSpeed={1.5}
                maxPolarAngle={Math.PI / 1.8}
                minPolarAngle={Math.PI / 4}
              />
              <Environment preset="studio" />
            </Canvas>
            
            {/* Floating musical notes animation */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              {Array.from({ length: 8 }, (_, i) => (
                <div
                  key={i}
                  className="absolute text-blue-400/30 text-2xl animate-bounce"
                  style={{
                    left: `${20 + (i * 10)}%`,
                    top: `${10 + (i * 8)}%`,
                    animationDelay: `${i * 0.5}s`,
                    animationDuration: '3s'
                  }}
                >
                  ♪
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}