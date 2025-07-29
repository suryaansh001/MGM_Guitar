"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Users, Clock } from "lucide-react"
import Image from "next/image"

const workshops = [
  {
    id: 1,
    title: "Beginner Acoustic Workshop",
    date: "2024-02-15",
    duration: "2 hours",
    participants: 12,
    image: "/image.png?height=200&width=300",
    description: "Learn basic chords and strumming patterns",
  },
  {
    id: 2,
    title: "Electric Guitar Mastery",
    date: "2024-02-20",
    duration: "3 hours",
    participants: 8,
    image: "/image.png?height=200&width=300",
    description: "Advanced techniques and effects",
  },
  {
    id: 3,
    title: "Fingerpicking Fundamentals",
    date: "2024-02-25",
    duration: "2.5 hours",
    participants: 10,
    image: "/image.png?height=200&width=300",
    description: "Master the art of fingerpicking",
  },
]

export function WorkshopCards() {
  return (
    <section className="py-20 bg-gradient-to-b from-gray-900 to-black">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-white to-blue-400 bg-clip-text text-transparent">
          Past Workshops
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {workshops.map((workshop, index) => (
            <Card
              key={workshop.id}
              className="metallic-shine border-white/10 hover:border-blue-400/50 transition-all duration-300 transform hover:scale-105 electric-glow"
              style={{
                animationDelay: `${index * 0.2}s`,
              }}
            >
              <CardContent className="p-0">
                <div className="relative h-80 overflow-hidden rounded-t-lg">
                  <Image
                    src={workshop.image || "/image.png"}
                    alt={workshop.title}
                    fill
                    className="object-cover transition-transform duration-300 hover:scale-110"
                  />
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-3 text-blue-400">{workshop.title}</h3>
                  <p className="text-gray-300 mb-4">{workshop.description}</p>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-400">
                      <Calendar className="w-4 h-4 mr-2" />
                      {new Date(workshop.date).toLocaleDateString()}
                    </div>
                    <div className="flex items-center text-sm text-gray-400">
                      <Clock className="w-4 h-4 mr-2" />
                      {workshop.duration}
                    </div>
                    <div className="flex items-center text-sm text-gray-400">
                      <Users className="w-4 h-4 mr-2" />
                      {workshop.participants} participants
                    </div>
                  </div>

                  <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white metallic-shine">
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
