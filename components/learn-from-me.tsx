"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RegistrationForm } from "./registration-form"
import { Play, Award, Users, Clock } from "lucide-react"
import Image from "next/image"

const teacherInfo = [
  {
    title: "15+ Years Experience",
    description: "Professional guitarist with extensive performance and teaching background",
    image: "/image.png?height=500&width=700",
    icon: Award,
  },
  {
    title: "Personalized Learning",
    description: "Tailored lessons based on your skill level and musical preferences",
    image: "/image.png?height=500&width=700",
    icon: Users,
  },
  {
    title: "Flexible Scheduling",
    description: "Online and offline sessions that fit your busy lifestyle",
    image: "/image.png?height=500&width=700",
    icon: Clock,
  },
]

export function LearnFromMe() {
  const [showRegistration, setShowRegistration] = useState(false)

  return (
    <section className="py-10 sm:py-16 lg:py-20 bg-gradient-to-br from-gray-900 via-black to-blue-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-white to-blue-400 bg-clip-text text-transparent">
            Learn From Me
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-300 max-w-3xl mx-auto px-4">
            Join thousands of students who have transformed their musical journey with professional guidance and proven
            teaching methods.
          </p>
        </div>

        <div className="space-y-12 sm:space-y-16 lg:space-y-20">
          {teacherInfo.map((info, index) => {
            const IconComponent = info.icon
            const isEven = index % 2 === 0

            return (
              <div
                key={index}
                className={`flex flex-col ${
                  isEven ? "lg:flex-row" : "lg:flex-row-reverse"
                } items-center gap-6 sm:gap-8 lg:gap-12`}
              >
                <div className="flex-1 w-full">
                  <Card className="border-white/10 overflow-hidden bg-white/5 backdrop-blur-sm shadow-xl shadow-blue-500/10 hover:shadow-blue-500/20 transition-all duration-300">
                    <CardContent className="p-0">
                      <div className="relative h-48 sm:h-64 md:h-80 lg:h-96 xl:h-[500px]">
                        <Image 
                          src={info.image || "/image.png"} 
                          alt={info.title} 
                          fill 
                          className="object-cover rounded-lg" 
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 50vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="flex-1 text-center lg:text-left w-full px-4 sm:px-0">
                  <div className="flex items-center justify-center lg:justify-start mb-3 sm:mb-4">
                    <IconComponent className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-blue-400 mr-2 sm:mr-3" />
                    <h3 className="text-xl sm:text-2xl font-bold text-blue-400">{info.title}</h3>
                  </div>
                  <p className="text-base sm:text-lg text-gray-300 mb-4 sm:mb-6 leading-relaxed">{info.description}</p>
                  {index === 0 && (
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
                      <Button
                        size="lg"
                        className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white shadow-lg shadow-blue-500/25 transform hover:scale-105 transition-all duration-200 text-sm sm:text-base px-4 sm:px-6 py-2 sm:py-3"
                        onClick={() => setShowRegistration(true)}
                      >
                        <Play className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                        Book a Session
                      </Button>
                      <Button
                        size="lg"
                        variant="outline"
                        className="border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-black bg-transparent backdrop-blur-sm border-2 transform hover:scale-105 transition-all duration-200 text-sm sm:text-base px-4 sm:px-6 py-2 sm:py-3"
                      >
                        View Portfolio
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <RegistrationForm
        isOpen={showRegistration}
        onClose={() => setShowRegistration(false)}
        workshopTitle="Personal Guitar Lesson"
      />
    </section>
  )
}