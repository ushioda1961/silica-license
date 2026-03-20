import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)
const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { name, furigana, email, phone, prefecture, desired_month, agency, q1, q2, q3, q4 } = body

    const { error } = await supabase.from('applicants').insert([{
      name, furigana, email, phone, prefecture, desired_month, agency,
      survey_q1: q1, survey_q2: q2, survey_q3: q3, survey_q4: q4
    }])
    if (error) throw error

    const html = `<div style="font-family:sans-serif;max-width:600px;margin:0 auto">
      <h2 style="color:#1e293b">申込みを受け付けました</h2>
      <p style="color:#475569">以下の内容で申込みを受け付けました。</p>
      <table style="width:100%;border-collapse:collapse;margin:20px 0">
        <tr style="border-bottom:1px solid #e2e8f0"><td style="padding:12px;color:#64748b;width:40%">受講月</td><td style="padding:12px;font-weight:bold">${desired_month}</td></tr>
        <tr style="border-bottom:1px solid #e2e8f0"><td style="padding:12px;color:#64748b">氏名</td><td style="padding:12px">${name} (${furigana})</td></tr>
        <tr style="border-bottom:1px solid #e2e8f0"><td style="padding:12px;color:#64748b">メール</td><td style="padding:12px">${email}</td></tr>
        <tr style="border-bottom:1px solid #e2e8f0"><td style="padding:12px;color:#64748b">電話</td><td style="padding:12px">${phone}</td></tr>
        <tr style="border-bottom:1px solid #e2e8f0"><td style="padding:12px;color:#64748b">都道府県</td><td style="padding:12px">${prefecture}</td></tr>
        <tr style="border-bottom:1px solid #e2e8f0"><td style="padding:12px;color:#64748b">所属代理店</td><td style="padding:12px">${agency}</td></tr>
      </table>
      <p style="color:#94a3b8;font-size:12px">このメールは自動送信です。</p>
    </div>`

    await resend.emails.send({
      from: 'noreply@silica-license.jp',
      to: [email, 'mail@you-planning.org', 'm.kobayashi@silica-creation.jp'],
      subject: `【申込み受付】${desired_month} 販売者認定講習・試験`,
      html
    })

    return NextResponse.json({ success: true })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'サーバーエラー' }, { status: 500 })
  }
}