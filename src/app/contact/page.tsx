'use client'

import { useState } from 'react'
import { Phone, Mail, MapPin } from 'lucide-react'
import { WhatsAppIcon } from '@/components/WhatsAppIcon'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    interest: 'purchase',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulated submission success
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setFormData({ name: '', email: '', phone: '', interest: 'purchase', message: '' })
    }, 4000)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <div className="bg-[#F3F1EB] min-h-screen pt-28 pb-16 px-6 md:px-12">
      <div className="max-w-[1400px] mx-auto flex flex-col gap-24 mt-4">
        
        {/* Header */}
        <div className="flex flex-col gap-6 max-w-[800px]">
          <span className="section-label">05 — CONNECT WITH US</span>
          <h1 className="font-sans font-bold text-[#171717] uppercase leading-[0.95]" style={{ fontSize: 'clamp(2.5rem, 6.5vw, 6.5rem)' }}>
            START A<br />CONVERSATION.
          </h1>
          <p className="body-large text-gray-500 font-light mt-6">
            Get in touch with Mr. Ramlal Narwani and our advisory specialists. We offer single-window guidance for real estate mandates in Jaipur.
          </p>
        </div>

        {/* Contact Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start border-t border-[rgba(23,23,23,0.08)] pt-16">
          
          {/* Left Block: Contact Info */}
          <div className="lg:col-span-5 flex flex-col gap-12">
            <div className="flex flex-col gap-4">
              <h2 className="text-xs uppercase tracking-widest text-[#171717] font-semibold">
                Direct Inquiry
              </h2>
              <div className="flex flex-col gap-4 text-[#171717]">
                
                {/* WhatsApp Quick Connect */}
                <a
                  href="https://wa.me/919829066382?text=Hello%20Realty%20Chamber,%20I%20have%20an%20enquiry%20regarding%20property%20in%20Jaipur."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-5 border border-emerald-500/30 bg-emerald-50/70 hover:bg-emerald-100 transition-all rounded-2xl shadow-sm cursor-pointer"
                >
                  <div className="p-3 bg-emerald-600 text-white rounded-full flex-shrink-0 shadow-sm flex items-center justify-center">
                    <WhatsAppIcon size={20} className="text-white fill-current" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">Quick WhatsApp</span>
                    <span className="text-sm font-semibold text-emerald-950">Click to chat instantly →</span>
                  </div>
                </a>

                {/* Telephone */}
                <div className="flex items-start gap-4 mt-2">
                  <Phone className="text-gray-400 mt-1" size={18} />
                  <div className="flex flex-col">
                    <span className="text-xs uppercase tracking-wider text-gray-400 font-medium">Telephone</span>
                    <a href="tel:+919829066382" className="text-sm font-semibold hover:underline">+91 98290 66382 (Primary)</a>
                    <a href="tel:+919982011116" className="text-sm font-semibold hover:underline">+91 99820 11116</a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4">
                  <Mail className="text-gray-400 mt-1" size={18} />
                  <div className="flex flex-col">
                    <span className="text-xs uppercase tracking-wider text-gray-400 font-medium">Email Address</span>
                    <a href="mailto:info@realtychamber.com" className="text-sm font-semibold hover:underline">info@realtychamber.com</a>
                  </div>
                </div>

                {/* Address */}
                <div className="flex items-start gap-4">
                  <MapPin className="text-gray-400 mt-1" size={18} />
                  <div className="flex flex-col">
                    <span className="text-xs uppercase tracking-wider text-gray-400 font-medium">Jaipur Studio Address</span>
                    <span className="text-sm font-semibold">10/615, Malviya Nagar,</span>
                    <span className="text-sm font-semibold">Jaipur – 302017, Rajasthan</span>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* Right Block: Interactive Form */}
          <div className="lg:col-span-7 bg-white p-8 md:p-12 border border-[rgba(23,23,23,0.04)] shadow-sm">
            {submitted ? (
              <div className="py-16 text-center flex flex-col items-center gap-4">
                <span className="text-xs uppercase tracking-widest text-green-600 font-bold">Submission Successful</span>
                <h3 className="text-2xl font-serif italic text-[#171717]">Thank you for reaching out.</h3>
                <p className="text-sm text-gray-500 font-light max-w-[360px] leading-relaxed">
                  Mr. Ramlal Narwani or our specialist advisors will contact you shortly to review your real estate mandate.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <h2 className="text-xl font-sans font-light text-[#171717] border-b border-[rgba(23,23,23,0.08)] pb-4">
                  Advisory Inquiry Form
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-[11px] uppercase tracking-wider text-gray-500 font-semibold" htmlFor="name">Name</label>
                    <input
                      required
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="bg-[#F3F1EB] border-none p-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#171717]"
                      placeholder="e.g. Ramnarayan Sharma"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[11px] uppercase tracking-wider text-gray-500 font-semibold" htmlFor="phone">Phone</label>
                    <input
                      required
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="bg-[#F3F1EB] border-none p-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#171717]"
                      placeholder="e.g. +91 99000 12345"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[11px] uppercase tracking-wider text-gray-500 font-semibold" htmlFor="email">Email</label>
                  <input
                    required
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="bg-[#F3F1EB] border-none p-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#171717]"
                    placeholder="e.g. sharma@email.com"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[11px] uppercase tracking-wider text-gray-500 font-semibold" htmlFor="interest">Area of Interest</label>
                  <select
                    id="interest"
                    name="interest"
                    value={formData.interest}
                    onChange={handleInputChange}
                    className="bg-[#F3F1EB] border-none p-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#171717]"
                  >
                    <option value="purchase">Purchase Property</option>
                    <option value="sell">Sell Property</option>
                    <option value="joint-venture">Joint Venture (JV)</option>
                    <option value="rent">Rent / Lease</option>
                    <option value="exchange">Property Exchange</option>
                    <option value="consultancy">Corporate Consultancy</option>
                  </select>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[11px] uppercase tracking-wider text-gray-500 font-semibold" htmlFor="message">Message / Mandate description</label>
                  <textarea
                    required
                    rows={5}
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    className="bg-[#F3F1EB] border-none p-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#171717] resize-none"
                    placeholder="Describe your location preferences, sizing, or plot requirements..."
                  />
                </div>

                <button
                  type="submit"
                  className="btn-primary w-full py-4 rounded-full text-xs font-bold tracking-widest mt-2"
                >
                  Submit Mandate Enquiry
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </div>
  )
}
