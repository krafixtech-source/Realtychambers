'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import { MessageSquare, Phone } from 'lucide-react'

// Dummy properties collection matching Jaipur context
const PROPERTIES_DATA = [
  {
    id: 1,
    title: 'Casa Nera',
    category: 'residential',
    type: 'Luxury Villa',
    location: 'Malviya Nagar, Jaipur',
    year: '2026',
    price: 'On Request',
    image: '/images/hero_architecture.png',
  },
  {
    id: 2,
    title: 'Monument House',
    category: 'residential',
    type: 'Private Residence',
    location: 'C-Scheme, Jaipur',
    year: '2025',
    price: 'On Request',
    image: '/images/project_interior.png',
  },
  {
    id: 3,
    title: 'Travertine Heights',
    category: 'commercial',
    type: 'High-yield Showrooms',
    location: 'Tonk Road, Jaipur',
    year: '2026',
    price: 'On Request',
    image: '/images/project_restaurant.png',
  },
  {
    id: 4,
    title: 'Creative Agency Studio',
    category: 'commercial',
    type: 'Corporate Offices',
    location: 'Mansarovar, Jaipur',
    year: '2025',
    price: 'On Request',
    image: '/images/project_office.png',
  },
  {
    id: 5,
    title: 'Brutalist Concrete Villa',
    category: 'residential',
    type: 'Boutique Residence',
    location: 'Jagatpura, Jaipur',
    year: '2025',
    price: 'On Request',
    image: '/images/project_concrete.png',
  },
  {
    id: 6,
    title: 'Malviya Logistics Hub',
    category: 'industrial',
    type: 'Industrial Warehouse',
    location: 'Vishwakarma Industrial Area, Jaipur',
    year: '2026',
    price: 'On Request',
    image: '/images/architectural_detail.png',
  },
  {
    id: 7,
    title: 'Heritage Eco-Farmhouse',
    category: 'agricultural',
    type: 'Organic Farm & Retreat',
    location: 'Ajmer Road Outskirts, Jaipur',
    year: '2026',
    price: 'On Request',
    image: '/images/human_scale.png',
  },
]

function PropertiesListContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const activeCategory = searchParams.get('category') || 'all'

  const categories = [
    { label: 'All Projects', value: 'all' },
    { label: 'Residential', value: 'residential' },
    { label: 'Commercial', value: 'commercial' },
    { label: 'Industrial', value: 'industrial' },
    { label: 'Agricultural', value: 'agricultural' },
  ]

  const setCategoryFilter = (val: string) => {
    if (val === 'all') {
      router.push('/properties')
    } else {
      router.push(`/properties?category=${val}`)
    }
  }

  const filteredProperties = activeCategory === 'all'
    ? PROPERTIES_DATA
    : PROPERTIES_DATA.filter((p) => p.category === activeCategory)

  return (
    <div className="max-w-[1600px] mx-auto flex flex-col gap-16 mt-12">
      {/* Header */}
      <div className="flex flex-col gap-6 max-w-[800px]">
        <span className="section-label">03 — VERIFIED LISTINGS</span>
        <h1 className="font-sans font-bold text-[#171717] uppercase leading-[0.95]" style={{ fontSize: 'clamp(2.5rem, 6.5vw, 6.5rem)' }}>
          EXPLORE<br />PROPERTIES.
        </h1>
        <p className="body-large text-gray-500 font-light mt-6">
          A curated collection of verified residential, commercial, industrial, and agricultural properties in Jaipur and across Rajasthan. 100% transparent titles.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="border-b border-[rgba(23,23,23,0.08)] pb-4 flex flex-wrap gap-4 md:gap-8 text-xs uppercase tracking-wider font-semibold">
        {categories.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setCategoryFilter(cat.value)}
            className={`pb-2 relative transition-colors duration-300 ${
              activeCategory === cat.value ? 'text-[#171717]' : 'text-gray-400 hover:text-black'
            }`}
          >
            {cat.label}
            {activeCategory === cat.value && (
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#171717]" />
            )}
          </button>
        ))}
      </div>

      {/* Grid List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {filteredProperties.length > 0 ? (
          filteredProperties.map((p) => (
            <div key={p.id} className="flex flex-col gap-4 group bg-white border border-[rgba(23,23,23,0.04)] p-4 shadow-sm" data-cursor="VIEW">
              <div className="relative w-full aspect-[4/3] overflow-hidden bg-[#171717]">
                <Image
                  src={p.image}
                  alt={p.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              <div className="flex flex-col gap-3 pt-2">
                <div className="flex justify-between items-baseline">
                  <span className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold">{p.type}</span>
                  <span className="text-[11px] font-semibold text-gray-500">{p.year}</span>
                </div>
                <h3 className="text-xl font-sans font-light text-[#171717] leading-none transition-transform group-hover:translate-x-1">
                  {p.title}
                </h3>
                <span className="text-xs text-gray-400 leading-none">{p.location}</span>
                
                <div className="divider my-2" />

                <div className="flex justify-between items-center">
                  <span className="text-sm font-semibold text-[#171717]">{p.price}</span>
                  
                  {/* Floating Action Buttons for quick connection */}
                  <div className="flex gap-2">
                    <a
                      href={`https://wa.me/919829066382?text=Hello%20Realty%20Chamber,%20I%20have%20an%20enquiry%20regarding%20${encodeURIComponent(p.title)}%20in%20${encodeURIComponent(p.location)}.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 border border-green-500/20 text-green-600 rounded-full hover:bg-green-50 transition-colors"
                      title="WhatsApp Inquiry"
                    >
                      <MessageSquare size={16} />
                    </a>
                    <a
                      href="tel:+919829066382"
                      className="p-2 border border-[#171717]/10 text-[#171717] rounded-full hover:bg-gray-100 transition-colors"
                      title="Call Specialist"
                    >
                      <Phone size={16} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full py-16 text-center text-gray-400 font-light">
            No properties found under this category. Contact us to submit a custom sourcing mandate.
          </div>
        )}
      </div>

      {/* Sourcing CTA Block */}
      <div className="bg-[#171717] text-[#F3F1EB] p-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mt-12">
        <div className="flex flex-col gap-2 max-w-[600px]">
          <h2 className="text-2xl md:text-3xl font-sans font-light">Need a Custom Sourcing Mandate?</h2>
          <p className="text-sm text-gray-400 font-light leading-relaxed">
            If our active catalog does not contain your specific project requirements, our specialists can aggregates off-market builder assets or commercial spaces suited to your portfolio.
          </p>
        </div>
        <a
          href="tel:+919829066382"
          className="px-6 py-4 bg-[#F3F1EB] text-[#171717] text-xs font-semibold uppercase tracking-widest hover:bg-gray-200 transition-colors flex-shrink-0"
        >
          Consult Mr. Ramlal Narwani
        </a>
      </div>
    </div>
  )
}

export default function PropertiesList() {
  return (
    <div className="bg-[#F3F1EB] min-h-screen py-16 px-6 md:px-12">
      <Suspense fallback={<div className="py-24 text-center text-gray-400">Loading listings...</div>}>
        <PropertiesListContent />
      </Suspense>
    </div>
  )
}
