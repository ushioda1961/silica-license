import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  try {
    const { id } = await req.json()
    if (!id) return NextResponse.json({ error: 'No id' }, { status: 400 })

    // payment_statusをpaidに更新
    const { data, error } = await supabase
      .from('applicants')
      .update({ payment_status: 'paid' })
      .eq('id', id)
      .select('name, email, desired_month')
      .single()

    if (error || !data) throw error

    // 管理者に支払完了通知メールを送信
    await resend.emails.send({
      from: '販売者認定講習事務局 <mail@you-planning.org>',
      to: ['mail@you-planning.org'],
      subject: `【PayPal決済完了】${data.name}様の支払いが完了しました`,
      html: `
        <h2>💳 PayPal決済完了のお知らせ</h2>
        <p>${data.name}様がPayPalにて受講料のお支払いを完了しました。</p>
        <table border="1" cellpadding="8" style="border-collapse:collapse; margin-top:12px">
          <tr><th style="background:#f0f0f0">氏名</th><td>${data.name}</td></tr>
          <tr><th style="background:#f0f0f0">メール</th><td>${data.email}</td></tr>
          <tr><th style="background:#f0f0f0">受講月</th><td>${data.desired_month}</td></tr>
          <tr><th style="background:#f0f0f0">決済状況</th><td style="color:green;font-weight:bold">✅ 支払済（自動更新済み）</td></tr>
        </table>
        <p style="margin-top:16px; color:#1a7f3c">管理画面の支払状況は自動的に「支払済」に更新されました。</p>
      `,
    })

    return NextResponse.json({ ok: true })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
