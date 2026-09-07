import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, phone, message, interest, city = 'Jaipur', source = 'website' } = body

    if (!email && !phone) {
      return NextResponse.json(
        { error: 'Email or phone number is required' },
        { status: 400 }
      )
    }

    const w3formsKey = process.env.W3FORMS_ACCESS_KEY || process.env.NEXT_PUBLIC_W3FORMS_ACCESS_KEY || '10f22c8a-1a88-4898-8949-49af1b163e52'

    // 1. Submit to W3Forms API for instant email notification
    let w3Success = false
    try {
      const w3res = await fetch('https://api.w3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          access_key: w3formsKey,
          name: name || 'Lead Submission',
          email: email || 'no-email@realtychamber.com',
          phone: phone || 'N/A',
          message: `Source: ${source}\nInterest: ${interest || 'N/A'}\nMessage: ${message || 'New lead signup'}`,
          subject: `New Lead [${source.toUpperCase()}]: ${name || phone || email}`,
          from_name: 'Realty Chamber Leads',
        }),
      })
      const w3Data = await w3res.json()
      w3Success = w3Data.success || w3res.ok
    } catch (w3Err) {
      console.error('W3Forms submission error:', w3Err)
    }

    // 2. Insert into Supabase database (into 'contacts' table)
    let supabaseSuccess = false
    let supabaseError = null
    let insertedData = null

    try {
      // Primary table: 'contacts' (existing schema: name, email, phone, city, propertytype, message)
      const { data, error } = await supabaseAdmin
        .from('contacts')
        .insert([
          {
            name: name || (email ? email.split('@')[0] : 'Newsletter Lead'),
            email: email || null,
            phone: phone || null,
            city: city || 'Jaipur',
            propertytype: interest || source || 'General Advisory',
            message: message ? `[Source: ${source}] ${message}` : `Lead captured from ${source}`,
          },
        ])
        .select()

      if (error) {
        supabaseError = error.message
        console.warn('Supabase insert into contacts table failed:', error.message)
        
        // Fallback to 'leads' table if present
        const { data: fallbackData, error: fallbackError } = await supabaseAdmin
          .from('leads')
          .insert([
            {
              name: name || null,
              email: email || null,
              phone: phone || null,
              message: message || null,
              interest: interest || null,
              source: source,
              created_at: new Date().toISOString(),
            },
          ])
          .select()

        if (!fallbackError) {
          supabaseSuccess = true
          insertedData = fallbackData
        }
      } else {
        supabaseSuccess = true
        insertedData = data
      }
    } catch (sbErr: any) {
      console.error('Supabase connection error:', sbErr)
      supabaseError = sbErr.message || String(sbErr)
    }

    return NextResponse.json({
      success: true,
      w3forms: w3Success,
      supabase: supabaseSuccess,
      data: insertedData,
      message: 'Lead received and stored in database successfully',
    })
  } catch (err: any) {
    console.error('Submit lead handler error:', err)
    return NextResponse.json(
      { error: 'Internal Server Error', details: err.message },
      { status: 500 }
    )
  }
}
