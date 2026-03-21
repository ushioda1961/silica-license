import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { Resend } from 'resend'
const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  try {
    const { id } = await req.json()
    if (!id) return NextResponse.json({ error: 'No id' }, { status: 400 })

    // 申込者情報を取得
    const { data, error } = await supabase
      .from('applicants')
      .select('name, furigana, email, phone, desired_month, agency')
      .eq('id', id)
      .single()

    if (error || !data) throw error

    // 管理者に通知メールを送信
    await resend.emails.send({
      from: '販売者認定講習事務局 <mail@you-planning.org>',
      to: ['mail@you-planning.org'],
      subject: `【銀行振込】${data.name}様が銀行振込を選択しました`,
      html: `
        <h2>🏦 銀行振込のお知らせ</h2>
        <p>以下の申込者が<strong>銀行振込</strong>でのお支払いを選択しました。<br>入金確認をお願いします。</p>
        <table border="1" cellpadding="8" style="border-collapse:collapse; margin-top:12px">
          <tr><th style="background:#f0f0f0">氏名</th><td>${data.name}（${data.furigana}）</td></tr>
          <tr><th style="background:#f0f0f0">メール</th><td>${data.email}</td></tr>
          <tr><th style="background:#f0f0f0">電話</th><td>${data.phone}</td></tr>
          <tr><th style="background:#f0f0f0">受講月</th><td>${data.desired_month}</td></tr>
          <tr><th style="background:#f0f0f0">所属代理店</th><td>${data.agency}</td></tr>
        </table>
        <p style="margin-top:16px; color:#e65c00"><strong>※ 入金確認後、管理画面で「支払済」に変更してください。</strong></p>
      `,
    })

    return NextResponse.json({ ok: true })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}