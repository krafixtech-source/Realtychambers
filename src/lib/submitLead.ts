export interface LeadPayload {
  name?: string
  email?: string
  phone?: string
  message?: string
  interest?: string
  source?: string
}

export async function submitLeadToDatabaseAndW3Forms(payload: LeadPayload) {
  const w3formsKey = process.env.NEXT_PUBLIC_W3FORMS_ACCESS_KEY || '10f22c8a-1a88-4898-8949-49af1b163e52'

  let w3Success = false
  let dbSuccess = false

  // 1. Direct Web3Forms submission from client browser using FormData (Official Web3Forms Integration)
  try {
    const formData = new FormData()
    formData.append('access_key', w3formsKey)
    formData.append('name', payload.name || (payload.email ? payload.email.split('@')[0] : 'Newsletter Lead'))
    formData.append('email', payload.email || 'lead@realtychamber.com')
    formData.append('phone', payload.phone || '')
    formData.append('message', payload.message ? `[Source: ${payload.source || 'website'}] ${payload.message}` : `Lead captured from ${payload.source || 'website'}`)
    formData.append('subject', `New Lead [${(payload.source || 'Website').toUpperCase()}]: ${payload.name || payload.phone || payload.email}`)
    formData.append('from_name', 'Realty Chamber Leads')
    if (payload.interest) {
      formData.append('interest', payload.interest)
    }

    const w3Res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      body: formData,
    })

    const w3Data = await w3Res.json()
    w3Success = w3Data.success || w3Res.ok
  } catch (w3Err) {
    console.error('Client Web3Forms submit error:', w3Err)
  }

  // 2. Insert record into Supabase Database via API route
  try {
    const dbRes = await fetch('/api/submit-lead', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })

    if (dbRes.ok) {
      const dbData = await dbRes.json()
      dbSuccess = dbData.supabase || dbData.success
    }
  } catch (dbErr) {
    console.error('Supabase submit error via API route:', dbErr)
  }

  return {
    success: w3Success || dbSuccess,
    w3forms: w3Success,
    supabase: dbSuccess,
  }
}
