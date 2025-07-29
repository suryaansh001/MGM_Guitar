"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"
import { Button } from "@/components/ui/button"

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    rating: 5,
    text: "Amazing instructor! I went from complete beginner to playing my favorite songs in just 3 months.",
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    id: 2,
    name: "Mike Chen",
    rating: 5,
    text: "The chord library and auto-scroll feature are game changers. Best guitar learning platform!",
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    rating: 5,
    text: "Professional guidance with a personal touch. The workshops are incredibly well structured.",
    image: "/placeholder.svg?height=80&width=80",
  },
]

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section className="py-20 bg-gradient-to-b from-gray-800 to-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-amber-400">What Students Say</h2>

        <div className="relative max-w-4xl mx-auto">
          <Card className="bg-black/50 border-amber-900/30">
            <CardContent className="p-8">
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  {Array.from({ length: testimonials[currentIndex].rating }, (_, i) => (
                    <Star key={i} className="w-6 h-6 text-amber-400 fill-current" />
                  ))}
                </div>

                <blockquote className="text-xl text-gray-300 mb-6 italic">
                  "{testimonials[currentIndex].text}"
                </blockquote>

                <div className="flex items-center justify-center">
                  <img
                    src={testimonials[currentIndex].image || "/placeholder.svg"}
                    alt={testimonials[currentIndex].name}
                    className="w-16 h-16 rounded-full mr-4"
                  />
                  <div>
                    <p className="font-semibold text-amber-400">{testimonials[currentIndex].name}</p>
                    <p className="text-gray-400">Guitar Student</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Button
            variant="ghost"
            size="sm"
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-amber-400 hover:text-amber-300"
            onClick={prevTestimonial}
          >
            <ChevronLeft className="w-6 h-6" />
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-amber-400 hover:text-amber-300"
            onClick={nextTestimonial}
          >
            <ChevronRight className="w-6 h-6" />
          </Button>

          <div className="flex justify-center mt-6 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentIndex ? "bg-amber-400" : "bg-gray-600"
                }`}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
