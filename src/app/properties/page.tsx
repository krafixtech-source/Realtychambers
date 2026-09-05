'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import { Phone } from 'lucide-react'
import { WhatsAppIcon } from '@/components/WhatsAppIcon'

const PROPERTIES_DATA = [
  {
    id: 1,
    title: 'Luxury Residential Villas & Floors',
    category: 'residential',
    type: 'Residential Advisory & Sourcing',
    location: 'Jaipur & Rajasthan',
    year: 'Advisory',
    price: 'Consultation on Request',
    image: '/images/hero_architecture.png',
  },
  {
    id: 2,
    title: 'Bespoke Private Residences',
    category: 'residential',
    type: 'High-End Residential Sourcing',
    location: 'Prime Residential Belts',
    year: 'Advisory',
    price: 'Consultation on Request',
    image: '/images/project_interior.png',
  },
  {
    id: 3,
    title: 'High-Yield Commercial Showrooms',
    category: 'commercial',
    type: 'Commercial Investment Advisory',
    location: 'Key Commercial Corridors',
    year: 'Advisory',
    price: 'Consultation on Request',
    image: '/images/project_restaurant.png',
  },
  {
    id: 4,
    title: 'Corporate Office Spaces & IT Suites',
    category: 'commercial',
    type: 'Commercial Leasing & Purchase',
    location: 'Business Districts, Rajasthan',
    year: 'Advisory',
    price: 'Consultation on Request',
    image: '/images/project_office.png',
  },
  {
    id: 5,
    title: 'Contemporary Boutique Residences',
    category: 'residential',
    type: 'Independent Villa & Floor Advisory',
    location: 'Jaipur & Rajasthan',
    year: 'Advisory',
    price: 'Consultation on Request',
    image: '/images/project_concrete.png',
  },
  {
    id: 6,
    title: 'Modern PEB Industrial Warehouses',
    category: 'industrial',
    type: 'Industrial Logistics Sourcing',
    location: 'Industrial & RIICO Corridors',
    year: 'Advisory',
    price: 'Consultation on Request',
    image: '/images/industrial_exterior.jpg',
  },
  {
    id: 7,
    title: 'Heavy Industrial Bays & Factory Sheds',
    category: 'industrial',
    type: 'Manufacturing & Warehouse Advisory',
    location: 'Industrial Growth Zones',
    year: 'Advisory',
    price: 'Consultation on Request',
    image: '/images/industrial_interior.jpg',
  },
  {
    id: 8,
    title: 'Agricultural Land & Farmhouse Parcels',
    category: 'agricultural',
    type: 'Agri Land Aggregation & Advisory',
    location: 'Rural & Agricultural Belts',
    year: 'Advisory',
    price: 'Consultation on Request',
    image: '/images/agriculture_golden.jpg',
    position: 'center 75%',
  },
  {
    id: 9,
    title: 'Lush Agri-Zone & Organic Farm Estates',
    category: 'agricultural',
    type: 'Farmhouse Land Sourcing & Clearances',
    location: 'Rajasthan Agricultural Zones',
    year: 'Advisory',
    price: 'Consultation on Request',
    image: '/images/agriculture_green.jpg',
    position: 'center 85%',
  },
]

function PropertiesListContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const activeCategory = searchParams.get('category') || 'all'

  const categories = [
    { label: 'All Sectors', value: 'all' },
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
        <span className="section-label">03 — ADVISORY & SOURCING PORTFOLIO</span>
        <h1 className="font-sans font-bold text-[#171717] uppercase leading-[0.95]" style={{ fontSize: 'clamp(2.5rem, 6.5vw, 6.5rem)' }}>
          OUR ADVISORY<br />SECTORS.
        </h1>
        <p className="body-large text-gray-500 font-light mt-6">
          Specialized real estate consultancy and structured property sourcing across Residential, Commercial, Industrial, and Agricultural sectors in Jaipur and Rajasthan. We bridge clients and developers with 100% verified legal due diligence.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="border-b border-[rgba(23,23,23,0.08)] pb-6 flex overflow-x-auto sm:flex-wrap gap-2.5 md:gap-4 text-xs uppercase tracking-wider font-semibold no-scrollbar max-w-full">
        {categories.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setCategoryFilter(cat.value)}
            className={`px-4 sm:px-5 py-2.5 rounded-full transition-all duration-300 cursor-pointer text-[11px] tracking-wider whitespace-nowrap flex-shrink-0 ${
              activeCategory === cat.value
                ? 'bg-[#171717] text-[#F3F1EB] shadow-md border border-[#171717]'
                : 'bg-white text-[#171717] border border-[rgba(23,23,23,0.12)] hover:bg-[#171717] hover:text-[#F3F1EB] shadow-sm'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Grid List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
        {filteredProperties.length > 0 ? (
          filteredProperties.map((p) => (
            <div key={p.id} className="flex flex-col gap-4 group bg-white border border-[rgba(23,23,23,0.04)] p-4 shadow-sm rounded-sm" data-cursor="VIEW">
              <div className="relative w-full aspect-[4/3] overflow-hidden bg-[#171717] rounded-sm">
                <Image
                  src={p.image}
                  alt={p.title}
                  fill
                  style={{ objectPosition: p.position || 'center' }}
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              <div className="flex flex-col gap-3 pt-2">
                <div className="flex justify-between items-baseline gap-2">
                  <span className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold">{p.type}</span>
                  <span className="text-[11px] font-semibold text-gray-500">{p.year}</span>
                </div>
                <h3 className="text-xl font-sans font-light text-[#171717] leading-tight transition-transform group-hover:translate-x-1">
                  {p.title}
                </h3>
                <span className="text-xs text-gray-400 leading-none">{p.location}</span>
                
                <div className="divider my-2" />

                <div className="flex justify-between items-center gap-2">
                  <span className="text-sm font-semibold text-[#171717]">{p.price}</span>
                  
                  {/* Floating Action Buttons for quick connection */}
                  <div className="flex gap-2.5">
                    <a
                      href={`https://wa.me/919829066382?text=Hello%20Realty%20Chamber,%20I%20have%20an%20enquiry%20regarding%20${encodeURIComponent(p.title)}%20in%20${encodeURIComponent(p.location)}.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 bg-emerald-600 text-white rounded-full hover:bg-emerald-700 transition-all shadow-sm active:scale-95 cursor-pointer flex items-center justify-center"
                      title="WhatsApp Inquiry"
                    >
                      <WhatsAppIcon size={16} className="text-white fill-current" />
                    </a>
                    <a
                      href="tel:+919829066382"
                      className="p-2.5 bg-[#171717] text-[#F3F1EB] rounded-full hover:bg-[#2A2D26] hover:text-white transition-all shadow-sm active:scale-95 cursor-pointer flex items-center justify-center"
                      title="Call Specialist"
                    >
                      <Phone size={16} className="text-[#F3F1EB] flex-shrink-0" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full py-16 text-center text-gray-400 font-light">
            No active mandates listed under this category. Contact our consultancy team to discuss customized property sourcing across Rajasthan.
          </div>
        )}
      </div>

      {/* Sourcing CTA Block */}
      <div className="bg-[#171717] text-[#F3F1EB] p-8 sm:p-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mt-12 rounded-sm shadow-md">
        <div className="flex flex-col gap-2 max-w-[600px]">
          <h2 className="text-2xl md:text-3xl font-sans font-light">Looking for Tailored Property Sourcing?</h2>
          <p className="text-sm text-gray-400 font-light leading-relaxed">
            As an independent real estate consultancy, we bridge investors, buyers, and premier developers. We evaluate your requirements, source verified off-market inventories, and handle title verification and registration end-to-end.
          </p>
        </div>
        <a
          href="tel:+919829066382"
          className="btn-light px-8 py-4 flex-shrink-0"
        >
          Consult Mr. Ramlal Narwani
        </a>
      </div>
    </div>
  )
}

export default function PropertiesList() {
  return (
    <div className="bg-[#F3F1EB] min-h-screen pt-28 pb-16 px-6 md:px-12">
      <Suspense fallback={<div className="py-24 text-center text-gray-400">Loading listings...</div>}>
        <PropertiesListContent />
      </Suspense>
    </div>
  )
}
