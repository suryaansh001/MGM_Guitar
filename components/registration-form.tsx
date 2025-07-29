"use client"

import type React from "react"
import { CustomCursor } from "./custom-cursor"

import { useState, useEffect } from "react"
import { useForm, ValidationError } from '@formspree/react'
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { X, User, Mail, Phone, Calendar, MapPin } from "lucide-react"

interface RegistrationFormProps {
  isOpen: boolean
  onClose: () => void
  workshopTitle?: string
}
//use dotenv 
const formspree_id = process.env.NEXT_PUBLIC_FORMSPREE_ID || "xvgqrvqz";

export function RegistrationForm({ isOpen, onClose, workshopTitle = "Guitar Workshop" }: RegistrationFormProps) {
  const router = useRouter()
  const [state, handleSubmit] = useForm(formspree_id)
  const [showSuccess, setShowSuccess] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    emailId: "",
    contactNumber: "",
    dateOfBirth: "",
    cityAndState: "",
    experienceWithGuitar: "",
    registeredForRole: "workshop",
    workshopId: "",
    message: "",
  })

  const resetForm = () => {
    setFormData({
      name: "",
      emailId: "",
      contactNumber: "",
      dateOfBirth: "",
      cityAndState: "",
      experienceWithGuitar: "",
      registeredForRole: "workshop",
      workshopId: "",
      message: "",
    })
    setShowSuccess(false)
  }

  const handleClose = () => {
    resetForm()
    onClose()
    router.push("/")
  }

  // Reset form when modal is closed or when form is successful
  useEffect(() => {
    if (!isOpen) {
      resetForm()
    }
    if (state.succeeded && !showSuccess) {
      setShowSuccess(true)
    }
  }, [isOpen, state.succeeded, showSuccess])

  if (showSuccess) {
    return (
      
      <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
        <Card className="w-full max-w-md bg-gray-900 border-amber-900/30">
          <CustomCursor />
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-amber-400">Registration Successful!</CardTitle>
            <Button variant="ghost" size="sm" onClick={handleClose}>
              <X className="w-4 h-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <p className="text-white text-center">Thanks for registering for {workshopTitle}!</p>
            <Button onClick={handleClose} className="w-full mt-4 bg-amber-500 hover:bg-amber-600 text-black font-semibold">
              Close
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md bg-gray-900 border-amber-900/30">
        <CustomCursor />
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-amber-400">Register for {workshopTitle}</CardTitle>
          <Button variant="ghost" size="sm" onClick={handleClose}>
            <X className="w-4 h-4" />
          </Button>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <User className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                className="w-full pl-10 pr-4 py-2 bg-black/50 border border-gray-600 rounded-lg focus:border-amber-400 focus:outline-none text-white"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
              <ValidationError prefix="Name" field="name" errors={state.errors} />
            </div>

            <div className="relative">
              <Calendar className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <input
                type="date"
                name="dateOfBirth"
                className="w-full pl-10 pr-4 py-2 bg-black/50 border border-gray-600 rounded-lg focus:border-amber-400 focus:outline-none text-white"
                value={formData.dateOfBirth}
                onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                required
              />
              <ValidationError prefix="Date of Birth" field="dateOfBirth" errors={state.errors} />
            </div>

            <div className="relative">
              <MapPin className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <input
                type="text"
                name="cityAndState"
                placeholder="City and State"
                className="w-full pl-10 pr-4 py-2 bg-black/50 border border-gray-600 rounded-lg focus:border-amber-400 focus:outline-none text-white"
                value={formData.cityAndState}
                onChange={(e) => setFormData({ ...formData, cityAndState: e.target.value })}
                required
              />
              <ValidationError prefix="City and State" field="cityAndState" errors={state.errors} />
            </div>

            <select
              name="experienceWithGuitar"
              className="w-full px-4 py-2 bg-black/50 border border-gray-600 rounded-lg focus:border-amber-400 focus:outline-none text-white"
              value={formData.experienceWithGuitar}
              onChange={(e) => setFormData({ ...formData, experienceWithGuitar: e.target.value })}
              required
            >
              <option value="">Experience with Guitar</option>
              <option value="Totally New">Totally New</option>
              <option value="3 to 6 months">3 to 6 months</option>
              <option value="More than 6 months">More than 6 months</option>
            </select>
            <ValidationError prefix="Experience" field="experienceWithGuitar" errors={state.errors} />

            <div className="relative">
              <Phone className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <input
                type="tel"
                name="contactNumber"
                placeholder="Contact Number (WhatsApp activated)"
                className="w-full pl-10 pr-4 py-2 bg-black/50 border border-gray-600 rounded-lg focus:border-amber-400 focus:outline-none text-white"
                value={formData.contactNumber}
                onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })}
                required
              />
              <ValidationError prefix="Contact Number" field="contactNumber" errors={state.errors} />
            </div>

            <div className="relative">
              <Mail className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <input
                type="email"
                name="emailId"
                placeholder="Email Address"
                className="w-full pl-10 pr-4 py-2 bg-black/50 border border-gray-600 rounded-lg focus:border-amber-400 focus:outline-none text-white"
                value={formData.emailId}
                onChange={(e) => setFormData({ ...formData, emailId: e.target.value })}
                required
              />
              <ValidationError prefix="Email" field="emailId" errors={state.errors} />
            </div>

            <input
              type="hidden"
              name="registeredForRole"
              value={formData.registeredForRole}
            />

            <input
              type="hidden"
              name="workshopTitle"
              value={workshopTitle}
            />

            <textarea
              name="message"
              placeholder="Additional Message (Optional)"
              rows={3}
              className="w-full px-4 py-2 bg-black/50 border border-gray-600 rounded-lg focus:border-amber-400 focus:outline-none text-white resize-none"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            />
            <ValidationError prefix="Message" field="message" errors={state.errors} />

            <Button 
              type="submit" 
              disabled={state.submitting}
              className="w-full bg-amber-500 hover:bg-amber-600 text-black font-semibold disabled:opacity-50"
            >
              {state.submitting ? "Submitting..." : "Submit Registration"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
