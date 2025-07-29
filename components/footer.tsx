"use client"

import Link from "next/link"
import { Guitar, Mail, Phone, MapPin, Facebook, Instagram, Youtube } from "lucide-react"

export function Footer() {
  return (
    <footer className="metallic-shine text-white py-16 border-t border-white/10">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Guitar className="w-8 h-8 text-blue-400" />
              <span className="text-xl font-bold bg-gradient-to-r from-white to-blue-400 bg-clip-text text-transparent">
                MyGuitarMethods
              </span>
            </div>
            <p className="text-gray-400 mb-4">
              Professional guitar lessons and workshops for all skill levels. Transform your musical journey with expert
              guidance.
            </p>
            <div className="flex space-x-4">
              <Facebook className="w-5 h-5 text-gray-400 hover:text-blue-400 cursor-pointer transition-colors" />
              <Instagram className="w-5 h-5 text-gray-400 hover:text-blue-400 cursor-pointer transition-colors" />
              <Youtube className="w-5 h-5 text-gray-400 hover:text-blue-400 cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-blue-400">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-blue-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/chords" className="text-gray-400 hover:text-blue-400 transition-colors">
                  Chords
                </Link>
              </li>
              <li>
                <Link href="/workshops" className="text-gray-400 hover:text-blue-400 transition-colors">
                  Workshops
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-blue-400 transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/career" className="text-gray-400 hover:text-blue-400 transition-colors">
                  Career
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-blue-400">Contact</h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <Mail className="w-4 h-4 text-blue-400 mr-3" />
                <span className="text-gray-400">info@guitarmastery.com</span>
              </div>
              <div className="flex items-center">
                <Phone className="w-4 h-4 text-blue-400 mr-3" />
                <span className="text-gray-400">+91 6648464646464</span>
              </div>
              <div className="flex items-center">
                <MapPin className="w-4 h-4 text-blue-400 mr-3" />
                <span className="text-gray-400">Ambabari, Jaipur, Rajsathan</span>
              </div>
            </div>
          </div>

          {/* Map */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-blue-400">Location</h3>
            <div className="glass-effect rounded-lg p-4 h-32 flex items-center justify-center">
              <MapPin className="w-8 h-8 text-blue-400" />
              <span className="ml-2 text-gray-400">Interactive Map</span>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 text-center">
          <p className="text-gray-400">© 2025 MyGuitarMethods. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
